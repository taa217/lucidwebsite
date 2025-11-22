import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface GenericExplainerProps {
  isActive: boolean;
  title: string;
}

export const GenericExplainer: React.FC<GenericExplainerProps> = ({ isActive, title }) => {
  const [step, setStep] = useState(0);
  
  useEffect(() => {
    if (!isActive) {
      setStep(0);
      window.speechSynthesis.cancel();
      return;
    }
    
    const text = `Welcome to the lesson on ${title}. This is a generated interactive module. Lucid analyzes the topic structure and builds a custom visual guide just for you.`;
    
    const u = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(u);
    
    const t = setTimeout(() => setStep(1), 1000);
    return () => { clearTimeout(t); window.speechSynthesis.cancel(); };
  }, [isActive, title]);

  return (
    <div style={{ width: '100%', height: '100%', background: '#0c0f14', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ fontSize: '32px' }}
      >
        {title}
      </motion.h2>
      <motion.div
        style={{ width: 100, height: 2, background: '#00F6BB', marginTop: 20 }}
        initial={{ width: 0 }}
        animate={{ width: 100 }}
      />
      <p style={{ marginTop: 40, color: '#94a3b8', maxWidth: 400, textAlign: 'center' }}>
        Real-time generation active...
      </p>
    </div>
  );
};




