/**
 * NEXUS GA4 Data Synchronization Manager
 * 
 * 该脚本负责与Google Analytics (GA4) API同步数据，
 * 定期从GA4获取最新数据并更新本地存储。
 * 
 * 使用方式：
 * 1. 初始化同步管理器：const syncManager = new GA4SyncManager();
 * 2. 启动自动同步：syncManager.startAutoSync();
 * 3. 手动同步数据：syncManager.syncData();
 * 
 * 版本: 1.0
 * 作者: NEXUS Development Team
 * 日期: 2025-10-23
 */

class GA4SyncManager {
    /**
     * 构造函数
     */
    constructor(dataManager) {
        this.dataManager = dataManager;
        this.syncInterval = 3600000; // 1小时自动同步一次
        this.syncIntervalId = null;
        this.isSyncing = false;
        this.lastSyncTime = null;
        
        // 同步配置
        this.syncConfig = {
            autoSync: true,
            syncInterval: this.syncInterval,
            retryAttempts: 3,
            retryDelay: 5000 // 5秒
        };
    }

    // ========================================================================
    // 同步控制
    // ========================================================================

    /**
     * 启动自动同步
     */
    startAutoSync() {
        if (this.syncIntervalId) {
            console.warn('[GA4SyncManager] Auto sync already running');
            return;
        }

        console.log('[GA4SyncManager] Starting auto sync with interval:', this.syncConfig.syncInterval);
        
        // 立即执行一次同步
        this.syncData();
        
        // 定期同步
        this.syncIntervalId = setInterval(() => {
            this.syncData();
        }, this.syncConfig.syncInterval);
    }

    /**
     * 停止自动同步
     */
    stopAutoSync() {
        if (this.syncIntervalId) {
            clearInterval(this.syncIntervalId);
            this.syncIntervalId = null;
            console.log('[GA4SyncManager] Auto sync stopped');
        }
    }

    /**
     * 手动同步数据
     * 
     * @returns {Promise<object>} 返回同步结果
     */
    async syncData() {
        if (this.isSyncing) {
            console.warn('[GA4SyncManager] Sync already in progress');
            return { success: false, message: 'Sync already in progress' };
        }

        this.isSyncing = true;
        console.log('[GA4SyncManager] Starting data sync...');

        try {
            // 检查授权
            if (!isAuthorized()) {
                throw new Error('Not authorized. Please complete OAuth authorization first.');
            }

            // 获取属性信息
            const propertyInfo = this.dataManager.getPropertyInfo();
            if (!propertyInfo.propertyId) {
                throw new Error('Property ID not set. Please configure GA4 property first.');
            }

            // 获取日期范围（最近30天）
            const { startDate, endDate } = this.getDateRange(30);

            // 同步访客数据
            console.log('[GA4SyncManager] Syncing visitor data...');
            await this.syncVisitorData(propertyInfo.propertyId, startDate, endDate);

            // 同步事件数据
            console.log('[GA4SyncManager] Syncing event data...');
            await this.syncEventData(propertyInfo.propertyId, startDate, endDate);

            this.lastSyncTime = new Date().toISOString();
            this.isSyncing = false;

            console.log('[GA4SyncManager] Data sync completed successfully');
            return { 
                success: true, 
                message: 'Data sync completed successfully',
                lastSyncTime: this.lastSyncTime
            };

        } catch (error) {
            console.error('[GA4SyncManager] Data sync failed:', error);
            this.isSyncing = false;
            return { 
                success: false, 
                message: error.message,
                error: error
            };
        }
    }

    // ========================================================================
    // 数据同步方法
    // ========================================================================

    /**
     * 同步访客数据
     * 
     * @param {string} propertyId - GA4属性ID
     * @param {string} startDate - 开始日期
     * @param {string} endDate - 结束日期
     * @returns {Promise<void>}
     */
    async syncVisitorData(propertyId, startDate, endDate) {
        try {
            // 调用GA4 Reporting API获取访客数据
            const visitorData = await getVisitorData(propertyId, startDate, endDate);
            
            // 处理和转换数据
            const processedVisitors = this.processVisitorData(visitorData);
            
            // 更新本地数据
            this.dataManager.addVisitors(processedVisitors);
            
            console.log('[GA4SyncManager] Visitor data synced:', processedVisitors.length);
        } catch (error) {
            console.error('[GA4SyncManager] Error syncing visitor data:', error);
            throw error;
        }
    }

    /**
     * 同步事件数据
     * 
     * @param {string} propertyId - GA4属性ID
     * @param {string} startDate - 开始日期
     * @param {string} endDate - 结束日期
     * @returns {Promise<void>}
     */
    async syncEventData(propertyId, startDate, endDate) {
        try {
            // 需要同步的事件类型
            const eventTypes = [
                'product_click',
                'product_detail_view',
                'search',
                'supplier_page_view',
                'supplier_click',
                'ai_consultant_usage',
                'equipment_configurator',
                'quote_request',
                'contact_supplier',
                'category_view'
            ];

            // 逐个同步各类型事件
            for (const eventType of eventTypes) {
                try {
                    const eventData = await getEventData(propertyId, eventType, startDate, endDate);
                    const processedEvents = this.processEventData(eventData, eventType);
                    this.dataManager.addEvents(processedEvents);
                    console.log(`[GA4SyncManager] Event data synced for ${eventType}:`, processedEvents.length);
                } catch (error) {
                    console.warn(`[GA4SyncManager] Error syncing ${eventType} events:`, error);
                    // 继续同步其他事件类型
                }
            }
        } catch (error) {
            console.error('[GA4SyncManager] Error syncing event data:', error);
            throw error;
        }
    }

    // ========================================================================
    // 数据处理
    // ========================================================================

    /**
     * 处理GA4访客数据
     * 将GA4 API返回的数据转换为本地数据格式
     * 
     * @param {object} rawData - GA4 API返回的原始数据
     * @returns {array} 处理后的访客数据数组
     */
    processVisitorData(rawData) {
        const visitors = [];

        try {
            if (!rawData.rows) {
                console.warn('[GA4SyncManager] No visitor data in API response');
                return visitors;
            }

            rawData.rows.forEach(row => {
                const visitor = {
                    id: this.generateVisitorId(row),
                    date: row.dimensionValues[0].value,
                    country: row.dimensionValues[1].value || 'Unknown',
                    activeUsers: parseInt(row.metricValues[0].value) || 0,
                    sessions: parseInt(row.metricValues[1].value) || 0,
                    pageViews: parseInt(row.metricValues[2].value) || 0,
                    source: 'ga4',
                    timestamp: new Date().toISOString()
                };

                visitors.push(visitor);
            });
        } catch (error) {
            console.error('[GA4SyncManager] Error processing visitor data:', error);
        }

        return visitors;
    }

    /**
     * 处理GA4事件数据
     * 将GA4 API返回的数据转换为本地数据格式
     * 
     * @param {object} rawData - GA4 API返回的原始数据
     * @param {string} eventType - 事件类型
     * @returns {array} 处理后的事件数据数组
     */
    processEventData(rawData, eventType) {
        const events = [];

        try {
            if (!rawData.rows) {
                console.warn(`[GA4SyncManager] No event data for ${eventType}`);
                return events;
            }

            rawData.rows.forEach(row => {
                const event = {
                    id: this.generateEventId(row),
                    eventType: eventType,
                    eventName: row.dimensionValues[0].value,
                    date: row.dimensionValues[1].value,
                    eventCount: parseInt(row.metricValues[0].value) || 0,
                    eventValue: parseFloat(row.metricValues[1].value) || 0,
                    source: 'ga4',
                    timestamp: new Date().toISOString()
                };

                events.push(event);
            });
        } catch (error) {
            console.error(`[GA4SyncManager] Error processing ${eventType} event data:`, error);
        }

        return events;
    }

    // ========================================================================
    // 日期处理
    // ========================================================================

    /**
     * 获取日期范围
     * 
     * @param {number} days - 过去的天数
     * @returns {object} 包含startDate和endDate的对象
     */
    getDateRange(days = 30) {
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(endDate.getDate() - days);

        return {
            startDate: this.formatDate(startDate),
            endDate: this.formatDate(endDate)
        };
    }

    /**
     * 格式化日期为YYYY-MM-DD格式
     * 
     * @param {Date} date - 日期对象
     * @returns {string} 格式化后的日期字符串
     */
    formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    // ========================================================================
    // ID生成
    // ========================================================================

    /**
     * 生成访客ID
     * 
     * @param {object} row - GA4数据行
     * @returns {string} 访客ID
     */
    generateVisitorId(row) {
        const date = row.dimensionValues[0].value;
        const country = row.dimensionValues[1].value;
        return `visitor_${date}_${country}_${Math.random().toString(36).substr(2, 9)}`;
    }

    /**
     * 生成事件ID
     * 
     * @param {object} row - GA4数据行
     * @returns {string} 事件ID
     */
    generateEventId(row) {
        const eventName = row.dimensionValues[0].value;
        const date = row.dimensionValues[1].value;
        return `event_${eventName}_${date}_${Math.random().toString(36).substr(2, 9)}`;
    }

    // ========================================================================
    // 状态查询
    // ========================================================================

    /**
     * 获取同步状态
     * 
     * @returns {object} 同步状态对象
     */
    getSyncStatus() {
        return {
            isSyncing: this.isSyncing,
            lastSyncTime: this.lastSyncTime,
            autoSyncEnabled: this.syncIntervalId !== null,
            syncInterval: this.syncConfig.syncInterval
        };
    }

    /**
     * 设置同步间隔
     * 
     * @param {number} interval - 间隔时间（毫秒）
     */
    setSyncInterval(interval) {
        this.syncConfig.syncInterval = interval;
        this.syncInterval = interval;
        
        // 如果自动同步正在运行，重新启动
        if (this.syncIntervalId) {
            this.stopAutoSync();
            this.startAutoSync();
        }
        
        console.log('[GA4SyncManager] Sync interval updated:', interval);
    }

    /**
     * 获取同步配置
     * 
     * @returns {object} 同步配置对象
     */
    getSyncConfig() {
        return { ...this.syncConfig };
    }

    /**
     * 更新同步配置
     * 
     * @param {object} config - 新的配置对象
     */
    updateSyncConfig(config) {
        this.syncConfig = { ...this.syncConfig, ...config };
        console.log('[GA4SyncManager] Sync config updated:', this.syncConfig);
    }
}

// ============================================================================
// 导出
// ============================================================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = GA4SyncManager;
}

