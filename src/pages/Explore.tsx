import React, { useState, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Globe, Zap, Brain, Code, FlaskConical, Calculator } from 'lucide-react';
import { LessonModal } from '../components/LessonModal';
import { ChainRuleExplainer } from '../components/ChainRuleExplainer';
import { FallOfRomeExplainer } from '../components/FallOfRomeExplainer';
import { SpecialRelativityExplainer } from '../components/SpecialRelativityExplainer';
import { NeuralNetworkExplainer } from '../components/NeuralNetworkExplainer';
import { PhotosynthesisExplainer } from '../components/PhotosynthesisExplainer';
import { ReactHooksExplainer } from '../components/ReactHooksExplainer';
import { GenericExplainer } from '../components/GenericExplainer';
import { preloadScenes } from '../hooks/useTTSWithPrefetch';

// First scene for each lesson - preloaded on hover so playback starts instantly
const lessonPreloadData: Record<string, { id: number; narration: string }[]> = {
  "The Chain Rule": [
    { id: 1, narration: "Let's build an intuition for the chain rule — the idea behind differentiating functions inside functions." },
  ],
  "Fall of Rome": [
    { id: 1, narration: "Rome didn't fall in one night. It eroded — slowly, and for many reasons." },
  ],
  "Special Relativity": [
    { id: 1, narration: "Special relativity reshapes how we understand space, time, and motion." },
  ],
  "Neural Networks": [
    { id: 1, narration: "A neural network is a system that learns to transform inputs into meaningful outputs." },
  ],
  "Photosynthesis": [
    { id: 1, narration: "Photosynthesis is how plants turn sunlight into energy they can use." },
  ],
  "React Hooks": [
    { id: 1, narration: "React Hooks let functional components manage state and side effects, making your code cleaner and more powerful." },
  ],
};

export const Explore = () => {
  const [activeLesson, setActiveLesson] = useState<{ title: string; subject: string } | null>(null);
  const preloadedLessonsRef = useRef<Set<string>>(new Set());

  const examples = [
    { title: "The Chain Rule", subject: "Calculus", icon: <Calculator size={24} color="#00F6BB"/>, link: "#" },
    { title: "Fall of Rome", subject: "History", icon: <Globe size={24} color="#F43F5E"/>, link: "#" },
    { title: "Special Relativity", subject: "Physics", icon: <Zap size={24} color="#EAB308"/>, link: "#" },
    { title: "Neural Networks", subject: "Computer Science", icon: <Brain size={24} color="#7C3AED"/>, link: "#" },
    { title: "Photosynthesis", subject: "Biology", icon: <FlaskConical size={24} color="#10B981"/>, link: "#" },
    { title: "React Hooks", subject: "Programming", icon: <Code size={24} color="#06B6D4"/>, link: "#" },
  ];

  // Preload lesson audio when hovering over a tile
  const handleLessonHover = useCallback((lessonTitle: string) => {
    if (preloadedLessonsRef.current.has(lessonTitle)) return;
    
    const scenes = lessonPreloadData[lessonTitle];
    if (scenes) {
      preloadedLessonsRef.current.add(lessonTitle);
      preloadScenes(scenes, "694f9389-aac1-45b6-b726-9d9369183238", 1);
    }
  }, []);

  const handleLessonClick = (e: React.MouseEvent, ex: { title: string; subject: string }) => {
    e.preventDefault();
    setActiveLesson(ex);
  };

  const renderExplainer = () => {
    if (!activeLesson) return null;
    
    switch (activeLesson.title) {
      case "The Chain Rule":
        return <ChainRuleExplainer isActive={!!activeLesson} />;
      case "Fall of Rome":
        return <FallOfRomeExplainer isActive={!!activeLesson} />;
      case "Special Relativity":
        return <SpecialRelativityExplainer isActive={!!activeLesson} />;
      case "Neural Networks":
        return <NeuralNetworkExplainer isActive={!!activeLesson} />;
      case "Photosynthesis":
        return <PhotosynthesisExplainer isActive={!!activeLesson} />;
      case "React Hooks":
        return <ReactHooksExplainer isActive={!!activeLesson} />;
      default:
        return <GenericExplainer isActive={!!activeLesson} title={activeLesson.title} />;
    }
  };

  return (
     <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="page-content"
    >
      <LessonModal 
        isOpen={!!activeLesson} 
        onClose={() => setActiveLesson(null)}
        title={activeLesson?.title || ""}
      >
        {renderExplainer()}
      </LessonModal>

      <section className="live-examples">
        <div className="section-title">
          <motion.h2
             initial={{ y: 20, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
          >
            Explore the Library
          </motion.h2>
          <motion.p
             initial={{ y: 20, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             transition={{ delay: 0.1 }}
          >
            Jump straight into a live session. No signup required for previews.
          </motion.p>
        </div>
        <div className="examples-row grid-view">
          {examples.map((ex, i) => (
            <motion.a 
              key={ex.title} 
              href={ex.link} 
              className="example-tile"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 * i }}
              onClick={(e) => handleLessonClick(e, ex)}
              onMouseEnter={() => handleLessonHover(ex.title)}
              onFocus={() => handleLessonHover(ex.title)}
            >
              <div className="tile-header">
                <span className="subject-tag">{ex.subject}</span>
                {ex.icon}
              </div>
              <h3>{ex.title}</h3>
              <span className="arrow-link">Start Lesson <ArrowRight size={14} /></span>
            </motion.a>
          ))}
        </div>
      </section>
    </motion.div>
  );
};



