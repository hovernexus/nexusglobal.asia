// NEXUS V13.1 - Request Quote and View Details Functions

// Global variable to store current equipment data for quote
let currentEquipmentForQuote = null;

/**
 * Open Request Quote Modal
 * @param {Object} equipment - Equipment object with all details
 */
function openQuoteModal(equipment) {
    currentEquipmentForQuote = equipment;
    
    console.log('Opening quote modal for equipment:', equipment);
    
    // Populate equipment information in modal
    document.getElementById('quoteEquipmentName').textContent = equipment.name || '-';
    document.getElementById('quoteSupplier').textContent = equipment.supplier || '-';
    document.getElementById('quotePriceRange').textContent = equipment.priceRange || '-';
    document.getElementById('quoteLeadTime').textContent = equipment.leadTime || '-';
    document.getElementById('quoteMatchScore').textContent = (equipment.matchScore || 0) + '%';
    
    // Show modal
    const modal = document.getElementById('quoteModal');
    modal.classList.add('active');
    modal.style.display = 'flex';
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

/**
 * Close Request Quote Modal
 */
function closeQuoteModal() {
    const modal = document.getElementById('quoteModal');
    modal.classList.remove('active');
    
    // Add fade out animation
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 300);
    
    // Reset form
    const form = document.getElementById('quoteRequestForm');
    if (form) {
        form.reset();
    }
}

/**
 * Close Quote Success Modal
 */
function closeQuoteSuccessModal() {
    const modal = document.getElementById('quoteSuccessModal');
    modal.classList.remove('active');
    
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 300);
}

/**
 * Generate unique reference number for quote
 * @returns {string} Reference number
 */
function generateQuoteReference() {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `NEXUS-${timestamp}-${random}`;
}

/**
 * Submit Quote Request
 * @param {Event} event - Form submit event
 */
async function submitQuoteRequest(event) {
    event.preventDefault();
    
    if (!currentEquipmentForQuote) {
        alert('Error: No equipment selected');
        return;
    }
    
    // Collect form data
    const formData = {
        // Equipment Information
        equipment: {
            name: currentEquipmentForQuote.name,
            supplier: currentEquipmentForQuote.supplier,
            priceRange: currentEquipmentForQuote.priceRange,
            leadTime: currentEquipmentForQuote.leadTime,
            tier: currentEquipmentForQuote.tier,
            matchScore: currentEquipmentForQuote.matchScore
        },
        
        // User Information
        user: {
            name: document.getElementById('quoteName').value,
            company: document.getElementById('quoteCompany').value,
            jobTitle: document.getElementById('quoteJobTitle').value,
            email: document.getElementById('quoteEmail').value,
            phone: document.getElementById('quotePhone').value,
            country: document.getElementById('quoteCountry').value
        },
        
        // Additional Information
        message: document.getElementById('quoteMessage').value,
        
        // Metadata
        referenceNumber: generateQuoteReference(),
        timestamp: new Date().toISOString(),
        source: 'NEXUS AI Equipment Configurator V13.1'
    };
    
    // Show loading state
    const submitBtn = event.target.querySelector('.quote-btn-submit');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="quote-btn-icon">⏳</span> Submitting...';
    submitBtn.disabled = true;
    
    try {
        // Option 1: Send to backend API (if available)
        // await sendQuoteToBackend(formData);
        
        // Option 2: Send email via mailto (temporary solution)
        await sendQuoteViaEmail(formData);
        
        // Option 3: Save to localStorage for admin review
        saveQuoteToLocalStorage(formData);
        
        // Show success modal
        showQuoteSuccessModal(formData);
        
        // Close quote request modal
        closeQuoteModal();
        
    } catch (error) {
        console.error('Error submitting quote request:', error);
        alert('Error submitting quote request. Please try again or contact us directly.');
        
        // Restore button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}

/**
 * Send quote request to backend API
 * @param {Object} formData - Quote request data
 */
async function sendQuoteToBackend(formData) {
    // TODO: Implement backend API integration
    const response = await fetch('/api/quote-requests', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });
    
    if (!response.ok) {
        throw new Error('Failed to submit quote request');
    }
    
    return await response.json();
}

/**
 * Send quote request via email (temporary solution)
 * @param {Object} formData - Quote request data
 */
async function sendQuoteViaEmail(formData) {
    // Compose email content
    const subject = encodeURIComponent(`Quote Request: ${formData.equipment.name} - Ref: ${formData.referenceNumber}`);
    
    const body = encodeURIComponent(`
NEXUS Quote Request
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

EQUIPMENT INFORMATION:
• Equipment: ${formData.equipment.name}
• Supplier: ${formData.equipment.supplier}
• Price Range: ${formData.equipment.priceRange}
• Lead Time: ${formData.equipment.leadTime}
• Tier: ${formData.equipment.tier}
• Match Score: ${formData.equipment.matchScore}%

CUSTOMER INFORMATION:
• Name: ${formData.user.name}
• Company: ${formData.user.company}
• Job Title: ${formData.user.jobTitle}
• Email: ${formData.user.email}
• Phone: ${formData.user.phone}
• Country: ${formData.user.country}

ADDITIONAL MESSAGE:
${formData.message || 'N/A'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Reference Number: ${formData.referenceNumber}
Timestamp: ${new Date(formData.timestamp).toLocaleString()}
Source: ${formData.source}
    `);
    
    // Open mailto link (will open user's email client)
    // In production, replace with actual backend email sending
    const mailtoLink = `mailto:sales@nexusglobal.asia?subject=${subject}&body=${body}`;
    
    // For now, just log the data (in production, send to backend)
    console.log('Quote Request Data:', formData);
    console.log('Mailto Link:', mailtoLink);
    
    // Optionally open mailto link
    // window.open(mailtoLink, '_blank');
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
}

/**
 * Save quote request to localStorage for admin review
 * @param {Object} formData - Quote request data
 */
function saveQuoteToLocalStorage(formData) {
    try {
        // Get existing quotes
        const existingQuotes = JSON.parse(localStorage.getItem('nexus_quote_requests') || '[]');
        
        // Add new quote
        existingQuotes.push(formData);
        
        // Save back to localStorage
        localStorage.setItem('nexus_quote_requests', JSON.stringify(existingQuotes));
        
        console.log('Quote saved to localStorage:', formData.referenceNumber);
    } catch (error) {
        console.error('Error saving quote to localStorage:', error);
    }
}

/**
 * Show quote success modal
 * @param {Object} formData - Quote request data
 */
function showQuoteSuccessModal(formData) {
    // Populate success modal
    document.getElementById('successEquipmentName').textContent = formData.equipment.name;
    document.getElementById('quoteReferenceNumber').textContent = formData.referenceNumber;
    
    // Show success modal
    const modal = document.getElementById('quoteSuccessModal');
    modal.classList.add('active');
    modal.style.display = 'flex';
}

/**
 * View Equipment Details
 * @param {Object} equipment - Equipment object with all details
 */
function viewEquipmentDetails(equipment) {
    console.log('Viewing details for:', equipment);
    
    // V13.1: Show equipment details in a modal instead of navigating to a new page
    // This provides better UX and avoids creating separate detail pages
    
    // Create detail modal HTML
    const detailModalHTML = `
        <div id="equipmentDetailModal" class="quote-modal" style="display: flex;">
            <div class="quote-modal-content" style="max-width: 800px;">
                <button class="quote-modal-close" onclick="closeEquipmentDetailModal()">&times;</button>
                
                <div class="quote-modal-header">
                    <div class="quote-modal-icon"></div>
                    <h2 class="quote-modal-title">Equipment Details</h2>
                    <p class="quote-modal-subtitle">Complete specifications and information</p>
                </div>
                
                <div class="quote-modal-body" style="max-height: 600px; overflow-y: auto;">
                    <div class="quote-equipment-info">
                        <h3 class="quote-section-title">${equipment.name}</h3>
                        <div class="quote-equipment-card">
                            <div class="quote-equipment-details">
                                <span class="quote-detail-item">
                                    <strong>Supplier:</strong> ${equipment.supplier}
                                </span>
                                <span class="quote-detail-item">
                                    <strong>Price Range:</strong> ${equipment.priceRange}
                                </span>
                                <span class="quote-detail-item">
                                    <strong>Lead Time:</strong> ${equipment.leadTime} weeks
                                </span>
                                <span class="quote-detail-item">
                                    <strong>Tier:</strong> ${equipment.tier}
                                </span>
                                <span class="quote-detail-item">
                                    <strong>Match Score:</strong> ${equipment.matchScore}%
                                </span>
                            </div>
                        </div>
                    </div>
                    
                    <div style="margin-top: 20px;">
                        <h4 style="font-size: 16px; font-weight: 600; margin-bottom: 10px;">Full Equipment Information</h4>
                        <p style="color: #666; line-height: 1.6;">
                            For complete technical specifications, CAD drawings, user manuals, and detailed product information, 
                            please contact our sales team or submit a quote request.
                        </p>
                        <p style="color: #666; line-height: 1.6; margin-top: 10px;">
                            Our team will provide you with comprehensive documentation including:
                        </p>
                        <ul style="color: #666; line-height: 1.8; margin-left: 20px;">
                            <li>Detailed technical specifications</li>
                            <li>CAD drawings and floor plans</li>
                            <li>Installation requirements</li>
                            <li>Maintenance guidelines</li>
                            <li>Training materials</li>
                        </ul>
                    </div>
                    
                    <div style="margin-top: 30px; padding: 20px; background: #f8f9fa; border-radius: 8px;">
                        <h4 style="font-size: 16px; font-weight: 600; margin-bottom: 10px;">Contact Information</h4>
                        <p style="color: #666; line-height: 1.6;">
                            <strong>Email:</strong> sales@nexusglobal.asia<br>
                            <strong>Phone:</strong> +1 (555) 123-4567<br>
                            <strong>Website:</strong> www.nexusglobal.asia
                        </p>
                    </div>
                </div>
                
                <div style="padding: 20px; border-top: 1px solid #e5e7eb; display: flex; gap: 10px; justify-content: flex-end;">
                    <button class="quote-btn quote-btn-secondary" onclick="closeEquipmentDetailModal()">
                        Close
                    </button>
                    <button class="quote-btn quote-btn-primary" onclick="closeEquipmentDetailModal(); setTimeout(() => openQuoteModal(${JSON.stringify(equipment).replace(/"/g, '&quot;')}), 100);">
                        Request Quote
                    </button>
                </div>
            </div>
        </div>
    `;
    
    // Remove existing detail modal if any
    const existingModal = document.getElementById('equipmentDetailModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', detailModalHTML);
    
    console.log('Equipment detail modal opened');
}

/**
 * Update recommendation card buttons to use new functions
 * This function should be called after recommendations are displayed
 */
function updateRecommendationButtons() {
    // Find all equipment cards (V13.1 uses .equipment-card instead of .recommendation-card)
    const equipmentCards = document.querySelectorAll('.equipment-card');
    
    console.log('Updating buttons for', equipmentCards.length, 'equipment cards');
    
    equipmentCards.forEach((card, index) => {
        // Get equipment data from dataset (stored by createEquipmentCard)
        const equipmentDataStr = card.dataset.equipmentData;
        if (!equipmentDataStr) {
            console.warn('No equipment data found for card', index);
            return;
        }
        
        let equipment;
        try {
            equipment = JSON.parse(equipmentDataStr);
        } catch (e) {
            console.error('Failed to parse equipment data:', e);
            return;
        }
        
        // Update Request Quote button
        const quoteBtn = card.querySelector('.recommendation-btn-primary');
        if (quoteBtn) {
            quoteBtn.onclick = (e) => {
                e.preventDefault();
                openQuoteModal(equipment);
            };
        }
        
        // Update View Details button
        const detailsBtn = card.querySelector('.recommendation-btn-secondary');
        if (detailsBtn) {
            detailsBtn.onclick = (e) => {
                e.preventDefault();
                viewEquipmentDetails(equipment);
            };
        }
    });
}

/**
 * Initialize quote functionality
 */
function initializeQuoteFunctions() {
    console.log('Initializing quote functions...');
    
    // Initialize form submission handler
    const quoteForm = document.getElementById('quoteRequestForm');
    if (quoteForm) {
        quoteForm.addEventListener('submit', submitQuoteRequest);
    }
    
    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        const quoteModal = document.getElementById('quoteModal');
        const successModal = document.getElementById('quoteSuccessModal');
        
        if (event.target === quoteModal) {
            closeQuoteModal();
        }
        if (event.target === successModal) {
            closeQuoteSuccessModal();
        }
    });
    
    // Close modals with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeQuoteModal();
            closeQuoteSuccessModal();
        }
    });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeQuoteFunctions);
} else {
    initializeQuoteFunctions();
}

// Export functions for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        openQuoteModal,
        closeQuoteModal,
        viewEquipmentDetails,
        submitQuoteRequest,
        updateRecommendationButtons
    };
}



/**
 * Close Equipment Detail Modal
 */
function closeEquipmentDetailModal() {
    const modal = document.getElementById('equipmentDetailModal');
    if (modal) {
        modal.style.display = 'none';
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
    console.log('Equipment detail modal closed');
}

