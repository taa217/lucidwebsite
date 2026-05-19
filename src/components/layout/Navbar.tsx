import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import logo from '../../logo.svg';

type NavbarProps = {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
};

export const Navbar: React.FC<NavbarProps> = ({ theme, onToggleTheme }) => {
  return (
    <motion.header 
      className="site-header"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="logo-container">
        <div className="logo-glow"></div>
        <img src={logo} alt="Lucid logo" />
        <span>Lucid</span>
      </div>
      <nav className="header-nav desktop-nav">
        <NavLink to="/" className={({ isActive }) => isActive ? "active-link" : ""}>
          Home
        </NavLink>
        <a href="https://app.lucid-ai.co" className="nav-link external">Log in</a>
        <a href="https://app.lucid-ai.co" className="btn-primary">Get Started</a>
        <button className="theme-toggle" onClick={onToggleTheme} aria-label="Toggle theme">
          {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
        </button>
      </nav>

      <div className="mobile-actions">
        <a href="https://app.lucid-ai.co" className="nav-link external">Log in</a>
        <a href="https://app.lucid-ai.co" className="btn-primary compact">Get Started</a>
        <button className="theme-toggle" onClick={onToggleTheme} aria-label="Toggle theme">
          {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
        </button>
      </div>
    </motion.header>
  );
};
