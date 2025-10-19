/**
 * NEXUS AI Consultant V12.3 - Enhanced Equipment Selection
 * Based on industry best practices (BOBST, BHS, Fosber)
 * 
 * Key improvements:
 * - Professional equipment selection flow
 * - Multi-dimensional filtering
 * - Intelligent recommendation algorithm
 * - Equipment database integration
 * - Match scoring system
 */

console.log('NEXUS AI Consultant V12.3 - Enhanced Equipment Selection System');
console.log('Initializing...');

// ========================================
// EQUIPMENT DATABASE
// ========================================

const EQUIPMENT_DATABASE = {
    'digital-printing': [
        {
            id: 'dp-001',
            name: 'NEXUS DigiPrint 1600',
            supplier: 'NEXUS Partners',
            category: 'Digital Printing Machines',
            tier: 'entry', // entry, mid, premium, flagship
            specs: {
                printWidth: 1600, // mm
                maxSpeed: 60, // m/min
                resolution: 600, // DPI
                colors: 4,
                automation: 'semi-automatic'
            },
            capacity: {
                dailyOutput: 1000, // sheets
                suitableFor: 'small-runs'
            },
            price: {
                range: '$80,000 - $120,000',
                min: 80000,
                max: 120000
            },
            features: [
                'Variable data printing',
                'Quick job changeover',
                'Low waste production',
                'User-friendly interface'
            ],
            applications: ['Corrugated board', 'Folding carton'],
            leadTime: 12, // weeks
            image: '/images/equipment/digiprint-1600.jpg'
        },
        {
            id: 'dp-002',
            name: 'NEXUS DigiPrint 2500 HD',
            supplier: 'NEXUS Partners',
            category: 'Digital Printing Machines',
            tier: 'premium',
            specs: {
                printWidth: 2500,
                maxSpeed: 100,
                resolution: 1200,
                colors: 6,
                automation: 'fully-automatic'
            },
            capacity: {
                dailyOutput: 5000,
                suitableFor: 'large-runs'
            },
            price: {
                range: '$250,000 - $350,000',
                min: 250000,
                max: 350000
            },
            features: [
                'Ultra HD printing (1200 DPI)',
                'Inline quality inspection',
                'Automated color management',
                'High-speed production'
            ],
            applications: ['Corrugated board', 'Folding carton'],
            leadTime: 16,
            image: '/images/equipment/digiprint-2500hd.jpg'
        }
    ],
    'die-cutting': [
        {
            id: 'dc-001',
            name: 'NEXUS DieCut 1060',
            supplier: 'NEXUS Partners',
            category: 'Die-Cutting Machines',
            tier: 'entry',
            specs: {
                maxSize: 1060, // mm
                maxSpeed: 5000, // sheets/hour
                automation: 'semi-automatic',
                processes: ['die-cutting']
            },
            capacity: {
                dailyOutput: 40000,
                suitableFor: 'standard-production'
            },
            price: {
                range: '$60,000 - $90,000',
                min: 60000,
                max: 90000
            },
            features: [
                'Flatbed die-cutting',
                'Easy setup',
                'Reliable performance',
                'Low maintenance'
            ],
            applications: ['Corrugated board', 'Folding carton'],
            leadTime: 10,
            image: '/images/equipment/diecut-1060.jpg'
        },
        {
            id: 'dc-002',
            name: 'NEXUS DieCut 1650 Pro',
            supplier: 'NEXUS Partners',
            category: 'Die-Cutting Machines',
            tier: 'premium',
            specs: {
                maxSize: 1650,
                maxSpeed: 8000,
                automation: 'fully-automatic',
                processes: ['die-cutting', 'stripping', 'blanking']
            },
            capacity: {
                dailyOutput: 64000,
                suitableFor: 'high-volume'
            },
            price: {
                range: '$180,000 - $250,000',
                min: 180000,
                max: 250000
            },
            features: [
                'High-speed die-cutting',
                'Automatic stripping',
                'Waste removal system',
                'Quick changeover'
            ],
            applications: ['Corrugated board', 'Folding carton'],
            leadTime: 14,
            image: '/images/equipment/diecut-1650pro.jpg'
        }
    ],
    'feeding-palletizing': [
        {
            id: 'fp-001',
            name: 'NEXUS AutoStack 200',
            supplier: 'NEXUS Partners',
            category: 'Feeding/Palletizing Machines',
            tier: 'entry',
            specs: {
                maxLoad: 200, // kg
                automation: 'semi-automatic',
                speed: 15 // cycles/min
            },
            capacity: {
                dailyOutput: 7200,
                suitableFor: 'small-medium'
            },
            price: {
                range: '$40,000 - $60,000',
                min: 40000,
                max: 60000
            },
            features: [
                'Semi-automatic palletizing',
                'Manual loading assistance',
                'Basic stacking patterns',
                'Compact footprint'
            ],
            applications: ['Corrugated boxes'],
            leadTime: 8,
            image: '/images/equipment/autostack-200.jpg'
        },
        {
            id: 'fp-002',
            name: 'NEXUS RoboPal 350',
            supplier: 'NEXUS Partners',
            category: 'Feeding/Palletizing Machines',
            tier: 'flagship',
            specs: {
                maxLoad: 350,
                automation: 'robotic-ai',
                speed: 30
            },
            capacity: {
                dailyOutput: 14400,
                suitableFor: 'high-volume'
            },
            price: {
                range: '$150,000 - $220,000',
                min: 150000,
                max: 220000
            },
            features: [
                'AI-powered robotic system',
                '3D vision guidance',
                'Flexible stacking patterns',
                'End-of-line integration'
            ],
            applications: ['Corrugated boxes', 'Heavy cartons'],
            leadTime: 16,
            image: '/images/equipment/robopal-350.jpg'
        }
    ]
    // ... 其他设备类型数据库
};

// ========================================
// EQUIPMENT SELECTION QUESTIONS
// ========================================

const EQUIPMENT_SELECTION_QUESTIONS = {
    'digital-printing': {
        questions: [
            {
                id: 'q1',
                text: 'What is your typical production volume?',
                type: 'choice',
                options: [
                    {
                        value: 'small',
                        label: '📦 Small runs (<1,000 sheets/day)',
                        weight: { capacity: 'small-runs' }
                    },
                    {
                        value: 'medium',
                        label: '📦📦 Medium runs (1,000-5,000 sheets/day)',
                        weight: { capacity: 'medium-runs' }
                    },
                    {
                        value: 'large',
                        label: '📦📦📦 Large runs (>5,000 sheets/day)',
                        weight: { capacity: 'large-runs' }
                    }
                ]
            },
            {
                id: 'q2',
                text: 'What print quality do you require?',
                type: 'choice',
                options: [
                    {
                        value: 'standard',
                        label: '⭐ Standard (300-600 DPI)',
                        weight: { resolution: 600 }
                    },
                    {
                        value: 'hd',
                        label: '⭐⭐ High Definition (600-1200 DPI)',
                        weight: { resolution: 1200 }
                    },
                    {
                        value: 'ultra-hd',
                        label: '⭐⭐⭐ Ultra HD (>1200 DPI)',
                        weight: { resolution: 1800 }
                    }
                ]
            },
            {
                id: 'q3',
                text: 'What substrate types will you print on?',
                type: 'choice',
                options: [
                    {
                        value: 'corrugated-only',
                        label: '📄 Corrugated board only',
                        weight: { applications: ['Corrugated board'] }
                    },
                    {
                        value: 'carton-only',
                        label: '📋 Folding carton only',
                        weight: { applications: ['Folding carton'] }
                    },
                    {
                        value: 'both',
                        label: '📄📋 Both corrugated & carton',
                        weight: { applications: ['Corrugated board', 'Folding carton'] }
                    }
                ]
            },
            {
                id: 'q4',
                text: 'What is your budget range?',
                type: 'choice',
                options: [
                    {
                        value: 'budget',
                        label: '💰 Budget (<$150,000)',
                        weight: { priceMax: 150000 }
                    },
                    {
                        value: 'mid-range',
                        label: '💰💰 Mid-range ($150,000-$300,000)',
                        weight: { priceMax: 300000 }
                    },
                    {
                        value: 'premium',
                        label: '💰💰💰 Premium (>$300,000)',
                        weight: { priceMax: 999999 }
                    }
                ]
            },
            {
                id: 'q5',
                text: 'When do you need the equipment delivered?',
                type: 'choice',
                options: [
                    {
                        value: 'urgent',
                        label: '⚡ Urgent (within 3 months)',
                        weight: { leadTimeMax: 12 }
                    },
                    {
                        value: 'standard',
                        label: '📅 Standard (3-6 months)',
                        weight: { leadTimeMax: 24 }
                    },
                    {
                        value: 'flexible',
                        label: '🕐 Flexible (>6 months)',
                        weight: { leadTimeMax: 52 }
                    }
                ]
            }
        ]
    },
    'die-cutting': {
        questions: [
            {
                id: 'q1',
                text: 'What production speed do you require?',
                type: 'choice',
                options: [
                    {
                        value: 'standard',
                        label: '🐢 Standard (<5,000 sheets/hour)',
                        weight: { speedMin: 0, speedMax: 5000 }
                    },
                    {
                        value: 'high-speed',
                        label: '🚀 High speed (5,000-8,000 sheets/hour)',
                        weight: { speedMin: 5000, speedMax: 8000 }
                    },
                    {
                        value: 'ultra-high',
                        label: '⚡ Ultra high speed (>8,000 sheets/hour)',
                        weight: { speedMin: 8000, speedMax: 999999 }
                    }
                ]
            },
            {
                id: 'q2',
                text: 'What is your maximum sheet size?',
                type: 'choice',
                options: [
                    {
                        value: 'small',
                        label: '📏 Small format (<1,000mm)',
                        weight: { sizeMin: 1000 }
                    },
                    {
                        value: 'medium',
                        label: '📏📏 Medium format (1,000-1,600mm)',
                        weight: { sizeMin: 1600 }
                    },
                    {
                        value: 'large',
                        label: '📏📏📏 Large format (>1,600mm)',
                        weight: { sizeMin: 2000 }
                    }
                ]
            },
            {
                id: 'q3',
                text: 'What process complexity do you need?',
                type: 'choice',
                options: [
                    {
                        value: 'simple',
                        label: '✂️ Die-cutting only',
                        weight: { processes: 1 }
                    },
                    {
                        value: 'moderate',
                        label: '✂️🗑️ Die-cutting + stripping',
                        weight: { processes: 2 }
                    },
                    {
                        value: 'complex',
                        label: '✂️🗑️📦 Die-cutting + stripping + blanking',
                        weight: { processes: 3 }
                    }
                ]
            },
            {
                id: 'q4',
                text: 'What is your budget range?',
                type: 'choice',
                options: [
                    {
                        value: 'budget',
                        label: '💰 Budget (<$100,000)',
                        weight: { priceMax: 100000 }
                    },
                    {
                        value: 'mid-range',
                        label: '💰💰 Mid-range ($100,000-$200,000)',
                        weight: { priceMax: 200000 }
                    },
                    {
                        value: 'premium',
                        label: '💰💰💰 Premium (>$200,000)',
                        weight: { priceMax: 999999 }
                    }
                ]
            }
        ]
    },
    'feeding-palletizing': {
        questions: [
            {
                id: 'q1',
                text: 'What level of automation do you need?',
                type: 'choice',
                options: [
                    {
                        value: 'semi',
                        label: '👤 Semi-automatic (manual loading)',
                        weight: { automation: 'semi-automatic' }
                    },
                    {
                        value: 'full',
                        label: '⚙️ Fully automatic (auto loading)',
                        weight: { automation: 'fully-automatic' }
                    },
                    {
                        value: 'robotic',
                        label: '🤖 Robotic system (AI-powered, 3D vision)',
                        weight: { automation: 'robotic-ai' }
                    }
                ]
            },
            {
                id: 'q2',
                text: 'What is your maximum load requirement?',
                type: 'choice',
                options: [
                    {
                        value: 'light',
                        label: '📦 Light duty (<200kg per stack)',
                        weight: { loadMin: 200 }
                    },
                    {
                        value: 'medium',
                        label: '📦📦 Medium duty (200-350kg per stack)',
                        weight: { loadMin: 350 }
                    },
                    {
                        value: 'heavy',
                        label: '📦📦📦 Heavy duty (>350kg per stack)',
                        weight: { loadMin: 500 }
                    }
                ]
            },
            {
                id: 'q3',
                text: 'How will this integrate with your production line?',
                type: 'choice',
                options: [
                    {
                        value: 'standalone',
                        label: '🔲 Standalone unit',
                        weight: { integration: 'standalone' }
                    },
                    {
                        value: 'inline',
                        label: '🔗 Inline with folder-gluer',
                        weight: { integration: 'inline' }
                    },
                    {
                        value: 'end-of-line',
                        label: '🏁 End-of-line solution',
                        weight: { integration: 'end-of-line' }
                    }
                ]
            },
            {
                id: 'q4',
                text: 'What is your budget range?',
                type: 'choice',
                options: [
                    {
                        value: 'budget',
                        label: '💰 Budget (<$80,000)',
                        weight: { priceMax: 80000 }
                    },
                    {
                        value: 'mid-range',
                        label: '💰💰 Mid-range ($80,000-$150,000)',
                        weight: { priceMax: 150000 }
                    },
                    {
                        value: 'premium',
                        label: '💰💰💰 Premium (>$150,000)',
                        weight: { priceMax: 999999 }
                    }
                ]
            }
        ]
    }
};

// ========================================
// MATCH SCORING ALGORITHM
// ========================================

function calculateEquipmentMatchScore(equipment, userRequirements) {
    let score = 0;
    let maxScore = 100;
    
    // 1. Capacity match (30 points)
    if (userRequirements.capacity) {
        if (equipment.capacity.suitableFor === userRequirements.capacity) {
            score += 30;
        } else if (equipment.capacity.suitableFor.includes(userRequirements.capacity.split('-')[0])) {
            score += 15;
        }
    }
    
    // 2. Quality/Specs match (25 points)
    if (userRequirements.resolution && equipment.specs.resolution) {
        if (equipment.specs.resolution >= userRequirements.resolution) {
            score += 25;
        } else if (equipment.specs.resolution >= userRequirements.resolution * 0.8) {
            score += 15;
        }
    }
    
    // 3. Budget match (20 points)
    if (userRequirements.priceMax) {
        if (equipment.price.min <= userRequirements.priceMax) {
            score += 20;
        } else if (equipment.price.min <= userRequirements.priceMax * 1.2) {
            score += 10;
        }
    }
    
    // 4. Features match (15 points)
    if (userRequirements.applications && equipment.applications) {
        const matchCount = userRequirements.applications.filter(app => 
            equipment.applications.includes(app)
        ).length;
        score += (matchCount / userRequirements.applications.length) * 15;
    }
    
    // 5. Lead time match (10 points)
    if (userRequirements.leadTimeMax) {
        if (equipment.leadTime <= userRequirements.leadTimeMax) {
            score += 10;
        } else if (equipment.leadTime <= userRequirements.leadTimeMax * 1.5) {
            score += 5;
        }
    }
    
    return Math.round(score);
}

function getMatchRating(score) {
    if (score >= 90) return { stars: 5, label: 'Excellent Match' };
    if (score >= 75) return { stars: 4, label: 'Very Good Match' };
    if (score >= 60) return { stars: 3, label: 'Good Match' };
    if (score >= 45) return { stars: 2, label: 'Fair Match' };
    return { stars: 1, label: 'Partial Match' };
}

// ========================================
// CONVERSATION MANAGER
// ========================================

class EquipmentSelectionManager {
    constructor() {
        this.state = {
            stage: 'welcome',
            selectedModule: null,
            selectedEquipmentType: null,
            currentQuestionIndex: 0,
            userAnswers: {},
            userRequirements: {},
            recommendedEquipment: []
        };
    }
    
    async startEquipmentSelection(equipmentType) {
        this.state.selectedEquipmentType = equipmentType;
        this.state.currentQuestionIndex = 0;
        this.state.userAnswers = {};
        this.state.stage = 'equipment-selection';
        
        // Show first question
        this.showNextQuestion();
    }
    
    showNextQuestion() {
        const questions = EQUIPMENT_SELECTION_QUESTIONS[this.state.selectedEquipmentType]?.questions || [];
        const currentQ = questions[this.state.currentQuestionIndex];
        
        if (!currentQ) {
            // All questions answered, show recommendations
            this.generateRecommendations();
            return;
        }
        
        const totalQuestions = questions.length;
        const progress = `Question ${this.state.currentQuestionIndex + 1} of ${totalQuestions}`;
        
        const message = `
📊 **${progress}**

${currentQ.text}

Please select the option that best describes your needs:
        `.trim();
        
        addAIMessage(message);
        
        // Show option buttons
        const options = currentQ.options.map(opt => ({
            text: opt.label,
            value: opt.value,
            weight: opt.weight
        }));
        
        showQuickReplies(options, (selectedOption) => {
            this.handleAnswer(currentQ.id, selectedOption);
        });
    }
    
    handleAnswer(questionId, answer) {
        this.state.userAnswers[questionId] = answer;
        
        // Merge weights into requirements
        const questions = EQUIPMENT_SELECTION_QUESTIONS[this.state.selectedEquipmentType].questions;
        const question = questions.find(q => q.id === questionId);
        const option = question.options.find(opt => opt.value === answer.value);
        
        Object.assign(this.state.userRequirements, option.weight);
        
        // Move to next question
        this.state.currentQuestionIndex++;
        this.showNextQuestion();
    }
    
    generateRecommendations() {
        const equipmentType = this.state.selectedEquipmentType;
        const allEquipment = EQUIPMENT_DATABASE[equipmentType] || [];
        
        // Calculate match scores for all equipment
        const scoredEquipment = allEquipment.map(eq => ({
            ...eq,
            matchScore: calculateEquipmentMatchScore(eq, this.state.userRequirements),
            matchRating: null
        }));
        
        // Add rating
        scoredEquipment.forEach(eq => {
            eq.matchRating = getMatchRating(eq.matchScore);
        });
        
        // Sort by score (highest first)
        scoredEquipment.sort((a, b) => b.matchScore - a.matchScore);
        
        // Take top 3
        this.state.recommendedEquipment = scoredEquipment.slice(0, 3);
        
        // Display recommendations
        this.displayRecommendations();
    }
    
    displayRecommendations() {
        const recommendations = this.state.recommendedEquipment;
        
        if (recommendations.length === 0) {
            addAIMessage('Sorry, no equipment matches your requirements. Please contact our sales team for custom solutions.');
            return;
        }
        
        let message = `
🎯 **Equipment Recommendations**

Based on your requirements, here are the top ${recommendations.length} matches:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        `.trim();
        
        addAIMessage(message);
        
        // Display each recommendation
        recommendations.forEach((eq, index) => {
            const stars = '⭐'.repeat(eq.matchRating.stars);
            const features = eq.features.slice(0, 4).map(f => `  • ${f}`).join('\n');
            
            const recMessage = `
**#${index + 1} ${eq.name}** - ${eq.matchScore}% Match ${stars}

**Supplier:** ${eq.supplier}  
**Price Range:** ${eq.price.range}  
**Lead Time:** ${eq.leadTime} weeks

**Key Specifications:**
  • Max Speed: ${eq.specs.maxSpeed || eq.specs.speed || 'N/A'}
  • Automation: ${eq.specs.automation}

**Top Features:**
${features}

**Why recommended:**
${this.generateRecommendationReason(eq)}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            `.trim();
            
            addAIMessage(recMessage);
        });
        
        // Show next steps
        const nextStepsMessage = `
💡 **Next Steps:**

Would you like to:
        `.trim();
        
        addAIMessage(nextStepsMessage);
        
        showQuickReplies([
            { text: '📧 Request detailed quotation', value: 'request-quote' },
            { text: '📞 Schedule consultation', value: 'schedule-consultation' },
            { text: '🔄 Compare all options', value: 'compare-options' },
            { text: '🔍 See more equipment', value: 'see-more' }
        ], (action) => {
            this.handleNextStepAction(action.value);
        });
    }
    
    generateRecommendationReason(equipment) {
        const reasons = [];
        
        if (equipment.matchScore >= 90) {
            reasons.push('Perfect match for all your requirements');
        } else if (equipment.matchScore >= 75) {
            reasons.push('Excellent fit for your production needs');
        }
        
        if (equipment.tier === 'flagship') {
            reasons.push('Top-of-the-line technology with advanced features');
        } else if (equipment.tier === 'entry') {
            reasons.push('Cost-effective solution with reliable performance');
        }
        
        if (this.state.userRequirements.priceMax && equipment.price.min <= this.state.userRequirements.priceMax) {
            reasons.push('Within your budget range');
        }
        
        if (this.state.userRequirements.leadTimeMax && equipment.leadTime <= this.state.userRequirements.leadTimeMax) {
            reasons.push('Can be delivered within your timeline');
        }
        
        return reasons.length > 0 ? reasons.join('. ') + '.' : 'Good overall match for your needs.';
    }
    
    handleNextStepAction(action) {
        switch(action) {
            case 'request-quote':
                addAIMessage('Great! Let me collect your contact information to send you a detailed quotation...');
                // Proceed to contact info collection
                break;
            case 'schedule-consultation':
                addAIMessage('I\'ll connect you with our equipment specialist. Please provide your contact details...');
                break;
            case 'compare-options':
                this.showDetailedComparison();
                break;
            case 'see-more':
                addAIMessage('Let me show you additional options...');
                break;
        }
    }
    
    showDetailedComparison() {
        // TODO: Implement detailed comparison table
        addAIMessage('Detailed comparison feature coming soon!');
    }
}

// Global instance
let equipmentSelectionManager = null;

// ========================================
// INITIALIZE
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('V12.3 Equipment Selection System initialized');
    equipmentSelectionManager = new EquipmentSelectionManager();
});

console.log('V12.3 initialization complete!');

