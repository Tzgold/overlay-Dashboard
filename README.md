# Overlay — Landing site

Public marketing site for **Overlay**, a Chrome extension that opens your chosen tools (including AI sites) in a small dedicated window. This repository contains the **web landing page and privacy policy** only—not the extension source code.

**Live site:** [overlay-extension.vercel.app](https://overlay-extension.vercel.app/)  
**Chrome Web Store:** [Overlay](https://chromewebstore.google.com/detail/overlay/likfohkcaackgiflbljodnahpocbfgka)

## Tech stack

- **React 19** + **TypeScript**
- **Vite 6** for dev and production builds
- **Tailwind CSS** for styling

## What’s in this repo

| Path | Purpose |
|------|---------|
| [`App.tsx`](App.tsx) | Root app; wires the Chrome Web Store URL for install buttons |
| [`LandingPage.tsx`](LandingPage.tsx) | Home page content and layout |
| [`PrivacyPage.tsx`](PrivacyPage.tsx) | Privacy policy ([`/privacy.html`](https://overlay-extension.vercel.app/privacy.html) after deploy) |
| [`index.html`](index.html) / [`index.tsx`](index.tsx) | Main entry |
| [`privacy.html`](privacy.html) / [`privacy.tsx`](privacy.tsx) | Standalone privacy page entry (multi-page build) |

The Vite config builds two HTML entry points so the privacy policy is a separate route-friendly page.

## Getting started

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`). The privacy page is available at `/privacy.html` in dev and production.

### Production build

```bash
npm run build
```

Static output is written to `dist/`. Preview locally:

```bash
npm run preview
```

## Deployment

Deploy `dist` to any static host (e.g. Vercel, Netlify, GitHub Pages). Configure the host to serve `index.html` for `/` and `privacy.html` for `/privacy.html` (default for most static hosts).

## Privacy

The published privacy policy for the extension is built from [`PrivacyPage.tsx`](PrivacyPage.tsx). For the exact wording shipped to users, use the deployed `/privacy.html` page.

## Contributing

1. Install dependencies and run `npm run dev` before opening a pull request.
2. Keep changes focused; match existing Tailwind and component patterns.
3. Update this README if you add routes, env vars, or deployment steps.

## Repository

Source: [github.com/Tzgold/overlay-Dashboard](https://github.com/Tzgold/overlay-Dashboard)
