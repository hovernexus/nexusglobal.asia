/**
 * NEXUS GA4 Tracker
 * 
 * 该脚本负责初始化Google Analytics (GA4)并追踪用户在NEXUS平台上的关键行为。
 * 支持事件追踪、自定义维度和用户属性设置。
 * 
 * 使用方式：
 * 1. 在HTML页面的<head>标签中添加GA4初始化代码（见下方注释）
 * 2. 在需要追踪事件的地方调用相应的追踪函数
 * 
 * 版本: 1.0
 * 作者: NEXUS Development Team
 * 日期: 2025-10-23
 */

// ============================================================================
// GA4初始化代码（需要在HTML页面的<head>中添加）
// ============================================================================
/*
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-XXXXXXXXXX'); // 替换为您的GA4测量ID
</script>
*/

// ============================================================================
// NEXUS GA4追踪函数库
// ============================================================================

/**
 * 初始化NEXUS GA4追踪
 * 该函数应在页面加载时调用，用于设置初始的用户属性和会话信息
 */
function initNexusGA4Tracking() {
    // 检查gtag是否已加载
    if (typeof gtag === 'undefined') {
        console.warn('GA4 (gtag) not loaded. Please add GA4 initialization code to your HTML.');
        return;
    }

    // 生成或获取访客ID
    const visitorId = getOrCreateVisitorId();
    
    // 生成会话ID
    const sessionId = generateSessionId();
    
    // 设置用户属性
    gtag('set', {
        'user_id': visitorId,
        'user_properties': {
            'visitor_id': visitorId,
            'session_id': sessionId,
            'platform': 'nexus_global',
            'visit_timestamp': new Date().toISOString()
        }
    });

    console.log('NEXUS GA4 Tracking initialized. Visitor ID:', visitorId);
}

/**
 * 获取或创建访客ID
 * 使用localStorage存储访客ID，确保同一访客在多次访问时使用相同的ID
 * @returns {string} 访客ID
 */
function getOrCreateVisitorId() {
    const storageKey = 'nexus_visitor_id';
    let visitorId = localStorage.getItem(storageKey);
    
    if (!visitorId) {
        visitorId = generateUUID();
        localStorage.setItem(storageKey, visitorId);
    }
    
    return visitorId;
}

/**
 * 生成会话ID
 * 每次页面加载时生成一个新的会话ID
 * @returns {string} 会话ID
 */
function generateSessionId() {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

/**
 * 生成UUID
 * @returns {string} UUID字符串
 */
function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0,
              v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

/**
 * 追踪产品点击事件
 * 当用户点击产品列表中的某个产品时调用此函数
 * 
 * @param {string} productId - 产品ID
 * @param {string} productName - 产品名称
 * @param {string} supplierName - 供应商名称
 * @param {string} category - 产品分类（可选）
 * @param {number} price - 产品价格（可选）
 */
function trackProductClick(productId, productName, supplierName, category = null, price = null) {
    const eventData = {
        'event_category': 'engagement',
        'event_label': 'product_click',
        'item_list_id': 'product_list',
        'item_list_name': 'Product List Page',
        'items': [{
            'item_id': productId,
            'item_name': productName,
            'item_category': category || 'packaging_equipment',
            'item_brand': supplierName
        }]
    };

    // 如果有价格信息，添加到事件数据中
    if (price !== null) {
        eventData.items[0].price = price;
    }

    gtag('event', 'select_item', eventData);
    console.log(`[GA4] Product click tracked: ${productName} (${productId}) from ${supplierName}`);
}

/**
 * 追踪产品详情页浏览事件
 * 当用户访问产品详情页时调用此函数
 * 
 * @param {string} productId - 产品ID
 * @param {string} productName - 产品名称
 * @param {string} supplierName - 供应商名称
 * @param {string} category - 产品分类（可选）
 */
function trackProductDetailView(productId, productName, supplierName, category = null) {
    const eventData = {
        'event_category': 'engagement',
        'event_label': 'product_detail_view',
        'item_list_id': 'product_detail',
        'item_list_name': 'Product Detail Page',
        'items': [{
            'item_id': productId,
            'item_name': productName,
            'item_category': category || 'packaging_equipment',
            'item_brand': supplierName
        }]
    };

    gtag('event', 'view_item', eventData);
    console.log(`[GA4] Product detail view tracked: ${productName} (${productId})`);
}

/**
 * 追踪搜索事件
 * 当用户在NEXUS平台上执行搜索时调用此函数
 * 
 * @param {string} searchTerm - 搜索关键词
 * @param {number} resultCount - 搜索结果数量（可选）
 * @param {object} filters - 搜索过滤器（可选）
 */
function trackSearch(searchTerm, resultCount = null, filters = null) {
    const eventData = {
        'search_term': searchTerm,
        'event_category': 'engagement',
        'event_label': 'search'
    };

    if (resultCount !== null) {
        eventData.result_count = resultCount;
    }

    if (filters !== null) {
        eventData.filters = JSON.stringify(filters);
    }

    gtag('event', 'search', eventData);
    console.log(`[GA4] Search tracked: "${searchTerm}" (${resultCount || 'unknown'} results)`);
}

/**
 * 追踪供应商页面浏览事件
 * 当用户访问供应商详情页时调用此函数
 * 
 * @param {string} supplierId - 供应商ID
 * @param {string} supplierName - 供应商名称
 * @param {string} country - 供应商所在国家（可选）
 */
function trackSupplierPageView(supplierId, supplierName, country = null) {
    const eventData = {
        'event_category': 'engagement',
        'event_label': 'supplier_page_view',
        'item_list_id': 'supplier_page',
        'item_list_name': 'Supplier Page View',
        'items': [{
            'item_id': supplierId,
            'item_name': supplierName,
            'item_category': 'supplier'
        }]
    };

    if (country !== null) {
        eventData.items[0].item_location_id = country;
    }

    gtag('event', 'view_item_list', eventData);
    console.log(`[GA4] Supplier page view tracked: ${supplierName} (${supplierId})`);
}

/**
 * 追踪供应商点击事件
 * 当用户点击供应商链接或按钮时调用此函数
 * 
 * @param {string} supplierId - 供应商ID
 * @param {string} supplierName - 供应商名称
 * @param {string} actionType - 操作类型（如 'view_profile', 'request_quote', 'contact'）
 */
function trackSupplierClick(supplierId, supplierName, actionType = 'view_profile') {
    const eventData = {
        'event_category': 'engagement',
        'event_label': 'supplier_click',
        'action_type': actionType,
        'supplier_id': supplierId,
        'supplier_name': supplierName
    };

    gtag('event', 'select_item', eventData);
    console.log(`[GA4] Supplier click tracked: ${supplierName} (${supplierId}) - Action: ${actionType}`);
}

/**
 * 追踪AI顾问使用事件
 * 当用户使用AI智能顾问系统时调用此函数
 * 
 * @param {string} moduleId - AI模块ID（如 'module_1', 'module_2'等）
 * @param {string} moduleName - AI模块名称
 * @param {string} actionType - 操作类型（如 'start', 'complete', 'submit'）
 */
function trackAIConsultantUsage(moduleId, moduleName, actionType = 'start') {
    const eventData = {
        'event_category': 'engagement',
        'event_label': 'ai_consultant_usage',
        'module_id': moduleId,
        'module_name': moduleName,
        'action_type': actionType
    };

    gtag('event', 'view_item', eventData);
    console.log(`[GA4] AI Consultant usage tracked: ${moduleName} (${moduleId}) - Action: ${actionType}`);
}

/**
 * 追踪设备配置器使用事件
 * 当用户使用AI设备配置器时调用此函数
 * 
 * @param {string} actionType - 操作类型（如 'start', 'configure', 'get_recommendation', 'request_quote'）
 * @param {object} configData - 配置数据（可选）
 */
function trackEquipmentConfigurator(actionType = 'start', configData = null) {
    const eventData = {
        'event_category': 'engagement',
        'event_label': 'equipment_configurator',
        'action_type': actionType
    };

    if (configData !== null) {
        eventData.config_data = JSON.stringify(configData);
    }

    gtag('event', 'view_item', eventData);
    console.log(`[GA4] Equipment Configurator usage tracked - Action: ${actionType}`);
}

/**
 * 追踪报价请求事件
 * 当用户请求产品报价时调用此函数
 * 
 * @param {string} productId - 产品ID
 * @param {string} productName - 产品名称
 * @param {string} supplierId - 供应商ID
 * @param {string} supplierName - 供应商名称
 */
function trackQuoteRequest(productId, productName, supplierId, supplierName) {
    const eventData = {
        'event_category': 'conversion',
        'event_label': 'quote_request',
        'product_id': productId,
        'product_name': productName,
        'supplier_id': supplierId,
        'supplier_name': supplierName,
        'timestamp': new Date().toISOString()
    };

    gtag('event', 'add_to_cart', eventData); // 使用add_to_cart作为转化事件
    console.log(`[GA4] Quote request tracked: ${productName} from ${supplierName}`);
}

/**
 * 追踪联系供应商事件
 * 当用户点击"联系供应商"按钮时调用此函数
 * 
 * @param {string} supplierId - 供应商ID
 * @param {string} supplierName - 供应商名称
 * @param {string} contactMethod - 联系方式（如 'email', 'phone', 'form'）
 */
function trackContactSupplier(supplierId, supplierName, contactMethod = 'form') {
    const eventData = {
        'event_category': 'conversion',
        'event_label': 'contact_supplier',
        'supplier_id': supplierId,
        'supplier_name': supplierName,
        'contact_method': contactMethod,
        'timestamp': new Date().toISOString()
    };

    gtag('event', 'begin_checkout', eventData); // 使用begin_checkout作为转化事件
    console.log(`[GA4] Contact supplier tracked: ${supplierName} - Method: ${contactMethod}`);
}

/**
 * 追踪页面分类浏览事件
 * 当用户访问产品分类页面时调用此函数
 * 
 * @param {string} categoryId - 分类ID
 * @param {string} categoryName - 分类名称
 */
function trackCategoryView(categoryId, categoryName) {
    const eventData = {
        'event_category': 'engagement',
        'event_label': 'category_view',
        'category_id': categoryId,
        'category_name': categoryName
    };

    gtag('event', 'view_item_list', eventData);
    console.log(`[GA4] Category view tracked: ${categoryName} (${categoryId})`);
}

/**
 * 设置自定义用户属性
 * 用于追踪用户的自定义信息
 * 
 * @param {object} properties - 自定义属性对象，例如 { 'user_type': 'buyer', 'country': 'Mexico' }
 */
function setCustomUserProperties(properties) {
    if (typeof gtag === 'undefined') {
        console.warn('GA4 (gtag) not loaded.');
        return;
    }

    gtag('set', { 'user_properties': properties });
    console.log('[GA4] Custom user properties set:', properties);
}

/**
 * 追踪自定义事件
 * 用于追踪不在上述预定义函数中的自定义事件
 * 
 * @param {string} eventName - 事件名称
 * @param {object} eventData - 事件数据
 */
function trackCustomEvent(eventName, eventData = {}) {
    if (typeof gtag === 'undefined') {
        console.warn('GA4 (gtag) not loaded.');
        return;
    }

    gtag('event', eventName, eventData);
    console.log(`[GA4] Custom event tracked: ${eventName}`, eventData);
}

/**
 * 获取当前访客ID
 * @returns {string} 访客ID
 */
function getVisitorId() {
    return localStorage.getItem('nexus_visitor_id') || 'unknown';
}

/**
 * 获取访客信息（包括ID、会话等）
 * @returns {object} 访客信息对象
 */
function getVisitorInfo() {
    return {
        visitor_id: getVisitorId(),
        user_agent: navigator.userAgent,
        language: navigator.language,
        timestamp: new Date().toISOString()
    };
}

// ============================================================================
// 页面加载时自动初始化
// ============================================================================

// 当DOM加载完成时初始化GA4追踪
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNexusGA4Tracking);
} else {
    initNexusGA4Tracking();
}

// 导出函数供外部使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initNexusGA4Tracking,
        getOrCreateVisitorId,
        generateSessionId,
        generateUUID,
        trackProductClick,
        trackProductDetailView,
        trackSearch,
        trackSupplierPageView,
        trackSupplierClick,
        trackAIConsultantUsage,
        trackEquipmentConfigurator,
        trackQuoteRequest,
        trackContactSupplier,
        trackCategoryView,
        setCustomUserProperties,
        trackCustomEvent,
        getVisitorId,
        getVisitorInfo
    };
}

