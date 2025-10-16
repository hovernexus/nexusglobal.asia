# NEXUS网站V11.0 - GitHub重新设置与部署指南

**发布日期**: 2025年10月16日

**作者**: Manus AI

---

## 1. 背景与目的

您好！为了彻底解决您在GitHub Pages上遇到的**数据显示不一致**的问题（即新添加的供应商和客户无法在线上正常显示），我们为您准备了这份**完整的GitHub环境重新设置指南**。

问题的根源在于您本地的GitHub Desktop与远程仓库之间可能存在**文件同步冲突**或**缓存不一致**。通过本次重新设置，我们将创建一个全新的、干净的本地环境，确保与远程仓库100%同步，从而根除问题。

**请严格按照以下步骤操作，这将确保V11版本的网站能够顺利、正确地部署。**

## 2. 准备工作：获取V11版本文件

在开始之前，请确保您已经下载并解压了我们提供的 `nexus-v11-final.zip` 文件。解压后，您会得到一个名为 `nexus-v11` 的文件夹，其中包含了所有最新的、已修复的网站文件。

## 3. 核心步骤：重新设置GitHub Desktop

### 第1步：备份并移除旧的本地仓库

这是最关键的一步，目的是清除任何可能导致冲突的旧文件或配置。

1.  **打开GitHub Desktop**。
2.  在左侧的仓库列表中，找到您的 `nexusglobal.asia` 仓库。
3.  在仓库名称上**右键单击**，然后选择 **"Remove"**（移除）。
    > **重要提示**: 当提示“Would you also like to move this repository to the Trash?”时，请选择 **"Yes, move to Trash"**（是，移至回收站）。这将删除您电脑上旧的仓库文件夹，完成彻底清理。

![GitHub Desktop Remove Repository](https://i.imgur.com/your-image-url.png)  *（此为示例图，请根据您的界面操作）*

### 第2步：重新克隆（Clone）远程仓库

现在，我们将从GitHub服务器上重新下载一个干净的仓库副本。

1.  在GitHub Desktop中，点击 **File > Clone Repository**。
2.  在弹出的窗口中，选择 **GitHub.com** 选项卡。
3.  从列表中找到并选择您的 `nexusglobalasia/nexusglobal.asia` 仓库。
4.  **确认本地路径（Local Path）**：确保路径是您希望存放网站文件的位置（例如 `C:\Users\YourUser\Documents\GitHub\nexusglobal.asia`）。
5.  点击 **"Clone"** 按钮。

软件会自动从服务器下载仓库。完成后，您会在本地指定路径下看到一个 `nexusglobal.asia` 文件夹，但里面可能只包含 `README.md` 等少量文件，这是正常的。

### 第3步：将V11文件复制到新仓库

现在，我们将用最新的V11版本文件来填充这个干净的本地仓库。

1.  打开您之前解压的 `nexus-v11` 文件夹。
2.  **全选并复制** `nexus-v11` 文件夹内的**所有文件和子文件夹**（包括 `data`, `images`, `index.html` 等）。
3.  打开您刚刚克隆的 `nexusglobal.asia` 文件夹。
4.  **将复制的所有文件粘贴到 `nexusglobal.asia` 文件夹的根目录下**。
    > **提示**: 如果提示有同名文件（如 `README.md`），请选择 **"Replace the file in the destination"**（替换目标中的文件）。

### 第4步：提交（Commit）并推送（Push）更改

最后一步，我们将把这些新文件上传到GitHub服务器。

1.  返回 **GitHub Desktop**。您会看到软件检测到了大量的更改（显示为 "XXX changed files"）。
2.  在左下角的 **Summary (required)** 字段中，填写本次更新的摘要信息，例如：
    ```
    Deploy V11.0 - Final data fix and reset
    ```
3.  点击蓝色的 **"Commit to main"** 按钮。
4.  提交完成后，点击右上角的 **"Push origin"** 按钮。

软件会将所有V11文件上传到您的GitHub仓库。上传过程可能需要几分钟，具体取决于您的网络速度。

## 4. 部署后验证

上传完成后，GitHub Pages会自动开始部署您的网站。请等待 **2-5分钟**。

然后，请执行以下操作来验证部署是否成功：

1.  **强制刷新浏览器**：打开您的网站 `https://nexusglobal.asia`，并使用 `Ctrl + Shift + R` (Windows) 或 `Cmd + Shift + R` (Mac) 进行强制刷新，以清除浏览器缓存。
2.  **使用无痕模式**：最好在浏览器的无痕/隐私模式下访问网站，以确保看到的是最新版本。

### 验证清单：

- [ ] **供应商显示正常**：首页应能看到 **ODJ** 和 **精陶** 等新供应商，并且它们有紫色的高亮背景。
- [ ] **客户显示正常**：首页应能看到10家墨西哥买家，并且公司名称**没有换行符或多余的空格**。
- [ ] **版本号正确**：网站页脚或代码中的版本号应为V11.0。
- [ ] **功能完好**：网站所有链接和功能均可正常使用。

## 5. 故障排除

如果完成以上所有步骤后，问题仍然存在，请尝试以下操作：

- **检查GitHub仓库文件**：直接在GitHub网站上查看 `data/products-complete.json` 和 `data/registered-companies.json` 文件的内容，确认它们是否为最新版本。
- **检查GitHub Pages部署状态**：在仓库的 `Settings > Pages` 页面，查看最近的部署是否成功，有无报错信息。
- **联系我们**：如果问题无法解决，请随时与我联系，我将为您提供进一步的支持。

---

**预祝您部署顺利！**

