/* ===================================
   NEXUS AI Consultation Chat JavaScript
   Version: 1.0
   =================================== */

// ==================== Configuration ====================
const CONFIG = {
    API_ENDPOINT: '/api/consultation/submit',
    TYPING_DELAY: 1000, // ms
    MESSAGE_ANIMATION_DELAY: 300, // ms
    AUTO_SCROLL_DELAY: 100, // ms
    MAX_MESSAGE_LENGTH: 2000,
    CONSULTATION_ID_PREFIX: 'NEX',
    EMAIL_RECIPIENT: 'info@nexusglobal.asia'
};

// ==================== State Management ====================
class ChatState {
    constructor() {
        this.conversationHistory = [];
        this.currentStage = 'welcome';
        this.userData = {
            name: '',
            company: '',
            position: '',
            email: '',
            phone: '',
            country: '',
            additionalNotes: ''
        };
        this.requirements = {
            companyType: '',
            equipmentType: '',
            productionScale: '',
            budget: '',
            deliveryTime: '',
            additionalNotes: ''
        };
        this.consultationId = this.generateConsultationId();
    }

    generateConsultationId() {
        const timestamp = Date.now().toString(36);
        const random = Math.random().toString(36).substring(2, 7);
        return `${CONFIG.CONSULTATION_ID_PREFIX}-${timestamp}-${random}`.toUpperCase();
    }

    addMessage(role, message, options = {}) {
        const messageData = {
            role,
            message,
            timestamp: new Date().toISOString(),
            ...options
        };
        this.conversationHistory.push(messageData);
        return messageData;
    }

    setStage(stage) {
        this.currentStage = stage;
    }

    updateUserData(data) {
        this.userData = { ...this.userData, ...data };
    }

    updateRequirements(data) {
        this.requirements = { ...this.requirements, ...data };
    }

    getSubmissionData() {
        return {
            consultationId: this.consultationId,
            timestamp: new Date().toISOString(),
            userInfo: this.userData,
            requirements: this.requirements,
            conversationHistory: this.conversationHistory
        };
    }
}

// ==================== UI Manager ====================
class UIManager {
    constructor() {
        this.chatMessages = document.getElementById('chatMessages');
        this.chatInput = document.getElementById('chatInput');
        this.sendButton = document.getElementById('sendButton');
        this.charCount = document.getElementById('charCount');
        this.newChatBtn = document.getElementById('newChatBtn');
        this.loadingOverlay = document.getElementById('loadingOverlay');
    }

    addMessage(role, content, options = {}) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${role}-message`;

        // Avatar
        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'message-avatar';
        avatarDiv.textContent = role === 'ai' ? '🤖' : '👤';

        // Content
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';

        // Message bubble
        const bubbleDiv = document.createElement('div');
        bubbleDiv.className = 'message-bubble';
        bubbleDiv.innerHTML = this.formatMessage(content);

        // Time
        const timeDiv = document.createElement('div');
        timeDiv.className = 'message-time';
        timeDiv.textContent = this.formatTime(new Date());

        contentDiv.appendChild(bubbleDiv);
        contentDiv.appendChild(timeDiv);

        // Quick replies
        if (options.quickReplies) {
            const quickRepliesDiv = this.createQuickReplies(options.quickReplies);
            contentDiv.appendChild(quickRepliesDiv);
        }

        // Form
        if (options.form) {
            const formDiv = this.createForm(options.form);
            contentDiv.appendChild(formDiv);
        }

        messageDiv.appendChild(avatarDiv);
        messageDiv.appendChild(contentDiv);

        this.chatMessages.appendChild(messageDiv);
        this.scrollToBottom();

        return messageDiv;
    }

    addSystemMessage(content) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'system-message';
        messageDiv.textContent = content;
        this.chatMessages.appendChild(messageDiv);
        this.scrollToBottom();
    }

    showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message ai-message';
        typingDiv.id = 'typingIndicator';

        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'message-avatar';
        avatarDiv.textContent = '🤖';

        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';

        const bubbleDiv = document.createElement('div');
        bubbleDiv.className = 'message-bubble';

        const indicatorDiv = document.createElement('div');
        indicatorDiv.className = 'typing-indicator';
        indicatorDiv.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';

        bubbleDiv.appendChild(indicatorDiv);
        contentDiv.appendChild(bubbleDiv);
        typingDiv.appendChild(avatarDiv);
        typingDiv.appendChild(contentDiv);

        this.chatMessages.appendChild(typingDiv);
        this.scrollToBottom();
    }

    removeTypingIndicator() {
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    createQuickReplies(replies) {
        const container = document.createElement('div');
        container.className = 'quick-replies';

        replies.forEach(reply => {
            const button = document.createElement('button');
            button.className = 'quick-reply-btn';
            button.innerHTML = `${reply.icon || ''} ${reply.text}`;
            button.onclick = () => reply.action();
            container.appendChild(button);
        });

        return container;
    }

    createForm(formConfig) {
        const formDiv = document.createElement('div');
        formDiv.className = 'message-form';

        formConfig.fields.forEach(field => {
            const formGroup = document.createElement('div');
            formGroup.className = 'form-group';

            const label = document.createElement('label');
            label.className = `form-label ${field.required ? 'required' : ''}`;
            label.textContent = field.label;
            formGroup.appendChild(label);

            let input;
            if (field.type === 'textarea') {
                input = document.createElement('textarea');
                input.className = 'form-textarea';
                input.rows = 3;
            } else if (field.type === 'select') {
                input = document.createElement('select');
                input.className = 'form-select';
                field.options.forEach(option => {
                    const opt = document.createElement('option');
                    opt.value = option.value;
                    opt.textContent = option.label;
                    input.appendChild(opt);
                });
            } else {
                input = document.createElement('input');
                input.className = 'form-input';
                input.type = field.type || 'text';
            }

            input.id = field.id;
            input.name = field.name;
            input.placeholder = field.placeholder || '';
            if (field.required) input.required = true;

            formGroup.appendChild(input);

            if (field.error) {
                const errorDiv = document.createElement('div');
                errorDiv.className = 'form-error';
                errorDiv.textContent = field.error;
                formGroup.appendChild(errorDiv);
            }

            formDiv.appendChild(formGroup);
        });

        // Form actions
        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'form-actions';

        formConfig.actions.forEach(action => {
            const button = document.createElement('button');
            button.className = action.primary ? 'btn-primary' : 'btn-secondary';
            button.textContent = action.text;
            button.onclick = (e) => {
                e.preventDefault();
                action.action(formDiv);
            };
            actionsDiv.appendChild(button);
        });

        formDiv.appendChild(actionsDiv);

        return formDiv;
    }

    formatMessage(message) {
        // Convert line breaks to <br>
        let formatted = message.replace(/\n/g, '<br>');
        
        // Convert bullet points
        formatted = formatted.replace(/^[•✓✗-]\s/gm, match => `<strong>${match}</strong>`);
        
        // Convert bold text
        formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        
        return formatted;
    }

    formatTime(date) {
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    }

    scrollToBottom() {
        setTimeout(() => {
            this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
        }, CONFIG.AUTO_SCROLL_DELAY);
    }

    clearInput() {
        this.chatInput.value = '';
        this.updateCharCount();
        this.updateSendButton();
    }

    updateCharCount() {
        const length = this.chatInput.value.length;
        this.charCount.textContent = `${length} / ${CONFIG.MAX_MESSAGE_LENGTH}`;
    }

    updateSendButton() {
        const hasContent = this.chatInput.value.trim().length > 0;
        this.sendButton.disabled = !hasContent;
    }

    showLoading() {
        this.loadingOverlay.style.display = 'flex';
    }

    hideLoading() {
        this.loadingOverlay.style.display = 'none';
    }

    disableInput() {
        this.chatInput.disabled = true;
        this.sendButton.disabled = true;
    }

    enableInput() {
        this.chatInput.disabled = false;
        this.updateSendButton();
    }
}

// ==================== Conversation Manager ====================
class ConversationManager {
    constructor(chatState, uiManager) {
        this.state = chatState;
        this.ui = uiManager;
    }

    async start() {
        await this.sendWelcomeMessage();
    }

    async sendWelcomeMessage() {
        this.ui.showTypingIndicator();
        
        await this.delay(CONFIG.TYPING_DELAY);
        this.ui.removeTypingIndicator();

        const message = `您好!我是NEXUS AI智能顾问,很高兴为您服务。👋

我可以帮助您:
✓ 了解瓦楞纸箱设备解决方案
✓ 推荐适合您的设备型号
✓ 提供技术咨询和报价
✓ 连接专业工程师团队

请问您目前的主要需求是什么?`;

        this.state.addMessage('ai', message);
        this.ui.addMessage('ai', message, {
            quickReplies: [
                {
                    icon: '🎯',
                    text: '设备选型咨询',
                    action: () => this.handleNeedType('equipment-selection')
                },
                {
                    icon: '💰',
                    text: '获取产品报价',
                    action: () => this.handleNeedType('quotation')
                },
                {
                    icon: '🔧',
                    text: '技术问题咨询',
                    action: () => this.handleNeedType('technical-support')
                },
                {
                    icon: '📚',
                    text: '了解行业知识',
                    action: () => this.handleNeedType('industry-knowledge')
                },
                {
                    icon: '✍️',
                    text: '自定义输入',
                    action: () => this.handleCustomInput()
                }
            ]
        });

        this.state.setStage('need-type');
    }

    async handleNeedType(type) {
        const typeMessages = {
            'equipment-selection': '设备选型咨询',
            'quotation': '获取产品报价',
            'technical-support': '技术问题咨询',
            'industry-knowledge': '了解行业知识'
        };

        // Add user message
        this.state.addMessage('user', typeMessages[type]);
        this.ui.addMessage('user', typeMessages[type]);

        // AI response
        this.ui.showTypingIndicator();
        await this.delay(CONFIG.TYPING_DELAY);
        this.ui.removeTypingIndicator();

        const message = `好的,我将帮您${typeMessages[type] === '设备选型咨询' ? '找到最适合的设备方案' : '提供专业的服务'}。

为了更好地为您推荐,请告诉我您的公司背景:`;

        this.state.addMessage('ai', message);
        this.ui.addMessage('ai', message, {
            quickReplies: [
                {
                    icon: '📦',
                    text: '纸箱生产企业',
                    action: () => this.handleCompanyType('box-manufacturer')
                },
                {
                    icon: '🏭',
                    text: '包装材料供应商',
                    action: () => this.handleCompanyType('material-supplier')
                },
                {
                    icon: '🛒',
                    text: '终端品牌商/采购方',
                    action: () => this.handleCompanyType('end-buyer')
                },
                {
                    icon: '🔄',
                    text: '设备贸易商',
                    action: () => this.handleCompanyType('equipment-trader')
                },
                {
                    icon: '🏢',
                    text: '其他',
                    action: () => this.handleCompanyType('other')
                }
            ]
        });

        this.state.setStage('company-type');
    }

    async handleCompanyType(type) {
        const typeMessages = {
            'box-manufacturer': '纸箱生产企业',
            'material-supplier': '包装材料供应商',
            'end-buyer': '终端品牌商/采购方',
            'equipment-trader': '设备贸易商',
            'other': '其他'
        };

        this.state.updateRequirements({ companyType: typeMessages[type] });
        this.state.addMessage('user', typeMessages[type]);
        this.ui.addMessage('user', typeMessages[type]);

        // Ask for detailed requirements
        this.ui.showTypingIndicator();
        await this.delay(CONFIG.TYPING_DELAY);
        this.ui.removeTypingIndicator();

        const message = `了解了,您是${typeMessages[type]}。

请描述一下您的具体需求:
• 需要什么类型的设备?(如:印刷机、模切机、码垛机等)
• 生产规模如何?(如:月产量、订单量)
• 预算范围?(可选)
• 期望交付时间?

您可以自由描述,我会仔细理解您的需求。💬`;

        this.state.addMessage('ai', message);
        this.ui.addMessage('ai', message);

        this.state.setStage('detailed-requirements');
        this.ui.enableInput();
    }

    handleCustomInput() {
        this.ui.addSystemMessage('请在下方输入框中描述您的需求...');
        this.state.setStage('custom-input');
        this.ui.enableInput();
    }

    async handleUserMessage(message) {
        // Add user message
        this.state.addMessage('user', message);
        this.ui.addMessage('user', message);

        // Process based on current stage
        if (this.state.currentStage === 'detailed-requirements' || this.state.currentStage === 'custom-input') {
            await this.processDetailedRequirements(message);
        }
    }

    async processDetailedRequirements(message) {
        this.state.updateRequirements({ additionalNotes: message });

        this.ui.showTypingIndicator();
        await this.delay(CONFIG.TYPING_DELAY * 1.5);
        this.ui.removeTypingIndicator();

        const summaryMessage = `非常感谢您的详细描述!让我总结一下您的需求:

📋 需求摘要:
• 公司类型:${this.state.requirements.companyType}
• 详细需求:${message.substring(0, 100)}${message.length > 100 ? '...' : ''}

这样理解正确吗?`;

        this.state.addMessage('ai', summaryMessage);
        this.ui.addMessage('ai', summaryMessage, {
            quickReplies: [
                {
                    icon: '✅',
                    text: '确认',
                    action: () => this.requestContactInfo()
                },
                {
                    icon: '✏️',
                    text: '修改',
                    action: () => this.modifyRequirements()
                }
            ]
        });

        this.state.setStage('requirements-confirmation');
    }

    async requestContactInfo() {
        // Add user confirmation
        this.state.addMessage('user', '确认');
        this.ui.addMessage('user', '确认');

        this.ui.showTypingIndicator();
        await this.delay(CONFIG.TYPING_DELAY);
        this.ui.removeTypingIndicator();

        const message = `完美!为了让我们的专业工程师团队为您提供定制化方案和准确报价,请留下您的联系方式:

📝 请提供以下信息:`;

        this.state.addMessage('ai', message);
        this.ui.addMessage('ai', message, {
            form: {
                fields: [
                    {
                        id: 'name',
                        name: 'name',
                        label: '姓名',
                        type: 'text',
                        placeholder: '请输入您的姓名',
                        required: true
                    },
                    {
                        id: 'company',
                        name: 'company',
                        label: '公司名称',
                        type: 'text',
                        placeholder: '请输入公司名称',
                        required: true
                    },
                    {
                        id: 'position',
                        name: 'position',
                        label: '职位',
                        type: 'text',
                        placeholder: '请输入您的职位(可选)'
                    },
                    {
                        id: 'email',
                        name: 'email',
                        label: '邮箱',
                        type: 'email',
                        placeholder: 'your@email.com',
                        required: true
                    },
                    {
                        id: 'phone',
                        name: 'phone',
                        label: '电话',
                        type: 'tel',
                        placeholder: '+86 138 0000 0000',
                        required: true
                    },
                    {
                        id: 'country',
                        name: 'country',
                        label: '国家/地区',
                        type: 'select',
                        required: true,
                        options: [
                            { value: '', label: '请选择...' },
                            { value: 'China', label: '中国 China' },
                            { value: 'USA', label: '美国 USA' },
                            { value: 'Mexico', label: '墨西哥 Mexico' },
                            { value: 'India', label: '印度 India' },
                            { value: 'Vietnam', label: '越南 Vietnam' },
                            { value: 'Thailand', label: '泰国 Thailand' },
                            { value: 'Indonesia', label: '印度尼西亚 Indonesia' },
                            { value: 'Other', label: '其他 Other' }
                        ]
                    },
                    {
                        id: 'additionalNotes',
                        name: 'additionalNotes',
                        label: '补充说明',
                        type: 'textarea',
                        placeholder: '其他需要说明的信息(可选)'
                    }
                ],
                actions: [
                    {
                        text: '提交',
                        primary: true,
                        action: (formDiv) => this.submitContactInfo(formDiv)
                    },
                    {
                        text: '取消',
                        primary: false,
                        action: () => this.cancelSubmission()
                    }
                ]
            }
        });

        this.state.setStage('contact-info');
        this.ui.disableInput();
    }

    async submitContactInfo(formDiv) {
        // Collect form data
        const formData = {
            name: formDiv.querySelector('#name').value.trim(),
            company: formDiv.querySelector('#company').value.trim(),
            position: formDiv.querySelector('#position').value.trim(),
            email: formDiv.querySelector('#email').value.trim(),
            phone: formDiv.querySelector('#phone').value.trim(),
            country: formDiv.querySelector('#country').value,
            additionalNotes: formDiv.querySelector('#additionalNotes').value.trim()
        };

        // Validate
        if (!formData.name || !formData.company || !formData.email || !formData.phone || !formData.country) {
            alert('请填写所有必填项!');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            alert('请输入有效的邮箱地址!');
            return;
        }

        // Update state
        this.state.updateUserData(formData);

        // Show loading
        this.ui.showLoading();

        // Submit to backend
        try {
            await this.submitToBackend();
            await this.showSuccessMessage();
        } catch (error) {
            console.error('Submission error:', error);
            await this.showErrorMessage(error);
        } finally {
            this.ui.hideLoading();
        }
    }

    async submitToBackend() {
        const data = this.state.getSubmissionData();

        // For now, we'll simulate API call and send email
        // In production, this would be a real API endpoint
        console.log('Submission Data:', data);

        // Simulate API delay
        await this.delay(2000);

        // Store in localStorage for demo
        const submissions = JSON.parse(localStorage.getItem('nexus_consultations') || '[]');
        submissions.push(data);
        localStorage.setItem('nexus_consultations', JSON.stringify(submissions));

        // In production, send to backend:
        // const response = await fetch(CONFIG.API_ENDPOINT, {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(data)
        // });
        // if (!response.ok) throw new Error('Submission failed');

        return data;
    }

    async showSuccessMessage() {
        const message = `✅ 感谢您的信息!

您的咨询已成功提交,我们的工程师团队将在24小时内通过邮件与您联系。

📧 确认邮件已发送至:${this.state.userData.email}
📱 我们也会通过电话与您沟通

咨询编号:${this.state.consultationId}

您还有其他问题吗?`;

        this.state.addMessage('ai', message);
        this.ui.addMessage('ai', message, {
            quickReplies: [
                {
                    icon: '🏠',
                    text: '返回首页',
                    action: () => window.location.href = 'index.html'
                },
                {
                    icon: '💬',
                    text: '继续咨询',
                    action: () => this.startNewChat()
                },
                {
                    icon: '📦',
                    text: '查看产品目录',
                    action: () => window.location.href = 'products.html'
                }
            ]
        });

        this.state.setStage('completed');
    }

    async showErrorMessage(error) {
        const message = `❌ 抱歉,提交过程中出现了问题。

错误信息:${error.message}

请您:
1. 检查网络连接
2. 稍后重试
3. 或直接联系我们:info@nexusglobal.asia

我们会尽快为您解决!`;

        this.state.addMessage('ai', message);
        this.ui.addMessage('ai', message, {
            quickReplies: [
                {
                    icon: '🔄',
                    text: '重试',
                    action: () => this.requestContactInfo()
                },
                {
                    icon: '📧',
                    text: '发送邮件',
                    action: () => window.location.href = 'contact.html'
                }
            ]
        });
    }

    modifyRequirements() {
        this.state.addMessage('user', '修改');
        this.ui.addMessage('user', '修改');

        this.ui.addSystemMessage('请重新描述您的需求...');
        this.state.setStage('detailed-requirements');
        this.ui.enableInput();
    }

    cancelSubmission() {
        this.ui.addSystemMessage('已取消提交');
        this.state.setStage('requirements-confirmation');
    }

    startNewChat() {
        if (confirm('确定要开始新的对话吗?当前对话将被清除。')) {
            window.location.reload();
        }
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// ==================== Initialize Application ====================
let chatState, uiManager, conversationManager;

document.addEventListener('DOMContentLoaded', () => {
    // Initialize managers
    chatState = new ChatState();
    uiManager = new UIManager();
    conversationManager = new ConversationManager(chatState, uiManager);

    // Start conversation
    conversationManager.start();

    // Event listeners
    uiManager.chatInput.addEventListener('input', () => {
        uiManager.updateCharCount();
        uiManager.updateSendButton();
        autoResizeTextarea();
    });

    uiManager.chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    uiManager.sendButton.addEventListener('click', sendMessage);

    uiManager.newChatBtn.addEventListener('click', () => {
        conversationManager.startNewChat();
    });

    // Auto-resize textarea
    function autoResizeTextarea() {
        uiManager.chatInput.style.height = 'auto';
        uiManager.chatInput.style.height = uiManager.chatInput.scrollHeight + 'px';
    }

    // Send message
    function sendMessage() {
        const message = uiManager.chatInput.value.trim();
        if (message) {
            conversationManager.handleUserMessage(message);
            uiManager.clearInput();
            autoResizeTextarea();
        }
    }
});

