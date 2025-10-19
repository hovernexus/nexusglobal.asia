# NEXUS AI Equipment Selection Flow Design
## 8大设备类型精准问答流程

**目标**: 通过3个递进式问题精准锁定客户需求,实现智能设备推荐

---

## 8大设备类型

1. **Digital Printing Machines** (数字印刷机) 🖨️
2. **Die-Cutting Machines** (模切机) ✂️
3. **Feeding/Palletizing Machines** (上料/码垛机) 🤖
4. **Strapping/Stitching Machines** (打包/钉箱机) 📦
5. **Folder Gluer/Stitcher** (糊箱/钉箱机) 📋
6. **Laminator/Filming Machine** (覆膜机) 🎨
7. **Corrugator Line** (瓦楞纸板生产线) 🏭
8. **Flexo Printing Machines** (柔版印刷机) 🎨

---

## 递进式问答流程设计

### 阶段1: 设备类型选择
**问题**: "Which type of equipment are you looking for?"

**选项** (8个快速回复按钮):
- 🖨️ Digital Printing
- ✂️ Die-Cutting
- 🤖 Feeding/Palletizing
- 📦 Strapping/Stitching
- 📋 Folder Gluer
- 🎨 Laminator/Filming
- 🏭 Corrugator Line
- 🎨 Flexo Printing

---

## 各设备类型的3问递进流程

### 1. Digital Printing Machines 🖨️

**Q1: Production Scale** (生产规模)
- What is your expected monthly production volume?
  - [ ] Small scale: <50,000 sqm/month
  - [ ] Medium scale: 50,000-200,000 sqm/month
  - [ ] Large scale: >200,000 sqm/month

**Q2: Print Requirements** (印刷需求)
- What are your main printing requirements?
  - [ ] High-definition color printing (HD quality)
  - [ ] Variable data printing (personalization)
  - [ ] High-speed production (>100 sqm/min)
  - [ ] Wide format printing (>2500mm)

**Q3: Budget Range** (预算范围)
- What is your approximate budget range?
  - [ ] Entry level: $200,000-$500,000
  - [ ] Mid-range: $500,000-$1,000,000
  - [ ] High-end: >$1,000,000

**推荐逻辑**:
- Small + HD + Entry → SCB1600
- Medium + Variable + Mid → Ultra2500W
- Large + High-speed + High-end → Ultra2500W Pro
- Medium + Wide + Mid → MCB2500/MCB2512
- Large + HD + High-end → Glory160X HD

---

### 2. Die-Cutting Machines ✂️

**Q1: Cutting Technology** (切割技术)
- Which cutting technology do you prefer?
  - [ ] Laser die-cutting (high precision, no die required)
  - [ ] Rotary die-cutting (high speed, suitable for mass production)
  - [ ] Flatbed die-cutting (versatile, suitable for complex shapes)

**Q2: Board Size** (纸板尺寸)
- What is your maximum board size?
  - [ ] Small: <800mm width
  - [ ] Medium: 800-1200mm width
  - [ ] Large: >1200mm width

**Q3: Production Speed** (生产速度)
- What is your required production speed?
  - [ ] Low speed: <3,000 sheets/hour
  - [ ] Medium speed: 3,000-6,000 sheets/hour
  - [ ] High speed: >6,000 sheets/hour

**推荐逻辑**:
- Laser + Medium + Low → MK800SF
- Laser + Large + Medium → MK1060F
- Rotary + Large + High → TD1650S
- Rotary + Medium + Medium → TD800S
- Flatbed + Large + Medium → DS106
- Flatbed + Medium + Low → PYQ1040

---

### 3. Feeding/Palletizing Machines 🤖

**Q1: Automation Level** (自动化程度)
- What level of automation do you need?
  - [ ] Semi-automatic (manual assistance required)
  - [ ] Fully automatic (minimal human intervention)
  - [ ] Robotic system (AI-powered, 3D vision)

**Q2: Load Capacity** (负载能力)
- What is your maximum load requirement?
  - [ ] Light duty: <200kg per stack
  - [ ] Medium duty: 200-350kg per stack
  - [ ] Heavy duty: >350kg per stack

**Q3: Production Line Integration** (生产线集成)
- How will this integrate with your production line?
  - [ ] Standalone unit (independent operation)
  - [ ] Inline integration (connected to printing/die-cutting)
  - [ ] End-of-line solution (final packaging stage)

**推荐逻辑**:
- Robotic + Heavy + End-of-line → MD-350 Intelligent Palletizer
- Fully auto + Medium + Inline → JXB Robotic Arm Feeder
- Semi-auto + Light + Standalone → MD-180 Compact
- Fully auto + Medium + Inline → QSL2 Slope Type
- Fully auto + Medium + Inline → QSL3 Baffle Type
- Fully auto + Medium + Inline → QXY3 Bottom Print Type

---

### 4. Strapping/Stitching Machines 📦

**Q1: Bundling Method** (打包方式)
- Which bundling method do you prefer?
  - [ ] Strapping (plastic/PP strap)
  - [ ] Stitching (wire stitching)
  - [ ] Both (combined solution)

**Q2: Bundle Size** (打包尺寸)
- What is your typical bundle size?
  - [ ] Small: <600mm width
  - [ ] Medium: 600-900mm width
  - [ ] Large: >900mm width

**Q3: Automation Requirement** (自动化需求)
- What is your automation requirement?
  - [ ] Manual operation (operator-controlled)
  - [ ] Semi-automatic (auto-feed, manual trigger)
  - [ ] Fully automatic (continuous operation)

**推荐逻辑**:
- Strapping + Small + Semi-auto → ST-600A Automatic Strapper
- Strapping + Large + Fully auto → ST-900B Heavy-Duty Strapper
- Stitching + Medium + Fully auto → NS-208 Double-Head Stitcher
- Both + Medium + Fully auto → GH-650 Automatic Folder Gluer
- Strapping + Large + Semi-auto → SC-1200 Sheeter & Scorer

---

### 5. Folder Gluer/Stitcher 📋

**Q1: Box Style** (纸箱样式)
- What type of boxes do you mainly produce?
  - [ ] Straight-line boxes (simple folding)
  - [ ] 4/6-corner boxes (complex folding)
  - [ ] Crash-lock bottom boxes (auto-lock)

**Q2: Production Speed** (生产速度)
- What is your required production speed?
  - [ ] Low speed: <100 boxes/min
  - [ ] Medium speed: 100-200 boxes/min
  - [ ] High speed: >200 boxes/min

**Q3: Additional Features** (附加功能)
- Which additional features do you need?
  - [ ] Inline stitching (wire stitching capability)
  - [ ] Pre-folding section (complex box preparation)
  - [ ] Quality inspection system (auto-reject defects)

**推荐逻辑**:
- Straight-line + Medium + None → Auto Folder Gluer
- 4/6-corner + Medium + Stitching → Stitcher Machine
- Crash-lock + High + Pre-folding → Inline Folder

---

### 6. Laminator/Filming Machine 🎨

**Q1: Lamination Type** (覆膜类型)
- Which lamination process do you need?
  - [ ] Thermal lamination (heat-activated)
  - [ ] Cold lamination (pressure-sensitive)
  - [ ] UV coating (liquid UV application)

**Q2: Board Size** (纸板尺寸)
- What is your maximum board size?
  - [ ] Small: <1000mm width
  - [ ] Medium: 1000-1500mm width
  - [ ] Large: >1500mm width

**Q3: Production Volume** (生产量)
- What is your daily production requirement?
  - [ ] Low volume: <5,000 sheets/day
  - [ ] Medium volume: 5,000-15,000 sheets/day
  - [ ] High volume: >15,000 sheets/day

**推荐逻辑**:
- Thermal + Medium + Medium → Automatic Laminator
- Cold + Large + High → Filming Machine
- UV + Medium + Medium → UV Coating Machine

---

### 7. Corrugator Line 🏭

**Q1: Production Capacity** (生产能力)
- What is your target production capacity?
  - [ ] Small line: <100m/min
  - [ ] Medium line: 100-200m/min
  - [ ] High-speed line: >200m/min

**Q2: Flute Type** (瓦楞类型)
- Which flute types do you need to produce?
  - [ ] Single flute (A, B, C, E)
  - [ ] Double wall (AB, BC, etc.)
  - [ ] Triple wall (AAA, BBC, etc.)

**Q3: Board Width** (纸板宽度)
- What is your required board width?
  - [ ] Narrow: <1800mm
  - [ ] Standard: 1800-2500mm
  - [ ] Wide: >2500mm

**推荐逻辑**:
- Small + Single + Narrow → Single Facer
- Medium + Double + Standard → Double Facer
- High-speed + Triple + Wide → High-Speed Corrugator

---

### 8. Flexo Printing Machines 🎨

**Q1: Printing Configuration** (印刷配置)
- How many colors do you need?
  - [ ] 1-2 colors (basic printing)
  - [ ] 3-4 colors (standard multi-color)
  - [ ] 5+ colors (high-quality printing)

**Q2: Printing Position** (印刷位置)
- Where in your production process?
  - [ ] Pre-printing (before corrugating)
  - [ ] Post-printing (after corrugating)
  - [ ] Inline printing (integrated with folder gluer)

**Q3: Production Speed** (生产速度)
- What is your required printing speed?
  - [ ] Low speed: <100m/min
  - [ ] Medium speed: 100-200m/min
  - [ ] High speed: >200m/min

**推荐逻辑**:
- 1-2 + Post + Low → Water-based Printing
- 3-4 + Post + Medium → Inline Flexo Printer
- 5+ + Pre + High → Pre-printing Machine
- 3-4 + Inline + Medium → Flexo Folder Gluer
- 3-4 + Post + High → High-Speed Flexo
- 5+ + Post + High → Multi-Color Flexo

---

## 通用流程设计

### 流程结构
```
Start
  ↓
Welcome (English)
  ↓
Equipment Type Selection (8 options)
  ↓
Question 1 (针对性问题)
  ↓
Question 2 (递进式问题)
  ↓
Question 3 (精准定位)
  ↓
Equipment Recommendation (1-3 options)
  ↓
Contact Information Collection
  ↓
Submission & Confirmation
```

### 关键特性
1. **英语为主**: 所有AI回复使用英语
2. **快速回复按钮**: 每个问题提供选项按钮
3. **递进式提问**: 3个问题层层递进
4. **智能推荐**: 基于答案组合推荐设备
5. **专业术语**: 使用行业标准术语

---

## 推荐结果展示格式

```
Based on your requirements, I recommend the following equipment:

🎯 **Recommended Equipment**

**1. [Equipment Name]**
- Category: [Category]
- Key Features:
  • [Feature 1]
  • [Feature 2]
  • [Feature 3]
- Price Range: $[min] - $[max]
- Delivery Time: [time]
- Supplier: [company]

**Why this equipment?**
✓ Matches your production scale ([scale])
✓ Meets your [requirement] needs
✓ Fits within your budget range

**Alternative Options** (if applicable):
- [Alternative 1]: [Brief reason]
- [Alternative 2]: [Brief reason]

Would you like to:
[ ] Get detailed quotation
[ ] Schedule technical consultation
[ ] View equipment specifications
[ ] Compare with alternatives
```

---

## 实现要点

### 1. 语言设置
- **默认语言**: English
- **AI回复**: 100% English
- **快速回复按钮**: English
- **系统提示**: English

### 2. 问答逻辑
- 使用决策树算法
- 每个答案影响下一个问题
- 最终推荐基于3个答案的组合

### 3. 数据结构
```javascript
{
  equipmentType: 'digital-printing',
  answers: {
    q1: 'medium-scale',
    q2: 'variable-data',
    q3: 'mid-range'
  },
  recommendation: ['Ultra2500W'],
  alternatives: ['MCB2500', 'MCB2512']
}
```

### 4. 用户体验
- 清晰的进度指示(Question 1 of 3)
- 可以返回修改答案
- 显示已选择的选项
- 推荐结果可视化展示

---

**设计完成日期**: 2025-10-19  
**版本**: V12.1  
**目标**: 3问精准锁定,智能推荐设备

