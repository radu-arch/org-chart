# Deploy to Railway

This guide will get your app live in 5 minutes.

## Step 1: Create a Railway Account (2 minutes)

1. Go to **https://railway.app**
2. Click **"Sign up"**
3. Connect your **GitHub account** (or use email)
4. Done!

## Step 2: Deploy Your App (3 minutes)

1. Open your **terminal** on your Mac
2. Navigate to your project folder:
   ```
   cd /Users/raduionescu/Documents/Claude/Projects/Org\ chart
   ```

3. Create a `.gitignore` file (paste this):
   ```
   node_modules/
   .env
   ```

4. Push to GitHub (if not already):
   ```
   git init
   git add .
   git commit -m "Add org chart app"
   git remote add origin https://github.com/YOUR_USERNAME/org-chart
   git push -u origin main
   ```
   *(Replace YOUR_USERNAME with your GitHub username, and create the repo on GitHub first)*

5. Go to **Railway dashboard** → **New Project** → **Deploy from GitHub**
6. Select your `org-chart` repo
7. Railway will auto-detect Node.js and deploy!

## Step 3: Set the Password (Optional)

1. In Railway dashboard, go to your project
2. Click **Variables**
3. Add: `ORGCHART_PASSWORD` = `your-secure-password`
4. Save & redeploy

## Step 4: Share the Link

1. In Railway, find your project's **Domain**
2. Share the link with your group
3. They enter the password and access the org chart!

---

## Local Testing

Before deploying, test locally:
```
npm start
```
Then go to **http://localhost:3000** - you should see the login page.

**Default password:** `climb2024`

---

## Support

If deployment fails:
- Check Railway dashboard for error logs
- Make sure `package.json` exists in your folder
- Ensure all files are committed to GitHub
