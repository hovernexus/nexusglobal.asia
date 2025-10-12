# NEXUS GLOBAL HOLDINGS 企业网站

**版本**: V9.3  
**发布日期**: 2025年10月12日  
**状态**: 生产环境就绪

---

## 项目概述

这是 NEXUS GLOBAL HOLDINGS 的官方企业网站,专注于瓦楞纸包装生产线设备的全球供应和技术支持。网站采用现代化设计,提供多语言支持(英文/中文),并集成了 AI 生产线顾问功能。

**官方域名**: nexusglobal.asia  
**托管平台**: GitHub Pages  
**技术栈**: HTML5, CSS3, JavaScript (原生)

---

## V9.3 版本更新

### 主要新功能

**AI 顾问页面品牌标识**

在 AI 顾问页面的客服代表头像上添加了 "NEXUS GLOBAL" 品牌标志,使用纯 CSS 实现。

**特点**:
- 位于头像右上角
- 蓝色渐变背景,白色文字
- 完整的响应式设计
- 悬停动画效果

### 新增文档

- `V9.3-QUICK-UPDATE-GUIDE.md` - 快速更新指南
- `V9.3-RELEASE-NOTES.md` - 详细发布说明
- `GITHUB-SAFE-UPDATE-GUIDE.md` - GitHub 安全更新指南

详细更新内容请查看 `V9.3-RELEASE-NOTES.md`。

---

## 快速开始

### 本地预览

1. 解压 `NEXUS-V9.3-Release.zip` 文件
2. 进入 `nexus-v9.3` 文件夹
3. 使用任意 HTTP 服务器启动网站:

**使用 Python** (推荐):
```bash
python -m http.server 8080
```

**使用 Node.js**:
```bash
npx http-server -p 8080
```

4. 在浏览器中访问 `http://localhost:8080`

### 部署到 GitHub Pages

**方式一:仅更新 CSS 文件(推荐)**

如果您已经部署了 V9.2 版本,只需更新一个文件:

1. 登录 GitHub,进入您的仓库
2. 找到并点击 `ai-consultant.css` 文件
3. 点击右上角的铅笔图标 ✏️ (Edit this file)
4. 用新版本的内容替换
5. 点击 "Commit changes" 按钮

**方式二:完整部署**

详细步骤请参考 `GITHUB-SAFE-UPDATE-GUIDE.md`。

---

## 主要功能

### 1. 多语言支持
- 英文 (默认)
- 简体中文
- 实时切换,无需刷新页面

### 2. 产品展示系统
- 7 大产品分类
- 动态产品列表
- 详细产品信息页面
- 智能分类导航

### 3. AI 生产线顾问 (V9.3 增强)
- 智能对话系统
- 快速主题选择
- 专业技术支持
- **新增**: 品牌标识叠加

### 4. 注册系统
- 供应商注册
- 客户注册
- 已注册公司展示
- 公司详情页面

### 5. 新闻中心
- 新闻列表
- 新闻详情
- 分类筛选

### 6. 响应式设计
- 桌面优先
- 平板适配
- 移动端优化

---

## 浏览器兼容性

| 浏览器 | 最低版本 | 状态 |
| :--- | :--- | :--- |
| Chrome | 88+ | ✅ 完全支持 |
| Firefox | 85+ | ✅ 完全支持 |
| Edge | 88+ | ✅ 完全支持 |
| Safari | 14+ | ✅ 完全支持 |
| Opera | 74+ | ✅ 完全支持 |

**注意**: 不支持 IE 11 及更早版本。

---

## 文件结构

```
nexus-v9.3/
├── index.html                          # 首页
├── about-us.html                       # 关于我们
├── ai-consultant.html                  # AI 顾问 (本次更新重点)
├── contact.html                        # 联系我们
├── news.html                           # 新闻中心
├── news-detail.html                    # 新闻详情
├── supplier-registration.html          # 供应商注册
├── customer-registration.html          # 客户注册
├── registered-companies.html           # 已注册公司
├── product-list.html                   # 产品列表
├── product-detail-dynamic.html         # 产品详情
├── company-detail.html                 # 公司详情
├── category-*.html                     # 产品分类页面 (7个)
├── styles.css                          # 主样式表
├── ai-consultant.css                   # AI 顾问样式 (V9.3 更新)
├── product-navigation.css              # 产品导航样式
├── registration.css                    # 注册表单样式
├── script.js                           # 主脚本
├── ai-consultant.js                    # AI 顾问脚本
├── language-switcher.js                # 语言切换
├── category-mapper-v9.js               # 分类映射
├── product-detail-loader-v3.js         # 产品详情加载器
├── company-detail-loader.js            # 公司详情加载器
├── load-registered-data.js             # 注册数据加载器
├── data/                               # 数据文件夹
│   ├── products-complete.json          # 完整产品数据
│   ├── registered-companies.json       # 已注册公司数据
│   ├── translations.json               # 翻译数据
│   └── categories-v9.json              # 分类数据
├── images/                             # 图片资源
│   ├── customer-service-rep.jpg        # AI 顾问头像
│   └── ... (其他图片)
├── V9.3-QUICK-UPDATE-GUIDE.md          # 快速更新指南
├── V9.3-RELEASE-NOTES.md               # 发布说明
├── GITHUB-SAFE-UPDATE-GUIDE.md         # GitHub 安全指南
├── VERSION.txt                         # 版本信息
└── README.md                           # 本文件
```

---

## 常见问题

**Q: 如何更新网站?**

A: 请参考 `V9.3-QUICK-UPDATE-GUIDE.md` 获取详细步骤。

**Q: 更新后看不到新样式?**

A: 请使用 `Ctrl + Shift + R` (Windows) 或 `Cmd + Shift + R` (Mac) 强制刷新浏览器。

**Q: 如何安全地更新 GitHub 文件?**

A: 请参考 `GITHUB-SAFE-UPDATE-GUIDE.md`,遵循"绝不删除,只做增量更新"的原则。

**Q: 网站支持哪些浏览器?**

A: 支持所有现代浏览器(Chrome, Firefox, Edge, Safari),不支持 IE 11。

---

## 更新历史

### V9.3 (2025-10-12)
- ✨ 新增: AI 顾问头像品牌标识 (CSS 叠加)
- 📝 新增: GitHub 安全更新指南
- 🎨 优化: 响应式设计改进
- 📚 新增: 详细的版本文档

### V9.2 (2025-10-11)
- 🖼️ 更新: AI 顾问头像图片
- 🔧 修复: 导航菜单语言问题
- 🎨 更新: 首页产品卡片 (7 个分类)

### V9.1 (2025-10-10)
- 🔧 修复: 导航菜单结构问题
- 🎨 优化: 产品卡片布局

### V9.0 (2025-10-11)
- 完整的导航结构重构,7 个主要产品分类
- 增强的产品分类系统
- 改进的下拉菜单设计
- 更好的响应式设计

---

## 许可证

© 2025 NEXUS GLOBAL HOLDINGS. All rights reserved.

---

## 联系方式

**公司**: NEXUS GLOBAL HOLDINGS  
**网站**: https://nexusglobal.asia  
**邮箱**: info@nexusglobal.asia

---

**文档版本**: 1.0  
**最后更新**: 2025年10月12日

