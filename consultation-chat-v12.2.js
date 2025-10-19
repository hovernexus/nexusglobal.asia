/**
 * NEXUS AI Consultant V12.2
 * 8 AI Service Modules Based Conversation Engine
 * 
 * Core Improvements:
 * - First layer: 8 AI service modules (not equipment types)
 * - Module introduction with detailed description
 * - Module-specific conversation flows
 * - Realistic and logical information collection
 * 
 * @version 12.2
 * @date 2025-10-19
 */

// ============================================================================
// 8 AI SERVICE MODULES DATABASE
// ============================================================================

const AI_MODULES = {
    'smart-recommendation': {
        id: 'smart-recommendation',
        name: 'Smart Equipment Recommendation',
        nameCN: '智能设备推荐系统',
        icon: '🎯',
        category: 'Product Selection Consulting',
        status: 'AVAILABLE',
        description: 'AI-powered system analyzes your requirements and recommends the best equipment solutions.',
        descriptionCN: 'AI驱动系统分析您的需求并推荐最佳设备解决方案。',
        coreFeatures: [
            { icon: '✓', text: 'Requirement Analysis - Understand your specific needs' },
            { icon: '✓', text: 'Equipment Matching - Find the perfect fit from 8 categories' },
            { icon: '✓', text: 'Configuration Optimization - Customize to your workflow' },
            { icon: '✓', text: 'Compatibility Check - Ensure seamless integration' }
        ],
        howToUse: [
            '1️⃣ Tell me about your production requirements',
            '2️⃣ Specify your budget range and timeline',
            '3️⃣ I\'ll analyze and recommend the best equipment',
            '4️⃣ Review detailed specifications and pricing'
        ],
        nextStep: 'equipment-type-selection'
    },
    
    'roi-calculator': {
        id: 'roi-calculator',
        name: 'ROI Calculator & Cost Analysis',
        nameCN: '投资回报率分析',
        icon: '💰',
        category: 'Product Selection Consulting',
        status: 'AVAILABLE',
        description: 'Calculate investment returns and analyze total cost of ownership.',
        descriptionCN: '计算投资回报率并分析总拥有成本。',
        coreFeatures: [
            { icon: '✓', text: 'ROI Calculation - Calculate return on investment' },
            { icon: '✓', text: 'Payback Period - Estimate time to profitability' },
            { icon: '✓', text: 'Cost Breakdown - Analyze all cost components' },
            { icon: '✓', text: 'Risk Assessment - Evaluate investment risks' }
        ],
        howToUse: [
            '1️⃣ Provide equipment purchase price',
            '2️⃣ Enter your production volume and operating costs',
            '3️⃣ Specify expected lifespan and maintenance costs',
            '4️⃣ Get comprehensive ROI analysis and recommendations'
        ],
        nextStep: 'roi-data-collection'
    },
    
    'technical-consultation': {
        id: 'technical-consultation',
        name: '24/7 AI Technical Consultation',
        nameCN: '24/7 AI技术咨询',
        icon: '💬',
        category: 'Technical Support Services',
        status: 'AVAILABLE',
        description: 'Get instant answers to technical questions anytime, anywhere.',
        descriptionCN: '随时随地获得技术问题的即时解答。',
        coreFeatures: [
            { icon: '✓', text: 'Intelligent Q&A - Get instant answers from AI' },
            { icon: '✓', text: 'Knowledge Base Search - Access comprehensive documentation' },
            { icon: '✓', text: 'Expert Connection - Escalate to human experts if needed' },
            { icon: '✓', text: 'Document Inquiry - Find relevant technical documents' }
        ],
        howToUse: [
            '1️⃣ Describe your technical question or challenge',
            '2️⃣ AI will search our knowledge base for relevant answers',
            '3️⃣ Get instant responses with references',
            '4️⃣ Request human expert if needed'
        ],
        nextStep: 'technical-qa-flow'
    },
    
    'troubleshooting': {
        id: 'troubleshooting',
        name: 'Equipment Troubleshooting Assistant',
        nameCN: '设备故障诊断助手',
        icon: '🔍',
        category: 'Technical Support Services',
        status: 'AVAILABLE',
        description: 'AI-guided troubleshooting for common equipment issues.',
        descriptionCN: 'AI引导的常见设备问题故障排除。',
        coreFeatures: [
            { icon: '✓', text: 'Symptom Analysis - Identify root causes' },
            { icon: '✓', text: 'Diagnostic Suggestions - Get step-by-step guidance' },
            { icon: '✓', text: 'Video Tutorials - Watch repair demonstrations' },
            { icon: '✓', text: 'Remote Support - Connect with technicians' }
        ],
        howToUse: [
            '1️⃣ Select your equipment type and model',
            '2️⃣ Describe the symptoms or error codes',
            '3️⃣ Follow AI-guided diagnostic steps',
            '4️⃣ Get solution recommendations or request technician'
        ],
        nextStep: 'troubleshooting-flow'
    },
    
    'industry-encyclopedia': {
        id: 'industry-encyclopedia',
        name: 'Corrugated Industry Encyclopedia',
        nameCN: '瓦楞纸行业百科',
        icon: '📖',
        category: 'Industry Knowledge Base',
        status: 'AVAILABLE',
        description: 'Comprehensive knowledge base covering all aspects of corrugated packaging.',
        descriptionCN: '涵盖瓦楞包装各方面的综合知识库。',
        coreFeatures: [
            { icon: '✓', text: 'Industry Standards - Access latest regulations' },
            { icon: '✓', text: 'Best Practices - Learn from industry leaders' },
            { icon: '✓', text: 'Case Studies - Real-world success stories' },
            { icon: '✓', text: 'Market Trends - Stay updated on industry trends' }
        ],
        howToUse: [
            '1️⃣ Browse by category or search for specific topics',
            '2️⃣ Access industry standards and regulations',
            '3️⃣ Learn from case studies and best practices',
            '4️⃣ Stay updated on market trends'
        ],
        nextStep: 'knowledge-search'
    },
    
    'documentation-center': {
        id: 'documentation-center',
        name: 'Technical Documentation Center',
        nameCN: '技术文档中心',
        icon: '📄',
        category: 'Industry Knowledge Base',
        status: 'AVAILABLE',
        description: 'Access detailed technical specifications, manuals, and guides.',
        descriptionCN: '访问详细的技术规格、手册和指南。',
        coreFeatures: [
            { icon: '✓', text: 'Product Manuals - Download user guides' },
            { icon: '✓', text: 'Technical Specs - View detailed specifications' },
            { icon: '✓', text: 'Installation Guides - Step-by-step setup instructions' },
            { icon: '✓', text: 'Maintenance Tips - Keep equipment running smoothly' }
        ],
        howToUse: [
            '1️⃣ Search by equipment model or document type',
            '2️⃣ Download manuals, specifications, and guides',
            '3️⃣ Access installation and maintenance documentation',
            '4️⃣ View video tutorials and technical drawings'
        ],
        nextStep: 'document-search'
    },
    
    'ticketing-system': {
        id: 'ticketing-system',
        name: 'Online Ticketing System',
        nameCN: '在线工单系统',
        icon: '🎫',
        category: 'Customer Service Center',
        status: 'AVAILABLE',
        description: 'Submit and track service requests with our integrated ticketing system.',
        descriptionCN: '通过我们的集成工单系统提交和跟踪服务请求。',
        coreFeatures: [
            { icon: '✓', text: 'Ticket Creation - Submit service requests easily' },
            { icon: '✓', text: 'Status Tracking - Monitor progress in real-time' },
            { icon: '✓', text: 'Priority Management - Urgent issues get fast response' },
            { icon: '✓', text: 'Response Timeline - Know when to expect resolution' }
        ],
        howToUse: [
            '1️⃣ Describe your service request or issue',
            '2️⃣ Select priority level and category',
            '3️⃣ Submit ticket and receive confirmation',
            '4️⃣ Track progress and receive updates'
        ],
        nextStep: 'ticket-creation'
    },
    
    'customer-portal': {
        id: 'customer-portal',
        name: 'Customer Service Portal',
        nameCN: '客户服务门户',
        icon: '👤',
        category: 'Customer Service Center',
        status: 'AVAILABLE',
        description: 'Unified platform for all your service needs and account management.',
        descriptionCN: '统一的服务需求和账户管理平台。',
        coreFeatures: [
            { icon: '✓', text: 'Account Management - Update your profile' },
            { icon: '✓', text: 'Order History - View past purchases' },
            { icon: '✓', text: 'Service Records - Track maintenance history' },
            { icon: '✓', text: 'Communication Hub - Message your account team' }
        ],
        howToUse: [
            '1️⃣ Access your account dashboard',
            '2️⃣ View order history and service records',
            '3️⃣ Manage your equipment inventory',
            '4️⃣ Communicate with your account manager'
        ],
        nextStep: 'portal-login'
    }
};

// Equipment types for Smart Recommendation module
const EQUIPMENT_TYPES = [
    { id: 'digital-printing', name: 'Digital Printing Machines', icon: '🖨️' },
    { id: 'die-cutting', name: 'Die-Cutting Machines', icon: '✂️' },
    { id: 'feeding-palletizing', name: 'Feeding/Palletizing Machines', icon: '🤖' },
    { id: 'strapping-stitching', name: 'Strapping/Stitching Machines', icon: '📦' },
    { id: 'folder-gluer', name: 'Folder Gluer/Stitcher', icon: '📋' },
    { id: 'laminator', name: 'Laminator/Filming Machine', icon: '🎨' },
    { id: 'corrugator', name: 'Corrugator Line', icon: '🏭' },
    { id: 'flexo-printing', name: 'Flexo Printing Machines', icon: '🎨' }
];

// ============================================================================
// CONVERSATION STATE MANAGEMENT
// ============================================================================

class ConversationManager {
    constructor() {
        this.state = {
            stage: 'welcome',                // welcome → module-selection → module-intro → module-flow
            selectedModule: null,            // Module ID
            moduleStage: null,               // Module-specific stage
            collectedData: {},               // Collected information
            currentQuestion: 0,              // Current question index
            conversationHistory: []          // Full conversation history
        };
    }
    
    setState(updates) {
        this.state = { ...this.state, ...updates };
    }
    
    getState() {
        return this.state;
    }
    
    addMessage(role, content, options = {}) {
        this.state.conversationHistory.push({
            role,           // 'ai' or 'user'
            content,
            timestamp: new Date().toISOString(),
            ...options
        });
    }
    
    collectData(key, value) {
        this.state.collectedData[key] = value;
    }
    
    getData(key) {
        return this.state.collectedData[key];
    }
}

// Global conversation manager instance
let conversationManager = new ConversationManager();

// ============================================================================
// MESSAGE RENDERING
// ============================================================================

function addAIMessage(content, options = {}) {
    const messagesContainer = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message ai-message';
    
    const avatarDiv = document.createElement('div');
    avatarDiv.className = 'message-avatar';
    avatarDiv.innerHTML = '🤖';
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    
    // Support markdown-style formatting
    const formattedContent = formatMessageContent(content);
    contentDiv.innerHTML = formattedContent;
    
    const timeDiv = document.createElement('div');
    timeDiv.className = 'message-time';
    timeDiv.textContent = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    
    messageDiv.appendChild(avatarDiv);
    messageDiv.appendChild(contentDiv);
    messageDiv.appendChild(timeDiv);
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    conversationManager.addMessage('ai', content, options);
}

function addUserMessage(content) {
    const messagesContainer = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message user-message';
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.textContent = content;
    
    const timeDiv = document.createElement('div');
    timeDiv.className = 'message-time';
    timeDiv.textContent = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    
    messageDiv.appendChild(contentDiv);
    messageDiv.appendChild(timeDiv);
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    conversationManager.addMessage('user', content);
}

function formatMessageContent(content) {
    // Convert markdown-style formatting to HTML
    return content
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/__(.*?)__/g, '<u>$1</u>')
        .replace(/\n/g, '<br>')
        .replace(/━+/g, '<hr style="border: 1px solid #e0e0e0; margin: 10px 0;">');
}

// ============================================================================
// QUICK REPLIES
// ============================================================================

function showQuickReplies(options) {
    const container = document.getElementById('quickReplies');
    container.innerHTML = '';
    
    options.forEach(option => {
        const button = document.createElement('button');
        button.className = 'quick-reply-btn';
        button.innerHTML = `${option.icon || ''} ${option.text}`;
        button.onclick = () => handleQuickReply(option);
        container.appendChild(button);
    });
    
    container.style.display = 'flex';
}

function hideQuickReplies() {
    const container = document.getElementById('quickReplies');
    container.style.display = 'none';
}

function handleQuickReply(option) {
    addUserMessage(option.text);
    hideQuickReplies();
    
    if (option.handler) {
        option.handler(option);
    }
}

// ============================================================================
// CONVERSATION FLOWS
// ============================================================================

function startConversation() {
    console.log('NEXUS AI V12.2 - 8 Modules Based Conversation - Initializing...');
    
    // Welcome message
    const welcomeMsg = `👋 **Welcome to NEXUS AI Consultant!**

I'm your intelligent assistant for all packaging equipment needs. I offer **8 specialized services** across **4 categories**:

**🎯 Product Selection Consulting**
   • Smart Equipment Recommendation
   • ROI Calculator & Cost Analysis

**🔧 Technical Support Services**
   • 24/7 AI Technical Consultation
   • Equipment Troubleshooting Assistant

**📚 Industry Knowledge Base**
   • Corrugated Industry Encyclopedia
   • Technical Documentation Center

**🎫 Customer Service Center**
   • Online Ticketing System
   • Customer Service Portal

**Which service can I help you with today?**`;
    
    addAIMessage(welcomeMsg);
    
    // Show 8 module options
    const moduleOptions = Object.values(AI_MODULES).map(module => ({
        icon: module.icon,
        text: module.name,
        moduleId: module.id,
        handler: () => selectModule(module.id)
    }));
    
    showQuickReplies(moduleOptions);
    
    conversationManager.setState({ stage: 'module-selection' });
}

function selectModule(moduleId) {
    const module = AI_MODULES[moduleId];
    conversationManager.setState({ 
        selectedModule: moduleId,
        stage: 'module-intro'
    });
    
    // Show module introduction
    showModuleIntroduction(module);
}

function showModuleIntroduction(module) {
    const introMsg = `${module.icon} **${module.name}**
${module.nameCN}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**📋 What This Module Does:**

${module.description}

${module.descriptionCN}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**✨ Core Features:**

${module.coreFeatures.map(f => `${f.icon} ${f.text}`).join('\n')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**🔄 How It Works:**

${module.howToUse.join('\n')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Ready to get started?`;
    
    addAIMessage(introMsg);
    
    // Route to module-specific flow
    setTimeout(() => {
        routeToModuleFlow(module);
    }, 1000);
}

function routeToModuleFlow(module) {
    switch(module.id) {
        case 'smart-recommendation':
            startSmartRecommendationFlow();
            break;
        case 'roi-calculator':
            startROICalculatorFlow();
            break;
        case 'technical-consultation':
            startTechnicalConsultationFlow();
            break;
        case 'troubleshooting':
            startTroubleshootingFlow();
            break;
        case 'industry-encyclopedia':
            startKnowledgeSearchFlow();
            break;
        case 'documentation-center':
            startDocumentSearchFlow();
            break;
        case 'ticketing-system':
            startTicketCreationFlow();
            break;
        case 'customer-portal':
            startPortalLoginFlow();
            break;
        default:
            addAIMessage('This module is under development. Please select another service.');
            setTimeout(startConversation, 2000);
    }
}

// ============================================================================
// MODULE 1: SMART EQUIPMENT RECOMMENDATION
// ============================================================================

function startSmartRecommendationFlow() {
    addAIMessage("Let's start! **Which type of equipment are you looking for?**");
    
    const equipmentOptions = EQUIPMENT_TYPES.map(eq => ({
        icon: eq.icon,
        text: eq.name,
        equipmentId: eq.id,
        handler: (option) => selectEquipmentType(option.equipmentId)
    }));
    
    showQuickReplies(equipmentOptions);
    conversationManager.setState({ moduleStage: 'equipment-selection' });
}

function selectEquipmentType(equipmentId) {
    conversationManager.collectData('equipmentType', equipmentId);
    
    // For demo, use simplified 3-question flow
    // In production, each equipment type would have specific questions
    
    addAIMessage(`Great choice! Let me ask you **3 key questions** to find the perfect match.

**Question 1 of 3:** What is your **production scale**?`);
    
    showQuickReplies([
        { icon: '🏢', text: 'Small scale (<1000 units/day)', value: 'small', handler: (opt) => handleProductionScale(opt.value) },
        { icon: '🏭', text: 'Medium scale (1000-5000 units/day)', value: 'medium', handler: (opt) => handleProductionScale(opt.value) },
        { icon: '🏗️', text: 'Large scale (>5000 units/day)', value: 'large', handler: (opt) => handleProductionScale(opt.value) }
    ]);
    
    conversationManager.setState({ moduleStage: 'recommendation-q1', currentQuestion: 1 });
}

function handleProductionScale(scale) {
    conversationManager.collectData('productionScale', scale);
    
    addAIMessage(`**Question 2 of 3:** What is your **budget range**?`);
    
    showQuickReplies([
        { icon: '💵', text: 'Entry level (<$100,000)', value: 'entry', handler: (opt) => handleBudgetRange(opt.value) },
        { icon: '💰', text: 'Mid-range ($100,000-$500,000)', value: 'mid', handler: (opt) => handleBudgetRange(opt.value) },
        { icon: '💎', text: 'High-end (>$500,000)', value: 'high', handler: (opt) => handleBudgetRange(opt.value) }
    ]);
    
    conversationManager.setState({ currentQuestion: 2 });
}

function handleBudgetRange(budget) {
    conversationManager.collectData('budgetRange', budget);
    
    addAIMessage(`**Question 3 of 3:** What is your **timeline for implementation**?`);
    
    showQuickReplies([
        { icon: '⚡', text: 'Urgent (within 1 month)', value: 'urgent', handler: (opt) => handleTimeline(opt.value) },
        { icon: '📅', text: 'Normal (1-3 months)', value: 'normal', handler: (opt) => handleTimeline(opt.value) },
        { icon: '🗓️', text: 'Flexible (3+ months)', value: 'flexible', handler: (opt) => handleTimeline(opt.value) }
    ]);
    
    conversationManager.setState({ currentQuestion: 3 });
}

function handleTimeline(timeline) {
    conversationManager.collectData('timeline', timeline);
    
    // Generate recommendation
    generateEquipmentRecommendation();
}

function generateEquipmentRecommendation() {
    const data = conversationManager.state.collectedData;
    
    addAIMessage(`🎯 **Based on your requirements, I recommend:**

**Recommended Equipment:** [Equipment Name Based on Criteria]

**Match Score:** 95%

**Key Features:**
✓ Production capacity matches your ${data.productionScale} scale needs
✓ Fits within your ${data.budgetRange} budget range
✓ Available for delivery within your ${data.timeline} timeline

**Price Range:** $XXX,XXX - $XXX,XXX USD
**Delivery Time:** XX-XX days
**Supplier:** [Supplier Name]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Would you like to:
• View detailed specifications
• Compare with alternatives
• Request a quote
• Speak with a sales representative`);
    
    showQuickReplies([
        { icon: '📋', text: 'View Specifications', handler: () => showSpecifications() },
        { icon: '🔄', text: 'Compare Alternatives', handler: () => showAlternatives() },
        { icon: '💬', text: 'Request Quote', handler: () => requestQuote() },
        { icon: '🔙', text: 'Start New Search', handler: () => startConversation() }
    ]);
}

function showSpecifications() {
    addAIMessage('Detailed specifications would be displayed here. This feature is under development.');
    setTimeout(() => showQuickReplies([
        { icon: '🔙', text: 'Back to Results', handler: generateEquipmentRecommendation },
        { icon: '🏠', text: 'Main Menu', handler: startConversation }
    ]), 1000);
}

function showAlternatives() {
    addAIMessage('Alternative equipment options would be displayed here. This feature is under development.');
    setTimeout(() => showQuickReplies([
        { icon: '🔙', text: 'Back to Results', handler: generateEquipmentRecommendation },
        { icon: '🏠', text: 'Main Menu', handler: startConversation }
    ]), 1000);
}

function requestQuote() {
    addAIMessage('Thank you for your interest! Please provide your contact information to receive a detailed quote.');
    collectContactInformation();
}

// ============================================================================
// MODULE 2: ROI CALCULATOR
// ============================================================================

function startROICalculatorFlow() {
    addAIMessage(`Let's calculate the ROI for your equipment investment.

**Question 1 of 5:** What is the **equipment purchase price**?

Please enter the amount in USD:`);
    
    conversationManager.setState({ moduleStage: 'roi-q1', currentQuestion: 1 });
    enableTextInput('Enter amount (e.g., 250000)', handlePurchasePrice);
}

function handlePurchasePrice(price) {
    conversationManager.collectData('purchasePrice', price);
    
    addAIMessage(`**Question 2 of 5:** What is your **expected monthly production volume**?

Please enter the quantity:`);
    
    conversationManager.setState({ currentQuestion: 2 });
    enableTextInput('Enter monthly volume (e.g., 50000)', handleProductionVolume);
}

function handleProductionVolume(volume) {
    conversationManager.collectData('productionVolume', volume);
    
    addAIMessage(`**Question 3 of 5:** What are your **estimated monthly operating costs**?

This includes labor, energy, materials, etc.:`);
    
    conversationManager.setState({ currentQuestion: 3 });
    enableTextInput('Enter monthly costs (e.g., 15000)', handleOperatingCosts);
}

function handleOperatingCosts(costs) {
    conversationManager.collectData('operatingCosts', costs);
    
    addAIMessage(`**Question 4 of 5:** What is the **expected equipment lifespan**?`);
    
    showQuickReplies([
        { icon: '⏱️', text: '3-5 years', value: 4, handler: (opt) => handleLifespan(opt.value) },
        { icon: '⏳', text: '5-10 years', value: 7.5, handler: (opt) => handleLifespan(opt.value) },
        { icon: '⌛', text: '10-15 years', value: 12.5, handler: (opt) => handleLifespan(opt.value) },
        { icon: '🔄', text: '>15 years', value: 20, handler: (opt) => handleLifespan(opt.value) }
    ]);
    
    conversationManager.setState({ currentQuestion: 4 });
}

function handleLifespan(years) {
    conversationManager.collectData('lifespan', years);
    
    addAIMessage(`**Question 5 of 5:** What is your **expected revenue per unit**?`);
    
    conversationManager.setState({ currentQuestion: 5 });
    enableTextInput('Enter revenue per unit (e.g., 2.5)', handleRevenuePerUnit);
}

function handleRevenuePerUnit(revenue) {
    conversationManager.collectData('revenuePerUnit', revenue);
    
    // Calculate ROI
    calculateROI();
}

function calculateROI() {
    const data = conversationManager.state.collectedData;
    
    // Simple ROI calculation (for demo)
    const monthlyRevenue = data.productionVolume * data.revenuePerUnit;
    const monthlyProfit = monthlyRevenue - data.operatingCosts;
    const annualProfit = monthlyProfit * 12;
    const roi = (annualProfit / data.purchasePrice * 100).toFixed(1);
    const paybackMonths = (data.purchasePrice / monthlyProfit).toFixed(1);
    
    addAIMessage(`💰 **ROI Analysis Results**

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Investment Summary:**
• Equipment Cost: $${Number(data.purchasePrice).toLocaleString()}
• Monthly Production: ${Number(data.productionVolume).toLocaleString()} units
• Revenue per Unit: $${data.revenuePerUnit}

**Financial Projections:**
• Monthly Revenue: $${monthlyRevenue.toLocaleString()}
• Monthly Operating Costs: $${Number(data.operatingCosts).toLocaleString()}
• Monthly Profit: $${monthlyProfit.toLocaleString()}
• Annual Profit: $${annualProfit.toLocaleString()}

**ROI Metrics:**
• **Return on Investment: ${roi}%**
• **Payback Period: ${paybackMonths} months**
• **Expected Lifespan: ${data.lifespan} years**

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${roi > 20 ? '✅ Excellent ROI! This investment shows strong potential.' : roi > 10 ? '✓ Good ROI. This investment is financially viable.' : '⚠️ Moderate ROI. Consider optimizing operating costs.'}

Would you like to:
• Download detailed report
• Adjust parameters
• Request financial consultation`);
    
    showQuickReplies([
        { icon: '📊', text: 'Download Report', handler: () => downloadROIReport() },
        { icon: '🔄', text: 'Recalculate', handler: () => startROICalculatorFlow() },
        { icon: '💬', text: 'Speak with Consultant', handler: () => requestQuote() },
        { icon: '🏠', text: 'Main Menu', handler: () => startConversation() }
    ]);
}

function downloadROIReport() {
    addAIMessage('Your ROI report is being generated. This feature is under development.');
    setTimeout(() => showQuickReplies([
        { icon: '🏠', text: 'Main Menu', handler: startConversation }
    ]), 1000);
}

// ============================================================================
// MODULE 3: TECHNICAL CONSULTATION
// ============================================================================

function startTechnicalConsultationFlow() {
    addAIMessage(`I'm here to answer your technical questions 24/7.

**What type of question do you have?**`);
    
    showQuickReplies([
        { icon: '🔧', text: 'Installation & Setup', value: 'installation', handler: (opt) => handleQuestionType(opt.value) },
        { icon: '▶️', text: 'Operation & Usage', value: 'operation', handler: (opt) => handleQuestionType(opt.value) },
        { icon: '🛠️', text: 'Maintenance & Repair', value: 'maintenance', handler: (opt) => handleQuestionType(opt.value) },
        { icon: '🔍', text: 'Troubleshooting', value: 'troubleshooting', handler: (opt) => handleQuestionType(opt.value) },
        { icon: '📋', text: 'Specifications', value: 'specs', handler: (opt) => handleQuestionType(opt.value) }
    ]);
    
    conversationManager.setState({ moduleStage: 'tech-question-type' });
}

function handleQuestionType(type) {
    conversationManager.collectData('questionType', type);
    
    addAIMessage(`Please describe your ${type} question in detail:`);
    
    enableTextInput('Type your question here...', handleTechnicalQuestion);
}

function handleTechnicalQuestion(question) {
    conversationManager.collectData('technicalQuestion', question);
    
    // Simulate AI searching knowledge base
    addAIMessage('🔍 Searching our knowledge base...');
    
    setTimeout(() => {
        addAIMessage(`Based on your question, here's what I found:

**Answer:**
[AI-generated answer would appear here based on knowledge base search]

**Related Documentation:**
• [Document 1 Title]
• [Document 2 Title]
• [Document 3 Title]

**Similar Questions:**
• [Q&A 1]
• [Q&A 2]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Was this helpful? Would you like to:
• Ask a follow-up question
• Speak with a human expert
• Search for more information`);
        
        showQuickReplies([
            { icon: '❓', text: 'Follow-up Question', handler: () => enableTextInput('Ask follow-up...', handleTechnicalQuestion) },
            { icon: '👨‍🔧', text: 'Speak with Expert', handler: () => requestExpertConnection() },
            { icon: '🔍', text: 'New Question', handler: () => startTechnicalConsultationFlow() },
            { icon: '🏠', text: 'Main Menu', handler: () => startConversation() }
        ]);
    }, 2000);
}

function requestExpertConnection() {
    addAIMessage('I\'ll connect you with a human expert. Please provide your contact information.');
    collectContactInformation();
}

// ============================================================================
// MODULE 4: TROUBLESHOOTING
// ============================================================================

function startTroubleshootingFlow() {
    addAIMessage(`Let's diagnose your equipment issue.

**Step 1:** Which equipment needs troubleshooting?`);
    
    const equipmentOptions = EQUIPMENT_TYPES.map(eq => ({
        icon: eq.icon,
        text: eq.name,
        equipmentId: eq.id,
        handler: (option) => selectTroubleshootingEquipment(option.equipmentId)
    }));
    
    showQuickReplies(equipmentOptions);
    conversationManager.setState({ moduleStage: 'troubleshooting-equipment' });
}

function selectTroubleshootingEquipment(equipmentId) {
    conversationManager.collectData('troubleshootingEquipment', equipmentId);
    
    addAIMessage(`**Step 2:** What symptoms are you experiencing?`);
    
    showQuickReplies([
        { icon: '❌', text: 'Equipment won\'t start', value: 'no-start', handler: (opt) => handleSymptom(opt.value) },
        { icon: '🔊', text: 'Unusual noise/vibration', value: 'noise', handler: (opt) => handleSymptom(opt.value) },
        { icon: '⚠️', text: 'Quality issues', value: 'quality', handler: (opt) => handleSymptom(opt.value) },
        { icon: '🚨', text: 'Error codes displayed', value: 'error-code', handler: (opt) => handleSymptom(opt.value) },
        { icon: '📉', text: 'Performance degradation', value: 'performance', handler: (opt) => handleSymptom(opt.value) },
        { icon: '✏️', text: 'Other (describe)', value: 'other', handler: (opt) => handleSymptom(opt.value) }
    ]);
}

function handleSymptom(symptom) {
    conversationManager.collectData('symptom', symptom);
    
    if (symptom === 'error-code') {
        addAIMessage('Please enter the error code displayed:');
        enableTextInput('Enter error code (e.g., E-123)', handleErrorCode);
    } else if (symptom === 'other') {
        addAIMessage('Please describe the issue in detail:');
        enableTextInput('Describe the problem...', handleCustomSymptom);
    } else {
        askImpactLevel();
    }
}

function handleErrorCode(errorCode) {
    conversationManager.collectData('errorCode', errorCode);
    askImpactLevel();
}

function handleCustomSymptom(description) {
    conversationManager.collectData('symptomDescription', description);
    askImpactLevel();
}

function askImpactLevel() {
    addAIMessage(`**Step 3:** How is this affecting your production?`);
    
    showQuickReplies([
        { icon: '🛑', text: 'Production completely stopped', value: 'stopped', handler: (opt) => handleImpact(opt.value) },
        { icon: '⚠️', text: 'Production reduced', value: 'reduced', handler: (opt) => handleImpact(opt.value) },
        { icon: '📊', text: 'Minor impact', value: 'minor', handler: (opt) => handleImpact(opt.value) }
    ]);
}

function handleImpact(impact) {
    conversationManager.collectData('impact', impact);
    
    // Generate diagnostic
    generateDiagnostic();
}

function generateDiagnostic() {
    const data = conversationManager.state.collectedData;
    
    addAIMessage(`🔍 **Diagnostic Analysis**

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Possible Causes:**
1. [Cause 1 based on symptoms] - Probability: High
2. [Cause 2 based on symptoms] - Probability: Medium
3. [Cause 3 based on symptoms] - Probability: Low

**Recommended Actions:**

**Step 1:** [First troubleshooting step]
**Step 2:** [Second troubleshooting step]
**Step 3:** [Third troubleshooting step]

**Video Tutorial:** [Link to relevant video]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${data.impact === 'stopped' ? '🚨 **Urgent:** Given the production stoppage, I recommend immediate technician assistance.' : 'If these steps don\'t resolve the issue, please contact technical support.'}

What would you like to do?`);
    
    showQuickReplies([
        { icon: '📹', text: 'Watch Tutorial', handler: () => watchTutorial() },
        { icon: '👨‍🔧', text: 'Schedule Technician', handler: () => scheduleTechnician() },
        { icon: '📞', text: 'Call Support Now', handler: () => callSupport() },
        { icon: '🏠', text: 'Main Menu', handler: () => startConversation() }
    ]);
}

function watchTutorial() {
    addAIMessage('Opening video tutorial... This feature is under development.');
    setTimeout(() => showQuickReplies([
        { icon: '🏠', text: 'Main Menu', handler: startConversation }
    ]), 1000);
}

function scheduleTechnician() {
    addAIMessage('Let\'s schedule a technician visit. Please provide your contact information.');
    collectContactInformation();
}

function callSupport() {
    addAIMessage(`📞 **Emergency Support Hotline:**

**Global:** +1-XXX-XXX-XXXX
**China:** +86-XXX-XXXX-XXXX
**Email:** support@nexusglobal.asia

Available 24/7 for urgent issues.`);
    
    setTimeout(() => showQuickReplies([
        { icon: '🏠', text: 'Main Menu', handler: startConversation }
    ]), 2000);
}

// ============================================================================
// MODULES 5-8: SIMPLIFIED FLOWS
// ============================================================================

function startKnowledgeSearchFlow() {
    addAIMessage('Welcome to the Corrugated Industry Encyclopedia. This feature is under development.');
    setTimeout(() => showQuickReplies([
        { icon: '🏠', text: 'Main Menu', handler: startConversation }
    ]), 1000);
}

function startDocumentSearchFlow() {
    addAIMessage('Welcome to the Technical Documentation Center. This feature is under development.');
    setTimeout(() => showQuickReplies([
        { icon: '🏠', text: 'Main Menu', handler: startConversation }
    ]), 1000);
}

function startTicketCreationFlow() {
    addAIMessage('Let\'s create a service ticket. Please describe your request:');
    enableTextInput('Describe your service request...', handleTicketCreation);
}

function handleTicketCreation(description) {
    conversationManager.collectData('ticketDescription', description);
    
    addAIMessage('Select priority level:');
    
    showQuickReplies([
        { icon: '🔴', text: 'Urgent', value: 'urgent', handler: (opt) => handleTicketPriority(opt.value) },
        { icon: '🟡', text: 'High', value: 'high', handler: (opt) => handleTicketPriority(opt.value) },
        { icon: '🟢', text: 'Normal', value: 'normal', handler: (opt) => handleTicketPriority(opt.value) },
        { icon: '⚪', text: 'Low', value: 'low', handler: (opt) => handleTicketPriority(opt.value) }
    ]);
}

function handleTicketPriority(priority) {
    conversationManager.collectData('ticketPriority', priority);
    
    addAIMessage('Thank you. Please provide your contact information to submit the ticket.');
    collectContactInformation();
}

function startPortalLoginFlow() {
    addAIMessage('Customer Service Portal access requires login. This feature is under development.');
    setTimeout(() => showQuickReplies([
        { icon: '🏠', text: 'Main Menu', handler: startConversation }
    ]), 1000);
}

// ============================================================================
// CONTACT INFORMATION COLLECTION
// ============================================================================

function collectContactInformation() {
    conversationManager.setState({ moduleStage: 'contact-collection' });
    
    addAIMessage(`Please provide your contact information so we can assist you further.

**Your Name:**`);
    
    enableTextInput('Enter your full name', handleContactName);
}

function handleContactName(name) {
    conversationManager.collectData('contactName', name);
    
    addAIMessage('**Company Name:**');
    enableTextInput('Enter your company name', handleContactCompany);
}

function handleContactCompany(company) {
    conversationManager.collectData('contactCompany', company);
    
    addAIMessage('**Email Address:**');
    enableTextInput('Enter your email', handleContactEmail);
}

function handleContactEmail(email) {
    conversationManager.collectData('contactEmail', email);
    
    addAIMessage('**Phone Number:**');
    enableTextInput('Enter your phone number', handleContactPhone);
}

function handleContactPhone(phone) {
    conversationManager.collectData('contactPhone', phone);
    
    // Submit consultation
    submitConsultation();
}

function submitConsultation() {
    const consultationId = generateConsultationId();
    const data = conversationManager.state.collectedData;
    
    // Save to localStorage (in production, send to backend API)
    const consultation = {
        id: consultationId,
        timestamp: new Date().toISOString(),
        module: conversationManager.state.selectedModule,
        data: data,
        conversationHistory: conversationManager.state.conversationHistory
    };
    
    localStorage.setItem(`consultation_${consultationId}`, JSON.stringify(consultation));
    
    addAIMessage(`✅ **Thank you!**

Your consultation has been submitted successfully.

**Consultation ID:** ${consultationId}

Our team will review your request and contact you within 24 hours at:
• Email: ${data.contactEmail}
• Phone: ${data.contactPhone}

You'll receive a confirmation email shortly.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Is there anything else I can help you with?`);
    
    showQuickReplies([
        { icon: '🏠', text: 'Return to Main Menu', handler: () => startConversation() },
        { icon: '🔄', text: 'Start New Consultation', handler: () => location.reload() }
    ]);
}

function generateConsultationId() {
    const prefix = 'NEX';
    const random1 = Math.random().toString(36).substring(2, 10).toUpperCase();
    const random2 = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `${prefix}-${random1}-${random2}`;
}

// ============================================================================
// TEXT INPUT HANDLING
// ============================================================================

let currentInputHandler = null;

function enableTextInput(placeholder, handler) {
    const inputField = document.getElementById('messageInput');
    inputField.placeholder = placeholder;
    inputField.focus();
    currentInputHandler = handler;
}

function handleSendMessage() {
    const inputField = document.getElementById('messageInput');
    const message = inputField.value.trim();
    
    if (!message) return;
    
    addUserMessage(message);
    inputField.value = '';
    
    if (currentInputHandler) {
        const handler = currentInputHandler;
        currentInputHandler = null;
        handler(message);
    }
}

// ============================================================================
// INITIALIZATION
// ============================================================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('NEXUS AI Consultant V12.2 - 8 Modules Based System');
    console.log('Initializing conversation...');
    
    // Start conversation
    setTimeout(startConversation, 500);
    
    // Setup send button
    const sendBtn = document.getElementById('sendBtn');
    if (sendBtn) {
        sendBtn.onclick = handleSendMessage;
    }
    
    // Setup enter key
    const inputField = document.getElementById('messageInput');
    if (inputField) {
        inputField.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
            }
        });
    }
    
    console.log('V12.2 initialization complete!');
});

