const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'data.json');

// Simple password protection
const PASSWORD = process.env.ORGCHART_PASSWORD || 'climb2024';

// Login page
app.get('/login', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Climb Again Organigramă - Login</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f5f3ef; margin: 0; padding: 20px; display: flex; align-items: center; justify-content: center; min-height: 100vh; }
        .login-box { background: white; padding: 40px; border-radius: 10px; box-shadow: 0 4px 16px rgba(0,0,0,0.04); width: 100%; max-width: 320px; }
        h1 { font-size: 18px; margin: 0 0 10px 0; color: #2d5a3d; }
        p { font-size: 13px; color: #6b6560; margin: 0 0 20px 0; }
        input { width: 100%; padding: 10px 12px; border: 1px solid #ccc7be; border-radius: 6px; font-size: 13px; margin-bottom: 12px; box-sizing: border-box; }
        input:focus { outline: none; border-color: #2d5a3d; box-shadow: 0 0 0 3px rgba(45,90,61,0.1); }
        button { width: 100%; padding: 10px; background: #2d5a3d; color: white; border: none; border-radius: 6px; font-size: 13px; font-weight: 500; cursor: pointer; }
        button:hover { background: #234a30; }
        .error { color: #c0392b; font-size: 12px; margin-bottom: 12px; }
      </style>
    </head>
    <body>
      <div class="login-box">
        <h1>Climb Again</h1>
        <p>Organigramă — Restricted Access</p>
        <form method="POST" action="/auth">
          ${req.query.error ? '<div class="error">❌ Invalid password</div>' : ''}
          <input type="password" name="password" placeholder="Enter password" autofocus required>
          <button type="submit">Login</button>
        </form>
      </div>
    </body>
    </html>
  `);
});

// Handle login
app.post('/auth', express.urlencoded({ extended: true }), (req, res) => {
  if (req.body.password === PASSWORD) {
    res.setHeader('Set-Cookie', 'auth=true; Path=/; HttpOnly; Max-Age=2592000');
    res.redirect('/');
  } else {
    res.redirect('/login?error=1');
  }
});

// Middleware to check authentication
app.use((req, res, next) => {
  if (req.path === '/login' || req.path === '/auth') return next();
  const cookies = req.headers.cookie || '';
  if (cookies.includes('auth=true')) return next();
  res.redirect('/login');
});

app.use(express.json());
app.use(express.static(__dirname));

// Load data from JSON file
app.get('/api/data', (req, res) => {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    res.json(JSON.parse(data));
  } catch (err) {
    console.error('Error reading data:', err);
    res.status(500).json({ error: 'Failed to load data' });
  }
});

// Save data to JSON file
app.post('/api/data', (req, res) => {
  try {
    const data = req.body;
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
    res.json({ success: true });
  } catch (err) {
    console.error('Error saving data:', err);
    res.status(500).json({ error: 'Failed to save data' });
  }
});

app.listen(PORT, () => {
  console.log(`\n✓ Climb Again Organigramă running at http://localhost:${PORT}`);
  console.log(`✓ Default password: climb2024 (change via ORGCHART_PASSWORD env var)`);
  console.log(`✓ Data saved to: ${DATA_FILE}\n`);
});
