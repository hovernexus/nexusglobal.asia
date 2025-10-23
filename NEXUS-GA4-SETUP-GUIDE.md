# NEXUS平台 Google Analytics (GA4) 集成指南

## 概述

本指南说明如何在NEXUS平台中集成Google Analytics (GA4)，以实现访客追踪和数据分析功能。采用**方案A（供应商授权）**，即供应商在自己的Google账号下创建GA4属性，并授权NEXUS平台通过OAuth 2.0访问其Reporting API。

## 目录

1. [供应商侧：GA4属性创建与授权](#供应商侧ga4属性创建与授权)
2. [NEXUS平台侧：GA4集成](#nexus平台侧ga4集成)
3. [事件追踪说明](#事件追踪说明)
4. [数据看板访问](#数据看板访问)
5. [常见问题](#常见问题)

---

## 供应商侧：GA4属性创建与授权

### 步骤1：创建Google Analytics账户（如果尚未创建）

1.  访问 [Google Analytics官网](https://analytics.google.com/)
2.  使用Google账号登录（或创建新账号）
3.  点击"开始测量"按钮

### 步骤2：创建GA4属性

1.  在Google Analytics中，点击左下角的"管理"（Admin）
2.  在"属性"列中，点击"创建属性"
3.  填写以下信息：
    *   **属性名称**：例如 "NEXUS Global - [您的公司名称]"
    *   **报告时区**：选择您所在的时区
    *   **货币**：选择您的主要交易货币
4.  点击"创建"

### 步骤3：创建数据流（Web Stream）

1.  在新创建的GA4属性中，点击"数据流"
2.  选择"Web"作为数据流类型
3.  填写以下信息：
    *   **网站URL**：输入NEXUS平台的网址（例如 `https://nexusglobal.asia`）
    *   **流名称**：例如 "NEXUS Global Website"
4.  点击"创建流"
5.  系统将生成一个**测量ID**（格式为 `G-XXXXXXXXXX`），请妥善保管此ID

### 步骤4：获取GA4测量ID

1.  在数据流创建完成后，您将看到测量ID和Google标签管理器代码
2.  复制**测量ID**（格式为 `G-XXXXXXXXXX`）
3.  将此ID提供给NEXUS平台管理员

### 步骤5：授权NEXUS平台访问GA4数据

为了让NEXUS平台能够访问您的GA4数据并生成数据看板，您需要授权NEXUS应用程序。

#### 方式A：通过Google Cloud Console（推荐）

1.  访问 [Google Cloud Console](https://console.cloud.google.com/)
2.  创建或选择一个项目
3.  启用以下API：
    *   Google Analytics Reporting API
    *   Google Analytics Admin API
4.  创建一个OAuth 2.0客户端ID（Web应用）
5.  在授权的重定向URI中添加：`https://nexusglobal.asia/ga4-callback`（或NEXUS平台的实际回调URL）
6.  获取客户端ID和客户端密钥，提供给NEXUS平台管理员

#### 方式B：通过Google Analytics UI（简化方式）

1.  在Google Analytics中，点击"管理" > "属性设置"
2.  向下滚动到"数据API"部分
3.  点击"启用Google Analytics API"
4.  按照指示完成授权流程
5.  系统将为您生成一个授权令牌，提供给NEXUS平台管理员

### 步骤6：配置GA4事件

为了确保NEXUS平台能够正确追踪用户行为，您可以在GA4中预先配置以下事件：

*   `product_click`：用户点击产品
*   `product_detail_view`：用户查看产品详情
*   `search`：用户执行搜索
*   `supplier_page_view`：用户访问供应商页面
*   `supplier_click`：用户点击供应商链接
*   `ai_consultant_usage`：用户使用AI顾问
*   `equipment_configurator`：用户使用设备配置器
*   `quote_request`：用户请求报价
*   `contact_supplier`：用户联系供应商

这些事件将由NEXUS平台自动发送，您无需手动配置。

---

## NEXUS平台侧：GA4集成

### 步骤1：在HTML页面中添加GA4初始化代码

在NEXUS网站的所有需要追踪的HTML页面的 `<head>` 标签中添加以下代码：

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-XXXXXXXXXX'); // 替换为您的GA4测量ID
</script>
```

**注意**：将 `G-XXXXXXXXXX` 替换为您的实际GA4测量ID。

### 步骤2：在HTML页面中引入GA4追踪脚本

在HTML页面的 `<body>` 底部添加以下代码：

```html
<!-- NEXUS GA4 Tracker -->
<script src="nexus-ga4-tracker.js"></script>
```

### 步骤3：在关键页面中添加GA4初始化

确保以下页面都包含GA4初始化代码和追踪脚本：

*   `index.html`（主页）
*   `nexus-v14.2-equipment-configurator.html`（AI设备配置器）
*   `category-feeding-palletizing-v14.2.html`（产品分类页面）
*   `product-detail.html`（产品详情页）
*   `company-detail.html`（供应商详情页）
*   `ai-consultation-system.html`（AI智能顾问）

### 步骤4：在JavaScript代码中调用追踪函数

在需要追踪用户行为的地方，调用相应的追踪函数。例如：

#### 追踪产品点击

```javascript
// 当用户点击产品时
const productLink = document.createElement('a');
productLink.href = `product-detail.html?id=${product.id}`;
productLink.onclick = () => {
    trackProductClick(product.id, product.name, product.supplier, product.category, product.price);
};
```

#### 追踪搜索

```javascript
// 当用户执行搜索时
function handleSearch(searchTerm) {
    const results = performSearch(searchTerm);
    trackSearch(searchTerm, results.length, { /* 搜索过滤器 */ });
}
```

#### 追踪供应商页面访问

```javascript
// 在supplier-detail.html或company-detail.html页面加载时
window.addEventListener('load', () => {
    const supplierId = getSupplierIdFromURL();
    const supplierName = getSupplierNameFromPage();
    trackSupplierPageView(supplierId, supplierName);
});
```

#### 追踪报价请求

```javascript
// 当用户点击"请求报价"按钮时
document.getElementById('quote-button').addEventListener('click', () => {
    trackQuoteRequest(productId, productName, supplierId, supplierName);
    // 继续处理报价请求逻辑
});
```

---

## 事件追踪说明

### 预定义事件

NEXUS GA4追踪脚本提供了以下预定义事件追踪函数：

| 函数名 | 描述 | 参数 |
|---|---|---|
| `trackProductClick()` | 追踪产品点击 | productId, productName, supplierName, category, price |
| `trackProductDetailView()` | 追踪产品详情页浏览 | productId, productName, supplierName, category |
| `trackSearch()` | 追踪搜索 | searchTerm, resultCount, filters |
| `trackSupplierPageView()` | 追踪供应商页面浏览 | supplierId, supplierName, country |
| `trackSupplierClick()` | 追踪供应商点击 | supplierId, supplierName, actionType |
| `trackAIConsultantUsage()` | 追踪AI顾问使用 | moduleId, moduleName, actionType |
| `trackEquipmentConfigurator()` | 追踪设备配置器使用 | actionType, configData |
| `trackQuoteRequest()` | 追踪报价请求 | productId, productName, supplierId, supplierName |
| `trackContactSupplier()` | 追踪联系供应商 | supplierId, supplierName, contactMethod |
| `trackCategoryView()` | 追踪分类页面浏览 | categoryId, categoryName |

### 自定义事件

如果需要追踪不在上述列表中的事件，可以使用 `trackCustomEvent()` 函数：

```javascript
trackCustomEvent('custom_event_name', {
    'custom_param_1': 'value1',
    'custom_param_2': 'value2'
});
```

---

## 数据看板访问

### 在Google Analytics中查看数据

1.  登录 [Google Analytics](https://analytics.google.com/)
2.  选择您创建的GA4属性
3.  在左侧菜单中，您可以查看：
    *   **实时报告**：实时用户活动
    *   **获取**：用户流量来源
    *   **互动**：用户与网站的交互
    *   **转化**：转化事件（报价请求、联系供应商等）

### 在NEXUS平台中查看数据看板

NEXUS平台将提供一个专门的供应商数据看板页面，展示：

*   **访客识别**：访问过您网站的用户列表
*   **站点数据统计**：访客数、搜索次数、点击次数、曝光率等
*   **趋势分析**：访客数量随时间的变化趋势
*   **数据导出**：将数据导出为Excel格式

该看板将通过GA4 Reporting API获取数据，需要您的授权。

---

## 常见问题

### Q1：我的GA4数据需要多长时间才能在NEXUS平台中显示？

**A**：GA4通常需要24小时才能处理和显示数据。在此期间，您可能在NEXUS平台的数据看板中看不到数据。

### Q2：如何确保GA4正确追踪了用户行为？

**A**：您可以在Google Analytics的"实时"报告中查看实时用户活动。如果您在NEXUS网站上执行操作（如点击产品、搜索等），这些操作应该在实时报告中显示。

### Q3：NEXUS平台如何访问我的GA4数据？

**A**：NEXUS平台通过Google Analytics Reporting API访问您的GA4数据。您需要在Google Cloud Console中授权NEXUS应用程序访问您的GA4属性。

### Q4：我的GA4数据是否安全？

**A**：是的。NEXUS平台只能访问您明确授权的GA4属性中的数据。您可以随时在Google Analytics中撤销授权。

### Q5：如果我想停止GA4追踪怎么办？

**A**：您可以从HTML页面中移除GA4初始化代码和追踪脚本。或者，您可以在Google Analytics中停用数据流。

### Q6：我可以为不同的供应商创建不同的GA4属性吗？

**A**：可以。每个供应商可以创建自己的GA4属性，并授权NEXUS平台访问。这样，每个供应商将拥有独立的数据看板。

### Q7：NEXUS平台支持哪些GA4事件？

**A**：NEXUS平台支持所有标准GA4事件和自定义事件。请参考 [事件追踪说明](#事件追踪说明) 部分。

---

## 技术支持

如有任何问题或需要技术支持，请联系NEXUS平台管理员。

---

## 版本历史

*   **v1.0** (2025-10-23)：初始版本，包含GA4集成指南和供应商授权说明。

---

## 附录：GA4测量ID示例

GA4测量ID的格式为 `G-` 后跟10个字符的字母数字组合。例如：

*   `G-XXXXXXXXXX`
*   `G-1A2B3C4D5E`
*   `G-ABC123DEF4`

如果您不确定您的测量ID，可以在Google Analytics的"数据流"部分找到它。
