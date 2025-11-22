import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface LessonModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const LessonModal: React.FC<LessonModalProps> = ({ isOpen, onClose, title, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(12, 15, 20, 0.8)', // Dark overlay
          backdropFilter: 'blur(8px)'
        }}>
           <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             onClick={onClose}
             style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
           />
           <motion.div
             initial={{ scale: 0.9, opacity: 0, y: 20 }}
             animate={{ scale: 1, opacity: 1, y: 0 }}
             exit={{ scale: 0.9, opacity: 0, y: 20 }}
             transition={{ type: "spring", damping: 25, stiffness: 300 }}
             style={{
               width: '90%',
               maxWidth: '900px',
               aspectRatio: '16/9',
               backgroundColor: '#0c0f14',
               borderRadius: '16px',
               boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
               border: '1px solid rgba(255,255,255,0.1)',
               position: 'relative',
               overflow: 'hidden',
               display: 'flex',
               flexDirection: 'column'
             }}
           >
             <div style={{
               padding: '16px 24px',
               borderBottom: '1px solid rgba(255,255,255,0.1)',
               display: 'flex',
               justifyContent: 'space-between',
               alignItems: 'center',
               backgroundColor: 'rgba(255,255,255,0.03)',
               zIndex: 10
             }}>
               <h3 style={{ margin: 0, color: '#F5F7FA', fontSize: '18px', fontWeight: 600 }}>{title}</h3>
               <button 
                 onClick={onClose}
                 style={{
                   background: 'transparent',
                   border: 'none',
                   color: '#94a3b8',
                   cursor: 'pointer',
                   padding: '4px',
                   display: 'flex',
                   alignItems: 'center',
                   justifyContent: 'center',
                   borderRadius: '50%',
                   transition: 'all 0.2s'
                 }}
               >
                 <X size={20} />
               </button>
             </div>
             
             <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
               {children}
             </div>
           </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};




