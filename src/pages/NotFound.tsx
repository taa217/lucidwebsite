import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Search, ArrowLeft } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export const NotFound: React.FC = () => (
  <motion.section
    className="not-found-page"
    variants={containerVariants}
    initial="hidden"
    animate="visible"
  >
    <motion.div className="not-found-glow" aria-hidden="true" variants={itemVariants} />

    <motion.h1 className="not-found-code" variants={itemVariants}>
      404
    </motion.h1>

    <motion.h2 className="not-found-title" variants={itemVariants}>
      Page not found
    </motion.h2>

    <motion.p className="not-found-description" variants={itemVariants}>
      The page you're looking for doesn't exist or has been moved.
    </motion.p>

    <motion.div className="not-found-actions" variants={itemVariants}>
      <Link to="/" className="not-found-btn primary">
        <Home size={18} />
        Back to Home
      </Link>
      <Link to="/explore" className="not-found-btn secondary">
        <Search size={18} />
        Explore Lessons
      </Link>
    </motion.div>

    <motion.button
      className="not-found-back"
      variants={itemVariants}
      onClick={() => window.history.back()}
    >
      <ArrowLeft size={16} />
      Go back
    </motion.button>
  </motion.section>
);
