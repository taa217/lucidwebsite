import { useState, useEffect, useCallback, useRef } from 'react';
import { CartesiaClient } from "@cartesia/cartesia-js";

// ─── Cartesia Client ───────────────────────────────────────────────
const cartesia = new CartesiaClient({
  apiKey: process.env.REACT_APP_CARTESIA_API_KEY || "",
});

// ─── Constants ─────────────────────────────────────────────────────
const DEFAULT_VOICE_ID = "694f9389-aac1-45b6-b726-9d9369183238";
const MIN_REQUEST_GAP_MS = 400;   // minimum gap between API calls
const MAX_RETRIES = 2;
const BASE_RETRY_DELAY_MS = 2000; // start at 2s backoff on 429

// ─── Global Audio Cache ────────────────────────────────────────────
const audioCache = new Map<string, AudioBuffer>();

// ─── Shared AudioContext (lazily created) ──────────────────────────
let sharedAudioContext: AudioContext | null = null;

const getSharedAudioContext = async (): Promise<AudioContext> => {
  if (!sharedAudioContext) {
    console.log('[TTS] Creating new AudioContext');
    sharedAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (sharedAudioContext.state === 'suspended') {
    console.log('[TTS] Resuming suspended AudioContext');
    await sharedAudioContext.resume();
  }
  return sharedAudioContext;
};

// ─── Types ─────────────────────────────────────────────────────────
interface SceneNarration {
  id: number;
  narration: string;
}

type Priority = 'critical' | 'prefetch' | 'preload';

interface QueueItem {
  cacheKey: string;
  text: string;
  voiceId: string;
  priority: Priority;
  resolve: (buf: AudioBuffer) => void;
  reject: (err: Error) => void;
}

// ─── Global Request Queue ──────────────────────────────────────────
// Only ONE request runs at a time. This prevents all 429 errors.
// Priority order: critical (current scene) > prefetch (next scene) > preload (hover)
const queue: QueueItem[] = [];
let isProcessing = false;
let lastRequestTime = 0;

const priorityWeight: Record<Priority, number> = {
  critical: 0,
  prefetch: 1,
  preload: 2,
};

const short = (text: string) => `"${text.slice(0, 40)}${text.length > 40 ? '...' : ''}"`;

/** Sort queue so highest-priority items come first */
const sortQueue = () => {
  queue.sort((a, b) => priorityWeight[a.priority] - priorityWeight[b.priority]);
};

/** Process queue items one at a time */
const processQueue = async () => {
  if (isProcessing || queue.length === 0) return;
  isProcessing = true;
  console.log(`[TTS Queue] ▶ Processing started — ${queue.length} item(s) queued`);

  while (queue.length > 0) {
    sortQueue();
    const item = queue.shift()!;
    const label = `[${item.priority.toUpperCase()}]`;

    // Already cached? Resolve immediately, skip API call
    if (audioCache.has(item.cacheKey)) {
      console.log(`[TTS Queue] ${label} Cache HIT — ${short(item.text)}  (skipping API call)`);
      item.resolve(audioCache.get(item.cacheKey)!);
      continue;
    }

    // Respect minimum gap between API calls
    const elapsed = Date.now() - lastRequestTime;
    if (elapsed < MIN_REQUEST_GAP_MS) {
      const waitMs = MIN_REQUEST_GAP_MS - elapsed;
      console.log(`[TTS Queue] ${label} Throttling — waiting ${waitMs}ms before next request`);
      await sleep(waitMs);
    }

    // Fetch with retry
    let success = false;
    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
      try {
        console.log(`[TTS Queue] ${label} Fetching ${short(item.text)}${attempt > 0 ? ` (retry ${attempt})` : ''}`);
        lastRequestTime = Date.now();
        const arrayBuffer = await fetchRawAudio(item.text, item.voiceId);
        const audioContext = await getSharedAudioContext();
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

        audioCache.set(item.cacheKey, audioBuffer);
        item.resolve(audioBuffer);
        console.log(`[TTS Queue] ${label} ✓ Cached ${short(item.text)}  (${audioBuffer.duration.toFixed(1)}s audio, cache size: ${audioCache.size})`);
        success = true;
        break;
      } catch (err: any) {
        const is429 = err?.message?.includes('429') || err?.message?.includes('Rate limit');
        if (is429 && attempt < MAX_RETRIES) {
          const delay = BASE_RETRY_DELAY_MS * Math.pow(2, attempt);
          console.warn(`[TTS Queue] ${label} ⚠ 429 Rate Limited on ${short(item.text)} — retrying in ${delay}ms (attempt ${attempt + 1}/${MAX_RETRIES})`);
          await sleep(delay);
        } else {
          console.error(`[TTS Queue] ${label} ✗ FAILED ${short(item.text)}`, err?.message || err);
          item.reject(err instanceof Error ? err : new Error(String(err)));
          success = true; // move on even though it failed
          break;
        }
      }
    }

    if (!success) {
      console.error(`[TTS Queue] ${label} ✗ Max retries exceeded for ${short(item.text)}`);
      item.reject(new Error("Max retries exceeded"));
    }

    // Log remaining queue state
    if (queue.length > 0) {
      console.log(`[TTS Queue] — ${queue.length} item(s) remaining: [${queue.map(q => q.priority).join(', ')}]`);
    }
  }

  console.log('[TTS Queue] ■ Processing complete — queue empty');
  isProcessing = false;
};

/** Enqueue a fetch request and return a Promise for the AudioBuffer */
const enqueueFetch = (text: string, voiceId: string, priority: Priority): Promise<AudioBuffer> => {
  const cacheKey = getCacheKey(text, voiceId);

  // Already cached? Return immediately
  if (audioCache.has(cacheKey)) {
    console.log(`[TTS Enqueue] [${priority.toUpperCase()}] Cache HIT — ${short(text)} (instant)`);
    return Promise.resolve(audioCache.get(cacheKey)!);
  }

  // Already in queue? Upgrade priority if needed, return same promise
  const existing = queue.find(q => q.cacheKey === cacheKey);
  if (existing) {
    const upgraded = priorityWeight[priority] < priorityWeight[existing.priority];
    if (upgraded) {
      console.log(`[TTS Enqueue] [${priority.toUpperCase()}] Priority UPGRADE ${existing.priority} → ${priority} for ${short(text)}`);
      existing.priority = priority;
    } else {
      console.log(`[TTS Enqueue] [${priority.toUpperCase()}] Already queued as ${existing.priority} — ${short(text)}`);
    }
    return new Promise((resolve, reject) => {
      const origResolve = existing.resolve;
      const origReject = existing.reject;
      existing.resolve = (buf) => { origResolve(buf); resolve(buf); };
      existing.reject = (err) => { origReject(err); reject(err); };
    });
  }

  console.log(`[TTS Enqueue] [${priority.toUpperCase()}] Added to queue — ${short(text)}  (queue size: ${queue.length + 1})`);
  return new Promise<AudioBuffer>((resolve, reject) => {
    queue.push({ cacheKey, text, voiceId, priority, resolve, reject });
    processQueue(); // kick off if not already running
  });
};

// ─── Helpers ───────────────────────────────────────────────────────
const getCacheKey = (text: string, voiceId: string): string =>
  `${voiceId}:${text.slice(0, 50)}:${text.length}`;

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

/** Raw API call – no caching, no queuing, just fetch bytes */
const fetchRawAudio = async (text: string, voiceId: string): Promise<ArrayBuffer> => {
  const response = await cartesia.tts.bytes({
    modelId: "sonic-2",
    transcript: text,
    voice: { mode: "id", id: voiceId },
    language: "en",
    outputFormat: {
      container: "wav",
      sampleRate: 44100,
      encoding: "pcm_f32le",
    },
  });

  if (response instanceof ArrayBuffer) return response;
  if (response instanceof Uint8Array) return response.buffer as ArrayBuffer;

  if (response && typeof (response as any).arrayBuffer === 'function') {
    if ((response as any).status === 429) throw new Error("Rate limit 429");
    if ((response as any).status >= 400) throw new Error(`API Error: ${(response as any).status}`);
    return await (response as any).arrayBuffer();
  }

  if (response && (response as any).buffer instanceof ArrayBuffer) {
    return (response as any).buffer;
  }

  if (response && (response as any).readableStream) {
    const reader = (response as any).reader as ReadableStreamDefaultReader<Uint8Array>;
    const chunks: Uint8Array[] = [];
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (value) chunks.push(value);
    }
    const totalLength = chunks.reduce((acc, c) => acc + c.length, 0);
    const combined = new Uint8Array(totalLength);
    let offset = 0;
    for (const chunk of chunks) {
      combined.set(chunk, offset);
      offset += chunk.length;
    }
    return combined.buffer;
  }

  throw new Error("Invalid TTS response format");
};

// ═══════════════════════════════════════════════════════════════════
//  HOOK: useTTSWithPrefetch
// ═══════════════════════════════════════════════════════════════════

interface UseTTSWithPrefetchProps {
  scenes: SceneNarration[];
  currentSceneId: number;
  isPlaying: boolean;
  onComplete?: () => void;
  voiceId?: string;
  prefetchCount?: number;
}

export const useTTSWithPrefetch = ({
  scenes,
  currentSceneId,
  isPlaying,
  onComplete,
  voiceId = DEFAULT_VOICE_ID,
  prefetchCount = 1,
}: UseTTSWithPrefetchProps) => {
  const [isReady, setIsReady] = useState(false);
  const [hasError, setHasError] = useState(false);

  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);
  const onCompleteRef = useRef(onComplete);
  const isCancelledRef = useRef(false);

  useEffect(() => { onCompleteRef.current = onComplete; }, [onComplete]);

  const currentScene = scenes.find(s => s.id === currentSceneId);
  const currentNarration = currentScene?.narration || "";

  const stopAudio = useCallback(() => {
    if (sourceNodeRef.current) {
      console.log('[TTS Play] Stopping current audio');
      try { sourceNodeRef.current.stop(); sourceNodeRef.current.disconnect(); } catch { /* already stopped */ }
      sourceNodeRef.current = null;
    }
  }, []);

  // ── Prefetch next scene(s) whenever the current scene changes ────
  useEffect(() => {
    if (!isPlaying || !currentSceneId) return;

    const idx = scenes.findIndex(s => s.id === currentSceneId);
    if (idx === -1) return;

    // Queue the next N scenes as 'prefetch' priority (below 'critical')
    const upcoming = scenes.slice(idx + 1, idx + 1 + prefetchCount);
    if (upcoming.length > 0) {
      console.log(`[TTS Prefetch] Scene ${currentSceneId} playing — prefetching next ${upcoming.length} scene(s): [${upcoming.map(s => s.id).join(', ')}]`);
    }
    upcoming.forEach(scene => {
      const key = getCacheKey(scene.narration, voiceId);
      if (!audioCache.has(key)) {
        enqueueFetch(scene.narration, voiceId, 'prefetch').catch(() => {});
      } else {
        console.log(`[TTS Prefetch] Scene ${scene.id} already cached — skipping`);
      }
    });
  }, [currentSceneId, isPlaying, scenes, prefetchCount, voiceId]);

  // ── Main playback effect ─────────────────────────────────────────
  useEffect(() => {
    if (!isPlaying || !currentNarration) {
      stopAudio();
      return;
    }

    isCancelledRef.current = false;
    setHasError(false);

    console.log(`[TTS Play] ▶ Scene ${currentSceneId} — requesting audio for ${short(currentNarration)}`);

    const play = async () => {
      try {
        if (!process.env.REACT_APP_CARTESIA_API_KEY) {
          throw new Error("API Key missing");
        }

        const startTime = Date.now();

        // Fetch with 'critical' priority – jumps to front of queue
        const audioBuffer = await enqueueFetch(currentNarration, voiceId, 'critical');

        if (isCancelledRef.current) {
          console.log(`[TTS Play] Scene ${currentSceneId} cancelled before playback`);
          return;
        }

        const waitTime = Date.now() - startTime;
        console.log(`[TTS Play] ▶ Scene ${currentSceneId} — playing now (waited ${waitTime}ms, duration: ${audioBuffer.duration.toFixed(1)}s)`);

        const audioContext = await getSharedAudioContext();
        const source = audioContext.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(audioContext.destination);

        source.onended = () => {
          console.log(`[TTS Play] ■ Scene ${currentSceneId} — audio ended`);
          if (!isCancelledRef.current && onCompleteRef.current) {
            onCompleteRef.current();
          }
        };

        sourceNodeRef.current = source;
        source.start(0);
        setIsReady(true);
      } catch (err) {
        console.error(`[TTS Play] ✗ Scene ${currentSceneId} — error:`, err);
        if (!isCancelledRef.current) setHasError(true);
      }
    };

    play();

    return () => {
      isCancelledRef.current = true;
      stopAudio();
    };
  }, [currentNarration, isPlaying, voiceId, stopAudio, currentSceneId]);

  return { isReady, hasError, cacheSize: audioCache.size };
};

// ═══════════════════════════════════════════════════════════════════
//  Browser TTS Fallback
// ═══════════════════════════════════════════════════════════════════

export const useBrowserTTSFallback = ({
  text,
  isPlaying,
  onComplete,
}: {
  text: string;
  isPlaying: boolean;
  onComplete?: () => void;
}) => {
  const onCompleteRef = useRef(onComplete);
  useEffect(() => { onCompleteRef.current = onComplete; }, [onComplete]);

  useEffect(() => {
    if (!isPlaying || !text) {
      window.speechSynthesis.cancel();
      return;
    }

    console.log(`[TTS Fallback] Using browser speech for ${short(text)}`);
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    const handleEnd = () => {
      console.log(`[TTS Fallback] Browser speech ended for ${short(text)}`);
      if (onCompleteRef.current) onCompleteRef.current();
    };
    utterance.onend = handleEnd;
    utterance.onerror = (e) => {
      console.warn(`[TTS Fallback] Browser speech error:`, e);
      handleEnd();
    };
    window.speechSynthesis.speak(utterance);

    return () => { window.speechSynthesis.cancel(); };
  }, [text, isPlaying]);
};

// ═══════════════════════════════════════════════════════════════════
//  Preload (hover) – lowest priority
// ═══════════════════════════════════════════════════════════════════

export const clearAudioCache = () => {
  console.log(`[TTS Cache] Cleared (was ${audioCache.size} items)`);
  audioCache.clear();
};

/**
 * Preload just the FIRST scene of a lesson on hover.
 * Uses 'preload' priority so it never blocks active playback.
 */
export const preloadScenes = async (
  scenes: SceneNarration[],
  voiceId: string = DEFAULT_VOICE_ID,
  count: number = 1,
): Promise<void> => {
  if (!process.env.REACT_APP_CARTESIA_API_KEY) {
    console.warn('[TTS Preload] No API key — skipping preload');
    return;
  }

  const toPreload = scenes.slice(0, count);
  console.log(`[TTS Preload] Hover preload requested for ${toPreload.length} scene(s)`);

  for (const scene of toPreload) {
    try {
      await enqueueFetch(scene.narration, voiceId, 'preload');
    } catch {
      // Silently ignore preload failures
    }
  }
};
