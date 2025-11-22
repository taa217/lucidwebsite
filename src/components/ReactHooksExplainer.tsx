import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Box, RefreshCw, Database, Play, ArrowRight } from 'lucide-react';

interface ReactHooksExplainerProps {
  isActive: boolean;
  onComplete?: () => void;
}

// Scene Configuration
const scenes = [
  { id: 1, duration: 3000, narration: "React Hooks let functional components manage state and side effects, making your code cleaner and more powerful." },
  { id: 2, duration: 6000, narration: "In React, components can be functions. Hooks give these functions the power to store and react to changing data." },
  { id: 3, duration: 10000, narration: "useState lets you store a value in a component. When it changes, React automatically updates what the user sees." },
  { id: 4, duration: 8000, narration: "Clicking a button can trigger a state update. Hooks ensure the UI reacts seamlessly." },
  { id: 5, duration: 10000, narration: "useEffect runs code when state or props change. It’s perfect for side effects like fetching data or updating the document title." },
  { id: 6, duration: 8000, narration: "The dependency array tells React when to run the effect. Only changes in listed variables trigger the code." },
  { id: 7, duration: 6000, narration: "Hooks like useState and useEffect let functional components manage state and side effects cleanly — no classes needed." },
  { id: 8, duration: 6000, narration: "In practice, hooks let your UI stay reactive while keeping code simple and readable." },
  { id: 9, duration: 3000, narration: "This is Lucid — making complex programming concepts easy to understand." }
];

export const ReactHooksExplainer: React.FC<ReactHooksExplainerProps> = ({ isActive, onComplete }) => {
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
    bg: "#0c0f14",
    cyan: "#06B6D4", // React Blue
    purple: "#8B5CF6",
    yellow: "#FACC15",
    white: "#F5F7FA",
    faint: "rgba(6, 182, 212, 0.1)",
    textMain: "#F5F7FA",
    darkBox: "#1e293b"
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
          <motion.div key="s1" style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
            exit={{ opacity: 0 }}
          >
            <motion.div
               initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ duration: 1.5, ease: "backOut" }}
            >
               {/* React Logo SVG Abstract */}
               <svg width="120" height="120" viewBox="-60 -60 120 120">
                  <circle cx="0" cy="0" r="10" fill={c.cyan} />
                  <g stroke={c.cyan} strokeWidth="4" fill="none">
                     <ellipse rx="50" ry="20" transform="rotate(0)" />
                     <ellipse rx="50" ry="20" transform="rotate(60)" />
                     <ellipse rx="50" ry="20" transform="rotate(120)" />
                  </g>
               </svg>
            </motion.div>
            <motion.h1 
              style={{ fontSize: '48px', fontWeight: 700, letterSpacing: -1, marginTop: 20, color: c.cyan }}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}
            >
              React Hooks
            </motion.h1>
          </motion.div>
        )}

        {/* --- SCENE 2: FUNCTIONAL COMPONENT --- */}
        {currentScene === 2 && (
          <motion.div key="s2" style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} exit={{ opacity: 0 }}>
             <motion.div 
               style={{ width: 400, height: 300, border: `2px solid ${c.cyan}`, borderRadius: 16, background: c.darkBox, padding: 20 }}
               initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1, boxShadow: `0 0 30px ${c.faint}` }} transition={{ duration: 1 }}
             >
                <div style={{ fontFamily: 'JetBrains Mono', fontSize: 20 }}>
                   <span style={{ color: c.purple }}>function</span> <span style={{ color: c.yellow }}>App</span>() {"{"}
                </div>
                <div style={{ height: '80%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: c.white, opacity: 0.5 }}>
                   {/* Empty initially */}
                   Component Logic
                </div>
                <div style={{ fontFamily: 'JetBrains Mono', fontSize: 20 }}>{"}"}</div>
             </motion.div>
          </motion.div>
        )}

        {/* --- SCENE 3: USESTATE --- */}
        {currentScene === 3 && (
          <motion.div key="s3" style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} exit={{ opacity: 0 }}>
             <div style={{ position: 'relative', width: 600, height: 400 }}>
                {/* Component Box */}
                <div style={{ position: 'absolute', inset: 0, border: `2px solid ${c.cyan}`, borderRadius: 16, background: c.darkBox, opacity: 0.5 }} />
                
                {/* useState Code */}
                <motion.div 
                  style={{ position: 'absolute', top: 40, left: 40, fontFamily: 'JetBrains Mono', fontSize: 24 }}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                >
                   <span style={{ color: c.purple }}>const</span> [count, setCount] = <span style={{ color: c.yellow }}>useState(0)</span>;
                </motion.div>

                {/* Visualization */}
                <motion.div 
                   style={{ position: 'absolute', top: 150, left: 100, display: 'flex', alignItems: 'center', gap: 40 }}
                   initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
                >
                   <div style={{ width: 80, height: 80, background: c.cyan, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'black', fontWeight: 'bold', fontSize: 24 }}>
                      0
                   </div>
                   <motion.div style={{ width: 100, height: 2, background: c.white }} />
                   <div style={{ width: 120, height: 80, border: `2px dashed ${c.white}`, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 8 }}>
                      Display
                   </div>
                </motion.div>
             </div>
          </motion.div>
        )}

        {/* --- SCENE 4: STATE UPDATE --- */}
        {currentScene === 4 && (
          <motion.div key="s4" style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} exit={{ opacity: 0 }}>
             <div style={{ display: 'flex', gap: 60, alignItems: 'center' }}>
                <motion.button 
                   style={{ padding: '12px 24px', background: c.purple, border: 'none', borderRadius: 8, color: 'white', fontSize: 18, cursor: 'pointer' }}
                   animate={{ scale: [1, 0.9, 1] }} transition={{ duration: 2, repeat: Infinity }}
                >
                   Increment
                </motion.button>
                
                {/* Flow Arrow */}
                <svg width="100" height="20">
                   <motion.path d="M 0,10 L 100,10" stroke={c.cyan} strokeWidth="4" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, repeat: Infinity }} />
                </svg>

                {/* State Node */}
                <div style={{ width: 80, height: 80, background: c.cyan, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'black', fontWeight: 'bold', fontSize: 24 }}>
                   <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                      1
                   </motion.span>
                </div>
             </div>
          </motion.div>
        )}

        {/* --- SCENE 5: USEEFFECT --- */}
        {currentScene === 5 && (
          <motion.div key="s5" style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} exit={{ opacity: 0 }}>
             <div style={{ position: 'relative', width: 600, height: 400 }}>
                <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', height: '100%' }}>
                   {/* State */}
                   <div style={{ textAlign: 'center' }}>
                      <Database size={48} color={c.cyan} />
                      <p style={{ marginTop: 10 }}>State</p>
                   </div>

                   {/* Arrow */}
                   <motion.div animate={{ x: [0, 10, 0] }} transition={{ duration: 1, repeat: Infinity }}>
                      <ArrowRight size={32} color={c.white} />
                   </motion.div>

                   {/* useEffect */}
                   <motion.div 
                      style={{ width: 120, height: 120, border: `2px solid ${c.yellow}`, borderRadius: 16, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
                      animate={{ boxShadow: [`0 0 0px ${c.bg}`, `0 0 20px ${c.yellow}`, `0 0 0px ${c.bg}`] }}
                      transition={{ duration: 2, repeat: Infinity }}
                   >
                      <RefreshCw size={40} color={c.yellow} />
                      <p style={{ marginTop: 10, color: c.yellow }}>useEffect</p>
                   </motion.div>

                   {/* Arrow */}
                   <motion.div animate={{ x: [0, 10, 0] }} transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}>
                      <ArrowRight size={32} color={c.white} />
                   </motion.div>

                   {/* Side Effect */}
                   <div style={{ textAlign: 'center' }}>
                      <Box size={48} color={c.purple} />
                      <p style={{ marginTop: 10 }}>API / DOM</p>
                   </div>
                </div>
             </div>
          </motion.div>
        )}

        {/* --- SCENE 6: DEPENDENCY ARRAY --- */}
        {currentScene === 6 && (
          <motion.div key="s6" style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} exit={{ opacity: 0 }}>
             <div style={{ fontFamily: 'JetBrains Mono', fontSize: 28, background: c.darkBox, padding: 30, borderRadius: 16, border: `1px solid ${c.faint}` }}>
                <div style={{ marginBottom: 10 }}>
                   <span style={{ color: c.yellow }}>useEffect</span>(() ={'>'} {"{"}
                </div>
                <div style={{ paddingLeft: 40, color: c.faint }}>// Side Effect Code</div>
                <div>{"}, ["}<motion.span 
                   style={{ color: c.cyan, fontWeight: 'bold', padding: '2px 8px', borderRadius: 4 }}
                   animate={{ background: [c.bg, 'rgba(6, 182, 212, 0.3)', c.bg] }}
                   transition={{ duration: 2, repeat: Infinity }}
                >count</motion.span>{"])"}</div>
             </div>
             <motion.p 
               style={{ marginTop: 40, color: c.cyan, maxWidth: 400, textAlign: 'center' }}
               initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
             >
                Only runs when <b>count</b> changes
             </motion.p>
          </motion.div>
        )}

        {/* --- SCENE 7: SUMMARY --- */}
        {currentScene === 7 && (
           <motion.div key="s7" style={{ width: '100%', height: '100%', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }} exit={{ opacity: 0 }}>
              <div style={{ width: 500, height: 300, border: `2px solid ${c.white}`, borderRadius: 20, position: 'relative', background: c.darkBox }}>
                 <div style={{ position: 'absolute', top: -15, left: 20, background: c.bg, padding: '0 10px', color: c.white }}>Component</div>
                 
                 <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', height: '100%' }}>
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5 }} style={{ textAlign: 'center' }}>
                       <Database size={40} color={c.cyan} />
                       <p style={{ color: c.cyan, marginTop: 8 }}>State</p>
                    </motion.div>
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1 }} style={{ textAlign: 'center' }}>
                       <RefreshCw size={40} color={c.yellow} />
                       <p style={{ color: c.yellow, marginTop: 8 }}>Effects</p>
                    </motion.div>
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.5 }} style={{ textAlign: 'center' }}>
                       <Box size={40} color={c.purple} />
                       <p style={{ color: c.purple, marginTop: 8 }}>Props</p>
                    </motion.div>
                 </div>
              </div>
           </motion.div>
        )}

        {/* --- SCENE 8: REAL WORLD --- */}
        {currentScene === 8 && (
           <motion.div key="s8" style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} exit={{ opacity: 0 }}>
              {/* Mini App */}
              <div style={{ width: 300, background: 'white', borderRadius: 12, padding: 20, color: 'black', textAlign: 'center' }}>
                 <h3>Counter App</h3>
                 <div style={{ fontSize: 48, margin: '20px 0' }}>
                    <motion.span animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}>
                       5
                    </motion.span>
                 </div>
                 <button style={{ background: '#3b82f6', color: 'white', border: 'none', padding: '8px 16px', borderRadius: 6 }}>
                    Add +1
                 </button>
              </div>
              
              {/* Console Log */}
              <motion.div 
                style={{ marginTop: 20, fontFamily: 'JetBrains Mono', fontSize: 14, color: c.faint }}
                animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }}
              >
                 Console: Effect ran (count updated)
              </motion.div>
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

