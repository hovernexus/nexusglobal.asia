// Company Detail Page Data Loader
// Loads company information from JSON files and displays on the page

document.addEventListener('DOMContentLoaded', function() {
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const companyId = urlParams.get('id');
    const companyType = urlParams.get('type'); // 'supplier' or 'customer'

    if (!companyId || !companyType) {
        showError('Invalid company ID or type');
        return;
    }

    // Load company data based on type
    if (companyType === 'supplier') {
        loadSupplierData(companyId);
    } else if (companyType === 'customer' || companyType === 'buyer') {
        loadCustomerData(companyId);
    } else {
        showError('Invalid company type');
    }
});

// Load supplier data from products-complete.json or localStorage
function loadSupplierData(supplierId) {
    // First check if this is a newly registered supplier in localStorage
    const registrations = JSON.parse(localStorage.getItem('supplierRegistrations') || '[]');
    const localSupplier = registrations.find(r => r.id === supplierId);
    
    if (localSupplier) {
        // Display newly registered supplier from localStorage
        displayNewSupplierInfo(localSupplier);
        return;
    }
    
    // If not in localStorage, load from JSON file
    fetch('data/products-complete.json')
        .then(response => response.json())
        .then(data => {
            // Find supplier in the data
            const supplier = data.suppliers.find(s => s.id === supplierId);
            
            if (!supplier) {
                showError('Supplier not found');
                return;
            }

            // Display supplier information
            displaySupplierInfo(supplier, data.products);
        })
        .catch(error => {
            console.error('Error loading supplier data:', error);
            showError('Failed to load supplier data');
        });
}

// Load customer data from registered-companies.json
function loadCustomerData(customerId) {
    fetch('data/registered-companies.json')
        .then(response => response.json())
        .then(data => {
            // Find customer in the data
            const customer = data.companies.find(c => c.id === customerId);
            
            if (!customer) {
                showError('Customer not found');
                return;
            }

            // Display customer information
            displayCustomerInfo(customer);
        })
        .catch(error => {
            console.error('Error loading customer data:', error);
            showError('Failed to load customer data');
        });
}

// Display supplier information
function displaySupplierInfo(supplier, allProducts) {
    // Update page title
    document.getElementById('page-title').textContent = `${supplier.name} | NEXUS GLOBAL HOLDINGS`;
    document.getElementById('breadcrumb-company').textContent = supplier.name;
    
    // Update company hero section
    document.getElementById('company-name').textContent = supplier.name;
    document.getElementById('company-location').textContent = `${supplier.location || 'China'}`;
    document.getElementById('company-description').textContent = supplier.description || 'Leading manufacturer of corrugated packaging equipment with advanced technology and reliable quality.';

    // Filter products by supplier
    const supplierProducts = allProducts.filter(p => p.supplierId === supplier.id);

    // Display company stats (use supplier.stats if available, otherwise use defaults)
    const stats = supplier.stats || {};
    const statsHTML = `
        <div class="stat-card">
            <div class="stat-number">${stats.productModels || (supplierProducts.length + '+')}</div>
            <div class="stat-label">Product Models</div>
        </div>
        <div class="stat-card">
            <div class="stat-number">${stats.yearsExperience || '15+'}</div>
            <div class="stat-label">Years Experience</div>
        </div>
        <div class="stat-card">
            <div class="stat-number">${stats.clientsServed || '500+'}</div>
            <div class="stat-label">Clients Served</div>
        </div>
        <div class="stat-card">
            <div class="stat-number">${stats.satisfactionRate || '98%'}</div>
            <div class="stat-label">Satisfaction Rate</div>
        </div>
    `;
    document.getElementById('company-stats').innerHTML = statsHTML;

    // Display products
    if (supplierProducts.length > 0) {
        const productsHTML = supplierProducts.map(product => {
            // Get product image - use first image from images array or placeholder
            const productImage = (product.images && product.images.length > 0) ? product.images[0] : 'images/product-placeholder.jpg';
            // Get product name - use English name if available, otherwise fallback to Chinese name
            const productName = product.fullNameEn || product.fullName || product.name || 'Product';
            // Get product description
            const productDesc = product.description || 'High-quality packaging equipment with advanced technology.';
            
            return `
            <div class="product-card" onclick="window.location.href='product-detail.html?id=${product.id}'">
                <img src="${productImage}" alt="${productName}" class="product-card-image" onerror="this.src='images/product-placeholder.jpg'">
                <div class="product-card-content">
                    <h3>${productName}</h3>
                    <p class="product-card-subtitle">${product.model || 'Model'}</p>
                    <p class="product-card-description">${productDesc}</p>
                    <a href="product-detail.html?id=${product.id}" class="product-card-cta">View Details →</a>
                </div>
            </div>
            `;
        }).join('');
        document.getElementById('products-grid').innerHTML = productsHTML;
    } else {
        document.getElementById('products-section').style.display = 'none';
    }

    // Display certifications
    const certificationsHTML = `
        <div class="certification-badge">
            <div class="certification-name">ISO 9001</div>
        </div>
        <div class="certification-badge">
            <div class="certification-name">CE Certified</div>
        </div>
        <div class="certification-badge">
            <div class="certification-name">Quality Assured</div>
        </div>
    `;
    document.getElementById('certifications-grid').innerHTML = certificationsHTML;

    // Display contact info
    const contactHTML = `
        <div class="contact-item">
            <h3>Email</h3>
            <p>${supplier.email || 'info@nexusglobal.asia'}</p>
        </div>
        <div class="contact-item">
            <h3>Phone</h3>
            <p>${supplier.phone || '+86 123 4567 8900'}</p>
        </div>
        <div class="contact-item">
            <h3>Location</h3>
            <p>${supplier.location || supplier.city || 'China'}</p>
        </div>
        ${supplier.website ? `
        <div class="contact-item">
            <h3>Website</h3>
            <p><a href="${supplier.website}" target="_blank" style="color: #4A90E2; text-decoration: none;">${supplier.website}</a></p>
        </div>
        ` : ''}
    `;
    document.getElementById('contact-info').innerHTML = contactHTML;
    document.getElementById('contact-button').href = `contact.html?company=${supplier.id}`;
}

// Display customer information
function displayCustomerInfo(customer) {
    // Update page title
    document.getElementById('page-title').textContent = `${customer.companyName} | NEXUS GLOBAL HOLDINGS`;
    document.getElementById('breadcrumb-company').textContent = customer.companyName;
    
    // Display company logo if available
    if (customer.logo) {
        const logoContainer = document.getElementById('company-logo-container');
        const logoImg = document.getElementById('company-logo');
        logoImg.src = customer.logo;
        logoContainer.style.display = 'block';
    }
    
    // Update company hero section
    document.getElementById('company-name').textContent = customer.companyName;
    document.getElementById('company-location').textContent = `${customer.city ? customer.city + ', ' : ''}${customer.country || 'Mexico'}`;
    document.getElementById('company-description').textContent = customer.aboutUs || customer.description || customer.businessDescription || 'Leading corrugated packaging manufacturer committed to quality and innovation.';

    // Display company stats
    const statsHTML = `
        <div class="stat-card">
            <div class="stat-number">${customer.foundedYear || 'N/A'}</div>
            <div class="stat-label">Founded Year</div>
        </div>
        <div class="stat-card">
            <div class="stat-number">${customer.industry || 'Packaging'}</div>
            <div class="stat-label">Industry</div>
        </div>
        <div class="stat-card">
            <div class="stat-number">${customer.city || customer.country}</div>
            <div class="stat-label">Location</div>
        </div>
        <div class="stat-card">
            <div class="stat-number">${customer.status === 'verified' ? 'Verified' : 'Pending'}</div>
            <div class="stat-label">Status</div>
        </div>
    `;
    document.getElementById('company-stats').innerHTML = statsHTML;

    // Hide products section for customers
    document.getElementById('products-section').style.display = 'none';

    // Display certifications
    const certificationsHTML = `
        <div class="certification-badge">
            <div class="certification-name">Verified Member</div>
        </div>
        <div class="certification-badge">
            <div class="certification-name">Quality Standards</div>
        </div>
        <div class="certification-badge">
            <div class="certification-name">Industry Partner</div>
        </div>
    `;
    document.getElementById('certifications-grid').innerHTML = certificationsHTML;

    // Display contact info
    let contactHTML = '';
    
    if (customer.ceo) {
        contactHTML += `
        <div class="contact-item">
            <h3>CEO/Director</h3>
            <p>${customer.ceo}</p>
        </div>`;
    }
    
    if (customer.email) {
        contactHTML += `
        <div class="contact-item">
            <h3>Email</h3>
            <p><a href="mailto:${customer.email}">${customer.email}</a></p>
        </div>`;
    }
    
    if (customer.phone) {
        contactHTML += `
        <div class="contact-item">
            <h3>Phone</h3>
            <p>${customer.phone}</p>
        </div>`;
    }
    
    if (customer.website) {
        contactHTML += `
        <div class="contact-item">
            <h3>Website</h3>
            <p><a href="${customer.website}" target="_blank" rel="noopener noreferrer">${customer.website}</a></p>
        </div>`;
    }
    
    if (customer.address) {
        contactHTML += `
        <div class="contact-item">
            <h3>Address</h3>
            <p>${customer.address}</p>
        </div>`;
    }
    
    if (customer.businessScope && customer.businessScope.length > 0) {
        contactHTML += `
        <div class="contact-item">
            <h3>Business Scope</h3>
            <p>${customer.businessScope.join(', ')}</p>
        </div>`;
    }
    document.getElementById('contact-info').innerHTML = contactHTML;
    document.getElementById('contact-button').href = `contact.html?company=${customer.id}`;
}

// Show error message
function showError(message) {
    document.getElementById('company-name').textContent = 'Error';
    document.getElementById('company-location').textContent = '';
    document.getElementById('company-description').textContent = message;
    document.getElementById('company-stats').style.display = 'none';
    document.getElementById('products-section').style.display = 'none';
    document.getElementById('certifications-section').style.display = 'none';
    document.getElementById('contact-section').style.display = 'none';
}




// Display newly registered supplier information from localStorage
function displayNewSupplierInfo(supplier) {
    // Display company name and location
    document.getElementById('company-name').textContent = supplier.companyName || 'New Supplier';
    document.getElementById('company-location').textContent = supplier.country || 'Pending Review';
    
    // Display company description
    document.getElementById('company-description').textContent = supplier.description || 'This supplier is pending review. More information will be available after verification.';
    
    // Display company stats (default values for new suppliers)
    const statsHTML = `
        <div class="stat-item">
            <div class="stat-number">Pending</div>
            <div class="stat-label">Product Models</div>
        </div>
        <div class="stat-item">
            <div class="stat-number">New</div>
            <div class="stat-label">Years Experience</div>
        </div>
        <div class="stat-item">
            <div class="stat-number">-</div>
            <div class="stat-label">Clients Served</div>
        </div>
        <div class="stat-item">
            <div class="stat-number">-</div>
            <div class="stat-label">Satisfaction Rate</div>
        </div>
    `;
    document.getElementById('company-stats').innerHTML = statsHTML;
    
    // Hide products section for new suppliers
    document.getElementById('products-section').style.display = 'none';
    
    // Display certifications (if any)
    if (supplier.certifications && supplier.certifications.length > 0) {
        const certificationsHTML = supplier.certifications.map(cert => `
            <div class="certification-item">
                <h3>${cert}</h3>
            </div>
        `).join('');
        document.getElementById('certifications-list').innerHTML = certificationsHTML;
    } else {
        document.getElementById('certifications-section').style.display = 'none';
    }
    
    // Display contact information
    const contactHTML = `
        <div class="contact-item">
            <h3>Email</h3>
            <p>${supplier.email || 'Pending verification'}</p>
        </div>
        <div class="contact-item">
            <h3>Phone</h3>
            <p>${supplier.phone || 'Pending verification'}</p>
        </div>
        <div class="contact-item">
            <h3>Location</h3>
            <p>${supplier.country || 'Pending verification'}</p>
        </div>
    `;
    document.getElementById('contact-info').innerHTML = contactHTML;
    document.getElementById('contact-button').href = `contact.html?company=${supplier.id}`;
    
    // Show pending review message
    const productsSection = document.getElementById('products-section');
    if (productsSection) {
        productsSection.innerHTML = `
            <h2>Products & Solutions</h2>
            <div class="pending-message" style="text-align: center; padding: 40px; background: #f8f9fa; border-radius: 8px; margin: 20px 0;">
                <p style="font-size: 18px; color: #666; margin-bottom: 10px;">This supplier is pending review.</p>
                <p style="font-size: 14px; color: #999;">Registration ID: ${supplier.id}</p>
                <p style="font-size: 14px; color: #999; margin-top: 10px;">Products will be displayed after verification.</p>
            </div>
        `;
        productsSection.style.display = 'block';
    }
}

