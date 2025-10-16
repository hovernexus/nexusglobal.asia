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
    } else if (companyType === 'customer') {
        loadCustomerData(companyId);
    } else {
        showError('Invalid company type');
    }
});

// Load supplier data from products-complete.json
function loadSupplierData(supplierId) {
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

    // Display company stats
    const statsHTML = `
        <div class="stat-card">
            <div class="stat-number">${supplierProducts.length}+</div>
            <div class="stat-label">Product Models</div>
        </div>
        <div class="stat-card">
            <div class="stat-number">15+</div>
            <div class="stat-label">Years Experience</div>
        </div>
        <div class="stat-card">
            <div class="stat-number">500+</div>
            <div class="stat-label">Clients Served</div>
        </div>
        <div class="stat-card">
            <div class="stat-number">98%</div>
            <div class="stat-label">Satisfaction Rate</div>
        </div>
    `;
    document.getElementById('company-stats').innerHTML = statsHTML;

    // Display products
    if (supplierProducts.length > 0) {
        const productsHTML = supplierProducts.map(product => `
            <div class="product-card" onclick="window.location.href='product-detail-dynamic.html?id=${product.id}'">
                <img src="${product.image || 'images/product-placeholder.jpg'}" alt="${product.name}" class="product-card-image" onerror="this.src='images/product-placeholder.jpg'">
                <div class="product-card-content">
                    <h3>${product.name}</h3>
                    <p class="product-card-subtitle">${product.category || 'Packaging Equipment'}</p>
                    <p class="product-card-description">${product.description || 'High-quality packaging equipment with advanced technology.'}</p>
                    <a href="product-detail-dynamic.html?id=${product.id}" class="product-card-cta">View Details →</a>
                </div>
            </div>
        `).join('');
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
            <p>${supplier.location || 'China'}</p>
        </div>
    `;
    document.getElementById('contact-info').innerHTML = contactHTML;
    document.getElementById('contact-button').href = `contact.html?company=${supplier.id}`;
}

// Display customer information
function displayCustomerInfo(customer) {
    // Update page title
    document.getElementById('page-title').textContent = `${customer.companyName} | NEXUS GLOBAL HOLDINGS`;
    document.getElementById('breadcrumb-company').textContent = customer.companyName;
    
    // Update company hero section
    document.getElementById('company-name').textContent = customer.companyName;
    document.getElementById('company-location').textContent = `${customer.country || 'Mexico'}`;
    document.getElementById('company-description').textContent = customer.businessDescription || 'Leading corrugated packaging manufacturer committed to quality and innovation.';

    // Display company stats
    const statsHTML = `
        <div class="stat-card">
            <div class="stat-number">${customer.country || 'Mexico'}</div>
            <div class="stat-label">Location</div>
        </div>
        <div class="stat-card">
            <div class="stat-number">${customer.companyType || 'Manufacturer'}</div>
            <div class="stat-label">Business Type</div>
        </div>
        <div class="stat-card">
            <div class="stat-number">NEXUS</div>
            <div class="stat-label">Partner Since</div>
        </div>
        <div class="stat-card">
            <div class="stat-number">Verified</div>
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
    const contactHTML = `
        <div class="contact-item">
            <h3>Contact Person</h3>
            <p>${customer.contactPerson || 'N/A'}</p>
        </div>
        <div class="contact-item">
            <h3>Email</h3>
            <p>${customer.email || 'info@nexusglobal.asia'}</p>
        </div>
        <div class="contact-item">
            <h3>Country</h3>
            <p>${customer.country || 'Mexico'}</p>
        </div>
    `;
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

