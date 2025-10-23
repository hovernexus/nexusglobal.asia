/**
 * NEXUS GA4 Data Export Manager
 * 
 * 该脚本负责将GA4数据导出为Excel格式。
 * 使用SheetJS库（xlsx）进行Excel文件生成。
 * 
 * 使用方式：
 * 1. 初始化导出管理器：const exporter = new GA4ExportManager(dataManager);
 * 2. 导出访客数据：exporter.exportVisitors();
 * 3. 导出事件数据：exporter.exportEvents();
 * 4. 导出综合报告：exporter.exportReport();
 * 
 * 版本: 1.0
 * 作者: NEXUS Development Team
 * 日期: 2025-10-23
 */

class GA4ExportManager {
    /**
     * 构造函数
     * 
     * @param {GA4DataManager} dataManager - 数据管理器实例
     */
    constructor(dataManager) {
        this.dataManager = dataManager;
        this.sheetJsUrl = 'https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js';
        this.isSheetJsLoaded = false;
    }

    /**
     * 加载SheetJS库
     * 
     * @returns {Promise<void>}
     */
    async loadSheetJs() {
        if (this.isSheetJsLoaded || typeof XLSX !== 'undefined') {
            this.isSheetJsLoaded = true;
            return;
        }

        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = this.sheetJsUrl;
            script.onload = () => {
                this.isSheetJsLoaded = true;
                resolve();
            };
            script.onerror = () => {
                reject(new Error('Failed to load SheetJS library'));
            };
            document.head.appendChild(script);
        });
    }

    /**
     * 导出访客数据为Excel
     * 
     * @param {string} startDate - 开始日期
     * @param {string} endDate - 结束日期
     * @returns {Promise<void>}
     */
    async exportVisitors(startDate, endDate) {
        try {
            await this.loadSheetJs();

            const visitors = this.dataManager.getVisitorsByDateRange(startDate, endDate);
            
            if (visitors.length === 0) {
                throw new Error('No visitor data to export');
            }

            // 准备数据
            const data = visitors.map(visitor => ({
                '访问日期': visitor.date || '-',
                '国家/地区': visitor.country || 'Unknown',
                '活跃用户': visitor.activeUsers || 0,
                '会话数': visitor.sessions || 0,
                '页面浏览': visitor.pageViews || 0,
                '数据来源': visitor.source || 'ga4',
                '记录时间': visitor.timestamp || '-'
            }));

            // 创建工作簿
            const worksheet = XLSX.utils.json_to_sheet(data);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, '访客数据');

            // 设置列宽
            this.setColumnWidths(worksheet, [15, 15, 12, 12, 12, 12, 20]);

            // 生成文件名
            const fileName = `NEXUS_访客数据_${startDate}_至_${endDate}.xlsx`;

            // 导出文件
            XLSX.writeFile(workbook, fileName);

            console.log('[GA4ExportManager] Visitor data exported successfully');
        } catch (error) {
            console.error('[GA4ExportManager] Error exporting visitor data:', error);
            throw error;
        }
    }

    /**
     * 导出事件数据为Excel
     * 
     * @param {string} startDate - 开始日期
     * @param {string} endDate - 结束日期
     * @returns {Promise<void>}
     */
    async exportEvents(startDate, endDate) {
        try {
            await this.loadSheetJs();

            const events = this.dataManager.getEventsByDateRange(startDate, endDate);
            
            if (events.length === 0) {
                throw new Error('No event data to export');
            }

            // 准备数据
            const data = events.map(event => ({
                '事件类型': event.eventType || 'unknown',
                '事件名称': event.eventName || '-',
                '事件日期': event.date || '-',
                '事件数': event.eventCount || 0,
                '事件值': event.eventValue || 0,
                '数据来源': event.source || 'ga4',
                '记录时间': event.timestamp || '-'
            }));

            // 创建工作簿
            const worksheet = XLSX.utils.json_to_sheet(data);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, '事件数据');

            // 设置列宽
            this.setColumnWidths(worksheet, [15, 15, 12, 10, 10, 12, 20]);

            // 生成文件名
            const fileName = `NEXUS_事件数据_${startDate}_至_${endDate}.xlsx`;

            // 导出文件
            XLSX.writeFile(workbook, fileName);

            console.log('[GA4ExportManager] Event data exported successfully');
        } catch (error) {
            console.error('[GA4ExportManager] Error exporting event data:', error);
            throw error;
        }
    }

    /**
     * 导出综合报告为Excel
     * 
     * @param {string} startDate - 开始日期
     * @param {string} endDate - 结束日期
     * @returns {Promise<void>}
     */
    async exportReport(startDate, endDate) {
        try {
            await this.loadSheetJs();

            // 生成报告
            const report = this.dataManager.generateReport(startDate, endDate);

            // 创建工作簿
            const workbook = XLSX.utils.book_new();

            // 1. 摘要表
            this.addSummarySheet(workbook, report);

            // 2. 访客统计表
            this.addVisitorStatsSheet(workbook, report);

            // 3. 事件统计表
            this.addEventStatsSheet(workbook, report);

            // 4. 按日期聚合表
            this.addByDateSheet(workbook, report);

            // 5. 按国家聚合表
            this.addByCountrySheet(workbook, report);

            // 6. 搜索关键词表
            this.addSearchKeywordsSheet(workbook, report);

            // 7. 产品点击表
            this.addProductClicksSheet(workbook, report);

            // 8. 供应商互动表
            this.addSupplierClicksSheet(workbook, report);

            // 生成文件名
            const fileName = `NEXUS_综合报告_${startDate}_至_${endDate}.xlsx`;

            // 导出文件
            XLSX.writeFile(workbook, fileName);

            console.log('[GA4ExportManager] Report exported successfully');
        } catch (error) {
            console.error('[GA4ExportManager] Error exporting report:', error);
            throw error;
        }
    }

    /**
     * 添加摘要表
     * 
     * @param {object} workbook - 工作簿
     * @param {object} report - 报告数据
     */
    addSummarySheet(workbook, report) {
        const data = [
            ['NEXUS 供应商数据分析报告'],
            [],
            ['报告期间', `${report.period.startDate} 至 ${report.period.endDate}`],
            ['生成时间', report.period.generatedAt],
            [],
            ['关键指标', '数值'],
            ['总访问次数', report.visitorStats.totalVisits],
            ['唯一访客数', report.visitorStats.uniqueVisitors],
            ['平均访问次数', report.visitorStats.averageVisitsPerVisitor],
            ['总事件数', report.eventStats.totalEvents],
            ['曝光率', report.exposureMetrics.exposurePerVisitor],
            ['转化率', report.exposureMetrics.conversionRate],
            [],
            ['事件类型分布', '数量'],
            ...Object.entries(report.eventStats.eventTypeDistribution).map(([type, count]) => [type, count])
        ];

        const worksheet = XLSX.utils.aoa_to_sheet(data);
        this.setColumnWidths(worksheet, [30, 30]);
        XLSX.utils.book_append_sheet(workbook, worksheet, '摘要');
    }

    /**
     * 添加访客统计表
     * 
     * @param {object} workbook - 工作簿
     * @param {object} report - 报告数据
     */
    addVisitorStatsSheet(workbook, report) {
        const data = [
            ['访客统计'],
            [],
            ['日期', '访问次数', '唯一访客数']
        ];

        Object.entries(report.visitorsByDate).forEach(([date, stats]) => {
            data.push([date, stats.visitCount, stats.uniqueVisitorCount]);
        });

        const worksheet = XLSX.utils.aoa_to_sheet(data);
        this.setColumnWidths(worksheet, [15, 15, 15]);
        XLSX.utils.book_append_sheet(workbook, worksheet, '访客统计');
    }

    /**
     * 添加事件统计表
     * 
     * @param {object} workbook - 工作簿
     * @param {object} report - 报告数据
     */
    addEventStatsSheet(workbook, report) {
        const data = [
            ['事件统计'],
            [],
            ['事件类型', '数量']
        ];

        Object.entries(report.eventsByType).forEach(([type, stats]) => {
            data.push([type, stats.count]);
        });

        const worksheet = XLSX.utils.aoa_to_sheet(data);
        this.setColumnWidths(worksheet, [20, 15]);
        XLSX.utils.book_append_sheet(workbook, worksheet, '事件统计');
    }

    /**
     * 添加按日期聚合表
     * 
     * @param {object} workbook - 工作簿
     * @param {object} report - 报告数据
     */
    addByDateSheet(workbook, report) {
        const data = [
            ['按日期聚合'],
            [],
            ['日期', '事件数', '事件类型分布']
        ];

        Object.entries(report.eventsByDate).forEach(([date, stats]) => {
            const eventTypeStr = Object.entries(stats.eventTypes)
                .map(([type, count]) => `${type}:${count}`)
                .join('; ');
            data.push([date, stats.eventCount, eventTypeStr]);
        });

        const worksheet = XLSX.utils.aoa_to_sheet(data);
        this.setColumnWidths(worksheet, [15, 12, 40]);
        XLSX.utils.book_append_sheet(workbook, worksheet, '按日期聚合');
    }

    /**
     * 添加按国家聚合表
     * 
     * @param {object} workbook - 工作簿
     * @param {object} report - 报告数据
     */
    addByCountrySheet(workbook, report) {
        const data = [
            ['按国家聚合'],
            [],
            ['国家/地区', '访问次数', '唯一访客数']
        ];

        Object.entries(report.visitorsByCountry).forEach(([country, stats]) => {
            data.push([stats.country, stats.visitCount, stats.uniqueVisitorCount]);
        });

        const worksheet = XLSX.utils.aoa_to_sheet(data);
        this.setColumnWidths(worksheet, [20, 15, 15]);
        XLSX.utils.book_append_sheet(workbook, worksheet, '按国家聚合');
    }

    /**
     * 添加搜索关键词表
     * 
     * @param {object} workbook - 工作簿
     * @param {object} report - 报告数据
     */
    addSearchKeywordsSheet(workbook, report) {
        const data = [
            ['热门搜索关键词'],
            [],
            ['关键词', '搜索次数']
        ];

        Object.entries(report.searchKeywords)
            .sort((a, b) => b[1] - a[1])
            .forEach(([keyword, count]) => {
                data.push([keyword, count]);
            });

        const worksheet = XLSX.utils.aoa_to_sheet(data);
        this.setColumnWidths(worksheet, [30, 15]);
        XLSX.utils.book_append_sheet(workbook, worksheet, '搜索关键词');
    }

    /**
     * 添加产品点击表
     * 
     * @param {object} workbook - 工作簿
     * @param {object} report - 报告数据
     */
    addProductClicksSheet(workbook, report) {
        const data = [
            ['热门产品'],
            [],
            ['产品名称', '点击次数']
        ];

        Object.entries(report.productClicks)
            .sort((a, b) => b[1] - a[1])
            .forEach(([productKey, count]) => {
                const [productId, productName] = productKey.split('|');
                data.push([productName, count]);
            });

        const worksheet = XLSX.utils.aoa_to_sheet(data);
        this.setColumnWidths(worksheet, [30, 15]);
        XLSX.utils.book_append_sheet(workbook, worksheet, '热门产品');
    }

    /**
     * 添加供应商互动表
     * 
     * @param {object} workbook - 工作簿
     * @param {object} report - 报告数据
     */
    addSupplierClicksSheet(workbook, report) {
        const data = [
            ['供应商互动'],
            [],
            ['供应商名称', '互动次数']
        ];

        Object.entries(report.supplierClicks)
            .sort((a, b) => b[1] - a[1])
            .forEach(([supplierKey, count]) => {
                const [supplierId, supplierName] = supplierKey.split('|');
                data.push([supplierName, count]);
            });

        const worksheet = XLSX.utils.aoa_to_sheet(data);
        this.setColumnWidths(worksheet, [30, 15]);
        XLSX.utils.book_append_sheet(workbook, worksheet, '供应商互动');
    }

    /**
     * 设置列宽
     * 
     * @param {object} worksheet - 工作表
     * @param {array} widths - 列宽数组
     */
    setColumnWidths(worksheet, widths) {
        worksheet['!cols'] = widths.map(width => ({ wch: width }));
    }

    /**
     * 导出搜索关键词为Excel
     * 
     * @returns {Promise<void>}
     */
    async exportSearchKeywords() {
        try {
            await this.loadSheetJs();

            const keywords = this.dataManager.getSearchKeywordStats();
            
            if (Object.keys(keywords).length === 0) {
                throw new Error('No search keyword data to export');
            }

            // 准备数据
            const data = Object.entries(keywords)
                .sort((a, b) => b[1] - a[1])
                .map(([keyword, count]) => ({
                    '关键词': keyword,
                    '搜索次数': count
                }));

            // 创建工作簿
            const worksheet = XLSX.utils.json_to_sheet(data);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, '搜索关键词');

            // 设置列宽
            this.setColumnWidths(worksheet, [30, 15]);

            // 生成文件名
            const fileName = `NEXUS_搜索关键词.xlsx`;

            // 导出文件
            XLSX.writeFile(workbook, fileName);

            console.log('[GA4ExportManager] Search keywords exported successfully');
        } catch (error) {
            console.error('[GA4ExportManager] Error exporting search keywords:', error);
            throw error;
        }
    }

    /**
     * 导出产品点击为Excel
     * 
     * @returns {Promise<void>}
     */
    async exportProductClicks() {
        try {
            await this.loadSheetJs();

            const products = this.dataManager.getProductClickStats();
            
            if (Object.keys(products).length === 0) {
                throw new Error('No product click data to export');
            }

            // 准备数据
            const data = Object.entries(products)
                .sort((a, b) => b[1] - a[1])
                .map(([productKey, count]) => {
                    const [productId, productName] = productKey.split('|');
                    return {
                        '产品ID': productId,
                        '产品名称': productName,
                        '点击次数': count
                    };
                });

            // 创建工作簿
            const worksheet = XLSX.utils.json_to_sheet(data);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, '产品点击');

            // 设置列宽
            this.setColumnWidths(worksheet, [15, 30, 15]);

            // 生成文件名
            const fileName = `NEXUS_产品点击.xlsx`;

            // 导出文件
            XLSX.writeFile(workbook, fileName);

            console.log('[GA4ExportManager] Product clicks exported successfully');
        } catch (error) {
            console.error('[GA4ExportManager] Error exporting product clicks:', error);
            throw error;
        }
    }

    /**
     * 导出供应商互动为Excel
     * 
     * @returns {Promise<void>}
     */
    async exportSupplierClicks() {
        try {
            await this.loadSheetJs();

            const suppliers = this.dataManager.getSupplierClickStats();
            
            if (Object.keys(suppliers).length === 0) {
                throw new Error('No supplier click data to export');
            }

            // 准备数据
            const data = Object.entries(suppliers)
                .sort((a, b) => b[1] - a[1])
                .map(([supplierKey, count]) => {
                    const [supplierId, supplierName] = supplierKey.split('|');
                    return {
                        '供应商ID': supplierId,
                        '供应商名称': supplierName,
                        '互动次数': count
                    };
                });

            // 创建工作簿
            const worksheet = XLSX.utils.json_to_sheet(data);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, '供应商互动');

            // 设置列宽
            this.setColumnWidths(worksheet, [15, 30, 15]);

            // 生成文件名
            const fileName = `NEXUS_供应商互动.xlsx`;

            // 导出文件
            XLSX.writeFile(workbook, fileName);

            console.log('[GA4ExportManager] Supplier clicks exported successfully');
        } catch (error) {
            console.error('[GA4ExportManager] Error exporting supplier clicks:', error);
            throw error;
        }
    }
}

// ============================================================================
// 导出
// ============================================================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = GA4ExportManager;
}

