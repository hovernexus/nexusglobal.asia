/**
 * NEXUS V13.0 Equipment Configurator - JavaScript
 * Dynamic Form Fields & Intelligent Recommendation Engine
 */

// ========================================
// Equipment-Specific Form Fields Configuration
// ========================================

const EQUIPMENT_FORM_FIELDS = {
    'digital-printing': [
        {
            id: 'productType',
            label: 'Product Type',
            icon: '📦',
            type: 'select',
            required: true,
            options: [
                { value: '', label: 'Select product type' },
                { value: 'corrugated', label: 'Corrugated Board Only' },
                { value: 'folding-carton', label: 'Folding Carton Only' },
                { value: 'both', label: 'Both Corrugated & Folding Carton' }
            ]
        },
        {
            id: 'dailyOutput',
            label: 'Daily Production Volume (sheets/day)',
            icon: '📊',
            type: 'number',
            required: true,
            placeholder: '5000',
            min: 100,
            max: 50000,
            helper: 'Enter your target daily production volume'
        },
        {
            id: 'printQuality',
            label: 'Print Quality Requirement',
            icon: '🎨',
            type: 'select',
            required: true,
            options: [
                { value: '', label: 'Select quality level' },
                { value: 'standard', label: 'Standard Quality (300-600 DPI)' },
                { value: 'high', label: 'High Definition (600-1200 DPI)' },
                { value: 'ultra', label: 'Ultra HD (>1200 DPI)' }
            ]
        },
        {
            id: 'printWidth',
            label: 'Maximum Print Width',
            icon: '📏',
            type: 'select',
            required: true,
            options: [
                { value: '', label: 'Select print width' },
                { value: 'small', label: 'Small Format (<1600mm)' },
                { value: 'medium', label: 'Medium Format (1600-2000mm)' },
                { value: 'large', label: 'Large Format (>2000mm)' }
            ]
        },
        {
            id: 'colorCount',
            label: 'Number of Colors',
            icon: '🌈',
            type: 'select',
            required: true,
            options: [
                { value: '', label: 'Select color count' },
                { value: '1-2', label: '1-2 Colors' },
                { value: '3-4', label: '3-4 Colors' },
                { value: '5-8', label: '5-8 Colors (Full Color)' }
            ]
        },
        {
            id: 'budget',
            label: 'Budget Range (USD)',
            icon: '💰',
            type: 'select',
            required: true,
            options: [
                { value: '', label: 'Select budget range' },
                { value: 'low', label: 'Under $150,000' },
                { value: 'medium', label: '$150,000 - $300,000' },
                { value: 'high', label: 'Over $300,000' }
            ]
        },
        {
            id: 'deliveryTime',
            label: 'Delivery Timeline',
            icon: '⏰',
            type: 'select',
            required: true,
            options: [
                { value: '', label: 'Select timeline' },
                { value: 'urgent', label: 'Urgent (Within 3 months)' },
                { value: 'standard', label: 'Standard (3-6 months)' },
                { value: 'flexible', label: 'Flexible (6+ months)' }
            ]
        }
    ],
    
    'die-cutting': [
        {
            id: 'productionSpeed',
            label: 'Required Production Speed',
            icon: '⚡',
            type: 'select',
            required: true,
            options: [
                { value: '', label: 'Select speed requirement' },
                { value: 'low', label: 'Standard Speed (<5,000 sheets/hour)' },
                { value: 'medium', label: 'High Speed (5,000-8,000 sheets/hour)' },
                { value: 'high', label: 'Ultra High Speed (>8,000 sheets/hour)' }
            ]
        },
        {
            id: 'maxSheetSize',
            label: 'Maximum Sheet Size',
            icon: '📐',
            type: 'select',
            required: true,
            options: [
                { value: '', label: 'Select sheet size' },
                { value: 'small', label: 'Small Format (<1000mm)' },
                { value: 'medium', label: 'Medium Format (1000-1600mm)' },
                { value: 'large', label: 'Large Format (>1600mm)' }
            ]
        },
        {
            id: 'processComplexity',
            label: 'Process Complexity',
            icon: '🔧',
            type: 'select',
            required: true,
            options: [
                { value: '', label: 'Select process type' },
                { value: 'basic', label: 'Die-Cutting Only' },
                { value: 'advanced', label: 'Die-Cutting + Waste Stripping' },
                { value: 'complete', label: 'Die-Cutting + Stripping + Blanking' }
            ]
        },
        {
            id: 'automation',
            label: 'Automation Level',
            icon: '🤖',
            type: 'select',
            required: true,
            options: [
                { value: '', label: 'Select automation level' },
                { value: 'semi', label: 'Semi-Automatic' },
                { value: 'full', label: 'Fully Automatic' },
                { value: 'robotic', label: 'Robotic System' }
            ]
        },
        {
            id: 'budget',
            label: 'Budget Range (USD)',
            icon: '💰',
            type: 'select',
            required: true,
            options: [
                { value: '', label: 'Select budget range' },
                { value: 'low', label: 'Under $100,000' },
                { value: 'medium', label: '$100,000 - $200,000' },
                { value: 'high', label: 'Over $200,000' }
            ]
        }
    ],
    
    'feeding-palletizing': [
        {
            id: 'automationLevel',
            label: 'Automation Level',
            icon: '🤖',
            type: 'select',
            required: true,
            options: [
                { value: '', label: 'Select automation level' },
                { value: 'semi', label: 'Semi-Automatic' },
                { value: 'full', label: 'Fully Automatic' },
                { value: 'robotic', label: 'Robotic System (AI-powered, 3D vision)' }
            ]
        },
        {
            id: 'maxLoad',
            label: 'Maximum Load Requirement',
            icon: '⚖️',
            type: 'select',
            required: true,
            options: [
                { value: '', label: 'Select load capacity' },
                { value: 'light', label: 'Light Duty (<200kg per stack)' },
                { value: 'medium', label: 'Medium Duty (200-350kg per stack)' },
                { value: 'heavy', label: 'Heavy Duty (>350kg per stack)' }
            ]
        },
        {
            id: 'integration',
            label: 'Production Line Integration',
            icon: '🔗',
            type: 'select',
            required: true,
            options: [
                { value: '', label: 'Select integration type' },
                { value: 'standalone', label: 'Standalone Operation' },
                { value: 'inline', label: 'Inline Integration' },
                { value: 'end-of-line', label: 'End-of-Line Solution' }
            ]
        },
        {
            id: 'budget',
            label: 'Budget Range (USD)',
            icon: '💰',
            type: 'select',
            required: true,
            options: [
                { value: '', label: 'Select budget range' },
                { value: 'low', label: 'Under $80,000' },
                { value: 'medium', label: '$80,000 - $150,000' },
                { value: 'high', label: 'Over $150,000' }
            ]
        }
    ],
    
    // Add more equipment types as needed
    'folder-gluer': [
        {
            id: 'boxType',
            label: 'Box Type',
            icon: '📦',
            type: 'select',
            required: true,
            options: [
                { value: '', label: 'Select box type' },
                { value: 'straight-line', label: 'Straight-Line Boxes' },
                { value: 'crash-lock', label: 'Crash-Lock Bottom Boxes' },
                { value: 'complex', label: 'Complex Structures' }
            ]
        },
        {
            id: 'speed',
            label: 'Production Speed',
            icon: '⚡',
            type: 'select',
            required: true,
            options: [
                { value: '', label: 'Select speed' },
                { value: 'low', label: 'Standard (100-200 m/min)' },
                { value: 'medium', label: 'High Speed (200-300 m/min)' },
                { value: 'high', label: 'Ultra High (>300 m/min)' }
            ]
        },
        {
            id: 'maxWidth',
            label: 'Maximum Width',
            icon: '📏',
            type: 'select',
            required: true,
            options: [
                { value: '', label: 'Select width' },
                { value: 'small', label: 'Small (<1200mm)' },
                { value: 'medium', label: 'Medium (1200-1600mm)' },
                { value: 'large', label: 'Large (>1600mm)' }
            ]
        },
        {
            id: 'budget',
            label: 'Budget Range (USD)',
            icon: '💰',
            type: 'select',
            required: true,
            options: [
                { value: '', label: 'Select budget range' },
                { value: 'low', label: 'Under $100,000' },
                { value: 'medium', label: '$100,000 - $200,000' },
                { value: 'high', label: 'Over $200,000' }
            ]
        }
    ]
};

// ========================================
// Equipment Database (Expanded)
// ========================================

const EQUIPMENT_DATABASE = {
    'digital-printing': [
        {
            id: 'dp-001',
            name: 'NEXUS DigiPrint 1600',
            supplier: 'NEXUS Partners - Digital Division',
            category: 'Digital Printing Machines',
            tier: 'entry',
            specs: {
                printWidth: 1600,
                maxSpeed: 60,
                resolution: 600,
                colors: 4,
                automation: 'semi-automatic',
                productType: ['corrugated', 'both']
            },
            capacity: {
                dailyOutput: 2000,
                suitableFor: 'small-runs'
            },
            price: {
                range: '$80,000 - $120,000',
                min: 80000,
                max: 120000
            },
            features: [
                'Cost-effective entry-level solution',
                'Reliable performance for small to medium runs',
                'Easy operation and maintenance',
                'Compact footprint'
            ],
            applications: ['Corrugated board', 'Small format printing'],
            leadTime: 12,
            image: '/images/equipment/digiprint-1600.jpg'
        },
        {
            id: 'dp-002',
            name: 'NEXUS DigiPrint 2500 HD',
            supplier: 'NEXUS Partners - Digital Division',
            category: 'Digital Printing Machines',
            tier: 'premium',
            specs: {
                printWidth: 2500,
                maxSpeed: 100,
                resolution: 1200,
                colors: 6,
                automation: 'fully-automatic',
                productType: ['corrugated', 'folding-carton', 'both']
            },
            capacity: {
                dailyOutput: 5000,
                suitableFor: 'medium-to-large-runs'
            },
            price: {
                range: '$250,000 - $350,000',
                min: 250000,
                max: 350000
            },
            features: [
                'Ultra HD printing (1200 DPI)',
                'Inline quality inspection system',
                'Automated color management',
                'High-speed production capability',
                'Multi-substrate compatibility'
            ],
            applications: ['Corrugated board', 'Folding carton', 'High-quality printing'],
            leadTime: 16,
            image: '/images/equipment/digiprint-2500hd.jpg'
        },
        {
            id: 'dp-003',
            name: 'NEXUS DigiPrint 2000 Pro',
            supplier: 'NEXUS Partners - Digital Division',
            category: 'Digital Printing Machines',
            tier: 'mid',
            specs: {
                printWidth: 2000,
                maxSpeed: 80,
                resolution: 900,
                colors: 5,
                automation: 'fully-automatic',
                productType: ['corrugated', 'folding-carton', 'both']
            },
            capacity: {
                dailyOutput: 3500,
                suitableFor: 'medium-runs'
            },
            price: {
                range: '$150,000 - $220,000',
                min: 150000,
                max: 220000
            },
            features: [
                'Balanced performance and price',
                'High definition printing (900 DPI)',
                'Automated workflow integration',
                'Energy-efficient operation'
            ],
            applications: ['Corrugated board', 'Folding carton', 'Medium-volume production'],
            leadTime: 14,
            image: '/images/equipment/digiprint-2000pro.jpg'
        }
    ],
    
    'die-cutting': [
        {
            id: 'dc-001',
            name: 'NEXUS DieCut 1060',
            supplier: 'NEXUS Partners - Finishing Division',
            category: 'Die-Cutting Machines',
            tier: 'entry',
            specs: {
                maxSheetSize: 1060,
                maxSpeed: 4500,
                processType: 'basic',
                automation: 'semi-automatic'
            },
            capacity: {
                hourlyOutput: 4500,
                suitableFor: 'small-to-medium-runs'
            },
            price: {
                range: '$60,000 - $90,000',
                min: 60000,
                max: 90000
            },
            features: [
                'Reliable die-cutting performance',
                'Easy die change system',
                'Compact design',
                'Cost-effective solution'
            ],
            applications: ['Standard die-cutting', 'Small to medium format'],
            leadTime: 10,
            image: '/images/equipment/diecut-1060.jpg'
        },
        {
            id: 'dc-002',
            name: 'NEXUS DieCut 1650 Pro',
            supplier: 'NEXUS Partners - Finishing Division',
            category: 'Die-Cutting Machines',
            tier: 'premium',
            specs: {
                maxSheetSize: 1650,
                maxSpeed: 9000,
                processType: 'complete',
                automation: 'fully-automatic'
            },
            capacity: {
                hourlyOutput: 9000,
                suitableFor: 'high-volume-production'
            },
            price: {
                range: '$180,000 - $250,000',
                min: 180000,
                max: 250000
            },
            features: [
                'Ultra high-speed die-cutting',
                'Integrated waste stripping',
                'Automatic blanking system',
                'Advanced control system',
                'Minimal setup time'
            ],
            applications: ['High-volume die-cutting', 'Complex structures', 'Large format'],
            leadTime: 14,
            image: '/images/equipment/diecut-1650pro.jpg'
        }
    ],
    
    'feeding-palletizing': [
        {
            id: 'fp-001',
            name: 'NEXUS AutoStack 200',
            supplier: 'NEXUS Partners - Automation Division',
            category: 'Feeding/Palletizing Machines',
            tier: 'entry',
            specs: {
                maxLoad: 200,
                automation: 'semi-automatic',
                integration: 'standalone'
            },
            capacity: {
                stacksPerHour: 30,
                suitableFor: 'small-operations'
            },
            price: {
                range: '$45,000 - $70,000',
                min: 45000,
                max: 70000
            },
            features: [
                'Semi-automatic palletizing',
                'Easy operation',
                'Compact footprint',
                'Reliable performance'
            ],
            applications: ['Light-duty palletizing', 'Small production lines'],
            leadTime: 8,
            image: '/images/equipment/autostack-200.jpg'
        },
        {
            id: 'fp-002',
            name: 'NEXUS RoboPal 350',
            supplier: 'NEXUS Partners - Automation Division',
            category: 'Feeding/Palletizing Machines',
            tier: 'flagship',
            specs: {
                maxLoad: 350,
                automation: 'robotic',
                integration: 'end-of-line'
            },
            capacity: {
                stacksPerHour: 60,
                suitableFor: 'high-volume-operations'
            },
            price: {
                range: '$180,000 - $250,000',
                min: 180000,
                max: 250000
            },
            features: [
                'AI-powered robotic system',
                '3D vision technology',
                'Flexible pallet patterns',
                'End-of-line integration',
                'Remote monitoring and diagnostics'
            ],
            applications: ['Heavy-duty palletizing', 'High-volume production', 'Smart factory integration'],
            leadTime: 16,
            image: '/images/equipment/robopal-350.jpg'
        }
    ],
    
    'folder-gluer': [
        {
            id: 'fg-001',
            name: 'NEXUS FoldMaster 1200',
            supplier: 'NEXUS Partners - Finishing Division',
            category: 'Folder Gluer Machines',
            tier: 'entry',
            specs: {
                maxWidth: 1200,
                maxSpeed: 180,
                boxTypes: ['straight-line']
            },
            capacity: {
                speedMPerMin: 180,
                suitableFor: 'standard-boxes'
            },
            price: {
                range: '$70,000 - $100,000',
                min: 70000,
                max: 100000
            },
            features: [
                'Reliable straight-line folding',
                'Easy setup and operation',
                'Consistent gluing quality',
                'Compact design'
            ],
            applications: ['Straight-line boxes', 'Standard folding cartons'],
            leadTime: 10,
            image: '/images/equipment/foldmaster-1200.jpg'
        },
        {
            id: 'fg-002',
            name: 'NEXUS FoldMaster 1600 Pro',
            supplier: 'NEXUS Partners - Finishing Division',
            category: 'Folder Gluer Machines',
            tier: 'premium',
            specs: {
                maxWidth: 1600,
                maxSpeed: 350,
                boxTypes: ['straight-line', 'crash-lock', 'complex']
            },
            capacity: {
                speedMPerMin: 350,
                suitableFor: 'complex-structures'
            },
            price: {
                range: '$200,000 - $280,000',
                min: 200000,
                max: 280000
            },
            features: [
                'Ultra high-speed operation',
                'Multi-point gluing system',
                'Complex structure capability',
                'Automated setup memory',
                'Quality monitoring system'
            ],
            applications: ['Complex box structures', 'High-speed production', 'Crash-lock bottom'],
            leadTime: 14,
            image: '/images/equipment/foldmaster-1600pro.jpg'
        }
    ]
};

// ========================================
// DOM Elements
// ========================================

const elements = {
    equipmentTypeSelect: document.getElementById('equipmentType'),
    dynamicFieldsContainer: document.getElementById('dynamicFieldsContainer'),
    configForm: document.getElementById('equipmentConfigForm'),
    submitBtn: document.getElementById('submitBtn'),
    resetBtn: document.getElementById('resetBtn'),
    emptyState: document.getElementById('emptyState'),
    loadingState: document.getElementById('loadingState'),
    recommendationsContainer: document.getElementById('recommendationsContainer'),
    recommendationsList: document.getElementById('recommendationsList'),
    requestQuoteBtn: document.getElementById('requestQuoteBtn'),
    scheduleConsultBtn: document.getElementById('scheduleConsultBtn'),
    compareBtn: document.getElementById('compareBtn')
};

// ========================================
// State Management
// ========================================

let currentFormData = {};
let currentRecommendations = [];

// ========================================
// Event Listeners
// ========================================

// Equipment type change
elements.equipmentTypeSelect.addEventListener('change', handleEquipmentTypeChange);

// Form submission
elements.configForm.addEventListener('submit', handleFormSubmit);

// Reset button
elements.resetBtn.addEventListener('click', handleFormReset);

// Form field changes (for validation)
elements.configForm.addEventListener('change', validateForm);
elements.configForm.addEventListener('input', validateForm);

// Next step buttons
if (elements.requestQuoteBtn) {
    elements.requestQuoteBtn.addEventListener('click', () => handleNextStep('quote'));
}
if (elements.scheduleConsultBtn) {
    elements.scheduleConsultBtn.addEventListener('click', () => handleNextStep('consult'));
}
if (elements.compareBtn) {
    elements.compareBtn.addEventListener('click', () => handleNextStep('compare'));
}

// ========================================
// Core Functions
// ========================================

function handleEquipmentTypeChange(e) {
    const equipmentType = e.target.value;
    
    if (!equipmentType) {
        elements.dynamicFieldsContainer.innerHTML = '';
        elements.submitBtn.disabled = true;
        return;
    }
    
    renderDynamicFields(equipmentType);
    validateForm();
}

function renderDynamicFields(equipmentType) {
    const fields = EQUIPMENT_FORM_FIELDS[equipmentType];
    
    if (!fields) {
        elements.dynamicFieldsContainer.innerHTML = '<p class="error">No configuration fields available for this equipment type.</p>';
        return;
    }
    
    let html = '';
    
    fields.forEach(field => {
        html += `
            <div class="form-group">
                <label for="${field.id}" class="form-label">
                    <span class="label-icon">${field.icon}</span>
                    <span class="label-text">${field.label}</span>
                    ${field.required ? '<span class="label-required">*</span>' : ''}
                </label>
        `;
        
        if (field.type === 'select') {
            html += `
                <select id="${field.id}" name="${field.id}" class="form-select" ${field.required ? 'required' : ''}>
                    ${field.options.map(opt => `<option value="${opt.value}">${opt.label}</option>`).join('')}
                </select>
            `;
        } else if (field.type === 'number') {
            html += `
                <input 
                    type="number" 
                    id="${field.id}" 
                    name="${field.id}" 
                    class="form-input" 
                    placeholder="${field.placeholder || ''}"
                    min="${field.min || ''}"
                    max="${field.max || ''}"
                    ${field.required ? 'required' : ''}
                >
            `;
        }
        
        if (field.helper) {
            html += `<p class="form-helper">${field.helper}</p>`;
        }
        
        html += `</div>`;
    });
    
    elements.dynamicFieldsContainer.innerHTML = html;
    
    // Re-attach event listeners for new fields
    elements.dynamicFieldsContainer.querySelectorAll('select, input').forEach(field => {
        field.addEventListener('change', validateForm);
        field.addEventListener('input', validateForm);
    });
}

function validateForm() {
    const formData = new FormData(elements.configForm);
    const equipmentType = formData.get('equipmentType');
    
    if (!equipmentType) {
        elements.submitBtn.disabled = true;
        return false;
    }
    
    const fields = EQUIPMENT_FORM_FIELDS[equipmentType];
    if (!fields) {
        elements.submitBtn.disabled = true;
        return false;
    }
    
    // Check if all required fields are filled
    let allFilled = true;
    fields.forEach(field => {
        if (field.required) {
            const value = formData.get(field.id);
            if (!value || value === '') {
                allFilled = false;
            }
        }
    });
    
    elements.submitBtn.disabled = !allFilled;
    return allFilled;
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    if (!validateForm()) {
        return;
    }
    
    // Collect form data
    const formData = new FormData(elements.configForm);
    currentFormData = {};
    for (let [key, value] of formData.entries()) {
        currentFormData[key] = value;
    }
    
    // Show loading state
    showLoadingState();
    
    // Simulate AI processing delay
    setTimeout(() => {
        // Generate recommendations
        const recommendations = generateRecommendations(currentFormData);
        currentRecommendations = recommendations;
        
        // Display recommendations
        displayRecommendations(recommendations);
    }, 1500);
}

function handleFormReset() {
    elements.configForm.reset();
    elements.dynamicFieldsContainer.innerHTML = '';
    elements.submitBtn.disabled = true;
    currentFormData = {};
    currentRecommendations = [];
    
    // Show empty state
    showEmptyState();
}

// Continue in next part...



// ========================================
// Recommendation Engine
// ========================================

function generateRecommendations(formData) {
    const equipmentType = formData.equipmentType;
    const equipmentList = EQUIPMENT_DATABASE[equipmentType] || [];
    
    if (equipmentList.length === 0) {
        return [];
    }
    
    // Score each equipment
    const scoredEquipment = equipmentList.map(equipment => {
        const score = calculateMatchScore(equipment, formData, equipmentType);
        return {
            ...equipment,
            matchScore: score.total,
            matchDetails: score.details,
            stars: getStarRating(score.total),
            matchLevel: getMatchLevel(score.total),
            recommendationReason: generateRecommendationReason(equipment, formData, score)
        };
    });
    
    // Sort by score (descending)
    scoredEquipment.sort((a, b) => b.matchScore - a.matchScore);
    
    // Return top 3
    return scoredEquipment.slice(0, 3);
}

function calculateMatchScore(equipment, formData, equipmentType) {
    let totalScore = 0;
    const details = {};
    
    if (equipmentType === 'digital-printing') {
        // Capacity Match (30 points)
        const dailyOutput = parseInt(formData.dailyOutput) || 0;
        const capacityScore = calculateCapacityScore(dailyOutput, equipment.capacity.dailyOutput);
        details.capacity = capacityScore;
        totalScore += capacityScore;
        
        // Quality/Specs Match (25 points)
        const qualityScore = calculateQualityScore(formData.printQuality, equipment.specs.resolution);
        details.quality = qualityScore;
        totalScore += qualityScore;
        
        // Budget Match (20 points)
        const budgetScore = calculateBudgetScore(formData.budget, equipment.price);
        details.budget = budgetScore;
        totalScore += budgetScore;
        
        // Features Match (15 points)
        const featuresScore = calculateFeaturesScore(formData, equipment.specs);
        details.features = featuresScore;
        totalScore += featuresScore;
        
        // Lead Time Match (10 points)
        const leadTimeScore = calculateLeadTimeScore(formData.deliveryTime, equipment.leadTime);
        details.leadTime = leadTimeScore;
        totalScore += leadTimeScore;
        
    } else if (equipmentType === 'die-cutting') {
        // Speed Match (30 points)
        const speedScore = calculateSpeedMatchScore(formData.productionSpeed, equipment.specs.maxSpeed);
        details.speed = speedScore;
        totalScore += speedScore;
        
        // Size Match (25 points)
        const sizeScore = calculateSizeMatchScore(formData.maxSheetSize, equipment.specs.maxSheetSize);
        details.size = sizeScore;
        totalScore += sizeScore;
        
        // Process Match (20 points)
        const processScore = calculateProcessMatchScore(formData.processComplexity, equipment.specs.processType);
        details.process = processScore;
        totalScore += processScore;
        
        // Automation Match (15 points)
        const automationScore = calculateAutomationMatchScore(formData.automation, equipment.specs.automation);
        details.automation = automationScore;
        totalScore += automationScore;
        
        // Budget Match (10 points)
        const budgetScore = calculateBudgetScore(formData.budget, equipment.price) * 0.5; // Scale to 10 points
        details.budget = budgetScore;
        totalScore += budgetScore;
        
    } else if (equipmentType === 'feeding-palletizing') {
        // Automation Match (30 points)
        const automationScore = calculateAutomationMatchScore(formData.automationLevel, equipment.specs.automation);
        details.automation = automationScore;
        totalScore += automationScore;
        
        // Load Match (30 points)
        const loadScore = calculateLoadMatchScore(formData.maxLoad, equipment.specs.maxLoad);
        details.load = loadScore;
        totalScore += loadScore;
        
        // Integration Match (20 points)
        const integrationScore = calculateIntegrationMatchScore(formData.integration, equipment.specs.integration);
        details.integration = integrationScore;
        totalScore += integrationScore;
        
        // Budget Match (20 points)
        const budgetScore = calculateBudgetScore(formData.budget, equipment.price);
        details.budget = budgetScore;
        totalScore += budgetScore;
        
    } else if (equipmentType === 'folder-gluer') {
        // Box Type Match (30 points)
        const boxTypeScore = calculateBoxTypeMatchScore(formData.boxType, equipment.specs.boxTypes);
        details.boxType = boxTypeScore;
        totalScore += boxTypeScore;
        
        // Speed Match (25 points)
        const speedScore = calculateSpeedMatchScoreFG(formData.speed, equipment.specs.maxSpeed);
        details.speed = speedScore;
        totalScore += speedScore;
        
        // Width Match (20 points)
        const widthScore = calculateWidthMatchScore(formData.maxWidth, equipment.specs.maxWidth);
        details.width = widthScore;
        totalScore += widthScore;
        
        // Budget Match (25 points)
        const budgetScore = calculateBudgetScore(formData.budget, equipment.price) * 1.25; // Scale to 25 points
        details.budget = budgetScore;
        totalScore += budgetScore;
    }
    
    return {
        total: Math.round(totalScore),
        details: details
    };
}

// ========================================
// Scoring Helper Functions
// ========================================

function calculateCapacityScore(required, available) {
    const ratio = available / required;
    if (ratio >= 0.8 && ratio <= 1.5) return 30; // Perfect match
    if (ratio >= 0.6 && ratio < 0.8) return 22;  // Slightly under
    if (ratio > 1.5 && ratio <= 2.0) return 25;  // Slightly over
    if (ratio > 2.0) return 20;                   // Way over (overkill)
    return 15;                                     // Way under
}

function calculateQualityScore(required, available) {
    const qualityMap = { 'standard': 600, 'high': 900, 'ultra': 1200 };
    const requiredDPI = qualityMap[required] || 600;
    
    if (available >= requiredDPI) return 25;      // Meets or exceeds
    if (available >= requiredDPI * 0.8) return 18; // Close enough
    return 10;                                     // Below requirement
}

function calculateBudgetScore(budgetRange, price) {
    const budgetMap = {
        'low': { min: 0, max: 150000 },
        'medium': { min: 150000, max: 300000 },
        'high': { min: 300000, max: 1000000 }
    };
    
    const budget = budgetMap[budgetRange];
    if (!budget) return 10;
    
    const avgPrice = (price.min + price.max) / 2;
    
    if (avgPrice >= budget.min && avgPrice <= budget.max) return 20; // Within budget
    if (avgPrice < budget.min) return 18;                            // Under budget (good value)
    if (avgPrice <= budget.max * 1.2) return 12;                     // Slightly over
    return 5;                                                         // Way over budget
}

function calculateFeaturesScore(formData, specs) {
    let score = 0;
    
    // Product type match
    if (formData.productType && specs.productType) {
        if (specs.productType.includes(formData.productType) || specs.productType.includes('both')) {
            score += 5;
        }
    }
    
    // Color count match
    if (formData.colorCount) {
        const colorMap = { '1-2': 2, '3-4': 4, '5-8': 6 };
        const requiredColors = colorMap[formData.colorCount] || 4;
        if (specs.colors >= requiredColors) score += 5;
    }
    
    // Width match
    if (formData.printWidth && specs.printWidth) {
        const widthMap = { 'small': 1600, 'medium': 2000, 'large': 2500 };
        const requiredWidth = widthMap[formData.printWidth] || 1600;
        if (specs.printWidth >= requiredWidth) score += 5;
    }
    
    return score;
}

function calculateLeadTimeScore(required, available) {
    const timeMap = { 'urgent': 12, 'standard': 20, 'flexible': 30 };
    const requiredWeeks = timeMap[required] || 20;
    
    if (available <= requiredWeeks) return 10;       // Can deliver on time
    if (available <= requiredWeeks * 1.2) return 7;  // Slightly delayed
    return 4;                                         // Significantly delayed
}

function calculateSpeedMatchScore(required, available) {
    const speedMap = { 'low': 5000, 'medium': 6500, 'high': 8000 };
    const requiredSpeed = speedMap[required] || 5000;
    
    if (available >= requiredSpeed) return 30;
    if (available >= requiredSpeed * 0.8) return 22;
    return 15;
}

function calculateSizeMatchScore(required, available) {
    const sizeMap = { 'small': 1000, 'medium': 1300, 'large': 1600 };
    const requiredSize = sizeMap[required] || 1000;
    
    if (available >= requiredSize) return 25;
    if (available >= requiredSize * 0.9) return 18;
    return 10;
}

function calculateProcessMatchScore(required, available) {
    const processMap = { 'basic': 1, 'advanced': 2, 'complete': 3 };
    const requiredLevel = processMap[required] || 1;
    const availableLevel = processMap[available] || 1;
    
    if (availableLevel >= requiredLevel) return 20;
    return 10;
}

function calculateAutomationMatchScore(required, available) {
    const autoMap = { 'semi': 1, 'semi-automatic': 1, 'full': 2, 'fully-automatic': 2, 'robotic': 3 };
    const requiredLevel = autoMap[required] || 1;
    const availableLevel = autoMap[available] || 1;
    
    if (availableLevel >= requiredLevel) return 15;
    return 8;
}

function calculateLoadMatchScore(required, available) {
    const loadMap = { 'light': 200, 'medium': 300, 'heavy': 350 };
    const requiredLoad = loadMap[required] || 200;
    
    if (available >= requiredLoad) return 30;
    if (available >= requiredLoad * 0.8) return 22;
    return 15;
}

function calculateIntegrationMatchScore(required, available) {
    if (required === available) return 20;
    if (available === 'end-of-line') return 18; // Most flexible
    return 12;
}

function calculateBoxTypeMatchScore(required, available) {
    if (available.includes(required)) return 30;
    if (available.includes('complex')) return 25; // Can handle all types
    return 15;
}

function calculateSpeedMatchScoreFG(required, available) {
    const speedMap = { 'low': 200, 'medium': 300, 'high': 350 };
    const requiredSpeed = speedMap[required] || 200;
    
    if (available >= requiredSpeed) return 25;
    if (available >= requiredSpeed * 0.8) return 18;
    return 10;
}

function calculateWidthMatchScore(required, available) {
    const widthMap = { 'small': 1200, 'medium': 1400, 'large': 1600 };
    const requiredWidth = widthMap[required] || 1200;
    
    if (available >= requiredWidth) return 20;
    if (available >= requiredWidth * 0.9) return 14;
    return 8;
}

function getStarRating(score) {
    if (score >= 90) return '⭐⭐⭐⭐⭐';
    if (score >= 75) return '⭐⭐⭐⭐';
    if (score >= 60) return '⭐⭐⭐';
    if (score >= 45) return '⭐⭐';
    return '⭐';
}

function getMatchLevel(score) {
    if (score >= 90) return 'Excellent Match';
    if (score >= 75) return 'Very Good Match';
    if (score >= 60) return 'Good Match';
    if (score >= 45) return 'Fair Match';
    return 'Partial Match';
}

function generateRecommendationReason(equipment, formData, score) {
    const reasons = [];
    
    if (score.total >= 90) {
        reasons.push('Perfect match for all your requirements.');
    } else if (score.total >= 75) {
        reasons.push('Excellent match for most of your requirements.');
    }
    
    // Add specific reasons based on score details
    if (score.details.capacity >= 25) {
        reasons.push('Production capacity aligns perfectly with your needs.');
    }
    
    if (score.details.quality >= 20 || score.details.speed >= 25) {
        reasons.push('Meets or exceeds your quality/speed requirements.');
    }
    
    if (score.details.budget >= 18) {
        reasons.push('Within your budget range with excellent value.');
    }
    
    if (equipment.tier === 'flagship' || equipment.tier === 'premium') {
        reasons.push('Top-of-the-line technology with advanced features.');
    }
    
    if (equipment.tier === 'entry') {
        reasons.push('Cost-effective solution with reliable performance.');
    }
    
    if (score.details.leadTime >= 8) {
        reasons.push('Can be delivered within your timeline.');
    }
    
    return reasons.join(' ');
}

// ========================================
// Display Functions
// ========================================

function showEmptyState() {
    elements.emptyState.style.display = 'flex';
    elements.loadingState.style.display = 'none';
    elements.recommendationsContainer.style.display = 'none';
}

function showLoadingState() {
    elements.emptyState.style.display = 'none';
    elements.loadingState.style.display = 'flex';
    elements.recommendationsContainer.style.display = 'none';
}

function displayRecommendations(recommendations) {
    elements.emptyState.style.display = 'none';
    elements.loadingState.style.display = 'none';
    elements.recommendationsContainer.style.display = 'block';
    
    // Clear previous recommendations
    elements.recommendationsList.innerHTML = '';
    
    // Render each recommendation
    recommendations.forEach((equipment, index) => {
        const card = createEquipmentCard(equipment, index + 1);
        elements.recommendationsList.appendChild(card);
    });
    
    // Scroll to results
    elements.recommendationsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function createEquipmentCard(equipment, rank) {
    const card = document.createElement('div');
    card.className = 'equipment-card';
    
    card.innerHTML = `
        <div class="card-header">
            <div class="card-title-section">
                <div class="card-rank">#${rank} Recommendation</div>
                <h3 class="card-title">${equipment.name}</h3>
                <p class="card-supplier">${equipment.supplier}</p>
            </div>
            <div class="card-match-section">
                <div class="match-score">${equipment.matchScore}%</div>
                <div class="match-stars">${equipment.stars}</div>
                <div class="match-label">${equipment.matchLevel}</div>
            </div>
        </div>
        
        <div class="card-body">
            <div class="spec-item">
                <div class="spec-label">Price Range</div>
                <div class="spec-value">${equipment.price.range}</div>
            </div>
            <div class="spec-item">
                <div class="spec-label">Lead Time</div>
                <div class="spec-value">${equipment.leadTime} weeks</div>
            </div>
            <div class="spec-item">
                <div class="spec-label">Tier</div>
                <div class="spec-value">${equipment.tier.charAt(0).toUpperCase() + equipment.tier.slice(1)}</div>
            </div>
        </div>
        
        <div class="card-features">
            <div class="features-title">✨ Key Features</div>
            <div class="features-list">
                ${equipment.features.map(feature => `
                    <div class="feature-item-card">
                        <span class="feature-check">✓</span>
                        <span>${feature}</span>
                    </div>
                `).join('')}
            </div>
        </div>
        
        <div class="card-reason">
            <div class="reason-title">💡 Why We Recommend This</div>
            <div class="reason-text">${equipment.recommendationReason}</div>
        </div>
        
        <div class="card-actions">
            <button class="card-btn primary" onclick="requestQuote('${equipment.id}')">
                Request Quote
            </button>
            <button class="card-btn" onclick="viewDetails('${equipment.id}')">
                View Details
            </button>
        </div>
    `;
    
    return card;
}

// ========================================
// Action Handlers
// ========================================

function handleNextStep(action) {
    if (action === 'quote') {
        alert('Quote request form will be implemented in the next phase.\n\nYour recommendations:\n' + 
              currentRecommendations.map((e, i) => `${i+1}. ${e.name} (${e.matchScore}%)`).join('\n'));
    } else if (action === 'consult') {
        alert('Consultation scheduling will be implemented in the next phase.\n\nPlease contact: consultation@nexusglobal.asia');
    } else if (action === 'compare') {
        alert('Detailed comparison table will be implemented in the next phase.');
    }
}

function requestQuote(equipmentId) {
    const equipment = currentRecommendations.find(e => e.id === equipmentId);
    if (equipment) {
        alert(`Quote Request for: ${equipment.name}\n\nThis feature will be implemented in the next phase.\n\nFor now, please contact: sales@nexusglobal.asia`);
    }
}

function viewDetails(equipmentId) {
    const equipment = currentRecommendations.find(e => e.id === equipmentId);
    if (equipment) {
        alert(`Equipment Details: ${equipment.name}\n\nDetailed product page will be implemented in the next phase.`);
    }
}

// ========================================
// Initialize
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('NEXUS V13.0 Equipment Configurator - Initialized');
    console.log('Equipment types available:', Object.keys(EQUIPMENT_FORM_FIELDS).length);
    console.log('Total equipment in database:', Object.values(EQUIPMENT_DATABASE).flat().length);
});

