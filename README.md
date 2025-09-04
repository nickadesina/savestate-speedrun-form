# Speedrun Application Form

A password-protected application form with real-time auto-save. No backend needed - everything saves locally in your browser.

## Quick Start

### Local Usage
1. Download all 3 files to the same folder:
   - `index.html`
   - `styles.css`
   - `script.js`

2. Open `index.html` in your browser

3. Enter the password.

4. Fill out the form - it auto-saves as you type!

## Features

- **Password Protected**
- **Auto-Save**: Every change is saved instantly to your browser
- **Session Memory**: Stay logged in until you close the browser
- **Word Counters**: See when you're approaching word limits
- **Add Co-founders**: Click "+ Add Co-founder" button as needed
- **Save Button**: Manual save option (though it auto-saves anyway)
- **Logout**: Clear session and require password again

## How to Host on GitHub Pages (FREE)

### Step 1: Create GitHub Account
1. Go to [github.com](https://github.com)
2. Sign up for free account

### Step 2: Create New Repository
1. Click the **+** icon (top right) → **New repository**
2. Name it: `speedrun-form` (or whatever you want)
3. Make it **Public** (required for free hosting)
4. DON'T initialize with README (you already have one)
5. Click **Create repository**

### Step 3: Upload Your Files
1. On the repository page, click **uploading an existing file**
2. Drag and drop these 3 files:
   - `index.html`
   - `styles.css` 
   - `script.js`
   - `README.md` (this file)
3. Write commit message: "Initial upload"
4. Click **Commit changes**

### Step 4: Enable GitHub Pages
1. In your repository, click **Settings** tab
2. Scroll down to **Pages** section (left sidebar)
3. Under **Source**, select **Deploy from a branch**
4. Under **Branch**, select **main** (or master)
5. Leave folder as **/ (root)**
6. Click **Save**

### Step 5: Access Your Site
1. Wait 2-5 minutes for deployment
2. Your site will be live at:
   ```
   https://[your-username].github.io/[repository-name]/
   ```
   Example: `https://johndoe.github.io/speedrun-form/`

3. Find exact URL in Settings → Pages (green checkmark when ready)

## Important Notes

### Data Storage
- Form data saves to YOUR browser's localStorage
- Each user's data is separate (not shared between computers)
- Data persists until you clear browser data or logout
- No server/database - everything is local

### Security
- This is basic password protection
- Don't use for sensitive data
- Anyone can view source code and see the password
- For real security, you'd need a backend server

### Browser Compatibility
Works on all modern browsers:
- Chrome
- Firefox
- Safari
- Edge

### Mobile
Fully responsive - works on phones and tablets

## Troubleshooting


**Form not saving?**
- Check if browser blocks localStorage (rare)
- Try different browser
- Make sure JavaScript is enabled

**GitHub Pages not working?**
- Wait 5-10 minutes after enabling
- Make sure repository is public
- Check Settings → Pages for error messages
- File must be named exactly `index.html`

**Lost your data?**
- Data is stored in browser
- If you clear browser data, it's gone
- Different browsers = different saved data

## Quick Commands for Git (Optional)

If you want to update your site after hosting:

```bash
# Clone your repository locally
git clone https://github.com/YOUR_USERNAME/speedrun-form.git

# Make your changes to files

# Push updates
git add .
git commit -m "Updated form"
git push
```

Site auto-updates in 2-5 minutes after pushing changes.

## Support

For issues with:
- The form itself: Check the code or modify as needed
- GitHub Pages: Check [GitHub Pages Documentation](https://docs.github.com/en/pages)
