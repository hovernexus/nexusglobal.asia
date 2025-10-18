// Product Detail Loader
(function() {
    'use strict';

    // Get product ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (!productId) {
        showError('No product ID specified');
        return;
    }

    // Load product data
    loadProductData(productId);

    // Tab switching
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabName = button.getAttribute('data-tab');
            switchTab(tabName);
        });
    });

    function loadProductData(id) {
        fetch('data/products-complete.json')
            .then(response => response.json())
            .then(data => {
                // Find product in all products
                let product = null;
                for (const supplier of data.suppliers) {
                    for (const prod of data.products) {
                        if (prod.id === id && prod.supplierId === supplier.id) {
                            product = prod;
                            product.supplierInfo = supplier;
                            break;
                        }
                    }
                    if (product) break;
                }

                if (!product) {
                    showError('Product not found');
                    return;
                }

                displayProduct(product);
            })
            .catch(error => {
                console.error('Error loading product data:', error);
                showError('Failed to load product data');
            });
    }

    function displayProduct(product) {
        // Hide loading state
        document.getElementById('loading-state').style.display = 'none';
        document.getElementById('product-content').style.display = 'block';

        // Set breadcrumb
        document.getElementById('breadcrumb-product').textContent = product.fullNameEn || product.fullName || product.model;

        // Set product name and basic info
        document.getElementById('product-name').textContent = product.fullNameEn || product.fullName || product.model;
        document.getElementById('product-model').textContent = product.model || 'N/A';
        document.getElementById('product-category').textContent = product.category || 'N/A';
        document.getElementById('product-description').textContent = product.description || '';

        // Set main image
        const mainImage = document.getElementById('main-product-image');
        if (product.images && product.images.length > 0) {
            mainImage.src = product.images[0];
            mainImage.alt = product.fullNameEn || product.model;

            // Create thumbnails
            const thumbnailsContainer = document.getElementById('image-thumbnails');
            thumbnailsContainer.innerHTML = '';
            product.images.forEach((image, index) => {
                const thumbnail = document.createElement('div');
                thumbnail.className = 'thumbnail' + (index === 0 ? ' active' : '');
                thumbnail.innerHTML = `<img src="${image}" alt="Product image ${index + 1}">`;
                thumbnail.addEventListener('click', () => {
                    mainImage.src = image;
                    document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
                    thumbnail.classList.add('active');
                });
                thumbnailsContainer.appendChild(thumbnail);
            });
        } else {
            mainImage.src = 'images/product-placeholder.jpg';
            mainImage.alt = 'Product image not available';
        }

        // Set supplier info
        if (product.supplierInfo) {
            document.getElementById('supplier-name').textContent = product.supplierInfo.nameEn || product.supplierInfo.name;
            document.getElementById('supplier-link').href = `company-detail.html?id=${product.supplierId}&type=supplier`;
        }

        // Display features
        displayFeatures(product);

        // Display applications
        displayApplications(product);

        // Display specifications
        displaySpecifications(product);

        // Display downloads
        displayDownloads(product);

        // Display contact info
        displayContact(product);

        // Load related products
        loadRelatedProducts(product);
    }

    function displayFeatures(product) {
        const featuresContainer = document.getElementById('features-content');
        featuresContainer.innerHTML = '';

        if (product.keyFeatures && product.keyFeatures.length > 0) {
            product.keyFeatures.forEach(feature => {
                const featureItem = document.createElement('div');
                featureItem.className = 'feature-item';
                featureItem.innerHTML = `
                    <h3>✓ ${feature}</h3>
                `;
                featuresContainer.appendChild(featureItem);
            });
        } else {
            featuresContainer.innerHTML = '<p>No features information available.</p>';
        }
    }

    function displayApplications(product) {
        const applicationsContainer = document.getElementById('applications-content');
        applicationsContainer.innerHTML = '';

        if (product.applications && product.applications.length > 0) {
            product.applications.forEach(app => {
                const appItem = document.createElement('div');
                appItem.className = 'application-item';
                appItem.textContent = app;
                applicationsContainer.appendChild(appItem);
            });
        } else {
            applicationsContainer.innerHTML = '<p>No applications information available.</p>';
        }
    }

    function displaySpecifications(product) {
        const specificationsContainer = document.getElementById('specifications-content');
        specificationsContainer.innerHTML = '';

        if (product.specifications && Object.keys(product.specifications).length > 0) {
            for (const [key, value] of Object.entries(product.specifications)) {
                const specRow = document.createElement('div');
                specRow.className = 'spec-row';
                specRow.innerHTML = `
                    <div class="spec-label">${formatSpecLabel(key)}</div>
                    <div class="spec-value">${value}</div>
                `;
                specificationsContainer.appendChild(specRow);
            }
        } else {
            specificationsContainer.innerHTML = '<p>No technical specifications available.</p>';
        }
    }

    function formatSpecLabel(key) {
        // Convert camelCase to Title Case
        return key.replace(/([A-Z])/g, ' $1')
                  .replace(/^./, str => str.toUpperCase());
    }

    function displayDownloads(product) {
        const downloadsContainer = document.getElementById('downloads-content');
        downloadsContainer.innerHTML = '';

        const downloads = [];

        // Add brochure if available
        if (product.brochure) {
            downloads.push({
                name: 'Product Brochure',
                description: 'Detailed product information and specifications',
                url: product.brochure
            });
        }

        // Add manual if available
        if (product.manual) {
            downloads.push({
                name: 'User Manual',
                description: 'Operating instructions and maintenance guide',
                url: product.manual
            });
        }

        // Add video if available
        if (product.video) {
            downloads.push({
                name: 'Product Video',
                description: 'Watch product demonstration and features',
                url: product.video
            });
        }

        if (downloads.length > 0) {
            downloads.forEach(download => {
                const downloadItem = document.createElement('div');
                downloadItem.className = 'download-item';
                downloadItem.innerHTML = `
                    <div class="download-info">
                        <h3>${download.name}</h3>
                        <p>${download.description}</p>
                    </div>
                    <a href="${download.url}" class="download-button" target="_blank">
                        ${download.url.includes('youtube') || download.url.includes('youtu.be') ? 'Watch' : 'Download'}
                    </a>
                `;
                downloadsContainer.appendChild(downloadItem);
            });
        } else {
            downloadsContainer.innerHTML = '<p>No downloads available for this product.</p>';
        }
    }

    function displayContact(product) {
        const contactContainer = document.getElementById('contact-content');
        contactContainer.innerHTML = '';

        if (product.supplierInfo) {
            const contactDetails = document.createElement('div');
            contactDetails.className = 'contact-details';

            // Company name
            if (product.supplierInfo.nameEn || product.supplierInfo.name) {
                contactDetails.innerHTML += `
                    <div class="contact-item">
                        <strong>Company:</strong>
                        ${product.supplierInfo.nameEn || product.supplierInfo.name}
                    </div>
                `;
            }

            // Email
            if (product.supplierInfo.contact && product.supplierInfo.contact.email) {
                contactDetails.innerHTML += `
                    <div class="contact-item">
                        <strong>Email:</strong>
                        <a href="mailto:${product.supplierInfo.contact.email}">${product.supplierInfo.contact.email}</a>
                    </div>
                `;
            }

            // Phone
            if (product.supplierInfo.contact && product.supplierInfo.contact.phone) {
                contactDetails.innerHTML += `
                    <div class="contact-item">
                        <strong>Phone:</strong>
                        <a href="tel:${product.supplierInfo.contact.phone}">${product.supplierInfo.contact.phone}</a>
                    </div>
                `;
            }

            // Website
            if (product.supplierInfo.website) {
                contactDetails.innerHTML += `
                    <div class="contact-item">
                        <strong>Website:</strong>
                        <a href="${product.supplierInfo.website}" target="_blank">${product.supplierInfo.website}</a>
                    </div>
                `;
            }

            contactContainer.appendChild(contactDetails);
        } else {
            contactContainer.innerHTML = '<p>Contact information not available.</p>';
        }
    }

    function loadRelatedProducts(currentProduct) {
        fetch('data/products-complete.json')
            .then(response => response.json())
            .then(data => {
                // Find related products (same category or same supplier)
                const relatedProducts = data.products.filter(p => 
                    p.id !== currentProduct.id && 
                    (p.category === currentProduct.category || p.supplierId === currentProduct.supplierId)
                ).slice(0, 4);

                displayRelatedProducts(relatedProducts);
            })
            .catch(error => {
                console.error('Error loading related products:', error);
            });
    }

    function displayRelatedProducts(products) {
        const relatedProductsContainer = document.getElementById('related-products-grid');
        relatedProductsContainer.innerHTML = '';

        if (products.length === 0) {
            relatedProductsContainer.innerHTML = '<p>No related products available.</p>';
            return;
        }

        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.onclick = () => {
                window.location.href = `product-detail.html?id=${product.id}`;
            };

            const imageSrc = (product.images && product.images.length > 0) 
                ? product.images[0] 
                : 'images/product-placeholder.jpg';

            productCard.innerHTML = `
                <div class="product-card-image">
                    <img src="${imageSrc}" alt="${product.fullNameEn || product.model}">
                </div>
                <div class="product-card-content">
                    <h3>${product.fullNameEn || product.fullName || product.model}</h3>
                    <p>Model: ${product.model || 'N/A'}</p>
                    <p>Category: ${product.category || 'N/A'}</p>
                </div>
            `;

            relatedProductsContainer.appendChild(productCard);
        });
    }

    function switchTab(tabName) {
        // Remove active class from all buttons and panes
        document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));

        // Add active class to selected button and pane
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
        document.getElementById(`${tabName}-tab`).classList.add('active');
    }

    function showError(message) {
        const loadingState = document.getElementById('loading-state');
        loadingState.innerHTML = `
            <h2>Error</h2>
            <p>${message}</p>
            <a href="products.html" class="btn-primary">Back to Products</a>
        `;
    }
})();

