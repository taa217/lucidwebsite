import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, ArrowRight, Sparkles, Brain, MessageSquare, Layers, Target, Radio } from 'lucide-react';
import { BiogasAnimation } from '../components/BiogasAnimation';
import { BiogasExplainer } from '../components/BiogasExplainer';

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

export const Home = () => {
  const [typedText, setTypedText] = useState('');
  const [isDemoPlaying, setIsDemoPlaying] = useState(false);
  const [demoStep, setDemoStep] = useState(0);
  const [sliderValue, setSliderValue] = useState(38);
  const [insightIndex, setInsightIndex] = useState(0);
  const demoSectionRef = useRef<HTMLDivElement | null>(null);
  const targetText = "Biogas generation";
  
  useEffect(() => {
    let i = 0;
    const typing = setInterval(() => {
      if (i < targetText.length) {
        setTypedText(targetText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typing);
      }
    }, 150);
    return () => clearInterval(typing);
  }, []);

  useEffect(() => () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }, []);

  // Old simpler animation effects - disabled when isDemoPlaying is used for the new Explainer
  useEffect(() => {
    if (!isDemoPlaying) return;
    // The new BiogasExplainer handles its own timing
  }, [isDemoPlaying]);

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
      <section className="hero-impressive">
        <motion.div 
          className="hero-badge"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Sparkles size={14} />
          <span>The Future of Learning is Here</span>
        </motion.div>
        
        <motion.h1 
          className="mega-headline"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Don't just watch. <br />
          <span className="text-gradient">Understand.</span>
        </motion.h1>
        
        <motion.p 
          className="hero-sub"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          The first AI that adapts to your brain. Lucid turns any topic into 
          an interactive, personalized journey. No videos to skip. No generic explanations.
        </motion.p>

        <motion.div 
          className="input-simulation"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div className="input-bar">
            <span className="input-label">I want to learn...</span>
            <span className="typed-content">{typedText}<span className="cursor">|</span></span>
          </div>
          <button className="generate-btn" onClick={handleGenerate}>
            <Zap size={18} fill="currentColor" /> Generate
          </button>
        </motion.div>

        <motion.div 
          className="hero-ctas"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Link to="/explore" className="btn-glow">
            Start Learning Free
          </Link>
          <p className="no-cc">No credit card required.</p>
        </motion.div>
      </section>

      <section className="demo-showcase" ref={demoSectionRef}>
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
            <Link to="/explore" className="btn-white">
              View Examples <ArrowRight size={18} style={{ marginLeft: 8 }} />
            </Link>
        </div>
      </section>
    </motion.div>
  );
};
