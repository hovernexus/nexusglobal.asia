# NEXUS平台供应商数据分析与访客追踪系统设计方案

## 1. 需求分析与“外贸通”截图解析

根据用户需求，NEXUS平台需要开发一套供应商数据分析和访客追踪系统，以模仿“外贸通”的核心功能，并与现有静态网站架构兼容。以下是对“外贸通”参考截图的分析和系统设计思路。

### 1.1 “外贸通”截图功能点总结

#### 截图1：访客识别

该界面主要展示了网站访客的详细信息，旨在帮助供应商识别潜在客户。关键功能点包括：

*   **访客列表**：列出访问过网站的公司信息，包括公司名称、所属国家、公司网站、简要介绍。
*   **访问详情**：显示访客的最近访问时间、访问地区（国家/省份）、访问页面数量、访问天数。
*   **操作**：提供“录入线索”和“访问记录”等操作，方便用户进行后续跟进。
*   **筛选与搜索**：支持按“全部站点”、“本周”、“本月”、“本季度”以及自定义日期范围进行数据筛选。
*   **核心价值**：强调“精准识别网站来访流量，获得更多潜客，提高网站转化率”。

#### 截图2：站点数据

该界面提供网站整体数据统计，以量化形式展示网站表现。关键功能点包括：

*   **数据概览**：展示“整体访客数”、“营销落地页访问客户数”、“商品详情页访问客户数”等核心指标。
*   **趋势图**：通过折线图形式展示访客数量随时间的变化趋势。
*   **筛选器**：支持按时间周期（如本周、本月、本季度、自定义日期）和国家进行筛选。
*   **Tab切换**：包含“站点数据统计”和“站点联系人”两个主要视图。

#### 截图3：站点联系人

该界面是“站点数据”下的一个子视图，专注于访客的联系人信息和行为记录。关键功能点包括：

*   **联系人列表**：展示访客的邮箱、姓名、来源、访问地区、最近访问时间、访问时长、90天内访问情况（访问次数、访问天数）和最近行为（点击互动按钮、点击商品等）。
*   **筛选器**：支持按“联系人来源”、“访问地区”、“洲”、“国家”等维度进行筛选。
*   **行为追踪**：记录访客在网站上的具体行为，例如点击了哪个商品，点击了多少次。

### 1.2 NEXUS平台新功能架构设计思路

考虑到NEXUS平台是基于HTML、CSS、JavaScript的纯前端静态网站，并部署在GitHub Pages上，这意味着我们无法直接使用后端数据库或服务器端语言来存储和处理访客数据。因此，设计方案需要围绕前端技术和可能的第三方服务展开。

**核心挑战**：如何在静态网站上实现访客追踪和数据存储。

**初步架构设想：**

1.  **访客追踪机制（前端JavaScript）**：
    *   利用JavaScript在用户访问页面时收集数据，包括但不限于：
        *   **访客ID**：通过生成唯一的匿名ID（如使用`localStorage`或`sessionStorage`存储UUID），或结合IP地址进行初步识别。
        *   **访问页面URL**：记录用户访问的具体页面。
        *   **访问时间**：记录每次访问的精确时间戳。
        *   **访客来源**：`document.referrer`，或通过URL参数识别营销活动。
        *   **地理位置**：通过第三方IP地理位置API（如`ipinfo.io`）获取访客的国家、城市等信息。
        *   **用户代理**：`navigator.userAgent`，用于识别设备和浏览器。
        *   **点击事件**：监听页面上的关键元素（如产品链接、供应商链接、AI顾问按钮）的点击事件。
        *   **搜索关键词**：如果网站有内部搜索功能，记录用户搜索的关键词。
    *   数据收集后，需要进行格式化处理。

2.  **数据存储方案（纯前端静态网站的限制）**：
    *   **方案A：本地存储（LocalStorage/IndexedDB）**：只能存储当前访客的数据，无法实现跨访客的统计和供应商数据分析。不满足需求。
    *   **方案B：第三方分析服务（推荐）**：
        *   **Google Analytics (GA4)**：免费且功能强大，可以追踪用户行为、地理位置、流量来源等。可以利用其API来获取数据并展示在NEXUS前端。但需要用户在GA中设置和授权。
        *   **其他专业分析服务**：如Mixpanel, Amplitude等，但可能涉及成本和更复杂的集成。
        *   **纯前端日志发送到后端服务（如果允许）**：如果未来可以引入一个轻量级后端（如Firebase Functions, AWS Lambda），前端可以将收集到的数据发送到这些服务进行存储和聚合。目前用户明确指出是静态网站，此方案暂时不考虑。
    *   **方案C：GitHub API / Gist (不推荐)**：理论上可以将数据写入GitHub Gist或仓库文件，但这会面临API速率限制、认证、数据结构管理和并发写入等复杂问题，不适合作为高频数据存储方案。

    **结论**：鉴于静态网站的限制，**优先考虑集成第三方分析服务，特别是Google Analytics**。这将允许我们收集、存储和分析大量访客数据，并通过其API在NEXUS前端展示量化指标。

3.  **数据展示界面设计（模仿“外贸通”）**：
    *   **供应商数据看板页面**：创建一个新的HTML页面，专门用于展示供应商的数据分析结果。
    *   **访客识别模块**：
        *   表格形式展示访客列表，包含公司、国家、访问时间、访问页面、最近行为等。
        *   需要一个机制将IP地址解析为公司信息（这可能需要更高级的第三方服务或用户手动录入）。
    *   **站点数据统计模块**：
        *   展示“搜索次数”、“点击次数”、“访客来源”、“曝光率统计”等核心指标。
        *   使用图表库（如Chart.js, D3.js）绘制折线图和饼图来展示趋势和分布。
        *   筛选器：日期范围选择、按供应商筛选（如果实现多供应商数据看板）。
    *   **数据来源**：这些数据将通过调用Google Analytics或其他选定分析服务的API获取。

4.  **数据导出功能（Excel格式）**：
    *   在前端实现，将当前显示的数据转换为CSV或XLSX格式并提供下载。可以利用JavaScript库（如`xlsx-js`或`PapaParse`）。

### 1.3 技术栈与工具选择

*   **前端框架/库**：现有项目是纯JS，继续使用原生JavaScript。
*   **图表库**：Chart.js (轻量级，易于集成)。
*   **数据导出**：`xlsx-js` (用于生成Excel文件)。
*   **访客追踪**：Google Analytics (GA4) 及其Measurement Protocol 和 Reporting API。
*   **IP地理位置**：`ipinfo.io` (免费层级有速率限制，但可用于概念验证)。

### 1.4 实施步骤概览

1.  **集成Google Analytics (GA4)**：在NEXUS网站的每个页面中嵌入GA4追踪代码，确保所有页面访问和关键事件（如产品点击、搜索）都被记录。
2.  **开发数据收集脚本**：增强GA4的事件追踪，记录更详细的用户行为，如点击了哪个产品、搜索了什么关键词。
3.  **设计供应商数据看板页面**：创建HTML结构和CSS样式，用于展示数据。
4.  **开发数据展示逻辑**：使用JavaScript调用GA4 Reporting API（如果直接前端调用可行，否则需要一个中间层）获取数据，并使用Chart.js等库渲染图表。
5.  **实现访客识别逻辑**：结合GA4数据和IP地理位置服务，尝试识别访客来源。
6.  **开发Excel导出功能**：将展示的数据导出为Excel文件。
7.  **集成与测试**：将新功能集成到现有NEXUS版本中，并进行全面测试。

## 2. 详细设计：访客追踪与数据收集

本阶段将专注于如何在NEXUS网站中实现访客追踪和数据收集，主要通过Google Analytics (GA4) 进行。

### 2.1 Google Analytics (GA4) 集成

1.  **创建GA4属性**：首先需要在Google Analytics中为NEXUS网站创建一个GA4属性，并获取其“测量ID”（Measurement ID），格式通常为`G-XXXXXXXXXX`。
2.  **嵌入GA4代码**：将以下JavaScript代码片段添加到NEXUS网站所有需要追踪的页面的`<head>`标签内。这将加载Google Analytics库并初始化追踪器。

    ```html
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag(\'js\', new Date());

      gtag(\'config\', \'G-XXXXXXXXXX\'); // 替换为您的测量ID
    </script>
    ```

### 2.2 增强事件追踪

除了默认的页面浏览追踪，我们需要追踪用户在NEXUS网站上的关键交互行为，以便后续进行数据分析。

#### 2.2.1 产品点击追踪

当用户点击产品列表中的某个产品时，记录产品ID、产品名称、供应商等信息。

*   **实现方式**：修改`product-detail-loader-v14.3.js`或相关产品展示的JavaScript文件，在产品链接的点击事件中发送GA4事件。

    ```javascript
    // 示例：在产品点击事件中发送GA4事件
    function trackProductClick(productId, productName, supplierName) {
        gtag(\'event\', \'select_item\', {
            \'item_list_id\': \'product_list\',
            \'item_list_name\': \'Product List Page\',
            \'items\': [{
                \'item_id\': productId,
                \'item_name\': productName,
                \'item_category\': \'packaging_equipment\',
                \'item_brand\': supplierName
            }]
        });
        console.log(`Tracking product click: ${productName} (${productId}) from ${supplierName}`);
    }

    // 假设产品链接的HTML结构如下：
    // <a href="product-detail.html?id=pf123" onclick="trackProductClick(\'pf123\', \'QSL2\', \'ODJ\')">
    // 在加载产品列表时，为每个产品动态添加onclick事件
    // 例如，在 product-detail-loader-v14.3.js 中：
    // const productLink = document.createElement(\'a\');
    // productLink.href = `product-detail.html?id=${product.id}`;
    // productLink.onclick = () => trackProductClick(product.id, product.name, product.supplier);
    ```

#### 2.2.2 搜索关键词追踪

如果NEXUS网站有搜索功能，需要追踪用户搜索的关键词。

*   **实现方式**：在搜索表单提交或搜索按钮点击事件中发送GA4事件。

    ```javascript
    // 示例：在搜索事件中发送GA4事件
    function trackSearch(searchTerm) {
        gtag(\'event\', \'search\', {
            \'search_term\': searchTerm
        });
        console.log(`Tracking search term: ${searchTerm}`);
    }

    // 假设搜索框的HTML结构：<input type="text" id="search-input"><button onclick="trackSearch(document.getElementById(\'search-input\').value)">Search</button>
    ```

#### 2.2.3 供应商页面访问追踪

当用户访问某个供应商的详情页面时，记录供应商ID和名称。

*   **实现方式**：在`company-detail.html`页面加载时，或者在点击供应商链接时发送GA4事件。

    ```javascript
    // 示例：在供应商页面加载时发送GA4事件
    function trackSupplierPageView(supplierId, supplierName) {
        gtag(\'event\', \'view_item_list\', {
            \'item_list_id\': \'supplier_page\',
            \'item_list_name\': \'Supplier Page View\',
            \'items\': [{
                \'item_id\': supplierId,
                \'item_name\': supplierName,
                \'item_category\': \'supplier\'
            }]
        });
        console.log(`Tracking supplier page view: ${supplierName} (${supplierId})`);
    }

    // 在 company-detail.html 页面加载完成后调用此函数，并传入相应的供应商信息
    // 例如，在 company-detail-loader.js 中获取供应商ID和名称后调用
    ```

### 2.3 访客识别与地理位置

GA4会自动收集用户的地理位置信息（国家、城市），但要识别到具体的公司名称，GA4本身无法直接提供。这通常需要结合IP地址反向解析服务。

*   **初步方案**：前端通过调用第三方IP地理位置API（如`ipinfo.io`）获取访客IP地址对应的国家、城市等信息。这些信息可以作为自定义维度发送给GA4事件，或者在数据展示时单独获取。

    ```javascript
    // 示例：获取访客IP地理位置信息
    async function getVisitorGeoInfo() {
        try {
            const response = await fetch(\'https://ipinfo.io/json?token=YOUR_IPINFO_TOKEN\'); // 需要注册ipinfo.io获取token
            const data = await response.json();
            console.log(\'Visitor Geo Info:\', data);
            // 可以将这些信息作为自定义维度发送给GA4，或者存储在本地用于展示
            gtag(\'set\', {\'user_properties\': {
                \'country\': data.country,
                \'city\': data.city,
                \'region\': data.region
            }});
        } catch (error) {
            console.error(\'Error fetching IP geo info:\', error);
        }
    }
    // 在页面加载时调用
    // getVisitorGeoInfo();
    ```
    **注意**：`ipinfo.io`的免费层级有速率限制，且无法直接提供公司名称。要实现“外贸通”中直接识别公司名称的功能，需要更高级的IP-to-Company数据库服务，这通常是付费的，且需要后端支持。

### 2.4 数据存储与聚合（GA4 Reporting API）

由于NEXUS是静态网站，无法直接存储和聚合大量访客数据。GA4 Reporting API是获取这些数据的官方途径。然而，**直接从前端调用GA4 Reporting API会暴露API Key，存在安全风险。**

**建议方案**：

*   **方案A (推荐，但需要用户授权)**：让供应商在自己的Google账号下创建GA4属性，并授权NEXUS平台通过OAuth 2.0访问其Reporting API。这需要用户进行复杂的授权流程，且NEXUS前端需要实现OAuth客户端。
*   **方案B (需要轻量级后端)**：NEXUS平台搭建一个轻量级后端服务（如Google Cloud Functions, AWS Lambda, Vercel Functions），由该后端服务安全地存储GA4 API Key，并代理前端的GA4 Reporting API请求。前端通过调用NEXUS的后端API来获取数据。**此方案更安全、更可靠，但与“纯前端静态网站”的限制相悖。**
*   **方案C (折衷方案，手动导出)**：如果无法实现API集成，用户可以手动从GA4界面导出报告，然后导入到NEXUS的本地工具进行展示（但这不符合实时数据看板的需求）。

**当前阶段，我们将假设可以以某种安全的方式获取GA4数据，或者先设计前端展示部分，数据源暂时用模拟数据替代，待用户确认数据获取方案后再进行集成。**

### 2.5 曝光率统计

“曝光率”可以理解为页面被用户访问的次数或被搜索的次数。GA4中的“事件数”、“用户数”、“会话数”等指标可以直接用于衡量曝光。具体到供应商的曝光率，可以追踪特定供应商页面的访问次数、产品被查看的次数等。

*   **计算方式**：
    *   **供应商页面曝光**：特定供应商详情页的页面浏览事件数。
    *   **产品曝光**：特定产品详情页的页面浏览事件数，或产品在列表页被展示的次数（需要额外追踪）。
    *   **搜索曝光**：包含特定供应商或产品关键词的搜索事件数。

这些指标都可以通过GA4事件和自定义维度进行追踪和统计。

## 3. 下一步计划

1.  **确认GA4集成可行性**：与用户沟通，确认是否可以在NEXUS网站中集成Google Analytics (GA4)，以及数据获取方案（直接API调用、通过轻量级后端代理、或手动导出）。
2.  **细化GA4事件追踪**：根据“外贸通”的功能，进一步细化需要追踪的事件和参数。
3.  **开发前端数据看板原型**：在确认数据源方案后，开始构建前端界面，使用模拟数据进行展示。
