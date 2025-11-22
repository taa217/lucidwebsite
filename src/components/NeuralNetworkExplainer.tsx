import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, FileText, Music, Table } from 'lucide-react';

interface NeuralNetworkExplainerProps {
  isActive: boolean;
  onComplete?: () => void;
}

// Scene Configuration
const scenes = [
  { id: 1, duration: 3000, narration: "A neural network is a system that learns to transform inputs into meaningful outputs." },
  { id: 2, duration: 8000, narration: "Each unit, or neuron, takes numbers in, mixes them together, applies a rule, and sends out a new number." },
  { id: 3, duration: 8000, narration: "Stack these neurons into layers, and each layer extracts more abstract patterns than the last." },
  { id: 4, duration: 10000, narration: "When you give the network data, the signal flows forward. Each neuron reacts based on the numbers it receives." },
  { id: 5, duration: 10000, narration: "These connections have strengths, called weights. They determine how strongly one neuron influences another." },
  { id: 6, duration: 10000, narration: "Learning is simply adjusting these weights so the network’s output gets closer to the correct answer." },
  { id: 7, duration: 8000, narration: "Once trained, the network can detect patterns — in images, sound, text, or data." },
  { id: 8, duration: 6000, narration: "A neural network is a machine that learns how to turn inputs into predictions by adjusting its connections." },
  { id: 9, duration: 3000, narration: "This is Lucid — clarity in motion." }
];

export const NeuralNetworkExplainer: React.FC<NeuralNetworkExplainerProps> = ({ isActive, onComplete }) => {
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
    bg: "#0a0a0a", // Dark background
    cyan: "#22D3EE", // Input/Low
    magenta: "#E879F9", // Hidden/Mid
    gold: "#FACC15", // Output/High
    white: "#F5F7FA",
    faint: "rgba(255,255,255,0.1)",
    textMain: "#F5F7FA",
    error: "#EF4444"
  };

  // Helper to generate network paths
  const generateNetwork = (layers: number[], active: boolean, pulseColor: string) => {
     return (
        <svg width="100%" height="100%" style={{ overflow: 'visible' }}>
           {/* Connections */}
           {layers.slice(0, -1).map((count, layerIdx) => (
              Array.from({ length: count }).map((_, i) => (
                Array.from({ length: layers[layerIdx + 1] }).map((_, j) => {
                   const x1 = 100 + layerIdx * 200;
                   const y1 = 50 + i * (300 / (count - 1 || 1)) + (4 - count) * 20; // Center vertically
                   const x2 = 100 + (layerIdx + 1) * 200;
                   const y2 = 50 + j * (300 / (layers[layerIdx + 1] - 1 || 1)) + (4 - layers[layerIdx + 1]) * 20;
                   
                   return (
                     <motion.line 
                       key={`line-${layerIdx}-${i}-${j}`}
                       x1={x1} y1={y1} x2={x2} y2={y2}
                       stroke={c.faint}
                       strokeWidth="1"
                       initial={{ pathLength: 0 }}
                       animate={{ pathLength: 1 }}
                       transition={{ duration: 1, delay: layerIdx * 0.2 }}
                     >
                     </motion.line>
                   );
                })
              ))
           ))}

           {/* Pulses - Only if active */}
           {active && layers.slice(0, -1).map((count, layerIdx) => (
              Array.from({ length: count }).map((_, i) => (
                Array.from({ length: layers[layerIdx + 1] }).map((_, j) => {
                   const x1 = 100 + layerIdx * 200;
                   const y1 = 50 + i * (300 / (count - 1 || 1)) + (4 - count) * 20;
                   const x2 = 100 + (layerIdx + 1) * 200;
                   const y2 = 50 + j * (300 / (layers[layerIdx + 1] - 1 || 1)) + (4 - layers[layerIdx + 1]) * 20;
                   
                   return (
                     <motion.circle 
                       key={`pulse-${layerIdx}-${i}-${j}`}
                       r="3" fill={pulseColor}
                       initial={{ offsetDistance: "0%" }}
                       animate={{ offsetDistance: "100%" }}
                       transition={{ 
                         duration: 2, 
                         repeat: Infinity, 
                         ease: "linear", 
                         delay: layerIdx * 0.5 + i * 0.1 + j * 0.1 
                       }}
                       style={{ offsetPath: `path('M ${x1} ${y1} L ${x2} ${y2}')` }}
                     />
                   );
                })
              ))
           ))}

           {/* Neurons */}
           {layers.map((count, layerIdx) => (
              Array.from({ length: count }).map((_, i) => {
                 const x = 100 + layerIdx * 200;
                 const y = 50 + i * (300 / (count - 1 || 1)) + (4 - count) * 20;
                 const color = layerIdx === 0 ? c.cyan : layerIdx === layers.length - 1 ? c.gold : c.magenta;
                 
                 return (
                   <motion.circle
                     key={`neuron-${layerIdx}-${i}`}
                     cx={x} cy={y} r={12}
                     fill="#000"
                     stroke={color}
                     strokeWidth="2"
                     initial={{ scale: 0 }}
                     animate={{ 
                       scale: 1, 
                       fill: active ? ["#000", color, "#000"] : "#000" 
                     }}
                     transition={{ delay: layerIdx * 0.2 + i * 0.1, fill: { duration: 2, repeat: Infinity } }}
                   />
                 );
              })
           ))}
        </svg>
     );
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
          <motion.div key="s1" style={{ width: '100%', height: '100%', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
            exit={{ opacity: 0 }}
          >
            {/* Background Faint Network */}
            <div style={{ position: 'absolute', inset: 0, opacity: 0.3 }}>
               {generateNetwork([4, 5, 3], true, c.cyan)}
            </div>
            
            <motion.h1 
              style={{ fontSize: '48px', fontWeight: 700, letterSpacing: -1, zIndex: 10, textShadow: '0 0 30px rgba(0,0,0,0.8)' }}
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1 }}
            >
              Neural Networks
            </motion.h1>
          </motion.div>
        )}

        {/* --- SCENE 2: THE NEURON --- */}
        {currentScene === 2 && (
          <motion.div key="s2" style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} exit={{ opacity: 0 }}>
             <svg width="600" height="400" style={{ overflow: 'visible' }}>
                {/* Inputs */}
                {[0, 1, 2].map(i => (
                   <motion.g key={`input-${i}`}>
                      <motion.path 
                        d={`M 100,${100 + i * 100} L 300,200`}
                        stroke={c.cyan} strokeWidth="2" fill="none"
                        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: i * 0.2 }}
                      />
                      <motion.circle r="4" fill={c.cyan}>
                         <animateMotion path={`M 100,${100 + i * 100} L 300,200`} dur="2s" repeatCount="indefinite" begin={`${i*0.5}s`} />
                      </motion.circle>
                      <motion.text 
                        x="60" y={105 + i * 100} fill={c.cyan} fontSize="16"
                        initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 60 }} transition={{ delay: 0.5 + i * 0.2 }}
                      >
                        x{i+1}
                      </motion.text>
                   </motion.g>
                ))}

                {/* Neuron Node */}
                <motion.circle 
                   cx="300" cy="200" r="40" fill={c.bg} stroke={c.gold} strokeWidth="3"
                   initial={{ scale: 0 }} animate={{ scale: 1, boxShadow: `0 0 20px ${c.gold}` }} transition={{ delay: 0.5 }}
                />
                <motion.text x="300" y="205" textAnchor="middle" fill={c.white} fontSize="14" opacity="0.8">Σ + f</motion.text>

                {/* Output */}
                <motion.path 
                  d="M 340,200 L 500,200" 
                  stroke={c.gold} strokeWidth="4" 
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.5 }}
                />
                <motion.circle r="6" fill={c.gold}>
                   <animateMotion path="M 340,200 L 500,200" dur="2s" repeatCount="indefinite" />
                </motion.circle>
             </svg>
          </motion.div>
        )}

        {/* --- SCENE 3: LAYERS --- */}
        {currentScene === 3 && (
          <motion.div key="s3" style={{ width: '100%', height: '100%' }} exit={{ opacity: 0 }}>
             <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 100px', marginTop: 20, color: c.faint, fontSize: 12, textTransform: 'uppercase', letterSpacing: 1 }}>
                <span style={{ color: c.cyan }}>Input Layer</span>
                <span style={{ color: c.magenta }}>Hidden Layer</span>
                <span style={{ color: c.gold }}>Output Layer</span>
             </div>
             {generateNetwork([4, 5, 2], true, c.white)}
          </motion.div>
        )}

        {/* --- SCENE 4: FORWARD PASS --- */}
        {currentScene === 4 && (
          <motion.div key="s4" style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} exit={{ opacity: 0 }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
                {/* Input Vector */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                   {[0.2, 0.8, 0.5].map((val, i) => (
                      <motion.div 
                        key={i}
                        style={{ width: 40, height: 40, border: `1px solid ${c.cyan}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: c.cyan, borderRadius: 8 }}
                        initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.2 }}
                      >
                        {val}
                      </motion.div>
                   ))}
                </div>
                
                {/* Network */}
                <div style={{ width: 400, height: 300 }}>
                   {generateNetwork([3, 4, 2], true, c.magenta)}
                </div>
             </div>
          </motion.div>
        )}

        {/* --- SCENE 5: WEIGHTS --- */}
        {currentScene === 5 && (
          <motion.div key="s5" style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} exit={{ opacity: 0 }}>
             <svg width="600" height="300" style={{ overflow: 'visible' }}>
                {/* Single Connection Focus */}
                <motion.circle cx="100" cy="150" r="20" fill={c.bg} stroke={c.cyan} strokeWidth="2" />
                <motion.circle cx="500" cy="150" r="20" fill={c.bg} stroke={c.gold} strokeWidth="2" />
                
                {/* Weight Line */}
                <motion.line 
                  x1="120" y1="150" x2="480" y2="150" 
                  stroke={c.white} strokeWidth="2"
                  animate={{ strokeWidth: [2, 8, 2] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
                
                {/* Label */}
                <motion.text 
                  x="300" y="130" textAnchor="middle" fill={c.faint} fontSize="16"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                >
                   Weight (w) strength
                </motion.text>
             </svg>
             
             {/* Slider Mock */}
             <motion.div 
               style={{ width: 300, height: 4, background: c.faint, borderRadius: 2, position: 'relative', marginTop: 40 }}
             >
                <motion.div 
                  style={{ width: 20, height: 20, background: c.cyan, borderRadius: '50%', position: 'absolute', top: -8 }}
                  animate={{ left: ['0%', '100%', '0%'] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
             </motion.div>
          </motion.div>
        )}

        {/* --- SCENE 6: LEARNING --- */}
        {currentScene === 6 && (
          <motion.div key="s6" style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 60 }} exit={{ opacity: 0 }}>
             {/* Network Small */}
             <div style={{ width: 200, height: 200 }}>
                {generateNetwork([2, 3, 1], true, c.magenta)}
             </div>

             {/* Output Comparison */}
             <div style={{ display: 'flex', flexDirection: 'column', gap: 20, fontSize: 24, fontFamily: 'JetBrains Mono' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                   <span style={{ color: c.gold }}>Output:</span>
                   <motion.span animate={{ color: [c.error, c.gold] }} transition={{ duration: 5, repeat: Infinity }}>
                      0.4
                   </motion.span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                   <span style={{ color: c.white }}>Target:</span>
                   <span>1.0</span>
                </div>
                
                <motion.div 
                  style={{ height: 2, background: c.error, marginTop: 10 }}
                  animate={{ width: [100, 0] }}
                  transition={{ duration: 5, repeat: Infinity }}
                />
                <span style={{ fontSize: 14, color: c.error }}>Error decreasing...</span>
             </div>
          </motion.div>
        )}

        {/* --- SCENE 7: PATTERN RECOGNITION --- */}
        {currentScene === 7 && (
          <motion.div key="s7" style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }} exit={{ opacity: 0 }}>
             {/* Inputs */}
             <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
                <motion.div 
                   initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.5 }}
                   style={{ display: 'flex', alignItems: 'center', gap: 10, color: c.cyan }}
                >
                   <div style={{ width: 40, height: 40, border: `1px solid ${c.cyan}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>2</div>
                   <span>Image</span>
                </motion.div>
                <motion.div 
                   initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 2.5 }}
                   style={{ display: 'flex', alignItems: 'center', gap: 10, color: c.magenta }}
                >
                   <Music size={24} />
                   <span>Sound</span>
                </motion.div>
                <motion.div 
                   initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 4.5 }}
                   style={{ display: 'flex', alignItems: 'center', gap: 10, color: c.gold }}
                >
                   <Table size={24} />
                   <span>Data</span>
                </motion.div>
             </div>
             
             {/* Processing Brain */}
             <motion.div 
                style={{ width: 120, height: 120, background: c.faint, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                animate={{ boxShadow: [`0 0 0px ${c.bg}`, `0 0 30px ${c.cyan}`, `0 0 0px ${c.bg}`] }}
                transition={{ duration: 2, repeat: Infinity }}
             >
                <Brain size={60} color={c.white} />
             </motion.div>

             {/* Output */}
             <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
                style={{ fontSize: 24, color: c.gold, border: `1px dashed ${c.gold}`, padding: '10px 20px', borderRadius: 8 }}
             >
                Prediction
             </motion.div>
          </motion.div>
        )}

        {/* --- SCENE 8: SUMMARY --- */}
        {currentScene === 8 && (
           <motion.div key="s8" style={{ width: '100%', height: '100%', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }} exit={{ opacity: 0 }}>
              <div style={{ width: 600, height: 400, opacity: 0.4 }}>
                 {generateNetwork([5, 6, 4], true, c.cyan)}
              </div>
              <div style={{ position: 'absolute', display: 'flex', gap: 60, fontSize: 24, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 2 }}>
                 <motion.span style={{ color: c.cyan }} animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 3 }}>Inputs</motion.span>
                 <motion.span style={{ color: c.magenta }} animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 3, delay: 1 }}>Weights</motion.span>
                 <motion.span style={{ color: c.gold }} animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 3, delay: 2 }}>Outputs</motion.span>
              </div>
           </motion.div>
        )}

        {/* --- SCENE 9: OUTRO --- */}
        {currentScene === 9 && (
          <motion.div key="s9" style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} exit={{ opacity: 0 }}>
             <motion.div 
               initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}
               style={{ fontSize: 48, fontWeight: 800, letterSpacing: -1 }}
             >
               Lucid<span style={{ color: c.gold }}>.</span>
             </motion.div>
             <motion.div 
               initial={{ width: 0 }} animate={{ width: 80 }} transition={{ delay: 0.5, duration: 1 }}
               style={{ height: 2, background: c.gold, marginTop: 20 }}
             />
          </motion.div>
        )}

      </AnimatePresence>

      {/* Progress Bar */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, height: 4, background: 'rgba(255,255,255,0.1)', width: '100%' }}>
         <motion.div 
           style={{ height: '100%', background: c.gold }}
           initial={{ width: 0 }}
           animate={{ width: `${(currentScene / 9) * 100}%` }}
         />
      </div>
    </div>
  );
};
