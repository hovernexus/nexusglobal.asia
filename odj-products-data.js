// ODJ (Foshan ODJ Intelligent Technology Co., Ltd.) Products Data
// 8 Feeding and Palletizing Machines

const ODJ_PRODUCTS = [
    {
        id: 'odj-jxb-001',
        name: 'JXB Robotic Arm Type Automatic Pre-Feeder',
        supplier: 'Foshan ODJ Intelligent Technology Co., Ltd.',
        category: 'Feeding/Palletizing Machines',
        tier: 'flagship',
        type: 'pre-feeder',
        specs: {
            automation: 'robotic',
            maxLoad: 300,
            integration: 'end-of-line',
            technology: 'robotic-arm',
            vision: '3d-vision'
        },
        capacity: {
            stacksPerHour: 50,
            suitableFor: 'high-volume-operations'
        },
        price: {
            range: '$150,000 - $200,000',
            min: 150000,
            max: 200000
        },
        features: [
            'Robotic arm technology',
            '3D vision system',
            'Automatic pre-feeding',
            'High precision positioning',
            'Flexible integration'
        ],
        leadTime: 12,
        image: '/images/odj/jxb-robotic-arm-prefeeder.jpg',
        detailUrl: 'product-detail.html?model=jxb'
    },
    {
        id: 'odj-qb2-001',
        name: 'QB2 Slope Type Automatic Pre-feeder',
        supplier: 'Foshan ODJ Intelligent Technology Co., Ltd.',
        category: 'Feeding/Palletizing Machines',
        tier: 'professional',
        type: 'pre-feeder',
        specs: {
            automation: 'full',
            maxLoad: 250,
            integration: 'inline',
            technology: 'slope-type',
            vision: 'standard'
        },
        capacity: {
            stacksPerHour: 40,
            suitableFor: 'medium-high-volume'
        },
        price: {
            range: '$80,000 - $120,000',
            min: 80000,
            max: 120000
        },
        features: [
            'Slope-type feeding mechanism',
            'Automatic pre-feeding',
            'Reliable performance',
            'Easy maintenance',
            'Cost-effective solution'
        ],
        leadTime: 10,
        image: '/images/odj/qb2-slope-prefeeder.jpg',
        detailUrl: 'product-detail.html?model=qb2'
    },
    {
        id: 'odj-qb3-001',
        name: 'QB3 Raffle Type Automatic Pre-feeder',
        supplier: 'Foshan ODJ Intelligent Technology Co., Ltd.',
        category: 'Feeding/Palletizing Machines',
        tier: 'professional',
        type: 'pre-feeder',
        specs: {
            automation: 'full',
            maxLoad: 200,
            integration: 'standalone',
            technology: 'raffle-type',
            vision: 'standard'
        },
        capacity: {
            stacksPerHour: 35,
            suitableFor: 'medium-volume'
        },
        price: {
            range: '$70,000 - $100,000',
            min: 70000,
            max: 100000
        },
        features: [
            'Raffle-type feeding mechanism',
            'Automatic operation',
            'Compact design',
            'Stable performance',
            'Easy to operate'
        ],
        leadTime: 10,
        image: '/images/odj/qb3-raffle-prefeeder.jpg',
        detailUrl: 'product-detail.html?model=qb3'
    },
    {
        id: 'odj-qsl4-001',
        name: 'QSL4/QSM Basket (Lifting) Type Automatic Pre-feeder',
        supplier: 'Foshan ODJ Intelligent Technology Co., Ltd.',
        category: 'Feeding/Palletizing Machines',
        tier: 'professional',
        type: 'pre-feeder',
        specs: {
            automation: 'full',
            maxLoad: 280,
            integration: 'inline',
            technology: 'basket-lifting',
            vision: 'standard'
        },
        capacity: {
            stacksPerHour: 45,
            suitableFor: 'medium-high-volume'
        },
        price: {
            range: '$90,000 - $130,000',
            min: 90000,
            max: 130000
        },
        features: [
            'Basket lifting mechanism',
            'Automatic feeding',
            'High efficiency',
            'Smooth operation',
            'Versatile application'
        ],
        leadTime: 11,
        image: '/images/odj/qsl4-qsm-basket-prefeeder.jpg',
        detailUrl: 'product-detail.html?model=qsl4'
    },
    {
        id: 'odj-rys-001',
        name: 'RYS Semi-Automatic Pre-feeder',
        supplier: 'Foshan ODJ Intelligent Technology Co., Ltd.',
        category: 'Feeding/Palletizing Machines',
        tier: 'entry',
        type: 'pre-feeder',
        specs: {
            automation: 'semi',
            maxLoad: 150,
            integration: 'standalone',
            technology: 'manual-assisted',
            vision: 'none'
        },
        capacity: {
            stacksPerHour: 25,
            suitableFor: 'small-medium-volume'
        },
        price: {
            range: '$30,000 - $50,000',
            min: 30000,
            max: 50000
        },
        features: [
            'Semi-automatic operation',
            'Manual assistance',
            'Cost-effective',
            'Simple structure',
            'Easy maintenance'
        ],
        leadTime: 8,
        image: '/images/odj/rys-semi-auto-prefeeder.jpg',
        detailUrl: 'product-detail.html?model=ryf'
    },
    {
        id: 'odj-qy3-001',
        name: 'QY3 Baffle Type Automatic Pre-feeder',
        supplier: 'Foshan ODJ Intelligent Technology Co., Ltd.',
        category: 'Feeding/Palletizing Machines',
        tier: 'professional',
        type: 'pre-feeder',
        specs: {
            automation: 'full',
            maxLoad: 220,
            integration: 'inline',
            technology: 'baffle-type',
            vision: 'standard'
        },
        capacity: {
            stacksPerHour: 38,
            suitableFor: 'medium-volume'
        },
        price: {
            range: '$75,000 - $110,000',
            min: 75000,
            max: 110000
        },
        features: [
            'Baffle-type mechanism',
            'Automatic feeding',
            'Precise positioning',
            'Reliable operation',
            'Good value'
        ],
        leadTime: 10,
        image: '/images/odj/qy3-baffle-prefeeder.jpg',
        detailUrl: 'product-detail.html?model=qy3'
    },
    {
        id: 'odj-qvy3-001',
        name: 'QVY3 Baffle Type Automatic Pre-feeder',
        supplier: 'Foshan ODJ Intelligent Technology Co., Ltd.',
        category: 'Feeding/Palletizing Machines',
        tier: 'professional',
        type: 'pre-feeder',
        specs: {
            automation: 'full',
            maxLoad: 240,
            integration: 'inline',
            technology: 'baffle-type-advanced',
            vision: 'standard'
        },
        capacity: {
            stacksPerHour: 42,
            suitableFor: 'medium-high-volume'
        },
        price: {
            range: '$85,000 - $125,000',
            min: 85000,
            max: 125000
        },
        features: [
            'Advanced baffle mechanism',
            'Automatic operation',
            'High precision',
            'Enhanced stability',
            'Improved efficiency'
        ],
        leadTime: 11,
        image: '/images/odj/qvy3-baffle-advanced-prefeeder.jpg',
        detailUrl: 'product-detail.html?model=qvy3'
    },
    {
        id: 'odj-byf-001',
        name: 'BYF Semi-Automatic Pre-feeder',
        supplier: 'Foshan ODJ Intelligent Technology Co., Ltd.',
        category: 'Feeding/Palletizing Machines',
        tier: 'entry',
        type: 'pre-feeder',
        specs: {
            automation: 'semi',
            maxLoad: 180,
            integration: 'standalone',
            technology: 'manual-assisted',
            vision: 'none'
        },
        capacity: {
            stacksPerHour: 28,
            suitableFor: 'small-medium-volume'
        },
        price: {
            range: '$35,000 - $55,000',
            min: 35000,
            max: 55000
        },
        features: [
            'Semi-automatic feeding',
            'Manual assistance required',
            'Budget-friendly',
            'Compact footprint',
            'Low maintenance'
        ],
        leadTime: 8,
        image: '/images/odj/byf-semi-auto-prefeeder.jpg',
        detailUrl: 'product-detail.html?model=byf'
    }
];

// Export for use in configurator
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ODJ_PRODUCTS };
}

