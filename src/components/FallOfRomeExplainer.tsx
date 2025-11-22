import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Coins, Landmark, Users, TrendingUp, AlertTriangle } from 'lucide-react';

interface FallOfRomeExplainerProps {
  isActive: boolean;
  onComplete?: () => void;
}

// Scene Configuration
const scenes = [
  { id: 1, duration: 3000, narration: "Rome didn’t fall in one night. It eroded — slowly, and for many reasons." },
  { id: 2, duration: 6000, narration: "At its peak, Rome ruled an enormous territory connected by roads, trade, and a disciplined army." },
  { id: 3, duration: 8000, narration: "But size came with a price. Defending such a huge border drained money faster than Rome could collect it." },
  { id: 4, duration: 10000, narration: "Inside the empire, politics turned chaotic. Corruption spread, emperors changed rapidly, and inflation weakened the economy." },
  { id: 5, duration: 8000, narration: "Meanwhile, migrating groups from the north pressed into Roman lands, fleeing the Huns and searching for stability." },
  { id: 6, duration: 10000, narration: "Eventually, the empire split. The richer Eastern half survived. But the West weakened until it could no longer defend itself." },
  { id: 7, duration: 8000, narration: "In 476 CE, the final Western emperor was deposed — a symbol of an empire that had already faded." },
  { id: 8, duration: 5000, narration: "Rome didn't fall from one cause, but from many forces piling up over centuries." },
  { id: 9, duration: 3000, narration: "This is Lucid — making the past clear." }
];

export const FallOfRomeExplainer: React.FC<FallOfRomeExplainerProps> = ({ isActive, onComplete }) => {
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
    bg: "#0d0a05",
    gold: "#FCD34D",
    crimson: "#EF4444",
    cyan: "#22D3EE",
    white: "#F5F7FA",
    faint: "rgba(252, 211, 77, 0.1)", // faint gold
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
            <svg width="200" height="120" viewBox="0 0 200 120">
               {/* Abstract Eagle Wings */}
               <motion.path 
                 d="M 20,60 C 60,20 100,60 100,60 C 100,60 140,20 180,60 C 180,60 140,80 100,80 C 60,80 20,60 20,60 Z"
                 fill="none" stroke={c.gold} strokeWidth="3"
                 initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 2, ease: "easeInOut" }}
               />
            </svg>
            <motion.h1 
              style={{ fontSize: '36px', fontWeight: 700, marginTop: 20, color: c.white }}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}
            >
              Why Rome Fell
            </motion.h1>
          </motion.div>
        )}

        {/* --- SCENE 2: THE EMPIRE AT ITS HEIGHT --- */}
        {currentScene === 2 && (
          <motion.div key="s2" style={{ width: '100%', height: '100%', position: 'relative' }} exit={{ opacity: 0 }}>
            <svg viewBox="0 0 800 450" style={{ width: '100%', height: '100%' }}>
               {/* Abstract Map */}
               <motion.path 
                  d="M 150,150 Q 250,100 350,120 Q 450,100 550,150 L 500,250 Q 350,350 200,250 Z"
                  fill={c.faint} stroke={c.gold} strokeWidth="2"
                  initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 2 }}
               />
               
               {/* Regions */}
               {[
                 { x: 350, y: 200 }, // Italia
                 { x: 250, y: 150 }, // Gaul
                 { x: 450, y: 250 }, // Africa
                 { x: 500, y: 150 }, // East
               ].map((p, i) => (
                 <motion.circle 
                    key={i} cx={p.x} cy={p.y} r="4" fill={c.gold}
                    initial={{ scale: 0 }} animate={{ scale: [1, 1.5, 1] }} transition={{ delay: 2 + i*0.2, repeat: Infinity, duration: 2 }}
                 />
               ))}
               
               {/* Roads */}
               <motion.path 
                 d="M 350,200 L 250,150 M 350,200 L 500,150 M 350,200 L 450,250"
                 stroke={c.gold} strokeWidth="1" strokeDasharray="4 4"
                 initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} transition={{ delay: 1.5 }}
               />
            </svg>
            <motion.div 
              style={{ position: 'absolute', top: 20, width: '100%', textAlign: 'center', color: c.gold, letterSpacing: 2 }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            >
              PAX ROMANA
            </motion.div>
          </motion.div>
        )}

        {/* --- SCENE 3: OVEREXTENSION --- */}
        {currentScene === 3 && (
          <motion.div key="s3" style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 60 }} exit={{ opacity: 0 }}>
             {/* Map Stretching */}
             <motion.div
                style={{ width: 200, height: 120, border: `2px solid ${c.gold}`, borderRadius: 60, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                animate={{ width: [200, 300], borderColor: [c.gold, c.crimson] }}
                transition={{ duration: 4, ease: "easeInOut" }}
             >
                <span style={{ fontSize: 12, color: c.white }}>Empire</span>
             </motion.div>

             {/* Economics */}
             <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                   <motion.div 
                     style={{ width: 80, height: 80, borderRadius: '50%', border: `2px solid ${c.crimson}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: c.crimson }}
                     initial={{ scale: 0.8 }} animate={{ scale: 1.2 }} transition={{ duration: 3 }}
                   >
                     Costs
                   </motion.div>
                </div>
                 <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                   <motion.div 
                     style={{ width: 60, height: 60, borderRadius: '50%', border: `2px solid ${c.gold}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: c.gold }}
                     initial={{ scale: 1 }} animate={{ scale: 0.7 }} transition={{ duration: 3 }}
                   >
                     Rev
                   </motion.div>
                </div>
             </div>
          </motion.div>
        )}

        {/* --- SCENE 4: INTERNAL WEAKNESS --- */}
        {currentScene === 4 && (
          <motion.div key="s4" style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }} exit={{ opacity: 0 }}>
             {/* Political Instability */}
             <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }} style={{ textAlign: 'center' }}>
                <Landmark size={48} color={c.white} />
                <motion.div 
                  style={{ width: 2, height: 48, background: c.crimson, position: 'absolute', left: '50%', top: 0 }}
                  initial={{ height: 0 }} animate={{ height: 48 }} transition={{ delay: 1.5, duration: 0.5 }}
                />
                <p style={{ marginTop: 10 }}>Instability</p>
             </motion.div>

             {/* Corruption */}
             <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 2.5 }} style={{ textAlign: 'center' }}>
                <Users size={48} color={c.gold} />
                <motion.div animate={{ filter: "blur(2px)", opacity: 0.5 }} transition={{ delay: 3.5, duration: 1 }}>
                  <p style={{ marginTop: 10 }}>Corruption</p>
                </motion.div>
             </motion.div>

             {/* Inflation */}
             <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 4.5 }} style={{ textAlign: 'center' }}>
                <Coins size={48} color={c.crimson} />
                <motion.div animate={{ scale: 1.5, opacity: 0.7 }} transition={{ delay: 5.5, duration: 2 }}>
                   <p style={{ marginTop: 10 }}>Inflation</p>
                </motion.div>
             </motion.div>
          </motion.div>
        )}

        {/* --- SCENE 5: EXTERNAL PRESSURES --- */}
        {currentScene === 5 && (
          <motion.div key="s5" style={{ width: '100%', height: '100%', position: 'relative' }} exit={{ opacity: 0 }}>
             {/* Roman Border */}
             <motion.div 
               style={{ position: 'absolute', left: '50%', top: '50%', width: 300, height: 200, border: `2px solid ${c.gold}`, borderRadius: 20, transform: 'translate(-50%, -50%)' }}
               animate={{ scale: 0.9, borderColor: c.crimson }}
               transition={{ duration: 4 }}
             />
             
             {/* Invaders */}
             {[0, 1, 2, 3, 4].map((i) => (
                <motion.div
                   key={i}
                   style={{ position: 'absolute' }}
                   initial={{ 
                      top: i < 3 ? '10%' : '80%', 
                      left: i % 2 === 0 ? '10%' : '80%',
                      opacity: 0
                   }}
                   animate={{ 
                      top: '50%', 
                      left: '50%',
                      opacity: 1
                   }}
                   transition={{ duration: 5, delay: i * 0.5 }}
                >
                   <Shield size={24} color={c.crimson} fill={c.crimson} style={{ opacity: 0.6 }} />
                </motion.div>
             ))}
             
             <motion.div 
               style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: c.white, fontWeight: 'bold' }}
               initial={{ opacity: 1 }} animate={{ opacity: 0.5 }} transition={{ duration: 4 }}
             >
               ROME
             </motion.div>
          </motion.div>
        )}

        {/* --- SCENE 6: THE BREAKING POINT --- */}
        {currentScene === 6 && (
          <motion.div key="s6" style={{ width: '100%', height: '100%', display: 'flex', gap: 20, alignItems: 'center', justifyContent: 'center' }} exit={{ opacity: 0 }}>
             {/* West */}
             <motion.div 
                style={{ width: 150, height: 150, border: `2px dashed ${c.crimson}`, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 12 }}
                animate={{ opacity: [1, 0.5, 0], scale: 0.9 }}
                transition={{ duration: 4, delay: 2 }}
             >
               WEST
             </motion.div>

             {/* Split Line */}
             <motion.div 
               style={{ width: 2, height: 200, background: c.white }}
               initial={{ height: 0 }} animate={{ height: 200 }} transition={{ duration: 1 }}
             />

             {/* East */}
             <motion.div 
                style={{ width: 150, height: 150, border: `2px solid ${c.gold}`, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 12, background: 'rgba(252, 211, 77, 0.05)' }}
                animate={{ boxShadow: `0 0 20px ${c.faint}` }}
             >
               EAST
             </motion.div>
          </motion.div>
        )}

        {/* --- SCENE 7: FINAL COLLAPSE --- */}
        {currentScene === 7 && (
          <motion.div key="s7" style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} exit={{ opacity: 0 }}>
             <motion.div
               initial={{ y: -100, rotate: 0, opacity: 0 }}
               animate={{ y: 0, rotate: 20, opacity: 1 }}
               transition={{ duration: 3, ease: "easeOut" }}
             >
                {/* Abstract Helmet */}
                <Shield size={80} color={c.gold} strokeWidth={1} />
             </motion.div>
             
             {/* Dust Cloud */}
             <motion.div
                style={{ width: 100, height: 20, background: c.faint, borderRadius: '50%', marginTop: 20, filter: 'blur(10px)' }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 2, opacity: [0, 0.5, 0] }}
                transition={{ delay: 2.8, duration: 2 }}
             />

             <motion.div
               initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 4 }}
               style={{ marginTop: 40, fontSize: 24, color: c.faint }}
             >
               476 CE
             </motion.div>
          </motion.div>
        )}

        {/* --- SCENE 8: SUMMARY --- */}
        {currentScene === 8 && (
           <motion.div key="s8" style={{ width: '100%', height: '100%', position: 'relative' }} exit={{ opacity: 0 }}>
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                 <Shield size={40} color={c.faint} />
              </div>
              {/* Orbiting causes */}
              {[0, 90, 180, 270].map((deg, i) => (
                <motion.div 
                  key={i}
                  style={{ 
                    position: 'absolute', top: '50%', left: '50%', width: 60, height: 60, marginLeft: -30, marginTop: -30,
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                >
                   <div style={{ transform: `rotate(${deg}deg) translate(120px) rotate(-${deg}deg)` }}>
                      {i===0 && <TrendingUp size={24} color={c.crimson} />} {/* Overextension */}
                      {i===1 && <Landmark size={24} color={c.white} />}    {/* Politics */}
                      {i===2 && <Coins size={24} color={c.gold} />}       {/* Economy */}
                      {i===3 && <Shield size={24} color={c.cyan} />}      {/* External */}
                   </div>
                </motion.div>
              ))}
              <div style={{ position: 'absolute', width: '100%', textAlign: 'center', bottom: 40, color: c.gold }}>
                 Systemic Collapse
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
               style={{ height: 2, background: `linear-gradient(90deg, ${c.gold}, ${c.cyan})`, marginTop: 20 }}
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


