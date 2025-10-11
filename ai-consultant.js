// ===================================
// AI Consultant Page JavaScript
// ===================================

// DOM Elements
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const sendBtn = document.getElementById('sendBtn');
const attachBtn = document.getElementById('attachBtn');
const fileInput = document.getElementById('fileInput');
const quickQuestions = document.querySelectorAll('.question-btn');
const switchConsultant = document.getElementById('switchConsultant');
const consultantImage = document.getElementById('consultantImage');
const consultantName = document.getElementById('consultantName');
const contactModal = document.getElementById('contactModal');
const modalClose = document.getElementById('modalClose');
const cancelBtn = document.getElementById('cancelBtn');
const contactForm = document.getElementById('contactForm');

// State
let isAITyping = false;
let currentConsultant = 'customer-service'; // 'customer-service' or 'engineer'

// Knowledge Base
const knowledgeBase = {
    'production-diagnosis': {
        question: "I need help diagnosing my production line",
        response: `<p><strong>Production Line Diagnosis Service</strong></p>
        <p>I'd be happy to help diagnose your production line! To provide the most accurate analysis, I'll need some information:</p>
        <ul>
            <li>📊 Current production capacity (boxes/day or sheets/hour)</li>
            <li>⚙️ Existing equipment (brands and models)</li>
            <li>🎯 Target production goals</li>
            <li>⚠️ Current bottlenecks or issues</li>
            <li>📦 Product specifications (box types, sizes, printing requirements)</li>
        </ul>
        <p>Would you like to:</p>
        <p>1️⃣ Schedule a virtual production line assessment<br>
        2️⃣ Upload your current equipment list<br>
        3️⃣ Describe your specific challenges</p>
        <p>Which option works best for you?</p>`,
        followUp: true
    },
    'equipment-selection': {
        question: "Help me select the right equipment",
        response: `<p><strong>Equipment Selection Guide</strong></p>
        <p>I can help you find the perfect equipment for your needs! NEXUS offers a comprehensive range:</p>
        <ul>
            <li>🖨️ <strong>Digital Printing:</strong> Single-pass and scanning digital printers (Glory160X HD, Ultra2500W)</li>
            <li>✂️ <strong>Die-Cutting:</strong> Automatic and semi-automatic die-cutters (TD800S, MK1060F laser)</li>
            <li>🎨 <strong>Flexo Printing:</strong> High-speed flexographic printing lines</li>
            <li>📦 <strong>FFG Inline:</strong> Complete corrugator-to-finished-box solutions</li>
            <li>🤖 <strong>Automation:</strong> Pre-feeders, palletizers, robotic systems (ODJ series)</li>
            <li>🔧 <strong>Spare Parts:</strong> Comprehensive parts and consumables</li>
        </ul>
        <p>What type of equipment are you most interested in? Or would you like me to recommend a complete solution based on your production requirements?</p>`,
        followUp: true
    },
    'technical-specs': {
        question: "I need technical specifications",
        response: `<p><strong>Technical Specifications Database</strong></p>
        <p>I have access to detailed technical specifications for all our equipment. Here are some examples:</p>
        <p><strong>Digital Printers:</strong></p>
        <ul>
            <li>Glory160X HD: 150 m/min, 1200×1200 DPI, Single Pass technology</li>
            <li>Ultra2500W: Scanning type, multi-functional, industrial-grade</li>
        </ul>
        <p><strong>Die-Cutters:</strong></p>
        <ul>
            <li>TD800S/1650S: Fully automatic with waste removal</li>
            <li>MK1060F: Laser die-cutting, high precision</li>
        </ul>
        <p><strong>Automation Equipment:</strong></p>
        <ul>
            <li>ODJ Pre-feeders: QSL2/3/4, QXY3, JXB (robotic arm)</li>
            <li>MD-350 Palletizer: 3D visual AI system, Kawasaki robotic arm</li>
        </ul>
        <p>Which equipment would you like detailed specifications for? I can provide:</p>
        <p>📄 Full technical datasheets<br>
        📐 Dimensional drawings<br>
        ⚡ Power requirements<br>
        🎯 Performance parameters</p>`,
        followUp: true
    },
    'cost-optimization': {
        question: "How can I optimize costs?",
        response: `<p><strong>Cost Optimization Strategies</strong></p>
        <p>Let me help you maximize your ROI! Here are proven strategies:</p>
        <p><strong>1. Equipment Upgrade vs. Replacement</strong></p>
        <ul>
            <li>💡 Upgrade existing lines with minimal investment</li>
            <li>🔄 Retrofit older equipment with modern controls</li>
            <li>⚙️ Add automation to reduce labor costs</li>
        </ul>
        <p><strong>2. Production Efficiency</strong></p>
        <ul>
            <li>📈 Increase speed by 150% with digital printing</li>
            <li>🎯 Reduce waste with precision die-cutting</li>
            <li>🤖 Minimize errors with AI-powered palletizing</li>
        </ul>
        <p><strong>3. Energy & Maintenance</strong></p>
        <ul>
            <li>⚡ Lower energy consumption with modern equipment</li>
            <li>🔧 Reduce downtime with preventive maintenance</li>
            <li>📦 Optimize spare parts inventory</li>
        </ul>
        <p>Would you like a customized cost-benefit analysis for your specific situation?</p>`,
        followUp: true
    },
    'service-support': {
        question: "What service and support do you offer?",
        response: `<p><strong>Comprehensive Service & Support</strong></p>
        <p>NEXUS provides world-class after-sales support:</p>
        <p><strong>🛠️ Technical Support</strong></p>
        <ul>
            <li>24/7 hotline assistance</li>
            <li>Remote diagnostics and troubleshooting</li>
            <li>On-site technical visits</li>
            <li>Video consultation services</li>
        </ul>
        <p><strong>📚 Training & Documentation</strong></p>
        <ul>
            <li>Operator training programs</li>
            <li>Maintenance training</li>
            <li>Complete technical manuals</li>
            <li>Video tutorials</li>
        </ul>
        <p><strong>🔧 Spare Parts & Maintenance</strong></p>
        <ul>
            <li>Genuine spare parts inventory</li>
            <li>Fast delivery worldwide</li>
            <li>Preventive maintenance plans</li>
            <li>Equipment health monitoring</li>
        </ul>
        <p><strong>🎯 Value-Added Services</strong></p>
        <ul>
            <li>Production line optimization</li>
            <li>Process consulting</li>
            <li>Quality control assistance</li>
            <li>Upgrade recommendations</li>
        </ul>
        <p>What specific support do you need? I can connect you with our technical team!</p>`,
        followUp: true
    },
    'custom-inquiry': {
        question: "I have a custom question",
        response: `<p><strong>Custom Inquiry</strong></p>
        <p>I'm here to help with any questions you have! Please tell me more about:</p>
        <ul>
            <li>🎯 Your specific requirements</li>
            <li>📊 Your production challenges</li>
            <li>💼 Your business goals</li>
            <li>🌍 Your location and market</li>
        </ul>
        <p>Feel free to ask anything about:</p>
        <p>• Equipment capabilities and compatibility<br>
        • Installation and commissioning<br>
        • Financing and payment terms<br>
        • Delivery timelines<br>
        • Training and support<br>
        • Case studies and references</p>
        <p>What would you like to know?</p>`,
        followUp: true
    }
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeEventListeners();
    autoResizeTextarea();
});

// Event Listeners
function initializeEventListeners() {
    // Send message
    sendBtn.addEventListener('click', handleSendMessage);
    chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    });

    // Quick questions
    quickQuestions.forEach(btn => {
        btn.addEventListener('click', () => {
            const questionType = btn.dataset.question;
            handleQuickQuestion(questionType);
        });
    });

    // File attachment
    attachBtn.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', handleFileUpload);

    // Switch consultant
    switchConsultant.addEventListener('click', handleSwitchConsultant);

    // Modal
    modalClose.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);
    contactForm.addEventListener('submit', handleContactSubmit);
    contactModal.addEventListener('click', (e) => {
        if (e.target === contactModal) closeModal();
    });
}

// Handle Send Message
function handleSendMessage() {
    const message = chatInput.value.trim();
    if (!message || isAITyping) return;

    // Add user message
    addUserMessage(message);
    chatInput.value = '';
    autoResizeTextarea();

    // Simulate AI response
    setTimeout(() => {
        showTypingIndicator();
        setTimeout(() => {
            hideTypingIndicator();
            const response = generateAIResponse(message);
            addAIMessage(response);
        }, 2000);
    }, 500);
}

// Handle Quick Question
function handleQuickQuestion(questionType) {
    const data = knowledgeBase[questionType];
    if (!data) return;

    // Add user message
    addUserMessage(data.question);

    // Simulate AI response
    setTimeout(() => {
        showTypingIndicator();
        setTimeout(() => {
            hideTypingIndicator();
            addAIMessage(data.response);
            
            // Suggest contact for follow-up
            if (data.followUp) {
                setTimeout(() => {
                    addAIMessage(`<p>Would you like to connect with our technical team for a detailed consultation? I can help you schedule a call or video meeting.</p>
                    <p><button class="inline-btn" onclick="openContactModal()">📞 Schedule Consultation</button></p>`);
                }, 1000);
            }
        }, 2500);
    }, 500);
}

// Generate AI Response
function generateAIResponse(message) {
    const lowerMessage = message.toLowerCase();

    // Check for keywords
    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('quote')) {
        return `<p>Thank you for your interest in pricing! Equipment costs vary based on specifications, configuration, and volume.</p>
        <p>For an accurate quote, I'll need:</p>
        <ul>
            <li>📦 Specific equipment models</li>
            <li>📊 Production requirements</li>
            <li>🌍 Delivery location</li>
            <li>⚙️ Optional features/upgrades</li>
        </ul>
        <p>Would you like me to connect you with our sales team for a detailed quotation?</p>
        <p><button class="inline-btn" onclick="openContactModal()">Get Quote</button></p>`;
    }

    if (lowerMessage.includes('delivery') || lowerMessage.includes('shipping') || lowerMessage.includes('lead time')) {
        return `<p><strong>Delivery & Lead Times</strong></p>
        <p>Standard lead times:</p>
        <ul>
            <li>🖨️ Digital Printers: 45-60 days</li>
            <li>✂️ Die-Cutters: 30-45 days</li>
            <li>🤖 Automation Equipment: 60-90 days</li>
            <li>🔧 Spare Parts: 7-14 days</li>
        </ul>
        <p>We offer:</p>
        <ul>
            <li>🚢 Worldwide shipping</li>
            <li>📦 Professional packaging</li>
            <li>🛡️ Insurance coverage</li>
            <li>📍 Installation support</li>
        </ul>
        <p>Where would you like the equipment delivered?</p>`;
    }

    if (lowerMessage.includes('training') || lowerMessage.includes('installation')) {
        return `<p><strong>Installation & Training Services</strong></p>
        <p>We provide comprehensive support:</p>
        <p><strong>🔧 Installation</strong></p>
        <ul>
            <li>Professional installation team</li>
            <li>Equipment commissioning</li>
            <li>Performance testing</li>
            <li>Quality assurance</li>
        </ul>
        <p><strong>📚 Training</strong></p>
        <ul>
            <li>Operator training (3-5 days)</li>
            <li>Maintenance training</li>
            <li>Safety procedures</li>
            <li>Troubleshooting guides</li>
        </ul>
        <p>Training can be conducted at your facility or at our training center. Would you like more details?</p>`;
    }

    // Default response
    return `<p>Thank you for your question! I'd be happy to help you with that.</p>
    <p>To provide the most accurate information, could you please provide more details about:</p>
    <ul>
        <li>Your current production setup</li>
        <li>Specific requirements or challenges</li>
        <li>Your production goals</li>
    </ul>
    <p>Or, I can connect you directly with our technical experts who can provide specialized assistance.</p>
    <p><button class="inline-btn" onclick="openContactModal()">Talk to Expert</button></p>`;
}

// Add User Message
function addUserMessage(message) {
    const messageHTML = `
        <div class="user-message-wrapper">
            <div class="message-avatar">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                </svg>
            </div>
            <div class="message-content">
                <div class="message-bubble user-message">
                    <p>${escapeHtml(message)}</p>
                </div>
                <div class="message-time">${getCurrentTime()}</div>
            </div>
        </div>
    `;
    chatMessages.insertAdjacentHTML('beforeend', messageHTML);
    scrollToBottom();
}

// Add AI Message
function addAIMessage(message) {
    const messageHTML = `
        <div class="message-item">
            <div class="message-avatar">
                <img src="images/${currentConsultant === 'customer-service' ? 'customer-service-rep.jpg' : 'engineer-consultant.jpg'}" alt="AI">
            </div>
            <div class="message-content">
                <div class="message-bubble ai-message">
                    ${message}
                </div>
                <div class="message-time">${getCurrentTime()}</div>
            </div>
        </div>
    `;
    chatMessages.insertAdjacentHTML('beforeend', messageHTML);
    scrollToBottom();
}

// Typing Indicator
function showTypingIndicator() {
    isAITyping = true;
    const typingHTML = `
        <div class="typing-indicator" id="typingIndicator">
            <div class="message-avatar">
                <img src="images/${currentConsultant === 'customer-service' ? 'customer-service-rep.jpg' : 'engineer-consultant.jpg'}" alt="AI">
            </div>
            <div class="message-bubble ai-message">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        </div>
    `;
    chatMessages.insertAdjacentHTML('beforeend', typingHTML);
    scrollToBottom();
}

function hideTypingIndicator() {
    isAITyping = false;
    const indicator = document.getElementById('typingIndicator');
    if (indicator) indicator.remove();
}

// Handle File Upload
function handleFileUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    const fileMessage = `📎 Uploaded file: ${file.name} (${formatFileSize(file.size)})`;
    addUserMessage(fileMessage);

    setTimeout(() => {
        showTypingIndicator();
        setTimeout(() => {
            hideTypingIndicator();
            addAIMessage(`<p>Thank you for uploading <strong>${file.name}</strong>!</p>
            <p>I've received your file. Our technical team will review it and get back to you with a detailed analysis.</p>
            <p>In the meantime, is there anything specific you'd like me to help you with regarding this file?</p>`);
        }, 2000);
    }, 500);

    fileInput.value = '';
}

// Switch Consultant
function handleSwitchConsultant() {
    if (currentConsultant === 'customer-service') {
        currentConsultant = 'engineer';
        consultantImage.src = 'images/engineer-consultant.jpg';
        consultantName.textContent = 'Senior Technical Engineer';
        switchConsultant.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
            </svg>
            Switch to Customer Service
        `;
        addAIMessage(`<p>Hello! I'm your Senior Technical Engineer. I specialize in:</p>
        <ul>
            <li>🔧 Technical troubleshooting</li>
            <li>⚙️ Equipment specifications</li>
            <li>📐 Production line design</li>
            <li>🎯 Performance optimization</li>
        </ul>
        <p>How can I assist you today?</p>`);
    } else {
        currentConsultant = 'customer-service';
        consultantImage.src = 'images/customer-service-rep.jpg';
        consultantName.textContent = 'NEXUS AI Assistant';
        switchConsultant.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
            </svg>
            Switch to Technical Engineer
        `;
        addAIMessage(`<p>Welcome back! I'm here to help with general inquiries, equipment selection, and connecting you with the right resources.</p>
        <p>What can I help you with?</p>`);
    }
}

// Modal Functions
function openContactModal() {
    contactModal.classList.add('active');
}

function closeModal() {
    contactModal.classList.remove('active');
}

function handleContactSubmit(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('contactName').value,
        email: document.getElementById('contactEmail').value,
        phone: document.getElementById('contactPhone').value,
        company: document.getElementById('contactCompany').value,
        message: document.getElementById('contactMessage').value
    };

    // Simulate form submission
    console.log('Form submitted:', formData);
    
    closeModal();
    contactForm.reset();
    
    addAIMessage(`<p><strong>Thank you, ${formData.name}!</strong></p>
    <p>Your consultation request has been received. Our team will contact you at <strong>${formData.email}</strong> within 24 hours.</p>
    <p>In the meantime, feel free to continue asking questions here!</p>`);
}

// Utility Functions
function autoResizeTextarea() {
    chatInput.style.height = 'auto';
    chatInput.style.height = chatInput.scrollHeight + 'px';
}

chatInput.addEventListener('input', autoResizeTextarea);

function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function formatFileSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

// Make openContactModal globally accessible
window.openContactModal = openContactModal;
