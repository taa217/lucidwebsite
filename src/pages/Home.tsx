import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, ArrowRight, Brain, MessageSquare, Layers, Target, Radio, Play } from 'lucide-react';
import { BiogasAnimation } from '../components/BiogasAnimation';
import { BiogasExplainer } from '../components/BiogasExplainer';
import { preloadScenes } from '../hooks/useTTSWithPrefetch';

// Biogas first scene for preloading on hover
const biogasScenesForPreload = [
  { id: 1, narration: "Let's take a quick look at how biogas is created using nothing more than organic waste and a bit of biology." },
];

const demoTimeline = [
  {
    title: 'Feedstock prep',
    copy: 'Lucid shows how food waste and manure are mixed to the right solids content.',
  },
  {
    title: 'Anaerobic digestion',
    copy: 'Zoom inside the digester to see microbes convert slurry into methane-rich biogas.',
  },
  {
    title: 'Biogas upgrade',
    copy: 'Watch CO₂ get scrubbed and the methane stream head to the generator flare.',
  },
];

const lessonInsights = [
  {
    title: 'Methane yield',
    copy: 'Lucid calculates methane potential in real time so you can compare feedstocks.',
    formula: 'CH₄ yield ≈ VS × 0.35 m³/kg',
  },
  {
    title: 'Retention time',
    copy: 'Temperature determines hydraulic retention time (HRT) inside the digester.',
    formula: 'HRT = Volume / Flow rate',
  },
  {
    title: 'Energy output',
    copy: 'Lucid converts methane flow into kWh so you can size generators or boilers.',
    formula: 'kWh = CH₄ (m³) × 9.97',
  },
];

const HeroBackground = () => (
  <div className="hero-bg-container">
    <svg viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice" className="hero-svg-bg">
      <defs>
        <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--sky-top, #0a1930)" />
          <stop offset="60%" stopColor="var(--sky-mid, #112d5e)" />
          <stop offset="100%" stopColor="var(--sky-bottom, #00f6bb)" />
        </linearGradient>
        <linearGradient id="mountainGrad1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--mountain-top, #0d2247)" />
          <stop offset="100%" stopColor="var(--mountain-bottom, #050d1c)" />
        </linearGradient>
        <linearGradient id="mountainGrad2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--mountain-front-top, #05112b)" />
          <stop offset="100%" stopColor="var(--mountain-front-bottom, #020613)" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="30" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Sky */}
      <rect width="1440" height="800" fill="url(#skyGrad)" opacity="0.8" />
      
      {/* Sun/Core */}
      <circle cx="1100" cy="550" r="140" fill="var(--primary)" filter="url(#glow)" opacity="0.4" />
      <circle cx="1100" cy="550" r="80" fill="#fff" filter="url(#glow)" opacity="0.9" />

      {/* Background Mountains */}
      <path d="M0 500 L250 350 L500 480 L800 250 L1150 500 L1440 350 L1440 800 L0 800 Z" fill="url(#mountainGrad1)" opacity="0.8"/>
      
      {/* Foreground Mountains */}
      <path d="M0 650 L350 450 L700 650 L1050 400 L1440 600 L1440 800 L0 800 Z" fill="url(#mountainGrad2)" />
      
      {/* Fog/Mist overlay at bottom */}
      <rect width="1440" height="200" y="600" fill="linear-gradient(to bottom, transparent, var(--bg))" />
    </svg>
    <div className="hero-bg-overlay"></div>
  </div>
);

export const Home = () => {
  const [isDemoPlaying, setIsDemoPlaying] = useState(false);
  const [demoStep, setDemoStep] = useState(0);
  const [sliderValue, setSliderValue] = useState(38);
  const [insightIndex, setInsightIndex] = useState(0);
  const demoSectionRef = useRef<HTMLDivElement | null>(null);


  useEffect(() => () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }, []);

  // Old simpler animation effects - disabled when isDemoPlaying is used for the new Explainer
  useEffect(() => {
    // The new BiogasExplainer handles its own timing
  }, [isDemoPlaying]);

  // Preload first scenes when user hovers over generate button
  const hasPreloadedRef = useRef(false);
  const handlePreloadOnHover = useCallback(() => {
    if (!hasPreloadedRef.current) {
      hasPreloadedRef.current = true;
      // Preload first scene so playback starts instantly
      preloadScenes(biogasScenesForPreload, "694f9389-aac1-45b6-b726-9d9369183238", 1);
    }
  }, []);

  const handleGenerate = () => {
    setIsDemoPlaying(true);
    if (demoSectionRef.current) {
      demoSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleSlider = (value: number) => {
    setSliderValue(value);
  };

  const handleTimelineClick = (index: number) => {
    setDemoStep(index);
    setInsightIndex(index % lessonInsights.length);
  };

  const temperatureLabel =
    sliderValue >= 55 ? 'Thermophilic 55°C' : sliderValue >= 37 ? 'Mesophilic 38°C' : 'Ambient 32°C';
  const methaneFlow = Math.min(110, Math.round((sliderValue - 30) * 5));
  const retentionDays = sliderValue >= 55 ? 16 : 24;
  const currentInsight = lessonInsights[insightIndex];

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="page-content"
    >
      <section className="hero-impressive cluely-style-hero">
        <HeroBackground />
        
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
            <button 
              className="btn-glow cluely-main-btn" 
              onClick={handleGenerate}
              onMouseEnter={handlePreloadOnHover}
              onFocus={handlePreloadOnHover}
            >
              <Zap size={20} fill="currentColor" /> Generate a Lesson
            </button>
          </motion.div>
        </div>
      </section>

      <section className="demo-showcase cluely-showcase" ref={demoSectionRef}>
        <div className={`glass-frame ${isDemoPlaying ? 'active' : ''}`}>
          <div className="app-window">
            <div className="window-header">
              <div className="dots"><span></span><span></span><span></span></div>
              <div className="address-bar">app.lucid-ai.co/lesson/biogas-generation</div>
            </div>
            <div className="window-content" style={{ position: 'relative' }}>
              {isDemoPlaying && (
                <BiogasExplainer 
                  isActive={isDemoPlaying} 
                  onComplete={() => setIsDemoPlaying(false)} 
                />
              )}
              {!isDemoPlaying && (
                <button 
                  className="demo-play-button" 
                  onClick={handleGenerate}
                  onMouseEnter={handlePreloadOnHover}
                  onFocus={handlePreloadOnHover}
                  aria-label="Play demo"
                >
                  <Play size={48} fill="currentColor" />
                </button>
              )}
              <div className="ui-mock" style={{ opacity: isDemoPlaying ? 0 : 1, transition: 'opacity 0.5s' }}>
                <div className="ui-sidebar">
                  <div className="ui-line w-70"></div>
                  <div className="ui-line w-50"></div>
                  <div className="ui-line w-60"></div>
                </div>
                <div className="ui-main">
                  <motion.div className="ai-bubble" animate={{ opacity: isDemoPlaying ? 1 : 0.7 }}>
                    <div className="avatar"></div>
                    <div className="text-lines">
                      <div className="ui-line w-90"></div>
                      <div className="ui-line w-80"></div>
                    </div>
                  </motion.div>
                  <motion.div className="user-bubble" animate={{ opacity: isDemoPlaying ? 1 : 0.6 }}>
                    <div className="text-lines">
                      <div className="ui-line w-60"></div>
                    </div>
                  </motion.div>
                  <div className="interactive-widget" aria-live="polite">
          <div className="quantum-hud">
            <div className="digester-visual" style={{ display: 'block', padding: 0, overflow: 'hidden' }}>
              <BiogasAnimation step={demoStep} isPlaying={isDemoPlaying} />
            </div>
            <div className="quantum-slider">
              <label htmlFor="temperature-slider">Digester temperature</label>
              <input
                id="temperature-slider"
                type="range"
                min={30}
                max={60}
                value={sliderValue}
                onChange={(e) => handleSlider(Number(e.target.value))}
              />
              <div className="slider-meta">
                <span>{temperatureLabel}</span>
                <span>{Math.round(sliderValue)}°C</span>
              </div>
            </div>
            <div className="quantum-spectrum">
              <div className="spectrum-bar" style={{ width: `${Math.min(100, methaneFlow)}%` }} />
              <p>Methane purity: {methaneFlow}% &nbsp; • &nbsp; HRT ≈ {retentionDays} days</p>
            </div>
          </div>
                    <div className="demo-timeline">
                      {demoTimeline.map((step, index) => (
                        <div
                          key={step.title}
                        className={`timeline-step ${demoStep === index ? 'active' : ''}`}
                        role="button"
                        tabIndex={0}
                        onClick={() => handleTimelineClick(index)}
                        onKeyDown={(event) => {
                          if (event.key === 'Enter' || event.key === ' ') {
                            event.preventDefault();
                            handleTimelineClick(index);
                          }
                        }}
                        >
                          <div className="timeline-icon">
                            <Radio size={16} />
                          </div>
                          <div>
                            <strong>{step.title}</strong>
                            <p>{step.copy}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  <div className="lesson-insight" aria-live="polite">
                    <div className="insight-header">
                      <span>Concept spotlight</span>
                      <strong>{currentInsight.title}</strong>
                    </div>
                    <p>{currentInsight.copy}</p>
                    <code className="insight-formula">{currentInsight.formula}</code>
                    <div className="insight-controls">
                      {lessonInsights.map((insight, index) => (
                        <button
                          key={insight.title}
                          className={`insight-bullet ${insightIndex === index ? 'active' : ''}`}
                          aria-pressed={insightIndex === index}
                          onClick={() => setInsightIndex(index)}
                        />
                      ))}
                    </div>
                  </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="glow-effect"></div>
        </div>
      </section>

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
