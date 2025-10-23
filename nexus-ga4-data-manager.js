/**
 * NEXUS GA4 Data Manager
 * 
 * 该脚本负责管理GA4数据的本地存储、缓存、聚合和处理。
 * 提供统一的数据访问接口，支持多种数据查询和聚合操作。
 * 
 * 使用方式：
 * 1. 初始化数据管理器：const manager = new GA4DataManager();
 * 2. 设置GA4属性信息：manager.setPropertyInfo(propertyId, measurementId);
 * 3. 获取数据：manager.getVisitorData(startDate, endDate);
 * 4. 处理和聚合数据：manager.aggregateData();
 * 
 * 版本: 1.0
 * 作者: NEXUS Development Team
 * 日期: 2025-10-23
 */

class GA4DataManager {
    /**
     * 构造函数
     */
    constructor() {
        this.storagePrefix = 'nexus_ga4_';
        this.cacheExpiry = 3600000; // 1小时缓存过期时间（毫秒）
        
        // 数据存储结构
        this.data = {
            visitors: [],
            events: [],
            aggregations: {},
            metadata: {
                lastUpdated: null,
                propertyId: null,
                measurementId: null
            }
        };
        
        // 初始化
        this.loadFromStorage();
    }

    // ========================================================================
    // 数据存储和加载
    // ========================================================================

    /**
     * 从localStorage加载数据
     */
    loadFromStorage() {
        try {
            const stored = localStorage.getItem(this.storagePrefix + 'data');
            if (stored) {
                this.data = JSON.parse(stored);
                console.log('[GA4DataManager] Data loaded from storage');
            }
        } catch (error) {
            console.error('[GA4DataManager] Error loading data from storage:', error);
        }
    }

    /**
     * 保存数据到localStorage
     */
    saveToStorage() {
        try {
            localStorage.setItem(this.storagePrefix + 'data', JSON.stringify(this.data));
            console.log('[GA4DataManager] Data saved to storage');
        } catch (error) {
            console.error('[GA4DataManager] Error saving data to storage:', error);
        }
    }

    /**
     * 清除所有本地数据
     */
    clearAllData() {
        this.data = {
            visitors: [],
            events: [],
            aggregations: {},
            metadata: {
                lastUpdated: null,
                propertyId: null,
                measurementId: null
            }
        };
        localStorage.removeItem(this.storagePrefix + 'data');
        console.log('[GA4DataManager] All data cleared');
    }

    /**
     * 检查缓存是否过期
     * 
     * @returns {boolean} 如果缓存已过期返回true
     */
    isCacheExpired() {
        if (!this.data.metadata.lastUpdated) {
            return true;
        }
        
        const now = Date.now();
        const lastUpdated = new Date(this.data.metadata.lastUpdated).getTime();
        return (now - lastUpdated) > this.cacheExpiry;
    }

    // ========================================================================
    // 属性信息管理
    // ========================================================================

    /**
     * 设置GA4属性信息
     * 
     * @param {string} propertyId - GA4属性ID
     * @param {string} measurementId - GA4测量ID
     */
    setPropertyInfo(propertyId, measurementId) {
        this.data.metadata.propertyId = propertyId;
        this.data.metadata.measurementId = measurementId;
        this.saveToStorage();
        console.log('[GA4DataManager] Property info set:', { propertyId, measurementId });
    }

    /**
     * 获取GA4属性信息
     * 
     * @returns {object} 包含propertyId和measurementId的对象
     */
    getPropertyInfo() {
        return {
            propertyId: this.data.metadata.propertyId,
            measurementId: this.data.metadata.measurementId
        };
    }

    // ========================================================================
    // 访客数据管理
    // ========================================================================

    /**
     * 添加访客数据
     * 
     * @param {object} visitorData - 访客数据对象
     */
    addVisitor(visitorData) {
        const visitor = {
            id: visitorData.id || this.generateId(),
            timestamp: new Date().toISOString(),
            ...visitorData
        };
        
        this.data.visitors.push(visitor);
        this.data.metadata.lastUpdated = new Date().toISOString();
        this.saveToStorage();
        
        console.log('[GA4DataManager] Visitor added:', visitor.id);
    }

    /**
     * 批量添加访客数据
     * 
     * @param {array} visitors - 访客数据数组
     */
    addVisitors(visitors) {
        visitors.forEach(visitor => {
            this.addVisitor(visitor);
        });
        console.log('[GA4DataManager] Batch visitors added:', visitors.length);
    }

    /**
     * 获取所有访客数据
     * 
     * @returns {array} 访客数据数组
     */
    getVisitors() {
        return this.data.visitors;
    }

    /**
     * 按日期范围获取访客数据
     * 
     * @param {string} startDate - 开始日期（ISO格式）
     * @param {string} endDate - 结束日期（ISO格式）
     * @returns {array} 符合条件的访客数据数组
     */
    getVisitorsByDateRange(startDate, endDate) {
        const start = new Date(startDate).getTime();
        const end = new Date(endDate).getTime();
        
        return this.data.visitors.filter(visitor => {
            const visitorTime = new Date(visitor.timestamp).getTime();
            return visitorTime >= start && visitorTime <= end;
        });
    }

    /**
     * 按国家获取访客数据
     * 
     * @param {string} country - 国家代码或名称
     * @returns {array} 符合条件的访客数据数组
     */
    getVisitorsByCountry(country) {
        return this.data.visitors.filter(visitor => visitor.country === country);
    }

    /**
     * 获取访客数统计
     * 
     * @returns {object} 包含访客总数、唯一访客数等的统计对象
     */
    getVisitorStats() {
        const uniqueVisitors = new Set(this.data.visitors.map(v => v.id)).size;
        const totalVisits = this.data.visitors.length;
        
        return {
            totalVisits: totalVisits,
            uniqueVisitors: uniqueVisitors,
            averageVisitsPerVisitor: uniqueVisitors > 0 ? (totalVisits / uniqueVisitors).toFixed(2) : 0
        };
    }

    // ========================================================================
    // 事件数据管理
    // ========================================================================

    /**
     * 添加事件数据
     * 
     * @param {object} eventData - 事件数据对象
     */
    addEvent(eventData) {
        const event = {
            id: eventData.id || this.generateId(),
            timestamp: new Date().toISOString(),
            ...eventData
        };
        
        this.data.events.push(event);
        this.data.metadata.lastUpdated = new Date().toISOString();
        this.saveToStorage();
        
        console.log('[GA4DataManager] Event added:', event.id);
    }

    /**
     * 批量添加事件数据
     * 
     * @param {array} events - 事件数据数组
     */
    addEvents(events) {
        events.forEach(event => {
            this.addEvent(event);
        });
        console.log('[GA4DataManager] Batch events added:', events.length);
    }

    /**
     * 获取所有事件数据
     * 
     * @returns {array} 事件数据数组
     */
    getEvents() {
        return this.data.events;
    }

    /**
     * 按事件类型获取事件数据
     * 
     * @param {string} eventType - 事件类型（如 'product_click', 'search'等）
     * @returns {array} 符合条件的事件数据数组
     */
    getEventsByType(eventType) {
        return this.data.events.filter(event => event.eventType === eventType);
    }

    /**
     * 按日期范围获取事件数据
     * 
     * @param {string} startDate - 开始日期（ISO格式）
     * @param {string} endDate - 结束日期（ISO格式）
     * @returns {array} 符合条件的事件数据数组
     */
    getEventsByDateRange(startDate, endDate) {
        const start = new Date(startDate).getTime();
        const end = new Date(endDate).getTime();
        
        return this.data.events.filter(event => {
            const eventTime = new Date(event.timestamp).getTime();
            return eventTime >= start && eventTime <= end;
        });
    }

    /**
     * 获取事件统计
     * 
     * @returns {object} 包含事件总数、事件类型分布等的统计对象
     */
    getEventStats() {
        const totalEvents = this.data.events.length;
        const eventTypeDistribution = {};
        
        this.data.events.forEach(event => {
            const type = event.eventType || 'unknown';
            eventTypeDistribution[type] = (eventTypeDistribution[type] || 0) + 1;
        });
        
        return {
            totalEvents: totalEvents,
            eventTypeDistribution: eventTypeDistribution
        };
    }

    /**
     * 获取特定事件类型的统计
     * 
     * @param {string} eventType - 事件类型
     * @returns {object} 事件统计对象
     */
    getEventTypeStats(eventType) {
        const events = this.getEventsByType(eventType);
        return {
            eventType: eventType,
            count: events.length,
            events: events
        };
    }

    // ========================================================================
    // 数据聚合和分析
    // ========================================================================

    /**
     * 按日期聚合访客数据
     * 
     * @param {string} startDate - 开始日期
     * @param {string} endDate - 结束日期
     * @returns {object} 按日期聚合的访客数据
     */
    aggregateVisitorsByDate(startDate, endDate) {
        const visitors = this.getVisitorsByDateRange(startDate, endDate);
        const aggregation = {};
        
        visitors.forEach(visitor => {
            const date = visitor.timestamp.split('T')[0]; // 提取日期部分
            if (!aggregation[date]) {
                aggregation[date] = {
                    date: date,
                    visitCount: 0,
                    uniqueVisitors: new Set()
                };
            }
            aggregation[date].visitCount++;
            aggregation[date].uniqueVisitors.add(visitor.id);
        });
        
        // 转换Set为数字
        Object.keys(aggregation).forEach(date => {
            aggregation[date].uniqueVisitorCount = aggregation[date].uniqueVisitors.size;
            delete aggregation[date].uniqueVisitors;
        });
        
        return aggregation;
    }

    /**
     * 按国家聚合访客数据
     * 
     * @returns {object} 按国家聚合的访客数据
     */
    aggregateVisitorsByCountry() {
        const aggregation = {};
        
        this.data.visitors.forEach(visitor => {
            const country = visitor.country || 'Unknown';
            if (!aggregation[country]) {
                aggregation[country] = {
                    country: country,
                    visitCount: 0,
                    uniqueVisitors: new Set()
                };
            }
            aggregation[country].visitCount++;
            aggregation[country].uniqueVisitors.add(visitor.id);
        });
        
        // 转换Set为数字
        Object.keys(aggregation).forEach(country => {
            aggregation[country].uniqueVisitorCount = aggregation[country].uniqueVisitors.size;
            delete aggregation[country].uniqueVisitors;
        });
        
        return aggregation;
    }

    /**
     * 按事件类型聚合事件数据
     * 
     * @returns {object} 按事件类型聚合的事件数据
     */
    aggregateEventsByType() {
        const aggregation = {};
        
        this.data.events.forEach(event => {
            const type = event.eventType || 'unknown';
            if (!aggregation[type]) {
                aggregation[type] = {
                    eventType: type,
                    count: 0,
                    details: []
                };
            }
            aggregation[type].count++;
            aggregation[type].details.push(event);
        });
        
        return aggregation;
    }

    /**
     * 按日期聚合事件数据
     * 
     * @param {string} startDate - 开始日期
     * @param {string} endDate - 结束日期
     * @returns {object} 按日期聚合的事件数据
     */
    aggregateEventsByDate(startDate, endDate) {
        const events = this.getEventsByDateRange(startDate, endDate);
        const aggregation = {};
        
        events.forEach(event => {
            const date = event.timestamp.split('T')[0];
            if (!aggregation[date]) {
                aggregation[date] = {
                    date: date,
                    eventCount: 0,
                    eventTypes: {}
                };
            }
            aggregation[date].eventCount++;
            
            const type = event.eventType || 'unknown';
            aggregation[date].eventTypes[type] = (aggregation[date].eventTypes[type] || 0) + 1;
        });
        
        return aggregation;
    }

    /**
     * 计算曝光率（基于访客数和事件数）
     * 
     * @returns {object} 曝光率统计对象
     */
    calculateExposureMetrics() {
        const visitorStats = this.getVisitorStats();
        const eventStats = this.getEventStats();
        
        return {
            totalExposures: eventStats.totalEvents,
            uniqueVisitors: visitorStats.uniqueVisitors,
            exposurePerVisitor: visitorStats.uniqueVisitors > 0 
                ? (eventStats.totalEvents / visitorStats.uniqueVisitors).toFixed(2) 
                : 0,
            conversionRate: visitorStats.totalVisits > 0 
                ? ((eventStats.totalEvents / visitorStats.totalVisits) * 100).toFixed(2) + '%'
                : '0%'
        };
    }

    /**
     * 获取访客来源分布
     * 
     * @returns {object} 访客来源分布数据
     */
    getVisitorSourceDistribution() {
        const distribution = {};
        
        this.data.visitors.forEach(visitor => {
            const source = visitor.source || 'direct';
            distribution[source] = (distribution[source] || 0) + 1;
        });
        
        return distribution;
    }

    /**
     * 获取搜索关键词统计
     * 
     * @returns {object} 搜索关键词及其出现次数
     */
    getSearchKeywordStats() {
        const searchEvents = this.getEventsByType('search');
        const keywords = {};
        
        searchEvents.forEach(event => {
            const keyword = event.searchTerm || 'unknown';
            keywords[keyword] = (keywords[keyword] || 0) + 1;
        });
        
        // 按出现次数排序
        const sorted = Object.entries(keywords)
            .sort((a, b) => b[1] - a[1])
            .reduce((obj, [key, value]) => {
                obj[key] = value;
                return obj;
            }, {});
        
        return sorted;
    }

    /**
     * 获取产品点击统计
     * 
     * @returns {object} 产品及其点击次数
     */
    getProductClickStats() {
        const productClicks = this.getEventsByType('product_click');
        const products = {};
        
        productClicks.forEach(event => {
            const productId = event.productId || 'unknown';
            const productName = event.productName || productId;
            const key = `${productId}|${productName}`;
            products[key] = (products[key] || 0) + 1;
        });
        
        // 按点击次数排序
        const sorted = Object.entries(products)
            .sort((a, b) => b[1] - a[1])
            .reduce((obj, [key, value]) => {
                obj[key] = value;
                return obj;
            }, {});
        
        return sorted;
    }

    /**
     * 获取供应商点击统计
     * 
     * @returns {object} 供应商及其点击次数
     */
    getSupplierClickStats() {
        const supplierClicks = this.getEventsByType('supplier_click');
        const suppliers = {};
        
        supplierClicks.forEach(event => {
            const supplierId = event.supplierId || 'unknown';
            const supplierName = event.supplierName || supplierId;
            const key = `${supplierId}|${supplierName}`;
            suppliers[key] = (suppliers[key] || 0) + 1;
        });
        
        // 按点击次数排序
        const sorted = Object.entries(suppliers)
            .sort((a, b) => b[1] - a[1])
            .reduce((obj, [key, value]) => {
                obj[key] = value;
                return obj;
            }, {});
        
        return sorted;
    }

    // ========================================================================
    // 报告生成
    // ========================================================================

    /**
     * 生成综合数据报告
     * 
     * @param {string} startDate - 开始日期
     * @param {string} endDate - 结束日期
     * @returns {object} 综合报告对象
     */
    generateReport(startDate, endDate) {
        return {
            period: {
                startDate: startDate,
                endDate: endDate,
                generatedAt: new Date().toISOString()
            },
            visitorStats: this.getVisitorStats(),
            eventStats: this.getEventStats(),
            exposureMetrics: this.calculateExposureMetrics(),
            visitorsByDate: this.aggregateVisitorsByDate(startDate, endDate),
            visitorsByCountry: this.aggregateVisitorsByCountry(),
            eventsByDate: this.aggregateEventsByDate(startDate, endDate),
            eventsByType: this.aggregateEventsByType(),
            visitorSourceDistribution: this.getVisitorSourceDistribution(),
            searchKeywords: this.getSearchKeywordStats(),
            productClicks: this.getProductClickStats(),
            supplierClicks: this.getSupplierClickStats()
        };
    }

    /**
     * 导出报告为JSON格式
     * 
     * @param {object} report - 报告对象
     * @returns {string} JSON字符串
     */
    exportReportAsJSON(report) {
        return JSON.stringify(report, null, 2);
    }

    // ========================================================================
    // 辅助函数
    // ========================================================================

    /**
     * 生成唯一ID
     * 
     * @returns {string} 唯一ID
     */
    generateId() {
        return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    /**
     * 获取数据统计信息
     * 
     * @returns {object} 数据统计对象
     */
    getDataStats() {
        return {
            totalVisitors: this.data.visitors.length,
            totalEvents: this.data.events.length,
            lastUpdated: this.data.metadata.lastUpdated,
            cacheExpired: this.isCacheExpired()
        };
    }
}

// ============================================================================
// 导出
// ============================================================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = GA4DataManager;
}

