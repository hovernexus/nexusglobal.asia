# NEXUS 供应商数据分析系统 - 部署指南

## 版本信息

- **系统名称**：NEXUS Global 供应商数据分析和访客追踪系统
- **版本号**：1.0
- **发布日期**：2025-10-23
- **作者**：NEXUS Development Team

## 1. 概述

本文档旨在提供NEXUS供应商数据分析和访客追踪系统的部署说明。该系统是一个基于静态网站架构的前端应用，利用Google Analytics (GA4) 收集数据，并通过OAuth 2.0授权机制访问供应商的GA4数据，在本地浏览器端进行处理和展示。部署主要涉及将前端文件部署到静态网站托管服务，并进行GA4和Google Cloud Console的配置。

## 2. 部署前准备

在开始部署之前，请确保已完成以下准备工作：

### 2.1 源代码获取

确保您已获得NEXUS供应商数据分析系统的所有前端文件，包括：

- `supplier-dashboard.html`
- `supplier-dashboard.css`
- `supplier-dashboard.js`
- `nexus-ga4-tracker.js`
- `nexus-ga4-oauth.js`
- `nexus-ga4-data-manager.js`
- `nexus-ga4-sync.js`
- `nexus-ga4-export.js`
- `ga4-callback.html`
- 其他任何相关的静态资源（如图片、字体等）

### 2.2 Google Cloud Console 配置

NEXUS系统通过OAuth 2.0访问GA4数据，因此需要在Google Cloud Console中进行项目配置，获取OAuth凭据。

#### 2.2.1 创建Google Cloud项目

1. 访问 [Google Cloud Console](https://console.cloud.google.com/)。
2. 登录您的Google账号。
3. 在页面顶部的项目选择器中，点击"选择项目" -> "新建项目"。
4. 输入项目名称（例如：`NEXUS GA4 Integration`），点击"创建"。

#### 2.2.2 启用必要的API

1. 在Google Cloud Console中，导航到"API和服务" -> "库"。
2. 搜索并启用以下API：
   - **Google Analytics Data API**
   - **Google Analytics Admin API**

#### 2.2.3 配置OAuth同意屏幕

1. 在Google Cloud Console中，导航到"API和服务" -> "OAuth同意屏幕"。
2. 选择"外部"用户类型，点击"创建"。
3. 填写应用注册信息：
   - **应用名称**：`NEXUS GA4 Integration`
   - **用户支持电子邮件**：您的联系邮箱
   - **开发者联系信息**：您的邮箱
4. 添加授权范围：
   - 点击"添加或移除范围"。
   - 搜索并添加 `.../auth/analytics.readonly` 和 `.../auth/analytics.manage.users.readonly` 范围。
   - 点击"更新"。
5. 添加测试用户（如果您在"外部"用户类型下，且应用未发布）。
6. 保存并继续。

#### 2.2.4 创建OAuth客户端ID

1. 在Google Cloud Console中，导航到"API和服务" -> "凭据"。
2. 点击"创建凭据" -> "OAuth客户端ID"。
3. **应用类型**：选择"Web 应用"。
4. **名称**：输入客户端名称（例如：`NEXUS Web Client`）。
5. **授权的JavaScript来源**：
   - 添加您的NEXUS网站的部署域名，例如：`https://your-nexus-domain.com`。
   - 如果在本地测试，可以添加 `http://localhost:port`。
6. **授权的重定向URI**：
   - 添加您的GA4回调页面的完整URL，例如：`https://your-nexus-domain.com/ga4-callback.html`。
   - 如果在本地测试，可以添加 `http://localhost:port/ga4-callback.html`。
7. 点击"创建"。
8. 记录下生成的**客户端ID (Client ID)** 和 **客户端密钥 (Client Secret)**。这些凭据将在后续配置中使用。

### 2.3 GA4属性配置

确保您的供应商已经创建了GA4属性，并且拥有相应的**测量ID (Measurement ID)** 和 **属性ID (Property ID)**。这些ID用于在NEXUS前端进行数据追踪和API调用。

## 3. 部署步骤

### 3.1 文件上传

将所有NEXUS前端文件（包括HTML, CSS, JS文件以及任何其他静态资源）上传到您的静态网站托管服务。常见的静态网站托管服务包括：

- **GitHub Pages**
- **Netlify**
- **Vercel**
- **AWS S3 + CloudFront**
- **Google Cloud Storage + Cloud CDN**

确保所有文件都可通过HTTPS访问。

### 3.2 配置 `nexus-ga4-oauth.js`

打开 `nexus-ga4-oauth.js` 文件，根据您在Google Cloud Console中获得的凭据，更新以下配置项：

```javascript
// nexus-ga4-oauth.js

const CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID'; // 替换为您的Google Client ID
const REDIRECT_URI = 'https://your-nexus-domain.com/ga4-callback.html'; // 替换为您的重定向URI
const SCOPES = [
    'https://www.googleapis.com/auth/analytics.readonly',
    'https://www.googleapis.com/auth/analytics.manage.users.readonly'
];

// ... 其他代码
```

请将 `YOUR_GOOGLE_CLIENT_ID` 和 `https://your-nexus-domain.com/ga4-callback.html` 替换为您的实际值。

### 3.3 配置 `nexus-ga4-tracker.js`

打开 `nexus-ga4-tracker.js` 文件，确保GA4测量ID已正确配置。虽然该系统主要通过OAuth访问GA4 Reporting API，但前端追踪仍需要测量ID。

```javascript
// nexus-ga4-tracker.js

const GA4_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // 替换为您的GA4测量ID

// ... 其他代码
```

请将 `G-XXXXXXXXXX` 替换为您的实际GA4测量ID。

### 3.4 确保 `ga4-callback.html` 可访问

`ga4-callback.html` 页面是OAuth授权流程中Google重定向回来的目标页面。确保此文件与 `supplier-dashboard.html` 位于同一目录下，并且可以通过 `REDIRECT_URI` 中配置的路径访问。

## 4. 部署后验证

部署完成后，请进行以下验证以确保系统正常运行：

1. **访问数据看板**：在浏览器中访问 `https://your-nexus-domain.com/supplier-dashboard.html`。
2. **OAuth授权**：
   - 如果未授权，系统应提示进行授权。
   - 完成授权流程，验证是否成功获取令牌并重定向回数据看板。
3. **数据加载**：验证数据看板是否成功加载并显示GA4数据。
4. **事件追踪**：
   - 在您的NEXUS网站（包含 `nexus-ga4-tracker.js` 的页面）上进行一些操作（如搜索、点击产品）。
   - 登录您的GA4账号，检查实时报告和DebugView，验证事件是否被正确记录。
5. **数据导出**：在数据看板中尝试导出各种报告，验证Excel文件是否正确生成和下载。

## 5. 更新与维护

- **代码更新**：当有新的功能或修复时，更新相应的前端文件并重新上传到托管服务。
- **OAuth凭据更新**：如果您的Google Cloud项目凭据发生变化，请及时更新 `nexus-ga4-oauth.js` 文件。
- **GA4属性更新**：如果供应商的GA4属性ID或测量ID发生变化，需要更新 `nexus-ga4-tracker.js` 或在数据看板中重新配置。

## 6. 故障排除

请参阅 `NEXUS-TROUBLESHOOTING-GUIDE.md` 文档以获取常见的故障排除步骤和解决方案。

---

**文档版本**：1.0  
**最后更新**：2025-10-23  
**作者**：NEXUS Development Team

