import React from 'react';
import { motion } from 'framer-motion';

interface BiogasAnimationProps {
  step: number;
  isPlaying: boolean;
}

export const BiogasAnimation: React.FC<BiogasAnimationProps> = ({ step, isPlaying }) => {
  // Colors
  const c_slurry = "#8B5CF6"; // Purple for organic matter
  const c_methane = "#00F6BB"; // Teal/Green for Biogas
  const c_co2 = "#94A3B8"; // Grey for CO2/Waste
  const c_pipe = "rgba(255, 255, 255, 0.2)";

  // Variants for orchestration
  const tankVariants = {
    initial: { scale: 0.9, opacity: 0.5 },
    active: { scale: 1, opacity: 1, transition: { duration: 0.8 } }
  };

  return (
    <div className="biogas-animation-container" style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', background: '#0B162F', borderRadius: '16px' }}>
      <svg viewBox="0 0 800 400" style={{ width: '100%', height: '100%' }}>
        
        {/* --- Background Grid --- */}
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="800" height="400" fill="url(#grid)" />

        {/* --- Structure: Pipes & Tanks --- */}
        
        {/* Input Pipe */}
        <path d="M 50,100 L 150,100 L 150,200" fill="none" stroke={c_pipe} strokeWidth="8" strokeLinecap="round" />
        
        {/* Digester Tank */}
        <motion.path 
          d="M 150,200 C 150,350 450,350 450,200 L 450,150 C 450,100 150,100 150,150 Z" 
          fill="none" 
          stroke={step >= 0 ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.1)"} 
          strokeWidth="4"
          animate={{ stroke: step >= 0 ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.1)" }}
        />
        
        {/* Outlet Pipe (Gas) */}
        <path d="M 300,100 L 300,50 L 600,50 L 600,150" fill="none" stroke={c_pipe} strokeWidth="8" strokeLinecap="round" />

        {/* Generator / Flare */}
        <motion.rect 
          x="550" y="150" width="100" height="100" rx="8"
          fill="none"
          stroke={step >= 2 ? c_methane : c_pipe}
          strokeWidth="4"
          animate={{ stroke: step >= 2 ? c_methane : c_pipe }}
        />

        {/* --- Step 0: Feedstock Entering --- */}
        {step === 0 && isPlaying && (
          <motion.g>
            {/* Organic Particles */}
            {[0, 1, 2].map(i => (
              <motion.circle 
                key={`input-${i}`}
                r="8"
                fill={c_slurry}
                initial={{ cx: 50, cy: 100, opacity: 0 }}
                animate={{ 
                  cx: [50, 150, 150, 250 + i * 20],
                  cy: [100, 100, 250, 250],
                  opacity: [0, 1, 1, 0]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  delay: i * 0.5, 
                  ease: "easeInOut" 
                }}
              />
            ))}
            <motion.text x="80" y="80" fill="white" fontSize="14" opacity={0.8}>Feedstock</motion.text>
          </motion.g>
        )}

        {/* --- Step 1: Digestion Process --- */}
        {(step === 1 || step === 2) && (
          <motion.g>
             {/* Liquid Level */}
             <motion.path 
               d="M 160,250 C 200,260 400,260 440,250 C 440,340 160,340 160,250 Z"
               fill={c_slurry}
               opacity="0.3"
               initial={{ scaleY: 0 }}
               animate={{ scaleY: 1 }}
               transition={{ duration: 1 }}
             />
             
             {/* Microbes Working */}
             {[0, 1, 2, 3].map(i => (
               <motion.circle
                 key={`microbe-${i}`}
                 r="4"
                 fill="#F472B6" // Pink microbes
                 initial={{ cx: 200 + i * 50, cy: 280 }}
                 animate={{ 
                   cx: 200 + i * 50 + Math.sin(i) * 20,
                   cy: 280 + Math.cos(i) * 20
                 }}
                 transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
               />
             ))}

             {/* Rising Gas Bubbles */}
             {step >= 1 && isPlaying && [0, 1, 2, 3, 4].map(i => (
               <motion.circle
                 key={`gas-${i}`}
                 r={6}
                 fill={c_methane}
                 initial={{ cx: 200 + i * 40, cy: 260, opacity: 0 }}
                 animate={{ 
                   cy: 120,
                   opacity: [0, 1, 1, 0]
                 }}
                 transition={{ 
                   duration: 2.5, 
                   repeat: Infinity, 
                   delay: i * 0.4,
                   ease: "easeOut"
                 }}
               />
             ))}
             
             <motion.text 
               x="300" y="300" 
               textAnchor="middle" 
               fill="white" 
               fontSize="16"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
             >
               Anaerobic Digestion
             </motion.text>
          </motion.g>
        )}

        {/* --- Step 2: Gas Upgrade & Output --- */}
        {step === 2 && isPlaying && (
          <motion.g>
            {/* Gas moving through pipe */}
            {[0, 1, 2].map(i => (
              <motion.circle 
                key={`pipe-gas-${i}`}
                r="5"
                fill={c_methane}
                initial={{ cx: 300, cy: 100, opacity: 0 }}
                animate={{ 
                  cx: [300, 300, 600, 600],
                  cy: [100, 50, 50, 150],
                  opacity: [0, 1, 1, 0]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  delay: i * 0.6, 
                  ease: "linear" 
                }}
              />
            ))}
            
            {/* Electricity Bolt */}
            <motion.path
              d="M 600,180 L 580,200 L 600,200 L 590,230 L 620,200 L 600,200 L 610,180 Z"
              fill={c_methane}
              stroke="none"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 1, 0], scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            />
             <motion.text x="580" y="260" fill={c_methane} fontSize="14" textAnchor="middle">Energy Output</motion.text>
          </motion.g>
        )}

      </svg>
      
      {/* Overlay Data */}
      <div style={{ position: 'absolute', bottom: 10, right: 10, fontFamily: 'monospace', color: c_pipe, fontSize: '10px' }}>
        STEP: {step} | SIMULATION_ACTIVE
      </div>
    </div>
  );
};



