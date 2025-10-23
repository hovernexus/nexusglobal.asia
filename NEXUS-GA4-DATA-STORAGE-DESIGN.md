# NEXUS平台 GA4数据存储与处理方案设计文档

## 概述

本文档详细说明NEXUS平台如何存储、管理和处理来自Google Analytics (GA4)的数据。由于NEXUS是一个静态网站，无法使用传统的后端数据库，因此采用了以下混合方案：

1.  **本地存储（localStorage）**：用于缓存GA4数据，提高访问速度
2.  **GA4 Reporting API**：用于获取最新的分析数据
3.  **内存数据结构**：用于实时数据处理和聚合

## 1. 数据存储架构

### 1.1 存储层次

```
┌─────────────────────────────────────────────────────┐
│           用户界面层（前端页面）                      │
├─────────────────────────────────────────────────────┤
│         数据展示和交互层（JavaScript）               │
│  - 供应商数据看板                                    │
│  - 数据表格和图表                                    │
├─────────────────────────────────────────────────────┤
│         数据处理层（GA4DataManager）                 │
│  - 数据聚合                                          │
│  - 数据分析                                          │
│  - 报告生成                                          │
├─────────────────────────────────────────────────────┤
│         数据同步层（GA4SyncManager）                 │
│  - 与GA4 API同步                                    │
│  - 数据转换和清洗                                    │
├─────────────────────────────────────────────────────┤
│         本地存储层（localStorage）                   │
│  - 访客数据缓存                                      │
│  - 事件数据缓存                                      │
│  - 元数据存储                                        │
├─────────────────────────────────────────────────────┤
│         授权层（GA4OAuthManager）                    │
│  - OAuth令牌管理                                    │
│  - API认证                                          │
├─────────────────────────────────────────────────────┤
│         外部API层（Google Analytics）                │
│  - GA4 Reporting API                               │
│  - GA4 Admin API                                    │
└─────────────────────────────────────────────────────┘
```

### 1.2 数据流向

```
Google Analytics (GA4)
    ↓
GA4 Reporting API
    ↓
GA4SyncManager (数据转换和清洗)
    ↓
GA4DataManager (数据聚合和分析)
    ↓
localStorage (本地缓存)
    ↓
前端页面 (数据展示)
```

## 2. 数据模型设计

### 2.1 访客数据模型

访客数据代表来自GA4的用户访问信息。

```javascript
{
    id: "visitor_2025-10-23_United States_abc123def",  // 唯一标识符
    date: "2025-10-23",                                 // 访问日期
    country: "United States",                           // 访问国家
    activeUsers: 42,                                    // 活跃用户数
    sessions: 58,                                       // 会话数
    pageViews: 156,                                     // 页面浏览数
    source: "ga4",                                      // 数据来源
    timestamp: "2025-10-23T10:30:00.000Z"              // 记录时间
}
```

### 2.2 事件数据模型

事件数据代表用户在NEXUS平台上执行的特定操作。

```javascript
{
    id: "event_product_click_2025-10-23_xyz789",       // 唯一标识符
    eventType: "product_click",                         // 事件类型
    eventName: "select_item",                           // GA4事件名称
    date: "2025-10-23",                                 // 事件日期
    eventCount: 15,                                     // 事件发生次数
    eventValue: 0,                                      // 事件值（可选）
    source: "ga4",                                      // 数据来源
    timestamp: "2025-10-23T10:30:00.000Z"              // 记录时间
}
```

### 2.3 聚合数据模型

聚合数据是对原始数据的汇总和分析结果。

```javascript
{
    // 按日期聚合
    "2025-10-23": {
        date: "2025-10-23",
        visitCount: 156,
        uniqueVisitorCount: 42
    },
    
    // 按国家聚合
    "United States": {
        country: "United States",
        visitCount: 89,
        uniqueVisitorCount: 28
    },
    
    // 按事件类型聚合
    "product_click": {
        eventType: "product_click",
        count: 245,
        details: [...]
    }
}
```

## 3. 存储实现细节

### 3.1 localStorage存储结构

所有数据都存储在一个JSON对象中，键名为 `nexus_ga4_data`：

```javascript
localStorage['nexus_ga4_data'] = {
    visitors: [
        { id: "...", date: "...", ... },
        { id: "...", date: "...", ... },
        ...
    ],
    events: [
        { id: "...", eventType: "...", ... },
        { id: "...", eventType: "...", ... },
        ...
    ],
    aggregations: {
        byDate: { ... },
        byCountry: { ... },
        byEventType: { ... }
    },
    metadata: {
        lastUpdated: "2025-10-23T10:30:00.000Z",
        propertyId: "123456789",
        measurementId: "G-XXXXXXXXXX"
    }
}
```

### 3.2 存储限制和优化

**localStorage限制**：
- 大多数浏览器限制localStorage大小为5-10MB
- NEXUS平台预计存储的数据量（30天）约为500KB-1MB，在限制范围内

**优化策略**：
1.  **数据压缩**：定期删除超过90天的数据
2.  **增量同步**：只同步新增数据，避免重复
3.  **分页存储**：如果数据量过大，可以分页存储
4.  **索引优化**：为常用查询字段建立索引

### 3.3 缓存策略

**缓存过期时间**：
- 默认缓存过期时间：1小时（3600000毫秒）
- 用户可以手动刷新数据
- 自动同步间隔：1小时

**缓存更新流程**：
```
检查缓存是否过期
    ↓
如果未过期，使用本地缓存
    ↓
如果已过期，调用GA4 API获取新数据
    ↓
更新localStorage
    ↓
更新内存数据结构
```

## 4. 数据同步机制

### 4.1 同步流程

```
启动自动同步
    ↓
检查授权状态
    ↓
获取GA4属性信息
    ↓
确定日期范围（最近30天）
    ↓
同步访客数据
    ↓
同步事件数据
    ↓
处理和转换数据
    ↓
更新本地存储
    ↓
更新内存数据结构
    ↓
完成同步
```

### 4.2 错误处理和重试

如果同步失败，系统将自动重试：

```javascript
const retryAttempts = 3;      // 最多重试3次
const retryDelay = 5000;      // 每次重试间隔5秒

// 重试逻辑
for (let i = 0; i < retryAttempts; i++) {
    try {
        await syncData();
        break; // 成功则退出循环
    } catch (error) {
        if (i < retryAttempts - 1) {
            await sleep(retryDelay);
        } else {
            throw error; // 所有重试都失败
        }
    }
}
```

## 5. 数据处理和聚合

### 5.1 数据聚合方法

GA4DataManager提供了以下聚合方法：

| 方法名 | 描述 | 返回值 |
|---|---|---|
| `aggregateVisitorsByDate()` | 按日期聚合访客数据 | 按日期分组的访客统计 |
| `aggregateVisitorsByCountry()` | 按国家聚合访客数据 | 按国家分组的访客统计 |
| `aggregateEventsByType()` | 按事件类型聚合事件数据 | 按事件类型分组的事件统计 |
| `aggregateEventsByDate()` | 按日期聚合事件数据 | 按日期分组的事件统计 |
| `calculateExposureMetrics()` | 计算曝光率指标 | 曝光率统计对象 |
| `getSearchKeywordStats()` | 获取搜索关键词统计 | 关键词及其出现次数 |
| `getProductClickStats()` | 获取产品点击统计 | 产品及其点击次数 |
| `getSupplierClickStats()` | 获取供应商点击统计 | 供应商及其点击次数 |

### 5.2 数据分析指标

NEXUS平台计算以下关键指标：

**访客指标**：
- 总访问次数（Total Visits）
- 唯一访客数（Unique Visitors）
- 平均每个访客的访问次数（Average Visits Per Visitor）

**事件指标**：
- 总事件数（Total Events）
- 事件类型分布（Event Type Distribution）
- 特定事件的统计（Event-Specific Stats）

**曝光指标**：
- 总曝光次数（Total Exposures）
- 每个访客的平均曝光次数（Exposure Per Visitor）
- 转化率（Conversion Rate）

**来源指标**：
- 访客来源分布（Visitor Source Distribution）
- 按国家分布（Distribution by Country）
- 按日期分布（Distribution by Date）

### 5.3 报告生成

`generateReport()` 方法生成综合数据报告，包含：

```javascript
{
    period: {
        startDate: "2025-09-23",
        endDate: "2025-10-23",
        generatedAt: "2025-10-23T10:30:00.000Z"
    },
    visitorStats: { ... },
    eventStats: { ... },
    exposureMetrics: { ... },
    visitorsByDate: { ... },
    visitorsByCountry: { ... },
    eventsByDate: { ... },
    eventsByType: { ... },
    visitorSourceDistribution: { ... },
    searchKeywords: { ... },
    productClicks: { ... },
    supplierClicks: { ... }
}
```

## 6. 数据安全和隐私

### 6.1 数据安全措施

1.  **OAuth 2.0认证**：所有GA4 API调用都需要有效的OAuth令牌
2.  **令牌管理**：令牌存储在localStorage中，自动刷新过期令牌
3.  **HTTPS传输**：所有API调用都通过HTTPS进行
4.  **CORS限制**：GA4 API仅允许来自授权域的请求

### 6.2 隐私保护

1.  **数据最小化**：只收集必要的数据
2.  **匿名化**：访客ID是匿名生成的，不包含个人信息
3.  **数据删除**：用户可以随时清除本地数据
4.  **授权撤销**：用户可以随时撤销NEXUS平台的授权

## 7. 使用示例

### 7.1 初始化和配置

```javascript
// 创建数据管理器
const dataManager = new GA4DataManager();

// 设置GA4属性信息
dataManager.setPropertyInfo('123456789', 'G-XXXXXXXXXX');

// 创建同步管理器
const syncManager = new GA4SyncManager(dataManager);

// 启动自动同步
syncManager.startAutoSync();
```

### 7.2 获取数据

```javascript
// 获取所有访客数据
const visitors = dataManager.getVisitors();

// 获取特定日期范围的访客数据
const visitorsInRange = dataManager.getVisitorsByDateRange('2025-10-01', '2025-10-23');

// 获取特定国家的访客数据
const usVisitors = dataManager.getVisitorsByCountry('United States');

// 获取访客统计
const stats = dataManager.getVisitorStats();
```

### 7.3 数据聚合和分析

```javascript
// 按日期聚合访客数据
const visitorsByDate = dataManager.aggregateVisitorsByDate('2025-10-01', '2025-10-23');

// 按国家聚合访客数据
const visitorsByCountry = dataManager.aggregateVisitorsByCountry();

// 获取搜索关键词统计
const keywords = dataManager.getSearchKeywordStats();

// 获取产品点击统计
const productClicks = dataManager.getProductClickStats();

// 计算曝光率指标
const exposureMetrics = dataManager.calculateExposureMetrics();
```

### 7.4 报告生成和导出

```javascript
// 生成综合报告
const report = dataManager.generateReport('2025-10-01', '2025-10-23');

// 导出为JSON
const jsonReport = dataManager.exportReportAsJSON(report);

// 导出为Excel（需要额外的导出脚本）
// const excelReport = exportToExcel(report);
```

## 8. 性能考虑

### 8.1 查询性能

- **线性搜索**：当前实现使用线性搜索，适合数据量较小的情况
- **索引优化**：如果数据量增加，可以添加索引以提高查询速度
- **分页查询**：对于大型数据集，可以实现分页查询

### 8.2 内存使用

- **数据去重**：定期检查并删除重复数据
- **增量加载**：只在需要时加载数据
- **垃圾回收**：定期清理过期数据

### 8.3 网络性能

- **请求合并**：尽可能合并多个API请求
- **缓存利用**：充分利用localStorage缓存
- **异步处理**：所有网络请求都是异步的，不阻塞UI

## 9. 扩展和维护

### 9.1 添加新的数据源

如果需要添加其他数据源（如自定义API），可以：

1.  创建新的数据转换函数
2.  在GA4SyncManager中添加新的同步方法
3.  在GA4DataManager中添加相应的查询和聚合方法

### 9.2 添加新的聚合方法

```javascript
// 在GA4DataManager中添加新的聚合方法
aggregateByCustomDimension(dimension) {
    const aggregation = {};
    this.data.visitors.forEach(visitor => {
        const key = visitor[dimension] || 'Unknown';
        if (!aggregation[key]) {
            aggregation[key] = { count: 0, details: [] };
        }
        aggregation[key].count++;
        aggregation[key].details.push(visitor);
    });
    return aggregation;
}
```

## 10. 故障排除

### 常见问题

**Q: 数据为什么没有更新？**
A: 检查以下几点：
- 是否已完成OAuth授权
- GA4属性信息是否正确配置
- 是否启动了自动同步
- 缓存是否已过期

**Q: localStorage存储空间不足怎么办？**
A: 可以：
- 减少缓存数据的时间范围
- 定期清除过期数据
- 实现数据分页存储

**Q: 如何调试数据同步问题？**
A: 检查浏览器控制台的日志：
- 查看GA4SyncManager的日志信息
- 检查网络请求是否成功
- 验证OAuth令牌是否有效

---

## 版本历史

*   **v1.0** (2025-10-23)：初始版本，包含完整的数据存储和处理方案设计。

---

## 相关文件

- `nexus-ga4-data-manager.js`：数据管理器实现
- `nexus-ga4-sync.js`：数据同步管理器实现
- `nexus-ga4-oauth.js`：OAuth授权管理器实现
- `nexus-ga4-tracker.js`：事件追踪脚本实现
