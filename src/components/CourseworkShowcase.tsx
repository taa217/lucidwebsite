import React, { useState, useEffect } from 'react';
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
  Layers,
  GraduationCap
} from 'lucide-react';

type ShowcaseTab = 'feed' | 'studio' | 'rubric';

export const CourseworkShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ShowcaseTab>('studio');
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);

  // Auto-cycle through tabs if user hasn't manually interacted
  useEffect(() => {
    if (!isAutoPlaying) return;
    const tabs: ShowcaseTab[] = ['feed', 'studio', 'rubric'];
    const timer = setInterval(() => {
      setActiveTab((current) => {
        const nextIndex = (tabs.indexOf(current) + 1) % tabs.length;
        return tabs[nextIndex];
      });
    }, 8000);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const handleTabClick = (tab: ShowcaseTab) => {
    setIsAutoPlaying(false);
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
        <div className="showcase-tabs">
          <button
            type="button"
            className={`showcase-tab ${activeTab === 'feed' ? 'active' : ''}`}
            onClick={() => handleTabClick('feed')}
          >
            <BookOpen size={14} />
            <span>1. Canvas Task Queue</span>
            <span className="tab-pill-badge">3 Due</span>
          </button>

          <button
            type="button"
            className={`showcase-tab ${activeTab === 'studio' ? 'active' : ''}`}
            onClick={() => handleTabClick('studio')}
          >
            <Cpu size={14} />
            <span>2. CoPilot Solver Studio</span>
            <span className="tab-pill-badge active-live">Live</span>
          </button>

          <button
            type="button"
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
                  <h5 className="assignment-name">Macroeconomic Equilibrium & Fiscal Multipliers</h5>
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
                      <span>Auto-Solve with Lucid</span>
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
                  <span className="course-badge">ECON 201 • Assignment #4</span>
                  <span className="model-chip">
                    <Sparkles size={12} /> Claude 3.5 Sonnet
                  </span>
                  <span className="strategy-chip">
                    <Layers size={12} /> Strategy: Stepwise & Rigorous
                  </span>
                </div>
                <div className="studio-audit-pill" onClick={() => handleTabClick('rubric')}>
                  <CheckCircle2 size={13} className="check-green" />
                  <span>Rubric Matched (100%)</span>
                </div>
              </div>

              <div className="studio-workspace">
                {/* Document Canvas Content */}
                <div className="workspace-document">
                  <div className="doc-header">
                    <h3 className="doc-title">Problem Set 4: Mathematical Equilibrium & Shift Analysis</h3>
                    <div className="doc-meta-tags">
                      <span>Author: Student Submission</span>
                      <span>Format: Academic Markdown + Equations</span>
                      <span>References: Lecture Slides 8 & Textbook Ch. 12</span>
                    </div>
                  </div>

                  <div className="doc-body-content">
                    <div className="solution-section">
                      <h4 className="section-heading">1. General Equilibrium Formulation</h4>
                      <p className="doc-p">
                        From the goods market equilibrium condition, aggregate demand must equal total output <code className="math-code">Y</code>:
                      </p>
                      <div className="math-block">
                        <code>Y = C(Y - T) + I(r) + G &nbsp; where &nbsp; MPC = 0.75</code>
                      </div>
                      <p className="doc-p">
                        Substituting the consumption function into aggregate output yields the fiscal multiplier equation:
                      </p>
                      <div className="math-block">
                        <code>ΔY / ΔG = 1 / (1 - MPC) = 1 / (1 - 0.75) = 4.0</code>
                      </div>
                    </div>

                    <div className="solution-section">
                      <h4 className="section-heading">2. Comparative Statics & Monetary Response</h4>
                      <p className="doc-p">
                        When the central bank expands the real money supply by <code className="math-code">Δ(M/P) = +$50B</code>, the LM curve shifts downward and to the right. As derived in Professor Chen’s slide 14, the interest rate drops from <code className="math-code">r₀ = 4.5%</code> to <code className="math-code">r₁ = 3.2%</code>, stimulating investment demand by <code className="math-code">+$80B</code>.
                      </p>
                    </div>

                    <div className="solution-callout">
                      <div className="callout-badge">
                        <Check size={12} /> Rubric Criterion #3 Satisfied
                      </div>
                      <span>Every step verified with professor's exact parameter definitions and units.</span>
                    </div>
                  </div>
                </div>

                {/* Studio Live Sidebar */}
                <div className="studio-sidebar-insights">
                  <div className="insight-card">
                    <div className="insight-title">
                      <GraduationCap size={14} />
                      <span>Course Readings Ingested</span>
                    </div>
                    <ul className="reading-list">
                      <li>✓ Syllabus Section 4.2 (Rubric rules)</li>
                      <li>✓ Lecture_08_ISLM.pdf (32 pages)</li>
                      <li>✓ Mankiw_Macroeconomics_Ch12.pdf</li>
                    </ul>
                  </div>

                  <div className="insight-card highlight">
                    <div className="insight-title">
                      <ShieldCheck size={14} />
                      <span>Academic Quality Audit</span>
                    </div>
                    <div className="audit-metrics">
                      <div className="metric-item">
                        <span className="metric-num">0%</span>
                        <span className="metric-lbl">Plagiarism</span>
                      </div>
                      <div className="metric-item">
                        <span className="metric-num">100%</span>
                        <span className="metric-lbl">Rubric Match</span>
                      </div>
                    </div>
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

