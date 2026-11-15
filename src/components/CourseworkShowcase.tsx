import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2,
  Clock,
  FileText,
  ArrowRight,
  BookOpen,
  Check,
  FileCheck,
  Sparkles
} from 'lucide-react';

type ShowcaseTab = 'feed' | 'studio' | 'rubric';

export const CourseworkShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ShowcaseTab>('studio');

  const handleTabClick = (tab: ShowcaseTab) => {
    setActiveTab(tab);
  };

  return (
    <div className="coursework-showcase-window">
      {/* Top Bar */}
      <div className="showcase-header">
        <div className="showcase-dots" aria-hidden="true">
          <span className="dot dot-red" />
          <span className="dot dot-yellow" />
          <span className="dot dot-green" />
        </div>

        {/* Simple 3-Step Switcher */}
        <div className="showcase-tabs" role="tablist" aria-label="How Lucid works">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'feed'}
            className={`showcase-tab ${activeTab === 'feed' ? 'active' : ''}`}
            onClick={() => handleTabClick('feed')}
          >
            <BookOpen size={14} />
            <span>1. Pick Assignment</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'studio'}
            className={`showcase-tab ${activeTab === 'studio' ? 'active' : ''}`}
            onClick={() => handleTabClick('studio')}
          >
            <Sparkles size={14} />
            <span>2. Lucid Solves It</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'rubric'}
            className={`showcase-tab ${activeTab === 'rubric' ? 'active' : ''}`}
            onClick={() => handleTabClick('rubric')}
          >
            <FileCheck size={14} />
            <span>3. Grade Check</span>
            <span className="tab-pill-badge score">100/100</span>
          </button>
        </div>

        {/* Status Pill */}
        <div className="showcase-status">
          <span className="pulse-dot" />
          <span className="status-label">Canvas Synced</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="showcase-body">
        <AnimatePresence mode="wait">
          {activeTab === 'feed' && (
            <motion.div
              key="feed"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="showcase-panel feed-panel"
            >
              <div className="panel-subhead">
                <div>
                  <h4 className="panel-title">Your Upcoming Assignments</h4>
                  <p className="panel-desc">Automatically pulled from Canvas &amp; Google Classroom</p>
                </div>
                <div className="lms-badges">
                  <span className="lms-tag canvas">Canvas</span>
                  <span className="lms-tag gclassroom">Google Classroom</span>
                </div>
              </div>

              <div className="assignment-cards-list">
                <div className="assignment-card active-item">
                  <div className="assignment-meta">
                    <span className="course-code">PSYCH 101</span>
                    <span className="urgency-badge critical">
                      <Clock size={12} /> Due Tonight · 11:59 PM
                    </span>
                  </div>
                  <h5 className="assignment-name">Sleep &amp; Memory Response Paper</h5>
                  <p className="assignment-snippet">
                    Explain how deep sleep helps form long-term memories. Cite Lecture 6 slides and Textbook Chapter 4 (500 words).
                  </p>
                  <div className="assignment-footer">
                    <div className="attached-files">
                      <FileText size={12} />
                      <span>Lecture_06_Slides.pdf + Rubric attached</span>
                    </div>
                    <button
                      type="button"
                      className="solve-btn-mini"
                      onClick={() => handleTabClick('studio')}
                    >
                      <span>Solve with Lucid</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </div>

                <div className="assignment-card">
                  <div className="assignment-meta">
                    <span className="course-code">BIO 104</span>
                    <span className="urgency-badge high">
                      <Clock size={12} /> Due Tomorrow · 5:00 PM
                    </span>
                  </div>
                  <h5 className="assignment-name">Enzyme Lab Report &amp; Data Table</h5>
                  <p className="assignment-snippet">
                    Summarize how temperature affected reaction speed in Lab 4 and explain the control group results.
                  </p>
                  <div className="assignment-footer">
                    <div className="attached-files">
                      <FileText size={12} />
                      <span>Lab_04_Guide.pdf</span>
                    </div>
                    <span className="queued-tag">Ready to solve</span>
                  </div>
                </div>

                <div className="assignment-card dimmed">
                  <div className="assignment-meta">
                    <span className="course-code">CS 101</span>
                    <span className="urgency-badge normal">Due Friday</span>
                  </div>
                  <h5 className="assignment-name">Python Lists &amp; Loops Worksheet</h5>
                  <p className="assignment-snippet">
                    Write 3 short functions to filter student grades and explain the time complexity of each loop.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'studio' && (
            <motion.div
              key="studio"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="showcase-panel studio-panel"
            >
              <div className="instant-flow-grid">
                {/* LEFT: INPUT (What You Have) */}
                <div className="flow-card input-card">
                  <div className="flow-card-eyebrow">
                    <span className="step-label">1. YOUR ASSIGNMENT</span>
                    <span className="course-code">PSYCH 101</span>
                  </div>

                  <h3 className="flow-title">Sleep &amp; Memory Response Paper</h3>
                  <p className="flow-prompt">
                    “Explain how slow-wave sleep helps form long-term memories. Cite at least two findings from Lecture 6 and Textbook Ch. 4.”
                  </p>

                  <div className="flow-files-block">
                    <span className="files-heading">Class files Lucid read for you</span>
                    <ul className="flow-file-list">
                      <li>
                        <Check size={13} />
                        <span>Assignment_Prompt.pdf</span>
                      </li>
                      <li>
                        <Check size={13} />
                        <span>Lecture_06_Slides.pdf</span>
                      </li>
                      <li>
                        <Check size={13} />
                        <span>Grading_Rubric.pdf</span>
                      </li>
                    </ul>
                  </div>

                  <div className="flow-input-footer">
                    <Clock size={13} />
                    <span>Pulled from Canvas · Due Tonight</span>
                  </div>
                </div>

                {/* CENTER: VISUAL BRIDGE */}
                <div className="flow-bridge" aria-hidden="true">
                  <div className="bridge-pill">
                    <ArrowRight size={16} />
                    <span>14 sec</span>
                  </div>
                </div>

                {/* RIGHT: OUTPUT (What Lucid Writes) */}
                <div className="flow-card output-card">
                  <div className="flow-card-eyebrow">
                    <span className="step-label accent">2. READY TO SUBMIT</span>
                    <span className="output-grade-pill" onClick={() => handleTabClick('rubric')}>
                      <CheckCircle2 size={13} />
                      <span>100 / 100 Rubric Match</span>
                    </span>
                  </div>

                  <div className="output-paper">
                    <h4 className="output-paper-title">How Deep Sleep Locks In Memory</h4>
                    <p className="output-paper-p">
                      During slow-wave sleep, the brain replays new information from the hippocampus to the neocortex for long-term storage (<span className="inline-cite">Lecture 6, Slide 11</span>).
                    </p>
                    <p className="output-paper-p">
                      Research confirms that students deprived of deep sleep retain 40% fewer facts the next day (<span className="inline-cite">Textbook Ch. 4, p. 118</span>), showing that rest is essential for memory consolidation.
                    </p>
                  </div>

                  <div className="flow-output-footer">
                    <div className="quick-checks">
                      <span><Check size={12} /> Prompt answered</span>
                      <span><Check size={12} /> Class slides cited</span>
                      <span><Check size={12} /> 512 words</span>
                    </div>
                    <button
                      type="button"
                      className="view-rubric-link"
                      onClick={() => handleTabClick('rubric')}
                    >
                      See Grade Check →
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'rubric' && (
            <motion.div
              key="rubric"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="showcase-panel rubric-panel"
            >
              <div className="panel-subhead">
                <div>
                  <h4 className="panel-title">Checked Against Your Professor’s Rubric</h4>
                  <p className="panel-desc">Every requirement verified before you turn it in</p>
                </div>
                <div className="rubric-score-badge">
                  <span className="score-num">100 / 100</span>
                  <span className="score-label">Ready to Submit</span>
                </div>
              </div>

              <div className="rubric-checklist">
                <div className="rubric-item verified">
                  <div className="rubric-item-header">
                    <div className="item-title-row">
                      <CheckCircle2 size={16} className="check-icon" />
                      <span className="criteria-name">Explains slow-wave sleep &amp; memory consolidation</span>
                    </div>
                    <span className="criteria-points">40 / 40 pts</span>
                  </div>
                  <p className="criteria-feedback">
                    Clearly covers hippocampal replay to the neocortex and why deep sleep stabilizes new memories.
                  </p>
                </div>

                <div className="rubric-item verified">
                  <div className="rubric-item-header">
                    <div className="item-title-row">
                      <CheckCircle2 size={16} className="check-icon" />
                      <span className="criteria-name">Cites Lecture 6 &amp; Textbook Ch. 4</span>
                    </div>
                    <span className="criteria-points">30 / 30 pts</span>
                  </div>
                  <p className="criteria-feedback">
                    Includes exact page and slide references matching your uploaded course materials.
                  </p>
                </div>

                <div className="rubric-item verified">
                  <div className="rubric-item-header">
                    <div className="item-title-row">
                      <CheckCircle2 size={16} className="check-icon" />
                      <span className="criteria-name">Meets 500-word length &amp; academic tone</span>
                    </div>
                    <span className="criteria-points">30 / 30 pts</span>
                  </div>
                  <p className="criteria-feedback">
                    512 words total, cleanly structured with zero spelling, grammar, or citation formatting errors.
                  </p>
                </div>
              </div>

              <div className="rubric-export-bar">
                <span className="export-hint">Verified and ready to export to Word, PDF, or Canvas.</span>
                <a href="https://app.lucid-ai.co" className="export-btn">
                  <span>Try on Your Assignment</span>
                  <ArrowRight size={14} />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
