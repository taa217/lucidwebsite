import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Droplet, Wind, RefreshCw, TreeDeciduous } from 'lucide-react';

interface PhotosynthesisExplainerProps {
  isActive: boolean;
  onComplete?: () => void;
}

// Scene Configuration
const scenes = [
  { id: 1, duration: 3000, narration: "Photosynthesis is how plants turn sunlight into energy they can use." },
  { id: 2, duration: 6000, narration: "Sunlight provides the energy, captured by leaves in tiny molecular solar panels called chlorophyll." },
  { id: 3, duration: 8000, narration: "Plants take in water from the roots and carbon dioxide from the air. These molecules fuel the chemical reactions." },
  { id: 4, duration: 10000, narration: "Sunlight excites electrons in chlorophyll, moving them along a chain that stores energy in molecules called ATP and NADPH." },
  { id: 5, duration: 10000, narration: "Next, ATP and NADPH help convert carbon dioxide into glucose — sugar that powers the plant." },
  { id: 6, duration: 6000, narration: "Oxygen is released as a byproduct, giving us the air we breathe." },
  { id: 7, duration: 6000, narration: "In short, sunlight + water + CO₂ = glucose for the plant and oxygen for the world." },
  { id: 8, duration: 5000, narration: "Photosynthesis powers life on Earth, capturing energy from the sun in a beautiful natural process." },
  { id: 9, duration: 3000, narration: "This is Lucid — making complex natural processes easy to understand." }
];

export const PhotosynthesisExplainer: React.FC<PhotosynthesisExplainerProps> = ({ isActive, onComplete }) => {
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
    green: "#10B981",
    yellow: "#FACC15",
    blue: "#3B82F6",
    cyan: "#22D3EE",
    white: "#F5F7FA",
    faint: "rgba(16, 185, 129, 0.1)",
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
          <motion.div key="s1" style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
            exit={{ opacity: 0 }}
          >
            <svg width="200" height="200" viewBox="0 0 200 200" style={{ overflow: 'visible' }}>
               <motion.path 
                 d="M 100,200 Q 100,100 50,50 Q 100,100 150,50"
                 fill="none" stroke={c.green} strokeWidth="4"
                 initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 2, ease: "easeOut" }}
               />
               <motion.path
                 d="M 100,100 Q 50,150 20,100 Q 50,150 100,100"
                 fill={c.faint} stroke={c.green} strokeWidth="2"
                 initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1, duration: 1 }}
               />
            </svg>
            <motion.h1 
              style={{ fontSize: '48px', fontWeight: 700, letterSpacing: -1, marginTop: 20, color: c.green }}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5 }}
            >
              Photosynthesis
            </motion.h1>
          </motion.div>
        )}

        {/* --- SCENE 2: LIGHT ENERGY --- */}
        {currentScene === 2 && (
          <motion.div key="s2" style={{ width: '100%', height: '100%', position: 'relative' }} exit={{ opacity: 0 }}>
             <motion.div 
               style={{ position: 'absolute', top: '10%', left: '10%' }}
               initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 1 }}
             >
                <Sun size={80} color={c.yellow} fill={c.yellow} />
             </motion.div>
             
             <div style={{ position: 'absolute', bottom: '20%', left: '50%', transform: 'translateX(-50%)' }}>
                <svg width="200" height="200" viewBox="0 0 200 200">
                   <path d="M 100,200 L 100,100 Q 50,50 20,80" stroke={c.green} strokeWidth="4" fill="none" />
                   <path d="M 100,100 Q 150,50 180,80" stroke={c.green} strokeWidth="4" fill="none" />
                   <circle cx="100" cy="100" r="40" fill={c.green} opacity="0.2" />
                </svg>
             </div>

             {/* Rays */}
             {[0, 1, 2, 3, 4].map(i => (
                <motion.div
                   key={i}
                   style={{ position: 'absolute', top: '15%', left: '15%', width: 4, height: 4, borderRadius: '50%', background: c.yellow, boxShadow: `0 0 10px ${c.yellow}` }}
                   initial={{ x: 0, y: 0, opacity: 0 }}
                   animate={{ x: 350 + i * 20, y: 400 + i * 10, opacity: [0, 1, 0] }}
                   transition={{ duration: 2, repeat: Infinity, delay: i * 0.3, ease: "linear" }}
                />
             ))}
          </motion.div>
        )}

        {/* --- SCENE 3: H2O + CO2 --- */}
        {currentScene === 3 && (
          <motion.div key="s3" style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }} exit={{ opacity: 0 }}>
             {/* Leaf Center */}
             <motion.div 
               style={{ width: 150, height: 150, background: c.faint, border: `2px solid ${c.green}`, borderRadius: '0 80px 0 80px', transform: 'rotate(-45deg)' }}
               animate={{ boxShadow: `0 0 30px ${c.faint}` }} transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
             />

             {/* H2O from roots */}
             {[0, 1, 2].map(i => (
                <motion.div 
                   key={`h2o-${i}`}
                   style={{ position: 'absolute', bottom: -20, left: '40%', color: c.blue, display: 'flex', alignItems: 'center', gap: 4 }}
                   animate={{ y: -300, x: 50, opacity: [0, 1, 0] }}
                   transition={{ duration: 4, delay: i * 1, repeat: Infinity }}
                >
                   <Droplet size={20} fill={c.blue} /> <span style={{ fontSize: 12 }}>H₂O</span>
                </motion.div>
             ))}

             {/* CO2 from air */}
             {[0, 1, 2].map(i => (
                <motion.div 
                   key={`co2-${i}`}
                   style={{ position: 'absolute', top: -20, right: '30%', color: c.cyan, display: 'flex', alignItems: 'center', gap: 4 }}
                   animate={{ y: 300, x: -50, opacity: [0, 1, 0] }}
                   transition={{ duration: 4, delay: i * 1.2, repeat: Infinity }}
                >
                   <Wind size={20} /> <span style={{ fontSize: 12 }}>CO₂</span>
                </motion.div>
             ))}
          </motion.div>
        )}

        {/* --- SCENE 4: LIGHT REACTIONS --- */}
        {currentScene === 4 && (
          <motion.div key="s4" style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} exit={{ opacity: 0 }}>
             <h2 style={{ color: c.green, marginBottom: 40 }}>Light Reactions</h2>
             <svg width="600" height="200" style={{ overflow: 'visible' }}>
                {/* Electron Chain */}
                <motion.path 
                  d="M 50,100 Q 150,50 250,100 T 450,100 T 550,50"
                  fill="none" stroke={c.faint} strokeWidth="4"
                />
                {/* Proteins */}
                <circle cx="150" cy="75" r="20" fill={c.green} opacity="0.5" />
                <circle cx="350" cy="100" r="20" fill={c.green} opacity="0.5" />
                <circle cx="550" cy="50" r="20" fill={c.green} opacity="0.5" />

                {/* Electrons */}
                <motion.circle r="6" fill={c.yellow}>
                   <animateMotion path="M 50,100 Q 150,50 250,100 T 450,100 T 550,50" dur="3s" repeatCount="indefinite" />
                </motion.circle>

                {/* ATP/NADPH Output */}
                <motion.g transform="translate(550, 20)">
                   <motion.circle r="15" fill={c.yellow} opacity="0.8" animate={{ y: -50, opacity: 0 }} transition={{ duration: 2, repeat: Infinity }} />
                   <text x="20" y="-10" fill={c.yellow} fontSize="12">ATP</text>
                </motion.g>
             </svg>
          </motion.div>
        )}

        {/* --- SCENE 5: CALVIN CYCLE --- */}
        {currentScene === 5 && (
          <motion.div key="s5" style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} exit={{ opacity: 0 }}>
             <h2 style={{ color: c.green, marginBottom: 40 }}>The Calvin Cycle</h2>
             <div style={{ position: 'relative', width: 300, height: 300 }}>
                <motion.div 
                  style={{ width: '100%', height: '100%', border: `4px dashed ${c.faint}`, borderRadius: '50%' }}
                  animate={{ rotate: 360 }} transition={{ duration: 10, ease: "linear", repeat: Infinity }}
                />
                
                {/* Inputs */}
                <motion.div 
                  style={{ position: 'absolute', top: 0, left: '50%', color: c.cyan }}
                  animate={{ y: 50, opacity: [0, 1, 0] }} transition={{ duration: 2, repeat: Infinity }}
                >
                   CO₂
                </motion.div>

                {/* Cycle Icon */}
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                   <RefreshCw size={60} color={c.green} />
                </div>

                {/* Output */}
                <motion.div 
                  style={{ position: 'absolute', bottom: 20, right: 20, color: c.yellow, fontWeight: 'bold', fontSize: 24 }}
                  initial={{ scale: 0 }} animate={{ scale: 1.2, opacity: [0, 1, 0] }} transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                >
                   C₆H₁₂O₆
                </motion.div>
             </div>
          </motion.div>
        )}

        {/* --- SCENE 6: OXYGEN RELEASE --- */}
        {currentScene === 6 && (
          <motion.div key="s6" style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} exit={{ opacity: 0 }}>
             <div style={{ position: 'relative' }}>
                {/* Leaf */}
                <div style={{ width: 200, height: 100, background: c.green, borderRadius: '100px 0', opacity: 0.8 }} />
                
                {/* O2 Bubbles */}
                {[0, 1, 2, 3, 4].map(i => (
                   <motion.div 
                     key={i}
                     style={{ position: 'absolute', top: 0, left: 50 + i * 30, color: c.cyan }}
                     initial={{ y: 0, opacity: 0 }}
                     animate={{ y: -200, opacity: [0, 1, 0] }}
                     transition={{ duration: 3, delay: i * 0.5, repeat: Infinity }}
                   >
                      O₂
                   </motion.div>
                ))}
             </div>
          </motion.div>
        )}

        {/* --- SCENE 7: SUMMARY --- */}
        {currentScene === 7 && (
           <motion.div key="s7" style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} exit={{ opacity: 0 }}>
              <div style={{ display: 'flex', gap: 20, alignItems: 'center', fontSize: 24, fontWeight: 'bold' }}>
                 <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} style={{ color: c.yellow }}>Sunlight</motion.div>
                 <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>+</motion.div>
                 <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} style={{ color: c.blue }}>H₂O</motion.div>
                 <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}>+</motion.div>
                 <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }} style={{ color: c.cyan }}>CO₂</motion.div>
                 <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3 }}>=</motion.div>
                 <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.5 }} style={{ color: c.green }}>Sugar</motion.span>
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 4 }} style={{ color: c.cyan, fontSize: 16 }}>+ Oxygen</motion.span>
                 </div>
              </div>
           </motion.div>
        )}

        {/* --- SCENE 8: FINAL VISUAL WRAP --- */}
        {currentScene === 8 && (
           <motion.div key="s8" style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} exit={{ opacity: 0 }}>
              <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity }}>
                 <TreeDeciduous size={120} color={c.green} />
              </motion.div>
              <motion.div 
                style={{ position: 'absolute', top: 50, right: 50 }}
                animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 5, repeat: Infinity }}
              >
                 <Sun size={60} color={c.yellow} />
              </motion.div>
              {/* Energy Particles */}
              {[0,1,2,3,4,5].map(i => (
                 <motion.div 
                   key={i}
                   style={{ position: 'absolute', bottom: 0, left: 100 + i * 100, width: 4, height: 4, background: c.green, borderRadius: '50%' }}
                   animate={{ y: -600, opacity: [0, 1, 0] }}
                   transition={{ duration: 5, delay: i * 0.8, repeat: Infinity }}
                 />
              ))}
           </motion.div>
        )}

        {/* --- SCENE 9: OUTRO --- */}
        {currentScene === 9 && (
          <motion.div key="s9" style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} exit={{ opacity: 0 }}>
             <motion.div 
               initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}
               style={{ fontSize: 48, fontWeight: 800, letterSpacing: -1 }}
             >
               Lucid<span style={{ color: c.green }}>.</span>
             </motion.div>
             <motion.div 
               initial={{ width: 0 }} animate={{ width: 80 }} transition={{ delay: 0.5, duration: 1 }}
               style={{ height: 2, background: c.green, marginTop: 20 }}
             />
          </motion.div>
        )}

      </AnimatePresence>

      {/* Progress Bar */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, height: 4, background: 'rgba(255,255,255,0.1)', width: '100%' }}>
         <motion.div 
           style={{ height: '100%', background: c.green }}
           initial={{ width: 0 }}
           animate={{ width: `${(currentScene / 9) * 100}%` }}
         />
      </div>
    </div>
  );
};
