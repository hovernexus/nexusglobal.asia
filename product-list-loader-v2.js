// Product List Loader V2 - 使用真实产品数据

let productsCompleteData = null;
let suppliersData = {};
let categoriesData = {};

// 加载完整产品数据
async function loadProductsData() {
    try {
        const response = await fetch('data/products-complete.json');
        const data = await response.json();
        productsCompleteData = data;
        
        // 构建供应商和分类索引
        data.suppliers.forEach(supplier => {
            suppliersData[supplier.id] = supplier;
        });
        
        data.categories.forEach(category => {
            categoriesData[category.id] = category;
        });
        
        return data;
    } catch (error) {
        console.error('Error loading products data:', error);
        return null;
    }
}

// 从URL获取筛选参数
function getFiltersFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return {
        category: urlParams.get('category'),
        supplier: urlParams.get('supplier'),
        featured: urlParams.get('featured') === 'true',
        search: urlParams.get('search')
    };
}

// 筛选产品
function filterProducts(products, filters) {
    let filtered = [...products];
    
    if (filters.category) {
        filtered = filtered.filter(p => p.category === filters.category);
    }
    
    if (filters.supplier) {
        filtered = filtered.filter(p => p.supplier === filters.supplier);
    }
    
    if (filters.featured) {
        // 特色产品：ODJ的MD-350和JXB
        filtered = filtered.filter(p => 
            p.id === 'md-350' || 
            p.id === 'jxb' ||
            p.id === 'glory160x-hd' ||
            p.id === 'mk1060f'
        );
    }
    
    if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        filtered = filtered.filter(p => 
            p.model.toLowerCase().includes(searchTerm) ||
            p.fullName.toLowerCase().includes(searchTerm) ||
            p.description.toLowerCase().includes(searchTerm)
        );
    }
    
    return filtered;
}

// 渲染产品列表
function renderProductList(products) {
    const listContainer = document.querySelector('.products-grid');
    if (!listContainer) return;
    
    if (products.length === 0) {
        listContainer.innerHTML = `
            <div class="no-products">
                <h3>未找到产品</h3>
                <p>请尝试其他筛选条件或<a href="product-list.html">查看所有产品</a></p>
            </div>
        `;
        return;
    }
    
    listContainer.innerHTML = products.map(product => {
        const supplier = suppliersData[product.supplier];
        const category = categoriesData[product.category];
        const isFeatured = product.id === 'md-350' || product.id === 'jxb';
        
        return `
            <div class="product-card ${isFeatured ? 'featured' : ''}">
                ${isFeatured ? '<div class="featured-badge">⭐ 推荐</div>' : ''}
                <div class="product-image">
                    <img src="${product.images && product.images[0] ? product.images[0] : 'images/product-placeholder.jpg'}" 
                         alt="${product.model}"
                         onerror="this.src='images/product-placeholder.jpg'">
                </div>
                <div class="product-info">
                    <div class="product-category">
                        <span class="icon">${category.icon}</span>
                        <span class="text">${category.name}</span>
                    </div>
                    <h3 class="product-title">${product.model}</h3>
                    <p class="product-subtitle">${product.fullName}</p>
                    <p class="product-description">${product.description.substring(0, 100)}...</p>
                    <div class="product-supplier">
                        <span class="label">供应商:</span>
                        <span class="name">${supplier.name}</span>
                    </div>
                    <div class="product-features">
                        ${product.keyFeatures.slice(0, 3).map(feature => `
                            <div class="feature-item">
                                <span class="check">✓</span>
                                <span>${feature}</span>
                            </div>
                        `).join('')}
                    </div>
                    <div class="product-actions">
                        <a href="product-detail.html?id=${product.id}" class="btn btn-primary">
                            查看详情 View Details
                        </a>
                        <a href="contact.html?product=${product.id}" class="btn btn-secondary">
                            获取报价 Quote
                        </a>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// 渲染分类筛选器
function renderCategoryFilters(currentCategory) {
    const filtersContainer = document.querySelector('.category-filters');
    if (!filtersContainer) return;
    
    const categories = Object.values(categoriesData);
    
    filtersContainer.innerHTML = `
        <h3>产品分类 Categories</h3>
        <div class="filter-list">
            <a href="product-list.html" class="filter-item ${!currentCategory ? 'active' : ''}">
                <span class="icon">📋</span>
                <span class="text">全部产品 All Products</span>
                <span class="count">(${productsCompleteData.products.length})</span>
            </a>
            ${categories.map(category => {
                const count = productsCompleteData.products.filter(p => p.category === category.id).length;
                return `
                    <a href="product-list.html?category=${category.id}" 
                       class="filter-item ${currentCategory === category.id ? 'active' : ''}">
                        <span class="icon">${category.icon}</span>
                        <span class="text">${category.name}</span>
                        <span class="count">(${count})</span>
                    </a>
                `;
            }).join('')}
        </div>
    `;
}

// 渲染供应商筛选器
function renderSupplierFilters(currentSupplier) {
    const filtersContainer = document.querySelector('.supplier-filters');
    if (!filtersContainer) return;
    
    const suppliers = Object.values(suppliersData);
    
    filtersContainer.innerHTML = `
        <h3>供应商 Suppliers</h3>
        <div class="filter-list">
            ${suppliers.map(supplier => {
                const count = productsCompleteData.products.filter(p => p.supplier === supplier.id).length;
                return `
                    <a href="product-list.html?supplier=${supplier.id}" 
                       class="filter-item ${currentSupplier === supplier.id ? 'active' : ''}">
                        <span class="text">${supplier.name}</span>
                        <span class="count">(${count})</span>
                    </a>
                `;
            }).join('')}
        </div>
    `;
}

// 更新页面标题
function updatePageTitle(filters) {
    let title = '产品中心 Products';
    
    if (filters.category) {
        const category = categoriesData[filters.category];
        if (category) {
            title = `${category.name} - ${title}`;
        }
    }
    
    if (filters.supplier) {
        const supplier = suppliersData[filters.supplier];
        if (supplier) {
            title = `${supplier.name} - ${title}`;
        }
    }
    
    if (filters.featured) {
        title = `推荐产品 Featured Products - ${title}`;
    }
    
    document.title = `${title} | NEXUS GLOBAL HOLDINGS`;
    
    const pageHeader = document.querySelector('.page-header h1');
    if (pageHeader) {
        pageHeader.textContent = title;
    }
}

// 更新结果统计
function updateResultsCount(count, total) {
    const countContainer = document.querySelector('.results-count');
    if (!countContainer) return;
    
    countContainer.textContent = `显示 ${count} / ${total} 个产品`;
}

// 初始化搜索功能
function initSearch() {
    const searchInput = document.querySelector('.product-search-input');
    const searchButton = document.querySelector('.product-search-button');
    
    if (!searchInput || !searchButton) return;
    
    searchButton.addEventListener('click', () => {
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            window.location.href = `product-list.html?search=${encodeURIComponent(searchTerm)}`;
        }
    });
    
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchButton.click();
        }
    });
    
    // 如果URL中有搜索词,填充到输入框
    const filters = getFiltersFromURL();
    if (filters.search) {
        searchInput.value = filters.search;
    }
}

// 初始化排序功能
function initSorting() {
    const sortSelect = document.querySelector('.product-sort-select');
    if (!sortSelect) return;
    
    sortSelect.addEventListener('change', (e) => {
        const sortBy = e.target.value;
        const filters = getFiltersFromURL();
        
        let products = filterProducts(productsCompleteData.products, filters);
        
        // 排序逻辑
        switch (sortBy) {
            case 'name-asc':
                products.sort((a, b) => a.model.localeCompare(b.model));
                break;
            case 'name-desc':
                products.sort((a, b) => b.model.localeCompare(a.model));
                break;
            case 'newest':
                // 假设ID越大越新
                products.sort((a, b) => b.id.localeCompare(a.id));
                break;
            case 'featured':
                // 特色产品排在前面
                products.sort((a, b) => {
                    const aFeatured = a.id === 'md-350' || a.id === 'jxb' ? 1 : 0;
                    const bFeatured = b.id === 'md-350' || b.id === 'jxb' ? 1 : 0;
                    return bFeatured - aFeatured;
                });
                break;
        }
        
        renderProductList(products);
    });
}

// 初始化产品列表页面
async function initProductListPage() {
    // 加载产品数据
    await loadProductsData();
    
    if (!productsCompleteData) {
        console.error('Failed to load products data');
        return;
    }
    
    // 获取筛选参数
    const filters = getFiltersFromURL();
    
    // 筛选产品
    const filteredProducts = filterProducts(productsCompleteData.products, filters);
    
    // 更新页面标题
    updatePageTitle(filters);
    
    // 渲染产品列表
    renderProductList(filteredProducts);
    
    // 渲染筛选器
    renderCategoryFilters(filters.category);
    renderSupplierFilters(filters.supplier);
    
    // 更新结果统计
    updateResultsCount(filteredProducts.length, productsCompleteData.products.length);
    
    // 初始化搜索和排序
    initSearch();
    initSorting();
}

// 页面加载完成后初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProductListPage);
} else {
    initProductListPage();
}

