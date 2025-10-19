# NEXUS V13.1 架构设计文档

## 版本信息
- **版本**: V13.1
- **基于**: V13.0 Equipment Configurator
- **更新日期**: 2025-10-19

---

## 核心改进

### 1. 多层级导航系统 (Multi-Level Navigation)

**V13.0**: 单层级 - 直接选择设备类型
```
设备类型选择 → 填写需求表单 → 查看推荐结果
```

**V13.1**: 四层级 - 从AI功能模块开始
```
第一层: 选择AI功能模块 (8个模块)
   ↓ (仅当选择"Smart Equipment Recommendation")
第二层: 选择设备类型 (8种设备)
   ↓
第三层: 填写需求表单 (动态字段)
   ↓
第四层: 查看推荐结果 (TOP 3 + 操作按钮)
```

### 2. 新增功能

**REQUEST QUOTE (询价功能)**
- 模态框表单收集用户信息
- 包含推荐设备详情
- 支持后端API或邮件发送
- 生成唯一询价编号

**VIEW DETAILS (查看详情)**
- 跳转到产品详情页
- URL参数传递设备ID
- 支持新标签页打开

---

## 文件结构

```
nexus-v13.1/
├── nexus-v13.1-ai-modules.html          # 主入口文件 (新)
├── nexus-v13.1-ai-modules.css           # AI模块选择样式 (新)
├── nexus-v13.1-ai-modules.js            # AI模块选择逻辑 (新)
├── nexus-v13.1-equipment-configurator.html  # 设备配置器页面 (改)
├── nexus-v13.1-configurator.css         # 配置器样式 (改)
├── nexus-v13.1-configurator.js          # 配置器逻辑 (改)
├── nexus-v13.1-quote-modal.html         # 询价模态框 (新)
├── nexus-v13.1-quote-functions.js       # 询价功能 (新)
└── ARCHITECTURE.md                      # 本文档
```

---

## 导航流程详细设计

### 第一层: AI功能模块选择

**页面**: `nexus-v13.1-ai-modules.html`

**8个AI功能模块**:

1. 🎯 **Smart Equipment Recommendation** (智能设备推荐系统)
   - 值: `equipment-recommendation`
   - 跳转: `nexus-v13.1-equipment-configurator.html`
   
2. 💰 **ROI Calculator & Cost Analysis** (ROI计算与成本分析)
   - 值: `roi-calculator`
   - 状态: Coming Soon
   
3. 💬 **24/7 AI Technical Consultation** (24/7 AI技术咨询)
   - 值: `ai-consultation`
   - 跳转: `consultation-chat.html`
   
4. 🔧 **Equipment Troubleshooting Assistant** (设备故障诊断助手)
   - 值: `troubleshooting`
   - 状态: Coming Soon
   
5. 📖 **Corrugated Industry Encyclopedia** (瓦楞纸箱行业百科)
   - 值: `industry-encyclopedia`
   - 状态: Coming Soon
   
6. 📄 **Technical Documentation Center** (技术文档中心)
   - 值: `technical-docs`
   - 状态: Coming Soon
   
7. 🎫 **Online Ticketing System** (在线工单系统)
   - 值: `ticketing-system`
   - 状态: Coming Soon
   
8. 🏢 **Customer Service Portal** (客户服务门户)
   - 值: `customer-portal`
   - 状态: Coming Soon

**UI布局**: 2x4网格卡片布局,每个卡片包含:
- 图标
- 标题
- 描述
- 状态标签 (Active/Coming Soon)
- 点击进入按钮

---

### 第二层: 设备类型选择

**页面**: `nexus-v13.1-equipment-configurator.html`

**显示条件**: 从第一层点击"Smart Equipment Recommendation"进入

**8种设备类型**:
1. Digital Printing Machines (数字印刷机)
2. Die-Cutting Machines (模切机)
3. Feeding/Palletizing Machines (上料/码垛机)
4. Folder Gluer/Stitcher (糊盒机/钉箱机)
5. Laminator/Filming Machine (覆膜机)
6. Corrugator Line (瓦楞纸板生产线)
7. Flexo Printing Machines (柔版印刷机)
8. Strapping/Stitching Machines (打包/钉箱机)

**UI**: 下拉选择框,位于左侧配置面板顶部

---

### 第三层: 需求表单填写

**页面**: `nexus-v13.1-equipment-configurator.html` (左侧面板)

**显示条件**: 选择设备类型后动态加载

**字段数量**: 7-8个专业字段 (根据设备类型不同)

**示例** (Digital Printing Machines):
- Product Type (产品类型)
- Daily Production Volume (日产量)
- Print Quality Requirement (印刷质量要求)
- Maximum Print Width (最大印刷宽度)
- Number of Colors (色数)
- Budget Range (预算范围)
- Delivery Timeline (交付时间)

---

### 第四层: 推荐结果展示

**页面**: `nexus-v13.1-equipment-configurator.html` (右侧面板)

**显示条件**: 点击"Get Recommendation"按钮后

**内容**: TOP 3推荐设备卡片

**每个卡片包含**:
- 排名标签 (#1, #2, #3)
- 设备名称
- 匹配度评分 (百分比)
- 星级评价 (1-5星)
- 匹配等级标签 (EXCELLENT/GOOD/FAIR)
- 供应商信息
- 价格范围
- 交付时间
- 设备等级 (Entry/Mid/Premium/Flagship)
- 核心功能列表 (3-5项)
- 推荐理由
- **两个操作按钮**:
  - **REQUEST QUOTE** (主按钮,蓝色)
  - **VIEW DETAILS** (次按钮,灰色)

---

## 新增功能实现

### 1. REQUEST QUOTE (询价功能)

**文件**: 
- `nexus-v13.1-quote-modal.html` (模态框HTML)
- `nexus-v13.1-quote-functions.js` (功能逻辑)

**触发**: 点击推荐卡片上的"REQUEST QUOTE"按钮

**流程**:
1. 调用 `openQuoteModal(equipment)` 函数
2. 打开模态框,自动填充设备信息
3. 用户填写联系信息表单
4. 点击"Submit Quote Request"提交
5. 调用 `submitQuoteRequest(event)` 函数
6. 发送数据到后端/邮件
7. 保存到localStorage (备份)
8. 显示成功提示模态框
9. 生成唯一询价编号

**表单字段**:
- Full Name * (必填)
- Company Name * (必填)
- Job Title (可选)
- Email Address * (必填)
- Phone Number * (必填)
- Country/Region * (必填)
- Additional Message (可选)

**数据格式**:
```json
{
  "equipment": {
    "name": "NEXUS DigiPrint 2500 HD",
    "supplier": "NEXUS Global",
    "priceRange": "$250,000 - $350,000",
    "leadTime": "16 weeks",
    "tier": "Premium",
    "matchScore": 95
  },
  "user": {
    "name": "John Doe",
    "company": "ABC Packaging Ltd.",
    "jobTitle": "Procurement Manager",
    "email": "john@abcpackaging.com",
    "phone": "+1 (555) 123-4567",
    "country": "United States"
  },
  "message": "Additional requirements...",
  "referenceNumber": "NEXUS-ABC123-XYZ789",
  "timestamp": "2025-10-19T10:30:00.000Z",
  "source": "NEXUS AI Equipment Configurator V13.1"
}
```

**提交方式**:
- **方式A**: POST到后端API `/api/quote-requests`
- **方式B**: 使用EmailJS发送邮件到 `sales@nexusglobal.asia`
- **方式C**: 保存到localStorage (备用)

**成功提示**:
```
✅ Quote Request Submitted Successfully!

Thank you for your interest in NEXUS DigiPrint 2500 HD.

Our sales team will contact you within 24 hours.

Reference Number: NEXUS-ABC123-XYZ789
```

---

### 2. VIEW DETAILS (查看详情)

**文件**: `nexus-v13.1-quote-functions.js`

**触发**: 点击推荐卡片上的"VIEW DETAILS"按钮

**流程**:
1. 调用 `viewEquipmentDetails(equipment)` 函数
2. 生成设备ID (slug格式)
3. 构建产品详情页URL
4. 在新标签页打开

**URL格式**:
```
product-detail.html?id=nexus-digiprint-2500-hd
```

**设备ID生成规则**:
```javascript
const equipmentSlug = equipment.name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
```

**示例**:
- "NEXUS DigiPrint 2500 HD" → `nexus-digiprint-2500-hd`
- "NEXUS DieCut Pro 1850" → `nexus-diecut-pro-1850`

**跳转方式**:
```javascript
window.open(detailUrl, '_blank');  // 新标签页打开
```

---

## 技术实现细节

### 1. 按钮绑定

**V13.0方式** (静态HTML):
```html
<button class="recommendation-btn-primary">Request Quote</button>
<button class="recommendation-btn-secondary">View Details</button>
```

**V13.1方式** (动态绑定):
```javascript
// 在生成推荐结果后调用
function updateRecommendationButtons() {
    const recommendationCards = document.querySelectorAll('.recommendation-card');
    
    recommendationCards.forEach((card, index) => {
        const equipment = extractEquipmentData(card);
        
        const quoteBtn = card.querySelector('.recommendation-btn-primary');
        quoteBtn.onclick = () => openQuoteModal(equipment);
        
        const detailsBtn = card.querySelector('.recommendation-btn-secondary');
        detailsBtn.onclick = () => viewEquipmentDetails(equipment);
    });
}
```

### 2. 模态框控制

**打开模态框**:
```javascript
function openQuoteModal(equipment) {
    currentEquipmentForQuote = equipment;
    document.getElementById('quoteModal').classList.add('active');
    document.getElementById('quoteModal').style.display = 'flex';
    document.body.style.overflow = 'hidden';  // 禁止背景滚动
}
```

**关闭模态框**:
```javascript
function closeQuoteModal() {
    const modal = document.getElementById('quoteModal');
    modal.classList.remove('active');
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 300);  // 等待动画完成
}
```

### 3. 表单验证

**HTML5原生验证**:
```html
<input type="text" required placeholder="John Doe" />
<input type="email" required placeholder="john@example.com" />
<input type="tel" required placeholder="+1 (555) 123-4567" />
```

**JavaScript额外验证**:
```javascript
function validateQuoteForm(formData) {
    if (!formData.user.email.includes('@')) {
        throw new Error('Invalid email address');
    }
    if (formData.user.phone.length < 10) {
        throw new Error('Invalid phone number');
    }
    return true;
}
```

---

## 部署注意事项

### 1. 文件依赖关系

**主入口页面** (`ai-consultation-system.html`):
```html
<!-- 更新链接指向V13.1 -->
<a href="nexus-v13.1-ai-modules.html">AI Consultation System</a>
```

**AI模块页面** (`nexus-v13.1-ai-modules.html`):
```html
<script src="nexus-v13.1-ai-modules.js"></script>
<link rel="stylesheet" href="nexus-v13.1-ai-modules.css">
```

**设备配置器页面** (`nexus-v13.1-equipment-configurator.html`):
```html
<link rel="stylesheet" href="nexus-v13.1-configurator.css">
<script src="nexus-v13.1-configurator.js"></script>
<script src="nexus-v13.1-quote-functions.js"></script>
```

### 2. 数据文件

**必需文件**:
- `data/products-complete.json` (产品数据库)
- `data/registered-companies.json` (公司数据库)

**路径配置**:
```javascript
const PRODUCTS_DATA_URL = 'data/products-complete.json';
```

### 3. 后端API配置

**如果使用后端API**:
```javascript
const API_BASE_URL = 'https://api.nexusglobal.asia';
const QUOTE_API_ENDPOINT = '/api/quote-requests';
```

**如果使用EmailJS**:
```javascript
const EMAILJS_SERVICE_ID = 'service_xxxxxxx';
const EMAILJS_TEMPLATE_ID = 'template_xxxxxxx';
const EMAILJS_USER_ID = 'user_xxxxxxx';
```

---

## 测试清单

### 第一层测试
- [ ] 8个AI模块卡片正确显示
- [ ] 点击"Smart Equipment Recommendation"跳转到配置器
- [ ] 其他模块显示"Coming Soon"状态
- [ ] 响应式布局在移动端正常

### 第二层测试
- [ ] 设备类型下拉框正确显示8种设备
- [ ] 选择设备类型后动态加载表单字段
- [ ] 切换设备类型时表单正确更新

### 第三层测试
- [ ] 表单字段根据设备类型正确显示
- [ ] 必填字段验证正常工作
- [ ] 点击"Get Recommendation"触发推荐算法
- [ ] 点击"Reset Form"清空表单

### 第四层测试
- [ ] TOP 3推荐结果正确显示
- [ ] 匹配度评分计算准确
- [ ] 星级评价正确显示
- [ ] 设备信息完整显示

### REQUEST QUOTE测试
- [ ] 点击"REQUEST QUOTE"打开模态框
- [ ] 设备信息自动填充
- [ ] 表单验证正常工作
- [ ] 提交后显示成功提示
- [ ] 生成唯一询价编号
- [ ] 数据保存到localStorage
- [ ] 关闭模态框功能正常

### VIEW DETAILS测试
- [ ] 点击"VIEW DETAILS"打开新标签页
- [ ] URL参数正确传递
- [ ] 设备ID格式正确
- [ ] 产品详情页正确加载

---

## 版本对比

| 功能 | V13.0 | V13.1 |
|------|-------|-------|
| 导航层级 | 单层级 (直接选设备) | 四层级 (AI模块→设备→表单→结果) |
| AI功能模块 | ❌ | ✅ 8个模块 |
| 设备类型选择 | ✅ | ✅ |
| 动态表单 | ✅ | ✅ |
| 推荐算法 | ✅ | ✅ |
| REQUEST QUOTE | ❌ | ✅ 模态框表单 |
| VIEW DETAILS | ❌ | ✅ 跳转详情页 |
| 询价编号生成 | ❌ | ✅ |
| 数据持久化 | ❌ | ✅ localStorage |

---

## 后续优化建议

1. **后端集成**: 实现真实的API接口处理询价请求
2. **邮件通知**: 配置EmailJS或SMTP服务自动发送邮件
3. **数据分析**: 记录用户行为和推荐效果
4. **A/B测试**: 测试不同UI布局的转化率
5. **多语言支持**: 添加中文/西班牙文界面
6. **移动端优化**: 优化移动设备上的表单体验
7. **其他AI模块**: 逐步实现其他7个AI功能模块
8. **产品详情页**: 完善所有设备的详情页面

---

**文档版本**: 1.0  
**最后更新**: 2025-10-19  
**维护者**: NEXUS Development Team

