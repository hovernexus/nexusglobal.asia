# NEXUS V11.4.0 快速部署指南

## 🎯 本次更新目标

**彻底修复ODJ产品图片不匹配问题**,覆盖所有页面:
- ✅ Feeding & Palletizing Systems分类页面
- ✅ ODJ公司详情页面

**修复的产品:**
- ✅ JXB - 从团队合影改为机械臂设备照片
- ✅ FP-1650 - 从产品目录改为单独产品照片

---

## 📦 部署步骤(5分钟)

### 第一步:解压更新包

```bash
tar -xzf NEXUS-V11.4.0-INCREMENTAL-UPDATE.tar.gz
cd NEXUS-V11.4.0-INCREMENTAL-UPDATE
```

### 第二步:上传文件到GitHub

**方式A: 网页上传(推荐,最简单)**

#### 2.1 上传HTML和VERSION文件

1. 访问: https://github.com/nexusglobal/nexusglobal.asia

2. 点击 **"Add file"** → **"Upload files"**

3. 拖入以下文件:
   - `category-feeding-palletizing.html`
   - `VERSION.txt`

4. 提交信息填写: `Update V11.4.0: Fix ODJ product images (part 1)`

5. 点击 **"Commit changes"**

#### 2.2 上传JSON文件

1. 进入 `data/` 目录

2. 点击 **"Add file"** → **"Upload files"**

3. 拖入 `products-complete.json`

4. 提交信息填写: `Update V11.4.0: Fix ODJ product images (part 2)`

5. 点击 **"Commit changes"**

#### 2.3 上传图片文件

1. 进入 `images/products/` 目录

2. 点击 **"Add file"** → **"Upload files"**

3. 拖入以下文件:
   - `odj-jxb-2.jpg`
   - `odj-fp1650-2.jpg`

4. 提交信息填写: `Update V11.4.0: Add correct ODJ product images`

5. 点击 **"Commit changes"**

---

**方式B: Git命令行(适合熟悉Git的用户)**

```bash
# 克隆仓库
git clone https://github.com/nexusglobal/nexusglobal.asia.git
cd nexusglobal.asia

# 复制文件
cp ../NEXUS-V11.4.0-INCREMENTAL-UPDATE/category-feeding-palletizing.html ./
cp ../NEXUS-V11.4.0-INCREMENTAL-UPDATE/VERSION.txt ./
cp ../NEXUS-V11.4.0-INCREMENTAL-UPDATE/data/products-complete.json ./data/
cp ../NEXUS-V11.4.0-INCREMENTAL-UPDATE/images/products/*.jpg ./images/products/

# 提交推送
git add .
git commit -m "Update V11.4.0: Complete fix for ODJ product image mismatches"
git push origin main
```

---

### 第三步:等待部署完成

- GitHub Actions会自动开始部署
- 等待1-3分钟,直到看到绿色✅标记

---

### 第四步:验证结果

#### 4.1 验证分类页面

1. 访问: https://nexusglobal.asia/category-feeding-palletizing.html

2. **强制刷新浏览器**:
   - Windows: **Ctrl + Shift + R**
   - Mac: **Cmd + Shift + R**

3. 检查产品图片:
   - **JXB** - 应显示黄色框架的机械臂送料系统 ✅
   - **FP-1650** - 应显示白色双模块自动解捆系统 ✅

#### 4.2 验证公司页面

1. 访问: https://nexusglobal.asia/company-detail.html?id=odj&type=supplier

2. **强制刷新浏览器**: **Ctrl + Shift + R** 或 **Cmd + Shift + R**

3. 滚动到"Products & Solutions"部分

4. 检查产品图片:
   - **JXB** - 应显示黄色框架的机械臂送料系统 ✅
   - **FP-1650** - 应显示白色双模块自动解捆系统 ✅

---

## ✅ 预期结果

### 分类页面效果

| 产品 | 修复前 | 修复后 |
|------|--------|--------|
| JXB | 团队合影 ❌ | 机械臂设备 ✅ |
| FP-1650 | 产品目录 ❌ | 解捆系统 ✅ |

### 公司页面效果

| 产品 | 修复前 | 修复后 |
|------|--------|--------|
| JXB | 团队合影 ❌ | 机械臂设备 ✅ |
| FP-1650 | 产品目录 ❌ | 解捆系统 ✅ |

---

## 🔧 故障排除

### 问题1: 上传后图片仍然不正确

**原因:** 浏览器缓存或CDN缓存

**解决方案:**
1. 清除浏览器缓存
2. 使用无痕模式访问
3. 等待CDN缓存更新(最多5分钟)
4. 尝试不同的浏览器

### 问题2: JSON文件上传后网站出错

**原因:** JSON文件格式错误或编码问题

**解决方案:**
1. 使用JSON验证工具检查格式: https://jsonlint.com
2. 确认文件编码为UTF-8
3. 重新下载并上传JSON文件
4. 查看浏览器控制台的错误信息

### 问题3: 图片显示破损图标

**原因:** 图片文件未正确上传或路径错误

**解决方案:**
1. 确认图片文件已上传到 `images/products/` 目录
2. 检查文件名大小写是否完全匹配
3. 重新上传图片文件
4. 检查GitHub仓库中的文件是否存在

### 问题4: GitHub Actions部署失败

**原因:** 构建错误或配置问题

**解决方案:**
1. 查看GitHub Actions的详细日志
2. 检查是否有语法错误
3. 重新触发部署(重新提交一次)
4. 联系技术支持

---

## 📞 需要帮助?

如果遇到任何问题,请提供:
1. **浏览器截图** - 显示当前页面状态
2. **访问的URL** - 完整的网址
3. **浏览器信息** - 类型和版本
4. **控制台错误** - 按F12打开开发者工具查看
5. **GitHub Actions日志** - 如果部署失败

我会立即协助解决!

---

## 📋 文件清单

确认以下文件都已正确上传:

- [ ] `category-feeding-palletizing.html` (16KB) - 根目录
- [ ] `VERSION.txt` (620B) - 根目录
- [ ] `data/products-complete.json` (55KB) - data目录
- [ ] `images/products/odj-jxb-2.jpg` (228KB) - images/products目录
- [ ] `images/products/odj-fp1650-2.jpg` (91KB) - images/products目录

---

**祝您部署顺利!** 🎉

如果一切正常,您将看到所有ODJ产品在所有页面上都显示正确的产品照片!

