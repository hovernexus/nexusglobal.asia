# NEXUS V11.3.5 快速部署指南

## 📦 部署包内容

**文件名**: `NEXUS-V11.3.5-FINAL.tar.gz` (25MB)

**包含内容**:
- 完整的NEXUS网站文件
- 所有HTML、CSS、JavaScript文件
- 产品和供应商数据(JSON)
- 图片资源(产品图、Logo等)
- 文档和说明文件

---

## 🚀 GitHub Pages 部署步骤

### 方法一: 使用GitHub网页界面(推荐)

#### 步骤1: 解压部署包

```bash
tar -xzf NEXUS-V11.3.5-FINAL.tar.gz
cd nexus-v11.3.1
```

#### 步骤2: 初始化Git仓库(如果是新仓库)

```bash
git init
git add .
git commit -m "Deploy NEXUS V11.3.5"
```

#### 步骤3: 推送到GitHub

```bash
# 如果是新仓库
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
git branch -M main
git push -u origin main

# 如果是更新现有仓库
git add .
git commit -m "Update to V11.3.5 - Fix supplier pages and add platform introduction"
git push origin main
```

#### 步骤4: 启用GitHub Pages

1. 进入GitHub仓库页面
2. 点击 **Settings** (设置)
3. 在左侧菜单中找到 **Pages**
4. 在 **Source** 下选择 **main** 分支
5. 点击 **Save** (保存)
6. 等待几分钟,GitHub会自动部署

#### 步骤5: 访问网站

部署完成后,访问:
```
https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/
```

---

### 方法二: 使用GitHub Desktop(适合非技术用户)

1. 下载并安装 [GitHub Desktop](https://desktop.github.com/)
2. 解压`NEXUS-V11.3.5-FINAL.tar.gz`
3. 在GitHub Desktop中选择 **File > Add Local Repository**
4. 选择解压后的`nexus-v11.3.1`文件夹
5. 点击 **Publish repository** 发布到GitHub
6. 按照方法一的步骤4启用GitHub Pages

---

## ⚠️ 重要提示

### 1. 清除浏览器缓存

部署后首次访问时,建议清除浏览器缓存:
- **Windows**: `Ctrl + Shift + R`
- **Mac**: `Cmd + Shift + R`
- 或使用无痕/隐私模式

### 2. 验证关键功能

部署后请验证以下功能:
- ✅ 首页正常加载
- ✅ WOOD WELL LIMITED详情页可以打开
- ✅ ABC详情页可以打开
- ✅ ODJ产品详情页正常显示
- ✅ 墨西哥客户详情页显示Logo和About Us

### 3. 文件权限

确保所有文件都已正确上传,特别是:
- `data/products-complete.json`
- `data/registered-companies.json`
- `images/products/` 目录下的所有图片
- `images/customers/` 目录下的客户Logo

---

## 📄 本次更新的关键文件

以下文件在V11.3.5中有重要更新,请确保正确部署:

1. **data/products-complete.json**
   - 添加了WOOD WELL和ABC供应商数据
   - Suppliers总数: 13家

2. **company-detail-loader.js**
   - 修复了showError函数
   - 添加了缓存破坏机制

3. **company-detail.html**
   - 添加了contact-section的id属性
   - 更新了JavaScript版本号(v=11.3.6)

4. **NEXUS-PLATFORM-INTRODUCTION.md** (新增)
   - 平台详细介绍文档
   - 用于市场推广和会员招募

---

## 🔍 故障排查

### 问题1: WOOD WELL或ABC页面仍然显示错误

**解决方案**:
1. 清除浏览器缓存
2. 检查`data/products-complete.json`是否正确上传
3. 在浏览器控制台查看是否有JavaScript错误

### 问题2: 图片无法显示

**解决方案**:
1. 检查`images/`目录是否完整上传
2. 确认图片文件名大小写正确(Linux区分大小写)
3. 检查图片路径是否正确

### 问题3: 客户Logo不显示

**解决方案**:
1. 清除浏览器缓存(强制刷新)
2. 检查`images/customers/`目录是否包含所有Logo文件
3. 验证`data/registered-companies.json`中的logo路径

---

## 📞 技术支持

如遇到部署问题,请检查:
1. GitHub Pages是否已正确启用
2. 仓库是否设置为Public(公开)
3. 所有文件是否完整上传

---

## 🎯 下一步

部署成功后,您可以:
1. 使用`NEXUS-PLATFORM-INTRODUCTION.md`进行市场推广
2. 向潜在供应商和客户展示平台功能
3. 收集反馈并规划下一步功能开发

---

**部署完成!祝您使用愉快!** 🎉

