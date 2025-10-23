// ODJ Products Data for NEXUS V13.3
// Updated with correct product names and detail URLs from nexusglobal.asia

const ODJ_PRODUCTS = {
  "feeding-palletizing": [
    {
      id: "jxb",
      name: "JXB Robotic Arm Type Automatic Pre-feeder",
      supplier: "Foshan ODJ Intelligent Technology Co., Ltd.",
      priceRange: "$150,000 - $200,000",
      price: {
        range: "$150,000 - $200,000",
        min: 150000,
        max: 200000
      },
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
      specs: {
        automation: "robotic",
        maxLoad: 350,
        integration: "end-of-line"
      }
    },
    {
      id: "qsl2",
      name: "QSL2 Slope Type Automatic Pre-feeder",
      supplier: "Foshan ODJ Intelligent Technology Co., Ltd.",
      priceRange: "$80,000 - $120,000",
      price: {
        range: "$80,000 - $120,000",
        min: 80000,
        max: 120000
      },
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
      specs: {
        automation: "full",
        maxLoad: 280,
        integration: "inline"
      }
    },
    {
      id: "qsl3",
      name: "QSL3 Baffle Type Automatic Pre-feeder",
      supplier: "Foshan ODJ Intelligent Technology Co., Ltd.",
      priceRange: "$85,000 - $125,000",
      price: {
        range: "$85,000 - $125,000",
        min: 85000,
        max: 125000
      },
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
      specs: {
        automation: "full",
        maxLoad: 280,
        integration: "inline"
      }
    },
    {
      id: "qsl4",
      name: "QSL4/QSM Basket (Lifting) Type Universal Pre-feeder",
      supplier: "Foshan ODJ Intelligent Technology Co., Ltd.",
      priceRange: "$90,000 - $130,000",
      price: {
        range: "$90,000 - $130,000",
        min: 90000,
        max: 130000
      },
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
      specs: {
        automation: "full",
        maxLoad: 280,
        integration: "inline"
      }
    },
    {
      id: "qxy3",
      name: "QXY3 Baffle Type Automatic Pre-feeder for Bottom Print",
      supplier: "Foshan ODJ Intelligent Technology Co., Ltd.",
      priceRange: "$85,000 - $125,000",
      price: {
        range: "$85,000 - $125,000",
        min: 85000,
        max: 125000
      },
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
      specs: {
        automation: "full",
        maxLoad: 280,
        integration: "inline"
      }
    },
    {
      id: "bys",
      name: "BYS Semi-Automatic Pre-feeder",
      supplier: "Foshan ODJ Intelligent Technology Co., Ltd.",
      priceRange: "$40,000 - $60,000",
      price: {
        range: "$40,000 - $60,000",
        min: 40000,
        max: 60000
      },
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
      specs: {
        automation: "semi",
        maxLoad: 180,
        integration: "standalone"
      }
    },
    {
      id: "fp1650",
      name: "FP-1650 Automatic Bundle Breaker System",
      supplier: "Foshan ODJ Intelligent Technology Co., Ltd.",
      priceRange: "$70,000 - $100,000",
      price: {
        range: "$70,000 - $100,000",
        min: 70000,
        max: 100000
      },
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
      specs: {
        automation: "full",
        maxLoad: 280,
        integration: "inline"
      }
    },
    {
      id: "md350",
      name: "MD-350 3D Vision AI Intelligent Robotic Palletizing System",
      supplier: "Foshan ODJ Intelligent Technology Co., Ltd.",
      priceRange: "$180,000 - $250,000",
      price: {
        range: "$180,000 - $250,000",
        min: 180000,
        max: 250000
      },
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
      specs: {
        automation: "robotic",
        maxLoad: 350,
        integration: "end-of-line"
      }
    }
  ]
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ODJ_PRODUCTS;
}

