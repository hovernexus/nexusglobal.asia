# NEXUS GLOBAL HOLDINGS Website

Official website for NEXUS GLOBAL HOLDINGS - Corrugated Packaging Equipment Solutions Expert

## Version
**V9.0** - Released October 11, 2025

### What's New in V9.0
- **Complete Navigation Restructure**: 7 main product categories
- **Enhanced Product Classification**: Main category + Sub-category system
- **Improved Dropdown Menu**: 7-column grid layout with Quick Links footer
- **Better Organization**: Sub-category labels for clearer product grouping
- **Optimized Display**: Fixed z-index issues, no more dropdown occlusion
- **Responsive Design**: Adapts perfectly to all screen sizes

## Features

### Core Functionality
- Responsive design with clean, professional interface
- Multi-language support (English/Chinese)
- Advanced product navigation system
- AI-powered customer consultant
- Company registration system (Suppliers & Customers)
- Dynamic product catalog with detailed specifications

### Main Sections
1. **Home** - Company overview and featured products
2. **Products** - Complete product catalog with 7 main categories:
   - Digital Printing System (数码印刷系统)
   - Flexo Inline (柔印联动生产线)
   - Die-Cutting Machine (独立裁切设备)
   - Finishing Equipment (后道成型设备)
   - Surface Treatment (表面处理设备)
   - Automation Unit (产线自动化单元)
   - Eco-friendly Packaging (环保包装设备)
3. **Solutions** - Industry solutions and case studies
4. **Service & Support** - Technical support and documentation
5. **About Us** - Company information and registered partners
6. **News** - Latest updates and announcements
7. **Contact** - Contact form and information

## Technical Stack
- HTML5, CSS3, JavaScript (Vanilla)
- Google Fonts (Open Sans)
- JSON-based data management
- No external frameworks required

## File Structure
```
nexus-github-final/
├── index.html                      # Main homepage
├── styles.css                      # Main stylesheet
├── script.js                       # Main JavaScript
├── product-navigation.css          # Product menu styles
├── about-us.html                   # About page
├── contact.html                    # Contact page
├── news.html                       # News listing
├── news-detail.html                # News article page
├── product-list.html               # Product catalog
├── product-detail-dynamic.html     # Product details page
├── product-detail-loader-v3.js     # Product data loader
├── registered-companies.html       # Partner directory
├── company-detail.html             # Company profile page
├── supplier-registration.html      # Supplier registration
├── customer-registration.html      # Customer registration
├── ai-consultant.html              # AI assistant page
├── data/
│   ├── products-complete.json      # Product database
│   ├── registered-companies.json   # Partner database
│   └── translations.json           # Language translations
└── images/                         # Image assets
```

## Deployment

### GitHub Pages (Recommended)
1. Fork or clone this repository
2. Go to Settings → Pages
3. Set Source to: Branch `main`, Folder `/ (root)`
4. Save and wait 1-2 minutes
5. Access via: `https://YOUR-USERNAME.github.io/REPO-NAME/`

### Other Platforms
- **Netlify**: Connect repository and deploy automatically
- **Vercel**: Import project and deploy
- **Traditional Hosting**: Upload all files to web server root

## Browser Support
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Important Notes

### Clear Browser Cache
After deployment, users should clear browser cache to see the latest version:
- Chrome/Edge: `Ctrl+Shift+Delete` (Windows) or `Cmd+Shift+Delete` (Mac)
- Firefox: `Ctrl+Shift+Delete` (Windows) or `Cmd+Shift+Delete` (Mac)
- Safari: `Cmd+Option+E` (Mac)

### Product Links
All product links use the format:
```
product-detail-dynamic.html?id=PRODUCT_ID
```

### Company Links
All company profile links use the format:
```
company-detail.html?id=COMPANY_ID
```

## Testing Checklist

After deployment, verify:
- [ ] Homepage loads correctly
- [ ] Navigation menu displays properly
- [ ] Product dropdown shows all categories
- [ ] Product detail pages load with full specifications
- [ ] Company profiles display correctly
- [ ] Registration forms are accessible
- [ ] AI consultant page works
- [ ] Language switcher functions (if enabled)
- [ ] All images load properly
- [ ] Mobile responsive design works

## Known Issues & Solutions

### Issue: Navigation menu not displaying
**Solution**: Clear browser cache or use incognito mode

### Issue: Product details show "Product not found"
**Solution**: Verify `product-detail-loader-v3.js` is loaded and `data/products-complete.json` exists

### Issue: Slow loading
**Solution**: Enable CDN, compress images, or use faster hosting

## Support

For technical issues or questions, please refer to:
- Deployment Guide: `NEXUS-V8.2-Deployment-Guide.md`
- Fix Summary: `NEXUS-V8.2-Final-Fix-Summary.md`

## License

© 2025 NEXUS GLOBAL HOLDINGS. All rights reserved.

## Version History

### V9.0 (2025-10-11)
- Complete navigation restructure with 7 main categories
- Enhanced product classification system (mainCategory + subCategory)
- Improved dropdown menu design with 7-column grid layout
- Added Quick Links footer in Products dropdown
- Better responsive design for all screen sizes
- Fixed z-index issues to prevent dropdown occlusion
- Optimized sub-category labels for better organization

### V8.2 Final (2025-10-11)
- Fixed navigation menu display issues
- Corrected product category links
- Fixed product detail page loading
- Corrected technical specifications display (8 parameters)
- Fixed all page navigation links
- Removed emoji icons (except logo symbol)
- Cleaned up backup files

### V8.1 (2025-10-10)
- Enhanced product navigation system
- Added dynamic product loading
- Improved company profile pages

### V8.0 (2025-10-09)
- Major redesign with new navigation structure
- Added product categories
- Enhanced responsive design

---

**Website URL**: https://nexusglobal.asia (when custom domain configured)

**GitHub Repository**: https://github.com/juyigroup/nexusglobal.asia

