# Climb Again Organigramă — Local Setup

This is an interactive organizational chart app with persistent local storage. All edits are automatically saved to `data.json`.

## Setup & Run

### 1. Install Node.js (if you don't have it)
Download from: https://nodejs.org (LTS version recommended)

### 2. Open terminal in this folder
Navigate to the folder where these files are located, then:

```bash
npm install
```

This will install Express and dependencies.

### 3. Start the server
```bash
npm start
```

You'll see:
```
✓ Climb Again Organigramă app running at http://localhost:3000
✓ Data is saved to: /path/to/data.json
```

### 4. Open in browser
Go to: **http://localhost:3000**

## How It Works

- **All edits auto-save** to `data.json` in this folder
- Refreshing the page loads your latest changes
- No browser memory loss
- CSV import/export also available

## Files

- `index.html` — The app (load at http://localhost:3000)
- `server.js` — Node.js server that handles saving/loading
- `data.json` — Your org chart data (auto-updated)
- `package.json` — Dependencies list

## Stop the server

Press `Ctrl + C` in the terminal.

---

Questions? The data persists in `data.json` so you can close and reopen anytime.
