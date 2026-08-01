import React, { useEffect } from 'react';

export const PrivacyPolicy: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="policy-page">
      <div className="policy-container">
        
        {/* Header */}
        <header className="policy-header">
          <div className="policy-date">Updated: August 1, 2026</div>
          <h1 className="policy-title">Privacy policy</h1>
        </header>

        {/* Content Layout */}
        <div className="policy-layout">
          
          {/* Left TOC Navigation */}
          <aside className="policy-toc">
            <nav className="policy-toc-nav">
              <a href="#section-1">1. Personal Data we collect</a>
              <a href="#section-2">2. How we use Personal Data</a>
              <a href="#section-3">3. Google API & Limited Use</a>
              <a href="#section-4">4. Disclosure of Personal Data</a>
              <a href="#section-5">5. Data Security & Retention</a>
              <a href="#section-6">6. Your Rights & Choices</a>
              <a href="#section-7">7. Children's Privacy</a>
              <a href="#section-8">8. Changes to this policy</a>
              <a href="#section-9">9. Contact Us</a>
            </nav>
          </aside>

          {/* Main Article Prose */}
          <article className="policy-article">
            
            <p className="policy-lead">
              At Lucid AI (together with our affiliates, "Lucid", "we", "our", or "us"), we are strongly committed to respecting your privacy and keeping secure any information we obtain from or about you. This Privacy Policy describes our practices with respect to personal data that we collect from or about you, and how we use it when you use our website, applications, tools, and services (collectively, "Services").
            </p>

            <section id="section-1" className="policy-section">
              <h2>1. Personal Data we collect</h2>
              <p>We collect personal data relating to you ("Personal Data") from the following sources:</p>
              
              <h3>Personal Data you provide</h3>
              <p>
                When you create an account to use our Services, interact with us, or communicate with our support team, we collect Personal Data associated with your account:
              </p>
              <ul>
                <li><strong>Account Information:</strong> Name, email address, profile avatar, and authentication identifiers provided during sign-up (via WorkOS or Google Sign-In).</li>
                <li><strong>User Content:</strong> Text prompts, study notes, uploaded PDF or text documents, assignments, audio recordings, and feedback you input into our Services.</li>
                <li><strong>Payment Information:</strong> When purchasing a subscription, payment transactions are processed securely through our payment provider, Dodo Payments. We collect billing tier status, renewal dates, and transaction records, but do not store raw card numbers.</li>
              </ul>

              <h3>Information collected via Google Classroom & Google Drive APIs</h3>
              <p>
                If you choose to connect your Google Account to Lucid AI, we access specific Google data with your explicit authorization:
              </p>
              <ul>
                <li><strong>Google Account Identity:</strong> Primary email address and profile details.</li>
                <li><strong>Google Classroom Data:</strong> Enrolled course list, assignment instructions, due dates, course materials, and submission statuses.</li>
                <li><strong>Google Drive Files:</strong> Files you explicitly select or generate to attach to course deliverables and assignments.</li>
              </ul>

              <h3>Automatically collected Personal Data</h3>
              <p>
                When you visit or use our Services, we automatically log technical information regarding your interaction:
              </p>
              <ul>
                <li><strong>Log Data:</strong> IP address, browser type and settings, operating system, and date/time of requests.</li>
                <li><strong>Usage Data:</strong> Features accessed, pages viewed, time spent on the platform, and user interaction metrics (processed via PostHog analytics).</li>
              </ul>
            </section>

            <section id="section-2" className="policy-section">
              <h2>2. How we use Personal Data</h2>
              <p>We use Personal Data for the following business and educational purposes:</p>
              <ul>
                <li>To provide, maintain, and personalize our AI study assistant, document summarization, voice synthesizer, and learning tools;</li>
                <li>To synchronize assignments and automate the submission of deliverables to your Google Classroom courses;</li>
                <li>To process subscription payments, manage user accounts, and prevent fraud;</li>
                <li>To monitor, analyze, and optimize performance, security, and user experience across our Services;</li>
                <li>To communicate with you regarding service updates, account notices, and customer support inquiries.</li>
              </ul>
            </section>

            <section id="section-3" className="policy-section">
              <h2>3. Google API Services & Limited Use Policy</h2>
              <p>
                Lucid AI's use and transfer to any other app of information received from Google APIs adheres to the <a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" rel="noopener noreferrer">Google API Services User Data Policy</a>, including the Limited Use requirements.
              </p>
              <p>Specifically:</p>
              <ul>
                <li>Google OAuth data is used solely to provide user-facing features that are prominent in the application (viewing assignment briefs and submitting coursework).</li>
                <li>We do not transfer Google user data to third parties, except as required to provide or improve features, comply with applicable laws, or as part of a corporate transaction.</li>
                <li>We do not use raw Google user data (obtained via Google Workspace or Google Classroom APIs) to train generalized artificial intelligence or machine learning models.</li>
                <li>Human staff do not read your Google user data unless explicitly permitted by you for troubleshooting, required for safety and security audits, or required by law.</li>
              </ul>
            </section>

            <section id="section-4" className="policy-section">
              <h2>4. Disclosure of Personal Data</h2>
              <p>We do not sell your Personal Data. We share Personal Data only in the following limited circumstances:</p>
              <ul>
                <li><strong>Service Providers & Vendors:</strong> Third-party vendors who perform business operations on our behalf (e.g., Google Cloud Platform for cloud storage and compute, WorkOS for authentication, Dodo Payments for payment processing, PostHog for product analytics).</li>
                <li><strong>Legal Requirements:</strong> To comply with applicable legal obligations, subpoenas, regulatory demands, or to protect the safety, rights, and property of Lucid AI, our users, or the public.</li>
                <li><strong>Business Transfers:</strong> In connection with any merger, sale of company assets, financing, or acquisition of all or a portion of our business.</li>
              </ul>
            </section>

            <section id="section-5" className="policy-section">
              <h2>5. Data Security & Retention</h2>
              <p>
                We implement industry-standard technical and organizational security measures to protect your Personal Data, including HTTPS encryption in transit and AES-256 encryption at rest on Google Cloud.
              </p>
              <p>
                We retain Personal Data only for as long as necessary to fulfill the purposes described in this policy or until you request deletion of your account. Audio synthesis caches and transient processing buffers are automatically purged according to routine data lifecycle schedules.
              </p>
            </section>

            <section id="section-6" className="policy-section">
              <h2>6. Your Rights & Choices</h2>
              <p>Depending on your jurisdiction, you have the following privacy rights regarding your Personal Data:</p>
              <ul>
                <li><strong>Access & Correction:</strong> Access or update your account information directly within your profile settings.</li>
                <li><strong>Deletion:</strong> Request account and data erasure by contacting our support team.</li>
                <li><strong>Revoke Google Access:</strong> You can disconnect Lucid AI's access to your Google Account at any time via <a href="https://myaccount.google.com/permissions" target="_blank" rel="noopener noreferrer">Google Account Permissions</a>.</li>
              </ul>
            </section>

            <section id="section-7" className="policy-section">
              <h2>7. Children's Privacy</h2>
              <p>
                Lucid AI is an educational study platform. We do not knowingly collect Personal Data from children under the age of 13 without appropriate parental or institutional authorization. If you believe a child under 13 has provided Personal Data to us, please contact support so we can take immediate corrective action.
              </p>
            </section>

            <section id="section-8" className="policy-section">
              <h2>8. Changes to this policy</h2>
              <p>
                We may update this Privacy Policy from time to time to reflect changes in our legal, operational, or technical requirements. We will notify you of any material changes by updating the date at the top of this page or providing an in-app notice.
              </p>
            </section>

            <section id="section-9" className="policy-section">
              <h2>9. Contact Us</h2>
              <p>
                If you have any questions, comments, or requests regarding this Privacy Policy or our data practices, please contact us at:
              </p>
              <p className="policy-contact">
                <strong>Lucid AI Support</strong><br />
                Email: <a href="mailto:support@lucid-ai.co">support@lucid-ai.co</a><br />
                Web: <a href="https://lucid-ai.co">https://lucid-ai.co</a>
              </p>
            </section>

          </article>
        </div>
      </div>
    </div>
  );
};
