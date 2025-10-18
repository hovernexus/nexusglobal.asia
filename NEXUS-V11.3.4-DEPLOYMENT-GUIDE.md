# NEXUS V11.3.4 - Quick Deployment Guide

## Overview

This guide provides step-by-step instructions for deploying NEXUS V11.3.4 to GitHub Pages or other web hosting platforms.

---

## What's New in V11.3.4

✅ **Fixed ODJ Product Images** - Converted symbolic links to real files  
✅ **Fixed Product Detail Pages** - Corrected broken links  
✅ **Fixed Customer Detail Pages** - Added support for `type=buyer` parameter  
✅ **Enriched Customer Data** - Added logos, About Us, contact info for 10 Mexican buyers  
✅ **Added Logo Display** - Customer logos now appear on detail pages  

---

## Prerequisites

- GitHub account (for GitHub Pages deployment)
- Git installed on your computer (optional, for command-line deployment)
- Web browser

---

## Method 1: GitHub Pages Deployment (Recommended)

### Step 1: Download and Extract

1. Download `NEXUS-V11.3.4-FINAL.tar.gz` (25MB)
2. Extract the archive:
   - **Windows**: Right-click → Extract All
   - **Mac/Linux**: 
     ```bash
     tar -xzf NEXUS-V11.3.4-FINAL.tar.gz
     ```

### Step 2: Create or Update GitHub Repository

#### Option A: New Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the **+** icon in the top-right corner → **New repository**
3. Name your repository (e.g., `nexus-website`)
4. Select **Public**
5. Do NOT initialize with README
6. Click **Create repository**

#### Option B: Update Existing Repository

1. Go to your existing NEXUS repository on GitHub
2. Delete old files (select all → click trash icon)
3. Commit the deletion

### Step 3: Upload Files

#### Via GitHub Web Interface (Easiest)

1. In your repository, click **Add file** → **Upload files**
2. Drag and drop ALL extracted files and folders
3. **Important**: Make sure to upload the entire directory structure, including:
   - All HTML files
   - `css/` folder
   - `js/` folder
   - `data/` folder
   - `images/` folder (including `images/customers/` with logos)
4. Scroll down and click **Commit changes**

#### Via Git Command Line (Advanced)

```bash
# Navigate to extracted directory
cd nexus-v11.3.4

# Initialize git (if new repository)
git init
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git

# Or pull latest (if existing repository)
git pull origin main

# Add all files
git add .

# Commit
git commit -m "Deploy NEXUS V11.3.4 with enriched customer data"

# Push
git push -u origin main
```

### Step 4: Enable GitHub Pages

1. In your repository, go to **Settings**
2. Scroll down to **Pages** (in the left sidebar)
3. Under **Source**, select **main** branch
4. Click **Save**
5. Wait 1-2 minutes for deployment

### Step 5: Access Your Website

Your website will be available at:
```
https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/
```

For example:
```
https://johndoe.github.io/nexus-website/
```

### Step 6: Verify Deployment

1. **Clear browser cache**: Press `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
2. **Test ODJ product images**:
   - Navigate to ODJ supplier page
   - Click on any ODJ product
   - Verify images display correctly
3. **Test customer detail pages**:
   - Go to Partners section
   - Click on "MEX QUALITY BOX S.A DE C.V."
   - Verify company information and logo display
4. **Test product detail pages**:
   - Click on any product
   - Verify product details load correctly

---

## Method 2: Custom Domain Deployment

If you have a custom domain (e.g., `nexusglobal.asia`):

### Step 1: Upload Files

Upload all extracted files to your web server via:
- FTP client (FileZilla, Cyberduck)
- cPanel File Manager
- SSH/SFTP

### Step 2: Set Permissions

Ensure correct file permissions:
- Files: `644`
- Directories: `755`

### Step 3: Configure Web Server

Make sure your web server is configured to serve `index.html` as the default page.

### Step 4: Test

Visit your domain and verify all functionality.

---

## Method 3: Local Testing

Before deploying, you can test locally:

### Using Python (Recommended)

```bash
# Navigate to extracted directory
cd nexus-v11.3.4

# Start local server
python3 -m http.server 8000

# Open browser and visit:
# http://localhost:8000
```

### Using Node.js

```bash
# Install http-server globally
npm install -g http-server

# Navigate to extracted directory
cd nexus-v11.3.4

# Start server
http-server -p 8000

# Open browser and visit:
# http://localhost:8000
```

---

## Troubleshooting

### Issue: Images Not Displaying

**Solution**:
1. Verify `images/` folder was uploaded correctly
2. Check that `images/customers/` contains all 10 logo files
3. Clear browser cache (Ctrl+Shift+R)

### Issue: Product Detail Pages Show "Loading..."

**Solution**:
1. Verify `data/products-complete.json` was uploaded
2. Check browser console for errors (F12 → Console tab)
3. Ensure all JavaScript files were uploaded

### Issue: Customer Logos Not Showing

**Solution**:
1. Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
2. Try incognito/private browsing mode
3. Wait 5-10 minutes for CDN cache to clear
4. Verify `images/customers/` folder contains logo files

### Issue: "Invalid Company Type" Error

**Solution**:
1. Verify you're using V11.3.4 (check file dates)
2. Clear browser cache
3. Check that `company-detail-loader.js` was uploaded correctly

### Issue: GitHub Pages Not Updating

**Solution**:
1. Go to repository **Settings** → **Pages**
2. Verify **Source** is set to **main** branch
3. Check **Actions** tab for deployment status
4. Wait 2-5 minutes and try again
5. Force refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

---

## File Structure Verification

After deployment, your file structure should look like this:

```
nexus-v11.3.4/
├── index.html
├── company-detail.html
├── product-detail.html
├── styles.css
├── company-detail-loader.js
├── product-detail-loader.js
├── data/
│   ├── products-complete.json
│   └── registered-companies.json
├── images/
│   ├── products/
│   │   ├── odj-bys-1.jpg ✓ (real file, not symlink)
│   │   ├── odj-fp1650-1.jpg ✓
│   │   └── ... (other ODJ images)
│   └── customers/ ✓ (NEW in V11.3.4)
│       ├── mex-quality-box-logo.png
│       ├── cyecsa-logo.jpeg
│       ├── multiempaques-logo.webp
│       ├── icometa-logo.webp
│       ├── sultana-packaging-logo.webp
│       ├── celulosa-corrugados-sonora-logo.webp
│       ├── relva-logo.webp
│       ├── empropack-logo.webp
│       ├── vitti-empaques-logo.webp
│       └── durabox-logo.webp
└── ... (other files)
```

---

## Post-Deployment Checklist

- [ ] Website loads without errors
- [ ] Navigation menu works correctly
- [ ] ODJ product images display (not broken)
- [ ] Product detail pages load correctly
- [ ] Customer detail pages load with `type=buyer` parameter
- [ ] Customer logos appear on detail pages (may require cache clear)
- [ ] All 10 Mexican buyer companies show enriched data
- [ ] Contact information displays correctly
- [ ] Mobile responsive design works

---

## Performance Tips

1. **Enable Compression**: If using a custom server, enable gzip compression
2. **CDN**: Consider using Cloudflare for faster global delivery
3. **Image Optimization**: Logos are already optimized, but you can further compress if needed
4. **Browser Caching**: Set appropriate cache headers on your server

---

## Next Steps

After successful deployment:

1. **Test All Features**: Go through the testing checklist above
2. **Monitor Performance**: Use Google PageSpeed Insights
3. **Collect Feedback**: Share with stakeholders and gather feedback
4. **Plan Enhancements**: Consider adding search, filters, or additional customer data

---

## Support Resources

- **Change Log**: `NEXUS-V11.3.4-CHANGELOG.md` - Detailed list of changes
- **GitHub Pages Docs**: https://docs.github.com/en/pages
- **Web Server Docs**: Consult your hosting provider's documentation

---

## Quick Reference

| Item | Value |
|------|-------|
| **Version** | 11.3.4 |
| **Package Size** | 25MB |
| **Release Date** | October 18, 2025 |
| **Customer Logos** | 10 files in `images/customers/` |
| **Fixed Images** | 10 ODJ product images |
| **Enriched Profiles** | 10 Mexican buyer companies |

---

**Deployment Time Estimate**: 10-15 minutes (GitHub Pages) | 5-10 minutes (Custom Server)

**Difficulty Level**: Easy (Web Interface) | Moderate (Command Line)

**Recommended Method**: GitHub Pages via Web Interface

---

For detailed technical information, see `NEXUS-V11.3.4-CHANGELOG.md`.

