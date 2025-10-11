// Product Detail Loader
// This script loads product data dynamically based on URL parameters

// Product data (embedded to avoid CORS issues)
const productsData = {
  "products": [
    {
      "id": "glory160x-hd",
      "name": "Glory160X HD",
      "subtitle": "High-Definition Digital Printing Machine",
      "category": "Digital Printing Machines",
      "supplier": "techpack",
      "description": "The Glory160X HD is a state-of-the-art digital printing solution designed for high-quality corrugated packaging production. With advanced inkjet technology and precision control systems, it delivers exceptional print quality at high speeds.",
      "keyFeatures": [
        "Maximum printing speed of 160 m/min",
        "1200 x 1200 dpi resolution for superior quality",
        "Variable data printing capabilities",
        "Low maintenance and operating costs",
        "Eco-friendly water-based inks"
      ],
      "image": "images/digital-printer-glory160x.webp",
      "mainFeatures": {
        "title": "Advanced Technology for Superior Results",
        "description": "The Glory160X HD incorporates cutting-edge digital printing technology to deliver outstanding results in corrugated packaging production.",
        "features": [
          {
            "title": "High-Speed Inkjet System",
            "description": "Advanced multi-channel inkjet system with precision drop placement ensures consistent quality at speeds up to 160 m/min. Automated nozzle monitoring and cleaning maintain optimal performance."
          },
          {
            "title": "Intelligent Color Management",
            "description": "Built-in spectrophotometer and AI-powered color matching system ensure accurate color reproduction across different substrates. Real-time color calibration maintains consistency throughout production runs."
          },
          {
            "title": "Automated Workflow Integration",
            "description": "Seamless integration with pre-press systems and MIS software streamlines production workflow. Automated job setup and changeover reduce downtime and increase productivity."
          },
          {
            "title": "Substrate Versatility",
            "description": "Handles a wide range of corrugated substrates from E-flute to heavy-duty triple-wall board. Automatic substrate detection and adjustment ensure optimal print quality on any material."
          }
        ]
      },
      "applications": [
        {
          "icon": "📦",
          "title": "E-commerce Packaging",
          "items": [
            "Custom branded boxes",
            "Shipping cartons",
            "Product displays",
            "Promotional packaging"
          ]
        },
        {
          "icon": "🍕",
          "title": "Food & Beverage",
          "items": [
            "Pizza boxes",
            "Takeout containers",
            "Beverage carriers",
            "Food display boxes"
          ]
        },
        {
          "icon": "🎁",
          "title": "Retail Packaging",
          "items": [
            "Point-of-sale displays",
            "Gift boxes",
            "Product packaging",
            "Shelf-ready packaging"
          ]
        },
        {
          "icon": "🏭",
          "title": "Industrial Packaging",
          "items": [
            "Heavy-duty shipping boxes",
            "Parts packaging",
            "Protective packaging",
            "Bulk containers"
          ]
        }
      ],
      "technicalSpecs": [
        { "parameter": "Max. Printing Width", "value": "1600 mm" },
        { "parameter": "Max. Printing Speed", "value": "160 m/min" },
        { "parameter": "Print Resolution", "value": "1200 x 1200 dpi" },
        { "parameter": "Number of Colors", "value": "CMYK + White + Varnish" },
        { "parameter": "Substrate Thickness", "value": "1.5 - 12 mm" },
        { "parameter": "Ink Type", "value": "Water-based UV" },
        { "parameter": "Power Consumption", "value": "45 kW" },
        { "parameter": "Machine Dimensions", "value": "12000 x 3500 x 2800 mm" }
      ],
      "downloads": [
        { "title": "Glory160X HD Brochure", "type": "PDF", "size": "4.2 MB", "language": "English", "url": "#" },
        { "title": "Technical Specification Sheet", "type": "PDF", "size": "1.1 MB", "language": "English", "url": "#" },
        { "title": "Installation Requirements", "type": "PDF", "size": "2.3 MB", "language": "English", "url": "#" },
        { "title": "Dimensional Drawings", "type": "DWG", "size": "3.5 MB", "language": "AutoCAD", "url": "#" }
      ]
    },
    {
      "id": "techprint-pro-2500",
      "name": "TechPrint Pro 2500",
      "subtitle": "Professional Digital Printing Solution",
      "category": "Digital Printing Machines",
      "supplier": "techpack",
      "description": "TechPrint Pro 2500 is a versatile digital printing machine designed for medium to high-volume production. It combines speed, quality, and reliability to meet the demanding needs of modern packaging manufacturers.",
      "keyFeatures": [
        "Printing width up to 2500 mm",
        "Speed up to 180 m/min",
        "Advanced color management system",
        "Low ink consumption",
        "Easy maintenance and operation"
      ],
      "image": "images/product-digital-printer.jpg",
      "mainFeatures": {
        "title": "Professional Performance for Demanding Applications",
        "description": "TechPrint Pro 2500 delivers professional-grade performance with advanced features designed for high-volume production environments.",
        "features": [
          {
            "title": "Wide Format Capability",
            "description": "With a maximum printing width of 2500 mm, the TechPrint Pro handles large-format jobs with ease. Perfect for oversized displays and industrial packaging applications."
          },
          {
            "title": "High-Speed Production",
            "description": "Achieve production speeds up to 180 m/min without compromising quality. Advanced print head technology and optimized ink delivery ensure consistent results at maximum speed."
          },
          {
            "title": "Smart Ink Management",
            "description": "Intelligent ink monitoring and delivery system minimizes waste and reduces operating costs. Automatic ink level detection and alerts prevent production interruptions."
          },
          {
            "title": "User-Friendly Interface",
            "description": "Intuitive touchscreen control panel with guided workflows simplifies operation. Remote monitoring and diagnostics enable proactive maintenance and minimize downtime."
          }
        ]
      },
      "applications": [
        {
          "icon": "📦",
          "title": "Large Format Displays",
          "items": ["Trade show displays", "Retail POP displays", "Exhibition graphics", "Promotional signage"]
        },
        {
          "icon": "🏭",
          "title": "Industrial Packaging",
          "items": ["Heavy-duty containers", "Bulk packaging", "Shipping boxes", "Protective packaging"]
        },
        {
          "icon": "🎨",
          "title": "Custom Graphics",
          "items": ["Branded packaging", "Limited editions", "Seasonal designs", "Personalized boxes"]
        },
        {
          "icon": "🚚",
          "title": "Logistics & Distribution",
          "items": ["Shipping cartons", "Distribution boxes", "Warehouse packaging", "Transport containers"]
        }
      ],
      "technicalSpecs": [
        { "parameter": "Max. Printing Width", "value": "2500 mm" },
        { "parameter": "Max. Printing Speed", "value": "180 m/min" },
        { "parameter": "Print Resolution", "value": "1200 x 600 dpi" },
        { "parameter": "Number of Colors", "value": "CMYK + 2 Spot Colors" },
        { "parameter": "Substrate Thickness", "value": "2.0 - 15 mm" },
        { "parameter": "Ink Type", "value": "Water-based" },
        { "parameter": "Power Consumption", "value": "55 kW" },
        { "parameter": "Machine Dimensions", "value": "15000 x 4000 x 3000 mm" }
      ],
      "downloads": [
        { "title": "TechPrint Pro 2500 Brochure", "type": "PDF", "size": "3.8 MB", "language": "English", "url": "#" },
        { "title": "Technical Data Sheet", "type": "PDF", "size": "950 KB", "language": "English", "url": "#" },
        { "title": "Installation Guide", "type": "PDF", "size": "2.1 MB", "language": "English", "url": "#" }
      ]
    },
    {
      "id": "autocut-pro-1060",
      "name": "AutoCut Pro 1060",
      "subtitle": "Precision Die-Cutting Machine",
      "category": "Die-Cutting Machines",
      "supplier": "techpack",
      "description": "AutoCut Pro 1060 is a high-precision die-cutting machine designed for efficient production of corrugated packaging. With advanced automation and precision control, it delivers consistent quality and high productivity.",
      "keyFeatures": [
        "Maximum cutting speed of 8000 sheets/hour",
        "Automatic feeding and stacking",
        "Precision registration system",
        "Quick die change system",
        "Energy-efficient operation"
      ],
      "image": "images/product-die-cutter.webp",
      "mainFeatures": {
        "title": "Precision and Productivity Combined",
        "description": "AutoCut Pro 1060 combines precision die-cutting with high-speed automation to maximize productivity while maintaining exceptional quality.",
        "features": [
          {
            "title": "High-Speed Die-Cutting",
            "description": "Advanced servo-driven cutting system achieves speeds up to 8000 sheets per hour. Precision timing and control ensure consistent quality at maximum speed."
          },
          {
            "title": "Automatic Feeding System",
            "description": "Intelligent sheet feeding with automatic alignment and registration. Vacuum-assisted feeding ensures accurate positioning and prevents double feeds."
          },
          {
            "title": "Quick Die Change",
            "description": "Innovative die change system reduces setup time to under 10 minutes. Magnetic die mounting and automatic height adjustment streamline changeovers."
          },
          {
            "title": "Waste Stripping System",
            "description": "Automated waste removal and separation system improves efficiency and reduces manual labor. Adjustable stripping tools accommodate various die patterns."
          }
        ]
      },
      "applications": [
        {
          "icon": "📦",
          "title": "Folding Cartons",
          "items": ["Food packaging", "Pharmaceutical boxes", "Cosmetic packaging", "Retail cartons"]
        },
        {
          "icon": "🎁",
          "title": "Display Packaging",
          "items": ["Counter displays", "Floor stands", "Shelf displays", "POP materials"]
        },
        {
          "icon": "📄",
          "title": "Die-Cut Shapes",
          "items": ["Custom shapes", "Window patching", "Embossing", "Creasing"]
        },
        {
          "icon": "🏷️",
          "title": "Labels & Tags",
          "items": ["Product labels", "Hang tags", "Security labels", "Promotional stickers"]
        }
      ],
      "technicalSpecs": [
        { "parameter": "Max. Sheet Size", "value": "1060 x 760 mm" },
        { "parameter": "Min. Sheet Size", "value": "300 x 300 mm" },
        { "parameter": "Max. Cutting Speed", "value": "8000 sheets/hour" },
        { "parameter": "Max. Cutting Pressure", "value": "300 tons" },
        { "parameter": "Substrate Thickness", "value": "0.3 - 8 mm" },
        { "parameter": "Registration Accuracy", "value": "±0.1 mm" },
        { "parameter": "Power Consumption", "value": "35 kW" },
        { "parameter": "Machine Dimensions", "value": "8500 x 3200 x 2500 mm" }
      ],
      "downloads": [
        { "title": "AutoCut Pro 1060 Brochure", "type": "PDF", "size": "3.5 MB", "language": "English", "url": "#" },
        { "title": "Technical Specifications", "type": "PDF", "size": "1.2 MB", "language": "English", "url": "#" },
        { "title": "Safety Manual", "type": "PDF", "size": "2.8 MB", "language": "English", "url": "#" }
      ]
    },
    {
      "id": "flexomaster-ffg-3000",
      "name": "FlexoMaster FFG-3000",
      "subtitle": "High-Performance FFG Inline Production Line",
      "category": "FFG Inline",
      "supplier": "global-corrugated",
      "description": "FlexoMaster FFG-3000 is a complete inline flexographic printing and converting solution for corrugated board production. It combines printing, die-cutting, folding, and gluing in one continuous process for maximum efficiency.",
      "keyFeatures": [
        "Production speed up to 300 m/min",
        "6-color flexographic printing",
        "Inline die-cutting and folding",
        "Automatic order changeover",
        "Industry 4.0 ready"
      ],
      "image": "images/product-flexo-printer.jpg",
      "mainFeatures": {
        "title": "Complete Inline Production Solution",
        "description": "FlexoMaster FFG-3000 integrates all production steps in one continuous line, maximizing efficiency and reducing handling costs.",
        "features": [
          {
            "title": "High-Speed Flexo Printing",
            "description": "6-color flexographic printing unit with servo-driven anilox rollers and automatic register control. Achieves production speeds up to 300 m/min with consistent quality."
          },
          {
            "title": "Inline Die-Cutting",
            "description": "Integrated rotary die-cutting station with automatic die positioning and pressure control. Quick-change die system minimizes setup time between jobs."
          },
          {
            "title": "Folding and Gluing",
            "description": "Precision folding section with multiple folding configurations. Hot-melt gluing system with automatic glue application and temperature control."
          },
          {
            "title": "Automated Stacking",
            "description": "High-speed automatic stacker with count separation and bundle formation. Integrated quality control system rejects defective boxes automatically."
          }
        ]
      },
      "applications": [
        {
          "icon": "📦",
          "title": "Standard Boxes",
          "items": ["RSC boxes", "Half-slotted boxes", "Full overlap boxes", "Telescope boxes"]
        },
        {
          "icon": "🍕",
          "title": "Food Packaging",
          "items": ["Pizza boxes", "Takeout containers", "Bakery boxes", "Produce boxes"]
        },
        {
          "icon": "🚚",
          "title": "Shipping Containers",
          "items": ["E-commerce boxes", "Distribution cartons", "Export boxes", "Heavy-duty containers"]
        },
        {
          "icon": "🎨",
          "title": "Printed Packaging",
          "items": ["Branded boxes", "Retail packaging", "Display boxes", "Promotional packaging"]
        }
      ],
      "technicalSpecs": [
        { "parameter": "Max. Sheet Width", "value": "3000 mm" },
        { "parameter": "Max. Production Speed", "value": "300 m/min" },
        { "parameter": "Number of Printing Colors", "value": "6 colors" },
        { "parameter": "Board Thickness Range", "value": "1.5 - 12 mm" },
        { "parameter": "Die-Cutting Method", "value": "Rotary" },
        { "parameter": "Gluing System", "value": "Hot-melt" },
        { "parameter": "Power Consumption", "value": "180 kW" },
        { "parameter": "Machine Length", "value": "45000 mm" }
      ],
      "downloads": [
        { "title": "FlexoMaster FFG-3000 Brochure", "type": "PDF", "size": "5.2 MB", "language": "English", "url": "#" },
        { "title": "Technical Specifications", "type": "PDF", "size": "1.8 MB", "language": "English", "url": "#" },
        { "title": "Installation Requirements", "type": "PDF", "size": "3.1 MB", "language": "English", "url": "#" },
        { "title": "Production Line Layout", "type": "DWG", "size": "4.5 MB", "language": "AutoCAD", "url": "#" }
      ]
    }
  ]
};

// Get product ID from URL
function getProductIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

// Find product by ID
function findProductById(productId) {
    return productsData.products.find(p => p.id === productId);
}

// Load product data
function loadProductData() {
    const productId = getProductIdFromURL();
    
    if (!productId) {
        console.error('No product ID specified');
        document.getElementById('product-name').textContent = 'Product Not Found';
        return;
    }

    const product = findProductById(productId);
    
    if (!product) {
        console.error('Product not found:', productId);
        document.getElementById('product-name').textContent = 'Product Not Found';
        return;
    }

    // Update page title
    document.getElementById('page-title').textContent = `${product.name} | NEXUS GLOBAL HOLDINGS`;
    
    // Update breadcrumb
    document.getElementById('breadcrumb-product').textContent = product.name;
    
    // Update product hero
    document.getElementById('product-name').textContent = product.name;
    document.getElementById('product-subtitle').textContent = product.subtitle;
    document.getElementById('product-description').textContent = product.description;
    document.getElementById('product-image').src = product.image;
    document.getElementById('product-image').alt = product.name;
    
    // Update key features
    const featuresListEl = document.getElementById('product-key-features');
    featuresListEl.innerHTML = '';
    product.keyFeatures.forEach(feature => {
        const li = document.createElement('li');
        li.textContent = feature;
        featuresListEl.appendChild(li);
    });
    
    // Update main features
    document.getElementById('features-title').textContent = product.mainFeatures.title;
    document.getElementById('features-description').textContent = product.mainFeatures.description;
    
    const featuresGridEl = document.getElementById('features-grid');
    featuresGridEl.innerHTML = '';
    product.mainFeatures.features.forEach(feature => {
        const card = document.createElement('div');
        card.className = 'feature-card';
        card.innerHTML = `
            <h3>${feature.title}</h3>
            <p>${feature.description}</p>
        `;
        featuresGridEl.appendChild(card);
    });
    
    // Update applications
    const applicationsGridEl = document.getElementById('applications-grid');
    applicationsGridEl.innerHTML = '';
    product.applications.forEach(app => {
        const card = document.createElement('div');
        card.className = 'application-card';
        card.innerHTML = `
            <div class="application-icon">${app.icon}</div>
            <h3>${app.title}</h3>
            <ul>
                ${app.items.map(item => `<li>${item}</li>`).join('')}
            </ul>
        `;
        applicationsGridEl.appendChild(card);
    });
    
    // Update technical specs
    document.getElementById('spec-model-name').textContent = product.name;
    const specsTbodyEl = document.getElementById('specs-tbody');
    specsTbodyEl.innerHTML = '';
    product.technicalSpecs.forEach(spec => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${spec.parameter}</td>
            <td>${spec.value}</td>
        `;
        specsTbodyEl.appendChild(row);
    });
    
    // Update downloads
    const downloadsGridEl = document.getElementById('downloads-grid');
    downloadsGridEl.innerHTML = '';
    product.downloads.forEach(download => {
        const card = document.createElement('div');
        card.className = 'download-card';
        card.innerHTML = `
            <h3>${download.title}</h3>
            <div class="download-meta">
                <span>${download.type}</span>
                <span>${download.size}</span>
                <span>${download.language}</span>
            </div>
            <a href="${download.url}" class="download-btn">Download ${download.type}</a>
        `;
        downloadsGridEl.appendChild(card);
    });
    
    console.log('Product data loaded successfully:', product.name);
}

// Tab switching
function initTabs() {
    const tabs = document.querySelectorAll('.product-tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and contents
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(tc => tc.classList.remove('active'));
            
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Show corresponding content
            const tabId = tab.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// Form submission
function initContactForm() {
    const form = document.getElementById('product-contact-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your inquiry! We will contact you shortly.');
        form.reset();
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    loadProductData();
    initTabs();
    initContactForm();
});
