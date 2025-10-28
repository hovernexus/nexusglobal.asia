/**
 * NEXUS GA4 用户留存与转化漏斗分析模块
 * 版本: 1.0
 * 功能: 计算用户留存率、流失率、转化漏斗等高级分析指标
 */

class GA4RetentionFunnelAnalyzer {
    constructor(dataManager) {
        this.dataManager = dataManager;
    }

    /**
     * 计算用户留存分析
     * @param {number} dateRangeStart - 开始日期（时间戳）
     * @param {number} dateRangeEnd - 结束日期（时间戳）
     * @returns {Object} 留存分析结果
     */
    calculateRetentionAnalysis(dateRangeStart, dateRangeEnd) {
        const visitors = this.dataManager.getVisitors();
        const events = this.dataManager.getEvents();

        // 按访客ID分组，计算每个访客的首次访问日期和后续访问日期
        const visitorRetention = {};
        
        visitors.forEach(visitor => {
            const visitorId = visitor.visitorId;
            const visitorEvents = events.filter(e => e.visitorId === visitorId);
            
            if (visitorEvents.length > 0) {
                // 按日期排序
                visitorEvents.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
                
                const firstVisitDate = new Date(visitorEvents[0].timestamp);
                const firstVisitDay = Math.floor(firstVisitDate.getTime() / (24 * 60 * 60 * 1000));
                
                // 计算后续访问日期
                const subsequentVisitDays = new Set();
                visitorEvents.forEach(event => {
                    const eventDate = new Date(event.timestamp);
                    const eventDay = Math.floor(eventDate.getTime() / (24 * 60 * 60 * 1000));
                    if (eventDay > firstVisitDay) {
                        subsequentVisitDays.add(eventDay);
                    }
                });
                
                visitorRetention[visitorId] = {
                    firstVisitDay: firstVisitDay,
                    subsequentVisitDays: Array.from(subsequentVisitDays).sort((a, b) => a - b),
                    totalVisits: visitorEvents.length
                };
            }
        });

        // 计算留存率
        const retentionMetrics = {
            totalNewUsers: Object.keys(visitorRetention).length,
            day1Retention: 0,
            day7Retention: 0,
            day30Retention: 0,
            churnRate: 0,
            retentionCohorts: {}
        };

        // 计算Day 1, Day 7, Day 30留存率
        let day1RetainedUsers = 0;
        let day7RetainedUsers = 0;
        let day30RetainedUsers = 0;

        Object.values(visitorRetention).forEach(retention => {
            // Day 1: 首次访问后的第二天是否有访问
            if (retention.subsequentVisitDays.length > 0) {
                const daysSinceFirstVisit = retention.subsequentVisitDays[0] - retention.firstVisitDay;
                if (daysSinceFirstVisit === 1) {
                    day1RetainedUsers++;
                }
            }

            // Day 7: 首次访问后的第7天内是否有访问
            const day7Visits = retention.subsequentVisitDays.filter(
                day => day - retention.firstVisitDay <= 7 && day - retention.firstVisitDay > 0
            );
            if (day7Visits.length > 0) {
                day7RetainedUsers++;
            }

            // Day 30: 首次访问后的第30天内是否有访问
            const day30Visits = retention.subsequentVisitDays.filter(
                day => day - retention.firstVisitDay <= 30 && day - retention.firstVisitDay > 0
            );
            if (day30Visits.length > 0) {
                day30RetainedUsers++;
            }
        });

        retentionMetrics.day1Retention = retentionMetrics.totalNewUsers > 0 
            ? ((day1RetainedUsers / retentionMetrics.totalNewUsers) * 100).toFixed(2) 
            : 0;
        retentionMetrics.day7Retention = retentionMetrics.totalNewUsers > 0 
            ? ((day7RetainedUsers / retentionMetrics.totalNewUsers) * 100).toFixed(2) 
            : 0;
        retentionMetrics.day30Retention = retentionMetrics.totalNewUsers > 0 
            ? ((day30RetainedUsers / retentionMetrics.totalNewUsers) * 100).toFixed(2) 
            : 0;
        retentionMetrics.churnRate = (100 - retentionMetrics.day30Retention).toFixed(2);

        // 生成留存队列（Retention Cohorts）
        retentionMetrics.retentionCohorts = this._generateRetentionCohorts(visitorRetention);

        return retentionMetrics;
    }

    /**
     * 生成留存队列数据
     * @param {Object} visitorRetention - 访客留存数据
     * @returns {Array} 留存队列数组
     */
    _generateRetentionCohorts(visitorRetention) {
        const cohorts = {};

        Object.values(visitorRetention).forEach(retention => {
            const cohortDate = new Date(retention.firstVisitDay * 24 * 60 * 60 * 1000);
            const cohortKey = `${cohortDate.getFullYear()}-${String(cohortDate.getMonth() + 1).padStart(2, '0')}-${String(cohortDate.getDate()).padStart(2, '0')}`;

            if (!cohorts[cohortKey]) {
                cohorts[cohortKey] = {
                    date: cohortKey,
                    day0: 0,
                    day1: 0,
                    day7: 0,
                    day14: 0,
                    day30: 0
                };
            }

            cohorts[cohortKey].day0++;

            // 计算各个时间段的留存
            retention.subsequentVisitDays.forEach(day => {
                const daysSinceFirstVisit = day - retention.firstVisitDay;
                if (daysSinceFirstVisit === 1) cohorts[cohortKey].day1++;
                if (daysSinceFirstVisit <= 7) cohorts[cohortKey].day7++;
                if (daysSinceFirstVisit <= 14) cohorts[cohortKey].day14++;
                if (daysSinceFirstVisit <= 30) cohorts[cohortKey].day30++;
            });
        });

        // 计算留存率百分比
        Object.values(cohorts).forEach(cohort => {
            cohort.day1Rate = cohort.day0 > 0 ? ((cohort.day1 / cohort.day0) * 100).toFixed(1) : 0;
            cohort.day7Rate = cohort.day0 > 0 ? ((cohort.day7 / cohort.day0) * 100).toFixed(1) : 0;
            cohort.day14Rate = cohort.day0 > 0 ? ((cohort.day14 / cohort.day0) * 100).toFixed(1) : 0;
            cohort.day30Rate = cohort.day0 > 0 ? ((cohort.day30 / cohort.day0) * 100).toFixed(1) : 0;
        });

        return Object.values(cohorts).sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    /**
     * 计算转化漏斗分析
     * @param {number} dateRangeStart - 开始日期（时间戳）
     * @param {number} dateRangeEnd - 结束日期（时间戳）
     * @returns {Object} 转化漏斗分析结果
     */
    calculateConversionFunnel(dateRangeStart, dateRangeEnd) {
        const events = this.dataManager.getEvents();
        const visitors = this.dataManager.getVisitors();

        // 定义漏斗步骤
        const funnelSteps = [
            { name: 'Product Exposure', eventType: 'product_list_view', description: '产品列表页访问' },
            { name: 'Product Click', eventType: 'product_click', description: '产品详情页访问' },
            { name: 'Quote Request', eventType: 'quote_request', description: '报价请求提交' }
        ];

        // 统计每个步骤的用户数
        const funnelData = {};
        funnelSteps.forEach(step => {
            funnelData[step.eventType] = new Set();
        });

        // 按访客和事件类型统计
        events.forEach(event => {
            if (funnelData[event.eventType]) {
                funnelData[event.eventType].add(event.visitorId);
            }
        });

        // 构建漏斗结果
        const funnelResult = {
            steps: [],
            conversionRates: [],
            dropoffRates: []
        };

        let previousStepCount = 0;

        funnelSteps.forEach((step, index) => {
            const userCount = funnelData[step.eventType].size;
            
            funnelResult.steps.push({
                name: step.name,
                description: step.description,
                eventType: step.eventType,
                users: userCount,
                percentage: index === 0 ? 100 : 0
            });

            if (index === 0) {
                previousStepCount = userCount;
            } else {
                const conversionRate = previousStepCount > 0 
                    ? ((userCount / previousStepCount) * 100).toFixed(2) 
                    : 0;
                const dropoffRate = (100 - conversionRate).toFixed(2);
                
                funnelResult.steps[index].percentage = conversionRate;
                funnelResult.conversionRates.push({
                    from: funnelSteps[index - 1].name,
                    to: step.name,
                    rate: conversionRate,
                    users: userCount
                });
                funnelResult.dropoffRates.push({
                    step: step.name,
                    rate: dropoffRate,
                    users: previousStepCount - userCount
                });

                previousStepCount = userCount;
            }
        });

        // 计算总体转化率
        funnelResult.overallConversionRate = funnelResult.steps.length > 0 
            ? ((funnelResult.steps[funnelResult.steps.length - 1].users / funnelResult.steps[0].users) * 100).toFixed(2)
            : 0;

        return funnelResult;
    }

    /**
     * 计算高级漏斗分析（按产品分类）
     * @param {number} dateRangeStart - 开始日期（时间戳）
     * @param {number} dateRangeEnd - 结束日期（时间戳）
     * @returns {Object} 按产品分类的漏斗分析结果
     */
    calculateFunnelByProduct(dateRangeStart, dateRangeEnd) {
        const events = this.dataManager.getEvents();
        const funnelByProduct = {};

        // 按产品分类统计事件
        events.forEach(event => {
            const productId = event.productId || 'unknown';
            
            if (!funnelByProduct[productId]) {
                funnelByProduct[productId] = {
                    productId: productId,
                    productName: event.productName || productId,
                    exposures: new Set(),
                    clicks: new Set(),
                    quoteRequests: new Set()
                };
            }

            if (event.eventType === 'product_list_view') {
                funnelByProduct[productId].exposures.add(event.visitorId);
            } else if (event.eventType === 'product_click') {
                funnelByProduct[productId].clicks.add(event.visitorId);
            } else if (event.eventType === 'quote_request') {
                funnelByProduct[productId].quoteRequests.add(event.visitorId);
            }
        });

        // 计算转化率
        const result = [];
        Object.values(funnelByProduct).forEach(product => {
            const exposureCount = product.exposures.size;
            const clickCount = product.clicks.size;
            const quoteCount = product.quoteRequests.size;

            result.push({
                productId: product.productId,
                productName: product.productName,
                exposures: exposureCount,
                clicks: clickCount,
                quoteRequests: quoteCount,
                clickThroughRate: exposureCount > 0 ? ((clickCount / exposureCount) * 100).toFixed(2) : 0,
                conversionRate: exposureCount > 0 ? ((quoteCount / exposureCount) * 100).toFixed(2) : 0
            });
        });

        // 按转化率排序
        result.sort((a, b) => parseFloat(b.conversionRate) - parseFloat(a.conversionRate));

        return result;
    }

    /**
     * 计算用户行为路径分析
     * @param {number} dateRangeStart - 开始日期（时间戳）
     * @param {number} dateRangeEnd - 结束日期（时间戳）
     * @returns {Array} 用户行为路径数组
     */
    calculateUserJourneys(dateRangeStart, dateRangeEnd) {
        const events = this.dataManager.getEvents();
        const visitors = this.dataManager.getVisitors();
        const journeys = {};

        // 按访客ID分组事件
        const visitorEvents = {};
        events.forEach(event => {
            if (!visitorEvents[event.visitorId]) {
                visitorEvents[event.visitorId] = [];
            }
            visitorEvents[event.visitorId].push(event);
        });

        // 构建用户行为路径
        Object.entries(visitorEvents).forEach(([visitorId, events]) => {
            // 按时间排序
            events.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

            // 构建路径字符串
            const pathArray = events.map(e => e.eventType).slice(0, 5); // 只取前5个事件
            const pathKey = pathArray.join(' -> ');

            if (!journeys[pathKey]) {
                journeys[pathKey] = {
                    path: pathKey,
                    count: 0,
                    eventSequence: pathArray,
                    conversionCount: 0
                };
            }

            journeys[pathKey].count++;

            // 检查是否包含转化事件（quote_request）
            if (pathArray.includes('quote_request')) {
                journeys[pathKey].conversionCount++;
            }
        });

        // 转换为数组并按频率排序
        const result = Object.values(journeys)
            .map(journey => ({
                ...journey,
                conversionRate: journey.count > 0 ? ((journey.conversionCount / journey.count) * 100).toFixed(2) : 0
            }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 20); // 只返回前20个最常见的路径

        return result;
    }

    /**
     * 获取转化漏斗摘要
     * @returns {Object} 转化漏斗摘要
     */
    getFunnelSummary() {
        const funnel = this.calculateConversionFunnel(0, Date.now());
        
        return {
            totalVisitors: funnel.steps[0] ? funnel.steps[0].users : 0,
            productClickers: funnel.steps[1] ? funnel.steps[1].users : 0,
            quoteRequests: funnel.steps[2] ? funnel.steps[2].users : 0,
            overallConversionRate: funnel.overallConversionRate,
            topDropoffPoint: this._identifyTopDropoffPoint(funnel.dropoffRates)
        };
    }

    /**
     * 识别主要流失点
     * @param {Array} dropoffRates - 流失率数组
     * @returns {Object} 主要流失点信息
     */
    _identifyTopDropoffPoint(dropoffRates) {
        if (dropoffRates.length === 0) return null;
        
        const topDropoff = dropoffRates.reduce((max, current) => 
            parseFloat(current.rate) > parseFloat(max.rate) ? current : max
        );

        return {
            step: topDropoff.step,
            dropoffRate: topDropoff.rate,
            droppedUsers: topDropoff.users
        };
    }
}

// 导出模块
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GA4RetentionFunnelAnalyzer;
}

