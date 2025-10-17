# NEXUS V11.3.1 快速部署指南

## 部署前准备

### 1. 下载文件
- 下载 `NEXUS-V11.3.1-FINAL.tar.gz` 压缩包
- 解压得到 `nexus-v11.3.1` 文件夹

### 2. 验证文件完整性
确认文件夹中包含以下关键文件：
- `index.html` - 首页
- `main.js` - 主脚本（已修复客户显示）
- `company-detail-loader.js` - 供应商详情页加载器（已修复产品显示）
- `category-loader.js` - 产品分类加载器（已修复字段映射）
- `category-die-cutting-loader.js` - Die-cutting分类加载器（新增）
- `category-die-cutting.html` - Die-cutting分类页面（已修改）
- `data/products-complete.json` - 产品数据（已清理emoji）
- `images/product-placeholder.jpg` - 产品占位符图片（新增）
- `images/products/` - 产品图片目录（新增）

---

## 部署到GitHub Pages

### 方法一：通过GitHub网页界面上传（推荐新手）

#### 步骤1：准备仓库
1. 登录 [GitHub](https://github.com)
2. 进入您的网站仓库（或创建新仓库）
3. **重要：** 备份当前版本（如果有）

#### 步骤2：清空旧文件
1. 在仓库页面，删除所有旧的网站文件
2. 保留 `README.md` 和 `.gitignore`（如果有）

#### 步骤3：上传新文件
1. 点击 `Add file` -> `Upload files`
2. 将 `nexus-v11.3.1` 文件夹**里面的所有文件**拖拽到上传区域
   - ⚠️ **注意：** 上传的是文件夹**里面的文件**，不是文件夹本身
3. 等待所有文件上传完成
4. 在页面底部填写提交信息：`Deploy V11.3.1 - Bug fixes`
5. 点击 `Commit changes` 提交

#### 步骤4：配置GitHub Pages
1. 进入仓库的 `Settings` -> `Pages`
2. 在 `Source` 下拉菜单中选择 `main` 分支
3. 点击 `Save` 保存
4. 等待1-5分钟，页面会显示网站地址

#### 步骤5：验证部署
1. 访问显示的网站地址
2. **使用无痕模式或强制刷新（Ctrl+Shift+R）**
3. 验证修复效果（见下方"验证清单"）

---

### 方法二：通过Git命令行上传（推荐开发者）

#### 前提条件
- 已安装Git
- 已配置GitHub SSH密钥或HTTPS凭据

#### 步骤1：克隆仓库
```bash
git clone https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
cd YOUR-REPO-NAME
```

#### 步骤2：备份当前版本
```bash
git checkout -b backup-v11.3
git push origin backup-v11.3
git checkout main
```

#### 步骤3：替换文件
```bash
# 删除旧文件（保留.git目录）
rm -rf !(.git|README.md|.gitignore)

# 复制新文件
cp -r /path/to/nexus-v11.3.1/* .
```

#### 步骤4：提交并推送
```bash
git add .
git commit -m "Deploy V11.3.1 - Bug fixes: customer display, product photos, emoji cleanup"
git push origin main
```

#### 步骤5：验证部署
等待1-5分钟后访问网站，使用无痕模式验证。

---

## 部署后验证清单

### 必须验证的项目

#### 1. 首页客户显示
- [ ] 访问首页：`https://your-site.github.io/`
- [ ] 滚动到"Our Core Partners"区域
- [ ] 确认"Trusted by Leading Corrugated Manufacturers"部分显示10个墨西哥客户
- [ ] 客户名称格式：**粗体公司名** + Mexico标签

#### 2. 供应商详情页产品显示
- [ ] 访问任一供应商详情页，例如：`https://your-site.github.io/company-detail.html?id=odj&type=supplier`
- [ ] 确认"Products & Solutions"区域显示产品卡片
- [ ] 每个产品卡片包含：
  - 产品照片（不是"Loading..."）
  - 英文产品标题（例如："Full Auto Pre-feeder (Slope Type)"）
  - 产品型号（例如："QSL2"）
  - 产品描述
  - "View Details"按钮

#### 3. 产品分类页面emoji清理
- [ ] 访问：`https://your-site.github.io/category-die-cutting.html`
- [ ] 确认产品卡片显示实际产品图片
- [ ] 确认**不再显示**emoji图标（✂️剪刀）
- [ ] 产品标题为英文

#### 4. 浏览器开发者工具检查
- [ ] 按F12打开开发者工具
- [ ] 查看Console标签，确认无错误信息
- [ ] 查看Network标签，确认所有资源加载成功（HTTP 200）
- [ ] 特别检查以下文件：
  - `main.js`
  - `company-detail-loader.js`
  - `category-die-cutting-loader.js`
  - `data/products-complete.json`
  - `images/product-placeholder.jpg`

---

## 常见问题排查

### 问题1：页面显示旧版本内容
**原因：** 浏览器缓存  
**解决方案：**
1. 使用无痕/隐私模式访问网站
2. 或者强制刷新：`Ctrl + Shift + R` (Windows) / `Cmd + Shift + R` (Mac)
3. 或者手动清除浏览器缓存

### 问题2：GitHub Pages显示404错误
**原因：** 文件未正确上传或部署未完成  
**解决方案：**
1. 检查GitHub仓库中是否有`index.html`文件
2. 检查`Settings -> Pages`中的部署状态
3. 等待5-10分钟让部署完成
4. 确认上传的是文件夹**里面的文件**，不是文件夹本身

### 问题3：客户仍然不显示
**原因：** main.js未更新或被缓存  
**解决方案：**
1. 在浏览器开发者工具中检查Network标签
2. 找到`main.js`文件，查看其内容
3. 确认第195行附近有`displayCustomers()`调用
4. 如果没有，重新上传`main.js`文件

### 问题4：产品显示"Loading..."
**原因：** company-detail-loader.js未更新  
**解决方案：**
1. 检查GitHub仓库中的`company-detail-loader.js`文件
2. 确认第108-145行使用了`product.images[0]`和`product.fullNameEn`
3. 如果没有，重新上传该文件

### 问题5：产品分类页面仍显示emoji
**原因：** category-die-cutting-loader.js未上传或未引用  
**解决方案：**
1. 确认GitHub仓库中有`category-die-cutting-loader.js`文件
2. 检查`category-die-cutting.html`最后是否引用了该脚本
3. 检查`images/products/`目录是否存在并包含图片文件

### 问题6：产品图片不显示
**原因：** images/products目录或占位符图片未上传  
**解决方案：**
1. 确认GitHub仓库中有`images/products/`目录
2. 确认该目录中有以下图片文件：
   - `qsl2-1.jpg`
   - `qsl3-1.jpg`
   - `qxy3-1.jpg`
   - 等等（共9个文件）
3. 确认`images/product-placeholder.jpg`文件存在

---

## 自定义域名配置（可选）

如果您使用自定义域名（如 nexusglobal.asia）：

### 步骤1：配置DNS
在您的域名提供商处添加以下DNS记录：
```
Type: A
Name: @
Value: 185.199.108.153
```
或者使用CNAME：
```
Type: CNAME
Name: www
Value: YOUR-USERNAME.github.io
```

### 步骤2：在GitHub Pages中设置自定义域名
1. 进入仓库的 `Settings` -> `Pages`
2. 在 `Custom domain` 中输入您的域名
3. 勾选 `Enforce HTTPS`
4. 点击 `Save`

### 步骤3：等待DNS传播
- DNS传播可能需要1-24小时
- 使用 [DNS Checker](https://dnschecker.org) 检查传播状态

---

## 性能优化建议（可选）

### 1. 启用CDN加速
考虑使用Cloudflare等CDN服务加速全球访问。

### 2. 图片优化
将占位符图片替换为实际产品照片后，建议：
- 压缩图片大小（推荐使用TinyPNG）
- 使用WebP格式（更小的文件大小）
- 添加图片懒加载

### 3. 代码压缩
对于生产环境，可以考虑：
- 压缩JavaScript文件
- 压缩CSS文件
- 合并多个CSS/JS文件

---

## 回滚到旧版本

如果新版本出现问题，可以快速回滚：

### 通过GitHub网页界面
1. 进入仓库的 `Commits` 页面
2. 找到之前的版本提交
3. 点击 `<>` 浏览该版本的文件
4. 点击 `Revert` 回滚到该版本

### 通过Git命令行
```bash
git log  # 查看提交历史
git revert <commit-hash>  # 回滚到指定版本
git push origin main
```

---

## 技术支持

如遇到无法解决的问题，请提供以下信息：
1. 网站URL
2. 浏览器开发者工具Console截图
3. 浏览器开发者工具Network截图
4. 具体问题描述和复现步骤

---

**祝部署顺利！** 🚀

