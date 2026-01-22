
# Nova AI Extension Architecture

## 1. System Overview
Nova is a Chrome Extension built on Manifest V3. It utilizes a **Content Script** to inject a **Shadow DOM** into the target webpage, ensuring style isolation. The UI is built with **React** and **Tailwind CSS**.

### Communication Flow:
1.  **Background Service Worker:** Listens for `chrome.commands` (Shortcuts) and `chrome.contextMenus`. It sends messages to the active tab's Content Script.
2.  **Content Script:** Acts as the bridge. It mounts the React application into a dedicated `div` inside a Shadow Root to prevent the host website's CSS from leaking into the dashboard.
3.  **React App:** Managed state for tools, settings, and Gemini API calls.

## 2. Directory Structure
```text
/
├── manifest.json         # Extension configuration
├── background.ts        # Service worker for shortcuts & context menus
├── content_script.tsx    # Injector & Shadow DOM setup
├── components/           # Reusable UI (Draggable, Resizable, Icons)
├── services/             # Gemini API and storage logic
├── tools/                # Individual AI tool implementations
│   ├── Chat.tsx
│   ├── Summarizer.tsx
│   ├── Refactor.tsx
│   └── Translator.tsx
├── App.tsx               # Root component (Routing & Global State)
└── index.tsx             # Entry point
```

## 3. UI/UX Layout
- **Command Bar Mode (Ctrl+Shift+A):** Centered spotlight search (Raycast-style).
- **Sidebar/Panel Mode:** Draggable floating window on the right.
- **Micro-interactions:** Glassmorphism, subtle blur effects, and keyboard-first navigation (Arrows to select tool, Enter to execute).

## 4. Best Practices
- **Performance:** Context is only read when the dashboard is active. Large page content is summarized locally or chunked before sending to the API.
- **Security:** Use of Shadow DOM prevents "DOM-jacking" by the host site. Gemini API keys are handled via background worker or secure environment variables.
