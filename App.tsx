
import React from 'react';
import LandingPage from './LandingPage';

const App: React.FC = () => {
  const EXTENSION_STORE_URL =
    'https://chromewebstore.google.com/detail/overlay/likfohkcaackgiflbljodnahpocbfgka';

  const handleGetExtension = () => {
    // This function is triggered by the "Get Extension" buttons on the landing page.
    // Redirect directly to your Chrome Web Store listing.
    const w = window.open(EXTENSION_STORE_URL, '_blank', 'noopener,noreferrer');
    // If a popup blocker stops the new tab, fall back to navigating the current tab.
    if (!w) window.location.href = EXTENSION_STORE_URL;
  };

  return (
    <div className="dark min-h-screen bg-black">
      <LandingPage onOpenDashboard={handleGetExtension} />
    </div>
  );
};

export default App;
