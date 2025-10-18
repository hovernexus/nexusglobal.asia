// Category Page Dynamic Loader
// Loads category-specific content and products from JSON files

// Category configurations
const categoryConfig = {
    'digital-printing': {
        id: 'digital_printer',
        title: 'Digital Printing Machines',
        description: 'Advanced Digital Printing Solutions for Corrugated Packaging',
        about: {
            title: 'About Digital Printing Technology',
            content: 'Our digital printing machines represent the cutting edge of corrugated packaging printing technology. These advanced systems utilize high precision digital inkjet technology to deliver exceptional print quality with sharp colors and clear details. Perfect for short runs and personalized packaging solutions, our digital printers offer unmatched flexibility and efficiency. With features like single-pass printing, high-speed operation, and minimal setup time, these machines are ideal for modern packaging operations that demand both quality and productivity.'
        }
    },
    'die-cutting': {
        id: 'die_cutting',
        title: 'Die-Cutting Machines',
        description: 'Precision Die-Cutting Solutions for Perfect Finishes',
        about: {
            title: 'About Die-Cutting Technology',
            content: 'Our digital printing machines represent the cutting edge of corrugated packaging printing technology. These advanced systems utilize high precision digital inkjet technology to deliver exceptional print quality with sharp colors and clear details. Perfect for short runs and personalized packaging solutions, our digital printers offer unmatched flexibility and efficiency.'
        }
    },
    'flexo-printing': {
        id: 'flexo_printing',
        title: 'Flexo Printing Machines',
        description: 'High-Speed Flexographic Printing for Mass Production',
        about: {
            title: 'About Flexographic Printing Technology',
            content: 'Flexographic printing machines are the workhorses of the corrugated packaging industry, designed for high-volume production with exceptional speed and reliability. These systems use flexible printing plates and fast-drying inks to achieve consistent, high-quality results across long production runs. With advanced registration systems and quick changeover capabilities, our flexo printers deliver superior productivity while maintaining excellent print quality. Ideal for large-scale operations requiring cost-effective, high-speed printing solutions.'
        }
    },
    'folder-gluer': {
        id: 'folder_gluer',
        title: 'Folder Gluer & Stitcher Machines',
        description: 'Automated Folding and Gluing Solutions',
        about: {
            title: 'About Folder Gluer Technology',
            content: 'Folder gluer and stitcher machines are essential for automating the final stages of corrugated box production. These sophisticated systems precisely fold, glue, and stitch corrugated sheets into finished boxes with remarkable speed and accuracy. Featuring advanced servo controls and quick-change tooling, our folder gluers handle a wide range of box styles and sizes with minimal setup time. Perfect for high-volume operations demanding consistent quality and maximum throughput.'
        }
    },
    'laminator': {
        id: 'laminator',
        title: 'Laminator & Filming Machines',
        description: 'Surface Enhancement and Protection Solutions',
        about: {
            title: 'About Laminating Technology',
            content: 'Laminating and filming machines provide essential surface enhancement and protection for corrugated packaging. These systems apply protective films or laminate layers to enhance durability, moisture resistance, and visual appeal. With precise temperature and pressure control, our laminators ensure uniform application and excellent adhesion. Ideal for premium packaging applications requiring enhanced protection and superior finish quality.'
        }
    },
    'feeding-palletizing': {
        id: 'feeder_palletizer',
        title: 'Feeder & Palletizing Systems',
        description: 'Intelligent Material Handling and Automation',
        about: {
            title: 'About Feeding and Palletizing Technology',
            content: 'Feeding and palletizing systems are critical for optimizing material flow and end-of-line automation in corrugated packaging production. Our intelligent feeders ensure continuous, non-stop supply of corrugated boards to printing and converting equipment, while our advanced palletizing robots use 3D vision and AI to automatically stack finished products with precision and efficiency. These systems dramatically reduce labor requirements, increase throughput, and improve workplace safety.'
        }
    },
    'corrugator': {
        id: 'corrugator',
        title: 'Corrugator Line Systems',
        description: 'Complete Corrugated Board Production Lines',
        about: {
            title: 'About Corrugator Technology',
            content: 'Corrugator lines are the foundation of corrugated packaging production, transforming raw paper into high-quality corrugated board. These integrated systems combine multiple processes including corrugating, gluing, drying, and cutting to produce board with precise specifications. With advanced process controls and high-speed operation, our corrugator lines deliver consistent quality and maximum productivity for large-scale board production operations.'
        }
    }
};

document.addEventListener('DOMContentLoaded', async function() {
    // Get category from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    
    if (!categoryParam || !categoryConfig[categoryParam]) {
        console.error('Invalid category parameter');
        return;
    }
    
    const config = categoryConfig[categoryParam];
    
    // Update page title and meta
    document.title = `${config.title} - NEXUS GLOBAL HOLDINGS`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
        metaDesc.content = config.description;
    }
    
    // Update breadcrumb
    const breadcrumbCategory = document.getElementById('breadcrumb-category');
    if (breadcrumbCategory) {
        breadcrumbCategory.textContent = config.title;
    }
    
    // Update hero section
    const heroTitle = document.getElementById('category-title');
    const heroDescription = document.getElementById('category-description');
    if (heroTitle) heroTitle.textContent = config.title;
    if (heroDescription) heroDescription.textContent = config.description;
    
    // Update about section
    const aboutTitle = document.getElementById('about-title');
    const aboutContent = document.getElementById('about-content');
    if (aboutTitle) aboutTitle.textContent = config.about.title;
    if (aboutContent) aboutContent.textContent = config.about.content;
    
    // Load and display products
    await loadCategoryProducts(config.id);
});

async function loadCategoryProducts(categoryId) {
    try {
        const response = await fetch('data/products-complete.json');
        const data = await response.json();
        
        // Filter products by category
        const categoryProducts = data.products.filter(p => p.category === categoryId);
        
        // Update products count
        const productsCount = document.getElementById('products-count');
        if (productsCount) {
            productsCount.textContent = categoryProducts.length;
        }
        
        // Display products
        const productsGrid = document.getElementById('products-grid');
        if (productsGrid && categoryProducts.length > 0) {
            productsGrid.innerHTML = categoryProducts.map(product => {
                // Get product image - use first image from images array or placeholder
                const productImage = (product.images && product.images.length > 0) ? product.images[0] : 'images/product-placeholder.jpg';
                // Get product name - use English name if available
                const productName = product.fullNameEn || product.fullName || product.name || 'High-Quality Packaging Equipment';
                // Get product title - use title if available, otherwise use fullNameEn
                const productTitle = product.title || productName;
                
                return `
                <div class="product-card">
                    <div class="product-image-container">
                        <img src="${productImage}" 
                             alt="${product.model || product.id}" 
                             class="product-image"
                             onerror="this.src='images/product-placeholder.jpg'">
                    </div>
                    <div class="product-info">
                        <h3 class="product-model">${product.model || product.id.toUpperCase()}</h3>
                        <p class="product-name">${productTitle}</p>
                        <p class="product-description">${product.description || 'Professional packaging equipment with advanced technology and reliable performance.'}</p>
                        <ul class="product-features">
                            ${(product.keyFeatures || product.features || ['High precision', 'Reliable performance', 'Easy operation', 'Low maintenance', 'Energy efficient']).slice(0, 5).map(f => `<li>${f}</li>`).join('')}
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
            productsGrid.innerHTML = '<p style="text-align: center; padding: 40px; color: #64748b;">No products available in this category yet.</p>';
        }
        
    } catch (error) {
        console.error('Error loading category products:', error);
        const productsGrid = document.getElementById('products-grid');
        if (productsGrid) {
            productsGrid.innerHTML = '<p style="text-align: center; padding: 40px; color: #e31e24;">Failed to load products. Please try again later.</p>';
        }
    }
}

