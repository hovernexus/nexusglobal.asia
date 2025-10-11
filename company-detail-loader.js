// Company Detail Loader
// This script loads company data dynamically based on URL parameters

// Company data (embedded to avoid CORS issues)
const companiesData = {
  "suppliers": [
    {
      "id": "techpack",
      "name": "TechPack Solutions Ltd.",
      "location": "Shanghai, China",
      "type": "supplier",
      "description": "TechPack Solutions Ltd. is a leading manufacturer of digital printing and die-cutting equipment for the corrugated packaging industry. With over 15 years of experience and a commitment to innovation, we deliver cutting-edge solutions that help our customers achieve superior quality and productivity.",
      "stats": [
        { "number": "15+", "label": "Years Experience" },
        { "number": "2000+", "label": "Installations Worldwide" },
        { "number": "50+", "label": "Countries Served" },
        { "number": "200+", "label": "Employees" }
      ],
      "products": [
        {
          "id": "techprint-pro-2500",
          "name": "TechPrint Pro 2500",
          "subtitle": "Professional Digital Printing Solution",
          "description": "TechPrint Pro 2500 is a versatile digital printing machine designed for medium to high-volume production. It combines speed, quality, and reliability to meet the demanding needs of modern packaging manufacturers.",
          "image": "images/product-digital-printer.jpg"
        },
        {
          "id": "autocut-pro-1060",
          "name": "AutoCut Pro 1060",
          "subtitle": "Precision Die-Cutting Machine",
          "description": "AutoCut Pro 1060 is a high-precision die-cutting machine designed for efficient production of corrugated packaging. With advanced automation and precision control, it delivers consistent quality and high productivity.",
          "image": "images/product-die-cutter.webp"
        }
      ],
      "certifications": [
        { "name": "ISO 9001", "image": "images/cert-iso9001.png" },
        { "name": "CE", "image": "images/cert-ce.png" },
        { "name": "ISO 14001", "image": "images/cert-iso14001.png" }
      ],
      "contact": {
        "email": "sales@techpack-solutions.com",
        "phone": "+86 21 1234 5678",
        "website": "www.techpack-solutions.com"
      }
    },
    {
      "id": "global-corrugated",
      "name": "Global Corrugated Equipment Co.",
      "location": "Munich, Germany",
      "type": "supplier",
      "description": "Global Corrugated Equipment Co. is a premier manufacturer of complete corrugated production lines and FFG inline systems. With German engineering excellence and a global service network, we provide comprehensive solutions for the packaging industry worldwide.",
      "stats": [
        { "number": "25+", "label": "Years Experience" },
        { "number": "500+", "label": "Production Lines Installed" },
        { "number": "80+", "label": "Countries Served" },
        { "number": "350+", "label": "Employees" }
      ],
      "products": [
        {
          "id": "flexomaster-ffg-3000",
          "name": "FlexoMaster FFG-3000",
          "subtitle": "High-Performance FFG Inline Production Line",
          "description": "FlexoMaster FFG-3000 is a complete inline flexographic printing and converting solution for corrugated board production. It combines printing, die-cutting, folding, and gluing in one continuous process for maximum efficiency.",
          "image": "images/product-flexo-printer.jpg"
        }
      ],
      "certifications": [
        { "name": "ISO 9001", "image": "images/cert-iso9001.png" },
        { "name": "CE", "image": "images/cert-ce.png" },
        { "name": "ISO 14001", "image": "images/cert-iso14001.png" },
        { "name": "ISO 45001", "image": "images/cert-iso45001.png" }
      ],
      "contact": {
        "email": "info@global-corrugated.de",
        "phone": "+49 89 1234 5678",
        "website": "www.global-corrugated.de"
      }
    }
  ],
  "customers": [
    {
      "id": "premium-packaging",
      "name": "Premium Packaging Industries",
      "location": "Los Angeles, United States",
      "type": "customer",
      "description": "Premium Packaging Industries is a leading corrugated packaging manufacturer specializing in e-commerce and retail packaging solutions. With state-of-the-art facilities and a commitment to sustainability, we serve major brands across North America.",
      "stats": [
        { "number": "30+", "label": "Years in Business" },
        { "number": "500M+", "label": "Boxes Produced Annually" },
        { "number": "1000+", "label": "Clients Served" },
        { "number": "800+", "label": "Employees" }
      ],
      "specialization": [
        "E-commerce Packaging",
        "Retail Display Packaging",
        "Custom Branded Boxes",
        "Sustainable Packaging Solutions"
      ],
      "equipment": [
        "Digital Printing Machines (3 units)",
        "FFG Inline Production Lines (2 lines)",
        "Die-Cutting Machines (4 units)",
        "Automated Packaging Systems"
      ],
      "certifications": [
        { "name": "FSC", "image": "images/cert-fsc.png" },
        { "name": "ISO 9001", "image": "images/cert-iso9001.png" },
        { "name": "ISO 14001", "image": "images/cert-iso14001.png" }
      ],
      "contact": {
        "email": "contact@premium-packaging.com",
        "phone": "+1 310 123 4567",
        "website": "www.premium-packaging.com"
      }
    },
    {
      "id": "asia-pacific-corrugated",
      "name": "Asia Pacific Corrugated Manufacturing",
      "location": "Singapore, Singapore",
      "type": "customer",
      "description": "Asia Pacific Corrugated Manufacturing is a premier packaging manufacturer serving the Asia-Pacific region. Specializing in food & beverage packaging, we combine advanced technology with strict quality control to deliver exceptional products.",
      "stats": [
        { "number": "20+", "label": "Years in Business" },
        { "number": "300M+", "label": "Boxes Produced Annually" },
        { "number": "500+", "label": "Clients Served" },
        { "number": "600+", "label": "Employees" }
      ],
      "specialization": [
        "Food & Beverage Packaging",
        "Export Packaging",
        "Industrial Packaging",
        "Custom Solutions"
      ],
      "equipment": [
        "Flexographic Printing Lines (3 lines)",
        "Digital Printing Machines (2 units)",
        "Corrugator Lines (2 lines)",
        "Automated Stacking Systems"
      ],
      "certifications": [
        { "name": "ISO 9001", "image": "images/cert-iso9001.png" },
        { "name": "ISO 22000", "image": "images/cert-iso22000.png" },
        { "name": "BRC", "image": "images/cert-brc.png" }
      ],
      "contact": {
        "email": "info@apc-manufacturing.sg",
        "phone": "+65 6123 4567",
        "website": "www.apc-manufacturing.sg"
      }
    }
  ]
};

// Get company ID from URL
function getCompanyIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

// Find company by ID
function findCompanyById(companyId) {
    // Search in suppliers
    let company = companiesData.suppliers.find(c => c.id === companyId);
    if (company) return company;
    
    // Search in customers
    company = companiesData.customers.find(c => c.id === companyId);
    return company;
}

// Load company data
function loadCompanyData() {
    const companyId = getCompanyIdFromURL();
    
    if (!companyId) {
        console.error('No company ID specified');
        document.getElementById('company-name').textContent = 'Company Not Found';
        return;
    }

    const company = findCompanyById(companyId);
    
    if (!company) {
        console.error('Company not found:', companyId);
        document.getElementById('company-name').textContent = 'Company Not Found';
        return;
    }

    // Update page title
    document.getElementById('page-title').textContent = `${company.name} | NEXUS GLOBAL HOLDINGS`;
    
    // Update breadcrumb
    document.getElementById('breadcrumb-company').textContent = company.name;
    
    // Update company hero
    document.getElementById('company-name').textContent = company.name;
    document.getElementById('company-location').textContent = company.location;
    document.getElementById('company-description').textContent = company.description;
    
    // Update company stats
    const statsEl = document.getElementById('company-stats');
    statsEl.innerHTML = '';
    company.stats.forEach(stat => {
        const card = document.createElement('div');
        card.className = 'stat-card';
        card.innerHTML = `
            <div class="stat-number">${stat.number}</div>
            <div class="stat-label">${stat.label}</div>
        `;
        statsEl.appendChild(card);
    });
    
    // Update products section (for suppliers)
    if (company.type === 'supplier' && company.products) {
        const productsGridEl = document.getElementById('products-grid');
        productsGridEl.innerHTML = '';
        company.products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="product-card-image">
                <div class="product-card-content">
                    <h3>${product.name}</h3>
                    <div class="product-card-subtitle">${product.subtitle}</div>
                    <div class="product-card-description">${product.description}</div>
                    <a href="product-detail-dynamic.html?id=${product.id}" class="product-card-cta">View Details →</a>
                </div>
            `;
            productsGridEl.appendChild(card);
        });
    } else if (company.type === 'customer') {
        // For customers, show specialization and equipment
        const productsSection = document.getElementById('products-section');
        productsSection.innerHTML = `
            <h2 class="section-title">Specialization</h2>
            <div class="products-grid">
                ${company.specialization.map(spec => `
                    <div class="product-card">
                        <div class="product-card-content">
                            <h3>${spec}</h3>
                        </div>
                    </div>
                `).join('')}
            </div>
            <h2 class="section-title" style="margin-top: 60px;">Equipment & Capabilities</h2>
            <div class="products-grid">
                ${company.equipment.map(equip => `
                    <div class="product-card">
                        <div class="product-card-content">
                            <h3>${equip}</h3>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }
    
    // Update certifications
    const certificationsGridEl = document.getElementById('certifications-grid');
    certificationsGridEl.innerHTML = '';
    company.certifications.forEach(cert => {
        const badge = document.createElement('div');
        badge.className = 'certification-badge';
        badge.innerHTML = `
            <div class="certification-name">${cert.name}</div>
        `;
        certificationsGridEl.appendChild(badge);
    });
    
    // Update contact info
    const contactInfoEl = document.getElementById('contact-info');
    contactInfoEl.innerHTML = `
        <div class="contact-item">
            <h3>Email</h3>
            <p>${company.contact.email}</p>
        </div>
        <div class="contact-item">
            <h3>Phone</h3>
            <p>${company.contact.phone}</p>
        </div>
        <div class="contact-item">
            <h3>Website</h3>
            <p>${company.contact.website}</p>
        </div>
    `;
    
    // Update contact button
    document.getElementById('contact-button').href = `mailto:${company.contact.email}`;
    
    console.log('Company data loaded successfully:', company.name);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    loadCompanyData();
});
