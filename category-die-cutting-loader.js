// Category Die-Cutting Page Loader
// Loads die-cutting products from products-complete.json

document.addEventListener('DOMContentLoaded', async function() {
    await loadDieCuttingProducts();
});

async function loadDieCuttingProducts() {
    try {
        const response = await fetch('data/products-complete.json');
        const data = await response.json();
        
        // Filter products by die_cutting category
        const dieCuttingProducts = data.products.filter(p => p.category === 'die_cutting');
        
        // Display products
        const productsGrid = document.getElementById('products-grid');
        if (productsGrid && dieCuttingProducts.length > 0) {
            productsGrid.innerHTML = dieCuttingProducts.map(product => {
                // Get product image - use first image from images array or placeholder
                const productImage = (product.images && product.images.length > 0) ? product.images[0] : 'images/product-placeholder.jpg';
                // Get product name - use English name if available
                const productName = product.fullNameEn || product.fullName || product.name || 'Die-Cutting Machine';
                // Get product description
                const productDesc = product.description || 'Professional die-cutting equipment with advanced technology and reliable performance.';
                // Get product features
                const features = product.keyFeatures || product.features || ['High precision', 'Reliable performance', 'Easy operation', 'Low maintenance', 'Energy efficient'];
                
                return `
                <div class="product-card" onclick="window.location.href='product-detail.html?id=${product.id}'">
                    <div class="product-card-image">
                        <img src="${productImage}" alt="${product.model || product.id}" onerror="this.src='images/product-placeholder.jpg'" style="width: 100%; height: 100%; object-fit: cover;">
                    </div>
                    <div class="product-card-content">
                        <div class="product-card-header">
                            <h3 class="product-model">${product.model || product.id.toUpperCase()}</h3>
                        </div>
                        <p class="product-name">${productName}</p>
                        <p class="product-description">${productDesc}</p>
                        <ul class="product-features">
                            ${features.slice(0, 5).map(f => `<li>${f}</li>`).join('')}
                        </ul>
                        <div class="product-card-footer">
                            <a href="product-detail.html?id=${product.id}" class="view-details-btn">View Details →</a>
                            <a href="contact.html" class="get-quote-btn">Quote</a>
                        </div>
                    </div>
                </div>
                `;
            }).join('');
        } else if (productsGrid) {
            productsGrid.innerHTML = '<p style="text-align: center; padding: 40px; color: #64748b;">No die-cutting products available yet.</p>';
        }
        
    } catch (error) {
        console.error('Error loading die-cutting products:', error);
        const productsGrid = document.getElementById('products-grid');
        if (productsGrid) {
            productsGrid.innerHTML = '<p style="text-align: center; padding: 40px; color: #e31e24;">Failed to load products. Please try again later.</p>';
        }
    }
}

