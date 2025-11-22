import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import lightLogo from '../../logo.svg';
import darkLogo from '../../logoicondark.png';

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
        <img src={theme === 'light' ? lightLogo : darkLogo} alt="Lucid logo" />
        <span>Lucid</span>
      </div>
      <nav className="header-nav desktop-nav">
        <NavLink to="/" className={({ isActive }) => isActive ? "active-link" : ""}>
          Home
        </NavLink>
        <NavLink to="/explore" className={({ isActive }) => isActive ? "active-link" : ""}>
          Explore
        </NavLink>
        <a href="https://lucidai-m3m2.vercel.app/auth/workos/authorize" className="nav-link external">Log in</a>
        <a href="https://tranquil-artist-65.authkit.app/sign-up" className="btn-primary">Get Started</a>
        <button className="theme-toggle" onClick={onToggleTheme} aria-label="Toggle theme">
          {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
        </button>
      </nav>

      <div className="mobile-actions">
        <NavLink to="/explore" className={({ isActive }) => isActive ? "active-link" : ""}>
          Explore
        </NavLink>
        <a href="https://app.lucid-ai.co" className="nav-link external">Log in</a>
        <a href="https://tranquil-artist-65.authkit.app/sign-up" className="btn-primary compact">Get Started</a>
        <button className="theme-toggle" onClick={onToggleTheme} aria-label="Toggle theme">
          {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
        </button>
      </div>
    </motion.header>
  );
};
