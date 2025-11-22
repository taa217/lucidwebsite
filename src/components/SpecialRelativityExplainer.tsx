import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Zap, Train, Ruler, ArrowRight } from 'lucide-react';

interface SpecialRelativityExplainerProps {
  isActive: boolean;
  onComplete?: () => void;
}

// Scene Configuration
const scenes = [
  { id: 1, duration: 3000, narration: "Special relativity reshapes how we understand space, time, and motion." },
  { id: 2, duration: 7000, narration: "First idea: the speed of light is the same for everyone. No matter how fast you move, light always outruns everything by the same amount." },
  { id: 3, duration: 10000, narration: "If two observers move differently, they still measure the same speed of light. To make that work, something deeper must adjust." },
  { id: 4, duration: 10000, narration: "In a moving frame, the path that light must travel becomes longer. And because light’s speed is fixed, the moving clock must tick slower." },
  { id: 5, duration: 8000, narration: "To preserve light’s constancy, distances adjust as well. Objects moving fast shrink in the direction of motion." },
  { id: 6, duration: 10000, narration: "Even the idea of ‘two events happening at the same time’ depends on who’s moving. Different observers slice time differently." },
  { id: 7, duration: 8000, narration: "All these effects — time dilation, length contraction, simultaneity — come from one geometric truth: light paths fix the structure of spacetime." },
  { id: 8, duration: 5000, narration: "Space and time reshape themselves so that the laws of nature, especially light’s speed, stay consistent for everyone." },
  { id: 9, duration: 3000, narration: "This is Lucid — clarity in motion." }
];

export const SpecialRelativityExplainer: React.FC<SpecialRelativityExplainerProps> = ({ isActive, onComplete }) => {
  const [currentScene, setCurrentScene] = useState(0);

  // Scene State Management
  useEffect(() => {
    if (isActive) {
      setCurrentScene(1);
    } else {
      setCurrentScene(0);
    }
  }, [isActive]);

  useEffect(() => {
    if (!isActive || currentScene === 0) return;
    
    const sceneData = scenes.find(s => s.id === currentScene);
    if (!sceneData) return;

    let speechFinished = false;
    let timeFinished = false;

    const advance = () => {
      if (speechFinished && timeFinished) {
        if (currentScene < scenes.length) {
          setCurrentScene(prev => prev + 1);
        } else if (onComplete) {
          onComplete();
        }
      }
    };

    // Narration
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(sceneData.narration);
      u.rate = 0.95;
      u.onend = () => {
        speechFinished = true;
        advance();
      };
      u.onerror = () => {
         speechFinished = true;
         advance();
      };
      window.speechSynthesis.speak(u);
    } else {
      speechFinished = true; // No speech support
    }

    // Min Duration Timer
    const timer = setTimeout(() => {
      timeFinished = true;
      advance();
    }, sceneData.duration);

    return () => {
      clearTimeout(timer);
      window.speechSynthesis.cancel();
    };
  }, [currentScene, isActive, onComplete]);

  // Colors & Styles
  const c = {
    bg: "#050505", // Very dark background
    cyan: "#00F6BB",
    magenta: "#D946EF",
    gold: "#EAB308",
    white: "#F5F7FA",
    grid: "rgba(255,255,255,0.05)",
    textMain: "#F5F7FA"
  };

  if (!isActive) return null;

  return (
    <div style={{ 
      width: '100%', height: '100%', background: c.bg, color: c.textMain, 
      position: 'relative', overflow: 'hidden', fontFamily: 'Inter, sans-serif',
      display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <AnimatePresence mode="wait">
        
        {/* --- SCENE 1: TITLE --- */}
        {currentScene === 1 && (
          <motion.div key="s1" style={{ width: '100%', height: '100%', position: 'relative' }}
            exit={{ opacity: 0 }}
          >
            {/* Spacetime Grid */}
            <div style={{ position: 'absolute', inset: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
               <svg width="100%" height="100%">
                  <defs>
                    <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                      <path d="M 50 0 L 0 0 0 50" fill="none" stroke={c.grid} strokeWidth="1"/>
                    </pattern>
                  </defs>
                  <motion.rect width="100%" height="100%" fill="url(#grid)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }} />
                  
                  {/* Light Beam */}
                  <motion.line 
                    x1="0" y1="100%" x2="100%" y2="0" 
                    stroke={c.cyan} strokeWidth="2"
                    initial={{ pathLength: 0, opacity: 0 }} 
                    animate={{ pathLength: 1, opacity: [0, 1, 0.5] }} 
                    transition={{ duration: 1.5, ease: "circOut" }}
                  />
               </svg>
            </div>

            <motion.div 
              style={{ position: 'absolute', top: '50%', left: 0, width: '100%', textAlign: 'center' }}
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1 }}
            >
              <h1 style={{ fontSize: '48px', fontWeight: 700, letterSpacing: -1 }}>Special Relativity</h1>
            </motion.div>
          </motion.div>
        )}

        {/* --- SCENE 2: SPEED OF LIGHT --- */}
        {currentScene === 2 && (
          <motion.div key="s2" style={{ width: '100%', height: '100%', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }} exit={{ opacity: 0 }}>
            {/* Expanding Rings */}
            {[1, 2, 3].map(i => (
              <motion.div
                key={i}
                style={{ 
                   position: 'absolute', border: `2px solid ${c.cyan}`, borderRadius: '50%',
                   width: 20, height: 20
                }}
                animate={{ width: 600, height: 600, opacity: [1, 0], borderWidth: [2, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 1, ease: "linear" }}
              />
            ))}
            
            <div style={{ zIndex: 10, textAlign: 'center', background: 'rgba(0,0,0,0.5)', padding: 20, borderRadius: 12, border: `1px solid ${c.grid}` }}>
               <motion.div 
                 style={{ width: 12, height: 12, background: c.cyan, borderRadius: '50%', margin: '0 auto 10px', boxShadow: `0 0 20px ${c.cyan}` }}
               />
               <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: c.gold }}>
                    <Clock size={16} />
                    <motion.span animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 1, repeat: Infinity }}>t</motion.span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: c.magenta }}>
                    <Ruler size={16} />
                    <span>x</span>
                  </div>
               </div>
            </div>
          </motion.div>
        )}

        {/* --- SCENE 3: TWO OBSERVERS --- */}
        {currentScene === 3 && (
          <motion.div key="s3" style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-around' }} exit={{ opacity: 0 }}>
             {/* Observer A */}
             <div style={{ textAlign: 'center', position: 'relative' }}>
                <motion.div 
                  style={{ width: 40, height: 40, background: c.magenta, borderRadius: '50%', margin: '0 auto' }}
                  initial={{ scale: 0 }} animate={{ scale: 1 }}
                />
                <p style={{ marginTop: 10 }}>Observer A</p>
                {/* Grid A - Vertical */}
                <div style={{ position: 'absolute', top: -50, left: -50, width: 140, height: 140, border: `1px dashed ${c.grid}`, zIndex: -1 }} />
             </div>

             {/* Light Beam Shared */}
             <motion.div 
               style={{ height: 2, background: c.cyan, width: 200 }}
               initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1, repeat: Infinity }}
             />

             {/* Observer B */}
             <motion.div 
               initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 2 }}
               style={{ textAlign: 'center', position: 'relative' }}
             >
                <motion.div 
                  style={{ width: 40, height: 40, background: c.gold, borderRadius: '50%', margin: '0 auto' }}
                />
                <p style={{ marginTop: 10 }}>Observer B</p>
                {/* Grid B - Slanted */}
                <div style={{ position: 'absolute', top: -50, left: -50, width: 140, height: 140, border: `1px dashed ${c.grid}`, zIndex: -1, transform: 'skewX(-20deg)' }} />
             </motion.div>
          </motion.div>
        )}

        {/* --- SCENE 4: TIME DILATION --- */}
        {currentScene === 4 && (
          <motion.div key="s4" style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }} exit={{ opacity: 0 }}>
             {/* Stationary Clock */}
             <div style={{ textAlign: 'center', width: 150 }}>
                <p style={{ color: c.magenta, marginBottom: 20 }}>Stationary</p>
                <div style={{ height: 150, border: `1px solid ${c.grid}`, position: 'relative' }}>
                   <motion.div 
                     style={{ width: 8, height: 8, background: c.cyan, borderRadius: '50%', margin: '0 auto', position: 'absolute', left: '50%', marginLeft: -4 }}
                     animate={{ top: ['0%', '100%', '0%'] }}
                     transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                   />
                </div>
                <p>Normal Tick</p>
             </div>

             {/* Moving Clock */}
             <div style={{ textAlign: 'center', width: 300 }}>
                <p style={{ color: c.gold, marginBottom: 20 }}>Moving</p>
                <div style={{ height: 150, border: `1px solid ${c.grid}`, position: 'relative' }}>
                   {/* Zig Zag Path */}
                   <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                      <motion.path 
                        d="M 0,0 L 150,150 L 300,0"
                        fill="none" stroke={c.cyan} strokeWidth="2" strokeDasharray="4 4"
                        opacity="0.5"
                      />
                   </svg>
                   <motion.div 
                     style={{ width: 8, height: 8, background: c.cyan, borderRadius: '50%', position: 'absolute' }}
                     animate={{ 
                       top: ['0%', '100%', '0%'],
                       left: ['0%', '50%', '100%']
                     }}
                     transition={{ duration: 4, repeat: Infinity, ease: "linear" }} // Slower duration!
                   />
                </div>
                <p>Slower Tick</p>
             </div>
          </motion.div>
        )}

        {/* --- SCENE 5: LENGTH CONTRACTION --- */}
        {currentScene === 5 && (
          <motion.div key="s5" style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} exit={{ opacity: 0 }}>
             {/* Measuring Bar */}
             <motion.div style={{ width: 300, height: 2, background: c.magenta, marginBottom: 40, position: 'relative' }}>
                <div style={{ position: 'absolute', left: 0, top: -10, height: 20, width: 2, background: c.magenta }} />
                <div style={{ position: 'absolute', right: 0, top: -10, height: 20, width: 2, background: c.magenta }} />
             </motion.div>

             {/* Ship */}
             <motion.div 
                style={{ height: 60, background: c.gold, borderRadius: '8px 40px 40px 8px' }}
                initial={{ x: -400, width: 300 }}
                animate={{ x: 400, width: 150 }} // Shrinks as it moves
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
             />
             
             {/* Streaks */}
             <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: -1 }}>
                {[1, 2, 3, 4, 5].map(i => (
                   <motion.div 
                     key={i}
                     style={{ position: 'absolute', height: 2, background: c.grid, width: 200, top: `${i * 20}%` }}
                     animate={{ x: [-200, 800] }}
                     transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1, ease: "linear" }}
                   />
                ))}
             </div>
          </motion.div>
        )}

        {/* --- SCENE 6: RELATIVITY OF SIMULTANEITY --- */}
        {currentScene === 6 && (
           <motion.div key="s6" style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} exit={{ opacity: 0 }}>
              <div style={{ position: 'relative', width: 400, height: 100, borderBottom: `2px solid ${c.white}` }}>
                 {/* Train */}
                 <motion.div 
                   style={{ position: 'absolute', bottom: 0, width: 300, height: 60, background: 'rgba(255,255,255,0.1)', border: `1px solid ${c.white}` }}
                   animate={{ x: [-50, 50] }} transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse' }}
                 >
                    {/* Observer Middle */}
                    <div style={{ position: 'absolute', left: '50%', bottom: 0, width: 10, height: 20, background: c.gold }} />
                    
                    {/* Lamps */}
                    <div style={{ position: 'absolute', left: 0, top: 10, width: 10, height: 10, background: c.cyan, borderRadius: '50%' }} />
                    <div style={{ position: 'absolute', right: 0, top: 10, width: 10, height: 10, background: c.cyan, borderRadius: '50%' }} />
                    
                    {/* Pulses */}
                    <motion.div 
                      style={{ position: 'absolute', left: 5, top: 15, height: 2, background: c.cyan }}
                      animate={{ width: 145 }} transition={{ duration: 2, repeat: Infinity }}
                    />
                    <motion.div 
                      style={{ position: 'absolute', right: 5, top: 15, height: 2, background: c.cyan }}
                      animate={{ width: 145 }} transition={{ duration: 2, repeat: Infinity }}
                    />
                 </motion.div>
                 
                 {/* Track Observer */}
                 <div style={{ position: 'absolute', bottom: -30, left: '50%', width: 10, height: 20, background: c.magenta }} />
              </div>
           </motion.div>
        )}

        {/* --- SCENE 7: SPACETIME DIAGRAM --- */}
        {currentScene === 7 && (
           <motion.div key="s7" style={{ width: '100%', height: '100%', position: 'relative' }} exit={{ opacity: 0 }}>
              <div style={{ position: 'absolute', inset: 50 }}>
                 {/* Axes */}
                 <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 2, background: c.white }} /> {/* Time */}
                 <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 2, background: c.white }} /> {/* Space */}
                 
                 {/* Light Cones (45 deg) */}
                 <motion.div 
                   style={{ position: 'absolute', top: '50%', left: '50%', width: 400, height: 2, background: c.cyan, transform: 'translate(-50%, -50%) rotate(45deg)' }}
                   initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1 }}
                 />
                 <motion.div 
                   style={{ position: 'absolute', top: '50%', left: '50%', width: 400, height: 2, background: c.cyan, transform: 'translate(-50%, -50%) rotate(-45deg)' }}
                   initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1 }}
                 />

                 {/* Worldline Moving */}
                 <motion.div 
                   style={{ position: 'absolute', top: '50%', left: '50%', width: 2, height: 300, background: c.gold, transform: 'translate(-50%, -50%) rotate(20deg)', originY: 'center' }}
                   initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: 1, duration: 1 }}
                 />
                 
                 {/* Events */}
                 <motion.div 
                    style={{ position: 'absolute', width: 10, height: 10, background: c.magenta, borderRadius: '50%', top: '30%', left: '60%' }}
                    initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 2 }}
                 />
              </div>
              <div style={{ position: 'absolute', bottom: 20, width: '100%', textAlign: 'center', color: c.cyan }}>
                 Minkowski Spacetime
              </div>
           </motion.div>
        )}

        {/* --- SCENE 8: FINAL INSIGHT --- */}
        {currentScene === 8 && (
           <motion.div key="s8" style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }} exit={{ opacity: 0 }}>
              <motion.h2 style={{ fontSize: 32, textAlign: 'center', marginBottom: 40 }}>
                 Space + Time = <span style={{ color: c.cyan }}>Spacetime</span>
              </motion.h2>
              
              {/* Rotating Light Cone Abstract */}
              <motion.div 
                style={{ width: 100, height: 100, borderLeft: `2px solid ${c.cyan}`, borderBottom: `2px solid ${c.cyan}` }}
                animate={{ rotate: [45, 225, 45] }}
                transition={{ duration: 10, ease: "easeInOut", repeat: Infinity }}
              />
           </motion.div>
        )}

        {/* --- SCENE 9: OUTRO --- */}
        {currentScene === 9 && (
          <motion.div key="s9" style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} exit={{ opacity: 0 }}>
             <motion.div 
               initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}
               style={{ fontSize: 48, fontWeight: 800, letterSpacing: -1 }}
             >
               Lucid<span style={{ color: c.cyan }}>.</span>
             </motion.div>
             <motion.div 
               initial={{ width: 0 }} animate={{ width: 80 }} transition={{ delay: 0.5, duration: 1 }}
               style={{ height: 2, background: c.cyan, marginTop: 20 }}
             />
          </motion.div>
        )}

      </AnimatePresence>

      {/* Progress Bar */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, height: 4, background: 'rgba(255,255,255,0.1)', width: '100%' }}>
         <motion.div 
           style={{ height: '100%', background: c.cyan }}
           initial={{ width: 0 }}
           animate={{ width: `${(currentScene / 9) * 100}%` }}
         />
      </div>
    </div>
  );
};



