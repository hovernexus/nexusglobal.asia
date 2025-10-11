// Product Detail Loader V3 - 兼容product-detail-dynamic.html的HTML结构
// 从products-complete.json加载数据

let productsCompleteData = null;
let suppliersData = {};
let categoriesData = {};

// 加载完整产品数据
async function loadProductsData() {
    try {
        const response = await fetch('data/products-complete.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        productsCompleteData = data;
        
        // 构建供应商和分类索引
        data.suppliers.forEach(supplier => {
            suppliersData[supplier.id] = supplier;
        });
        
        data.categories.forEach(category => {
            categoriesData[category.id] = category;
        });
        
        console.log('Products data loaded successfully:', data);
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
        console.error('Product not found');
        const container = document.querySelector('.product-detail-container');
        if (container) {
            container.innerHTML = `
                <div style="text-align: center; padding: 100px 20px;">
                    <h1 style="font-size: 48px; color: #1B365D; margin-bottom: 20px;">产品未找到</h1>
                    <p style="font-size: 18px; color: #64748b; margin-bottom: 30px;">抱歉,请求的产品不存在。</p>
                    <a href="product-list.html" style="display: inline-block; padding: 15px 40px; background: #1B365D; color: white; text-decoration: none; border-radius: 8px; font-weight: 600;">返回产品列表</a>
                </div>
            `;
        }
        return;
    }
    
    const supplier = suppliersData[product.supplier];
    const category = categoriesData[product.category];
    
    console.log('Rendering product:', product);
    console.log('Product has specifications?', !!product.specifications);
    console.log('Specifications object:', JSON.stringify(product.specifications, null, 2));
    console.log('Supplier:', supplier);
    console.log('Category:', category);
    
    // 更新页面标题
    document.title = `${product.model} - ${product.fullName} | NEXUS GLOBAL HOLDINGS`;
    
    // 更新面包屑导航
    const breadcrumb = document.querySelector('.breadcrumb');
    if (breadcrumb) {
        breadcrumb.innerHTML = `
            <a href="index.html">首页 Home</a> › 
            <a href="product-list.html">产品中心 Products</a> › 
            <a href="product-list.html?category=${category.id}">${category.name}</a> › 
            <span id="breadcrumb-product">${product.model}</span>
        `;
    }
    
    // 更新产品名称
    const productName = document.getElementById('product-name');
    if (productName) {
        productName.textContent = `${product.model} - ${product.fullName}`;
    }
    
    // 更新产品副标题
    const productSubtitle = document.getElementById('product-subtitle');
    if (productSubtitle) {
        productSubtitle.innerHTML = `
            <div style="margin-bottom: 15px;">
                <span style="display: inline-block; padding: 8px 16px; background: linear-gradient(135deg, #1B365D 0%, #0f2744 100%); color: white; border-radius: 6px; font-size: 14px; margin-right: 10px;">
                    ${category.icon} ${category.name}
                </span>
                <span style="display: inline-block; padding: 8px 16px; background: #f1f5f9; color: #475569; border-radius: 6px; font-size: 14px;">
                    供应商: ${supplier.name}
                </span>
            </div>
            <div style="font-size: 18px; color: #64748b; font-weight: 400;">
                ${product.fullNameEn || ''}
            </div>
        `;
    }
    
    // 更新产品描述
    const productDescription = document.getElementById('product-description');
    if (productDescription) {
        productDescription.textContent = product.description;
    }
    
    // 更新核心特点
    const keyFeaturesList = document.getElementById('product-key-features');
    if (keyFeaturesList && product.keyFeatures) {
        keyFeaturesList.innerHTML = product.keyFeatures.map(feature => 
            `<li>✓${feature}</li>`
        ).join('');
    }
    
    // 更新产品图片
    const productImage = document.getElementById('product-image');
    if (productImage) {
        // 使用占位图片
        productImage.src = 'https://via.placeholder.com/600x400/1B365D/FFFFFF?text=' + 
            encodeURIComponent(product.model);
        productImage.alt = product.model;
    }
    
    // 如果是ODJ产品,显示特别标注
    if (product.supplier === 'odj' && product.highlights) {
        addODJHighlights(product.highlights);
    }
    
    // 如果是特色产品,添加推荐标签
    if (product.id === 'md-350' || product.id === 'jxb' || product.id === 'glory160x-hd' || product.id === 'mk1060f') {
        addFeaturedBadge();
    }
    
    // 设置标签页切换
    setupTabs();
    
    // 填充技术规格表
    console.log('Product specifications:', product.specifications);
    console.log('Product technicalSpecs:', product.technicalSpecs);
    if (product.specifications || product.technicalSpecs) {
        fillTechnicalSpecs(product.specifications || product.technicalSpecs);
    } else {
        console.warn('No specifications found for product:', product.id);
    }
    
    // 填充应用场景
    if (product.applications) {
        fillApplications(product.applications);
    }
}

// 添加ODJ产品特别标注
function addODJHighlights(highlights) {
    const productInfo = document.querySelector('.product-info');
    if (!productInfo || !highlights || highlights.length === 0) return;
    
    const highlightsHTML = `
        <div style="margin-top: 30px; padding: 25px; background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-left: 4px solid #f59e0b; border-radius: 8px;">
            <h3 style="font-size: 20px; color: #92400e; margin-bottom: 15px; font-weight: 700;">
                ⭐ ODJ技术亮点
            </h3>
            <ul style="list-style: none; padding: 0; margin: 0;">
                ${highlights.map(highlight => `
                    <li style="padding: 8px 0; color: #78350f; font-size: 15px; font-weight: 500;">
                        🔸 ${highlight}
                    </li>
                `).join('')}
            </ul>
        </div>
    `;
    
    productInfo.insertAdjacentHTML('beforeend', highlightsHTML);
}

// 添加特色产品标签
function addFeaturedBadge() {
    const productName = document.getElementById('product-name');
    if (!productName) return;
    
    const badge = document.createElement('span');
    badge.style.cssText = `
        display: inline-block;
        margin-left: 15px;
        padding: 6px 16px;
        background: linear-gradient(135deg, #E31E24 0%, #c41920 100%);
        color: white;
        font-size: 14px;
        font-weight: 600;
        border-radius: 20px;
        vertical-align: middle;
    `;
    badge.textContent = '⭐ 推荐产品';
    productName.appendChild(badge);
}

// 设置标签页切换功能
function setupTabs() {
    const tabs = document.querySelectorAll('.product-tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // 移除所有active类
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(tc => tc.classList.remove('active'));
            
            // 添加active类到当前标签和内容
            this.classList.add('active');
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

// 填充技术规格表
function fillTechnicalSpecs(specs) {
    const specsTable = document.querySelector('#specs-tbody');
    if (!specsTable || !specs) {
        console.log('Specs table not found or specs is empty:', specsTable, specs);
        return;
    }
    console.log('Filling technical specs:', specs);
    
    // 字段标签映射(中英文)
    const fieldLabels = {
        'maxPrintWidth': 'Max Print Width / 最大印刷宽度',
        'maxPrintSpeed': 'Max Print Speed / 最大印刷速度',
        'printResolution': 'Print Resolution / 印刷分辨率',
        'colorConfiguration': 'Color Configuration / 色彩配置',
        'substrateThickness': 'Substrate Thickness / 承印物厚度',
        'inkType': 'Ink Type / 墨水类型',
        'powerConsumption': 'Power Consumption / 功率',
        'dimensions': 'Dimensions (L×W×H) / 设备尺寸',
        'maxCuttingWidth': 'Max Cutting Width / 最大模切宽度',
        'maxCuttingSpeed': 'Max Cutting Speed / 最大模切速度',
        'cuttingAccuracy': 'Cutting Accuracy / 模切精度',
        'maxPaperSize': 'Max Paper Size / 最大纸张尺寸',
        'minPaperSize': 'Min Paper Size / 最小纸张尺寸',
        'maxFeedingSpeed': 'Max Feeding Speed / 最大送纸速度',
        'stackingCapacity': 'Stacking Capacity / 堆垛容量',
        'palletizingSpeed': 'Palletizing Speed / 码垛速度',
        'weight': 'Weight / 重量',
        'voltage': 'Voltage / 电压'
    };
    
    specsTable.innerHTML = Object.entries(specs).map(([key, value]) => {
        const label = fieldLabels[key] || key;
        return `
            <tr>
                <td style="font-weight: 600; padding: 12px; border-bottom: 1px solid #e5e7eb;">${label}</td>
                <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">${value}</td>
            </tr>
        `;
    }).join('');
}

// 填充应用场景
function fillApplications(applications) {
    const applicationsContainer = document.querySelector('#applications .features-grid');
    if (!applicationsContainer || !applications || applications.length === 0) return;
    
    applicationsContainer.innerHTML = applications.map(app => `
        <div class="feature-card">
            <div class="feature-icon">📦</div>
            <h3>${app}</h3>
        </div>
    `).join('');
}

// 初始化页面
async function initProductDetailPage() {
    console.log('Initializing product detail page...');
    
    // 加载产品数据
    const data = await loadProductsData();
    
    if (!data) {
        console.error('Failed to load products data');
        const container = document.querySelector('.product-detail-container');
        if (container) {
            container.innerHTML = `
                <div style="text-align: center; padding: 100px 20px;">
                    <h1 style="font-size: 48px; color: #ef4444; margin-bottom: 20px;">数据加载失败</h1>
                    <p style="font-size: 18px; color: #64748b; margin-bottom: 30px;">无法加载产品数据,请稍后重试。</p>
                    <a href="product-list.html" style="display: inline-block; padding: 15px 40px; background: #1B365D; color: white; text-decoration: none; border-radius: 8px; font-weight: 600;">返回产品列表</a>
                </div>
            `;
        }
        return;
    }
    
    // 获取产品ID
    const productId = getProductIdFromURL();
    console.log('Product ID from URL:', productId);
    
    if (!productId) {
        console.error('No product ID in URL');
        const container = document.querySelector('.product-detail-container');
        if (container) {
            container.innerHTML = `
                <div style="text-align: center; padding: 100px 20px;">
                    <h1 style="font-size: 48px; color: #1B365D; margin-bottom: 20px;">缺少产品ID</h1>
                    <p style="font-size: 18px; color: #64748b; margin-bottom: 30px;">请从产品列表页面访问。</p>
                    <a href="product-list.html" style="display: inline-block; padding: 15px 40px; background: #1B365D; color: white; text-decoration: none; border-radius: 8px; font-weight: 600;">返回产品列表</a>
                </div>
            `;
        }
        return;
    }
    
    // 查找产品
    const product = findProductById(productId);
    console.log('Found product:', product);
    
    // 渲染产品详情
    renderProductDetail(product);
}

// 页面加载完成后初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProductDetailPage);
} else {
    initProductDetailPage();
}

