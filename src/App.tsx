import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Instagram, Twitter, Facebook, Linkedin } from 'lucide-react';
import './App.css';
import { Navbar } from './components/layout/Navbar';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsOfService } from './pages/TermsOfService';

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/terms-and-conditions" element={<TermsOfService />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    // Default to dark theme
    return 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <Router>
      <div className="lucid-site">
        <div className="ambient-light" aria-hidden="true" />
        <div className="grid-overlay" aria-hidden="true" />
        
        <Navbar theme={theme} onToggleTheme={toggleTheme} />
        
        <main className="main-content">
          <AnimatedRoutes />
        </main>

        <footer className="site-footer">
          <div className="footer-grid">
            <div>
              <div className="logo-container small">
                <span>Lucid</span>
              </div>
              <p className="footer-tagline">Personalized, interactive learning for ambitious students.</p>
              <div className="footer-socials">
                <a href="https://instagram.com/lucidai_company" aria-label="Instagram"><Instagram size={18} /></a>
                <a href="https://x.com/lucid_startup" aria-label="Twitter"><Twitter size={18} /></a>
                <a href="https://facebook.com/lucidai.company" aria-label="Facebook"><Facebook size={18} /></a>
                <a href="https://linkedin.com/company/lucidcompany" aria-label="LinkedIn"><Linkedin size={18} /></a>
              </div>
            </div>
            <div>
              <h4>Product</h4>
              <Link to="/">Home</Link>
              <a href="https://app.lucid-ai.co">Get Started</a>
            </div>
            <div>
              <h4>Legal</h4>
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms & Conditions</Link>
            </div>
          </div>
          <p className="footer-bottom">© {new Date().getFullYear()} Lucid AI. Designed for learners everywhere.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
