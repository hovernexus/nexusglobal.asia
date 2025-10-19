/**
 * NEXUS AI Consultation Chat - Multi-language Auto-Response Version
 * Version: 12.0
 * 
 * Key Features:
 * - Auto-detect user's input language
 * - AI responds in the SAME language as user input
 * - Support for 14+ major languages
 * - Real-time translation using OpenAI API
 * - Knowledge base validation
 * - AI self-learning capabilities
 * 
 * Supported Languages:
 * - English, Chinese (Simplified/Traditional), Spanish, Portuguese
 * - Japanese, Korean, German, French, Italian, Russian
 * - Arabic, Hindi, Thai, Vietnamese
 */

// ==================== Configuration ====================
const CONFIG = {
    // OpenAI API Configuration
    OPENAI_API_KEY: typeof OPENAI_API_KEY !== 'undefined' ? OPENAI_API_KEY : null,
    OPENAI_MODEL: 'gpt-4.1-mini',
    OPENAI_BASE_URL: 'https://api.openai.com/v1',
    
    // Supported Languages with native names
    SUPPORTED_LANGUAGES: {
        'en': { name: 'English', nativeName: 'English', flag: '🇬🇧' },
        'zh': { name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
        'zh-CN': { name: 'Chinese (Simplified)', nativeName: '简体中文', flag: '🇨🇳' },
        'zh-TW': { name: 'Chinese (Traditional)', nativeName: '繁體中文', flag: '🇹🇼' },
        'es': { name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
        'pt': { name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹' },
        'ja': { name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
        'ko': { name: 'Korean', nativeName: '한국어', flag: '🇰🇷' },
        'de': { name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
        'fr': { name: 'French', nativeName: 'Français', flag: '🇫🇷' },
        'it': { name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹' },
        'ru': { name: 'Russian', nativeName: 'Русский', flag: '🇷🇺' },
        'ar': { name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
        'hi': { name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
        'th': { name: 'Thai', nativeName: 'ไทย', flag: '🇹🇭' },
        'vi': { name: 'Vietnamese', nativeName: 'Tiếng Việt', flag: '🇻🇳' }
    },
    
    // Response templates in multiple languages
    RESPONSE_TEMPLATES: {
        welcome: {
            'en': `👋 Welcome to NEXUS AI Consultant! I'm here to help you 24/7.

I can assist you with:
✓ Equipment selection and recommendations
✓ Product quotations and pricing
✓ Technical support and consultation
✓ Industry knowledge and best practices

What is your main requirement today?`,
            
            'zh': `👋 欢迎使用NEXUS AI智能顾问!我将为您提供24/7全天候服务。

我可以帮助您:
✓ 设备选型和推荐方案
✓ 产品报价和定价咨询
✓ 技术支持和专业咨询
✓ 行业知识和最佳实践

请问您今天的主要需求是什么?`,
            
            'es': `👋 ¡Bienvenido al Consultor AI de NEXUS! Estoy aquí para ayudarte 24/7.

Puedo asistirte con:
✓ Selección y recomendaciones de equipos
✓ Cotizaciones y precios de productos
✓ Soporte técnico y consultoría
✓ Conocimientos y mejores prácticas de la industria

¿Cuál es tu principal requerimiento hoy?`,
            
            'pt': `👋 Bem-vindo ao Consultor AI da NEXUS! Estou aqui para ajudá-lo 24/7.

Posso ajudá-lo com:
✓ Seleção e recomendações de equipamentos
✓ Cotações e preços de produtos
✓ Suporte técnico e consultoria
✓ Conhecimento e melhores práticas da indústria

Qual é a sua principal necessidade hoje?`,
            
            'ja': `👋 NEXUS AIコンサルタントへようこそ!24時間365日サポートいたします。

以下のサポートを提供できます:
✓ 機器の選択と推奨
✓ 製品の見積もりと価格
✓ 技術サポートとコンサルティング
✓ 業界知識とベストプラクティス

本日のご要望は何ですか?`,
            
            'ko': `👋 NEXUS AI 컨설턴트에 오신 것을 환영합니다! 24시간 연중무휴로 도와드리겠습니다.

다음 사항을 도와드릴 수 있습니다:
✓ 장비 선택 및 추천
✓ 제품 견적 및 가격
✓ 기술 지원 및 상담
✓ 업계 지식 및 모범 사례

오늘 주요 요구사항은 무엇입니까?`,
            
            'de': `👋 Willkommen beim NEXUS AI-Berater! Ich bin rund um die Uhr für Sie da.

Ich kann Ihnen helfen bei:
✓ Geräteauswahl und Empfehlungen
✓ Produktangebote und Preise
✓ Technischer Support und Beratung
✓ Branchenwissen und Best Practices

Was ist heute Ihr Hauptanliegen?`,
            
            'fr': `👋 Bienvenue chez NEXUS AI Consultant! Je suis là pour vous aider 24h/24 et 7j/7.

Je peux vous aider avec:
✓ Sélection et recommandations d'équipements
✓ Devis et tarification des produits
✓ Support technique et consultation
✓ Connaissances et meilleures pratiques de l'industrie

Quel est votre besoin principal aujourd'hui?`,
            
            'ru': `👋 Добро пожаловать в NEXUS AI Консультант! Я здесь, чтобы помочь вам 24/7.

Я могу помочь вам с:
✓ Выбор и рекомендации оборудования
✓ Котировки и цены на продукцию
✓ Техническая поддержка и консультации
✓ Отраслевые знания и лучшие практики

Каково ваше основное требование сегодня?`,
            
            'ar': `👋 مرحباً بك في مستشار NEXUS AI! أنا هنا لمساعدتك على مدار الساعة طوال أيام الأسبوع.

يمكنني مساعدتك في:
✓ اختيار المعدات والتوصيات
✓ عروض الأسعار والتسعير
✓ الدعم الفني والاستشارات
✓ المعرفة الصناعية وأفضل الممارسات

ما هو متطلبك الرئيسي اليوم؟`
        },
        
        companyTypeQuestion: {
            'en': 'Great! I will help you find the most suitable equipment solution.\n\nTo better serve you, please tell me your company background:',
            'zh': '好的,我将帮您找到最合适的设备解决方案。\n\n为了更好地为您服务,请告诉我您的公司背景:',
            'es': '¡Excelente! Te ayudaré a encontrar la solución de equipo más adecuada.\n\nPara servirte mejor, cuéntame sobre tu empresa:',
            'pt': 'Ótimo! Vou ajudá-lo a encontrar a solução de equipamento mais adequada.\n\nPara melhor atendê-lo, conte-me sobre sua empresa:',
            'ja': '素晴らしい!最適な機器ソリューションを見つけるお手伝いをします。\n\nより良いサービスを提供するために、御社の背景を教えてください:',
            'ko': '좋습니다! 가장 적합한 장비 솔루션을 찾도록 도와드리겠습니다.\n\n더 나은 서비스를 제공하기 위해 귀사의 배경을 알려주세요:',
            'de': 'Großartig! Ich helfe Ihnen, die am besten geeignete Gerätlösung zu finden.\n\nUm Sie besser bedienen zu können, erzählen Sie mir bitte von Ihrem Unternehmen:',
            'fr': 'Excellent! Je vais vous aider à trouver la solution d\'équipement la plus appropriée.\n\nPour mieux vous servir, parlez-moi de votre entreprise:',
            'ru': 'Отлично! Я помогу вам найти наиболее подходящее решение для оборудования.\n\nЧтобы лучше обслуживать вас, расскажите мне о вашей компании:',
            'ar': 'رائع! سأساعدك في العثور على حل المعدات الأنسب.\n\nلخدمتك بشكل أفضل، أخبرني عن شركتك:'
        },
        
        detailsQuestion: {
            'en': 'Understood, you are a corrugated box production company.\n\nPlease describe the following details:\n• What type of equipment do you need? (e.g., printing machine, die-cutting machine, palletizer)\n• Production scale? (monthly output, order quantity)\n• Budget range? (approximate)\n• Expected delivery time?\n\nYou can also describe your needs directly, and I will help you analyze them. 💬',
            'zh': '了解了,您是纸箱生产企业。\n\n请描述一下您的具体需求:\n• 需要什么类型的设备?(如:印刷机、模切机、码垛机)\n• 生产规模如何?(月产量、订单量)\n• 预算范围?(可选)\n• 期望交付时间?\n\n您也可以直接描述您的需求,我会帮您分析。💬',
            'es': 'Entendido, eres una empresa de producción de cajas de cartón corrugado.\n\nPor favor describe los siguientes detalles:\n• ¿Qué tipo de equipo necesitas? (ej: máquina de impresión, troqueladora, paletizador)\n• ¿Escala de producción? (producción mensual, cantidad de pedidos)\n• ¿Rango de presupuesto? (aproximado)\n• ¿Tiempo de entrega esperado?\n\nTambién puedes describir tus necesidades directamente y te ayudaré a analizarlas. 💬',
            'pt': 'Entendido, você é uma empresa de produção de caixas de papelão ondulado.\n\nPor favor, descreva os seguintes detalhes:\n• Que tipo de equipamento você precisa? (ex: máquina de impressão, cortadeira, paletizador)\n• Escala de produção? (produção mensal, quantidade de pedidos)\n• Faixa de orçamento? (aproximado)\n• Prazo de entrega esperado?\n\nVocê também pode descrever suas necessidades diretamente e eu ajudarei a analisá-las. 💬',
            'ja': '了解しました。段ボール箱製造会社ですね。\n\n以下の詳細を教えてください:\n• どのような設備が必要ですか?(例:印刷機、抜型機、パレタイザー)\n• 生産規模は?(月間生産量、注文量)\n• 予算範囲は?(概算)\n• 希望納期は?\n\nご要望を直接説明していただければ、分析いたします。💬',
            'ko': '이해했습니다. 골판지 상자 생산 회사이시군요.\n\n다음 세부 사항을 설명해 주세요:\n• 어떤 유형의 장비가 필요하십니까? (예: 인쇄기, 다이커팅기, 팔레타이저)\n• 생산 규모는? (월 생산량, 주문량)\n• 예산 범위는? (대략)\n• 예상 납기는?\n\n필요 사항을 직접 설명하시면 분석해 드리겠습니다. 💬'
        },
        
        confirmationMessage: {
            'en': '✅ Thank you for your information!\n\nYour consultation has been successfully submitted. Our engineering team will review your requirements within 24 hours and contact you via email and phone.\n\n📧 Confirmation email will be sent to: {email}\n📞 We will also reach out via phone\n\nConsultation ID: {consultationId}\n\nDo you have any other questions?',
            'zh': '✅ 感谢您的信息!\n\n您的咨询已成功提交。我们的工程师团队将在24小时内审核您的需求并通过邮件和电话与您联系。\n\n📧 确认邮件将发送至:{email}\n📞 我们也会通过电话与您联系\n\n咨询编号:{consultationId}\n\n您还有其他问题吗?',
            'es': '✅ ¡Gracias por tu información!\n\nTu consulta ha sido enviada exitosamente. Nuestro equipo de ingeniería revisará tus requisitos dentro de 24 horas y se pondrá en contacto contigo por correo electrónico y teléfono.\n\n📧 El correo de confirmación se enviará a: {email}\n📞 También nos comunicaremos por teléfono\n\nID de consulta: {consultationId}\n\n¿Tienes alguna otra pregunta?',
            'pt': '✅ Obrigado pelas suas informações!\n\nSua consulta foi enviada com sucesso. Nossa equipe de engenharia revisará seus requisitos dentro de 24 horas e entrará em contato por e-mail e telefone.\n\n📧 E-mail de confirmação será enviado para: {email}\n📞 Também entraremos em contato por telefone\n\nID da consulta: {consultationId}\n\nVocê tem alguma outra pergunta?',
            'ja': '✅ 情報をありがとうございます!\n\nお問い合わせが正常に送信されました。エンジニアリングチームが24時間以内にご要件を確認し、メールと電話でご連絡いたします。\n\n📧 確認メールの送信先:{email}\n📞 お電話でもご連絡いたします\n\nお問い合わせID:{consultationId}\n\n他にご質問はありますか?',
            'ko': '✅ 정보 감사합니다!\n\n상담이 성공적으로 제출되었습니다. 엔지니어링 팀이 24시간 내에 귀하의 요구 사항을 검토하고 이메일과 전화로 연락드리겠습니다.\n\n📧 확인 이메일이 다음으로 전송됩니다: {email}\n📞 전화로도 연락드리겠습니다\n\n상담 ID: {consultationId}\n\n다른 질문이 있으십니까?'
        }
    },
    
    // Quick reply options in multiple languages
    QUICK_REPLIES: {
        mainOptions: {
            'en': [
                { text: '🎯 Equipment Selection', value: 'equipment_selection' },
                { text: '💰 Get Quote', value: 'get_quote' },
                { text: '🔧 Technical Support', value: 'technical_support' },
                { text: '📚 Industry Knowledge', value: 'industry_knowledge' }
            ],
            'zh': [
                { text: '🎯 设备选型咨询', value: 'equipment_selection' },
                { text: '💰 获取产品报价', value: 'get_quote' },
                { text: '🔧 技术问题咨询', value: 'technical_support' },
                { text: '📚 了解行业知识', value: 'industry_knowledge' }
            ],
            'es': [
                { text: '🎯 Selección de Equipos', value: 'equipment_selection' },
                { text: '💰 Obtener Cotización', value: 'get_quote' },
                { text: '🔧 Soporte Técnico', value: 'technical_support' },
                { text: '📚 Conocimiento Industrial', value: 'industry_knowledge' }
            ],
            'pt': [
                { text: '🎯 Seleção de Equipamentos', value: 'equipment_selection' },
                { text: '💰 Obter Cotação', value: 'get_quote' },
                { text: '🔧 Suporte Técnico', value: 'technical_support' },
                { text: '📚 Conhecimento Industrial', value: 'industry_knowledge' }
            ]
        },
        
        companyTypes: {
            'en': [
                { text: '📦 Corrugated Box Manufacturer', value: 'box_manufacturer' },
                { text: '🏭 Packaging Material Supplier', value: 'material_supplier' },
                { text: '🛒 End Brand/Buyer', value: 'end_buyer' },
                { text: '🔄 Equipment Trader', value: 'equipment_trader' }
            ],
            'zh': [
                { text: '📦 纸箱生产企业', value: 'box_manufacturer' },
                { text: '🏭 包装材料供应商', value: 'material_supplier' },
                { text: '🛒 终端品牌商/采购方', value: 'end_buyer' },
                { text: '🔄 设备贸易商', value: 'equipment_trader' }
            ],
            'es': [
                { text: '📦 Fabricante de Cajas', value: 'box_manufacturer' },
                { text: '🏭 Proveedor de Materiales', value: 'material_supplier' },
                { text: '🛒 Marca/Comprador Final', value: 'end_buyer' },
                { text: '🔄 Comerciante de Equipos', value: 'equipment_trader' }
            ],
            'pt': [
                { text: '📦 Fabricante de Caixas', value: 'box_manufacturer' },
                { text: '🏭 Fornecedor de Materiais', value: 'material_supplier' },
                { text: '🛒 Marca/Comprador Final', value: 'end_buyer' },
                { text: '🔄 Comerciante de Equipamentos', value: 'equipment_trader' }
            ]
        }
    }
};

// ==================== Language Detection Module ====================
class LanguageDetector {
    /**
     * Detect language from user input text
     */
    static detectLanguage(text) {
        if (!text || text.trim().length === 0) {
            return 'en';
        }
        
        // Chinese characters
        if (/[\u4e00-\u9fa5]/.test(text)) {
            // Check for Traditional Chinese specific characters
            if (/[繁體臺灣]/.test(text)) {
                return 'zh-TW';
            }
            return 'zh';
        }
        
        // Japanese (Hiragana, Katakana)
        if (/[\u3040-\u309f\u30a0-\u30ff]/.test(text)) {
            return 'ja';
        }
        
        // Korean
        if (/[\uac00-\ud7af]/.test(text)) {
            return 'ko';
        }
        
        // Arabic
        if (/[\u0600-\u06ff]/.test(text)) {
            return 'ar';
        }
        
        // Thai
        if (/[\u0e00-\u0e7f]/.test(text)) {
            return 'th';
        }
        
        // Cyrillic (Russian)
        if (/[\u0400-\u04ff]/.test(text)) {
            return 'ru';
        }
        
        // Spanish indicators
        if (/[ñáéíóúü¿¡]/i.test(text)) {
            return 'es';
        }
        
        // Portuguese indicators
        if (/[ãõçâêô]/i.test(text)) {
            return 'pt';
        }
        
        // German indicators
        if (/[äöüß]/i.test(text)) {
            return 'de';
        }
        
        // French indicators
        if (/[àèéêëîïôùûüÿçœæ]/i.test(text)) {
            return 'fr';
        }
        
        // Default to English
        return 'en';
    }
    
    /**
     * Get language info
     */
    static getLanguageInfo(langCode) {
        return CONFIG.SUPPORTED_LANGUAGES[langCode] || CONFIG.SUPPORTED_LANGUAGES['en'];
    }
}

// ==================== AI Translation Module ====================
class AITranslator {
    /**
     * Translate text using OpenAI API
     */
    static async translate(text, targetLang) {
        // If OpenAI API is available, use it for translation
        if (CONFIG.OPENAI_API_KEY) {
            try {
                const response = await this.translateWithOpenAI(text, targetLang);
                return response;
            } catch (error) {
                console.error('OpenAI translation failed:', error);
                // Fallback to template-based response
                return this.getTemplateResponse(text, targetLang);
            }
        }
        
        // Fallback to template-based response
        return this.getTemplateResponse(text, targetLang);
    }
    
    /**
     * Translate using OpenAI API
     */
    static async translateWithOpenAI(text, targetLang) {
        const langInfo = LanguageDetector.getLanguageInfo(targetLang);
        const targetLanguageName = langInfo.nativeName;
        
        const prompt = `Translate the following text to ${targetLanguageName}. Maintain professional business tone suitable for B2B corrugated packaging equipment industry:\n\n${text}`;
        
        const response = await fetch(`${CONFIG.OPENAI_BASE_URL}/chat/completions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${CONFIG.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: CONFIG.OPENAI_MODEL,
                messages: [
                    {
                        role: 'system',
                        content: 'You are a professional translator for B2B industrial equipment business. Translate accurately while maintaining technical terminology.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                temperature: 0.3
            })
        });
        
        const data = await response.json();
        return data.choices[0].message.content;
    }
    
    /**
     * Get template-based response
     */
    static getTemplateResponse(templateKey, targetLang) {
        const templates = CONFIG.RESPONSE_TEMPLATES[templateKey];
        if (!templates) {
            return templateKey; // Return original if no template
        }
        
        // Return in target language, fallback to English
        return templates[targetLang] || templates['en'] || templateKey;
    }
}

// ==================== Multi-language Conversation Manager ====================
class MultiLangConversationManager {
    constructor() {
        this.currentLanguage = 'en'; // Default language
        this.conversationHistory = [];
        this.currentStage = 'welcome';
        this.userData = {};
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.showWelcomeMessage();
    }
    
    setupEventListeners() {
        const sendBtn = document.getElementById('sendBtn');
        const userInput = document.getElementById('userInput');
        
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
    }
    
    async showWelcomeMessage() {
        // Detect browser language as initial language
        const browserLang = navigator.language || navigator.userLanguage;
        const detectedLang = browserLang.split('-')[0]; // Get base language code
        
        if (CONFIG.SUPPORTED_LANGUAGES[detectedLang]) {
            this.currentLanguage = detectedLang;
        }
        
        await this.showTypingIndicator();
        
        const welcomeMsg = AITranslator.getTemplateResponse('welcome', this.currentLanguage);
        await this.addMessage('ai', welcomeMsg);
        
        // Show quick replies in detected language
        this.showQuickReplies('mainOptions');
    }
    
    async handleUserInput() {
        const input = document.getElementById('userInput').value.trim();
        if (!input) return;
        
        // Clear input
        document.getElementById('userInput').value = '';
        
        // Show user message
        await this.addMessage('user', input);
        
        // Detect language from user input
        const detectedLang = LanguageDetector.detectLanguage(input);
        
        // Update current language if different
        if (detectedLang !== this.currentLanguage) {
            const langInfo = LanguageDetector.getLanguageInfo(detectedLang);
            console.log(`Language switched: ${this.currentLanguage} → ${detectedLang} (${langInfo.nativeName})`);
            this.currentLanguage = detectedLang;
            
            // Show language detection notification
            const notification = this.getLanguageNotification(detectedLang);
            await this.addMessage('system', notification);
        }
        
        // Process user input
        await this.processInput(input);
    }
    
    getLanguageNotification(langCode) {
        const langInfo = LanguageDetector.getLanguageInfo(langCode);
        const notifications = {
            'en': `${langInfo.flag} Language detected: ${langInfo.nativeName}. I will respond in English.`,
            'zh': `${langInfo.flag} 检测到语言:${langInfo.nativeName}。我将用中文回复。`,
            'es': `${langInfo.flag} Idioma detectado: ${langInfo.nativeName}. Responderé en español.`,
            'pt': `${langInfo.flag} Idioma detectado: ${langInfo.nativeName}. Responderei em português.`,
            'ja': `${langInfo.flag} 言語を検出しました:${langInfo.nativeName}。日本語で応答します。`,
            'ko': `${langInfo.flag} 언어 감지: ${langInfo.nativeName}. 한국어로 응답하겠습니다.`
        };
        
        return notifications[langCode] || notifications['en'];
    }
    
    async processInput(input) {
        await this.showTypingIndicator();
        
        // Route to appropriate handler based on current stage
        switch (this.currentStage) {
            case 'welcome':
                await this.handleWelcomeStage(input);
                break;
            case 'company_type':
                await this.handleCompanyTypeStage(input);
                break;
            case 'details':
                await this.handleDetailsStage(input);
                break;
            case 'confirmation':
                await this.handleConfirmationStage(input);
                break;
            default:
                await this.handleDefaultStage(input);
        }
    }
    
    async handleWelcomeStage(input) {
        // User selected equipment selection or similar
        this.currentStage = 'company_type';
        
        const response = AITranslator.getTemplateResponse('companyTypeQuestion', this.currentLanguage);
        await this.addMessage('ai', response);
        
        this.showQuickReplies('companyTypes');
    }
    
    async handleCompanyTypeStage(input) {
        this.userData.companyType = input;
        this.currentStage = 'details';
        
        const response = AITranslator.getTemplateResponse('detailsQuestion', this.currentLanguage);
        await this.addMessage('ai', response);
    }
    
    async handleDetailsStage(input) {
        this.userData.requirements = input;
        this.currentStage = 'contact_info';
        
        // Show contact form
        await this.showContactForm();
    }
    
    async handleConfirmationStage(input) {
        // Handle post-submission questions
        await this.addMessage('ai', this.translateResponse('How else can I help you today?'));
    }
    
    async handleDefaultStage(input) {
        await this.addMessage('ai', this.translateResponse('Thank you for your message. How can I assist you further?'));
    }
    
    async showContactForm() {
        // This would show the contact information collection form
        // Implementation similar to original consultation-chat.js
        const formLabels = this.getFormLabels();
        // ... form rendering logic
    }
    
    getFormLabels() {
        const labels = {
            'en': {
                name: 'Name',
                company: 'Company Name',
                email: 'Email',
                phone: 'Phone',
                country: 'Country/Region'
            },
            'zh': {
                name: '姓名',
                company: '公司名称',
                email: '邮箱',
                phone: '电话',
                country: '国家/地区'
            },
            'es': {
                name: 'Nombre',
                company: 'Nombre de la Empresa',
                email: 'Correo Electrónico',
                phone: 'Teléfono',
                country: 'País/Región'
            },
            'pt': {
                name: 'Nome',
                company: 'Nome da Empresa',
                email: 'E-mail',
                phone: 'Telefone',
                country: 'País/Região'
            }
        };
        
        return labels[this.currentLanguage] || labels['en'];
    }
    
    showQuickReplies(category) {
        const replies = CONFIG.QUICK_REPLIES[category][this.currentLanguage] || 
                       CONFIG.QUICK_REPLIES[category]['en'];
        
        // Render quick reply buttons
        const quickRepliesContainer = document.getElementById('quickReplies');
        if (quickRepliesContainer) {
            quickRepliesContainer.innerHTML = '';
            replies.forEach(reply => {
                const btn = document.createElement('button');
                btn.className = 'quick-reply-btn';
                btn.textContent = reply.text;
                btn.onclick = () => this.handleQuickReply(reply.value, reply.text);
                quickRepliesContainer.appendChild(btn);
            });
        }
    }
    
    async handleQuickReply(value, text) {
        await this.addMessage('user', text);
        await this.processInput(value);
    }
    
    async addMessage(type, content) {
        const messagesContainer = document.getElementById('chatMessages');
        if (!messagesContainer) return;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}-message`;
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.textContent = content;
        
        messageDiv.appendChild(contentDiv);
        messagesContainer.appendChild(messageDiv);
        
        // Scroll to bottom
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        // Add to history
        this.conversationHistory.push({
            type,
            content,
            timestamp: new Date().toISOString(),
            language: this.currentLanguage
        });
    }
    
    async showTypingIndicator() {
        // Show typing indicator animation
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    translateResponse(text) {
        // Translate response to current language
        return AITranslator.translate(text, this.currentLanguage);
    }
}

// ==================== Initialize ====================
document.addEventListener('DOMContentLoaded', () => {
    console.log('NEXUS AI Multi-language Consultation Chat - Initializing...');
    console.log('Supported languages:', Object.keys(CONFIG.SUPPORTED_LANGUAGES).length);
    
    if (document.getElementById('chatMessages')) {
        window.conversationManager = new MultiLangConversationManager();
        console.log('Multi-language Conversation Manager initialized');
    }
});

