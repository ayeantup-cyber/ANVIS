# ANVIS
Audio Notes Visualizer by BlueComet.Work  , Encrypted password protected notes optional. App installation available. Visualizer settings. Notes are saved as local .HTML files you open in a browser, no Internet needed . Each Users Ideas created through the BlueComet.Work ANViS app , is stored unique to each users device ensuring for sovereignty 
# Blue Comet Notes Engine

**Sovereign field notes system with audio playback, real-time visualizer, and AES-256 encrypted export.**

Built by [AIITØNE](https://www.bluecomet.work/) — part of the Blue Comet ecosystem.

---

## What It Is

A self-contained progressive web app for writing, protecting, and sharing notes — built for creators, producers, and anyone who thinks while music plays.

Load a track. Write while it plays. Watch the PRISM visualizer react to the audio in real time. Export your notes — plain or AES-256 encrypted — as self-contained HTML files that carry the app with them. Whoever receives your note gets the full experience and can install the app themselves.

No accounts. No servers. No tracking. Everything lives in your browser's localStorage.

---

## Features

- **Audio player** with real-time Web Audio API visualizer
- **PRISM Engine** — 10 visual modes including ALL LAYERS superposition
  - Waveform, Flow Sheet, Pulse Wave, Shimmer Grid, Fluid Spin, Grow Rings, Drift Blur, Crystal Form, Particle Orbit
- **Fullscreen visualizer** mode
- **Notes system** — title, body, star/favorite, timestamps
- **AES-256-GCM encryption** via Web Crypto API — 200,000 PBKDF2 iterations
- **Self-distributing exports** — every exported file ships the full app UI + install prompt
- **PWA** — installs to home screen, works offline, lock screen media controls
- **MediaSession API** — track metadata and playback controls on lock screen
- **Visual settings** — persist across sessions via localStorage
- **MIT licensed** — use it, fork it, build on it

---

## Deploy in 5 Minutes

### 1. Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/bc-notes.git
cd bc-notes
```

### 2. Push to GitHub

Make sure your repo contains exactly these files:

```
bc-notes/
├── index.html
├── manifest.json
├── sw.js
└── README.md
```

### 3. Deploy to Cloudflare Pages

1. Go to [pages.cloudflare.com](https://pages.cloudflare.com)
2. Connect your GitHub account
3. Select the `bc-notes` repository
4. Build settings:
   - **Framework preset:** None
   - **Build command:** *(leave empty)*
   - **Build output directory:** `/` *(or leave as default)*
5. Click **Save and Deploy**

Cloudflare will assign a `.pages.dev` URL automatically.

### 4. Add a custom subdomain

1. In Cloudflare Pages → your project → **Custom domains**
2. Add your subdomain (e.g. `notes.yourdomain.com`)
3. Cloudflare handles the DNS and SSL automatically

### 5. Update the Open App link in exports

After deploy, open `index.html` and find this line near the bottom:

```js
function getAppEmbed() {
  return 'https://www.bluecomet.work/';
}
```

Replace the URL with your live deployed URL. Save, push, done. The `◈ OPEN APP` button in every exported note will now point to your live app.

---

## How Encrypted Export Works

1. Select notes → **🔐 Encrypt** → set a password → Export
2. The exported `.html` file is AES-256-GCM encrypted with your password
3. Send the file to anyone — it opens in any browser
4. They enter the password → notes decrypt and render client-side
5. The exported file also contains the `◈ OPEN APP` button so they can install the full app

The encryption never leaves the device. No keys are transmitted anywhere.

---

## PWA Install

Visit the deployed URL in Chrome on Android or Safari on iOS. The install banner will appear automatically. Tap install. The app lives on your home screen and works fully offline.

On Android the app also registers with the lock screen media controls when audio is playing.

---

## File Structure

| File | Purpose |
|------|---------|
| `index.html` | Complete app — all HTML, CSS, JS in one file |
| `manifest.json` | PWA manifest — icons, display mode, theme |
| `sw.js` | Service worker — offline caching, cache-first strategy |
| `README.md` | This file |

---

## License

MIT License

Copyright (c) 2025 AIITØNE / Blue Comet

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

---

## Built With

- Vanilla HTML / CSS / JavaScript — zero dependencies, zero frameworks
- [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) — real-time audio analysis
- [Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API) — AES-256-GCM encryption
- [MediaSession API](https://developer.mozilla.org/en-US/docs/Web/API/MediaSession) — lock screen controls
- [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) — offline capability
- [Cloudflare Pages](https://pages.cloudflare.com) — hosting

---

## Blue Comet

[bluecomet.work](https://www.bluecomet.work/)
