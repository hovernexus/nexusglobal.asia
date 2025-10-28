/**
 * NEXUS 供应商数据看板 - JavaScript脚本
 * 
 * 该脚本处理数据看板的所有交互逻辑，包括：
 * - 数据初始化和加载
 * - 标签页切换
 * - 数据筛选和搜索
 * - 图表渲染
 * - 数据表格显示
 * - 通知消息显示
 * 
 * 版本: 1.0
 * 作者: NEXUS Development Team
 * 日期: 2025-10-23
 */

// ============================================================================
// 全局变量
// ============================================================================

let dataManager = null;
let syncManager = null;
let exporter = null;
let currentDateRange = { startDate: null, endDate: null };
let currentPage = 1;
const itemsPerPage = 10;
let chartInstances = {};

// ============================================================================
// 初始化
// ============================================================================

/**
 * 页面加载完成后的初始化
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('[Dashboard] Initializing supplier dashboard...');
    
    // 检查授权状态
    if (!isAuthorized()) {
        console.warn('[Dashboard] User not authorized. Initiating OAuth flow...');
        initiateOAuthFlow();
        return;
    }
    
    // 初始化数据管理器
    initializeDataManager();
    
    // 初始化事件监听器
    initializeEventListeners();
    
    // 设置默认日期范围（最近30天）
    setDefaultDateRange(30);
    
    // 加载数据
    loadDashboardData();
    
    console.log('[Dashboard] Initialization completed');
});

/**
 * 初始化数据管理器
 */
function initializeDataManager() {
    dataManager = new GA4DataManager();
    syncManager = new GA4SyncManager(dataManager);
    exporter = new GA4ExportManager(dataManager);
    
    // 获取GA4属性信息
    const propertyInfo = getGA4PropertyInfo();
    if (propertyInfo.propertyId) {
        dataManager.setPropertyInfo(propertyInfo.propertyId, propertyInfo.measurementId);
    }
    
    console.log('[Dashboard] Data manager initialized');
}

/**
 * 初始化事件监听器
 */
function initializeEventListeners() {
    // 导航栏按钮
    document.getElementById('sync-btn').addEventListener('click', handleSyncData);
    document.getElementById('settings-btn').addEventListener('click', handleSettings);
    document.getElementById('logout-btn').addEventListener('click', handleLogout);
    
    // 侧边栏菜单
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            switchTab(this.dataset.tab);
        });
    });
    
    // 日期范围选择
    document.getElementById('apply-filter-btn').addEventListener('click', handleApplyFilter);
    
    // 快速筛选按钮
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const days = parseInt(this.dataset.range);
            setDefaultDateRange(days);
            handleApplyFilter();
            
            // 更新按钮状态
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // 访客筛选
    document.getElementById('visitor-search').addEventListener('input', handleVisitorSearch);
    document.getElementById('country-filter').addEventListener('change', handleCountryFilter);
    
    // 分页
    document.getElementById('prev-page').addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            displayVisitorData();
        }
    });
    
    document.getElementById('next-page').addEventListener('click', () => {
        currentPage++;
        displayVisitorData();
    });
    
    console.log('[Dashboard] Event listeners initialized');
}

// ============================================================================
// 标签页管理
// ============================================================================

/**
 * 切换标签页
 * 
 * @param {string} tabName - 标签页名称
 */
function switchTab(tabName) {
    // 隐藏所有标签页
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // 显示选中的标签页
    const tabElement = document.getElementById(tabName + '-tab');
    if (tabElement) {
        tabElement.classList.add('active');
    }
    
    // 更新菜单项状态
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    
    // 如果是趋势分析标签页，重新绘制图表
    if (tabName === 'trends') {
        setTimeout(() => {
            redrawCharts();
        }, 100);
    }
    
    console.log('[Dashboard] Switched to tab:', tabName);
}

// ============================================================================
// 数据加载和显示
// ============================================================================

/**
 * 加载仪表板数据
 */
function loadDashboardData() {
    showLoading(true);
    
    try {
        // 从本地存储加载数据
        const visitors = dataManager.getVisitorsByDateRange(
            currentDateRange.startDate,
            currentDateRange.endDate
        );
        
        if (visitors.length === 0) {
            console.log('[Dashboard] No data found. Attempting to sync from GA4...');
            syncManager.syncData().then(result => {
                if (result.success) {
                    displayDashboardData();
                } else {
                    showNotification('无法同步数据，请检查授权状态', 'error');
                }
                showLoading(false);
            });
        } else {
            displayDashboardData();
            showLoading(false);
        }
    } catch (error) {
        console.error('[Dashboard] Error loading data:', error);
        showNotification('加载数据出错：' + error.message, 'error');
        showLoading(false);
    }
}

/**
 * 显示仪表板数据
 */
function displayDashboardData() {
    console.log('[Dashboard] Displaying dashboard data...');
    
    // 获取数据
    const visitors = dataManager.getVisitorsByDateRange(
        currentDateRange.startDate,
        currentDateRange.endDate
    );
    
    const events = dataManager.getEventsByDateRange(
        currentDateRange.startDate,
        currentDateRange.endDate
    );
    
    // 更新关键指标
    updateMetrics(visitors, events);
    
    // 更新图表
    updateCharts(visitors, events);
    
    // 更新访客表格
    displayVisitorData();
    
    // 更新统计列表
    updateStatsList();
    
    // 更新国家筛选器
    updateCountryFilter(visitors);
    
    // 更新同步状态
    updateSyncStatus();
    
    console.log('[Dashboard] Dashboard data displayed');
}

// ============================================================================
// 关键指标更新
// ============================================================================

/**
 * 更新关键指标卡片
 * 
 * @param {array} visitors - 访客数据
 * @param {array} events - 事件数据
 */
function updateMetrics(visitors, events) {
    // 访客统计
    const visitorStats = dataManager.getVisitorStats();
    document.getElementById('total-visitors').textContent = formatNumber(visitorStats.totalVisits);
    document.getElementById('unique-visitors').textContent = formatNumber(visitorStats.uniqueVisitors);
    
    // 事件统计
    const eventStats = dataManager.getEventStats();
    const searchCount = dataManager.getEventsByType('search').length;
    const clickCount = eventStats.totalEvents - searchCount;
    
    document.getElementById('search-count').textContent = formatNumber(searchCount);
    document.getElementById('click-count').textContent = formatNumber(clickCount);
    
    // 曝光率和转化率
    const exposureMetrics = dataManager.calculateExposureMetrics();
    document.getElementById('exposure-rate').textContent = exposureMetrics.exposurePerVisitor;
    document.getElementById('conversion-rate').textContent = exposureMetrics.conversionRate;
    
    console.log('[Dashboard] Metrics updated');
}

// ============================================================================
// 图表管理
// ============================================================================

/**
 * 更新所有图表
 * 
 * @param {array} visitors - 访客数据
 * @param {array} events - 事件数据
 */
function updateCharts(visitors, events) {
    // 访客趋势图
    updateVisitorTrendChart(visitors);
    
    // 访客来源分布图
    updateSourceDistributionChart();
    
    // 详细访客趋势图
    updateDetailedVisitorTrendChart(visitors);
    
    // 事件趋势图
    updateEventTrendChart(events);
    
    // 事件类型分布图
    updateEventTypeDistributionChart();
    
    // 国家分布图
    updateCountryDistributionChart();
    
    console.log('[Dashboard] Charts updated');
}

/**
 * 更新访客趋势图
 * 
 * @param {array} visitors - 访客数据
 */
function updateVisitorTrendChart(visitors) {
    const aggregated = dataManager.aggregateVisitorsByDate(
        currentDateRange.startDate,
        currentDateRange.endDate
    );
    
    const dates = Object.keys(aggregated).sort();
    const visitCounts = dates.map(date => aggregated[date].visitCount);
    const uniqueCounts = dates.map(date => aggregated[date].uniqueVisitorCount);
    
    const ctx = document.getElementById('visitor-trend-chart');
    if (!ctx) return;
    
    // 销毁旧图表
    if (chartInstances['visitor-trend']) {
        chartInstances['visitor-trend'].destroy();
    }
    
    chartInstances['visitor-trend'] = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [
                {
                    label: '访问次数',
                    data: visitCounts,
                    borderColor: '#667eea',
                    backgroundColor: 'rgba(102, 126, 234, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4
                },
                {
                    label: '唯一访客',
                    data: uniqueCounts,
                    borderColor: '#764ba2',
                    backgroundColor: 'rgba(118, 75, 162, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'top'
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

/**
 * 更新访客来源分布图
 */
function updateSourceDistributionChart() {
    const distribution = dataManager.getVisitorSourceDistribution();
    const labels = Object.keys(distribution);
    const data = Object.values(distribution);
    
    const ctx = document.getElementById('source-distribution-chart');
    if (!ctx) return;
    
    // 销毁旧图表
    if (chartInstances['source-distribution']) {
        chartInstances['source-distribution'].destroy();
    }
    
    chartInstances['source-distribution'] = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: [
                    '#667eea',
                    '#764ba2',
                    '#4CAF50',
                    '#FFC107',
                    '#f44336'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'right'
                }
            }
        }
    });
}

/**
 * 更新详细访客趋势图
 * 
 * @param {array} visitors - 访客数据
 */
function updateDetailedVisitorTrendChart(visitors) {
    const aggregated = dataManager.aggregateVisitorsByDate(
        currentDateRange.startDate,
        currentDateRange.endDate
    );
    
    const dates = Object.keys(aggregated).sort();
    const data = dates.map(date => aggregated[date].visitCount);
    
    const ctx = document.getElementById('detailed-visitor-trend-chart');
    if (!ctx) return;
    
    // 销毁旧图表
    if (chartInstances['detailed-visitor-trend']) {
        chartInstances['detailed-visitor-trend'].destroy();
    }
    
    chartInstances['detailed-visitor-trend'] = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: dates,
            datasets: [{
                label: '访问次数',
                data: data,
                backgroundColor: 'rgba(102, 126, 234, 0.7)',
                borderColor: '#667eea',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

/**
 * 更新事件趋势图
 * 
 * @param {array} events - 事件数据
 */
function updateEventTrendChart(events) {
    const aggregated = dataManager.aggregateEventsByDate(
        currentDateRange.startDate,
        currentDateRange.endDate
    );
    
    const dates = Object.keys(aggregated).sort();
    const data = dates.map(date => aggregated[date].eventCount);
    
    const ctx = document.getElementById('event-trend-chart');
    if (!ctx) return;
    
    // 销毁旧图表
    if (chartInstances['event-trend']) {
        chartInstances['event-trend'].destroy();
    }
    
    chartInstances['event-trend'] = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: '事件数',
                data: data,
                borderColor: '#4CAF50',
                backgroundColor: 'rgba(76, 175, 80, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

/**
 * 更新事件类型分布图
 */
function updateEventTypeDistributionChart() {
    const distribution = dataManager.aggregateEventsByType();
    const labels = Object.keys(distribution);
    const data = labels.map(type => distribution[type].count);
    
    const ctx = document.getElementById('event-type-distribution-chart');
    if (!ctx) return;
    
    // 销毁旧图表
    if (chartInstances['event-type-distribution']) {
        chartInstances['event-type-distribution'].destroy();
    }
    
    chartInstances['event-type-distribution'] = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: [
                    '#667eea',
                    '#764ba2',
                    '#4CAF50',
                    '#FFC107',
                    '#f44336',
                    '#2196F3'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'right'
                }
            }
        }
    });
}

/**
 * 更新国家分布图
 */
function updateCountryDistributionChart() {
    const distribution = dataManager.aggregateVisitorsByCountry();
    const entries = Object.entries(distribution)
        .sort((a, b) => b[1].visitCount - a[1].visitCount)
        .slice(0, 10); // 只显示前10个国家
    
    const labels = entries.map(e => e[1].country);
    const data = entries.map(e => e[1].visitCount);
    
    const ctx = document.getElementById('country-distribution-chart');
    if (!ctx) return;
    
    // 销毁旧图表
    if (chartInstances['country-distribution']) {
        chartInstances['country-distribution'].destroy();
    }
    
    chartInstances['country-distribution'] = new Chart(ctx, {
        type: 'horizontalBar',
        data: {
            labels: labels,
            datasets: [{
                label: '访问次数',
                data: data,
                backgroundColor: 'rgba(102, 126, 234, 0.7)',
                borderColor: '#667eea',
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    beginAtZero: true
                }
            }
        }
    });
}

/**
 * 重新绘制所有图表
 */
function redrawCharts() {
    const visitors = dataManager.getVisitorsByDateRange(
        currentDateRange.startDate,
        currentDateRange.endDate
    );
    
    const events = dataManager.getEventsByDateRange(
        currentDateRange.startDate,
        currentDateRange.endDate
    );
    
    updateCharts(visitors, events);
}

// ============================================================================
// 访客数据显示
// ============================================================================

/**
 * 显示访客数据表格
 */
function displayVisitorData() {
    const visitors = dataManager.getVisitorsByDateRange(
        currentDateRange.startDate,
        currentDateRange.endDate
    );
    
    if (visitors.length === 0) {
        document.getElementById('visitors-table-body').innerHTML = 
            '<tr class="empty-state"><td colspan="6">暂无访客数据</td></tr>';
        return;
    }
    
    // 计算分页
    const totalPages = Math.ceil(visitors.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageVisitors = visitors.slice(startIndex, endIndex);
    
    // 生成表格行
    const tbody = document.getElementById('visitors-table-body');
    tbody.innerHTML = pageVisitors.map(visitor => `
        <tr>
            <td>${visitor.date || '-'}</td>
            <td>${visitor.country || 'Unknown'}</td>
            <td>${visitor.activeUsers || 0}</td>
            <td>${visitor.sessions || 0}</td>
            <td>${visitor.pageViews || 0}</td>
            <td>
                <button class="btn-action" onclick="viewVisitorDetails('${visitor.id}')">详情</button>
            </td>
        </tr>
    `).join('');
    
    // 更新分页信息
    document.getElementById('page-info').textContent = `第 ${currentPage} 页 / 共 ${totalPages} 页`;
    document.getElementById('prev-page').disabled = currentPage === 1;
    document.getElementById('next-page').disabled = currentPage === totalPages;
}

/**
 * 查看访客详情
 * 
 * @param {string} visitorId - 访客ID
 */
function viewVisitorDetails(visitorId) {
    const visitor = dataManager.getVisitors().find(v => v.id === visitorId);
    if (visitor) {
        console.log('[Dashboard] Visitor details:', visitor);
        showNotification(`访客 ${visitor.country} - ${visitor.date} 的详情已加载`, 'info');
    }
}

// ============================================================================
// 统计列表显示
// ============================================================================

/**
 * 更新统计列表
 */
function updateStatsList() {
    // 搜索关键词
    updateSearchKeywordsList();
    
    // 产品点击
    updateProductClicksList();
    
    // 供应商互动
    updateSupplierClicksList();
}

/**
 * 更新搜索关键词列表
 */
function updateSearchKeywordsList() {
    const keywords = dataManager.getSearchKeywordStats();
    const list = document.getElementById('search-keywords-list');
    
    if (Object.keys(keywords).length === 0) {
        list.innerHTML = '<div class="empty-state">暂无搜索数据</div>';
        return;
    }
    
    const maxCount = Math.max(...Object.values(keywords));
    const html = Object.entries(keywords)
        .slice(0, 10)
        .map(([keyword, count]) => {
            const percentage = (count / maxCount) * 100;
            return `
                <div class="stat-item">
                    <span class="stat-item-label">${keyword}</span>
                    <span class="stat-item-value">${count}</span>
                    <div class="stat-item-bar">
                        <div class="stat-item-bar-fill" style="width: ${percentage}%"></div>
                    </div>
                </div>
            `;
        })
        .join('');
    
    list.innerHTML = html;
}

/**
 * 更新产品点击列表
 */
function updateProductClicksList() {
    const products = dataManager.getProductClickStats();
    const list = document.getElementById('product-clicks-list');
    
    if (Object.keys(products).length === 0) {
        list.innerHTML = '<div class="empty-state">暂无产品点击数据</div>';
        return;
    }
    
    const maxCount = Math.max(...Object.values(products));
    const html = Object.entries(products)
        .slice(0, 10)
        .map(([productKey, count]) => {
            const [productId, productName] = productKey.split('|');
            const percentage = (count / maxCount) * 100;
            return `
                <div class="stat-item">
                    <span class="stat-item-label">${productName}</span>
                    <span class="stat-item-value">${count}</span>
                    <div class="stat-item-bar">
                        <div class="stat-item-bar-fill" style="width: ${percentage}%"></div>
                    </div>
                </div>
            `;
        })
        .join('');
    
    list.innerHTML = html;
}

/**
 * 更新供应商互动列表
 */
function updateSupplierClicksList() {
    const suppliers = dataManager.getSupplierClickStats();
    const list = document.getElementById('supplier-clicks-list');
    
    if (Object.keys(suppliers).length === 0) {
        list.innerHTML = '<div class="empty-state">暂无供应商互动数据</div>';
        return;
    }
    
    const maxCount = Math.max(...Object.values(suppliers));
    const html = Object.entries(suppliers)
        .slice(0, 10)
        .map(([supplierKey, count]) => {
            const [supplierId, supplierName] = supplierKey.split('|');
            const percentage = (count / maxCount) * 100;
            return `
                <div class="stat-item">
                    <span class="stat-item-label">${supplierName}</span>
                    <span class="stat-item-value">${count}</span>
                    <div class="stat-item-bar">
                        <div class="stat-item-bar-fill" style="width: ${percentage}%"></div>
                    </div>
                </div>
            `;
        })
        .join('');
    
    list.innerHTML = html;
}

// ============================================================================
// 筛选和搜索
// ============================================================================

/**
 * 更新国家筛选器
 * 
 * @param {array} visitors - 访客数据
 */
function updateCountryFilter(visitors) {
    const countries = new Set(visitors.map(v => v.country).filter(c => c));
    const select = document.getElementById('country-filter');
    
    // 保存当前选中值
    const currentValue = select.value;
    
    // 清除现有选项（保留第一个）
    while (select.options.length > 1) {
        select.remove(1);
    }
    
    // 添加国家选项
    Array.from(countries).sort().forEach(country => {
        const option = document.createElement('option');
        option.value = country;
        option.textContent = country;
        select.appendChild(option);
    });
    
    // 恢复选中值
    select.value = currentValue;
}

/**
 * 处理访客搜索
 */
function handleVisitorSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    const visitors = dataManager.getVisitorsByDateRange(
        currentDateRange.startDate,
        currentDateRange.endDate
    );
    
    const filtered = visitors.filter(v => 
        (v.country || '').toLowerCase().includes(searchTerm)
    );
    
    currentPage = 1;
    displayFilteredVisitors(filtered);
}

/**
 * 处理国家筛选
 */
function handleCountryFilter(e) {
    const country = e.target.value;
    const visitors = dataManager.getVisitorsByDateRange(
        currentDateRange.startDate,
        currentDateRange.endDate
    );
    
    const filtered = country ? visitors.filter(v => v.country === country) : visitors;
    
    currentPage = 1;
    displayFilteredVisitors(filtered);
}

/**
 * 显示筛选后的访客
 * 
 * @param {array} visitors - 筛选后的访客数据
 */
function displayFilteredVisitors(visitors) {
    if (visitors.length === 0) {
        document.getElementById('visitors-table-body').innerHTML = 
            '<tr class="empty-state"><td colspan="6">未找到匹配的访客数据</td></tr>';
        document.getElementById('page-info').textContent = '第 0 页';
        return;
    }
    
    // 计算分页
    const totalPages = Math.ceil(visitors.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageVisitors = visitors.slice(startIndex, endIndex);
    
    // 生成表格行
    const tbody = document.getElementById('visitors-table-body');
    tbody.innerHTML = pageVisitors.map(visitor => `
        <tr>
            <td>${visitor.date || '-'}</td>
            <td>${visitor.country || 'Unknown'}</td>
            <td>${visitor.activeUsers || 0}</td>
            <td>${visitor.sessions || 0}</td>
            <td>${visitor.pageViews || 0}</td>
            <td>
                <button class="btn-action" onclick="viewVisitorDetails('${visitor.id}')">详情</button>
            </td>
        </tr>
    `).join('');
    
    // 更新分页信息
    document.getElementById('page-info').textContent = `第 ${currentPage} 页 / 共 ${totalPages} 页`;
    document.getElementById('prev-page').disabled = currentPage === 1;
    document.getElementById('next-page').disabled = currentPage === totalPages;
}

// ============================================================================
// 日期范围处理
// ============================================================================

/**
 * 设置默认日期范围
 * 
 * @param {number} days - 过去的天数
 */
function setDefaultDateRange(days) {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - days);
    
    currentDateRange.startDate = formatDateForInput(startDate);
    currentDateRange.endDate = formatDateForInput(endDate);
    
    document.getElementById('start-date').value = currentDateRange.startDate;
    document.getElementById('end-date').value = currentDateRange.endDate;
}

/**
 * 处理应用筛选
 */
function handleApplyFilter() {
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;
    
    if (!startDate || !endDate) {
        showNotification('请选择开始日期和结束日期', 'error');
        return;
    }
    
    if (startDate > endDate) {
        showNotification('开始日期不能晚于结束日期', 'error');
        return;
    }
    
    currentDateRange.startDate = startDate;
    currentDateRange.endDate = endDate;
    currentPage = 1;
    
    loadDashboardData();
}

// ============================================================================
// 操作处理
// ============================================================================

/**
 * 处理数据同步
 */
function handleSyncData() {
    showLoading(true);
    showNotification('正在同步数据...', 'info');
    
    syncManager.syncData().then(result => {
        showLoading(false);
        
        if (result.success) {
            showNotification('数据同步成功', 'success');
            displayDashboardData();
        } else {
            showNotification('数据同步失败：' + result.message, 'error');
        }
    }).catch(error => {
        showLoading(false);
        showNotification('同步出错：' + error.message, 'error');
    });
}

/**
 * 处理设置
 */
function handleSettings() {
    showNotification('设置功能开发中...', 'info');
}

/**
 * 处理登出
 */
function handleLogout() {
    if (confirm('确定要登出吗？')) {
        revokeAuthorization();
        clearAuthData();
        window.location.href = '/';
    }
}

// ============================================================================
// UI辅助函数
// ============================================================================

/**
 * 显示/隐藏加载指示器
 * 
 * @param {boolean} show - 是否显示
 */
function showLoading(show) {
    const indicator = document.getElementById('loading-indicator');
    if (show) {
        indicator.classList.add('active');
    } else {
        indicator.classList.remove('active');
    }
}

/**
 * 显示通知消息
 * 
 * @param {string} message - 消息文本
 * @param {string} type - 消息类型 (success, error, info)
 */
function showNotification(message, type = 'info') {
    const notification = document.getElementById('notification');
    const text = document.getElementById('notification-text');
    
    text.textContent = message;
    notification.className = `notification ${type} active`;
    
    // 3秒后自动关闭
    setTimeout(() => {
        closeNotification();
    }, 3000);
}

/**
 * 关闭通知消息
 */
function closeNotification() {
    const notification = document.getElementById('notification');
    notification.classList.remove('active');
}

/**
 * 更新同步状态
 */
function updateSyncStatus() {
    const status = syncManager.getSyncStatus();
    const statusText = document.getElementById('sync-status-text');
    const lastSyncTime = document.getElementById('last-sync-time');
    
    if (status.isSyncing) {
        statusText.textContent = '正在同步...';
    } else if (status.lastSyncTime) {
        statusText.textContent = '已同步';
        lastSyncTime.textContent = `最后同步：${formatDateTime(status.lastSyncTime)}`;
    } else {
        statusText.textContent = '准备就绪';
        lastSyncTime.textContent = '未同步';
    }
}

// ============================================================================
// 格式化函数
// ============================================================================

/**
 * 格式化数字
 * 
 * @param {number} num - 数字
 * @returns {string} 格式化后的数字
 */
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * 格式化日期为输入框格式
 * 
 * @param {Date} date - 日期对象
 * @returns {string} YYYY-MM-DD格式的日期字符串
 */
function formatDateForInput(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

/**
 * 格式化日期时间
 * 
 * @param {string} dateTimeString - ISO格式的日期时间字符串
 * @returns {string} 格式化后的日期时间
 */
function formatDateTime(dateTimeString) {
    const date = new Date(dateTimeString);
    return date.toLocaleString('zh-CN');
}

// ============================================================================
// 页面卸载处理
// ============================================================================

/**
 * 页面卸载时清理资源
 */
window.addEventListener('beforeunload', function() {
    // 停止自动同步
    if (syncManager) {
        syncManager.stopAutoSync();
    }
    
    // 销毁所有图表
    Object.values(chartInstances).forEach(chart => {
        if (chart) {
            chart.destroy();
        }
    });
});

console.log('[Dashboard] Script loaded successfully');



// ============================================================================
// 导出功能处理
// ============================================================================

/**
 * 处理导出菜单切换
 */
function handleExportMenuToggle() {
    const exportMenu = document.getElementById('export-menu');
    exportMenu.classList.toggle('active');
}

/**
 * 处理导出操作
 * 
 * @param {string} type - 导出类型
 */
function handleExport(type) {
    showLoading(true);
    const exportMenu = document.getElementById('export-menu');
    exportMenu.classList.remove('active');
    
    const startDate = currentDateRange.startDate;
    const endDate = currentDateRange.endDate;
    
    try {
        switch(type) {
            case 'visitors':
                exporter.exportVisitors(startDate, endDate).then(() => {
                    showLoading(false);
                    showNotification('访客数据导出成功', 'success');
                }).catch(error => {
                    showLoading(false);
                    showNotification('导出失败: ' + error.message, 'error');
                });
                break;
                
            case 'events':
                exporter.exportEvents(startDate, endDate).then(() => {
                    showLoading(false);
                    showNotification('事件数据导出成功', 'success');
                }).catch(error => {
                    showLoading(false);
                    showNotification('导出失败: ' + error.message, 'error');
                });
                break;
                
            case 'report':
                exporter.exportReport(startDate, endDate).then(() => {
                    showLoading(false);
                    showNotification('综合报告导出成功', 'success');
                }).catch(error => {
                    showLoading(false);
                    showNotification('导出失败: ' + error.message, 'error');
                });
                break;
                
            case 'keywords':
                exporter.exportSearchKeywords().then(() => {
                    showLoading(false);
                    showNotification('搜索关键词导出成功', 'success');
                }).catch(error => {
                    showLoading(false);
                    showNotification('导出失败: ' + error.message, 'error');
                });
                break;
                
            case 'products':
                exporter.exportProductClicks().then(() => {
                    showLoading(false);
                    showNotification('产品点击数据导出成功', 'success');
                }).catch(error => {
                    showLoading(false);
                    showNotification('导出失败: ' + error.message, 'error');
                });
                break;
                
            case 'suppliers':
                exporter.exportSupplierClicks().then(() => {
                    showLoading(false);
                    showNotification('供应商互动数据导出成功', 'success');
                }).catch(error => {
                    showLoading(false);
                    showNotification('导出失败: ' + error.message, 'error');
                });
                break;
                
            default:
                showLoading(false);
                showNotification('未知的导出类型', 'error');
        }
    } catch (error) {
        showLoading(false);
        showNotification('导出出错: ' + error.message, 'error');
    }
}

/**
 * 在initializeEventListeners中添加导出按钮事件监听
 * (此代码应该在initializeEventListeners函数中调用)
 */
function setupExportEventListeners() {
    document.getElementById('export-btn').addEventListener('click', handleExportMenuToggle);
    document.getElementById('export-visitors-btn').addEventListener('click', function() { handleExport('visitors'); });
    document.getElementById('export-events-btn').addEventListener('click', function() { handleExport('events'); });
    document.getElementById('export-report-btn').addEventListener('click', function() { handleExport('report'); });
    document.getElementById('export-keywords-btn').addEventListener('click', function() { handleExport('keywords'); });
    document.getElementById('export-products-btn').addEventListener('click', function() { handleExport('products'); });
    document.getElementById('export-suppliers-btn').addEventListener('click', function() { handleExport('suppliers'); });
    
    document.addEventListener('click', function(e) {
        const exportMenu = document.getElementById('export-menu');
        const exportBtn = document.getElementById('export-btn');
        if (!exportMenu.contains(e.target) && !exportBtn.contains(e.target)) {
            exportMenu.classList.remove('active');
        }
    });
}

// 在页面加载时调用导出事件监听器设置
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        setupExportEventListeners();
    }, 100);
});




// ============================================================================
// 留存分析和转化漏斗分析函数
// ============================================================================

/**
 * 初始化留存分析
 */
function initializeRetentionAnalysis() {
    console.log('[Dashboard] Initializing retention analysis...');
    
    // 创建留存分析器实例
    if (typeof GA4RetentionFunnelAnalyzer !== 'undefined') {
        const analyzer = new GA4RetentionFunnelAnalyzer(dataManager);
        
        // 计算留存指标
        const retentionMetrics = analyzer.calculateRetentionAnalysis(currentDateRange.startDate, currentDateRange.endDate);
        
        // 更新留存指标卡片
        document.getElementById('retention-new-users').textContent = retentionMetrics.totalNewUsers;
        document.getElementById('retention-day1').textContent = retentionMetrics.day1Retention + '%';
        document.getElementById('retention-day7').textContent = retentionMetrics.day7Retention + '%';
        document.getElementById('retention-day30').textContent = retentionMetrics.day30Retention + '%';
        
        // 渲染留存曲线图
        renderRetentionCurveChart(retentionMetrics);
        
        // 显示留存队列表
        displayRetentionCohorts(retentionMetrics.retentionCohorts);
    }
}

/**
 * 渲染留存曲线图
 */
function renderRetentionCurveChart(retentionMetrics) {
    const ctx = document.getElementById('retention-curve-chart');
    if (!ctx) return;
    
    // 销毁旧图表
    if (chartInstances['retention-curve']) {
        chartInstances['retention-curve'].destroy();
    }
    
    const labels = ['Day 0', 'Day 1', 'Day 7', 'Day 30'];
    const data = [
        100,
        parseFloat(retentionMetrics.day1Retention),
        parseFloat(retentionMetrics.day7Retention),
        parseFloat(retentionMetrics.day30Retention)
    ];
    
    chartInstances['retention-curve'] = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: '用户留存率 (%)',
                data: data,
                borderColor: '#667eea',
                backgroundColor: 'rgba(102, 126, 234, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4,
                pointRadius: 5,
                pointBackgroundColor: '#667eea',
                pointBorderColor: '#fff',
                pointBorderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            }
        }
    });
}

/**
 * 显示留存队列表
 */
function displayRetentionCohorts(cohorts) {
    const tbody = document.getElementById('retention-cohorts-body');
    if (!tbody) return;
    
    if (cohorts.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="empty-state">暂无数据</td></tr>';
        return;
    }
    
    tbody.innerHTML = cohorts.map(cohort => `
        <tr>
            <td>${cohort.date}</td>
            <td>${cohort.day0}</td>
            <td>${cohort.day1} (${cohort.day1Rate}%)</td>
            <td>${cohort.day7} (${cohort.day7Rate}%)</td>
            <td>${cohort.day14} (${cohort.day14Rate}%)</td>
            <td>${cohort.day30} (${cohort.day30Rate}%)</td>
        </tr>
    `).join('');
}

/**
 * 初始化转化漏斗分析
 */
function initializeConversionFunnelAnalysis() {
    console.log('[Dashboard] Initializing conversion funnel analysis...');
    
    // 创建漏斗分析器实例
    if (typeof GA4RetentionFunnelAnalyzer !== 'undefined') {
        const analyzer = new GA4RetentionFunnelAnalyzer(dataManager);
        
        // 计算转化漏斗
        const funnelData = analyzer.calculateConversionFunnel(currentDateRange.startDate, currentDateRange.endDate);
        const funnelSummary = analyzer.getFunnelSummary();
        
        // 更新漏斗指标卡片
        document.getElementById('funnel-total-visitors').textContent = funnelSummary.totalVisitors;
        document.getElementById('funnel-overall-rate').textContent = funnelSummary.overallConversionRate + '%';
        
        if (funnelSummary.topDropoffPoint) {
            document.getElementById('funnel-top-dropoff').textContent = funnelSummary.topDropoffPoint.step;
        }
        
        // 渲染转化漏斗图
        renderConversionFunnelChart(funnelData);
        
        // 显示漏斗详情
        displayFunnelDetails(funnelData);
        
        // 显示按产品分类的转化率
        displayProductFunnelData(analyzer.calculateFunnelByProduct(currentDateRange.startDate, currentDateRange.endDate));
    }
}

/**
 * 渲染转化漏斗图
 */
function renderConversionFunnelChart(funnelData) {
    const ctx = document.getElementById('conversion-funnel-chart');
    if (!ctx) return;
    
    // 销毁旧图表
    if (chartInstances['conversion-funnel']) {
        chartInstances['conversion-funnel'].destroy();
    }
    
    const labels = funnelData.steps.map(step => step.name);
    const data = funnelData.steps.map(step => step.users);
    const colors = ['#667eea', '#764ba2', '#f44336'];
    
    chartInstances['conversion-funnel'] = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: '用户数',
                data: data,
                backgroundColor: colors,
                borderColor: colors,
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                }
            },
            scales: {
                x: {
                    beginAtZero: true
                }
            }
        }
    });
}

/**
 * 显示漏斗详情
 */
function displayFunnelDetails(funnelData) {
    const container = document.getElementById('funnel-details');
    if (!container) return;
    
    if (funnelData.steps.length === 0) {
        container.innerHTML = '<div class="empty-state">暂无数据</div>';
        return;
    }
    
    container.innerHTML = funnelData.steps.map((step, index) => `
        <div class="funnel-step">
            <div class="funnel-step-name">${step.name}</div>
            <div class="funnel-step-value">${step.users}</div>
            <div class="funnel-step-rate">
                ${index === 0 ? '100%' : step.percentage + '%'} 转化率
            </div>
        </div>
    `).join('');
}

/**
 * 显示按产品分类的转化率
 */
function displayProductFunnelData(productFunnelData) {
    const tbody = document.getElementById('product-funnel-body');
    if (!tbody) return;
    
    if (productFunnelData.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="empty-state">暂无数据</td></tr>';
        return;
    }
    
    tbody.innerHTML = productFunnelData.slice(0, 20).map(product => `
        <tr>
            <td>${product.productName}</td>
            <td>${product.exposures}</td>
            <td>${product.clicks}</td>
            <td>${product.quoteRequests}</td>
            <td>${product.clickThroughRate}%</td>
            <td>${product.conversionRate}%</td>
        </tr>
    `).join('');
}

/**
 * 更新所有分析数据
 */
function updateAllAnalysis() {
    console.log('[Dashboard] Updating all analysis...');
    
    // 更新留存分析
    const retentionTab = document.getElementById('retention-tab');
    if (retentionTab && retentionTab.classList.contains('active')) {
        initializeRetentionAnalysis();
    }
    
    // 更新转化漏斗分析
    const funnelTab = document.getElementById('funnel-tab');
    if (funnelTab && funnelTab.classList.contains('active')) {
        initializeConversionFunnelAnalysis();
    }
}

// 在标签页切换时更新分析
document.addEventListener('DOMContentLoaded', function() {
    // 添加标签页切换事件监听
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const tabName = this.getAttribute('data-tab');
            
            // 延迟更新，确保DOM已更新
            setTimeout(() => {
                if (tabName === 'retention') {
                    initializeRetentionAnalysis();
                } else if (tabName === 'funnel') {
                    initializeConversionFunnelAnalysis();
                }
            }, 100);
        });
    });
});

