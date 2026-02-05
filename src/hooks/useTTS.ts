import { useState, useEffect, useCallback, useRef } from 'react';
import { CartesiaClient } from "@cartesia/cartesia-js";

// Initialize the client outside the hook to avoid recreating it
const cartesia = new CartesiaClient({
  apiKey: process.env.REACT_APP_CARTESIA_API_KEY || "", // Use empty string if env var is missing to avoid crash
});

interface UseTTSProps {
  text: string;
  isPlaying: boolean;
  onComplete?: () => void;
  voiceId?: string; // Optional voice ID override
}

// Standard Cartesia voices
// Using a default voice ID (Barbershop Man) if none provided
const DEFAULT_VOICE_ID = "694f9389-aac1-45b6-b726-9d9369183238"; 

export const useTTS = ({ text, isPlaying, onComplete, voiceId = DEFAULT_VOICE_ID }: UseTTSProps) => {
  const [isReady, setIsReady] = useState(false);
  const [hasError, setHasError] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);
  // const websocketRef = useRef<any>(null); // Keep track of the websocket connection
  
  // Clean up function to stop audio
  const stopAudio = useCallback(() => {
    if (sourceNodeRef.current) {
      try {
        sourceNodeRef.current.stop();
        sourceNodeRef.current.disconnect();
      } catch (e) {
        // Ignore errors if already stopped
      }
      sourceNodeRef.current = null;
    }
    
    // Close websocket if it exists and is open - this is conceptual, 
    // the SDK manages the socket, but we want to stop processing.
    // In SDK v1, we mostly just stop playing.
  }, []);

  // Use a ref for onComplete to avoid effect re-runs when it changes
  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    // If not playing or empty text, stop everything
    if (!isPlaying || !text) {
      stopAudio();
      return;
    }

    let isCancelled = false;
    setHasError(false);

    const playTTS = async () => {
      try {
        // Check if API key exists
        if (!process.env.REACT_APP_CARTESIA_API_KEY) {
            console.warn("Cartesia API Key missing, falling back to browser TTS");
            throw new Error("API Key missing");
        }

        // Initialize AudioContext if needed (browser requirement: must be after user interaction)
        if (!audioContextRef.current) {
          audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
        
        if (audioContextRef.current.state === 'suspended') {
          await audioContextRef.current.resume();
        }

        // Use the bytes endpoint for simpler playback in this context, 
        // or the websocket for streaming. For short phrases, bytes is often easier to manage manually,
        // but for "real-time" feeling, streaming is better.
        // Let's use the SDK's built-in player if available or buffer playback.
        // The instructions show using `client.tts.bytes` or websocket.
        
        // For this implementation, we'll fetch the audio as a buffer and play it.
        // This is slightly higher latency than streaming but more robust for a "slide" based approach
        // where we want to ensure synchronization.
        
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

        if (isCancelled) return;

        // Verify response is an ArrayBuffer or convertable to one
        let arrayBuffer: ArrayBuffer;

        if (response instanceof ArrayBuffer) {
            arrayBuffer = response;
        } else if (response instanceof Uint8Array) {
            arrayBuffer = response.buffer;
        } else if (response && typeof (response as any).arrayBuffer === 'function') {
            // It might be a Response object or similar wrapper (like UndiciStreamWrapper in some envs)
            // Check status if available (e.g. 429)
            if ((response as any).status === 429) {
                console.warn("Cartesia TTS: Rate limit exceeded (429)");
                throw new Error("Rate limit exceeded");
            }
            if ((response as any).status >= 400) {
                 console.warn("Cartesia TTS: API Error", (response as any).status);
                 throw new Error(`API Error: ${(response as any).status}`);
            }
            arrayBuffer = await (response as any).arrayBuffer();
        } else if (response && (response as any).buffer instanceof ArrayBuffer) {
             arrayBuffer = (response as any).buffer;
        } else if (response && (response as any).readableStream) {
             // Handle the UndiciStreamWrapper case specifically
             // The SDK returns a stream wrapper with a readableStream property AND a reader already attached
             // We need to use the existing reader to consume the stream
             console.log("Cartesia TTS: Received stream wrapper, consuming ReadableStream...");
             try {
                // The wrapper already has a reader attached, use it directly
                const reader = (response as any).reader as ReadableStreamDefaultReader<Uint8Array>;
                const chunks: Uint8Array[] = [];
                
                // Read all chunks from the stream
                while (true) {
                  const { done, value } = await reader.read();
                  if (done) break;
                  if (value) chunks.push(value);
                }
                
                // Combine all chunks into a single Uint8Array
                const totalLength = chunks.reduce((acc, chunk) => acc + chunk.length, 0);
                const combined = new Uint8Array(totalLength);
                let offset = 0;
                for (const chunk of chunks) {
                  combined.set(chunk, offset);
                  offset += chunk.length;
                }
                
                arrayBuffer = combined.buffer;
                console.log("Cartesia TTS: Successfully read", totalLength, "bytes from stream");
             } catch (e) {
                 console.error("Cartesia TTS: Failed to read stream", e);
                 throw e;
             }
        } else {
             // Try to inspect the object keys for debugging
             try {
                console.error("Cartesia TTS: Invalid response format", response, Object.keys(response || {}));
             } catch (e) {
                console.error("Cartesia TTS: Invalid response format", response);
             }
             throw new Error("Invalid response format from TTS API");
        }
        
        // Decode the audio
        const audioBuffer = await audioContextRef.current.decodeAudioData(arrayBuffer);
        
        if (isCancelled) return;

        // Play the audio
        const source = audioContextRef.current.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(audioContextRef.current.destination);
        
        source.onended = () => {
          if (!isCancelled && onCompleteRef.current) {
            onCompleteRef.current();
          }
        };

        sourceNodeRef.current = source;
        source.start(0);
        setIsReady(true);

      } catch (err) {
        console.error("Cartesia TTS Error:", err);
        if (!isCancelled) {
          setHasError(true); // Trigger fallback
          // Don't call onComplete here, let the component handle the fallback
        }
      }
    };

    playTTS();

    return () => {
      isCancelled = true;
      stopAudio();
    };
  }, [text, isPlaying, voiceId, stopAudio]);

  return { isReady, hasError };
};

// Fallback hook using Web Speech API
export const useBrowserTTS = ({ text, isPlaying, onComplete }: UseTTSProps) => {
  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (!isPlaying || !text) {
      window.speechSynthesis.cancel();
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    
    const handleEnd = () => {
      if (onCompleteRef.current) onCompleteRef.current();
    };

    utterance.onend = handleEnd;
    utterance.onerror = handleEnd; // Proceed even on error

    window.speechSynthesis.speak(utterance);

    return () => {
      window.speechSynthesis.cancel();
    };
  }, [text, isPlaying]);
};
