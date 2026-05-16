import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, ArrowRight, Brain, MessageSquare, Layers, Target } from 'lucide-react';
const VideoLessonVisualizer = () => {
  return (
    <div className="video-lesson-container" style={{
      width: '100%',
      aspectRatio: '16/9',
      background: '#030712',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {/* Dynamic Background */}
      <motion.div
        animate={{ opacity: [0.15, 0.3, 0.15], scale: [0.9, 1.2, 0.9] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        style={{ position: 'absolute', width: '60%', height: '60%', background: '#7c3aed', filter: 'blur(120px)', borderRadius: '50%' }}
      />
      <motion.div
        animate={{ opacity: [0.1, 0.25, 0.1], scale: [1.1, 0.8, 1.1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        style={{ position: 'absolute', width: '50%', height: '50%', background: '#00f6bb', filter: 'blur(100px)', borderRadius: '50%', top: '20%', right: '10%' }}
      />

      {/* 3D Moving Composition */}
      <div style={{ perspective: '1500px', zIndex: 10, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <motion.div
          animate={{ rotateX: [15, 375], rotateY: [-15, 345] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          style={{ width: '250px', height: '250px', transformStyle: 'preserve-3d', position: 'relative' }}
        >
          {/* Geometric Rings */}
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} style={{
              position: 'absolute',
              inset: 0,
              border: `2px solid ${i % 2 === 0 ? 'rgba(0, 246, 187, 0.6)' : 'rgba(124, 58, 237, 0.6)'}`,
              borderRadius: '50%',
              transform: `rotateX(${i * 30}deg) rotateY(${i * 60}deg)`,
              boxShadow: `0 0 20px ${i % 2 === 0 ? 'rgba(0, 246, 187, 0.3)' : 'rgba(124, 58, 237, 0.3)'}`,
            }} />
          ))}

          {/* Core Energy Sphere */}
          <motion.div
            animate={{ scale: [0.9, 1.2, 0.9], rotateZ: [0, 180, 360] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: 'absolute',
              top: '30%',
              left: '30%',
              width: '40%',
              height: '40%',
              borderRadius: '50%',
              background: 'radial-gradient(circle, #fff 10%, #00f6bb 40%, transparent 80%)',
              boxShadow: '0 0 50px #00f6bb',
              transformStyle: 'preserve-3d'
            }}
          />

          {/* Floating Data Nodes */}
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.div
              key={`node-${i}`}
              animate={{ rotateY: [0, 360], rotateZ: [0, 360] }}
              transition={{ duration: 8 + i * 0.5, repeat: Infinity, ease: "linear", delay: i * 0.1 }}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '100%',
                height: '100%',
                transformStyle: 'preserve-3d',
                transformOrigin: 'center'
              }}
            >
              <div style={{
                position: 'absolute',
                top: `${(i * 17) % 100}%`,
                left: `${(i * 23) % 100}%`,
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#fff',
                boxShadow: '0 0 10px #fff, 0 0 20px #00f6bb',
                transform: `translateZ(${50 + (i * 10)}px)`
              }} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Video Player UI Overlay */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '30px 24px 20px',
        background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.7) 40%, transparent 100%)',
        zIndex: 20,
        display: 'flex', flexDirection: 'column', gap: '16px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <h3 style={{ margin: 0, color: '#fff', fontSize: '22px', fontWeight: 600, textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
              Neural Architecture & Hyperdimensional Topology
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'rgba(255,255,255,0.8)', fontSize: '14px' }}>
                <Brain size={16} color="#00f6bb" />
                <span>Lucid Engine</span>
              </div>
              <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(255,255,255,0.3)' }} />
              <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>Interactive 3D Mode</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
             <button style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', padding: '8px 16px', borderRadius: '8px', color: '#fff', fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', backdropFilter: 'blur(10px)' }}>
               <Target size={16} /> Track Path
             </button>
             <button style={{ background: '#00f6bb', border: 'none', padding: '8px 20px', borderRadius: '8px', color: '#020613', fontSize: '14px', fontWeight: 600, cursor: 'pointer', boxShadow: '0 4px 15px rgba(0,246,187,0.4)' }}>
               Join Live
             </button>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.2)', borderRadius: '3px', position: 'relative', cursor: 'pointer', overflow: 'hidden' }}>
             <motion.div
               animate={{ width: ['0%', '100%'] }}
               transition={{ duration: 180, ease: "linear", repeat: Infinity }}
               style={{ position: 'absolute', top: 0, left: 0, height: '100%', background: 'linear-gradient(90deg, #7c3aed, #00f6bb)' }}
             />
             <motion.div 
               animate={{ left: ['0%', '100%'] }}
               transition={{ duration: 180, ease: "linear", repeat: Infinity }}
               style={{ position: 'absolute', top: 0, width: '10px', height: '100%', background: '#fff', boxShadow: '0 0 10px #fff' }}
             />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'rgba(255,255,255,0.6)', fontSize: '13px', fontWeight: 500, fontFamily: 'monospace' }}>
            <span>04:23</span>
            <span>-12:08</span>
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
          <feGaussianBlur stdDeviation="30" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <filter id="glow-small">
          <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Sky */}
      <rect width="1440" height="1600" fill="url(#skyGrad)" opacity="0.8" />
      
      {/* Sun/Core */}
      <circle cx="1100" cy="400" r="140" fill="var(--primary)" filter="url(#glow)" opacity="0.4" />
      <circle cx="1100" cy="400" r="80" fill="#fff" filter="url(#glow)" opacity="0.9" />

      {/* Background Mountains */}
      <path d="M0 350 L250 200 L500 330 L800 100 L1150 350 L1440 200 L1440 1600 L0 1600 Z" fill="url(#mountainGrad1)" opacity="0.8"/>
      
      {/* Foreground Mountains */}
      <path d="M0 500 L350 300 L700 500 L1050 250 L1440 450 L1440 1600 L0 1600 Z" fill="url(#mountainGrad2)" />

      {/* Energy Streams / Data Pathways falling behind foothills */}
      <path d="M350 300 Q 250 600 400 900 T 200 1400" fill="none" stroke="url(#streamGrad1)" strokeWidth="3" filter="url(#glow-small)" opacity="0.7"/>
      <path d="M1050 250 Q 1200 550 950 850 T 1150 1350" fill="none" stroke="url(#streamGrad2)" strokeWidth="4" filter="url(#glow-small)" opacity="0.8"/>
      <path d="M700 500 Q 550 750 800 1050 T 650 1500" fill="none" stroke="url(#streamGrad3)" strokeWidth="2" filter="url(#glow-small)" opacity="0.6"/>
      
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
              Interactive Lessons. <br />
              Generated by AI.
            </motion.h1>
            
            <motion.p 
              className="hero-sub cluely-sub"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Lucid turns any topic into an interactive, personalized journey. No videos to skip. No generic explanations. All tailored to your exact learning style.
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
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}
              >
                <Zap size={20} fill="currentColor" /> Generate a Lesson
              </a>
            </motion.div>
          </div>
        </section>

      <section className="demo-showcase cluely-showcase">
        <div className="glass-frame active">
          <div className="app-window">
            <div className="window-header">
              <div className="dots"><span></span><span></span><span></span></div>
              <div className="address-bar">app.lucid-ai.co/lesson/neural-topology</div>
            </div>
            <div className="window-content" style={{ position: 'relative', display: 'flex', flexDirection: 'column' }}>
              <VideoLessonVisualizer />
            </div>
          </div>
          <div className="glow-effect"></div>
        </div>
      </section>
      </div>

      {/* Method Section Integrated */}
      <section className="value-prop">
        <div className="section-title">
          <motion.h2
             initial={{ y: 20, opacity: 0 }}
             whileInView={{ y: 0, opacity: 1 }}
             viewport={{ once: true }}
          >
            The Knowledge Engine
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Passive video lectures are obsolete. Lucid is an active learning engine that deconstructs complexity.
          </motion.p>
        </div>
        
        <div className="bento-grid">
          <motion.div 
            className="bento-card"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="card-icon"><Brain size={32} color="#00F6BB" /></div>
            <h3>Hyper-Personalization</h3>
            <p>Lucid detects exactly what you don't understand and rewrites the lesson in real-time to bridge the gap. It's not just a different explanation; it's a different curriculum generated on the fly.</p>
            <div className="card-visual visual-graph"></div>
          </motion.div>

          <motion.div 
            className="bento-card"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className="card-icon"><MessageSquare size={32} color="#7C3AED" /></div>
            <h3>Socratic Dialogue</h3>
            <p>It doesn't just lecture. It asks questions, challenges assumptions, and ensures you actually get it.</p>
          </motion.div>

          <motion.div 
            className="bento-card"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="card-icon"><Layers size={32} color="#06B6D4" /></div>
            <h3>Multimodal</h3>
            <p>Switch instantly between text, voice, and interactive visuals to match your learning style.</p>
          </motion.div>

           <motion.div 
            className="bento-card"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div className="card-icon"><Target size={32} color="#F43F5E" /></div>
            <h3>Gap Analysis</h3>
            <p>We map your knowledge graph and identify missing prerequisites before you even realize you're stuck.</p>
          </motion.div>

          <motion.div 
            className="bento-card"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <div className="card-icon"><Zap size={32} color="#EAB308" /></div>
            <h3>Instant Interactive Models</h3>
            <p>Don't imagine the physics. Play with it. Lucid generates interactive simulations (sliders, graphs, 3D objects) alongside the explanation so you can test your intuition immediately.</p>
          </motion.div>
        </div>
      </section>
      
      <section className="explore-teaser">
        <div className="cta-content">
            <h2>Ready to explore?</h2>
            <p className="cta-sub">Jump into a live session instantly.</p>
            <div className="cta-buttons" style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/explore" className="btn-white">
                View Examples <ArrowRight size={18} style={{ marginLeft: 8 }} />
              </Link>
              <a href="https://app.lucid-ai.co" className="btn-glow">
                Get Started
              </a>
            </div>
        </div>
      </section>
    </motion.div>
  );
};
