import React from 'react';

const PrivacyPage: React.FC = () => {
  return (
    <div className="min-h-screen px-6 py-12 md:px-10" style={{ backgroundColor: '#000000', color: '#ffffff' }}>
      <div className="mx-auto max-w-3xl rounded-3xl p-8 md:p-10" style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)' }}>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Privacy Policy for Overlay</h1>
        <p className="text-sm mb-10" style={{ color: 'rgba(255,255,255,0.7)' }}>
          Last updated: March 16, 2026
        </p>

        <div className="space-y-8 text-sm leading-7" style={{ color: 'rgba(255,255,255,0.9)' }}>
          <section>
            <h2 className="text-lg font-bold mb-2">1. Information We Do Not Collect</h2>
            <p>
              Overlay does not collect or store personal information from users. The extension does not collect browsing history, location data, personal communications, authentication information, or any sensitive user data.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold mb-2">2. AI Requests</h2>
            <p className="mb-3">
              Overlay allows users to interact with AI tools directly from a popup interface while browsing.
            </p>
            <p>
              AI requests are only sent when a user manually enters a prompt and submits it through the extension interface. The extension does not automatically collect or transmit webpage content without user interaction.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold mb-2">3. Local Storage</h2>
            <p>
              Overlay uses the browser&apos;s local storage to save user preferences and custom AI tools configured by the user. This information is stored only on the user&apos;s device and is not transmitted to any external server.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold mb-2">4. Third-Party Services</h2>
            <p className="mb-3">
              When a user submits a prompt, the extension may communicate with external AI services in order to generate responses.
            </p>
            <p>
              Only the information entered by the user in the prompt is sent to these services. Overlay does not sell, share, or distribute user data to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold mb-2">5. Permissions Usage</h2>
            <p className="mb-3">Overlay requires certain browser permissions to provide its functionality:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>activeTab</strong> and <strong>tabs</strong> - used to detect the current tab and display the AI popup when the user activates the extension.</li>
              <li><strong>scripting</strong> - used to inject the popup interface into the current webpage.</li>
              <li><strong>storage</strong> - used to save user preferences and custom AI tools locally in the browser.</li>
              <li><strong>host permissions</strong> - required so the extension can function on webpages where the user activates it.</li>
            </ul>
            <p className="mt-3">
              These permissions are used only for the core functionality of the extension.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold mb-2">6. Contact</h2>
            <p>
              For privacy-related questions, contact:
              {' '}
              <a href="mailto:support@overlay-ai.app" className="underline">support@overlay-ai.app</a>
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold mb-2">7. Policy Updates</h2>
            <p>
              This privacy policy may be updated over time. Any changes will be posted on this page with a revised "Last updated" date.
            </p>
          </section>
        </div>

        <div className="mt-10">
          <a
            href="/"
            className="inline-flex items-center rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-[0.12em]"
            style={{ border: '1px solid rgba(255,255,255,0.2)', color: '#ffffff' }}
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
