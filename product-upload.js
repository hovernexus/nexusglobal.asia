// Product Upload Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('productUploadForm');
    const fileInput = document.getElementById('productImages');
    const fileUploadArea = document.getElementById('imageUploadArea');
    
    // File upload handling
    if (fileInput && fileUploadArea) {
        // Click to upload
        fileUploadArea.addEventListener('click', function(e) {
            if (e.target !== fileInput) {
                fileInput.click();
            }
        });
        
        // Drag and drop
        fileUploadArea.addEventListener('dragover', function(e) {
            e.preventDefault();
            fileUploadArea.classList.add('dragover');
        });
        
        fileUploadArea.addEventListener('dragleave', function(e) {
            e.preventDefault();
            fileUploadArea.classList.remove('dragover');
        });
        
        fileUploadArea.addEventListener('drop', function(e) {
            e.preventDefault();
            fileUploadArea.classList.remove('dragover');
            
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                fileInput.files = files;
                updateFileDisplay(files);
            }
        });
        
        // File input change
        fileInput.addEventListener('change', function(e) {
            updateFileDisplay(e.target.files);
        });
    }
    
    // Update file display
    function updateFileDisplay(files) {
        const fileUploadLabel = fileUploadArea.querySelector('.file-upload-label');
        if (files.length > 0) {
            let fileNames = [];
            for (let i = 0; i < Math.min(files.length, 5); i++) {
                fileNames.push(files[i].name);
            }
            fileUploadLabel.innerHTML = `
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="17 8 12 3 7 8"></polyline>
                    <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>
                <p style="color: #22c55e; font-weight: 600;">${files.length} file(s) selected</p>
                <span style="font-size: 14px; color: #64748b;">${fileNames.join(', ')}</span>
            `;
        }
    }
    
    // Form submission
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            if (!validateForm()) {
                return;
            }
            
            // Get form data
            const formData = new FormData(form);
            const data = {};
            
            // Convert FormData to object
            for (let [key, value] of formData.entries()) {
                if (key === 'productImages') {
                    continue;
                } else {
                    data[key] = value;
                }
            }
            
            // Process key features (split by newline)
            if (data.keyFeatures) {
                data.keyFeatures = data.keyFeatures.split('\n').filter(f => f.trim()).map(f => f.trim());
            }
            
            // Process applications (split by newline)
            if (data.applications) {
                data.applications = data.applications.split('\n').filter(a => a.trim()).map(a => a.trim());
            }
            
            // Process additional specifications
            if (data.additionalSpecs) {
                const specs = {};
                data.additionalSpecs.split('\n').forEach(line => {
                    const parts = line.split(':');
                    if (parts.length >= 2) {
                        const key = parts[0].trim();
                        const value = parts.slice(1).join(':').trim();
                        if (key && value) {
                            specs[key] = value;
                        }
                    }
                });
                data.specifications = specs;
                delete data.additionalSpecs;
            }
            
            // Get uploaded files info
            const files = fileInput.files;
            data.images = [];
            for (let i = 0; i < files.length; i++) {
                // In a real application, you would upload these to a server
                // For now, we'll just store the file names
                data.images.push(`images/products/${files[i].name}`);
            }
            
            // Video references
            data.videoReferences = [];
            if (data.videoUrl1) {
                data.videoReferences.push(data.videoUrl1);
                delete data.videoUrl1;
            }
            if (data.videoUrl2) {
                data.videoReferences.push(data.videoUrl2);
                delete data.videoUrl2;
            }
            
            // Show loading state
            const submitButton = form.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;
            submitButton.disabled = true;
            submitButton.innerHTML = `
                <span>Uploading...</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spinning">
                    <circle cx="12" cy="12" r="10"></circle>
                </svg>
            `;
            
            // Simulate form submission
            setTimeout(function() {
                // Generate product ID
                data.id = data.productModel.toLowerCase().replace(/[^a-z0-9]/g, '-');
                data.status = 'pending';
                data.uploadedAt = new Date().toISOString();
                
                // Save to localStorage
                const products = JSON.parse(localStorage.getItem('uploadedProducts') || '[]');
                products.push(data);
                localStorage.setItem('uploadedProducts', JSON.stringify(products));
                
                // Also add to products-complete.json data
                addToProductsData(data);
                
                // Show success message
                showSuccessMessage(data.id);
                
                // Reset form
                form.reset();
                submitButton.disabled = false;
                submitButton.innerHTML = originalButtonText;
                
                // Reset file upload display
                const fileUploadLabel = fileUploadArea.querySelector('.file-upload-label');
                fileUploadLabel.innerHTML = `
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="17 8 12 3 7 8"></polyline>
                        <line x1="12" y1="3" x2="12" y2="15"></line>
                    </svg>
                    <p>Click to upload or drag and drop</p>
                    <span>PNG, JPG up to 10MB (Maximum 5 images)</span>
                `;
            }, 2000);
        });
    }
    
    // Validate form
    function validateForm() {
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                const label = field.labels[0]?.textContent || field.name;
                alert(`Please fill in: ${label}`);
                field.focus();
                isValid = false;
                return;
            }
        });
        
        // Validate file upload
        if (fileInput.files.length === 0) {
            alert('Please upload at least one product image');
            isValid = false;
        } else if (fileInput.files.length > 5) {
            alert('Maximum 5 images allowed');
            isValid = false;
        }
        
        // Validate file size
        for (let i = 0; i < fileInput.files.length; i++) {
            if (fileInput.files[i].size > 10 * 1024 * 1024) {
                alert(`File ${fileInput.files[i].name} exceeds 10MB limit`);
                isValid = false;
                break;
            }
        }
        
        return isValid;
    }
    
    // Add to products data
    function addToProductsData(data) {
        // Create product object matching products-complete.json structure
        const product = {
            id: data.id,
            model: data.productModel,
            fullName: data.productName,
            fullNameEn: data.productName,
            category: data.productCategory,
            url: data.productUrl || '',
            description: data.productDescription,
            keyFeatures: data.keyFeatures || [],
            specifications: data.specifications || {},
            applications: data.applications || [],
            images: data.images || [],
            videoReferences: data.videoReferences || [],
            priceRange: data.priceRange || '',
            status: data.productStatus || 'available',
            uploadedAt: data.uploadedAt
        };
        
        // Save to localStorage
        const allProducts = JSON.parse(localStorage.getItem('allProducts') || '[]');
        allProducts.push(product);
        localStorage.setItem('allProducts', JSON.stringify(allProducts));
    }
    
    // Show success message
    function showSuccessMessage(productId) {
        const message = document.createElement('div');
        message.className = 'success-message';
        message.innerHTML = `
            <div class="success-content">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <h2>Product Uploaded Successfully!</h2>
                <p>Product ID: <strong>${productId}</strong></p>
                <p>Your product has been uploaded and will be reviewed by our team within 24 hours.</p>
                <p>You will receive a notification once it's published on the platform.</p>
                <div style="margin-top: 24px; display: flex; gap: 12px; justify-content: center;">
                    <button onclick="location.href='product-upload.html'" class="btn-primary">Upload Another Product</button>
                    <button onclick="this.closest('.success-message').remove()" class="btn-secondary">Close</button>
                </div>
            </div>
        `;
        message.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        `;
        message.querySelector('.success-content').style.cssText = `
            background: white;
            padding: 40px;
            border-radius: 12px;
            text-align: center;
            max-width: 500px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        `;
        message.querySelector('svg').style.cssText = `
            color: #22c55e;
            margin-bottom: 20px;
        `;
        message.querySelector('h2').style.cssText = `
            color: #1e293b;
            margin-bottom: 16px;
            font-size: 24px;
        `;
        message.querySelector('p').style.cssText = `
            color: #64748b;
            margin-bottom: 12px;
            line-height: 1.6;
        `;
        message.querySelectorAll('button').forEach(btn => {
            btn.style.cssText = `
                padding: 12px 24px;
                border: none;
                border-radius: 6px;
                font-size: 16px;
                font-weight: 600;
                cursor: pointer;
            `;
        });
        message.querySelector('.btn-primary').style.cssText += `
            background: #3b82f6;
            color: white;
        `;
        message.querySelector('.btn-secondary').style.cssText += `
            background: #e2e8f0;
            color: #475569;
        `;
        
        document.body.appendChild(message);
    }
});

