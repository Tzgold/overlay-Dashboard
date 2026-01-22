
# Nova AI — Extension & Landing Page

A lightweight React + Vite landing site and Chrome extension scaffold that demonstrates an in-page AI command center using a Shadow DOM for style isolation.

Key points
- Built with React 19, Tailwind, and Vite.
- A content script injects a Shadow DOM and mounts the React app so the UI doesn't conflict with host site styles ([content_script.tsx](content_script.tsx)).
- Background worker handles toolbar click and keyboard shortcut to toggle the UI ([background.ts](background.ts)).
- Gemini API integration lives in [services/geminiService.ts](services/geminiService.ts) and exposes [`generateAIResponse`](services/geminiService.ts) used by the chat tool ([tools/Chat.tsx](tools/Chat.tsx)).

Quick start (local)
1. Install deps
   ```bash
   npm install
   ```
2. Create environment file
   - Copy `.env.example` → `.env` and set API_KEY (used by [`getAIClient`](services/geminiService.ts)).
3. Run dev server
   ```bash
   npm run dev
   ```
4. Open the UI in the browser at the Vite dev URL or use the build for Chrome.

Build & load into Chrome
1. Build
   ```bash
   npm run build
   ```
   Output is in `dist`.
2. Open chrome://extensions → enable Developer mode → Load unpacked → select `dist`.
3. Click the extension or press the configured shortcut (Alt + A by default in [manifest.json](manifest.json)) to send the toggle message the background worker uses.

Important files & components
- [App.tsx](App.tsx) — root app that renders the landing page and entry to extension UI.
- [LandingPage.tsx](LandingPage.tsx) — marketing + "Install" flow used in the web landing.
- [content_script.tsx](content_script.tsx) — injects Shadow DOM and mounts the app.
- [background.ts](background.ts) — extension background message router.
- [services/geminiService.ts](services/geminiService.ts) — Gemini client and helpers (`generateAIResponse`, `summarizePage`, `searchGrounding`).
- [tools/Chat.tsx](tools/Chat.tsx) — chat UI that calls [`generateAIResponse`](services/geminiService.ts).
- [components/FloatingPanel.tsx](components/FloatingPanel.tsx) — draggable/resizable container used by in-page UI.
- [constants.tsx](constants.tsx) — tool list and keyboard mapping (`TOOLS`, `TOOL_SHORTCUTS`).
- [vite.config.ts](vite.config.ts) & [package.json](package.json) — build and dependency configuration.

Development tips
- The extension uses environment variable API_KEY. The dev server exposes the landing page; to test extension functionality in Chrome use the production build (dist).
- Shadow DOM CSS is loaded via the content script (it expects the built CSS file path).
- The chat tool demonstrates how to call the AI service: see [`generateAIResponse`](services/geminiService.ts) and how it's consumed in [`Chat`](tools/Chat.tsx).

Contributing
- Keep UI isolated in the Shadow DOM.
- Prefer small, focused prompts and client-side chunking when sending large page content to the Gemini API.
- Add new tools to [`TOOLS`](constants.tsx) and implement UI in `tools/`.

License & notes
- This repository is a scaffold/demo. Replace the store link in [App.tsx](App.tsx) with your extension listing.
- Ensure API keys are kept out of source control and stored only in environment variables.

If you need a quick pointer to where the chat, injection, or Gemini call happens, see:
- [`Chat`](tools/Chat.tsx)
- [`FloatingPanel`](components/FloatingPanel.tsx)
- [`generateAIResponse`](services/geminiService.ts)
