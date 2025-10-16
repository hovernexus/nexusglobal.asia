// 供应商注册和产品上传处理脚本
// Supplier Registration and Product Upload Handler

// 示例供应商数据(用于演示)
const exampleSuppliers = [
    {
        id: 'supplier_001',
        companyName: '深圳创新包装设备有限公司',
        companyNameEn: 'Shenzhen Innovation Packaging Equipment Co., Ltd.',
        registrationNumber: '91440300MA5XXXXX',
        establishedYear: '2015',
        country: 'China',
        province: '广东省',
        city: '深圳市',
        address: '南山区科技园南区',
        website: 'https://www.example-supplier1.com',
        contactPerson: '张经理',
        contactEmail: 'zhang@example.com',
        contactPhone: '+86 755 8888 8888',
        businessLicense: 'business-license-001.pdf',
        certifications: ['ISO 9001', 'CE'],
        productCategories: ['digital_printer', 'die_cutting'],
        companyDescription: '专业从事数码印刷设备和模切设备的研发、生产和销售',
        registrationDate: '2024-10-09',
        status: 'approved',
        products: []
    },
    {
        id: 'supplier_002',
        companyName: '上海精密机械制造有限公司',
        companyNameEn: 'Shanghai Precision Machinery Manufacturing Co., Ltd.',
        registrationNumber: '91310000MA1XXXXX',
        establishedYear: '2010',
        country: 'China',
        province: '上海市',
        city: '上海市',
        address: '浦东新区张江高科技园区',
        website: 'https://www.example-supplier2.com',
        contactPerson: '李总',
        contactEmail: 'li@example.com',
        contactPhone: '+86 21 6666 6666',
        businessLicense: 'business-license-002.pdf',
        certifications: ['ISO 9001', 'ISO 14001'],
        productCategories: ['feeder_palletizer', 'folder_gluer'],
        companyDescription: '专注于自动化物流设备和纸箱成型设备的生产',
        registrationDate: '2024-10-08',
        status: 'approved',
        products: []
    }
];

// 示例客户数据
const exampleCustomers = [
    {
        id: 'customer_001',
        companyName: '广州包装印刷有限公司',
        companyNameEn: 'Guangzhou Packaging Printing Co., Ltd.',
        registrationNumber: '91440100MA5XXXXX',
        country: 'China',
        province: '广东省',
        city: '广州市',
        address: '白云区工业园',
        contactPerson: '王经理',
        contactEmail: 'wang@customer1.com',
        contactPhone: '+86 20 8888 8888',
        businessType: 'manufacturer',
        annualCapacity: '100万平方米',
        equipmentNeeds: ['digital_printer', 'die_cutting'],
        registrationDate: '2024-10-09',
        status: 'approved'
    },
    {
        id: 'customer_002',
        companyName: '东莞纸箱厂',
        companyNameEn: 'Dongguan Carton Factory',
        registrationNumber: '91441900MA5XXXXX',
        country: 'China',
        province: '广东省',
        city: '东莞市',
        address: '虎门镇工业区',
        contactPerson: '陈总',
        contactEmail: 'chen@customer2.com',
        contactPhone: '+86 769 8888 8888',
        businessType: 'manufacturer',
        annualCapacity: '50万平方米',
        equipmentNeeds: ['folder_gluer', 'feeder_palletizer'],
        registrationDate: '2024-10-08',
        status: 'approved'
    }
];

// 加载已注册公司数据
async function loadRegisteredCompanies() {
    try {
        // Load suppliers from products-complete.json
        const suppliersResponse = await fetch('data/products-complete.json');
        const suppliersData = await suppliersResponse.json();
        
        // Load customers from registered-companies.json
        const customersResponse = await fetch('data/registered-companies.json');
        const customersData = await customersResponse.json();
        
        return {
            suppliers: suppliersData.suppliers || [],
            customers: customersData.companies || []
        };
    } catch (error) {
        console.error('Error loading registered companies:', error);
        // Fallback to example data if loading fails
        return {
            suppliers: exampleSuppliers,
            customers: exampleCustomers
        };
    }
}

// 保存供应商数据
function saveSupplier(supplierData) {
    const companies = loadRegisteredCompanies();
    
    // 生成唯一ID
    supplierData.id = 'supplier_' + Date.now();
    supplierData.registrationDate = new Date().toISOString().split('T')[0];
    supplierData.status = 'pending'; // 待审核
    supplierData.products = [];
    
    companies.suppliers.push(supplierData);
    localStorage.setItem('nexus_suppliers', JSON.stringify(companies.suppliers));
    
    return supplierData;
}

// 保存客户数据
function saveCustomer(customerData) {
    const companies = loadRegisteredCompanies();
    
    // 生成唯一ID
    customerData.id = 'customer_' + Date.now();
    customerData.registrationDate = new Date().toISOString().split('T')[0];
    customerData.status = 'pending';
    
    companies.customers.push(customerData);
    localStorage.setItem('nexus_customers', JSON.stringify(companies.customers));
    
    return customerData;
}

// 保存产品数据
function saveProduct(supplierId, productData) {
    const companies = loadRegisteredCompanies();
    const supplier = companies.suppliers.find(s => s.id === supplierId);
    
    if (!supplier) {
        throw new Error('Supplier not found');
    }
    
    // 生成唯一产品ID
    productData.id = 'product_' + Date.now();
    productData.supplierId = supplierId;
    productData.uploadDate = new Date().toISOString().split('T')[0];
    productData.status = 'pending'; // 待审核
    
    supplier.products.push(productData);
    localStorage.setItem('nexus_suppliers', JSON.stringify(companies.suppliers));
    
    return productData;
}

// 处理供应商注册表单提交
function handleSupplierRegistration(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    const supplierData = {
        companyName: formData.get('companyName'),
        companyNameEn: formData.get('companyNameEn'),
        registrationNumber: formData.get('registrationNumber'),
        establishedYear: formData.get('establishedYear'),
        country: formData.get('country'),
        province: formData.get('province'),
        city: formData.get('city'),
        address: formData.get('address'),
        website: formData.get('website'),
        contactPerson: formData.get('contactPerson'),
        contactEmail: formData.get('contactEmail'),
        contactPhone: formData.get('contactPhone'),
        businessLicense: formData.get('businessLicense')?.name || '',
        certifications: formData.getAll('certifications'),
        productCategories: formData.getAll('productCategories'),
        companyDescription: formData.get('companyDescription')
    };
    
    try {
        const savedSupplier = saveSupplier(supplierData);
        
        // 显示成功消息
        showSuccessMessage('供应商注册成功!', `
            <p>感谢您的注册,您的供应商ID是: <strong>${savedSupplier.id}</strong></p>
            <p>我们将在3个工作日内审核您的申请,审核通过后您将收到邮件通知。</p>
            <p>审核通过后,您可以使用供应商ID登录并上传产品信息。</p>
        `);
        
        // 重置表单
        form.reset();
        
        // 3秒后跳转到产品上传页面
        setTimeout(() => {
            window.location.href = `product-upload-form.html?supplierId=${savedSupplier.id}`;
        }, 3000);
        
    } catch (error) {
        showErrorMessage('注册失败', error.message);
    }
}

// 处理客户注册表单提交
function handleCustomerRegistration(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    const customerData = {
        companyName: formData.get('companyName'),
        companyNameEn: formData.get('companyNameEn'),
        registrationNumber: formData.get('registrationNumber'),
        country: formData.get('country'),
        province: formData.get('province'),
        city: formData.get('city'),
        address: formData.get('address'),
        contactPerson: formData.get('contactPerson'),
        contactEmail: formData.get('contactEmail'),
        contactPhone: formData.get('contactPhone'),
        businessType: formData.get('businessType'),
        annualCapacity: formData.get('annualCapacity'),
        equipmentNeeds: formData.getAll('equipmentNeeds')
    };
    
    try {
        const savedCustomer = saveCustomer(customerData);
        
        // 显示成功消息
        showSuccessMessage('客户注册成功!', `
            <p>感谢您的注册,您的客户ID是: <strong>${savedCustomer.id}</strong></p>
            <p>我们将在3个工作日内审核您的申请,审核通过后您将收到邮件通知。</p>
            <p>审核通过后,您可以浏览所有供应商产品并直接联系供应商。</p>
        `);
        
        // 重置表单
        form.reset();
        
        // 3秒后跳转到产品列表页面
        setTimeout(() => {
            window.location.href = 'product-list.html';
        }, 3000);
        
    } catch (error) {
        showErrorMessage('注册失败', error.message);
    }
}

// 处理产品上传表单提交
function handleProductUpload(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const supplierId = formData.get('supplierId');
    
    if (!supplierId) {
        showErrorMessage('错误', '缺少供应商ID,请先完成供应商注册。');
        return;
    }
    
    const productData = {
        model: formData.get('productModel'),
        fullName: formData.get('productName'),
        fullNameEn: formData.get('productNameEn'),
        category: formData.get('category'),
        description: formData.get('description'),
        keyFeatures: formData.get('keyFeatures').split('\n').filter(f => f.trim()),
        specifications: JSON.parse(formData.get('specifications') || '{}'),
        applications: formData.get('applications').split('\n').filter(a => a.trim()),
        images: [], // 实际应用中需要上传到服务器
        url: formData.get('productUrl')
    };
    
    try {
        const savedProduct = saveProduct(supplierId, productData);
        
        // 显示成功消息
        showSuccessMessage('产品上传成功!', `
            <p>产品 <strong>${savedProduct.model}</strong> 已成功上传。</p>
            <p>产品ID: <strong>${savedProduct.id}</strong></p>
            <p>我们将在1-2个工作日内审核您的产品信息,审核通过后将在平台上展示。</p>
        `);
        
        // 重置表单
        form.reset();
        
        // 询问是否继续上传
        setTimeout(() => {
            if (confirm('是否继续上传其他产品?')) {
                // 保持在当前页面
            } else {
                window.location.href = 'product-list.html';
            }
        }, 2000);
        
    } catch (error) {
        showErrorMessage('上传失败', error.message);
    }
}

// 显示成功消息
function showSuccessMessage(title, content) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'success-message-overlay';
    messageDiv.innerHTML = `
        <div class="success-message-box">
            <div class="success-icon">✓</div>
            <h2>${title}</h2>
            <div class="success-content">${content}</div>
            <button class="close-button" onclick="this.parentElement.parentElement.remove()">关闭</button>
        </div>
    `;
    document.body.appendChild(messageDiv);
}

// 显示错误消息
function showErrorMessage(title, content) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'error-message-overlay';
    messageDiv.innerHTML = `
        <div class="error-message-box">
            <div class="error-icon">✕</div>
            <h2>${title}</h2>
            <div class="error-content">${content}</div>
            <button class="close-button" onclick="this.parentElement.parentElement.remove()">关闭</button>
        </div>
    `;
    document.body.appendChild(messageDiv);
}

// 初始化注册公司数据展示
async function initRegisteredCompaniesDisplay() {
    const companies = await loadRegisteredCompanies();
    
    // 更新统计数字
    const supplierCountElem = document.querySelector('.supplier-count');
    const customerCountElem = document.querySelector('.customer-count');
    
    if (supplierCountElem) {
        supplierCountElem.textContent = companies.suppliers.length;
    }
    
    if (customerCountElem) {
        customerCountElem.textContent = companies.customers.length;
    }
    
    // 显示已注册供应商列表
    const supplierListElem = document.querySelector('.registered-suppliers-list');
    if (supplierListElem) {
        supplierListElem.innerHTML = companies.suppliers
            .filter(s => s.status === 'approved')
            .map(supplier => `
                <div class="company-card">
                    <h4>${supplier.companyName}</h4>
                    <p class="company-name-en">${supplier.companyNameEn}</p>
                    <p class="company-location">${supplier.city}, ${supplier.province}</p>
                    <p class="company-categories">
                        产品类别: ${supplier.productCategories.join(', ')}
                    </p>
                    <a href="company-detail.html?id=${supplier.id}&type=supplier" class="view-profile-btn">
                        View Profile
                    </a>
                </div>
            `).join('');
    }
    
    // 显示已注册客户列表
    const customerListElem = document.querySelector('.registered-customers-list');
    if (customerListElem) {
        customerListElem.innerHTML = companies.customers
            .filter(c => c.status === 'approved')
            .map(customer => `
                <div class="company-card">
                    <h4>${customer.companyName}</h4>
                    <p class="company-location">${customer.country || 'Mexico'}</p>
                    <p class="company-industry">
                        ${customer.industry || 'Corrugated Packaging Manufacturing'}
                    </p>
                    <a href="company-detail.html?id=${customer.id}&type=customer" class="view-profile-btn">
                        View Profile
                    </a>
                </div>
            `).join('');
    }
}

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', function() {
    // 绑定供应商注册表单
    const supplierForm = document.getElementById('supplierRegistrationForm');
    if (supplierForm) {
        supplierForm.addEventListener('submit', handleSupplierRegistration);
    }
    
    // 绑定客户注册表单
    const customerForm = document.getElementById('customerRegistrationForm');
    if (customerForm) {
        customerForm.addEventListener('submit', handleCustomerRegistration);
    }
    
    // 绑定产品上传表单
    const productForm = document.getElementById('productUploadForm');
    if (productForm) {
        productForm.addEventListener('submit', handleProductUpload);
        
        // 从URL获取供应商ID
        const urlParams = new URLSearchParams(window.location.search);
        const supplierId = urlParams.get('supplierId');
        if (supplierId) {
            const supplierIdInput = document.getElementById('supplierId');
            if (supplierIdInput) {
                supplierIdInput.value = supplierId;
            }
        }
    }
    
    // 初始化已注册公司展示
    initRegisteredCompaniesDisplay();
});

// 导出函数供外部使用
window.SupplierProductHandler = {
    loadRegisteredCompanies,
    saveSupplier,
    saveCustomer,
    saveProduct,
    showSuccessMessage,
    showErrorMessage
};

