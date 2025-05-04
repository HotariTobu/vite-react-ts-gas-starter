# Vite React TypeScript Google Apps Script Starter

This project is a starter template for building [Google Apps Script (GAS)](https://developers.google.com/apps-script) projects using [Vite](https://vitejs.dev/), [React](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/), and [@google/clasp](https://github.com/google/clasp). It provides a modern development environment with features like hot module replacement (HMR), TypeScript support, and easy push to Google Apps Script.

## Project Structure

- `public/`: Contains static files like `appsscript.json` and other assets.
- `src/`: Contains the main application code.
  - `*/index.html`: Client-side entry files.
  - `index.ts`: Server-side entry script.
- `build.ui.mjs`: Script to build UI files for GAS.
- `rollup.config.ts`: Rollup configuration for bundling server-side files.
- `vite.config.ts`: Vite configuration for bundling client-side files.

## Getting Started

### Setup

1. Install dependencies:
   ```bash
   npm install
   ```

1. Create `.clasp.json`:
   ```bash
   npx ncp .clasp.example.json .clasp.json
   ```

1. (If it does not exist) Create a GAS project

1. Replace `<SCRIPT_ID>` in `.clasp.json`

### Development

1. Start the development server:
   ```bash
   npm run dev
   ```

1. Access [localhost:5173/<HTML_DIR>/]( http://localhost:5173/<HTML_DIR>/) (e.g. `<HTML_DIR> = dialog`)

### Push to Google Apps Script

1. Authenticate with Google Apps Script:
   ```bash
   clasp login
   ```

2. Push the code to your Apps Script project:
   ```bash
   npm run push
   ```

3. Open the Apps Script editor:
   ```bash
   npm run open
   ```
