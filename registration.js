// Supplier Registration Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('supplierRegistrationForm');
    const fileInput = document.getElementById('productImages');
    const fileUploadArea = document.querySelector('.file-upload-area');
    
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
                if (key === 'productCategories') {
                    if (!data[key]) {
                        data[key] = [];
                    }
                    data[key].push(value);
                } else if (key === 'productImages') {
                    // Skip file input for now
                    continue;
                } else {
                    data[key] = value;
                }
            }
            
            // Get selected product categories
            const categoryCheckboxes = form.querySelectorAll('input[name="productCategories"]:checked');
            data.productCategories = Array.from(categoryCheckboxes).map(cb => cb.value);
            
            // Get uploaded files info
            const files = fileInput.files;
            data.productImagesCount = files.length;
            data.productImagesNames = [];
            for (let i = 0; i < files.length; i++) {
                data.productImagesNames.push(files[i].name);
            }
            
            // Show loading state
            const submitButton = form.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;
            submitButton.disabled = true;
            submitButton.innerHTML = `
                <span>Processing...</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spinning">
                    <circle cx="12" cy="12" r="10"></circle>
                </svg>
            `;
            
            // Simulate form submission (since we don't have a backend)
            setTimeout(function() {
                // Save to localStorage for demonstration
                const registrations = JSON.parse(localStorage.getItem('supplierRegistrations') || '[]');
                data.id = 'SUP' + Date.now();
                data.status = 'pending';
                data.submittedAt = new Date().toISOString();
                registrations.push(data);
                localStorage.setItem('supplierRegistrations', JSON.stringify(registrations));
                
                // Also save to companies data for immediate display
                saveToCompaniesData(data);
                
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
            if (field.type === 'checkbox') {
                if (field.name === 'productCategories') {
                    const checkedCategories = form.querySelectorAll('input[name="productCategories"]:checked');
                    if (checkedCategories.length === 0) {
                        alert('Please select at least one product category');
                        isValid = false;
                        return;
                    }
                } else if (!field.checked) {
                    alert('Please agree to the terms and conditions');
                    isValid = false;
                    return;
                }
            } else if (!field.value.trim()) {
                alert(`Please fill in: ${field.labels[0].textContent}`);
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
    
    // Save to companies data
    function saveToCompaniesData(data) {
        // Create company object
        const company = {
            id: data.id.toLowerCase(),
            name: data.companyName,
            country: data.country,
            city: data.city,
            address: data.address,
            phone: data.phone,
            email: data.email,
            website: data.website || '',
            description: data.companyDescription,
            productCategories: data.productCategories,
            certifications: data.certifications ? [data.certifications] : [],
            yearEstablished: data.yearEstablished || '',
            employees: data.employees || '',
            type: 'supplier',
            status: 'pending',
            registeredAt: data.submittedAt
        };
        
        // Save to localStorage
        const companies = JSON.parse(localStorage.getItem('companies') || '[]');
        companies.push(company);
        localStorage.setItem('companies', JSON.stringify(companies));
    }
    
    // Show success message
    function showSuccessMessage(registrationId) {
        const message = document.createElement('div');
        message.className = 'success-message';
        message.innerHTML = `
            <div class="success-content">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <h2>Registration Submitted Successfully!</h2>
                <p>Your registration ID: <strong>${registrationId}</strong></p>
                <p>Thank you for registering with NEXUS GLOBAL HOLDINGS. Our team will review your application within 3-5 business days.</p>
                <p>You will receive an email confirmation shortly.</p>
                <div style="margin-top: 24px; display: flex; gap: 12px; justify-content: center;">
                    <button onclick="location.href='product-upload.html'" class="btn-primary">Upload Products</button>
                    <button onclick="this.parentElement.parentElement.parentElement.remove()" class="btn-secondary">Close</button>
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

