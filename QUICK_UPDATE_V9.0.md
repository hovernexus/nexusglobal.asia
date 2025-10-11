# NEXUS V9.0 Quick Update Guide

## 🚀 5-Minute Update Process

### Prerequisites
- Access to GitHub repository `hovernexus/nexusglobal.asia`
- V9.0 package downloaded and extracted

---

## Step 1: Backup Current Version (30 seconds)

Visit your GitHub repository and create a tag:
```
Settings → Releases → Create a new release
Tag: v8.2-final
Title: V8.2 Final - Before V9.0 Update
```

---

## Step 2: Upload V9.0 Files (2 minutes)

### Option A: Using GitHub Web Interface (Easiest)

1. Go to https://github.com/hovernexus/nexusglobal.asia
2. Click "Add file" → "Upload files"
3. Drag these files from V9.0 package:
   - `index.html` (⚠️ Must upload)
   - `product-navigation.css` (⚠️ Must upload)
   - `category-mapper-v9.js` (⚠️ Must upload)
   - `data/categories-v9.json` (⚠️ Must upload)
   - `README.md` (Optional)
4. Commit message: "Update to V9.0"
5. Click "Commit changes"

### Option B: Using Git Command Line

```bash
# Navigate to your repository
cd /path/to/nexusglobal.asia

# Copy V9.0 files (overwrite existing)
cp /path/to/v9.0/index.html .
cp /path/to/v9.0/product-navigation.css .
cp /path/to/v9.0/category-mapper-v9.js .
cp /path/to/v9.0/data/categories-v9.json data/
cp /path/to/v9.0/README.md .

# Commit and push
git add -A
git commit -m "Update to V9.0: Complete navigation restructure"
git push origin main
```

---

## Step 3: Wait for Deployment (1-2 minutes)

GitHub Pages will automatically rebuild your site.

You can check the status at:
```
Settings → Pages → "Your site is live at..."
```

---

## Step 4: Verify Update (1 minute)

1. Visit https://nexusglobal.asia
2. Clear browser cache (Ctrl+Shift+Delete) or use Incognito mode
3. Hover over "Products" menu
4. Verify you see **7 main categories**:
   - Digital Printing System
   - Flexo Inline
   - Die-Cutting Machine
   - Finishing Equipment
   - Surface Treatment
   - Automation Unit
   - Eco-friendly Packaging

---

## ✅ Success Checklist

- [ ] Products dropdown shows 7 categories (not 3)
- [ ] Sub-category labels visible (gray text)
- [ ] Product links work when clicked
- [ ] Menu displays in 7 columns on desktop
- [ ] No layout issues or text overlap
- [ ] Product detail pages still work

---

## 🔧 Quick Troubleshooting

### Still seeing old 3-category menu?
1. Clear browser cache completely
2. Wait 5 more minutes
3. Use Incognito/Private mode

### Menu looks broken?
1. Verify `product-navigation.css` was uploaded
2. Check browser console (F12) for errors
3. Re-upload the CSS file

### Products not loading?
1. Verify `data/products-complete.json` exists
2. Check browser console for JavaScript errors
3. Try a different product link

---

## 📞 Need Help?

If update fails or you see errors:

1. Take a screenshot of the issue
2. Check browser console (F12) for error messages
3. Verify all 4 required files were uploaded
4. Contact support with screenshots and error messages

---

## 🔄 Rollback to V8.2

If you need to revert:

1. Go to GitHub repository
2. Click "Releases" → "v8.2-final"
3. Download source code
4. Upload V8.2 files (overwrite V9.0)

Or use Git:
```bash
git revert HEAD
git push origin main
```

---

**Total Time**: ~5 minutes  
**Difficulty**: Easy  
**Risk**: Low (can rollback anytime)

Good luck with your update! 🎉

