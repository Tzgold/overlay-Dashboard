
import React from 'react';
import LandingPage from './LandingPage';

const App: React.FC = () => {
  const handleGetExtension = () => {
    // This function is triggered by the "Get Extension" buttons on the landing page.
    // Since you have your own extension, you can replace this with a link to your store page.
    console.log("Redirecting to extension store...");
    window.open('https://chrome.google.com/webstore', '_blank');
  };

  return (
    <div className="dark min-h-screen bg-black">
      <LandingPage onOpenDashboard={handleGetExtension} />
    </div>
  );
};

export default App;
