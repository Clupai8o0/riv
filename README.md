# RIV
Random Image Viewer — a simple Electron desktop app for artists to pull random
reference images from local folders.

## What it does
- Add local folder paths and maintain a list; invalid paths are flagged.
- Recursively scan a selected folder for images and display them in a viewer.
- Navigate previous/next images or auto-advance on a timer.

## Key features
- Library management: add/remove folder paths persisted to `data.json`.
- Library management: validate folders on add and mark invalid entries in the list.
- Image discovery: recursive scan for `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`.
- Viewer controls: next/previous navigation.
- Viewer controls: randomized image order per session.
- Timer: preset intervals (30s, 60s, 2m, 5m, 10m, 30m) with play/pause/reset.

## Tech stack
- Electron (main process + renderer)
- Electron Forge (packaging/publish config)
- JavaScript (Node.js + DOM)
- HTML + Tailwind CSS
- uuid (ID generation)
- electron-reload (dev reload)

## Architecture overview
The Electron main process in `main.js` creates the window and registers IPC
handlers. `preload.js` exposes a minimal `window.ctx` API to the renderer. The
renderer (`src/index.html` + `src/js/*`) calls that API to manage paths and
images. `utils/path.js` reads/writes `data.json` (gitignored) and
`utils/viewer.js` scans folders and manages image navigation.

```
Renderer (src/index.html + src/js/*)
    ↓ window.ctx (preload.js)
IPC to main process (main.js)
    ↓
utils/path.js  → data.json
utils/viewer.js → image folders
```

## Getting started (local)
### Prerequisites
- Node.js + npm (version not specified in repo)

### Install
```bash
npm install
```

### Environment variables
- None referenced in source.

### Run
```bash
npm run dev
```

```bash
npm run start
```

### Optional: Tailwind watch
```bash
npm run tailwind
```

## Usage (example flows)
- Paste a folder path into the input and click Add.
- Click a path to open the image viewer.
- Use Previous/Next to navigate through images.
- Use the timer controls to auto-advance images.
- Close the viewer to return to the path list.

## Testing / Quality
- No test, lint, or typecheck scripts are configured in `package.json`.

## Deployment
```bash
npm run package
```

```bash
npm run make
```

```bash
npm run publish
```

Packaging is configured via Electron Forge makers for Squirrel (Windows), ZIP
(macOS), and DEB/RPM (Linux). Publishing is configured for GitHub releases under
`Clupai8o0/riv` as a draft release.

## Project status
- Version `0.1.0-alpha` (from `package.json`).

## Credits
- Author: `Clupai8o0`
