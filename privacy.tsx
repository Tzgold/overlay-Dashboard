import React from 'react';
import ReactDOM from 'react-dom/client';
import PrivacyPage from './PrivacyPage';
import overlayLogo from './overlay.png';

const ensureFavicon = (href: string) => {
  const existing = document.querySelector('link[rel="icon"]') as HTMLLinkElement | null;
  const link = existing ?? document.createElement('link');
  link.rel = 'icon';
  link.type = 'image/png';
  link.href = href;
  if (!existing) document.head.appendChild(link);
};

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Could not find root element');

const root = ReactDOM.createRoot(rootElement);

ensureFavicon(overlayLogo);

root.render(
  <React.StrictMode>
    <PrivacyPage />
  </React.StrictMode>
);
