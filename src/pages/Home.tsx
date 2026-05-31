import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, ArrowRight, Brain, Layers, Activity, Cpu } from 'lucide-react';

const Scene0 = () => (
  <motion.div
    initial={{ scale: 0.8, opacity: 0, rotateX: 60 }}
    animate={{ scale: 1, opacity: 1, rotateX: [15, 375], rotateY: [-15, 345] }}
    exit={{ scale: 1.2, opacity: 0, filter: "blur(20px)" }}
    transition={{ duration: 7, ease: "linear" }}
    style={{ width: 'clamp(200px, 60vw, 250px)', height: 'clamp(200px, 60vw, 250px)', transformStyle: 'preserve-3d', position: 'relative' }}
  >
    {Array.from({ length: 6 }).map((_, i) => (
      <div key={i} style={{
        position: 'absolute', inset: 0,
        border: `2px solid ${i % 2 === 0 ? 'rgba(0, 246, 187, 0.6)' : 'rgba(124, 58, 237, 0.6)'}`,
        borderRadius: '50%',
        transform: `rotateX(${i * 30}deg) rotateY(${i * 60}deg)`,
        boxShadow: `0 0 20px ${i % 2 === 0 ? 'rgba(0, 246, 187, 0.3)' : 'rgba(124, 58, 237, 0.3)'}`,
      }} />
    ))}
    <motion.div
      animate={{ scale: [0.9, 1.2, 0.9], rotateZ: [0, 180, 360] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      style={{
        position: 'absolute', top: '30%', left: '30%', width: '40%', height: '40%',
        borderRadius: '50%', background: 'radial-gradient(circle, #fff 10%, #00f6bb 40%, transparent 80%)',
        boxShadow: '0 0 50px #00f6bb', transformStyle: 'preserve-3d'
      }}
    />
    {Array.from({ length: 15 }).map((_, i) => (
      <motion.div
        key={`node-${i}`}
        animate={{ rotateY: [0, 360], rotateZ: [0, 360] }}
        transition={{ duration: 8 + i * 0.5, repeat: Infinity, ease: "linear", delay: i * 0.1 }}
        style={{
          position: 'absolute', top: '50%', left: '50%', width: '100%', height: '100%',
          transformStyle: 'preserve-3d', transformOrigin: 'center'
        }}
      >
        <div style={{
          position: 'absolute', top: `${(i * 17) % 100}%`, left: `${(i * 23) % 100}%`,
          width: '6px', height: '6px', borderRadius: '50%', background: '#fff',
          boxShadow: '0 0 10px #fff, 0 0 20px #00f6bb', transform: `translateZ(${50 + (i * 10)}px)`
        }} />
      </motion.div>
    ))}
  </motion.div>
);

const Scene1 = () => (
  <motion.div
    initial={{ scale: 0.5, opacity: 0, rotateX: 60, rotateZ: -45 }}
    animate={{ scale: 1, opacity: 1, rotateZ: [45, 90] }}
    exit={{ scale: 1.5, opacity: 0, filter: "blur(20px)" }}
    transition={{ duration: 7, ease: "linear" }}
    style={{
      width: 'clamp(220px, 70vw, 300px)', height: 'clamp(220px, 70vw, 300px)', transformStyle: 'preserve-3d',
      display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 'clamp(5px, 2vw, 15px)'
    }}
  >
    {Array.from({ length: 25 }).map((_, i) => (
      <motion.div
        key={i}
        initial={{ translateZ: 0 }}
        animate={{ translateZ: [0, Math.sin(i) * 50, 0], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, delay: i * 0.1, ease: "easeInOut" }}
        style={{
          width: '100%', height: '100%', borderRadius: '4px',
          background: 'rgba(6, 182, 212, 0.8)',
          boxShadow: '0 0 15px rgba(6, 182, 212, 0.5)',
          border: '1px solid #fff'
        }}
      />
    ))}
  </motion.div>
);

const Scene2 = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, filter: "blur(20px)", scale: 1.5 }}
    transition={{ duration: 1 }}
    style={{ width: 'clamp(220px, 70vw, 300px)', height: 'clamp(220px, 70vw, 300px)', perspective: '800px', position: 'relative' }}
  >
    {Array.from({ length: 8 }).map((_, i) => (
      <motion.div
        key={i}
        initial={{ translateZ: -1000, opacity: 0, rotateZ: i * 15 }}
        animate={{ translateZ: [-1000, 600], opacity: [0, 1, 0], rotateZ: i * 15 + 90 }}
        transition={{ duration: 5, repeat: Infinity, delay: i * 0.6, ease: "linear" }}
        style={{
          position: 'absolute', inset: '10%',
          border: '3px solid #f43f5e',
          borderRadius: '30%',
          boxShadow: '0 0 20px #f43f5e, inset 0 0 20px #8b5cf6',
          transformOrigin: 'center'
        }}
      />
    ))}
  </motion.div>
);

const Scene3 = () => (
  <motion.div
    initial={{ scale: 0, opacity: 0, rotateY: -90 }}
    animate={{ scale: 1.2, opacity: 1, rotateY: [90, 180], rotateX: 45 }}
    exit={{ scale: 2, opacity: 0, filter: "blur(20px)" }}
    transition={{ duration: 7, ease: "easeInOut" }}
    style={{ width: 'clamp(140px, 50vw, 180px)', height: 'clamp(140px, 50vw, 180px)', transformStyle: 'preserve-3d', position: 'relative' }}
  >
    {[...Array(8)].map((_, i) => (
      <motion.div
        key={i}
        animate={{ rotateZ: [0, 90], scale: [1, 1.1, 1] }}
        transition={{ duration: 4, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
        style={{
          position: 'absolute', inset: 0,
          border: '2px solid #eab308',
          background: 'rgba(234, 179, 8, 0.1)',
          transform: `translateZ(${(i - 4) * 20}px)`,
          boxShadow: '0 0 15px rgba(234,179,8,0.2)'
        }}
      />
    ))}
  </motion.div>
);

const sceneData = [
  {
    title: "Lesson 01: Core Neural Topology",
    theme: "Lucid Engine",
    bg1: "#7c3aed", bg2: "#00f6bb",
    icon: Brain
  },
  {
    title: "Lesson 02: Quantum Data Arrays",
    theme: "Grid Mode",
    bg1: "#06b6d4", bg2: "#3b82f6",
    icon: Layers
  },
  {
    title: "Lesson 03: Hyper-dimensional Warp",
    theme: "Z-Space Traverse",
    bg1: "#f43f5e", bg2: "#8b5cf6",
    icon: Activity
  },
  {
    title: "Lesson 04: Geometric Manifolds",
    theme: "Construct Mode",
    bg1: "#eab308", bg2: "#06b6d4",
    icon: Cpu
  }
];

const scenes = [<Scene0 key="0" />, <Scene1 key="1" />, <Scene2 key="2" />, <Scene3 key="3" />];

const VideoLessonVisualizer = () => {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [time, setTime] = useState(0);

  useEffect(() => {
    const sceneTimer = setInterval(() => {
      setSceneIndex(prev => (prev + 1) % sceneData.length);
    }, 7000);

    const timeTimer = setInterval(() => {
      setTime(prev => (prev + 1) % 28);
    }, 1000);

    return () => {
      clearInterval(sceneTimer);
      clearInterval(timeTimer);
    };
  }, []);

  const data = sceneData[sceneIndex];

  return (
    <div className="video-lesson-container" style={{
      width: '100%',
      aspectRatio: '16/9',
      minHeight: '400px',
      background: '#030712',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '12px',
      border: '1px solid rgba(255, 255, 255, 0.05)',
      boxShadow: '0 25px 50px -12px rgba(0,0,0,0.7)'
    }}>
      {/* Dynamic Background */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={`bg1-${sceneIndex}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.25 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2 }}
          style={{ position: 'absolute', width: '60%', height: '60%', background: data.bg1, filter: 'blur(120px)', borderRadius: '50%' }}
        />
        <motion.div
          key={`bg2-${sceneIndex}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2, delay: 0.5 }}
          style={{ position: 'absolute', width: '50%', height: '50%', background: data.bg2, filter: 'blur(100px)', borderRadius: '50%', top: '20%', right: '10%' }}
        />
      </AnimatePresence>

      {/* 3D Moving Composition */}
      <div style={{ perspective: '1500px', zIndex: 10, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <AnimatePresence mode="wait">
          {scenes[sceneIndex]}
        </AnimatePresence>
      </div>

      {/* Video Player UI Overlay */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: 'clamp(16px, 4vw, 30px) clamp(16px, 4vw, 24px) clamp(16px, 4vw, 20px)',
        background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.7) 40%, transparent 100%)',
        zIndex: 20,
        display: 'flex', flexDirection: 'column', gap: '16px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <AnimatePresence mode="wait">
              <motion.h3
                key={data.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                style={{ margin: 0, color: '#fff', fontSize: 'clamp(16px, 4.5vw, 22px)', fontWeight: 600, textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}
              >
                {data.title}
              </motion.h3>
            </AnimatePresence>

            <div style={{ display: 'flex', alignItems: 'center', gap: '3px', marginTop: '12px', height: '24px' }}>
              <div style={{ marginRight: '12px', display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.05)', padding: '4px 8px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.1)' }}>
                <motion.div
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#f43f5e', boxShadow: '0 0 10px #f43f5e' }}
                />
                <span style={{ fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.8)', letterSpacing: '1px' }}>Lucid</span>
              </div>
              {Array.from({ length: 32 }).map((_, i) => {
                const envelope = Math.sin((i / 31) * Math.PI);
                return (
                  <motion.div
                    key={`wave-${i}`}
                    animate={{ height: [`${15 + envelope * 15}%`, `${40 + Math.random() * 20 + envelope * 40}%`, `${15 + envelope * 15}%`] }}
                    transition={{ duration: 0.3 + Math.random() * 0.4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: Math.random() * 0.8 }}
                    style={{ width: '3px', background: data.bg2, borderRadius: '2px', opacity: 0.9, transition: 'background 0.5s ease' }}
                  />
                );
              })}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <a href="https://app.lucid-ai.co" style={{ background: '#00f6bb', border: 'none', padding: '6px 16px', borderRadius: '8px', color: '#020613', fontSize: '13px', fontWeight: 600, cursor: 'pointer', boxShadow: '0 4px 15px rgba(0,246,187,0.4)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
              Get Started
            </a>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.2)', borderRadius: '3px', position: 'relative', cursor: 'pointer', overflow: 'hidden' }}>
            <motion.div
              animate={{ width: ['0%', '100%'] }}
              transition={{ duration: 28, ease: "linear", repeat: Infinity }}
              style={{ position: 'absolute', top: 0, left: 0, height: '100%', background: `linear-gradient(90deg, ${data.bg1}, ${data.bg2})`, transition: 'background 0.5s ease' }}
            />
            <motion.div
              animate={{ left: ['0%', 'calc(100% - 10px)'] }}
              transition={{ duration: 28, ease: "linear", repeat: Infinity }}
              style={{ position: 'absolute', top: 0, width: '10px', height: '100%', background: '#fff', boxShadow: '0 0 10px #fff' }}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'rgba(255,255,255,0.6)', fontSize: '13px', fontWeight: 500, fontFamily: 'monospace' }}>
            <span>00:{time.toString().padStart(2, '0')}</span>
            <span>-00:{Math.max(0, 28 - time).toString().padStart(2, '0')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const CognitiveTracker = () => {
  return (
    <div className="adaptive-learning-visualizer">
      <div className="dashboard-header" style={{ marginBottom: '16px' }}>
        <div className="status-active">
          <div className="status-dot"></div>
          Adaptive Mapping
        </div>
        <div className="dashboard-label">Live Tracker</div>
      </div>

      <div className="visualizer-flow" style={{ flexGrow: 1 }}>
        {/* Column 1: Clicks & Interactions */}
        <div className="flow-step">
          <div className="step-badge">1. Interactions</div>
          <div className="interaction-cards">
            <div className="interaction-card">
              <span className="card-emoji">❓</span>
              <div className="card-text">
                <strong>Analogy Request</strong>
              </div>
            </div>
            <div className="interaction-card stuck-detected">
              <span className="card-emoji">⏱️</span>
              <div className="card-text">
                <strong>Stuck Detected</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Central processor connector */}
        <div className="flow-connector">
          <div className="connector-line">
            <div className="glowing-pulse"></div>
          </div>
          <div className="connector-text">Lucid Maps Path</div>
        </div>

        {/* Column 2: Custom Adapted Lesson Path */}
        <div className="flow-step">
          <div className="step-badge success">2. Custom Pathway</div>
          <div className="pathway-steps">
            <div className="path-step completed">
              <div className="path-dot">✓</div>
              <div className="card-text">
                <strong>Prereqs Filled</strong>
              </div>
            </div>
            <div className="path-step active">
              <div className="path-dot"></div>
              <div className="card-text">
                <strong>Visual Lesson</strong>
              </div>
            </div>
            <div className="path-step locked">
              <div className="path-dot">🎯</div>
              <div className="card-text">
                <strong>Goal Met</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MultimodalInspo = () => {
  const [mode, setMode] = useState<'chat' | 'visual'>('chat');

  useEffect(() => {
    const timer = setInterval(() => {
      setMode(prev => prev === 'chat' ? 'visual' : 'chat');
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="morphing-panel-wrapper">
      <div className="morphing-panel-header">
        <div className="dots">
          <span></span><span></span><span></span>
        </div>
        <div>
          <span className={`mode-badge ${mode === 'chat' ? 'chat-mode' : 'visual-mode'}`}>
            {mode === 'chat' ? 'Chat Interface' : 'Visual Lesson'}
          </span>
        </div>
      </div>

      <div className="morphing-content-container">
        <AnimatePresence mode="wait">
          {mode === 'chat' ? (
            <motion.div
              key="chat"
              className="morphing-state"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.35 }}
              style={{ justifyContent: 'space-between' }}
            >
              <div className="chat-messages-container" style={{ justifyContent: 'center' }}>
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="chat-bubble ai"
                >
                  Let's explore wave compression. Ready?
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="chat-bubble user"
                >
                  Yes, show me a visual model!
                </motion.div>
              </div>

              <div className="chat-input-bar">
                <div className="chat-input-field">
                  <span>Type a response...</span>
                </div>
                <div className="chat-send-btn">
                  <ArrowRight size={14} />
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="visual"
              className="morphing-state"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.35 }}
              style={{ justifyContent: 'space-between' }}
            >
              <div className="visual-video-screen voice-session-active" style={{ flexGrow: 1 }}>
                {/* Voice Call Floating Header Mini */}
                <div className="voice-call-status-mini">
                  <span className="voice-indicator-dot-pulsing"></span>
                  <span>VOICE SESSION ACTIVE</span>
                </div>

                {/* Main Dynamic doppler diagram */}
                <div className="visual-math-waves doppler-container-gradient" style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
                  <div className="visual-physics-dot neon-pulsing-source" />
                  <div className="doppler-wave-ring gradient-wave-1"></div>
                  <div className="doppler-wave-ring gradient-wave-2"></div>
                  <div className="doppler-wave-ring gradient-wave-3"></div>
                </div>

                {/* Subtitle / Voice Transcript Overlay Mini */}
                <div className="voice-transcript-mini">
                  <span>Lucid: "Move the source velocity to hear the pitch shift in real-time."</span>
                </div>
              </div>

              <div className="visual-media-controls" style={{ paddingTop: '12px' }}>
                <div className="controls-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div className="timeline-slider-bar" style={{ height: '4px', flexGrow: 1 }}>
                    <div className="timeline-slider-fill" style={{ animationDuration: '6s' }}></div>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: '16px' }}>
                    <span style={{ fontSize: '10px', fontFamily: 'monospace', color: 'var(--text-muted)' }}>0:08 / 1:30</span>
                    
                    {/* Tiny pulsing voice wave bars */}
                    <div className="tiny-wave-indicator">
                      <span className="wave-bar bar-1"></span>
                      <span className="wave-bar bar-2"></span>
                      <span className="wave-bar bar-3"></span>
                      <span className="wave-bar bar-4"></span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const MasteryVisualizer = () => {
  const [callDuration, setCallDuration] = useState('04:12');

  // Simple call timer counting up
  useEffect(() => {
    let seconds = 252; // 4 minutes and 12 seconds
    const interval = setInterval(() => {
      seconds += 1;
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      setCallDuration(`${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="voice-call-app-window">
      {/* FaceTime-style Video Feed Container */}
      <div className="voice-call-feed-container">
        
        {/* Floating Call Status HUD */}
        <div className="call-hud-header">
          <div className="hud-left">
            <span className="live-badge-pulse"></span>
            <span className="live-badge-text">LIVE SESSION</span>
          </div>
          <div className="hud-center">
            <span className="hud-topic-title">Lucid: Doppler Effect</span>
          </div>
          <div className="hud-right">
            <span className="hud-timer">{callDuration}</span>
          </div>
        </div>

        {/* Kinetic Typography Breakthrough Visual */}
        <div className="kinetic-motion-canvas">
          {/* Liquid background gradient mesh */}
          <div className="kinetic-bg-mesh"></div>
          
          {/* Animated dust particles floating in background */}
          <div className="kinetic-particle p1"></div>
          <div className="kinetic-particle p2"></div>
          <div className="kinetic-particle p3"></div>
          <div className="kinetic-particle p4"></div>
          <div className="kinetic-particle p5"></div>

          {/* Row 1: Suddenly, it all clicked. */}
          <div className="kinetic-word-row row-1">
            <span className="kinetic-word accent-green delay-1">Suddenly,</span>
            <span className="kinetic-word delay-2">it</span>
            <span className="kinetic-word delay-3">all</span>
            <span className="kinetic-word accent-purple delay-4">clicked.</span>
          </div>

          {/* Row 2: I'm glad you understand! */}
          <div className="kinetic-word-row row-2">
            <span className="kinetic-word delay-5">"I'm</span>
            <span className="kinetic-word delay-6">glad</span>
            <span className="kinetic-word delay-7">you</span>
            <span className="kinetic-word accent-green delay-8">understand!"</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const HeroBackground = () => (
  <div className="hero-bg-container">
    <svg viewBox="0 0 1440 1600" preserveAspectRatio="xMidYMin slice" className="hero-svg-bg">
      <defs>
        <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="650" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="var(--sky-top, #0a1930)" />
          <stop offset="60%" stopColor="var(--sky-mid, #112d5e)" />
          <stop offset="100%" stopColor="var(--sky-bottom, #00f6bb)" />
        </linearGradient>
        <linearGradient id="mountainGrad1" x1="0" y1="100" x2="0" y2="650" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="var(--mountain-top, #0d2247)" />
          <stop offset="100%" stopColor="var(--mountain-bottom, #050d1c)" />
        </linearGradient>
        <linearGradient id="mountainGrad2" x1="0" y1="250" x2="0" y2="650" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="var(--mountain-front-top, #05112b)" />
          <stop offset="100%" stopColor="var(--mountain-front-bottom, #020613)" />
        </linearGradient>

        {/* Foothill Gradients fading into background */}
        <linearGradient id="hillGrad1" x1="0" y1="500" x2="0" y2="900" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="var(--mountain-front-bottom, #020613)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="var(--bg)" stopOpacity="0.8" />
        </linearGradient>
        <linearGradient id="hillGrad2" x1="0" y1="800" x2="0" y2="1200" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="var(--mountain-front-bottom, #020613)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="var(--bg)" stopOpacity="1" />
        </linearGradient>

        {/* Glowing Data Stream Gradients */}
        <linearGradient id="streamGrad1" x1="0" y1="300" x2="0" y2="1400" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.8" />
          <stop offset="50%" stopColor="var(--primary)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="streamGrad2" x1="0" y1="250" x2="0" y2="1300" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.9" />
          <stop offset="60%" stopColor="#7C3AED" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="streamGrad3" x1="0" y1="500" x2="0" y2="1500" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00F6BB" stopOpacity="0.7" />
          <stop offset="70%" stopColor="#06B6D4" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#06B6D4" stopOpacity="0" />
        </linearGradient>

        <filter id="glow">
          <feGaussianBlur stdDeviation="30" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="glow-small">
          <feGaussianBlur stdDeviation="8" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Sky */}
      <rect width="1440" height="1600" fill="url(#skyGrad)" opacity="0.8" />

      {/* Sun/Core */}
      <circle cx="1100" cy="400" r="140" fill="var(--primary)" filter="url(#glow)" opacity="0.4" />
      <circle cx="1100" cy="400" r="80" fill="#fff" filter="url(#glow)" opacity="0.9" />

      {/* Background Mountains */}
      <path d="M0 350 L250 200 L500 330 L800 100 L1150 350 L1440 200 L1440 1600 L0 1600 Z" fill="url(#mountainGrad1)" opacity="0.8" />

      {/* Foreground Mountains */}
      <path d="M0 500 L350 300 L700 500 L1050 250 L1440 450 L1440 1600 L0 1600 Z" fill="url(#mountainGrad2)" />

      {/* Energy Streams / Data Pathways falling behind foothills */}
      <path d="M350 300 Q 250 600 400 900 T 200 1400" fill="none" stroke="url(#streamGrad1)" strokeWidth="3" filter="url(#glow-small)" opacity="0.7" />
      <path d="M1050 250 Q 1200 550 950 850 T 1150 1350" fill="none" stroke="url(#streamGrad2)" strokeWidth="4" filter="url(#glow-small)" opacity="0.8" />
      <path d="M700 500 Q 550 750 800 1050 T 650 1500" fill="none" stroke="url(#streamGrad3)" strokeWidth="2" filter="url(#glow-small)" opacity="0.6" />

      {/* Data Nodes */}
      <circle cx="400" cy="900" r="5" fill="var(--primary)" filter="url(#glow-small)" opacity="0.8" />
      <circle cx="950" cy="850" r="6" fill="#7C3AED" filter="url(#glow-small)" opacity="0.8" />
      <circle cx="800" cy="1050" r="4" fill="#06B6D4" filter="url(#glow-small)" opacity="0.8" />

      {/* Lower Foothills / Valleys extending downwards */}
      <path d="M0 600 Q 350 450 750 700 T 1440 550 L1440 1600 L0 1600 Z" fill="url(#hillGrad1)" />
      <path d="M0 800 Q 400 1000 850 750 T 1440 900 L1440 1600 L0 1600 Z" fill="url(#hillGrad2)" />
    </svg>
    <div className="hero-bg-overlay"></div>
  </div>
);

export const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="page-content"
    >
      <div className="hero-and-demo-container">
        <HeroBackground />

        <section className="hero-impressive cluely-style-hero">
          <div className="hero-content-wrapper">
            <motion.h1
              className="mega-headline cluely-headline"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Learn Face-to-Face <br /> With an AI Tutor.
            </motion.h1>

            <motion.p
              className="hero-sub cluely-sub"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Ask questions, have real conversations, and learn like you’re on a call with a personal teacher.
            </motion.p>

            <motion.div
              className="hero-ctas cluely-ctas"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <a
                href="https://app.lucid-ai.co"
                className="btn-glow cluely-main-btn"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none', borderRadius: '50px' }}
              >
                <Zap size={20} fill="currentColor" /> Get Started
              </a>
            </motion.div>
          </div>
        </section>

        <section className="demo-showcase cluely-showcase">
          <div className="glass-frame active">
            <div className="app-window">
              <div className="window-header">
                <div className="dots"><span></span><span></span><span></span></div>
                <div className="address-bar">app.lucid-ai.co/lesson/1</div>
              </div>
              <div className="window-content" style={{ position: 'relative', display: 'flex', flexDirection: 'column' }}>
                <VideoLessonVisualizer />
              </div>
            </div>
            <div className="glow-effect"></div>
          </div>
        </section>
      </div>

      {/* How Lucid Helps Your Learning Section */}
      <section className="lucid-inspo-section">
        <div className="section-title">
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800 }}
          >
            How Lucid guides your learning
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Passive lectures are obsolete. Lucid adaptively maps, visualizes, and personalizes your learning curve.
          </motion.p>
        </div>

        <div className="lucid-inspo-grid">
          {/* Card 1: Cognitive Tracking */}
          <motion.div
            className="lucid-inspo-card-left"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="card-intro-content">
              <h3>
                Lucid <span className="badge-pill indigo-pill"><Brain size={12} strokeWidth={3} /> tracks</span> how you learn
              </h3>
              <p>
                Lucid maps your knowledge graph in real-time. By tracking how you learn, your environment, and how you think, it builds the optimal path to reach your goals—whether to master a complex subject or ace your exams.
              </p>
            </div>
            
            <CognitiveTracker />
          </motion.div>

          {/* Card 2: Multimodal Morphing */}
          <motion.div
            className="lucid-inspo-card-right"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="card-intro-content">
              <h3>
                Learn <span className="badge-pill grey-pill"><Layers size={12} strokeWidth={3} /> the way</span> you want
              </h3>
              <p>
                Switch seamlessly between rich text conversations with an active AI tutor and fully interactive visual lessons. Watch the UI transform instantly on the fly to fit your cognitive style.
              </p>
            </div>

            <MultimodalInspo />
          </motion.div>
        </div>
      </section>
      {/* Instant Understanding Section (Cluely outcome inspired) */}
      <section className="instant-understanding-section">
        <div className="section-title">
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800 }}
          >
            Instant understanding
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            The fastest path from complex confusion to total concept mastery.
          </motion.p>
        </div>

        <motion.div
          className="mastery-outer-frame"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <MasteryVisualizer />
        </motion.div>
      </section>

      <section className="explore-teaser">
        <div className="cta-content">
          <h2>Ready to get started?</h2>
          <p className="cta-sub">Jump into a live session instantly.</p>
          <a href="https://app.lucid-ai.co" className="cta-btn">
            <Zap size={20} fill="currentColor" />
            Get Started
            <ArrowRight size={20} />
          </a>
        </div>
      </section>
    </motion.div>
  );
};
