import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, ArrowRight, Zap } from 'lucide-react';
import logo from '../../logo.svg';

type NavbarProps = {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
};

export const Navbar: React.FC<NavbarProps> = ({ theme, onToggleTheme }) => {
  return (
    <motion.header
      className="site-header"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <a href="/" className="logo-container" aria-label="Lucid Home">
        <div className="logo-glow" />
        <img src={logo} alt="Lucid logo" />
        <span className="logo-text">Lucid</span>
      </a>

      <nav className="header-nav desktop-nav">
        <a href="#how-it-works" className="nav-link">
          How It Works
        </a>
        <a href="#features" className="nav-link">
          Features
        </a>
        <a href="#comparison" className="nav-link">
          Why Lucid
        </a>
        <a href="#faq" className="nav-link">
          FAQ
        </a>
        <a href="https://app.lucid-ai.co" className="nav-link external">
          Log in
        </a>
        <a href="https://app.lucid-ai.co" className="btn-primary-nav">
          <Zap size={14} fill="currentColor" />
          <span>Start Free</span>
          <ArrowRight size={14} />
        </a>
        <button
          type="button"
          className="theme-toggle"
          onClick={onToggleTheme}
          aria-label="Toggle theme"
        >
          {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
        </button>
      </nav>

      <div className="mobile-actions">
        <a href="https://app.lucid-ai.co" className="nav-link external">
          Log in
        </a>
        <a href="https://app.lucid-ai.co" className="btn-primary compact">
          Start Free
        </a>
        <button
          type="button"
          className="theme-toggle"
          onClick={onToggleTheme}
          aria-label="Toggle theme"
        >
          {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
        </button>
      </div>
    </motion.header>
  );
};
