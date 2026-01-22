
// Declare chrome to resolve "Cannot find name 'chrome'" error in TypeScript
declare const chrome: any;

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// We use a Shadow DOM to isolate Nova's CSS from the host website's CSS
const injectNova = () => {
  const existingContainer = document.getElementById('nova-ai-root-container');
  if (existingContainer) return;

  const container = document.createElement('div');
  container.id = 'nova-ai-root-container';
  document.body.appendChild(container);

  const shadowRoot = container.attachShadow({ mode: 'open' });
  
  // Inject Tailwind/Styles into Shadow DOM
  const styleLink = document.createElement('link');
  styleLink.rel = 'stylesheet';
  styleLink.href = chrome.runtime.getURL('assets/index.css'); // Vite will bundle the CSS here
  shadowRoot.appendChild(styleLink);

  const rootDiv = document.createElement('div');
  rootDiv.id = 'nova-root';
  shadowRoot.appendChild(rootDiv);

  const root = ReactDOM.createRoot(rootDiv);
  root.render(<App />);
};

// Listen for messages from background.ts
chrome.runtime.onMessage.addListener((request: any) => {
  if (request.action === "toggle_nova") {
    injectNova();
  }
});
