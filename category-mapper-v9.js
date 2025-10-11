/**
 * NEXUS V9.0 - Product Category Mapper
 * Maps old category system to new V9.0 7-category system
 */

// Category mapping configuration
const CATEGORY_MAPPING_V9 = {
    // Old category ID -> New main category ID
    'digital_printer': {
        mainCategory: 'digital_printing_system',
        mainCategoryName: 'Digital Printing System',
        mainCategoryNameCn: '数码印刷系统',
        subCategoryMapping: {
            // Determine sub-category based on product name or features
            'default': 'single_pass'
        }
    },
    'die_cutting': {
        mainCategory: 'die_cutting_machine',
        mainCategoryName: 'Die-Cutting Machine',
        mainCategoryNameCn: '独立裁切设备',
        subCategoryMapping: {
            'default': 'auto_flatbed'
        }
    },
    'feeder_palletizer': {
        mainCategory: 'automation_unit',
        mainCategoryName: 'Automation Unit',
        mainCategoryNameCn: '产线自动化单元',
        subCategoryMapping: {
            'default': 'pre_feeder'
        }
    },
    'folder_gluer': {
        mainCategory: 'finishing_equipment',
        mainCategoryName: 'Finishing Equipment',
        mainCategoryNameCn: '后道成型设备',
        subCategoryMapping: {
            'default': 'folder_gluer'
        }
    },
    'inspection': {
        mainCategory: 'automation_unit',
        mainCategoryName: 'Automation Unit',
        mainCategoryNameCn: '产线自动化单元',
        subCategoryMapping: {
            'default': 'inspection'
        }
    },
    'ffg_inline': {
        mainCategory: 'flexo_inline',
        mainCategoryName: 'Flexo Inline',
        mainCategoryNameCn: '柔印联动生产线',
        subCategoryMapping: {
            'default': 'ffg_inline'
        }
    },
    'laminator': {
        mainCategory: 'surface_treatment',
        mainCategoryName: 'Surface Treatment',
        mainCategoryNameCn: '表面处理设备',
        subCategoryMapping: {
            'default': 'laminator_paper'
        }
    },
    'pulp_molding': {
        mainCategory: 'eco_friendly_packaging',
        mainCategoryName: 'Eco-friendly Packaging',
        mainCategoryNameCn: '环保包装设备',
        subCategoryMapping: {
            'default': 'pulp_molding_auto'
        }
    }
};

// Sub-category names mapping
const SUB_CATEGORY_NAMES = {
    'single_pass': {
        name: 'Single Pass High-Speed Series',
        nameCn: 'Single Pass 高速系列'
    },
    'scanning': {
        name: 'Scanning Series',
        nameCn: 'Scanning 扫描式系列'
    },
    'ffg_inline': {
        name: 'FFG Inline',
        nameCn: '印刷开槽裁切粘箱联动线 (FFG)'
    },
    'auto_flatbed': {
        name: 'Full Auto Flatbed Die-Cutter',
        nameCn: '全自动平压平裁切机'
    },
    'semi_auto_flatbed': {
        name: 'Semi Auto Flatbed Die-Cutter',
        nameCn: '半自动平压平裁切机'
    },
    'rotary_die_cutter': {
        name: 'Rotary Die-Cutter',
        nameCn: '圆压圆裁切机'
    },
    'laser_digital': {
        name: 'Laser/Digital Die-Cutter',
        nameCn: '激光/数码裁切机'
    },
    'folder_gluer': {
        name: 'Folder Gluer',
        nameCn: '粘箱/钉箱/糊钉一体机'
    },
    'pre_feeder': {
        name: 'Pre-feeder',
        nameCn: '前端上料设备'
    },
    'palletizer': {
        name: 'Palletizer',
        nameCn: '后端码垛/清废设备'
    },
    'inspection': {
        name: 'Inspection Machine',
        nameCn: '印刷检品机'
    },
    'laminator_paper': {
        name: 'Paper Laminator',
        nameCn: '裱纸机/裱卡机'
    },
    'pulp_molding_auto': {
        name: 'Full Auto Pulp Molding',
        nameCn: '全自动滚转式纸浆模塑设备'
    }
};

/**
 * Map old category to new V9.0 category structure
 * @param {Object} product - Product object with old category field
 * @returns {Object} Product with V9.0 category fields added
 */
function mapToV9Category(product) {
    if (!product || !product.category) {
        console.warn('Product missing category field:', product);
        return product;
    }

    const oldCategory = product.category;
    const mapping = CATEGORY_MAPPING_V9[oldCategory];

    if (!mapping) {
        console.warn('No mapping found for category:', oldCategory);
        return product;
    }

    // Add V9.0 category fields
    product.mainCategory = mapping.mainCategory;
    product.mainCategoryName = mapping.mainCategoryName;
    product.mainCategoryNameCn = mapping.mainCategoryNameCn;

    // Determine sub-category (can be enhanced with more logic)
    const subCategory = determineSubCategory(product, mapping);
    product.subCategory = subCategory;

    const subCategoryInfo = SUB_CATEGORY_NAMES[subCategory];
    if (subCategoryInfo) {
        product.subCategoryName = subCategoryInfo.name;
        product.subCategoryNameCn = subCategoryInfo.nameCn;
    }

    return product;
}

/**
 * Determine sub-category based on product characteristics
 * @param {Object} product - Product object
 * @param {Object} mapping - Category mapping configuration
 * @returns {string} Sub-category ID
 */
function determineSubCategory(product, mapping) {
    const productName = (product.name || '').toLowerCase();
    const productId = (product.id || '').toLowerCase();

    // Digital Printing System
    if (mapping.mainCategory === 'digital_printing_system') {
        if (productName.includes('ultra') || productName.includes('mcb') || 
            productName.includes('scanning') || productName.includes('扫描')) {
            return 'scanning';
        }
        return 'single_pass';
    }

    // Die-Cutting Machine
    if (mapping.mainCategory === 'die_cutting_machine') {
        if (productName.includes('laser') || productName.includes('激光')) {
            return 'laser_digital';
        }
        if (productName.includes('rotary') || productName.includes('圆压圆') ||
            productName.includes('mk1300')) {
            return 'rotary_die_cutter';
        }
        if (productName.includes('semi') || productName.includes('半自动') ||
            productName.includes('pyq') || productName.includes('mk21060')) {
            return 'semi_auto_flatbed';
        }
        return 'auto_flatbed';
    }

    // Automation Unit
    if (mapping.mainCategory === 'automation_unit') {
        if (productName.includes('palletizer') || productName.includes('码垛') ||
            productName.includes('md-')) {
            return 'palletizer';
        }
        if (productName.includes('inspection') || productName.includes('检品') ||
            productName.includes('mk6500') || productName.includes('mk420')) {
            return 'inspection';
        }
        if (productName.includes('robotic') || productName.includes('机械臂') ||
            productName.includes('jxb')) {
            return 'pre_feeder_robotic';
        }
        return 'pre_feeder';
    }

    // Use default sub-category
    return mapping.subCategoryMapping.default;
}

/**
 * Map all products in a product list to V9.0 categories
 * @param {Array} products - Array of product objects
 * @returns {Array} Products with V9.0 category fields
 */
function mapProductsToV9(products) {
    if (!Array.isArray(products)) {
        console.error('mapProductsToV9: products must be an array');
        return [];
    }

    return products.map(product => mapToV9Category(product));
}

/**
 * Filter products by V9.0 main category
 * @param {Array} products - Array of products (with V9.0 fields)
 * @param {string} mainCategory - Main category ID
 * @returns {Array} Filtered products
 */
function filterByMainCategory(products, mainCategory) {
    return products.filter(p => p.mainCategory === mainCategory);
}

/**
 * Filter products by V9.0 sub-category
 * @param {Array} products - Array of products (with V9.0 fields)
 * @param {string} subCategory - Sub-category ID
 * @returns {Array} Filtered products
 */
function filterBySubCategory(products, subCategory) {
    return products.filter(p => p.subCategory === subCategory);
}

/**
 * Get all products in a main category, grouped by sub-category
 * @param {Array} products - Array of products (with V9.0 fields)
 * @param {string} mainCategory - Main category ID
 * @returns {Object} Products grouped by sub-category
 */
function groupBySubCategory(products, mainCategory) {
    const filtered = filterByMainCategory(products, mainCategory);
    const grouped = {};

    filtered.forEach(product => {
        const subCat = product.subCategory || 'uncategorized';
        if (!grouped[subCat]) {
            grouped[subCat] = [];
        }
        grouped[subCat].push(product);
    });

    return grouped;
}

// Export functions for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        CATEGORY_MAPPING_V9,
        SUB_CATEGORY_NAMES,
        mapToV9Category,
        mapProductsToV9,
        filterByMainCategory,
        filterBySubCategory,
        groupBySubCategory
    };
}

