/**
 * NEXUS AI Consultation Chat - V12.1 Intelligent Equipment Selection
 * 
 * Key Features:
 * - English as primary language (AI always responds in English)
 * - 8 equipment categories with specialized question flows
 * - 3-question progressive inquiry for precise needs identification
 * - Intelligent equipment recommendation algorithm
 * - Industry-specific terminology and expertise
 * 
 * Version: 12.1
 * Date: 2025-10-19
 */

// ==================== Equipment Database ====================
const EQUIPMENT_DATABASE = {
    'digital-printing': {
        name: 'Digital Printing Machines',
        icon: '🖨️',
        products: {
            'SCB1600': {
                name: 'SCB1600',
                features: ['HD quality', 'Compact design', 'Entry-level pricing'],
                priceRange: { min: 200000, max: 350000 },
                deliveryTime: '60-90 days',
                supplier: 'Digital Print Solutions Co.',
                matchCriteria: { scale: 'small', requirements: 'hd', budget: 'entry' }
            },
            'Ultra2500W': {
                name: 'Ultra2500W',
                features: ['Variable data printing', 'High speed', 'Wide format (2500mm)'],
                priceRange: { min: 500000, max: 800000 },
                deliveryTime: '90-120 days',
                supplier: 'Ultra Digital Systems',
                matchCriteria: { scale: 'medium', requirements: 'variable', budget: 'mid' }
            },
            'Ultra2500W Pro': {
                name: 'Ultra2500W Pro',
                features: ['Ultra-high speed (>150 sqm/min)', 'Premium quality', 'Advanced automation'],
                priceRange: { min: 1000000, max: 1500000 },
                deliveryTime: '120-150 days',
                supplier: 'Ultra Digital Systems',
                matchCriteria: { scale: 'large', requirements: 'high-speed', budget: 'high-end' }
            },
            'MCB2500': {
                name: 'MCB2500',
                features: ['Wide format (2500mm)', 'Multi-color capability', 'Reliable performance'],
                priceRange: { min: 600000, max: 900000 },
                deliveryTime: '90-120 days',
                supplier: 'MCB Technologies',
                matchCriteria: { scale: 'medium', requirements: 'wide', budget: 'mid' }
            },
            'MCB2512': {
                name: 'MCB2512',
                features: ['Extra-wide format (2512mm)', 'High precision', 'Industrial grade'],
                priceRange: { min: 700000, max: 1000000 },
                deliveryTime: '90-120 days',
                supplier: 'MCB Technologies',
                matchCriteria: { scale: 'medium', requirements: 'wide', budget: 'mid' }
            },
            'Glory160X HD': {
                name: 'Glory160X HD',
                features: ['Ultra HD resolution', 'Large format', 'Premium quality'],
                priceRange: { min: 1200000, max: 1800000 },
                deliveryTime: '120-150 days',
                supplier: 'Glory Digital Corp.',
                matchCriteria: { scale: 'large', requirements: 'hd', budget: 'high-end' }
            }
        }
    },
    
    'die-cutting': {
        name: 'Die-Cutting Machines',
        icon: '✂️',
        products: {
            'MK800SF': {
                name: 'MK800SF Laser Die-Cutter',
                features: ['Laser technology', 'Medium size (800mm)', 'No die required'],
                priceRange: { min: 300000, max: 500000 },
                deliveryTime: '90-120 days',
                supplier: 'MK Laser Systems',
                matchCriteria: { technology: 'laser', size: 'medium', speed: 'low' }
            },
            'MK1060F': {
                name: 'MK1060F Laser Die-Cutter',
                features: ['Advanced laser', 'Large format (1060mm)', 'High precision'],
                priceRange: { min: 500000, max: 800000 },
                deliveryTime: '120-150 days',
                supplier: 'MK Laser Systems',
                matchCriteria: { technology: 'laser', size: 'large', speed: 'medium' }
            },
            'TD1650S': {
                name: 'TD1650S Rotary Die-Cutter',
                features: ['High-speed rotary', 'Large format (1650mm)', 'Mass production'],
                priceRange: { min: 600000, max: 1000000 },
                deliveryTime: '120-150 days',
                supplier: 'TD Machinery Co.',
                matchCriteria: { technology: 'rotary', size: 'large', speed: 'high' }
            },
            'TD800S': {
                name: 'TD800S Rotary Die-Cutter',
                features: ['Medium-speed rotary', 'Standard size (800mm)', 'Reliable performance'],
                priceRange: { min: 400000, max: 600000 },
                deliveryTime: '90-120 days',
                supplier: 'TD Machinery Co.',
                matchCriteria: { technology: 'rotary', size: 'medium', speed: 'medium' }
            },
            'DS106': {
                name: 'DS106 Flatbed Die-Cutter',
                features: ['Flatbed design', 'Large format', 'Complex shapes'],
                priceRange: { min: 450000, max: 700000 },
                deliveryTime: '90-120 days',
                supplier: 'DS Equipment Ltd.',
                matchCriteria: { technology: 'flatbed', size: 'large', speed: 'medium' }
            },
            'PYQ1040': {
                name: 'PYQ1040 Flatbed Die-Cutter',
                features: ['Compact flatbed', 'Versatile', 'Entry-level'],
                priceRange: { min: 300000, max: 450000 },
                deliveryTime: '60-90 days',
                supplier: 'PYQ Machinery',
                matchCriteria: { technology: 'flatbed', size: 'medium', speed: 'low' }
            }
        }
    },
    
    'feeding-palletizing': {
        name: 'Feeding/Palletizing Machines',
        icon: '🤖',
        products: {
            'MD-350': {
                name: 'MD-350 Intelligent Palletizer',
                features: ['AI-powered 3D vision', 'Heavy duty (350kg)', 'Robotic system'],
                priceRange: { min: 80000, max: 120000 },
                deliveryTime: '60-90 days',
                supplier: 'Foshan ODJ Intelligent Technology Co., Ltd.',
                matchCriteria: { automation: 'robotic', capacity: 'heavy', integration: 'end-of-line' }
            },
            'JXB Robotic Arm Feeder': {
                name: 'JXB Robotic Arm Feeder',
                features: ['Fully automatic', 'Inline integration', 'Flexible positioning'],
                priceRange: { min: 60000, max: 90000 },
                deliveryTime: '60-90 days',
                supplier: 'JXB Automation',
                matchCriteria: { automation: 'fully-auto', capacity: 'medium', integration: 'inline' }
            },
            'MD-180 Compact': {
                name: 'MD-180 Compact Palletizer',
                features: ['Semi-automatic', 'Light duty (180kg)', 'Space-saving'],
                priceRange: { min: 40000, max: 60000 },
                deliveryTime: '45-60 days',
                supplier: 'Foshan ODJ Intelligent Technology Co., Ltd.',
                matchCriteria: { automation: 'semi-auto', capacity: 'light', integration: 'standalone' }
            },
            'QSL2 Slope Type': {
                name: 'QSL2 Slope Type Feeder',
                features: ['Fully automatic', 'Slope design', 'Inline integration'],
                priceRange: { min: 50000, max: 75000 },
                deliveryTime: '60-90 days',
                supplier: 'QSL Machinery',
                matchCriteria: { automation: 'fully-auto', capacity: 'medium', integration: 'inline' }
            },
            'QSL3 Baffle Type': {
                name: 'QSL3 Baffle Type Feeder',
                features: ['Fully automatic', 'Baffle control', 'Precise positioning'],
                priceRange: { min: 55000, max: 80000 },
                deliveryTime: '60-90 days',
                supplier: 'QSL Machinery',
                matchCriteria: { automation: 'fully-auto', capacity: 'medium', integration: 'inline' }
            },
            'QXY3 Bottom Print Type': {
                name: 'QXY3 Bottom Print Type Feeder',
                features: ['Fully automatic', 'Bottom print capability', 'Inline integration'],
                priceRange: { min: 60000, max: 85000 },
                deliveryTime: '60-90 days',
                supplier: 'QXY Equipment',
                matchCriteria: { automation: 'fully-auto', capacity: 'medium', integration: 'inline' }
            }
        }
    }
    
    // Additional categories would be added here following the same pattern
};

// ==================== Question Flows for Each Equipment Type ====================
const QUESTION_FLOWS = {
    'digital-printing': {
        q1: {
            question: "What is your expected monthly production volume?",
            options: [
                { text: "📊 Small scale: <50,000 sqm/month", value: "small" },
                { text: "📊 Medium scale: 50,000-200,000 sqm/month", value: "medium" },
                { text: "📊 Large scale: >200,000 sqm/month", value: "large" }
            ]
        },
        q2: {
            question: "What are your main printing requirements?",
            options: [
                { text: "🎨 High-definition color printing (HD quality)", value: "hd" },
                { text: "📝 Variable data printing (personalization)", value: "variable" },
                { text: "⚡ High-speed production (>100 sqm/min)", value: "high-speed" },
                { text: "📏 Wide format printing (>2500mm)", value: "wide" }
            ]
        },
        q3: {
            question: "What is your approximate budget range?",
            options: [
                { text: "💰 Entry level: $200,000-$500,000", value: "entry" },
                { text: "💰 Mid-range: $500,000-$1,000,000", value: "mid" },
                { text: "💰 High-end: >$1,000,000", value: "high-end" }
            ]
        }
    },
    
    'die-cutting': {
        q1: {
            question: "Which cutting technology do you prefer?",
            options: [
                { text: "🔬 Laser die-cutting (high precision, no die required)", value: "laser" },
                { text: "🔄 Rotary die-cutting (high speed, mass production)", value: "rotary" },
                { text: "📐 Flatbed die-cutting (versatile, complex shapes)", value: "flatbed" }
            ]
        },
        q2: {
            question: "What is your maximum board size?",
            options: [
                { text: "📏 Small: <800mm width", value: "small" },
                { text: "📏 Medium: 800-1200mm width", value: "medium" },
                { text: "📏 Large: >1200mm width", value: "large" }
            ]
        },
        q3: {
            question: "What is your required production speed?",
            options: [
                { text: "🐌 Low speed: <3,000 sheets/hour", value: "low" },
                { text: "🚶 Medium speed: 3,000-6,000 sheets/hour", value: "medium" },
                { text: "🚀 High speed: >6,000 sheets/hour", value: "high" }
            ]
        }
    },
    
    'feeding-palletizing': {
        q1: {
            question: "What level of automation do you need?",
            options: [
                { text: "👤 Semi-automatic (manual assistance required)", value: "semi-auto" },
                { text: "⚙️ Fully automatic (minimal human intervention)", value: "fully-auto" },
                { text: "🤖 Robotic system (AI-powered, 3D vision)", value: "robotic" }
            ]
        },
        q2: {
            question: "What is your maximum load requirement?",
            options: [
                { text: "📦 Light duty: <200kg per stack", value: "light" },
                { text: "📦 Medium duty: 200-350kg per stack", value: "medium" },
                { text: "📦 Heavy duty: >350kg per stack", value: "heavy" }
            ]
        },
        q3: {
            question: "How will this integrate with your production line?",
            options: [
                { text: "🔲 Standalone unit (independent operation)", value: "standalone" },
                { text: "🔗 Inline integration (connected to printing/die-cutting)", value: "inline" },
                { text: "🏁 End-of-line solution (final packaging stage)", value: "end-of-line" }
            ]
        }
    }
    
    // Additional equipment types would follow the same pattern
};

// ==================== Conversation State Management ====================
class ConversationState {
    constructor() {
        this.stage = 'welcome'; // welcome, equipment-selection, q1, q2, q3, recommendation, contact
        this.equipmentType = null;
        this.answers = {
            q1: null,
            q2: null,
            q3: null
        };
        this.currentQuestion = 0;
        this.recommendedEquipment = [];
        this.contactInfo = {};
    }
    
    reset() {
        this.stage = 'welcome';
        this.equipmentType = null;
        this.answers = { q1: null, q2: null, q3: null };
        this.currentQuestion = 0;
        this.recommendedEquipment = [];
        this.contactInfo = {};
    }
    
    setEquipmentType(type) {
        this.equipmentType = type;
        this.stage = 'q1';
        this.currentQuestion = 1;
    }
    
    setAnswer(questionNum, value) {
        this.answers[`q${questionNum}`] = value;
        
        if (questionNum < 3) {
            this.stage = `q${questionNum + 1}`;
            this.currentQuestion = questionNum + 1;
        } else {
            this.stage = 'recommendation';
            this.generateRecommendation();
        }
    }
    
    generateRecommendation() {
        const category = EQUIPMENT_DATABASE[this.equipmentType];
        if (!category) return;
        
        const matches = [];
        
        // Score each product based on match criteria
        for (const [productId, product] of Object.entries(category.products)) {
            let score = 0;
            const criteria = product.matchCriteria;
            
            // Check Q1 match
            if (criteria.scale === this.answers.q1 || 
                criteria.technology === this.answers.q1 ||
                criteria.automation === this.answers.q1) {
                score += 3;
            }
            
            // Check Q2 match
            if (criteria.requirements === this.answers.q2 ||
                criteria.size === this.answers.q2 ||
                criteria.capacity === this.answers.q2) {
                score += 2;
            }
            
            // Check Q3 match
            if (criteria.budget === this.answers.q3 ||
                criteria.speed === this.answers.q3 ||
                criteria.integration === this.answers.q3) {
                score += 1;
            }
            
            if (score > 0) {
                matches.push({ productId, product, score });
            }
        }
        
        // Sort by score (highest first)
        matches.sort((a, b) => b.score - a.score);
        
        // Take top 3 recommendations
        this.recommendedEquipment = matches.slice(0, 3);
    }
}

// ==================== UI Manager ====================
class UIManager {
    constructor() {
        this.messagesContainer = document.getElementById('chatMessages');
        this.userInput = document.getElementById('chatInput');
        this.sendBtn = document.getElementById('sendButton');
        this.quickRepliesContainer = document.getElementById('quickReplies');
    }
    
    async addMessage(type, content, options = {}) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}-message`;
        
        if (options.progress) {
            const progressDiv = document.createElement('div');
            progressDiv.className = 'message-progress';
            progressDiv.textContent = options.progress;
            messageDiv.appendChild(progressDiv);
        }
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        
        // Support markdown-style formatting
        const formattedContent = this.formatMessage(content);
        contentDiv.innerHTML = formattedContent;
        
        messageDiv.appendChild(contentDiv);
        
        const timeDiv = document.createElement('div');
        timeDiv.className = 'message-time';
        timeDiv.textContent = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        messageDiv.appendChild(timeDiv);
        
        this.messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();
        
        await this.delay(300);
    }
    
    formatMessage(content) {
        // Bold text: **text** -> <strong>text</strong>
        content = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        
        // Bullet points: • text -> <li>text</li>
        content = content.replace(/^[•✓✗]/gm, '<li>');
        
        // Line breaks
        content = content.replace(/\n/g, '<br>');
        
        return content;
    }
    
    showQuickReplies(options) {
        this.quickRepliesContainer.innerHTML = '';
        
        options.forEach(option => {
            const btn = document.createElement('button');
            btn.className = 'quick-reply-btn';
            btn.textContent = option.text;
            btn.onclick = () => window.conversationManager.handleQuickReply(option.value, option.text);
            this.quickRepliesContainer.appendChild(btn);
        });
        
        this.quickRepliesContainer.style.display = 'flex';
    }
    
    hideQuickReplies() {
        this.quickRepliesContainer.style.display = 'none';
    }
    
    async showTypingIndicator() {
        await this.delay(800);
    }
    
    scrollToBottom() {
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }
    
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// ==================== Main Conversation Manager ====================
class ConversationManager {
    constructor() {
        this.state = new ConversationState();
        this.ui = new UIManager();
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.showWelcomeMessage();
    }
    
    setupEventListeners() {
        const sendBtn = document.getElementById('sendButton');
        const userInput = document.getElementById('chatInput');
        const newChatBtn = document.getElementById('newChatBtn');
        
        if (sendBtn) {
            sendBtn.addEventListener('click', () => this.handleUserInput());
        }
        
        if (userInput) {
            userInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.handleUserInput();
                }
            });
        }
        
        if (newChatBtn) {
            newChatBtn.addEventListener('click', () => this.startNewChat());
        }
    }
    
    async showWelcomeMessage() {
        await this.ui.showTypingIndicator();
        
        const welcomeMsg = `👋 **Welcome to NEXUS AI Consultant!** I'm here to help you find the perfect packaging equipment.

I can assist you with:
✓ Equipment selection and recommendations
✓ Technical specifications and pricing
✓ Expert guidance based on your specific needs

**Let's get started!** Which type of equipment are you looking for?`;
        
        await this.ui.addMessage('ai', welcomeMsg);
        
        // Show equipment type options
        const equipmentOptions = [
            { text: '🖨️ Digital Printing', value: 'digital-printing' },
            { text: '✂️ Die-Cutting', value: 'die-cutting' },
            { text: '🤖 Feeding/Palletizing', value: 'feeding-palletizing' },
            { text: '📦 Strapping/Stitching', value: 'strapping-stitching' },
            { text: '📋 Folder Gluer', value: 'folder-gluer' },
            { text: '🎨 Laminator/Filming', value: 'laminator' },
            { text: '🏭 Corrugator Line', value: 'corrugator' },
            { text: '🎨 Flexo Printing', value: 'flexo-printing' }
        ];
        
        this.ui.showQuickReplies(equipmentOptions);
    }
    
    async handleQuickReply(value, text) {
        // Hide quick replies
        this.ui.hideQuickReplies();
        
        // Show user's selection
        await this.ui.addMessage('user', text);
        
        // Process based on current stage
        if (this.state.stage === 'welcome') {
            await this.handleEquipmentSelection(value);
        } else if (this.state.stage.startsWith('q')) {
            await this.handleQuestionAnswer(value, text);
        }
    }
    
    async handleEquipmentSelection(equipmentType) {
        this.state.setEquipmentType(equipmentType);
        
        const categoryName = EQUIPMENT_DATABASE[equipmentType]?.name || equipmentType;
        
        await this.ui.showTypingIndicator();
        
        const response = `Great choice! Let's find the perfect **${categoryName}** for your needs.

I'll ask you 3 quick questions to understand your requirements better.`;
        
        await this.ui.addMessage('ai', response);
        
        // Show first question
        await this.showCurrentQuestion();
    }
    
    async showCurrentQuestion() {
        const questionNum = this.state.currentQuestion;
        const flow = QUESTION_FLOWS[this.state.equipmentType];
        
        if (!flow || !flow[`q${questionNum}`]) {
            console.error('Question flow not found');
            return;
        }
        
        const questionData = flow[`q${questionNum}`];
        
        await this.ui.showTypingIndicator();
        
        const progress = `Question ${questionNum} of 3`;
        await this.ui.addMessage('ai', `**${questionData.question}**`, { progress });
        
        this.ui.showQuickReplies(questionData.options);
    }
    
    async handleQuestionAnswer(value, text) {
        const questionNum = this.state.currentQuestion;
        this.state.setAnswer(questionNum, value);
        
        if (this.state.stage.startsWith('q')) {
            // More questions to go
            await this.showCurrentQuestion();
        } else if (this.state.stage === 'recommendation') {
            // Show recommendations
            await this.showRecommendations();
        }
    }
    
    async showRecommendations() {
        await this.ui.showTypingIndicator();
        
        if (this.state.recommendedEquipment.length === 0) {
            await this.ui.addMessage('ai', "I couldn't find an exact match. Let me connect you with our technical team for personalized assistance.");
            await this.showContactForm();
            return;
        }
        
        const topMatch = this.state.recommendedEquipment[0];
        const product = topMatch.product;
        
        let recommendationMsg = `🎯 **Based on your requirements, I recommend:**\n\n`;
        recommendationMsg += `**${product.name}**\n\n`;
        recommendationMsg += `**Key Features:**\n`;
        product.features.forEach(feature => {
            recommendationMsg += `• ${feature}\n`;
        });
        recommendationMsg += `\n**Price Range:** $${product.priceRange.min.toLocaleString()} - $${product.priceRange.max.toLocaleString()} USD\n`;
        recommendationMsg += `**Delivery Time:** ${product.deliveryTime}\n`;
        recommendationMsg += `**Supplier:** ${product.supplier}\n\n`;
        
        if (this.state.recommendedEquipment.length > 1) {
            recommendationMsg += `**Alternative Options:**\n`;
            for (let i = 1; i < Math.min(3, this.state.recommendedEquipment.length); i++) {
                const alt = this.state.recommendedEquipment[i];
                recommendationMsg += `• ${alt.product.name} - ${alt.product.features[0]}\n`;
            }
        }
        
        await this.ui.addMessage('ai', recommendationMsg);
        
        // Ask next steps
        await this.ui.showTypingIndicator();
        await this.ui.addMessage('ai', "Would you like to get a detailed quotation for this equipment?");
        
        const nextStepOptions = [
            { text: '✅ Yes, get quotation', value: 'get-quote' },
            { text: '📞 Schedule consultation', value: 'schedule-consult' },
            { text: '🔄 Start over', value: 'start-over' }
        ];
        
        this.ui.showQuickReplies(nextStepOptions);
    }
    
    async handleUserInput() {
        const input = this.ui.userInput.value.trim();
        if (!input) return;
        
        this.ui.userInput.value = '';
        await this.ui.addMessage('user', input);
        
        // Simple response for now
        await this.ui.showTypingIndicator();
        await this.ui.addMessage('ai', "Thank you for your message. Please use the quick reply buttons above to continue, or click 'New Chat' to start over.");
    }
    
    async showContactForm() {
        // Contact form implementation
        await this.ui.addMessage('ai', "Please provide your contact information and our team will reach out within 24 hours.");
    }
    
    startNewChat() {
        this.state.reset();
        this.ui.messagesContainer.innerHTML = '';
        this.showWelcomeMessage();
    }
}

// ==================== Initialize ====================
document.addEventListener('DOMContentLoaded', () => {
    console.log('NEXUS AI Consultation Chat V12.1 - Initializing...');
    console.log('Features: English-first, 8 equipment categories, 3-question flow');
    
    if (document.getElementById('chatMessages')) {
        window.conversationManager = new ConversationManager();
        console.log('Conversation Manager initialized successfully');
    }
});

