# 行业TOP公司设备选型系统分析

**研究日期**: 2025-10-19  
**目标**: 为NEXUS设计专业的设备选型系统

---

## BOBST Product Finder 分析

### 选型逻辑 (4个维度)

**1. Industries (行业应用)**
- Labels (标签) - 120 products
- Flexible packaging (软包装) - 123 products  
- Folding carton (折叠纸盒) - 124 products
- Corrugated board (瓦楞纸板) - 126 products

**2. Processes (工艺流程)**
- Printing (印刷)
- Die-cutting (模切)
- Folding-gluing (折叠粘合)
- Laminating (覆膜)
- Coating (涂布)
- Converting (加工)

**3. End-use categories (最终用途)**
- Food (食品)
- Beverages (饮料)
- Personal care (个人护理)
- Industrial & transit (工业运输)
- e-commerce packaging (电商包装)

**4. Substrate width (基材宽度)**
- 不同宽度规格

### 关键特点

✅ **多维度筛选**: 4个维度交叉筛选  
✅ **实时产品数量**: 显示每个选项对应的产品数  
✅ **视觉化展示**: 产品卡片+图片+型号  
✅ **分级命名**: NOVA(入门) → VISION(中端) → EXPERT(高端) → MASTER(顶级)

---

## 设备选型最佳实践

### 核心问题框架

**第1层: 应用场景 (What do you make?)**
- 产品类型: 标签/软包装/纸盒/瓦楞纸板
- 最终用途: 食品/饮料/电商/工业

**第2层: 生产需求 (How much do you produce?)**
- 产量规模: 小批量/中等/大批量
- 生产速度: 米/分钟 或 件/小时
- 班次: 单班/双班/三班

**第3层: 工艺要求 (What quality do you need?)**
- 印刷质量: 标准/高清/超高清
- 工艺复杂度: 单工艺/多工艺组合
- 自动化程度: 半自动/全自动/智能化

**第4层: 技术规格 (Technical specifications)**
- 基材宽度: mm
- 最大速度: m/min
- 印刷色数: 1-8色
- 特殊功能: 烫金/压纹/覆膜等

**第5层: 商业考量 (Business factors)**
- 预算范围: $
- 交付时间: 周/月
- 场地限制: 面积/层高/电力
- 未来扩展: 是否需要升级空间

---

## NEXUS设备选型系统设计

### 针对8大产品分类的选型流程

#### 1. Digital Printing Machines (数字印刷机)

**Q1: Production volume?** (产量)
- Small runs (<1000 sheets/day)
- Medium runs (1000-5000 sheets/day)
- Large runs (>5000 sheets/day)

**Q2: Print quality requirement?** (质量要求)
- Standard (300-600 DPI)
- High definition (600-1200 DPI)
- Ultra HD (>1200 DPI)

**Q3: Substrate type?** (基材类型)
- Corrugated board only
- Folding carton only
- Both corrugated & carton

**推荐逻辑**:
- Small + Standard + Corrugated → Entry-level digital press
- Large + Ultra HD + Both → High-end digital press

---

#### 2. Die-Cutting Machines (模切机)

**Q1: Production speed requirement?** (速度需求)
- Standard (<5000 sheets/hour)
- High speed (5000-8000 sheets/hour)
- Ultra high speed (>8000 sheets/hour)

**Q2: Maximum sheet size?** (最大尺寸)
- Small format (<1000mm)
- Medium format (1000-1600mm)
- Large format (>1600mm)

**Q3: Process complexity?** (工艺复杂度)
- Die-cutting only
- Die-cutting + stripping
- Die-cutting + stripping + blanking

**推荐逻辑**:
- Standard + Small + Simple → Flatbed die-cutter (entry)
- Ultra high + Large + Complex → Rotary die-cutter (premium)

---

#### 3. Feeding/Palletizing Machines (送料/码垛机)

**Q1: Automation level?** (自动化程度)
- Semi-automatic (manual loading)
- Fully automatic (auto loading)
- Robotic system (AI-powered, 3D vision)

**Q2: Maximum load capacity?** (最大负载)
- Light duty (<200kg per stack)
- Medium duty (200-350kg per stack)
- Heavy duty (>350kg per stack)

**Q3: Integration requirement?** (集成需求)
- Standalone unit
- Inline with folder-gluer
- End-of-line solution

**推荐逻辑**:
- Semi + Light + Standalone → Basic palletizer
- Robotic + Heavy + End-of-line → Advanced robotic system

---

#### 4. Strapping/Stitching Machines (打包/钉箱机)

**Q1: Box size range?** (纸箱尺寸范围)
- Small boxes (<500mm)
- Medium boxes (500-1200mm)
- Large boxes (>1200mm)

**Q2: Production speed?** (生产速度)
- Low speed (<20 boxes/min)
- Medium speed (20-40 boxes/min)
- High speed (>40 boxes/min)

**Q3: Strapping method?** (打包方式)
- Stitching only (钉箱)
- Strapping only (打包带)
- Both stitching & strapping

**推荐逻辑**:
- Small + Low + Stitching → Manual stitcher
- Large + High + Both → Automatic strapping machine

---

#### 5. Folder Gluer/Stitcher (糊盒/钉箱机)

**Q1: Box style variety?** (纸箱款式多样性)
- Standard RSC only (标准款)
- Multiple styles (3-5 types)
- Complex designs (>5 types)

**Q2: Production volume?** (产量)
- Small batches (<5000 boxes/day)
- Medium batches (5000-20000 boxes/day)
- Large batches (>20000 boxes/day)

**Q3: Changeover frequency?** (换单频率)
- Rare (weekly)
- Moderate (daily)
- Frequent (multiple times/day)

**推荐逻辑**:
- Standard + Small + Rare → Basic folder-gluer
- Complex + Large + Frequent → High-speed folder-gluer with quick changeover

---

#### 6. Laminator/Filming Machine (覆膜机)

**Q1: Lamination type?** (覆膜类型)
- Water-based lamination
- Solvent-based lamination
- Solventless lamination

**Q2: Substrate width?** (基材宽度)
- Narrow web (<800mm)
- Mid web (800-1300mm)
- Wide web (>1300mm)

**Q3: Production speed?** (生产速度)
- Standard (<200 m/min)
- High speed (200-400 m/min)
- Ultra high speed (>400 m/min)

**推荐逻辑**:
- Water + Narrow + Standard → Entry-level laminator
- Solventless + Wide + Ultra high → Premium laminator

---

#### 7. Corrugator Line (瓦楞纸板生产线)

**Q1: Production capacity?** (产能)
- Small (<100 million sqm/year)
- Medium (100-200 million sqm/year)
- Large (>200 million sqm/year)

**Q2: Line speed?** (线速)
- Standard (<200 m/min)
- High speed (200-350 m/min)
- Ultra high speed (>350 m/min)

**Q3: Board width?** (纸板宽度)
- Narrow (<2000mm)
- Medium (2000-2500mm)
- Wide (>2500mm)

**推荐逻辑**:
- Small + Standard + Narrow → Compact corrugator
- Large + Ultra high + Wide → High-speed corrugator line

---

#### 8. Flexo Printing Machines (柔印机)

**Q1: Printing width?** (印刷宽度)
- Narrow web (<800mm)
- Mid web (800-1600mm)
- Wide web (>1600mm)

**Q2: Number of colors?** (色数)
- 1-2 colors
- 3-4 colors
- 5-8 colors

**Q3: Print quality?** (印刷质量)
- Standard (100-150 LPI)
- High definition (150-200 LPI)
- Ultra HD (>200 LPI)

**推荐逻辑**:
- Narrow + 1-2 colors + Standard → Entry flexo press
- Wide + 5-8 colors + Ultra HD → Premium CI flexo press

---

## 推荐算法设计

### 评分系统

每个设备根据用户需求计算匹配度分数:

```javascript
function calculateMatchScore(equipment, userRequirements) {
    let score = 0;
    let maxScore = 0;
    
    // 产量匹配 (权重: 30%)
    if (equipment.capacity >= userRequirements.minCapacity &&
        equipment.capacity <= userRequirements.maxCapacity) {
        score += 30;
    }
    maxScore += 30;
    
    // 质量匹配 (权重: 25%)
    if (equipment.quality >= userRequirements.quality) {
        score += 25;
    }
    maxScore += 25;
    
    // 预算匹配 (权重: 20%)
    if (equipment.price <= userRequirements.budget) {
        score += 20;
    }
    maxScore += 20;
    
    // 功能匹配 (权重: 15%)
    const featureMatch = calculateFeatureMatch(equipment, userRequirements);
    score += featureMatch * 15;
    maxScore += 15;
    
    // 交付时间匹配 (权重: 10%)
    if (equipment.leadTime <= userRequirements.deadline) {
        score += 10;
    }
    maxScore += 10;
    
    return (score / maxScore) * 100; // 返回百分比
}
```

### 推荐输出格式

```
🎯 Recommended Equipment

Based on your requirements, here are the top 3 matches:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

#1 [Equipment Name] - 95% Match ⭐⭐⭐⭐⭐

Supplier: [Company Name]
Model: [Model Number]
Price Range: $XXX,XXX - $XXX,XXX

✅ Perfect match for your production volume
✅ Meets all quality requirements
✅ Within budget range

Key Specifications:
• Speed: XXX m/min
• Width: XXX mm
• Colors: X
• Automation: Fully automatic

Why recommended:
[AI-generated explanation based on user requirements]

[View Details] [Contact Supplier] [Request Quote]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

#2 [Equipment Name] - 88% Match ⭐⭐⭐⭐

[Similar format...]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

#3 [Equipment Name] - 82% Match ⭐⭐⭐⭐

[Similar format...]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💡 Need help deciding?
[Schedule consultation] [Compare all 3] [See more options]
```

---

## 关键改进建议

### 1. 滚动问题修复 ✅

**问题**: 界面不能上下滚动  
**原因**: CSS overflow设置错误  
**解决方案**:
```css
.chat-messages {
    overflow-y: auto; /* 允许垂直滚动 */
    max-height: calc(100vh - 200px); /* 限制最大高度 */
}
```

### 2. 设备数据库建立 ✅

需要为每个设备类型建立数据库:
- 设备名称和型号
- 供应商信息
- 技术规格
- 价格范围
- 适用场景
- 产品图片

### 3. 智能推荐优化 ✅

- 使用评分算法
- 考虑多个维度
- 提供3-5个推荐选项
- 解释推荐理由

---

## 总结

**BOBST的成功经验**:
1. 多维度筛选(行业+工艺+用途+规格)
2. 实时显示产品数量
3. 分级产品命名(NOVA→VISION→EXPERT→MASTER)
4. 视觉化产品展示

**NEXUS应该学习**:
1. 建立完整的设备数据库
2. 设计专业的选型问题
3. 开发智能推荐算法
4. 提供详细的设备对比

**下一步行动**:
1. 修复界面滚动问题
2. 优化设备选型流程
3. 建立设备数据库
4. 实现智能推荐算法

