import React from 'react';

const PrivacyPage: React.FC = () => {
  return (
    <div className="min-h-screen px-6 py-12 md:px-10" style={{ backgroundColor: '#000000', color: '#ffffff' }}>
      <div className="mx-auto max-w-3xl rounded-3xl p-8 md:p-10" style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)' }}>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Overlay — Privacy Policy</h1>
        <p className="text-sm mb-10" style={{ color: 'rgba(255,255,255,0.7)' }}>
          Last updated: April 2, 2026
        </p>

        <div className="space-y-8 text-sm leading-7" style={{ color: 'rgba(255,255,255,0.9)' }}>
          <section>
            <p>
              This policy describes how the <strong>Overlay</strong> Chrome extension (&ldquo;Extension&rdquo;) handles information. The Extension is developed to help you open websites you choose (for example, AI tools) in a separate small browser window.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold mb-3">What the Extension does</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>You select which site to use as your &ldquo;Quick Tool&rdquo; and may add custom links.</li>
              <li>The Extension can open that site in a dedicated window and remember your preferences on your device.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold mb-3">Data storage (on your computer only)</h2>
            <p className="mb-3">
              The Extension stores data <strong>locally in your browser</strong> using Chrome&apos;s{' '}
              <code className="rounded px-1.5 py-0.5 text-xs" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
                chrome.storage
              </code>{' '}
              APIs. This may include:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Your settings (for example, which tool is selected, order of tools, accent color).</li>
              <li>The last URL you had open per tool (so returning to a tool can restore the same page when the site uses normal web addresses).</li>
            </ul>
            <p className="mt-3">
              <strong>We do not operate servers for this Extension.</strong> We do not receive this data. The developer does not collect, transmit, or sell your browsing history, prompts, or messages from third-party sites.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold mb-3">Permissions (why they are needed)</h2>
            <div className="overflow-x-auto -mx-1">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.15)' }}>
                    <th className="py-2 pr-4 align-top font-bold">Permission</th>
                    <th className="py-2 align-top font-bold">Purpose</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                    <td className="py-3 pr-4 align-top"><strong>storage</strong></td>
                    <td className="py-3 align-top">Save your settings and last URLs locally.</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                    <td className="py-3 pr-4 align-top"><strong>notifications</strong></td>
                    <td className="py-3 align-top">Show simple messages when the Extension is off or no Quick Tool is selected (for example, when using the keyboard shortcut).</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                    <td className="py-3 pr-4 align-top"><strong>tabs</strong></td>
                    <td className="py-3 align-top">Update the address of the tab inside the Extension&apos;s overlay window when you switch tools or restore a saved URL.</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 align-top"><strong>windows</strong></td>
                    <td className="py-3 align-top">Create, focus, minimize, and position the small overlay window.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold mb-2">Third-party websites</h2>
            <p>
              When you open a site (for example, an AI service), your use of that site is governed by <strong>that site&apos;s</strong> terms and privacy policy. The Extension does not inject scripts into those pages to read your conversations.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold mb-2">Contact</h2>
            <p>
              For privacy questions about this Extension, contact the publisher through the contact information on the Chrome Web Store listing.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold mb-2">Changes</h2>
            <p>
              We may update this policy if the Extension&apos;s behavior changes. The &ldquo;Last updated&rdquo; date will be revised when that happens.
            </p>
          </section>

          <p className="text-xs italic pt-2" style={{ color: 'rgba(255,255,255,0.55)' }}>
            Third-party names and logos (such as ChatGPT, Claude, Gemini) belong to their owners. Overlay is not affiliated with or endorsed by those services.
          </p>
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
