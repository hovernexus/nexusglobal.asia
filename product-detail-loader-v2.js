// Product Detail Loader V2 - 使用真实产品数据
// 从products-complete.json加载数据

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

// 从URL获取产品ID
function getProductIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

// 根据ID查找产品
function findProductById(productId) {
    if (!productsCompleteData) return null;
    return productsCompleteData.products.find(p => p.id === productId);
}

// 渲染产品详情页面
function renderProductDetail(product) {
    if (!product) {
        document.body.innerHTML = '<div class="error-message"><h1>产品未找到</h1><p>抱歉,请求的产品不存在。</p><a href="product-list.html">返回产品列表</a></div>';
        return;
    }
    
    const supplier = suppliersData[product.supplier];
    const category = categoriesData[product.category];
    
    // 更新页面标题
    document.title = `${product.model} - ${product.fullName} | NEXUS GLOBAL HOLDINGS`;
    
    // 更新面包屑导航
    updateBreadcrumb(category, product);
    
    // 更新产品标题区域
    updateProductHeader(product, supplier, category);
    
    // 更新产品图片
    updateProductImages(product);
    
    // 更新产品描述和特点
    updateProductDescription(product);
    
    // 更新技术规格
    updateTechnicalSpecs(product);
    
    // 更新应用场景
    updateApplications(product);
    
    // 更新供应商信息
    updateSupplierInfo(supplier);
    
    // 如果是ODJ产品,显示特别标注
    if (product.supplier === 'odj' && product.highlights) {
        showODJHighlights(product.highlights);
    }
}

// 更新面包屑导航
function updateBreadcrumb(category, product) {
    const breadcrumbContainer = document.querySelector('.breadcrumb');
    if (!breadcrumbContainer) return;
    
    breadcrumbContainer.innerHTML = `
        <a href="index.html">首页 Home</a>
        <span class="separator">›</span>
        <a href="product-list.html">产品中心 Products</a>
        <span class="separator">›</span>
        <a href="product-list.html?category=${category.id}">${category.name}</a>
        <span class="separator">›</span>
        <span class="current">${product.model}</span>
    `;
}

// 更新产品标题区域
function updateProductHeader(product, supplier, category) {
    const headerContainer = document.querySelector('.product-header');
    if (!headerContainer) return;
    
    headerContainer.innerHTML = `
        <div class="product-title-section">
            <div class="category-badge">
                <span class="icon">${category.icon}</span>
                <span class="text">${category.name}</span>
            </div>
            <h1 class="product-title">${product.model}</h1>
            <h2 class="product-subtitle">${product.fullName}</h2>
            <p class="product-subtitle-en">${product.fullNameEn}</p>
            <div class="supplier-badge">
                <span class="label">供应商 Supplier:</span>
                <a href="company-detail.html?id=${supplier.id}" class="supplier-link">
                    ${supplier.name}
                </a>
            </div>
        </div>
        <div class="product-actions">
            <a href="contact.html?product=${product.id}" class="btn btn-primary">
                <span class="icon">📞</span>
                获取报价 Request Quote
            </a>
            <a href="${product.url}" target="_blank" class="btn btn-secondary">
                <span class="icon">🔗</span>
                查看原厂页面 View Original
            </a>
            <button class="btn btn-outline" onclick="window.print()">
                <span class="icon">🖨️</span>
                打印 Print
            </button>
        </div>
    `;
}

// 更新产品图片
function updateProductImages(product) {
    const imageContainer = document.querySelector('.product-images');
    if (!imageContainer) return;
    
    const images = product.images && product.images.length > 0 
        ? product.images 
        : ['images/product-placeholder.jpg'];
    
    imageContainer.innerHTML = `
        <div class="main-image">
            <img src="${images[0]}" alt="${product.model}" onerror="this.src='images/product-placeholder.jpg'">
        </div>
        ${images.length > 1 ? `
            <div class="thumbnail-gallery">
                ${images.map((img, index) => `
                    <img src="${img}" 
                         alt="${product.model} - Image ${index + 1}" 
                         onclick="changeMainImage('${img}')"
                         onerror="this.src='images/product-placeholder.jpg'">
                `).join('')}
            </div>
        ` : ''}
    `;
}

// 更新产品描述和特点
function updateProductDescription(product) {
    const descContainer = document.querySelector('.product-description');
    if (!descContainer) return;
    
    descContainer.innerHTML = `
        <h3>产品简介 Product Description</h3>
        <p>${product.description}</p>
        
        <h3>核心特点 Key Features</h3>
        <ul class="key-features-list">
            ${product.keyFeatures.map(feature => `
                <li><span class="check-icon">✓</span>${feature}</li>
            `).join('')}
        </ul>
    `;
}

// 更新技术规格
function updateTechnicalSpecs(product) {
    const specsContainer = document.querySelector('.technical-specifications');
    if (!specsContainer) return;
    
    const specs = product.specifications;
    if (!specs) return;
    
    const specsHTML = Object.entries(specs).map(([key, value]) => {
        const label = formatSpecLabel(key);
        return `
            <tr>
                <td class="spec-label">${label}</td>
                <td class="spec-value">${value}</td>
            </tr>
        `;
    }).join('');
    
    specsContainer.innerHTML = `
        <h3>技术规格 Technical Specifications</h3>
        <table class="specs-table">
            <tbody>
                ${specsHTML}
            </tbody>
        </table>
    `;
}

// 格式化规格标签
function formatSpecLabel(key) {
    const labels = {
        'maxPrintWidth': '最大印刷宽度 Max Print Width',
        'maxPrintSpeed': '最大印刷速度 Max Print Speed',
        'printResolution': '印刷分辨率 Print Resolution',
        'colorConfiguration': '颜色配置 Color Configuration',
        'substrateThickness': '承印物厚度 Substrate Thickness',
        'inkType': '墨水类型 Ink Type',
        'powerConsumption': '功率 Power Consumption',
        'dimensions': '设备尺寸 Dimensions',
        'maxSheetSize': '最大纸张尺寸 Max Sheet Size',
        'minSheetSize': '最小纸张尺寸 Min Sheet Size',
        'maxCuttingSpeed': '最大模切速度 Max Cutting Speed',
        'maxCuttingPressure': '最大模切压力 Max Cutting Pressure',
        'registrationAccuracy': '套准精度 Registration Accuracy',
        'maxBoardSize': '最大纸板尺寸 Max Board Size',
        'minBoardSize': '最小纸板尺寸 Min Board Size',
        'feedingSpeed': '送料速度 Feeding Speed',
        'boardThickness': '纸板厚度 Board Thickness',
        'stackHeight': '堆垛高度 Stack Height',
        'maxPayload': '最大负载 Max Payload',
        'maxReach': '最大作业半径 Max Reach',
        'palletizingSpeed': '码垛速度 Palletizing Speed',
        'boxSizeRange': '纸箱尺寸范围 Box Size Range',
        'palletSize': '托盘尺寸 Pallet Size',
        'maxBoardWidth': '最大纸板宽度 Max Board Width',
        'minBoardWidth': '最小纸板宽度 Min Board Width',
        'maxSpeed': '最大速度 Max Speed',
        'gluingType': '粘合类型 Gluing Type',
        'stitchingType': '钉合类型 Stitching Type',
        'maxWebWidth': '最大卷筒宽度 Max Web Width',
        'laserPower': '激光功率 Laser Power',
        'cuttingAccuracy': '切割精度 Cutting Accuracy',
        'inspectionSpeed': '检测速度 Inspection Speed',
        'cameraResolution': '摄像头分辨率 Camera Resolution',
        'defectDetection': '缺陷检测 Defect Detection'
    };
    
    return labels[key] || key;
}

// 更新应用场景
function updateApplications(product) {
    const appsContainer = document.querySelector('.product-applications');
    if (!appsContainer) return;
    
    if (!product.applications || product.applications.length === 0) return;
    
    appsContainer.innerHTML = `
        <h3>应用场景 Applications</h3>
        <div class="applications-grid">
            ${product.applications.map(app => `
                <div class="application-card">
                    <div class="app-icon">${app}</div>
                    <div class="app-title">${app}</div>
                </div>
            `).join('')}
        </div>
    `;
}

// 更新供应商信息
function updateSupplierInfo(supplier) {
    const supplierContainer = document.querySelector('.supplier-info');
    if (!supplierContainer) return;
    
    supplierContainer.innerHTML = `
        <h3>供应商信息 Supplier Information</h3>
        <div class="supplier-card">
            <div class="supplier-header">
                <h4>${supplier.name}</h4>
                <p class="supplier-name-en">${supplier.nameEn}</p>
            </div>
            <p class="supplier-description">${supplier.description}</p>
            <div class="supplier-links">
                <a href="${supplier.website}" target="_blank" class="supplier-website">
                    <span class="icon">🌐</span>
                    访问官网 Visit Website
                </a>
                <a href="company-detail.html?id=${supplier.id}" class="supplier-profile">
                    <span class="icon">📋</span>
                    查看详情 View Profile
                </a>
            </div>
        </div>
    `;
}

// 显示ODJ特别标注
function showODJHighlights(highlights) {
    const highlightsContainer = document.querySelector('.product-highlights');
    if (!highlightsContainer) {
        // 如果容器不存在,在供应商信息后插入
        const supplierInfo = document.querySelector('.supplier-info');
        if (supplierInfo) {
            const highlightsDiv = document.createElement('div');
            highlightsDiv.className = 'product-highlights odj-highlights';
            supplierInfo.after(highlightsDiv);
        }
    }
    
    const container = document.querySelector('.product-highlights');
    if (!container) return;
    
    container.innerHTML = `
        <h3>
            <span class="star-icon">⭐</span>
            技术亮点 Technical Highlights
        </h3>
        <div class="highlights-content">
            <ul class="highlights-list">
                ${highlights.map(highlight => `
                    <li><span class="highlight-icon">✨</span>${highlight}</li>
                `).join('')}
            </ul>
        </div>
    `;
}

// 切换主图片
function changeMainImage(imageSrc) {
    const mainImage = document.querySelector('.main-image img');
    if (mainImage) {
        mainImage.src = imageSrc;
    }
}

// 初始化页面
async function initProductDetailPage() {
    // 加载产品数据
    await loadProductsData();
    
    // 获取产品ID
    const productId = getProductIdFromURL();
    
    if (!productId) {
        document.body.innerHTML = '<div class="error-message"><h1>缺少产品ID</h1><p>请从产品列表页面访问。</p><a href="product-list.html">返回产品列表</a></div>';
        return;
    }
    
    // 查找产品
    const product = findProductById(productId);
    
    // 渲染产品详情
    renderProductDetail(product);
}

// 页面加载完成后初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProductDetailPage);
} else {
    initProductDetailPage();
}

