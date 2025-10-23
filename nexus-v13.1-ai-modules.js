// NEXUS V13.1 - AI Modules Selection Page JavaScript

/**
 * Navigate to selected AI module
 * @param {string} moduleId - Module identifier
 */
function navigateToModule(moduleId) {
    console.log('Navigating to module:', moduleId);
    
    // Module routing configuration
    const moduleRoutes = {
        'equipment-recommendation': 'nexus-v13.3-equipment-configurator.html',
        'roi-calculator': null,  // Coming soon
        'ai-consultation': null,  // Coming soon
        'troubleshooting': null,  // Coming soon
        'industry-encyclopedia': null,  // Coming soon
        'technical-docs': null,  // Coming soon
        'ticketing-system': null,  // Coming soon
        'customer-portal': null  // Coming soon
    };
    
    const targetUrl = moduleRoutes[moduleId];
    
    if (targetUrl) {
        // Add loading animation
        showLoadingAnimation();
        
        // Navigate to target page
        setTimeout(() => {
            window.location.href = targetUrl;
        }, 500);
    } else {
        // Show coming soon message
        showComingSoonMessage(moduleId);
    }
}

/**
 * Show loading animation
 */
function showLoadingAnimation() {
    const loadingOverlay = document.createElement('div');
    loadingOverlay.id = 'loadingOverlay';
    loadingOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(102, 126, 234, 0.95);
        backdrop-filter: blur(10px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease-in-out;
    `;
    
    loadingOverlay.innerHTML = `
        <div style="text-align: center;">
            <div style="font-size: 80px; margin-bottom: 20px; animation: spin 1s linear infinite;"></div>
            <div style="font-size: 24px; color: white; font-weight: 600;">Loading AI Module...</div>
        </div>
    `;
    
    document.body.appendChild(loadingOverlay);
    
    // Add spin animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    `;
    document.head.appendChild(style);
}

/**
 * Show coming soon message
 * @param {string} moduleId - Module identifier
 */
function showComingSoonMessage(moduleId) {
    // Get module name
    const moduleNames = {
        'roi-calculator': 'ROI Calculator & Cost Analysis',
        'troubleshooting': 'Equipment Troubleshooting Assistant',
        'industry-encyclopedia': 'Corrugated Industry Encyclopedia',
        'technical-docs': 'Technical Documentation Center',
        'ticketing-system': 'Online Ticketing System',
        'customer-portal': 'Customer Service Portal'
    };
    
    const moduleName = moduleNames[moduleId] || 'This Module';
    
    // Create modal
    const modal = document.createElement('div');
    modal.id = 'comingSoonModal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        backdrop-filter: blur(5px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease-in-out;
    `;
    
    modal.innerHTML = `
        <div style="
            background: white;
            border-radius: 24px;
            padding: 50px 40px;
            max-width: 500px;
            text-align: center;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            animation: slideUp 0.3s ease-out;
        ">
            <div style="font-size: 80px; margin-bottom: 20px;"></div>
            <h2 style="font-size: 28px; color: #1a1a2e; margin-bottom: 15px; font-weight: 600;">Coming Soon!</h2>
            <p style="font-size: 16px; color: #666; margin-bottom: 30px; line-height: 1.6;">
                <strong>${moduleName}</strong> is currently under development. 
                We're working hard to bring you this feature soon!
            </p>
            <div style="background: linear-gradient(135deg, #f5f7fa, #c3cfe2); padding: 20px; border-radius: 12px; margin-bottom: 30px;">
                <p style="font-size: 14px; color: #444; margin: 0;">
                     Want to be notified when it's ready?<br>
                    Contact us at <strong>support@nexusglobal.asia</strong>
                </p>
            </div>
            <button onclick="closeComingSoonModal()" style="
                padding: 14px 40px;
                background: linear-gradient(135deg, #667eea, #764ba2);
                color: white;
                border: none;
                border-radius: 12px;
                font-size: 16px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
            " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 12px 30px rgba(102, 126, 234, 0.5)';" 
               onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 8px 20px rgba(102, 126, 234, 0.4)';">
                Got It
            </button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideUp {
            from {
                transform: translateY(30px);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeComingSoonModal();
        }
    });
}

/**
 * Close coming soon modal
 */
function closeComingSoonModal() {
    const modal = document.getElementById('comingSoonModal');
    if (modal) {
        modal.style.animation = 'fadeOut 0.3s ease-in-out';
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

/**
 * Initialize page
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('NEXUS V13.1 AI Modules Page Loaded');
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeComingSoonModal();
        }
    });
    
    // Track module card clicks for analytics
    const moduleCards = document.querySelectorAll('.ai-module-card');
    moduleCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Only track if not clicking the button
            if (!e.target.closest('.ai-module-btn')) {
                const moduleId = this.getAttribute('data-module');
                console.log('Module card clicked:', moduleId);
            }
        });
    });
    
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
});

/**
 * Export functions for use in other modules
 */
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        navigateToModule,
        showComingSoonMessage,
        closeComingSoonModal
    };
}

