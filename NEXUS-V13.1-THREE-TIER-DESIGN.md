# NEXUS V13.1 三层级流程设计文档

## 📋 概述

V13.1版本将V13.0的单层级设备选型流程升级为三层级智能引导流程,并添加Request Quote和View Details功能。

---

## 🎯 核心改进

### 1. 三层级流程设计

**第一层: AI功能模块选择**
- 用户首先选择需要的AI服务类型
- 8大功能模块表单式排列
- 只有选择"Smart Equipment Recommendation"才进入设备选型

**第二层: 设备类型选择** (仅设备选型模块)
- 8种设备类型选择
- 动态显示对应的表单字段

**第三层: 需求表单填写**
- 根据设备类型动态生成字段
- 7-8个专业字段

**第四层: 推荐结果展示**
- TOP 3推荐设备
- Request Quote按钮
- View Details按钮

---

### 2. 新增功能

**Request Quote (询价功能)**
- 打开询价表单模态框
- 收集用户联系信息
- 包含推荐设备信息
- 发送到后台/邮件

**View Details (查看详情)**
- 跳转到产品详情页
- URL格式: `product-detail.html?id=设备ID`
- 传递设备参数

---

## 🏗️ 流程架构

```
┌─────────────────────────────────────────────────────────────┐
│  第一层: AI功能模块选择                                        │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  Select AI Service Module *                            │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │ 🎯 Smart Equipment Recommendation               │  │  │
│  │  │ 💰 ROI Calculator & Cost Analysis               │  │  │
│  │  │ 💬 24/7 AI Technical Consultation               │  │  │
│  │  │ 🔧 Equipment Troubleshooting Assistant          │  │  │
│  │  │ 📖 Corrugated Industry Encyclopedia             │  │  │
│  │  │ 📄 Technical Documentation Center               │  │  │
│  │  │ 🎫 Online Ticketing System                      │  │  │
│  │  │ 🏢 Customer Service Portal                      │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            ↓
                  (仅当选择"设备选型"时)
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  第二层: 设备类型选择                                          │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  Equipment Type *                                      │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │ Digital Printing Machines                       │  │  │
│  │  │ Die-Cutting Machines                            │  │  │
│  │  │ Feeding/Palletizing Machines                    │  │  │
│  │  │ Folder Gluer/Stitcher                           │  │  │
│  │  │ Laminator/Filming Machine                       │  │  │
│  │  │ Corrugator Line                                 │  │  │
│  │  │ Flexo Printing Machines                         │  │  │
│  │  │ Strapping/Stitching Machines                    │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  第三层: 需求表单填写                                          │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  Product Type *                                        │  │
│  │  Daily Production Volume *                             │  │
│  │  Print Quality Requirement *                           │  │
│  │  Maximum Print Width *                                 │  │
│  │  Number of Colors *                                    │  │
│  │  Budget Range (USD) *                                  │  │
│  │  Delivery Timeline *                                   │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌───────────────────────────────────────────────────────┐  │
│  │         [Get Recommendation]  [Reset Form]             │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  第四层: 推荐结果展示                                          │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  🎯 Equipment Recommendations                          │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │  #1 NEXUS DigiPrint 2500 HD         95% ⭐⭐⭐⭐⭐  │  │  │
│  │  │  ─────────────────────────────────────────────  │  │  │
│  │  │  Price: $250,000 - $350,000                     │  │  │
│  │  │  Lead Time: 16 weeks                            │  │  │
│  │  │  Tier: Premium                                  │  │  │
│  │  │  ─────────────────────────────────────────────  │  │  │
│  │  │  ✓ Key Features...                              │  │  │
│  │  │  💡 Why We Recommend This...                    │  │  │
│  │  │  ─────────────────────────────────────────────  │  │  │
│  │  │  [Request Quote]  [View Details]                │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  │  (Similar cards for #2 and #3)                        │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## 📝 详细功能设计

### 第一层: AI功能模块选择

**字段名称**: AI Service Module  
**字段类型**: 下拉选择框 (Select)  
**必填**: 是  
**选项列表**:

| 图标 | 英文名称 | 中文名称 | 值 |
|------|---------|---------|-----|
| 🎯 | Smart Equipment Recommendation | 智能设备推荐系统 | equipment-recommendation |
| 💰 | ROI Calculator & Cost Analysis | ROI计算与成本分析 | roi-calculator |
| 💬 | 24/7 AI Technical Consultation | 24/7 AI技术咨询 | ai-consultation |
| 🔧 | Equipment Troubleshooting Assistant | 设备故障诊断助手 | troubleshooting |
| 📖 | Corrugated Industry Encyclopedia | 瓦楞纸箱行业百科 | industry-encyclopedia |
| 📄 | Technical Documentation Center | 技术文档中心 | technical-docs |
| 🎫 | Online Ticketing System | 在线工单系统 | ticketing-system |
| 🏢 | Customer Service Portal | 客户服务门户 | customer-portal |

**交互逻辑**:
- 用户选择后,根据选择显示不同内容
- 如果选择"equipment-recommendation",显示第二层(设备类型选择)
- 如果选择其他模块,显示对应模块的功能介绍和引导

---

### 第二层: 设备类型选择

**显示条件**: 仅当第一层选择"Smart Equipment Recommendation"时显示

**字段名称**: Equipment Type  
**字段类型**: 下拉选择框 (Select)  
**必填**: 是  
**选项列表**: (与V13.0相同)

| 值 | 英文名称 | 中文名称 |
|----|---------|---------|
| digital-printing | Digital Printing Machines | 数字印刷机 |
| die-cutting | Die-Cutting Machines | 模切机 |
| feeding-palletizing | Feeding/Palletizing Machines | 上料/码垛机 |
| folder-gluer | Folder Gluer/Stitcher | 糊盒机/钉箱机 |
| laminator | Laminator/Filming Machine | 覆膜机 |
| corrugator | Corrugator Line | 瓦楞纸板生产线 |
| flexo-printing | Flexo Printing Machines | 柔版印刷机 |
| strapping | Strapping/Stitching Machines | 打包/钉箱机 |

**交互逻辑**:
- 用户选择设备类型后,动态加载对应的表单字段(第三层)

---

### 第三层: 需求表单填写

**显示条件**: 第二层选择设备类型后显示

**字段配置**: 根据设备类型动态生成(与V13.0相同)

**示例** (Digital Printing Machines):
1. Product Type (产品类型)
2. Daily Production Volume (日产量)
3. Print Quality Requirement (印刷质量要求)
4. Maximum Print Width (最大印刷宽度)
5. Number of Colors (色数)
6. Budget Range (预算范围)
7. Delivery Timeline (交付时间)

---

### 第四层: 推荐结果展示

**显示条件**: 用户点击"Get Recommendation"按钮后显示

**内容**: TOP 3推荐设备卡片

**每个设备卡片包含**:
- 设备名称
- 匹配度评分(百分比)
- 星级评价(1-5星)
- 匹配等级标签(EXCELLENT/GOOD/FAIR)
- 供应商信息
- 价格范围
- 交付时间
- 设备等级(Entry/Mid/Premium/Flagship)
- 核心功能列表
- 推荐理由
- **两个操作按钮**:
  - **Request Quote** (询价)
  - **View Details** (查看详情)

---

## 🔧 新增功能详细设计

### 1. Request Quote (询价功能)

**触发方式**: 点击推荐设备卡片上的"Request Quote"按钮

**功能流程**:
1. 打开询价表单模态框
2. 自动填充设备信息
3. 用户填写联系信息
4. 提交后发送到后台/邮件
5. 显示成功提示

**询价表单字段**:

| 字段名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| Equipment Name | Text (只读) | - | 自动填充推荐设备名称 |
| Your Name | Text | 是 | 用户姓名 |
| Company Name | Text | 是 | 公司名称 |
| Job Title | Text | 否 | 职位 |
| Email | Email | 是 | 邮箱地址 |
| Phone | Tel | 是 | 电话号码 |
| Country/Region | Select | 是 | 国家/地区 |
| Message | Textarea | 否 | 补充说明 |

**数据提交**:

**方式A: 发送邮件**
```javascript
// 使用EmailJS或类似服务
emailjs.send('service_id', 'template_id', {
    equipment_name: '设备名称',
    user_name: '用户姓名',
    company: '公司名称',
    email: '邮箱',
    phone: '电话',
    country: '国家',
    message: '补充说明',
    requirements: '用户填写的所有需求数据'
});
```

**方式B: 发送到后台API**
```javascript
fetch('/api/quote-requests', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        equipment_id: 'nexus-digiprint-2500-hd',
        equipment_name: 'NEXUS DigiPrint 2500 HD',
        user_info: {
            name: '用户姓名',
            company: '公司名称',
            email: '邮箱',
            phone: '电话',
            country: '国家'
        },
        requirements: {
            // 用户填写的所有需求数据
        },
        message: '补充说明',
        timestamp: new Date().toISOString()
    })
});
```

**成功提示**:
```
✅ Quote Request Submitted Successfully!

Thank you for your interest in [设备名称].

Our sales team will contact you within 24 hours.

Reference Number: QR-XXXXXXXX
```

---

### 2. View Details (查看详情)

**触发方式**: 点击推荐设备卡片上的"View Details"按钮

**功能流程**:
1. 获取设备ID
2. 跳转到产品详情页
3. 传递设备参数

**跳转URL格式**:
```
product-detail.html?id=nexus-digiprint-2500-hd
```

**URL参数**:
- `id`: 设备ID (必需)
- `from`: 来源页面 (可选,用于追踪)
- `match_score`: 匹配度评分 (可选)

**完整示例**:
```
product-detail.html?id=nexus-digiprint-2500-hd&from=configurator&match_score=95
```

**设备ID映射表**:

| 设备名称 | 设备ID | 产品详情页 |
|---------|--------|-----------|
| NEXUS DigiPrint 2500 HD | nexus-digiprint-2500-hd | product-detail.html?id=nexus-digiprint-2500-hd |
| NEXUS DigiPrint 1600 | nexus-digiprint-1600 | product-detail.html?id=nexus-digiprint-1600 |
| NEXUS DieCut Pro 1850 | nexus-diecut-pro-1850 | product-detail.html?id=nexus-diecut-pro-1850 |
| ... | ... | ... |

**注意**: 如果产品详情页不存在,可以跳转到产品列表页并高亮显示该设备

---

## 🎨 UI/UX改进

### 1. 第一层UI设计

**布局**: 左侧配置面板

**元素**:
```html
<div class="config-section">
    <div class="section-icon">🤖</div>
    <h3 class="section-title">AI Service Selection</h3>
    <p class="section-subtitle">Choose the AI service you need</p>
    
    <div class="form-group">
        <label>
            <span class="label-icon">🎯</span>
            <span class="label-text">AI Service Module</span>
            <span class="required">*</span>
        </label>
        <select id="aiServiceModule" class="form-control" required>
            <option value="">Select AI service...</option>
            <option value="equipment-recommendation">
                🎯 Smart Equipment Recommendation
            </option>
            <option value="roi-calculator">
                💰 ROI Calculator & Cost Analysis
            </option>
            <!-- ... 其他选项 ... -->
        </select>
    </div>
</div>
```

---

### 2. 第二层UI设计

**显示条件**: 当第一层选择"equipment-recommendation"时,平滑展开

**动画效果**: 淡入+向下滑动

```css
.equipment-type-section {
    max-height: 0;
    overflow: hidden;
    opacity: 0;
    transition: all 0.3s ease-in-out;
}

.equipment-type-section.active {
    max-height: 500px;
    opacity: 1;
}
```

---

### 3. Request Quote模态框UI

**设计风格**: 专业的表单模态框

**布局**:
```
┌─────────────────────────────────────────────┐
│  ✕                                           │
│  📝 Request Quote                            │
│  ───────────────────────────────────────────│
│                                              │
│  Equipment: NEXUS DigiPrint 2500 HD          │
│  Price Range: $250,000 - $350,000            │
│  ───────────────────────────────────────────│
│                                              │
│  Your Information:                           │
│                                              │
│  Name *          [________________]          │
│  Company *       [________________]          │
│  Job Title       [________________]          │
│  Email *         [________________]          │
│  Phone *         [________________]          │
│  Country *       [Select country ▼]          │
│  Message         [________________]          │
│                  [________________]          │
│                  [________________]          │
│                                              │
│  ───────────────────────────────────────────│
│  [Cancel]              [Submit Quote Request]│
└─────────────────────────────────────────────┘
```

---

## 📊 数据流设计

### 用户数据收集

**阶段1: AI服务选择**
```javascript
{
    ai_service: 'equipment-recommendation',
    timestamp: '2025-10-19T10:30:00Z'
}
```

**阶段2: 设备类型选择**
```javascript
{
    ai_service: 'equipment-recommendation',
    equipment_type: 'digital-printing',
    timestamp: '2025-10-19T10:30:15Z'
}
```

**阶段3: 需求表单**
```javascript
{
    ai_service: 'equipment-recommendation',
    equipment_type: 'digital-printing',
    requirements: {
        product_type: 'both',
        daily_volume: 3000,
        print_quality: 'high-definition',
        print_width: 'medium',
        colors: 'full-color',
        budget: 'mid-range',
        delivery: 'standard'
    },
    timestamp: '2025-10-19T10:32:00Z'
}
```

**阶段4: 询价请求**
```javascript
{
    ai_service: 'equipment-recommendation',
    equipment_type: 'digital-printing',
    requirements: { ... },
    recommended_equipment: {
        id: 'nexus-digiprint-2500-hd',
        name: 'NEXUS DigiPrint 2500 HD',
        match_score: 95
    },
    user_info: {
        name: 'John Doe',
        company: 'ABC Packaging',
        email: 'john@abc.com',
        phone: '+1-555-0100',
        country: 'United States'
    },
    message: 'Interested in learning more...',
    timestamp: '2025-10-19T10:35:00Z',
    quote_request_id: 'QR-MGX4B5VO-6SXJ2'
}
```

---

## 🚀 开发计划

### Phase 1: 三层级流程实现
- [ ] 修改HTML结构,添加第一层(AI服务选择)
- [ ] 实现第一层到第二层的条件显示
- [ ] 添加平滑展开/收起动画
- [ ] 测试三层级流程

### Phase 2: Request Quote功能
- [ ] 创建询价表单模态框HTML/CSS
- [ ] 实现表单验证
- [ ] 集成EmailJS或后端API
- [ ] 测试邮件发送功能
- [ ] 添加成功提示

### Phase 3: View Details功能
- [ ] 实现设备ID映射
- [ ] 添加跳转逻辑
- [ ] 测试URL参数传递
- [ ] 确保产品详情页正确接收参数

### Phase 4: 测试和优化
- [ ] 完整流程测试
- [ ] 跨浏览器测试
- [ ] 响应式设计测试
- [ ] 性能优化
- [ ] 文档更新

---

## ✅ 成功标准

1. **三层级流程**:
   - ✅ 第一层: AI服务选择正常工作
   - ✅ 第二层: 仅在选择设备选型时显示
   - ✅ 第三层: 动态表单正常工作
   - ✅ 第四层: 推荐结果正确展示

2. **Request Quote功能**:
   - ✅ 模态框正常打开/关闭
   - ✅ 表单验证正常工作
   - ✅ 数据成功发送到后台/邮件
   - ✅ 成功提示正确显示

3. **View Details功能**:
   - ✅ 正确跳转到产品详情页
   - ✅ URL参数正确传递
   - ✅ 产品详情页正确接收参数

4. **用户体验**:
   - ✅ 流程清晰易懂
   - ✅ 交互流畅自然
   - ✅ 响应式设计完美
   - ✅ 加载速度快

---

**V13.1设计文档完成!**

