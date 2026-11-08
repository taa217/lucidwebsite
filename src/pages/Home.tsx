import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Zap,
  ArrowRight,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Layers,
  ShieldCheck,
  BookOpen,
  FileText,
  Sparkles,
  ChevronDown,
  Check,
  X,
  GraduationCap,
  Star,
  Lock,
  Cpu
} from 'lucide-react';
import { CourseworkShowcase } from '../components/CourseworkShowcase';

const HeroBackground = () => (
  <div className="hero-bg-container">
    <svg viewBox="0 0 1440 1600" preserveAspectRatio="xMidYMin slice" className="hero-svg-bg">
      <defs>
        <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="650" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="var(--sky-top, #0a1930)" />
          <stop offset="60%" stopColor="var(--sky-mid, #112d5e)" />
          <stop offset="100%" stopColor="var(--sky-bottom, #00f6bb)" />
        </linearGradient>
        <linearGradient id="mountainGrad1" x1="0" y1="100" x2="0" y2="650" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="var(--mountain-top, #0d2247)" />
          <stop offset="100%" stopColor="var(--mountain-bottom, #050d1c)" />
        </linearGradient>
        <linearGradient id="mountainGrad2" x1="0" y1="250" x2="0" y2="650" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="var(--mountain-front-top, #05112b)" />
          <stop offset="100%" stopColor="var(--mountain-front-bottom, #020613)" />
        </linearGradient>
        <linearGradient id="streamGrad1" x1="0" y1="300" x2="0" y2="1400" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.8" />
          <stop offset="50%" stopColor="var(--primary)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="30" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect width="1440" height="1600" fill="url(#skyGrad)" opacity="0.85" />
      <circle cx="1100" cy="400" r="140" fill="var(--primary)" filter="url(#glow)" opacity="0.35" />
      <circle cx="1100" cy="400" r="80" fill="#fff" filter="url(#glow)" opacity="0.85" />
      <path d="M0 350 L250 200 L500 330 L800 100 L1150 350 L1440 200 L1440 1600 L0 1600 Z" fill="url(#mountainGrad1)" opacity="0.85" />
      <path d="M0 500 L350 300 L700 500 L1050 250 L1440 450 L1440 1600 L0 1600 Z" fill="url(#mountainGrad2)" />
      <path d="M350 300 Q 250 600 400 900 T 200 1400" fill="none" stroke="url(#streamGrad1)" strokeWidth="3" opacity="0.6" />
    </svg>
    <div className="hero-bg-overlay" />
  </div>
);

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: "How does Lucid make sure the solved coursework matches my professor's rubric?",
    answer:
      "When you connect Canvas, Google Classroom, or upload your assignment, Lucid ingests the exact grading criteria and rubric tables. Before producing your final solution, our automated Rubric Audit Engine evaluates each requirement point-by-point, verifying that every required derivation, source citation, and formatting parameter is completely satisfied."
  },
  {
    question: "Can I use Lucid if my classes don't use Canvas or Google Classroom?",
    answer:
      "Absolutely. While Lucid seamlessly connects to Canvas and Google Classroom in 1-click, you can also manually drag-and-drop any assignment prompt, syllabus PDF, lecture slides, or rubric file. Lucid will parse them instantly and generate the solution."
  },
  {
    question: "Is my coursework private and confidential?",
    answer:
      "Yes, 100%. Your assignments, documents, and student profile are strictly confidential and encrypted at rest and in transit. Your work is never used to train public models or shared with third parties."
  },
  {
    question: "What types of coursework can Lucid solve?",
    answer:
      "Lucid handles STEM problem sets (calculus, physics, chemistry, engineering), programming assignments (Python, Java, C++, algorithms), long-form essays, case studies, lab reports, and weekly discussion board posts across 100+ disciplines."
  },
  {
    question: "Can I choose how detailed or stepwise the answers are?",
    answer:
      "Yes! You can toggle between 4 dedicated solver strategies: Stepwise (shows all intermediate work), Rigorous (deep academic proofs & theoretical context), Concise (direct answers and formulas), or Collaborative (interactive co-pilot)."
  }
];

export const Home = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="page-content"
    >
      {/* ──────────────────────────────────────────────────
          SECTION 1: THE HERO (Passes Donald Miller's Grunt Test)
          ────────────────────────────────────────────────── */}
      <div className="hero-and-demo-container">
        <HeroBackground />

        <section className="hero-impressive cluely-style-hero">
          <div className="hero-content-wrapper">
            {/* Eyebrow Pill */}
            <motion.div
              className="hero-badge-pill"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <Sparkles size={14} className="accent-sparkle" />
              <span>The AI Coursework & Assignment Solver</span>
              <span className="pill-divider">•</span>
              <span className="pill-highlight">Canvas & Classroom Synced</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              className="mega-headline cluely-headline"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Your Coursework & Assignments. <br />
              <span className="headline-gradient">Done in Minutes.</span>
            </motion.h1>

            {/* Subheadline (StoryBrand Guide Positioning) */}
            <motion.p
              className="hero-sub cluely-sub"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Lucid connects directly to Canvas and Google Classroom, analyzes your course
              materials, and writes complete, verified solutions tailored to your professor’s exact
              grading rubric.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="hero-ctas cluely-ctas"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <a
                href="https://app.lucid-ai.co"
                className="btn-glow cluely-main-btn"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  textDecoration: 'none',
                  borderRadius: '50px'
                }}
              >
                <Zap size={20} fill="currentColor" />
                <span>Start Solving Free</span>
                <ArrowRight size={18} />
              </a>

              <a href="#how-it-works" className="btn-secondary-hero">
                <span>See How It Works</span>
              </a>
            </motion.div>

            {/* Micro Trust Stats */}
            <motion.div
              className="hero-social-proof"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div className="proof-item">
                <CheckCircle2 size={15} className="proof-icon" />
                <span>4,200+ Assignments Solved this Week</span>
              </div>
              <div className="proof-dot">•</div>
              <div className="proof-item">
                <ShieldCheck size={15} className="proof-icon" />
                <span>100% Confidential & Secure</span>
              </div>
              <div className="proof-dot">•</div>
              <div className="proof-item">
                <Star size={15} className="proof-icon" />
                <span>99.4% Rubric Alignment</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Live Showcase Overlap Window */}
        <section className="demo-showcase cluely-showcase">
          <div className="glass-frame active">
            <CourseworkShowcase />
            <div className="glow-effect" />
          </div>
        </section>
      </div>

      {/* ──────────────────────────────────────────────────
          SECTION 2: THE PROBLEM / THE STAKES (Agitate the Pain)
          ────────────────────────────────────────────────── */}
      <section className="storybrand-section problem-section" id="problem">
        <div className="section-container">
          <div className="section-header-pill">
            <AlertTriangle size={14} />
            <span>THE REALITY OF COLLEGE</span>
          </div>

          <h2 className="section-main-heading">
            College shouldn’t feel like an endless <br />
            <span className="text-highlight-danger">11:59 PM panic attack.</span>
          </h2>
          <p className="section-description">
            You enrolled to master your field and build your future—not to sacrifice your health,
            sleep, and weekends formatting bibliographies and solving repetitive busywork.
          </p>

          <div className="problem-cards-grid">
            <div className="problem-card">
              <div className="problem-icon-wrapper danger">
                <Clock size={24} />
              </div>
              <h3>The 11:59 PM Sunday Panic</h3>
              <p>
                Staring at a blank document with the Canvas countdown ticking away. Juggling 4
                different course deadlines at once with zero time to sleep or recharge.
              </p>
            </div>

            <div className="problem-card">
              <div className="problem-icon-wrapper warning">
                <FileText size={24} />
              </div>
              <h3>Cryptic Rubrics & 50-Page Syllabi</h3>
              <p>
                Strict professors docking full letter grades over hidden formatting requirements,
                unclear guidelines, and obscure citation styles buried deep in course PDFs.
              </p>
            </div>

            <div className="problem-card">
              <div className="problem-icon-wrapper muted">
                <BookOpen size={24} />
              </div>
              <h3>Endless Repetitive Busywork</h3>
              <p>
                Spending 30+ hours every week on low-value assignments that test your patience
                rather than your actual intelligence or career skills.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────
          SECTION 3: THE 3-STEP PLAN (Simple Process Plan)
          ────────────────────────────────────────────────── */}
      <section className="storybrand-section how-it-works-section" id="how-it-works">
        <div className="section-container">
          <div className="section-header-pill">
            <Sparkles size={14} />
            <span>THE 3-STEP PLAN</span>
          </div>

          <h2 className="section-main-heading">
            From assignment prompt to ready-to-submit <br />
            in 3 simple steps.
          </h2>
          <p className="section-description">
            No complicated workflows. Lucid seamlessly connects to your coursework and does the
            heavy lifting for you.
          </p>

          <div className="steps-container">
            {/* Step 1 */}
            <div className="step-card">
              <div className="step-number-badge">01</div>
              <div className="step-content">
                <div className="step-icon-box">
                  <BookOpen size={22} />
                </div>
                <h3>1-Click Classroom Sync</h3>
                <p>
                  Connect your Google Classroom or Canvas in one click, or drag-and-drop any
                  homework prompt. Lucid automatically pulls in upcoming tasks, due dates, instructor
                  guidelines, and lecture attachments.
                </p>
                <div className="step-tag-pill">Canvas • Google Classroom • PDF Upload</div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="step-card active-step">
              <div className="step-number-badge">02</div>
              <div className="step-content">
                <div className="step-icon-box">
                  <Cpu size={22} />
                </div>
                <h3>Auto-Solve with Rubric Audit</h3>
                <p>
                  Lucid’s frontier reasoning models digest your lecture materials and solve each
                  problem step-by-step. Our Rubric Audit Engine checks off every single grading
                  criterion before you ever see the draft.
                </p>
                <div className="step-tag-pill active">Stepwise Proofs • 100% Rubric Match</div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="step-card">
              <div className="step-number-badge">03</div>
              <div className="step-content">
                <div className="step-icon-box">
                  <CheckCircle2 size={22} />
                </div>
                <h3>Review, Export & Submit</h3>
                <p>
                  Inspect the polished solution in your interactive document canvas. Download as
                  formatted Word, PDF, or Markdown with equations and citations ready to turn in
                  ahead of the deadline.
                </p>
                <div className="step-tag-pill">Word • PDF • Markdown • Citations</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────
          SECTION 4: FEATURES BENTO GRID (The Guide's Authority)
          ────────────────────────────────────────────────── */}
      <section className="storybrand-section features-section" id="features">
        <div className="section-container">
          <div className="section-header-pill">
            <Zap size={14} />
            <span>BUILT FOR SERIOUS COURSEWORK</span>
          </div>

          <h2 className="section-main-heading">
            Engineered to handle real syllabi, <br />
            not just generic chat prompts.
          </h2>
          <p className="section-description">
            Generic chatbots hallucinate and miss crucial grading rules. Lucid was built from the
            ground up specifically for university and college assignments.
          </p>

          <div className="bento-grid-modern">
            {/* Feature 1: Large Bento */}
            <div className="bento-cell large-cell">
              <div className="bento-cell-header">
                <span className="bento-icon-pill">
                  <BookOpen size={18} />
                </span>
                <span className="bento-subtag">Direct LMS Integration</span>
              </div>
              <h3>Automatic Sync with Canvas & Google Classroom</h3>
              <p>
                Never copy-paste an assignment prompt again. Lucid syncs your full course schedule,
                attached lecture slides, syllabus PDFs, and discussion threads in real-time.
              </p>
              <div className="lms-logos-row">
                <span className="lms-chip">Canvas LMS</span>
                <span className="lms-chip">Google Classroom</span>
                <span className="lms-chip">PDF & Doc Upload</span>
              </div>
            </div>

            {/* Feature 2: Rubric Audit */}
            <div className="bento-cell">
              <div className="bento-cell-header">
                <span className="bento-icon-pill">
                  <ShieldCheck size={18} />
                </span>
                <span className="bento-subtag">Grade Insurance</span>
              </div>
              <h3>Automated Rubric Audit</h3>
              <p>
                Scans generated solutions against your syllabus rubric to verify all equations,
                sources, and criteria are satisfied before submission.
              </p>
            </div>

            {/* Feature 3: Solver Strategies */}
            <div className="bento-cell">
              <div className="bento-cell-header">
                <span className="bento-icon-pill">
                  <Layers size={18} />
                </span>
                <span className="bento-subtag">Custom Depth</span>
              </div>
              <h3>4 Solver Strategies</h3>
              <p>
                Toggle between <strong>Stepwise</strong> (full work shown), <strong>Rigorous</strong> (deep academic proofs), <strong>Concise</strong>, or <strong>Collaborative</strong> modes.
              </p>
            </div>

            {/* Feature 4: Grounded in Course Material */}
            <div className="bento-cell">
              <div className="bento-cell-header">
                <span className="bento-icon-pill">
                  <FileText size={18} />
                </span>
                <span className="bento-subtag">Zero Hallucinations</span>
              </div>
              <h3>Grounded in Your Course Materials</h3>
              <p>
                Lucid reads your professor's specific lecture slides, chapter readings, and lab
                manuals—citing the exact formulas and notation taught in your class.
              </p>
            </div>

            {/* Feature 5: Multi-Model Intelligence */}
            <div className="bento-cell">
              <div className="bento-cell-header">
                <span className="bento-icon-pill">
                  <Sparkles size={18} />
                </span>
                <span className="bento-subtag">Frontier AI</span>
              </div>
              <h3>Powered by Claude 3.5 & GPT-4o</h3>
              <p>
                Select the premier model for each subject: Claude 3.5 Sonnet for writing and analysis,
                GPT-4o for math, and DeepSeek for advanced code.
              </p>
            </div>

            {/* Feature 6: Privacy */}
            <div className="bento-cell">
              <div className="bento-cell-header">
                <span className="bento-icon-pill">
                  <Lock size={18} />
                </span>
                <span className="bento-subtag">Total Security</span>
              </div>
              <h3>100% Confidential & Plagiarism Safe</h3>
              <p>
                Your coursework is private, encrypted, and never used to train public AI models.
                Original solutions constructed from first principles.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────
          SECTION 5: THE TRANSFORMATION (Before vs After)
          ────────────────────────────────────────────────── */}
      <section className="storybrand-section transformation-section" id="comparison">
        <div className="section-container">
          <div className="section-header-pill">
            <GraduationCap size={14} />
            <span>THE TRANSFORMATION</span>
          </div>

          <h2 className="section-main-heading">
            Reclaim 15+ hours every single week.
          </h2>
          <p className="section-description">
            Here is what happens when you switch from the old manual grind to Lucid.
          </p>

          <div className="comparison-cards-grid">
            {/* The Old Way */}
            <div className="comparison-card old-way">
              <div className="comparison-header">
                <span className="badge-comparison danger">Without Lucid</span>
                <h3>The 11:59 PM Grind</h3>
              </div>
              <ul className="comparison-list">
                <li>
                  <X size={16} className="x-icon" />
                  <span>Spending 25–35 hours a week grinding repetitive homework</span>
                </li>
                <li>
                  <X size={16} className="x-icon" />
                  <span>Staring at Canvas at 1:00 AM with 3 unfinished tasks</span>
                </li>
                <li>
                  <X size={16} className="x-icon" />
                  <span>Losing points over obscure rubric rules buried in syllabus PDFs</span>
                </li>
                <li>
                  <X size={16} className="x-icon" />
                  <span>Chronic sleep deprivation, missing out on social life and fitness</span>
                </li>
                <li>
                  <X size={16} className="x-icon" />
                  <span>Constant anxiety and imposter syndrome</span>
                </li>
              </ul>
            </div>

            {/* The Lucid Way */}
            <div className="comparison-card lucid-way">
              <div className="comparison-header">
                <span className="badge-comparison success">With Lucid</span>
                <h3>Academic Peace of Mind</h3>
              </div>
              <ul className="comparison-list">
                <li>
                  <Check size={16} className="check-icon" />
                  <span>Assignments completed accurately in minutes, not hours</span>
                </li>
                <li>
                  <Check size={16} className="check-icon" />
                  <span>1-click sync with Canvas & Google Classroom tasks</span>
                </li>
                <li>
                  <Check size={16} className="check-icon" />
                  <span>100% Rubric Audit verification ensures maximum points</span>
                </li>
                <li>
                  <Check size={16} className="check-icon" />
                  <span>8 hours of sleep every night and totally free weekends</span>
                </li>
                <li>
                  <Check size={16} className="check-icon" />
                  <span>High GPA with zero burnout and total confidence</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────
          SECTION 6: STUDENT TESTIMONIALS (Social Proof)
          ────────────────────────────────────────────────── */}
      <section className="storybrand-section testimonials-section">
        <div className="section-container">
          <div className="section-header-pill">
            <Star size={14} />
            <span>STUDENT REVIEWS</span>
          </div>

          <h2 className="section-main-heading">
            Loved by students at top universities.
          </h2>

          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} fill="#00F6BB" color="#00F6BB" />
                ))}
              </div>
              <p className="testimonial-quote">
                "Lucid cut my weekly problem set time from 20 hours to about 3 hours. The Rubric
                Audit caught two missing derivations my professor definitely would have docked me
                for."
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">SM</div>
                <div>
                  <strong>Sarah M.</strong>
                  <span>Mechanical Engineering, Junior</span>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} fill="#00F6BB" color="#00F6BB" />
                ))}
              </div>
              <p className="testimonial-quote">
                "It literally connects right into Canvas. I click 'Auto-Solve' on my economics problem
                sets and it cites the exact slides from lecture. I haven't stressed about an 11:59 PM
                deadline in months."
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">AK</div>
                <div>
                  <strong>Alex K.</strong>
                  <span>Economics & Finance, Senior</span>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} fill="#00F6BB" color="#00F6BB" />
                ))}
              </div>
              <p className="testimonial-quote">
                "I used to pull Sunday all-nighters every single week. Now my entire week’s coursework
                is ready to submit by Friday afternoon. Worth every single penny."
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">JT</div>
                <div>
                  <strong>Jordan T.</strong>
                  <span>Pre-Med / Biology, Sophomore</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────
          SECTION 7: FAQ ACCORDION (Overcoming Objections)
          ────────────────────────────────────────────────── */}
      <section className="storybrand-section faq-section" id="faq">
        <div className="section-container">
          <div className="section-header-pill">
            <BookOpen size={14} />
            <span>FREQUENTLY ASKED QUESTIONS</span>
          </div>

          <h2 className="section-main-heading">
            Got questions? We've got answers.
          </h2>

          <div className="faq-accordion">
            {FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className={`faq-item ${isOpen ? 'open' : ''}`}
                  onClick={() => toggleFaq(index)}
                >
                  <div className="faq-question">
                    <span>{faq.question}</span>
                    <ChevronDown size={18} className={`faq-arrow ${isOpen ? 'rotated' : ''}`} />
                  </div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="faq-answer"
                      >
                        <p>{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────
          SECTION 8: FINAL CTA BANNER (Direct Close)
          ────────────────────────────────────────────────── */}
      <section className="explore-teaser">
        <div className="cta-content">
          <div className="cta-badge">
            <Zap size={14} fill="currentColor" />
            <span>ZERO STRESS • INSTANT RESULTS</span>
          </div>
          <h2>Stop dreading 11:59 PM. Start finishing your coursework tonight.</h2>
          <p className="cta-sub">
            Join thousands of students who submit on time, boost their GPA, and reclaim their weekends.
          </p>
          <a href="https://app.lucid-ai.co" className="cta-btn">
            <Zap size={20} fill="currentColor" />
            <span>Start Solving Coursework Free</span>
            <ArrowRight size={20} />
          </a>
        </div>
      </section>
    </motion.div>
  );
};
