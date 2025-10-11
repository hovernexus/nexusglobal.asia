// Registration Form Handling

document.addEventListener('DOMContentLoaded', function() {
    // Get form element
    const form = document.getElementById('supplierRegistrationForm') || document.getElementById('customerRegistrationForm');
    
    if (!form) return;
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        if (!validateForm(form)) {
            return;
        }
        
        // Collect form data
        const formData = new FormData(form);
        const data = {};
        
        // Convert FormData to object
        for (let [key, value] of formData.entries()) {
            if (data[key]) {
                // Handle multiple values (checkboxes)
                if (Array.isArray(data[key])) {
                    data[key].push(value);
                } else {
                    data[key] = [data[key], value];
                }
            } else {
                data[key] = value;
            }
        }
        
        // Show loading state
        const submitBtn = form.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>Submitting...</span>';
        submitBtn.disabled = true;
        
        // Simulate API call (replace with actual API endpoint)
        setTimeout(() => {
            console.log('Form Data:', data);
            
            // Show success message
            showSuccessMessage();
            
            // Reset form
            form.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 2000);
    });
    
    // File upload handling
    const fileUploadArea = document.getElementById('fileUploadArea');
    const fileInput = document.getElementById('fileInput');
    const uploadedFilesContainer = document.getElementById('uploadedFiles');
    
    if (fileUploadArea && fileInput) {
        fileUploadArea.addEventListener('click', () => {
            fileInput.click();
        });
        
        fileUploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            fileUploadArea.style.borderColor = '#3b82f6';
            fileUploadArea.style.background = '#eff6ff';
        });
        
        fileUploadArea.addEventListener('dragleave', () => {
            fileUploadArea.style.borderColor = '#cbd5e1';
            fileUploadArea.style.background = '#f8fafc';
        });
        
        fileUploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            fileUploadArea.style.borderColor = '#cbd5e1';
            fileUploadArea.style.background = '#f8fafc';
            
            const files = e.dataTransfer.files;
            handleFiles(files);
        });
        
        fileInput.addEventListener('change', (e) => {
            const files = e.target.files;
            handleFiles(files);
        });
    }
    
    function handleFiles(files) {
        if (!uploadedFilesContainer) return;
        
        Array.from(files).forEach(file => {
            // Check file size (max 10MB)
            if (file.size > 10 * 1024 * 1024) {
                alert(`File "${file.name}" is too large. Maximum size is 10MB.`);
                return;
            }
            
            // Check file type
            const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
            if (!allowedTypes.includes(file.type)) {
                alert(`File "${file.name}" type is not allowed. Please upload JPG, PNG, or PDF files.`);
                return;
            }
            
            // Create file item
            const fileItem = document.createElement('div');
            fileItem.className = 'uploaded-file';
            fileItem.innerHTML = `
                <svg class="uploaded-file-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                    <polyline points="13 2 13 9 20 9"></polyline>
                </svg>
                <div class="uploaded-file-info">
                    <div class="uploaded-file-name">${file.name}</div>
                    <div class="uploaded-file-size">${formatFileSize(file.size)}</div>
                </div>
                <button type="button" class="remove-file-btn" onclick="this.parentElement.remove()">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            `;
            
            uploadedFilesContainer.appendChild(fileItem);
        });
    }
    
    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    }
    
    function validateForm(form) {
        // Check required fields
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.style.borderColor = '#ef4444';
                isValid = false;
            } else {
                field.style.borderColor = '#e2e8f0';
            }
        });
        
        // Check at least one checkbox is selected for required checkbox groups
        const checkboxGroups = {
            'productTypes': 'Please select at least one product type',
            'targetIndustries': 'Please select at least one target industry',
            'currentEquipment': 'Please select at least one equipment category',
            'interestedEquipment': 'Please select at least one equipment category you\'re interested in'
        };
        
        for (let [name, message] of Object.entries(checkboxGroups)) {
            const checkboxes = form.querySelectorAll(`input[name="${name}"]:checked`);
            if (checkboxes.length === 0) {
                alert(message);
                isValid = false;
                break;
            }
        }
        
        if (!isValid) {
            alert('Please fill in all required fields');
        }
        
        return isValid;
    }
    
    function showSuccessMessage() {
        // Create success message overlay
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        `;
        
        const messageBox = document.createElement('div');
        messageBox.className = 'success-message show';
        messageBox.innerHTML = `
            <svg class="success-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <h2 class="success-title">Registration Submitted Successfully!</h2>
            <p class="success-text">Thank you for registering with NEXUS GLOBAL HOLDINGS. Our team will review your application and contact you within 2-3 business days.</p>
            <a href="index.html" class="btn-home">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
                <span>Return to Homepage</span>
            </a>
        `;
        
        overlay.appendChild(messageBox);
        document.body.appendChild(overlay);
        
        // Close on overlay click
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.remove();
            }
        });
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
