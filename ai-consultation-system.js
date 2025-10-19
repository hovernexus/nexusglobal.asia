/* ===================================
   NEXUS AI Consultation System JavaScript
   Version: 10.6
   =================================== */

// Service Modules Data
const serviceModules = [
    // Product Selection Category
    {
        id: 'smart-recommendation',
        category: 'product-selection',
        icon: '🎯',
        title: 'Smart Equipment Recommendation',
        titleZh: '智能设备推荐系统',
        description: 'AI-powered system analyzes your requirements and recommends the best equipment solutions',
        descriptionZh: 'AI驱动系统分析您的需求并推荐最佳设备解决方案',
        features: [
            'Requirement Analysis',
            'Equipment Matching',
            'Configuration Optimization',
            'Compatibility Check'
        ],
        status: 'available',
        detailedDescription: 'Our intelligent recommendation system uses advanced AI algorithms to analyze your production requirements, budget constraints, and operational goals. It then matches you with the most suitable equipment from our comprehensive product catalog, ensuring optimal performance and ROI.',
        useCases: [
            'New production line setup',
            'Equipment upgrade planning',
            'Production capacity expansion',
            'Technology modernization'
        ]
    },
    {
        id: 'roi-calculator',
        category: 'product-selection',
        icon: '💰',
        title: 'ROI Calculator & Cost Analysis',
        titleZh: 'ROI计算与成本分析',
        description: 'Calculate investment returns and analyze total cost of ownership',
        descriptionZh: '计算投资回报并分析总拥有成本',
        features: [
            'NPV Calculation',
            'Payback Period',
            'Cost Breakdown',
            'Risk Assessment'
        ],
        status: 'available',
        detailedDescription: 'Make informed investment decisions with our comprehensive ROI calculator. Analyze initial costs, operational expenses, maintenance requirements, and projected returns to understand the true value of your equipment investment.',
        useCases: [
            'Capital investment planning',
            'Budget justification',
            'Equipment comparison',
            'Financial forecasting'
        ]
    },
    
    // Technical Support Category
    {
        id: 'ai-consultation',
        category: 'technical-support',
        icon: '💬',
        title: '24/7 AI Technical Consultation',
        titleZh: '24/7 AI技术咨询',
        description: 'Get instant answers to technical questions anytime, anywhere',
        descriptionZh: '随时随地获得技术问题的即时解答',
        features: [
            'Intelligent Q&A',
            'Knowledge Base Search',
            'Expert Connection',
            'Consultation History'
        ],
        status: 'available',
        detailedDescription: 'Our AI-powered consultation system provides round-the-clock technical support. Get instant answers to common questions, access our extensive knowledge base, and connect with human experts when needed.',
        useCases: [
            'Technical troubleshooting',
            'Product inquiries',
            'Installation guidance',
            'Maintenance support'
        ]
    },
    {
        id: 'troubleshooting',
        category: 'technical-support',
        icon: '🔧',
        title: 'Equipment Troubleshooting Assistant',
        titleZh: '设备故障诊断助手',
        description: 'AI-guided troubleshooting for common equipment issues',
        descriptionZh: 'AI引导的常见设备问题故障排除',
        features: [
            'Symptom Analysis',
            'Solution Suggestions',
            'Video Tutorials',
            'Remote Support'
        ],
        status: 'available',
        detailedDescription: 'Quickly diagnose and resolve equipment issues with our intelligent troubleshooting assistant. Follow step-by-step guidance, watch video tutorials, and access remote support when needed.',
        useCases: [
            'Equipment malfunction diagnosis',
            'Performance optimization',
            'Preventive maintenance',
            'Emergency support'
        ]
    },
    
    // Industry Knowledge Category
    {
        id: 'industry-encyclopedia',
        category: 'industry-knowledge',
        icon: '📖',
        title: 'Corrugated Industry Encyclopedia',
        titleZh: '瓦楞纸箱行业百科',
        description: 'Comprehensive knowledge base covering all aspects of corrugated packaging',
        descriptionZh: '涵盖瓦楞纸箱包装各个方面的综合知识库',
        features: [
            'Industry Standards',
            'Best Practices',
            'Case Studies',
            'Market Trends'
        ],
        status: 'available',
        detailedDescription: 'Access our comprehensive encyclopedia covering everything from basic concepts to advanced techniques in corrugated packaging. Stay updated with industry standards, best practices, and market trends.',
        useCases: [
            'Industry research',
            'Training and education',
            'Standards compliance',
            'Market analysis'
        ]
    },
    {
        id: 'technical-docs',
        category: 'industry-knowledge',
        icon: '📄',
        title: 'Technical Documentation Center',
        titleZh: '技术文档中心',
        description: 'Access detailed technical specifications, manuals, and guides',
        descriptionZh: '访问详细的技术规格、手册和指南',
        features: [
            'Product Manuals',
            'Technical Specs',
            'Installation Guides',
            'Maintenance Tips'
        ],
        status: 'available',
        detailedDescription: 'Find all the technical documentation you need in one centralized location. Download product manuals, technical specifications, installation guides, and maintenance procedures.',
        useCases: [
            'Equipment installation',
            'Maintenance planning',
            'Technical reference',
            'Training materials'
        ]
    },
    
    // Customer Service Category
    {
        id: 'ticketing-system',
        category: 'customer-service',
        icon: '🎫',
        title: 'Online Ticketing System',
        titleZh: '在线工单系统',
        description: 'Submit and track service requests with our integrated ticketing system',
        descriptionZh: '通过我们的集成工单系统提交和跟踪服务请求',
        features: [
            'Ticket Submission',
            'Status Tracking',
            'Priority Management',
            'Resolution History'
        ],
        status: 'available',
        detailedDescription: 'Efficiently manage your service requests with our online ticketing system. Submit tickets, track progress, set priorities, and maintain a complete history of all service interactions.',
        useCases: [
            'Service request management',
            'Issue tracking',
            'Support coordination',
            'Service history review'
        ]
    },
    {
        id: 'customer-portal',
        category: 'customer-service',
        icon: '🏢',
        title: 'Customer Service Portal',
        titleZh: '客户服务门户',
        description: 'Unified platform for all your service needs and account management',
        descriptionZh: '满足您所有服务需求和账户管理的统一平台',
        features: [
            'Account Dashboard',
            'Service History',
            'Document Library',
            'Contact Directory'
        ],
        status: 'available',
        detailedDescription: 'Access all your service needs through our unified customer portal. View your account dashboard, review service history, access documents, and manage your contact information.',
        useCases: [
            'Account management',
            'Service coordination',
            'Document access',
            'Communication management'
        ]
    }
];

// Category Configuration
const categories = {
    'product-selection': {
        icon: '🎯',
        title: 'Product Selection Consulting',
        titleZh: '产品选型咨询',
        count: 2
    },
    'technical-support': {
        icon: '🛠️',
        title: 'Technical Support Services',
        titleZh: '技术支持服务',
        count: 2
    },
    'industry-knowledge': {
        icon: '📚',
        title: 'Industry Knowledge Base',
        titleZh: '行业知识库',
        count: 2
    },
    'customer-service': {
        icon: '👥',
        title: 'Customer Service Center',
        titleZh: '客户服务中心',
        count: 2
    }
};

// Modal Manager Class
class ModalManager {
    constructor() {
        this.modal = null;
        this.init();
    }
    
    init() {
        // Create modal overlay if it doesn't exist
        if (!document.getElementById('serviceModal')) {
            const modalHTML = `
                <div id="serviceModal" class="modal-overlay">
                    <div class="modal-content">
                        <button class="modal-close" onclick="modalManager.close()">✕</button>
                        <div id="modalBody"></div>
                    </div>
                </div>
            `;
            document.body.insertAdjacentHTML('beforeend', modalHTML);
            this.modal = document.getElementById('serviceModal');
            
            // Close on overlay click
            this.modal.addEventListener('click', (e) => {
                if (e.target === this.modal) {
                    this.close();
                }
            });
            
            // Close on Escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                    this.close();
                }
            });
        }
    }
    
    open(moduleId) {
        const module = serviceModules.find(m => m.id === moduleId);
        if (!module) return;
        
        const modalBody = document.getElementById('modalBody');
        modalBody.innerHTML = `
            <div class="modal-header">
                <div class="modal-icon">${module.icon}</div>
                <div>
                    <h2 class="modal-title">${module.title}</h2>
                    <p class="modal-title-zh">${module.titleZh}</p>
                </div>
            </div>
            
            <div class="modal-body">
                <p class="modal-description">${module.description}</p>
                <p class="modal-description" style="color: var(--gray-600);">${module.descriptionZh}</p>
                
                <div class="modal-features">
                    <h3 class="modal-features-title">Detailed Description / 详细说明</h3>
                    <p class="modal-description">${module.detailedDescription}</p>
                </div>
                
                <div class="modal-features">
                    <h3 class="modal-features-title">Core Features / 核心功能</h3>
                    <div class="modal-features-list">
                        ${module.features.map(feature => `
                            <div class="modal-feature-item">
                                <div class="modal-feature-icon">✓</div>
                                <div class="modal-feature-text">${feature}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="modal-features">
                    <h3 class="modal-features-title">Use Cases / 使用场景</h3>
                    <div class="modal-features-list">
                        ${module.useCases.map(useCase => `
                            <div class="modal-feature-item">
                                <div class="modal-feature-icon">→</div>
                                <div class="modal-feature-text">${useCase}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
            
            <div class="modal-actions">
                <button class="btn-primary" onclick="launchModule('${module.id}')">
                    <span>Launch Module</span>
                    <span>→</span>
                </button>
                <button class="btn-secondary" onclick="modalManager.close()">
                    Close
                </button>
            </div>
        `;
        
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    close() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Initialize Modal Manager
let modalManager;

// Render Service Cards
function renderServiceCards() {
    const servicesContainer = document.getElementById('servicesContainer');
    if (!servicesContainer) return;
    
    let html = '';
    
    // Group modules by category
    Object.keys(categories).forEach(categoryKey => {
        const category = categories[categoryKey];
        const modules = serviceModules.filter(m => m.category === categoryKey);
        
        html += `
            <div class="service-category">
                <div class="category-header">
                    <span class="category-icon">${category.icon}</span>
                    <h2 class="category-title">${category.title}</h2>
                    <span class="category-count">${category.count} modules</span>
                </div>
                
                <div class="service-cards">
                    ${modules.map(module => `
                        <div class="service-card fade-in-up">
                            <div class="card-header">
                                <div class="card-icon">${module.icon}</div>
                                <div class="card-title-section">
                                    <h3 class="card-title">${module.title}</h3>
                                    <p class="card-title-zh">${module.titleZh}</p>
                                </div>
                            </div>
                            <span class="card-status ${module.status}">${module.status === 'available' ? 'Available' : 'Coming Soon'}</span>
                            
                            <div class="card-content">
                                <p class="card-description">${module.description}</p>
                                <p class="card-description-zh">${module.descriptionZh}</p>
                                
                                <div class="card-features">
                                    <h4 class="features-title">Core Features / 核心功能</h4>
                                    <div class="feature-tags">
                                        ${module.features.map(feature => `
                                            <span class="feature-tag">${feature}</span>
                                        `).join('')}
                                    </div>
                                </div>
                            </div>
                            
                            <div class="card-actions">
                                <button class="btn-primary" onclick="launchModule('${module.id}')">
                                    <span>Launch Module</span>
                                    <span>→</span>
                                </button>
                                <button class="btn-secondary" onclick="showModuleDetails('${module.id}')">
                                    View Details
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    });
    
    servicesContainer.innerHTML = html;
}

// Animate Statistics Numbers
function animateNumber(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Initialize Statistics Animation
function initStatsAnimation() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.target);
                const suffix = entry.target.dataset.suffix || '';
                
                if (suffix === 's') {
                    // For response time
                    let current = 0;
                    const timer = setInterval(() => {
                        current += 0.1;
                        if (current >= target) {
                            entry.target.textContent = `<${target}s`;
                            clearInterval(timer);
                        } else {
                            entry.target.textContent = `${current.toFixed(1)}s`;
                        }
                    }, 20);
                } else if (suffix === '%') {
                    // For percentage
                    animateNumber(entry.target, target, 2000);
                    setTimeout(() => {
                        entry.target.textContent = `${target}%`;
                    }, 2000);
                } else if (suffix === '+') {
                    // For numbers with +
                    animateNumber(entry.target, target, 2000);
                    setTimeout(() => {
                        entry.target.textContent = `${target}+`;
                    }, 2000);
                } else {
                    animateNumber(entry.target, target, 2000);
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(num => observer.observe(num));
}

// Show Module Details
function showModuleDetails(moduleId) {
    modalManager.open(moduleId);
}

// Launch Module
function launchModule(moduleId) {
    const module = serviceModules.find(m => m.id === moduleId);
    if (!module) return;
    
    // Close modal if open
    if (modalManager) {
        modalManager.close();
    }
    
    // Show alert for demo purposes
    alert(`Launching ${module.title}...\n\nThis is a demo. In production, this would:\n- Open the module interface\n- Start an AI chat session\n- Navigate to the specific tool\n\nModule ID: ${moduleId}`);
    
    // In production, you would navigate to the actual module
    // window.location.href = `module.html?id=${moduleId}`;
}

// Start Consultation
function startConsultation() {
    // Navigate to the AI consultation chat interface
    window.location.href = 'consultation-chat.html';
}

// Initialize on DOM Load
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Modal Manager
    modalManager = new ModalManager();
    
    // Render Service Cards
    renderServiceCards();
    
    // Initialize Statistics Animation
    initStatsAnimation();
    
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
});

// Export functions for global use
window.showModuleDetails = showModuleDetails;
window.launchModule = launchModule;
window.startConsultation = startConsultation;

