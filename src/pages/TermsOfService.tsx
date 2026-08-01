import React, { useEffect } from 'react';

export const TermsOfService: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="policy-page">
      <div className="policy-container">
        
        {/* Header */}
        <header className="policy-header">
          <div className="policy-date">Updated: August 1, 2026</div>
          <h1 className="policy-title">Terms of service</h1>
        </header>

        {/* Content Layout */}
        <div className="policy-layout">
          
          {/* Left TOC Navigation */}
          <aside className="policy-toc">
            <nav className="policy-toc-nav">
              <a href="#term-1">1. Registration & Access</a>
              <a href="#term-2">2. Usage Requirements</a>
              <a href="#term-3">3. Content & Deliverables</a>
              <a href="#term-4">4. Subscriptions & Billing</a>
              <a href="#term-5">5. Google Integrations</a>
              <a href="#term-6">6. Intellectual Property</a>
              <a href="#term-7">7. Disclaimers</a>
              <a href="#term-8">8. Limitation of Liability</a>
              <a href="#term-9">9. Termination</a>
              <a href="#term-10">10. General Terms</a>
            </nav>
          </aside>

          {/* Main Article Prose */}
          <article className="policy-article">
            
            <p className="policy-lead">
              Thank you for using Lucid AI. These Terms of Service ("Terms") govern your access to and use of our website, web applications, APIs, study tools, and integrations (collectively, "Services"). By creating an account or accessing our Services, you agree to be bound by these Terms and our Privacy Policy.
            </p>

            <section id="term-1" className="policy-section">
              <h2>1. Registration & Access</h2>
              <p>
                You must be at least 13 years old (or the minimum age required in your country) to use the Services. If you are under 18 years old, you must have your parent or legal guardian's permission to use the Services.
              </p>
              <p>
                When creating an account, you must provide accurate and complete information. You are responsible for maintaining the confidentiality of your login credentials and for all activities occurring under your account.
              </p>
            </section>

            <section id="term-2" className="policy-section">
              <h2>2. Usage Requirements & Academic Integrity</h2>
              <p>
                Lucid AI provides interactive, AI-assisted study tools designed to aid comprehension, document summarization, voice learning, and coursework organization.
              </p>
              
              <h3>Academic Integrity</h3>
              <p>
                You agree to use Lucid AI responsibly as an educational supplement. You remain solely responsible for understanding and adhering to your educational institution's academic honor codes, integrity policies, and rules regarding assignment submissions.
              </p>

              <h3>Prohibited Conduct</h3>
              <p>You may not access or use the Services to:</p>
              <ul>
                <li>Engage in illegal, fraudulent, harmful, or abusive activities;</li>
                <li>Decompile, reverse engineer, or attempt to derive the source code or underlying algorithms of the Services;</li>
                <li>Use automated bots, scrapers, or extraction tools without our explicit consent;</li>
                <li>Bypass rate limits, security protections, or quota controls;</li>
                <li>Upload materials that infringe upon any third-party intellectual property or privacy rights.</li>
              </ul>
            </section>

            <section id="term-3" className="policy-section">
              <h2>3. Content & Deliverables</h2>
              <p>
                You retain ownership of all original text, notes, PDF files, and materials you submit to the Services ("User Content"). By uploading User Content, you grant Lucid AI a non-exclusive, worldwide, royalty-free license to host, process, display, and reproduce your content solely as necessary to provide and operate the Services for you.
              </p>
            </section>

            <section id="term-4" className="policy-section">
              <h2>4. Subscriptions & Billing</h2>
              <p>
                Lucid AI offers free trial access as well as paid monthly and annual subscription plans. Payments and billing subscriptions are managed securely via our merchant provider, Dodo Payments.
              </p>
              <ul>
                <li><strong>Recurring Billing:</strong> Paid subscriptions automatically renew at the end of each billing period unless cancelled before the renewal date.</li>
                <li><strong>Cancellations:</strong> You may cancel your subscription at any time via your account settings. Cancellation stops future renewal charges; access to paid features continues through the end of the active billing cycle.</li>
                <li><strong>Refunds:</strong> Payments are non-refundable except where required by applicable consumer law.</li>
              </ul>
            </section>

            <section id="term-5" className="policy-section">
              <h2>5. Google Classroom & Third-Party Integrations</h2>
              <p>
                Lucid AI offers optional integrations with Google Classroom and Google Drive APIs to sync course materials and submit completed assignments. Your use of Google Services remains subject to Google's Terms of Service and Privacy Policy. We are not responsible for availability or policy changes enacted by third-party platforms.
              </p>
            </section>

            <section id="term-6" className="policy-section">
              <h2>6. Intellectual Property</h2>
              <p>
                Lucid AI and its licensors retain all rights, title, and interest in and to the Services, including our software, algorithms, brand logos, website design, and documentation.
              </p>
            </section>

            <section id="term-7" className="policy-section">
              <h2>7. Disclaimers</h2>
              <p>
                THE SERVICES ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED.
              </p>
              <p>
                Artificial Intelligence models (including Gemini AI) may occasionally produce inaccurate, incomplete, or biased responses ("hallucinations"). You should independently verify important factual assertions, dates, and formulas before relying on them for academic evaluations or critical decisions.
              </p>
            </section>

            <section id="term-8" className="policy-section">
              <h2>8. Limitation of Liability</h2>
              <p>
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, LUCID AI AND ITS AFFILIATES SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR RELATED TO YOUR USE OF THE SERVICES. OUR AGGREGATE LIABILITY SHALL NOT EXCEED THE TOTAL FEES PAID BY YOU TO LUCID AI IN THE TWELVE MONTHS PRECEDING THE CLAIM.
              </p>
            </section>

            <section id="term-9" className="policy-section">
              <h2>9. Termination</h2>
              <p>
                We reserve the right to suspend or terminate your access to the Services if you breach these Terms or engage in activities that threaten platform security. You may delete your account and stop using the Services at any time.
              </p>
            </section>

            <section id="term-10" className="policy-section">
              <h2>10. General Terms</h2>
              <p>
                These Terms are governed by applicable laws without regard to conflict of law principles. If any provision of these Terms is found invalid, the remaining provisions shall remain in full force and effect.
              </p>
              <p className="policy-contact">
                <strong>Contact Us</strong><br />
                If you have questions about these Terms, please contact support at <a href="mailto:support@lucid-ai.co">support@lucid-ai.co</a>.
              </p>
            </section>

          </article>
        </div>
      </div>
    </div>
  );
};
