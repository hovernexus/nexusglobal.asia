# NEXUS V11.3.9 快速部署指南

## 🎯 本次更新目标

修复 **Feeding & Palletizing Systems** 页面中的产品图片不匹配问题:
- ✅ JXB产品图片从团队合影改为实际设备照片
- ✅ FP-1650产品图片从产品目录页面改为单独产品照片

---

## 📦 部署步骤(3分钟)

### 第一步:解压更新包

```bash
tar -xzf NEXUS-V11.3.9-INCREMENTAL-UPDATE.tar.gz
cd NEXUS-V11.3.9-INCREMENTAL-UPDATE
```

### 第二步:上传文件到GitHub

**方式A: 网页上传(推荐,最简单)**

1. 访问: https://github.com/nexusglobal/nexusglobal.asia

2. 上传HTML和VERSION文件:
   - 点击 **"Add file"** → **"Upload files"**
   - 拖入 `category-feeding-palletizing.html` 和 `VERSION.txt`
   - 提交信息填写: `Update V11.3.9: Fix product images`
   - 点击 **"Commit changes"**

3. 上传图片文件:
   - 进入 `images/products/` 目录
   - 点击 **"Add file"** → **"Upload files"**
   - 拖入 `odj-jxb-2.jpg` 和 `odj-fp1650-2.jpg`
   - 提交信息填写: `Add correct product images`
   - 点击 **"Commit changes"**

**方式B: Git命令行**

```bash
git clone https://github.com/nexusglobal/nexusglobal.asia.git
cd nexusglobal.asia

# 复制文件
cp ../NEXUS-V11.3.9-INCREMENTAL-UPDATE/category-feeding-palletizing.html ./
cp ../NEXUS-V11.3.9-INCREMENTAL-UPDATE/VERSION.txt ./
cp ../NEXUS-V11.3.9-INCREMENTAL-UPDATE/images/products/*.jpg ./images/products/

# 提交推送
git add .
git commit -m "Update V11.3.9: Fix product image mismatches"
git push origin main
```

### 第三步:等待部署完成

- GitHub Actions会自动开始部署
- 等待1-3分钟,直到看到绿色✅标记

### 第四步:验证结果

1. 访问: https://nexusglobal.asia/category-feeding-palletizing.html

2. **强制刷新浏览器**:
   - Windows: **Ctrl + Shift + R**
   - Mac: **Cmd + Shift + R**

3. 检查产品图片:
   - **JXB** - 应显示黄色框架的机械臂送料系统 ✅
   - **FP-1650** - 应显示白色双模块自动解捆系统 ✅

---

## ✅ 预期结果

| 产品 | 修复前 | 修复后 |
|------|--------|--------|
| JXB | 团队合影照片 ❌ | 机械臂设备照片 ✅ |
| FP-1650 | 产品目录页面 ❌ | 单独产品照片 ✅ |

---

## 🔧 故障排除

### 问题1: 上传后图片仍然不正确

**解决方案:**
- 清除浏览器缓存
- 使用无痕模式访问
- 等待CDN缓存更新(最多5分钟)

### 问题2: GitHub Actions部署失败

**解决方案:**
- 检查GitHub Actions日志
- 确认所有文件都已成功上传
- 重新触发部署(重新提交一次)

### 问题3: 图片显示破损图标

**解决方案:**
- 确认图片文件已上传到 `images/products/` 目录
- 检查文件名是否正确: `odj-jxb-2.jpg` 和 `odj-fp1650-2.jpg`
- 确认文件路径大小写匹配

---

## 📞 需要帮助?

如果遇到任何问题,请提供:
1. 浏览器截图
2. GitHub Actions日志
3. 具体的错误信息

我会立即协助解决!

