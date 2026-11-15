import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2,
  Clock,
  FileText,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  BookOpen,
  Check,
  FileCheck,
  Cpu,
  GraduationCap
} from 'lucide-react';

type ShowcaseTab = 'feed' | 'studio' | 'rubric';

export const CourseworkShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ShowcaseTab>('studio');

  const handleTabClick = (tab: ShowcaseTab) => {
    setActiveTab(tab);
  };

  return (
    <div className="coursework-showcase-window">
      {/* Top Application Bar */}
      <div className="showcase-header">
        <div className="showcase-dots">
          <span className="dot dot-red" />
          <span className="dot dot-yellow" />
          <span className="dot dot-green" />
        </div>

        {/* Navigation Tabs */}
        <div className="showcase-tabs" role="tablist" aria-label="Lucid workflow steps">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'feed'}
            className={`showcase-tab ${activeTab === 'feed' ? 'active' : ''}`}
            onClick={() => handleTabClick('feed')}
          >
            <BookOpen size={14} />
            <span>1. Task Queue</span>
            <span className="tab-pill-badge">3</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'studio'}
            className={`showcase-tab ${activeTab === 'studio' ? 'active' : ''}`}
            onClick={() => handleTabClick('studio')}
          >
            <Cpu size={14} />
            <span>2. Solver Studio</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'rubric'}
            className={`showcase-tab ${activeTab === 'rubric' ? 'active' : ''}`}
            onClick={() => handleTabClick('rubric')}
          >
            <FileCheck size={14} />
            <span>3. Rubric Audit</span>
            <span className="tab-pill-badge score">100/100</span>
          </button>
        </div>

        {/* Status Pill */}
        <div className="showcase-status">
          <span className="pulse-dot" />
          <span className="status-label">LMS Synced</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="showcase-body">
        <AnimatePresence mode="wait">
          {activeTab === 'feed' && (
            <motion.div
              key="feed"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="showcase-panel feed-panel"
            >
              <div className="panel-subhead">
                <div>
                  <h4 className="panel-title">Active Coursework Stream</h4>
                  <p className="panel-desc">Directly synchronized with Canvas & Google Classroom</p>
                </div>
                <div className="lms-badges">
                  <span className="lms-tag canvas">Canvas LMS</span>
                  <span className="lms-tag gclassroom">Google Classroom</span>
                </div>
              </div>

              <div className="assignment-cards-list">
                {/* Task 1 */}
                <div className="assignment-card active-item">
                  <div className="assignment-meta">
                    <span className="course-code">ECON 201</span>
                    <span className="urgency-badge critical">
                      <Clock size={12} /> Due Tonight @ 11:59 PM
                    </span>
                  </div>
                  <h5 className="assignment-name">Problem Set 4: Mathematical Equilibrium & Shift Analysis</h5>
                  <p className="assignment-snippet">
                    Derive the IS-LM shifts under an unexpected monetary expansion. Reference Chapter 8 lecture slides and calculate the output gap.
                  </p>
                  <div className="assignment-footer">
                    <div className="attached-files">
                      <FileText size={12} />
                      <span>Lecture_08_Slides.pdf (Attached)</span>
                    </div>
                    <button
                      type="button"
                      className="solve-btn-mini"
                      onClick={() => handleTabClick('studio')}
                    >
                      <span>Open in Solver Studio</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </div>

                {/* Task 2 */}
                <div className="assignment-card">
                  <div className="assignment-meta">
                    <span className="course-code">CHEM 241</span>
                    <span className="urgency-badge high">
                      <Clock size={12} /> Due Tomorrow @ 5:00 PM
                    </span>
                  </div>
                  <h5 className="assignment-name">Aldol Condensation & Retrosynthesis Mechanism</h5>
                  <p className="assignment-snippet">
                    Provide the curved-arrow stereochemical mechanism for compound C4 and outline the purification protocol.
                  </p>
                  <div className="assignment-footer">
                    <div className="attached-files">
                      <FileText size={12} />
                      <span>Lab_Manual_Ex6.docx (Attached)</span>
                    </div>
                    <span className="queued-tag">Queued for Solver</span>
                  </div>
                </div>

                {/* Task 3 */}
                <div className="assignment-card dimmed">
                  <div className="assignment-meta">
                    <span className="course-code">CS 106</span>
                    <span className="urgency-badge normal">Due Friday</span>
                  </div>
                  <h5 className="assignment-name">Dynamic Programming: 0/1 Knapsack Optimization</h5>
                  <p className="assignment-snippet">
                    Write Python recursive solution with memoization table and asymptotic space-time proof.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'studio' && (
            <motion.div
              key="studio"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="showcase-panel studio-panel"
            >
              <div className="studio-top-info">
                <div className="studio-task-header">
                  <span className="course-badge">ECON 201</span>
                  <span className="studio-assignment-ref">Problem Set 4</span>
                </div>
                <div className="studio-meta-right">
                  <span className="model-chip">
                    <Sparkles size={12} /> Claude 3.5 Sonnet · Stepwise
                  </span>
                </div>
              </div>

              <div className="studio-workspace">
                {/* Document Canvas Content */}
                <div className="workspace-document">
                  <div className="doc-header">
                    <h3 className="doc-title">Mathematical Equilibrium & Shift Analysis</h3>
                    <p className="doc-subtitle">
                      Grounded in Professor Chen’s Lecture 8 (Slide 14) &amp; Mankiw Ch. 12
                    </p>
                  </div>

                  <div className="doc-body-content">
                    <div className="solution-section">
                      <h4 className="section-heading">1. General Equilibrium Formulation</h4>
                      <p className="doc-p">
                        From the goods market equilibrium condition, aggregate demand must equal total output <span className="math-inline">Y</span>:
                      </p>
                      <div className="math-block">
                        <span className="math-expr">Y = C(Y − T) + I(r) + G</span>
                        <span className="math-note">MPC = 0.75</span>
                      </div>
                      <p className="doc-p">
                        Substituting the consumption function into aggregate output yields the fiscal multiplier:
                      </p>
                      <div className="math-block">
                        <span className="math-expr">ΔY / ΔG = 1 / (1 − MPC) = 1 / (1 − 0.75) = 4.0</span>
                      </div>
                    </div>

                    <div className="solution-section">
                      <h4 className="section-heading">2. Comparative Statics &amp; Monetary Response</h4>
                      <p className="doc-p">
                        When the central bank expands the real money supply by <span className="math-inline">Δ(M/P) = +$50B</span>, the LM curve shifts downward and to the right. Per Lecture 8 (Slide 14), the interest rate falls from <span className="math-inline">r₀ = 4.5%</span> to <span className="math-inline">r₁ = 3.2%</span>, stimulating investment demand by <span className="math-inline">+$80B</span>.
                      </p>
                    </div>

                    <div className="solution-callout">
                      <Check size={13} className="callout-icon" />
                      <span>Criterion #3 verified — parameters, signs, and units match course rubric.</span>
                    </div>
                  </div>
                </div>

                {/* Studio Live Sidebar */}
                <div className="studio-sidebar-insights">
                  <div className="insight-card">
                    <div className="insight-title">
                      <GraduationCap size={14} />
                      <span>Course Readings Grounded</span>
                    </div>
                    <ul className="reading-list">
                      <li>
                        <span className="reading-name">Syllabus Sec. 4.2</span>
                        <span className="reading-tag">Rubric</span>
                      </li>
                      <li>
                        <span className="reading-name">Lecture 08: IS–LM</span>
                        <span className="reading-tag">32 pp</span>
                      </li>
                      <li>
                        <span className="reading-name">Mankiw Ch. 12</span>
                        <span className="reading-tag">Text</span>
                      </li>
                    </ul>
                  </div>

                  <div className="insight-card highlight">
                    <div className="insight-title">
                      <ShieldCheck size={14} />
                      <span>Academic Quality Audit</span>
                    </div>
                    <div className="audit-metrics">
                      <div className="metric-item">
                        <span className="metric-num">100%</span>
                        <span className="metric-lbl">Original</span>
                      </div>
                      <div className="metric-item">
                        <span className="metric-num">100%</span>
                        <span className="metric-lbl">Rubric Match</span>
                      </div>
                    </div>
                    <ul className="audit-mini-checks">
                      <li><Check size={12} /> Full IS–LM derivation</li>
                      <li><Check size={12} /> Slide 14 &amp; Ch. 12 cited</li>
                      <li><Check size={12} /> Units &amp; signs verified</li>
                    </ul>
                    <button
                      type="button"
                      className="audit-inspect-btn"
                      onClick={() => handleTabClick('rubric')}
                    >
                      View Rubric Breakdown →
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'rubric' && (
            <motion.div
              key="rubric"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="showcase-panel rubric-panel"
            >
              <div className="panel-subhead">
                <div>
                  <h4 className="panel-title">Automated Rubric Audit</h4>
                  <p className="panel-desc">Scans assignment output against your syllabus criteria before you submit</p>
                </div>
                <div className="rubric-score-badge">
                  <span className="score-num">100 / 100</span>
                  <span className="score-label">Full Grade Guaranteed</span>
                </div>
              </div>

              <div className="rubric-checklist">
                <div className="rubric-item verified">
                  <div className="rubric-item-header">
                    <div className="item-title-row">
                      <CheckCircle2 size={16} className="check-icon" />
                      <span className="criteria-name">Criterion 1: Theoretical Foundation & Math Derivation</span>
                    </div>
                    <span className="criteria-points">30 / 30 pts</span>
                  </div>
                  <p className="criteria-feedback">
                    Full mathematical proof of the IS-LM goods market equilibrium is explicitly derived. Equations are properly numbered and formatted.
                  </p>
                </div>

                <div className="rubric-item verified">
                  <div className="rubric-item-header">
                    <div className="item-title-row">
                      <CheckCircle2 size={16} className="check-icon" />
                      <span className="criteria-name">Criterion 2: Course Material Citations</span>
                    </div>
                    <span className="criteria-points">25 / 25 pts</span>
                  </div>
                  <p className="criteria-feedback">
                    Accurately cites Professor Chen’s Lecture 8 slides (Slide 14 & 18) and Chapter 12 textbook examples with page references.
                  </p>
                </div>

                <div className="rubric-item verified">
                  <div className="rubric-item-header">
                    <div className="item-title-row">
                      <CheckCircle2 size={16} className="check-icon" />
                      <span className="criteria-name">Criterion 3: Comparative Static Analysis</span>
                    </div>
                    <span className="criteria-points">25 / 25 pts</span>
                  </div>
                  <p className="criteria-feedback">
                    Correctly evaluates the magnitude of the monetary shock on investment demand ($80B shift) with all units included.
                  </p>
                </div>

                <div className="rubric-item verified">
                  <div className="rubric-item-header">
                    <div className="item-title-row">
                      <CheckCircle2 size={16} className="check-icon" />
                      <span className="criteria-name">Criterion 4: Academic Writing & Format</span>
                    </div>
                    <span className="criteria-points">20 / 20 pts</span>
                  </div>
                  <p className="criteria-feedback">
                    Clear section headers, professional tone, zero spelling or syntax errors, conforming to standard departmental guidelines.
                  </p>
                </div>
              </div>

              <div className="rubric-export-bar">
                <span className="export-hint">Assignment is verified and ready for turn-in.</span>
                <a
                  href="https://app.lucid-ai.co"
                  className="export-btn"
                >
                  <ArrowRight size={14} />
                  <span>Open in Lucid & Turn In</span>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

