import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, Zap, Flame, Recycle, Database, Activity } from 'lucide-react';

// Types for our scene configuration
interface SceneConfig {
  id: number;
  duration: number;
  narration: string;
}

const scenes: SceneConfig[] = [
  { id: 1, duration: 4000, narration: "Let’s take a quick look at how biogas is created using nothing more than organic waste and a bit of biology." },
  { id: 2, duration: 7000, narration: "Biogas starts with organic material — kitchen scraps, manure, and plant matter — all fed into an airtight container called a digester." },
  { id: 3, duration: 11000, narration: "Inside the digester, bacteria break down the waste in a process called anaerobic digestion — meaning it happens without oxygen. As the microbes eat, they release methane-rich biogas." },
  { id: 4, duration: 9000, narration: "The gas rises to the top, gets collected through a pipe, and stored under pressure." },
  { id: 5, duration: 9000, narration: "That stored biogas can then be burned for cooking or used to run a generator that produces electricity." },
  { id: 6, duration: 11000, narration: "It reduces waste, lowers pollution, and provides clean, renewable energy — especially helpful in rural and off-grid communities." },
  { id: 7, duration: 6000, narration: "So in simple terms, biogas turns everyday organic waste into useful energy." },
  { id: 8, duration: 5000, narration: "This is Lucid — making the world’s knowledge easier to understand." },
];

interface BiogasExplainerProps {
  isActive: boolean;
  onComplete?: () => void;
}

export const BiogasExplainer: React.FC<BiogasExplainerProps> = ({ isActive, onComplete }) => {
  const [currentScene, setCurrentScene] = useState(0);
  
  // Reset when activated
  useEffect(() => {
    if (isActive) {
      setCurrentScene(1);
    } else {
      setCurrentScene(0);
    }
  }, [isActive]);

  // Scene Timer
  useEffect(() => {
    if (!isActive || currentScene === 0) return;

    const sceneData = scenes.find(s => s.id === currentScene);
    if (!sceneData) return;

    // Speak narration
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      
      // Create a temporary utterance to check duration if possible, 
      // but standard Web Speech API doesn't give duration beforehand.
      // Instead, we will rely on the 'end' event of the speech synthesis
      // to trigger the next scene, rather than a hardcoded timeout.
      
      const utterance = new SpeechSynthesisUtterance(sceneData.narration);
      utterance.rate = 0.95; 
      utterance.pitch = 1;
      utterance.lang = 'en-US';
      
      // IMPORTANT: If speech finishes BEFORE the visual duration, we wait.
      // If visuals finish BEFORE speech, we wait for speech.
      
      let speechFinished = false;
      let timeFinished = false;
      
      const tryAdvance = () => {
        if (speechFinished && timeFinished) {
           if (currentScene < scenes.length) {
             setCurrentScene(prev => prev + 1);
           } else {
             if (onComplete) onComplete();
           }
        }
      };

      utterance.onend = () => {
        speechFinished = true;
        tryAdvance();
      };

      // Fallback if speech fails or takes too long (browser quirks)
      utterance.onerror = () => {
         speechFinished = true;
         tryAdvance();
      };

      window.speechSynthesis.speak(utterance);

      // Minimum duration timer (visuals)
      const timer = setTimeout(() => {
        timeFinished = true;
        tryAdvance();
      }, sceneData.duration);

      return () => {
        clearTimeout(timer);
        window.speechSynthesis.cancel();
      };
    } else {
      // Fallback for no speech support - just use timer
       const timer = setTimeout(() => {
        if (currentScene < scenes.length) {
          setCurrentScene(prev => prev + 1);
        } else {
          if (onComplete) onComplete();
        }
      }, sceneData.duration);
       return () => clearTimeout(timer);
    }
  }, [currentScene, isActive, onComplete]);

  // Colors
  const colors = {
    bg: "#0c0f14",
    cyan: "#00F6BB",
    yellow: "#EAB308",
    white: "#F5F7FA",
    purple: "#8B5CF6",
    faint: "rgba(255,255,255,0.1)"
  };

  if (!isActive) return null;

  return (
    <div className="biogas-explainer" style={{
      width: '100%',
      height: '100%',
      background: colors.bg,
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: 50,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      fontFamily: 'Inter, sans-serif',
      color: colors.white
    }}>
      <div style={{ position: 'relative', width: '100%', height: '100%', maxWidth: '800px', maxHeight: '600px' }}>
        <AnimatePresence mode="wait">
          
          {/* --- SCENE 1: TITLE --- */}
          {currentScene === 1 && (
            <motion.div
              key="scene-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ width: '100%', height: '100%', position: 'relative' }}
            >
              <svg viewBox="0 0 800 600" style={{ width: '100%', height: '100%' }}>
                <motion.path
                  d="M 100,300 L 300,300 C 350,300 400,250 400,200 L 400,150 L 600,150 L 600,450 L 200,450 L 200,300"
                  fill="none"
                  stroke={colors.cyan}
                  strokeWidth="4"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />
                <motion.text
                  x="400"
                  y="550"
                  textAnchor="middle"
                  fill={colors.white}
                  fontSize="32"
                  fontWeight="bold"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5 }}
                >
                  Biogas Generation
                </motion.text>
              </svg>
            </motion.div>
          )}

          {/* --- SCENE 2: INPUTS --- */}
          {currentScene === 2 && (
            <motion.div
              key="scene-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ width: '100%', height: '100%', position: 'relative' }}
            >
              {/* Central Digester (faded in) */}
              <motion.div
                style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <Database size={120} color={colors.cyan} strokeWidth={1} />
              </motion.div>

              {/* Inputs */}
              {[
                { icon: <Recycle size={40} />, label: "Waste", x: "20%", y: "30%", delay: 0.5 },
                { icon: <Leaf size={40} />, label: "Manure", x: "20%", y: "50%", delay: 1.5 },
                { icon: <Leaf size={40} />, label: "Plants", x: "20%", y: "70%", delay: 2.5 },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  style={{ position: 'absolute', left: item.x, top: item.y, display: 'flex', alignItems: 'center', gap: '10px', color: colors.white }}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: item.delay }}
                >
                  {item.icon}
                  <span style={{ fontSize: '14px' }}>{item.label}</span>
                  <motion.div
                    style={{ height: '2px', background: colors.cyan, position: 'absolute', left: '100%', top: '50%', width: '100px', transformOrigin: 'left' }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: item.delay + 0.5, duration: 0.5 }}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* --- SCENE 3: INSIDE DIGESTER --- */}
          {currentScene === 3 && (
            <motion.div
              key="scene-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}
            >
              <div style={{ position: 'absolute', inset: 40, border: `2px solid ${colors.faint}`, borderRadius: 20 }}>
                {/* Background Fluid */}
                <motion.div 
                   style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '80%', background: 'rgba(0, 246, 187, 0.05)' }}
                />
                
                {/* Bacteria & Organic Matter */}
                {Array.from({ length: 15 }).map((_, i) => (
                  <motion.div
                    key={i}
                    style={{
                      position: 'absolute',
                      width: i % 2 === 0 ? 8 : 16,
                      height: i % 2 === 0 ? 8 : 16,
                      borderRadius: '50%',
                      background: i % 2 === 0 ? colors.cyan : colors.purple,
                      boxShadow: `0 0 10px ${i % 2 === 0 ? colors.cyan : colors.purple}`,
                    }}
                    initial={{ 
                      x: Math.random() * 600 + 50, 
                      y: Math.random() * 300 + 100 
                    }}
                    animate={{
                      x: [null, Math.random() * 600 + 50, Math.random() * 600 + 50],
                      y: [null, Math.random() * 300 + 100, Math.random() * 300 + 100],
                    }}
                    transition={{ duration: 4 + Math.random() * 4, repeat: Infinity, ease: "linear" }}
                  />
                ))}

                {/* Rising Gas Bubbles */}
                {Array.from({ length: 8 }).map((_, i) => (
                  <motion.div
                    key={`bubble-${i}`}
                    style={{
                      position: 'absolute',
                      width: 10,
                      height: 10,
                      borderRadius: '50%',
                      border: `1px solid ${colors.cyan}`,
                      background: 'transparent'
                    }}
                    initial={{ x: Math.random() * 600 + 50, y: 400, opacity: 0 }}
                    animate={{ y: 50, opacity: [0, 1, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: Math.random() * 2, ease: "easeOut" }}
                  />
                ))}
                
                <motion.div
                   style={{ position: 'absolute', top: 20, width: '100%', textAlign: 'center', color: colors.cyan }}
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   transition={{ delay: 1 }}
                >
                  Anaerobic Digestion
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* --- SCENE 4: GAS COLLECTION --- */}
          {currentScene === 4 && (
            <motion.div
              key="scene-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ width: '100%', height: '100%', position: 'relative' }}
            >
               <svg viewBox="0 0 800 600" style={{ width: '100%', height: '100%' }}>
                 {/* Digester Top */}
                 <path d="M 200,400 L 200,300 C 200,250 600,250 600,300 L 600,400" stroke={colors.faint} strokeWidth="2" fill="none" />
                 
                 {/* Pipe */}
                 <path d="M 400,250 L 400,150 L 600,150" stroke={colors.cyan} strokeWidth="6" fill="none" />
                 
                 {/* Storage Tank */}
                 <rect x="600" y="100" width="100" height="150" rx="10" stroke={colors.white} strokeWidth="2" fill="none" />
                 
                 {/* Gas Flow Animation */}
                 <motion.circle r="6" fill={colors.yellow}>
                   <animateMotion 
                     dur="2s" 
                     repeatCount="indefinite"
                     path="M 400,250 L 400,150 L 600,150 L 650,175"
                   />
                 </motion.circle>

                 {/* Filling Tank */}
                 <motion.rect
                   x="605" y="245" width="90" height="0"
                   fill={colors.yellow}
                   opacity="0.5"
                   animate={{ height: 140, y: 105 }}
                   transition={{ duration: 4 }}
                 />
               </svg>
               <motion.div style={{ position: 'absolute', top: '20%', left: '60%', color: colors.yellow }}>
                 Biogas Stored
               </motion.div>
            </motion.div>
          )}

          {/* --- SCENE 5: ENERGY OUTPUT --- */}
          {currentScene === 5 && (
            <motion.div
              key="scene-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ width: '100%', height: '100%', position: 'relative', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}
            >
               {/* Source */}
               <div style={{ textAlign: 'center' }}>
                  <Database size={64} color={colors.yellow} />
                  <p>Biogas</p>
               </div>

               {/* Lines */}
               <svg style={{ position: 'absolute', width: '100%', height: '100%', pointerEvents: 'none' }}>
                 <motion.path 
                   d="M 250,300 L 400,300 L 550,200" 
                   stroke={colors.cyan} strokeWidth="2" fill="none"
                   initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1 }}
                 />
                  <motion.path 
                   d="M 400,300 L 550,400" 
                   stroke={colors.cyan} strokeWidth="2" fill="none"
                   initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1 }}
                 />
               </svg>

               {/* Outputs */}
               <div style={{ display: 'flex', flexDirection: 'column', gap: '80px', marginLeft: '200px' }}>
                 <motion.div 
                   initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1 }}
                   style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
                 >
                   <Flame size={48} color="#F97316" />
                   <span>Cooking / Heat</span>
                 </motion.div>
                 <motion.div 
                   initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.5 }}
                   style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
                 >
                   <Zap size={48} color={colors.yellow} />
                   <span>Electricity</span>
                 </motion.div>
               </div>
            </motion.div>
          )}

          {/* --- SCENE 6: WHY IT MATTERS --- */}
          {currentScene === 6 && (
             <motion.div
             key="scene-6"
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             style={{ width: '100%', height: '100%', display: 'flex' }}
           >
             <motion.div 
               style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRight: `1px solid ${colors.faint}` }}
               animate={{ opacity: [1, 0.3] }} transition={{ duration: 4, delay: 1 }}
             >
               <Recycle size={64} color={colors.purple} />
               <p>Waste Reduction</p>
             </motion.div>
             <motion.div 
               style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
               animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2 }}
             >
               <Leaf size={80} color={colors.cyan} />
               <p>Sustainable Energy</p>
             </motion.div>
           </motion.div>
          )}

           {/* --- SCENE 7: SUMMARY --- */}
           {currentScene === 7 && (
             <motion.div
             key="scene-7"
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             style={{ width: '100%', height: '100%', position: 'relative' }}
           >
             <motion.div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                <h2 style={{ fontSize: '32px', color: colors.cyan }}>Biogas</h2>
                <p>Clean Energy from Waste</p>
             </motion.div>

             {[0, 90, 180, 270].map((deg, i) => (
               <motion.div
                 key={i}
                 style={{ 
                   position: 'absolute', 
                   top: '50%', 
                   left: '50%',
                   width: 40, 
                   height: 40,
                   marginLeft: -20,
                   marginTop: -20,
                   background: colors.faint,
                   borderRadius: '50%',
                   display: 'flex',
                   alignItems: 'center',
                   justifyContent: 'center',
                   transformOrigin: "0 0"
                 }}
                 animate={{ 
                    rotate: [0, 360],
                    translateX: [150, 150], // Orbit radius hack
                 }}
                 transition={{ 
                    rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                    translateX: { duration: 0 } // Static offset
                 }}
               >
                 {/* Instead of complex orbit math, we'll just use absolute positioning with standard rotations for now to keep it simple but effective */}
                 <div style={{ transform: `rotate(${deg}deg) translate(120px) rotate(-${deg}deg)` }}>
                    {i === 0 && <Recycle size={24} color={colors.purple} />}
                    {i === 1 && <Activity size={24} color={colors.cyan} />}
                    {i === 2 && <Database size={24} color={colors.yellow} />}
                    {i === 3 && <Zap size={24} color={colors.white} />}
                 </div>
               </motion.div>
             ))}
           </motion.div>
          )}

           {/* --- SCENE 8: OUTRO --- */}
           {currentScene === 8 && (
             <motion.div
             key="scene-8"
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
           >
             <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 1 }}
               style={{ fontSize: '48px', fontWeight: 'bold', letterSpacing: '-2px' }}
             >
               Lucid
               <span style={{ color: colors.cyan }}>.</span>
             </motion.div>
             <motion.div
               style={{ width: '100px', height: '2px', background: colors.cyan, marginTop: '20px' }}
               initial={{ width: 0 }}
               animate={{ width: 100 }}
               transition={{ delay: 0.5, duration: 1 }}
             />
           </motion.div>
          )}

        </AnimatePresence>

        {/* Scene Indicator */}
        <div style={{ position: 'absolute', bottom: 20, left: 0, width: '100%', display: 'flex', justifyContent: 'center', gap: '4px' }}>
          {scenes.map((s) => (
            <motion.div 
              key={s.id}
              style={{ 
                width: currentScene === s.id ? 24 : 6, 
                height: 6, 
                borderRadius: 3, 
                background: currentScene >= s.id ? colors.cyan : colors.faint 
              }}
              animate={{ width: currentScene === s.id ? 24 : 6 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
