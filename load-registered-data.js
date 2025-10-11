// 动态加载注册供应商和客户数据
(function() {
    'use strict';

    // 嵌入的注册数据(避免CORS问题)
    const registeredData = {
        "suppliers": [
            {
                "id": "sup001",
                "companyName": "TechPack Solutions Ltd.",
                "companyNameZh": "科技包装解决方案有限公司",
                "country": "China",
                "city": "Shanghai",
                "status": "approved",
                "products": [
                    {
                        "id": "tp-dp-001",
                        "name": "TechPrint Pro 2500",
                        "category": "Digital Printing Machines",
                        "description": "High-precision digital inkjet printing machine"
                    },
                    {
                        "id": "tp-dc-001",
                        "name": "AutoCut Pro 1060",
                        "category": "Die-Cutting Machines",
                        "description": "Precision automatic die-cutting machine"
                    }
                ]
            },
            {
                "id": "sup002",
                "companyName": "Global Corrugated Equipment Co.",
                "companyNameZh": "环球瓦楞设备公司",
                "country": "Germany",
                "city": "Munich",
                "status": "approved",
                "products": [
                    {
                        "id": "gc-ffg-001",
                        "name": "FlexoMaster FFG-3000",
                        "category": "FFG Inline",
                        "description": "High-speed FFG inline production line"
                    }
                ]
            }
        ],
        "customers": [
            {
                "id": "cust001",
                "companyName": "Premium Packaging Industries",
                "companyNameZh": "优质包装工业公司",
                "country": "United States",
                "city": "Los Angeles",
                "status": "approved",
                "industry": "E-commerce Packaging"
            },
            {
                "id": "cust002",
                "companyName": "Asia Pacific Corrugated Manufacturing",
                "companyNameZh": "亚太瓦楞纸制造公司",
                "country": "Singapore",
                "city": "Singapore",
                "status": "approved",
                "industry": "Food & Beverage Packaging"
            }
        ]
    };

    // 加载注册数据
    function loadRegisteredData() {
        try {
            // 加载供应商数据到Certified Equipment Suppliers区域
            loadSuppliers(registeredData.suppliers);
            
            // 加载客户数据到Trusted by区域
            loadCustomers(registeredData.customers);
            
            // 加载供应商产品到产品分类
            loadSupplierProducts(registeredData.suppliers);
            
            console.log('Registered data loaded successfully');
        } catch (error) {
            console.error('Error loading registered data:', error);
        }
    }

    // 加载供应商到"Certified Equipment Suppliers"区域
    function loadSuppliers(suppliers) {
        // 找到所有的partners-logos-grid容器
        const gridsContainers = document.querySelectorAll('.partners-logos-grid');
        if (gridsContainers.length < 2) {
            console.warn('Partners grid containers not found');
            return;
        }
        
        // 第一个是Certified Equipment Suppliers区域
        const suppliersContainer = gridsContainers[0];

        // 添加新的供应商卡片
        suppliers.forEach(supplier => {
            if (supplier.status === 'approved') {
                const logoItem = document.createElement('div');
                logoItem.className = 'partner-logo-item registered-company';
                logoItem.style.cursor = 'pointer';
                // ID映射
                const idMap = {
                    'sup001': 'techpack',
                    'sup002': 'global-corrugated'
                };
                const companyId = idMap[supplier.id] || supplier.id;
                logoItem.onclick = () => {
                    window.location.href = `company-detail.html?id=${companyId}`;
                };
                logoItem.innerHTML = `
                    <div class="partner-placeholder" style="
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        color: white;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        padding: 20px;
                        height: 100%;
                        transition: transform 0.3s ease;
                    ">
                        <div style="font-size: 16px; font-weight: 600; margin-bottom: 8px; text-align: center; line-height: 1.3;">
                            ${supplier.companyName}
                        </div>
                        <div style="font-size: 13px; opacity: 0.9;">
                            ${supplier.city}, ${supplier.country}
                        </div>
                    </div>
                `;
                
                // 添加hover效果
                logoItem.addEventListener('mouseenter', function() {
                    this.querySelector('.partner-placeholder').style.transform = 'scale(1.05)';
                });
                logoItem.addEventListener('mouseleave', function() {
                    this.querySelector('.partner-placeholder').style.transform = 'scale(1)';
                });
                
                suppliersContainer.appendChild(logoItem);
                console.log(`Added supplier: ${supplier.companyName}`);
            }
        });
    }

    // 加载客户到"Trusted by Leading Corrugated Manufacturers"区域
    function loadCustomers(customers) {
        // 找到所有的partners-logos-grid容器
        const gridsContainers = document.querySelectorAll('.partners-logos-grid');
        if (gridsContainers.length < 2) {
            console.warn('Partners grid containers not found');
            return;
        }
        
        // 第二个是Trusted by区域
        const customersContainer = gridsContainers[1];

        // 添加新的客户卡片
        customers.forEach(customer => {
            if (customer.status === 'approved') {
                const logoItem = document.createElement('div');
                logoItem.className = 'partner-logo-item registered-company';
                logoItem.style.cursor = 'pointer';
                // ID映射
                const idMap = {
                    'cust001': 'premium-packaging',
                    'cust002': 'asia-pacific-corrugated'
                };
                const companyId = idMap[customer.id] || customer.id;
                logoItem.onclick = () => {
                    window.location.href = `company-detail.html?id=${companyId}`;
                };
                logoItem.innerHTML = `
                    <div class="partner-placeholder" style="
                        background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
                        color: white;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        padding: 20px;
                        height: 100%;
                        transition: transform 0.3s ease;
                    ">
                        <div style="font-size: 16px; font-weight: 600; margin-bottom: 8px; text-align: center; line-height: 1.3;">
                            ${customer.companyName}
                        </div>
                        <div style="font-size: 13px; opacity: 0.9;">
                            ${customer.city}, ${customer.country}
                        </div>
                    </div>
                `;
                
                // 添加hover效果
                logoItem.addEventListener('mouseenter', function() {
                    this.querySelector('.partner-placeholder').style.transform = 'scale(1.05)';
                });
                logoItem.addEventListener('mouseleave', function() {
                    this.querySelector('.partner-placeholder').style.transform = 'scale(1)';
                });
                
                customersContainer.appendChild(logoItem);
                console.log(`Added customer: ${customer.companyName}`);
            }
        });
    }

    // 加载供应商产品到产品分类卡片
    function loadSupplierProducts(suppliers) {
        suppliers.forEach(supplier => {
            if (supplier.status === 'approved') {
                supplier.products.forEach(product => {
                    addProductToCategory(product, supplier);
                });
            }
        });
    }

    // 将产品添加到对应的产品分类卡片
    function addProductToCategory(product, supplier) {
        // 根据产品类别找到对应的产品卡片
        const categoryMap = {
            'Digital Printing Machines': 0,
            'Die-Cutting Machines': 1,
            'FFG Inline': 2,
            'Folder Gluer/Stitcher': 3,
            'Laminator/Filming Machine': 4,
            'Corrugator Line': 5,
            'Flexo Printing Machines': 6,
            'Feeder/Palletizer': 7
        };

        const categoryIndex = categoryMap[product.category];
        if (categoryIndex === undefined) return;

        // 找到对应的产品列表
        const productCards = document.querySelectorAll('.product-card');
        if (!productCards[categoryIndex]) return;

        const productList = productCards[categoryIndex].querySelector('.product-list');
        if (!productList) return;

        // 添加产品到列表
        const productItem = document.createElement('li');
        productItem.innerHTML = `
            <a href="product-detail.html?id=${product.id}&supplier=${supplier.id}" 
               style="color: inherit; text-decoration: none; cursor: pointer;"
               title="${product.description}">
                ${product.name}
            </a>
        `;
        productList.appendChild(productItem);
        console.log(`Added product: ${product.name} to ${product.category}`);
    }

    // 当DOM加载完成后执行
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadRegisteredData);
    } else {
        loadRegisteredData();
    }
})();
