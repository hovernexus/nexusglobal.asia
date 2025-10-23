// ODJ Products Data for NEXUS V13.3
// Updated with correct product names and detail URLs from nexusglobal.asia

const ODJ_PRODUCTS = {
  "feeding-palletizing": [
    {
      id: "jxb",
      name: "JXB Robotic Arm Type Automatic Pre-feeder",
      supplier: "Foshan ODJ Intelligent Technology Co., Ltd.",
      priceRange: "$150,000 - $200,000",
      leadTime: "12 weeks",
      tier: "flagship",
      category: "上料机 (Pre-feeder)",
      detailUrl: "product-detail.html?id=pfjxb",
      features: [
        "Robotic arm technology",
        "3D vision system",
        "Automatic pre-feeding",
        "High precision positioning",
        "Flexible integration",
        "Up to 500 sheets/min",
        "100% damage-free handling"
      ],
      specifications: {
        automationLevel: "Robotic System (AI-powered, 3D vision)",
        maxLoad: "Heavy Duty (>350kg per stack)",
        integration: "End-of-Line Solution",
        budget: "Over $150,000"
      }
    },
    {
      id: "qsl2",
      name: "QSL2 Slope Type Automatic Pre-feeder",
      supplier: "Foshan ODJ Intelligent Technology Co., Ltd.",
      priceRange: "$80,000 - $120,000",
      leadTime: "10 weeks",
      tier: "professional",
      category: "上料机 (Pre-feeder)",
      detailUrl: "product-detail.html?id=pfqsl2",
      features: [
        "Slope-type feeding mechanism",
        "Automatic pre-feeding",
        "Reliable performance",
        "Easy maintenance",
        "Cost-effective solution",
        "Advanced breaking unit",
        "Seamless integration with die-cutting machines"
      ],
      specifications: {
        automationLevel: "Fully Automatic",
        maxLoad: "Medium Duty (200-350kg per stack)",
        integration: "Inline Integration",
        budget: "$80,000 - $150,000"
      }
    },
    {
      id: "qsl3",
      name: "QSL3 Baffle Type Automatic Pre-feeder",
      supplier: "Foshan ODJ Intelligent Technology Co., Ltd.",
      priceRange: "$85,000 - $125,000",
      leadTime: "11 weeks",
      tier: "professional",
      category: "上料机 (Pre-feeder)",
      detailUrl: "product-detail.html?id=pfqsl3",
      features: [
        "Baffle-type mechanism",
        "Automatic operation",
        "High precision",
        "Enhanced stability",
        "Improved efficiency",
        "Proven reliability",
        "Workhorse of production line"
      ],
      specifications: {
        automationLevel: "Fully Automatic",
        maxLoad: "Medium Duty (200-350kg per stack)",
        integration: "Inline Integration",
        budget: "$80,000 - $150,000"
      }
    },
    {
      id: "qsl4",
      name: "QSL4/QSM Basket (Lifting) Type Universal Pre-feeder",
      supplier: "Foshan ODJ Intelligent Technology Co., Ltd.",
      priceRange: "$90,000 - $130,000",
      leadTime: "11 weeks",
      tier: "professional",
      category: "上料机 (Pre-feeder)",
      detailUrl: "product-detail.html?id=pfqsl4",
      features: [
        "Basket (lifting) type mechanism",
        "Universal compatibility",
        "Versatile operation",
        "Excellent flexibility",
        "Reliable performance",
        "Suitable for various board types"
      ],
      specifications: {
        automationLevel: "Fully Automatic",
        maxLoad: "Medium Duty (200-350kg per stack)",
        integration: "Inline Integration",
        budget: "$80,000 - $150,000"
      }
    },
    {
      id: "qxy3",
      name: "QXY3 Baffle Type Automatic Pre-feeder for Bottom Print",
      supplier: "Foshan ODJ Intelligent Technology Co., Ltd.",
      priceRange: "$85,000 - $125,000",
      leadTime: "11 weeks",
      tier: "professional",
      category: "上料机 (Pre-feeder)",
      detailUrl: "product-detail.html?id=pfqxy3",
      features: [
        "Baffle-type mechanism",
        "Automatic operation",
        "Bottom print specialized",
        "Precise handling",
        "High-quality printing support",
        "Enhanced positioning"
      ],
      specifications: {
        automationLevel: "Fully Automatic",
        maxLoad: "Medium Duty (200-350kg per stack)",
        integration: "Inline Integration",
        budget: "$80,000 - $150,000"
      }
    },
    {
      id: "bys",
      name: "BYS Semi-Automatic Pre-feeder",
      supplier: "Foshan ODJ Intelligent Technology Co., Ltd.",
      priceRange: "$40,000 - $60,000",
      leadTime: "8 weeks",
      tier: "entry",
      category: "上料机 (Pre-feeder)",
      detailUrl: "product-detail.html?id=pfbys",
      features: [
        "Semi-automatic operation",
        "Cost-effective solution",
        "Manual flexibility",
        "Automated efficiency",
        "Easy operation",
        "Low initial investment",
        "Ideal for small to medium production"
      ],
      specifications: {
        automationLevel: "Semi-Automatic",
        maxLoad: "Light Duty (<200kg per stack)",
        integration: "Standalone Unit",
        budget: "Under $80,000"
      }
    },
    {
      id: "fp1650",
      name: "FP-1650 Automatic Bundle Breaker System",
      supplier: "Foshan ODJ Intelligent Technology Co., Ltd.",
      priceRange: "$70,000 - $100,000",
      leadTime: "10 weeks",
      tier: "professional",
      category: "分片机 (Bundle Breaker)",
      detailUrl: "product-detail.html?id=pffp1650",
      features: [
        "Automatic bundle breaking",
        "Efficient separation",
        "Streamlined feeding process",
        "Improved production efficiency",
        "Reliable operation",
        "Easy integration"
      ],
      specifications: {
        automationLevel: "Fully Automatic",
        maxLoad: "Medium Duty (200-350kg per stack)",
        integration: "Inline Integration",
        budget: "$80,000 - $150,000"
      }
    },
    {
      id: "md350",
      name: "MD-350 3D Vision AI Intelligent Robotic Palletizing System",
      supplier: "Foshan ODJ Intelligent Technology Co., Ltd.",
      priceRange: "$180,000 - $250,000",
      leadTime: "14 weeks",
      tier: "flagship",
      category: "码垛机 (Palletizer)",
      detailUrl: "product-detail.html?id=pfmd350",
      features: [
        "3D vision AI technology",
        "Intelligent robotic system",
        "Smart stacking algorithms",
        "Real-time quality inspection",
        "Seamless production line integration",
        "Advanced automation"
      ],
      specifications: {
        automationLevel: "Robotic System (AI-powered, 3D vision)",
        maxLoad: "Heavy Duty (>350kg per stack)",
        integration: "End-of-Line Solution",
        budget: "Over $150,000"
      }
    }
  ]
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ODJ_PRODUCTS;
}

