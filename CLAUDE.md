# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a new/empty project directory with minimal setup. The project appears to be in initial development phase with only Claude Code configuration present.

## Permissions Configuration

The project has specific WebFetch permissions configured in `.claude/settings.local.json`:
- **Allowed domains**: www.jiaoan365.com, www.hnztaqkj.com
- **No denied domains**
- **No domains requiring confirmation**

## Current State

- No source code files present
- No package.json, requirements.txt, or build configuration files
- No documentation files (README.md, .cursorrules, etc.)
- Only contains Claude Code settings configuration

## Development Notes

Since this is an empty project:
- No build/test commands are available yet
- No established code patterns or architecture to follow
- Development setup will depend on the intended technology stack
- Consider adding project initialization files (package.json, etc.) when starting development

## Special Considerations

The project has WebFetch permissions for specific Chinese domains (jiaoan365.com, hnztaqkj.com), suggesting this may be related to educational or training content from these sites.


## 建设内容
企业官网

请为“湖南嘉遂安全科技有限公司”创建一个专业、现代且流畅的**单页面滚动（One-Page Scroll）官方网站**。

**网站基本信息:**
* **公司名称:** 湖南嘉遂安全科技有限公司
* **Logo:** (请您自行准备 Logo 图片文件)
* **主色调:** 使用蓝色 (代表专业、安全、科技) 和灰色 (代表稳重、严谨) 作为主色调，搭配白色背景。
* **字体:** 使用清晰易读的无衬线字体，例如微软雅黑 (Microsoft YaHei) 或思源黑体 (Source Han Sans)。
* **技术栈:** 请生成基于 HTML5, CSS3 和 JavaScript 的代码。JavaScript 对于实现平滑滚动和导航栏高亮功能至关重要。请确保网站是移动端响应式的。

**网站结构 (页面内区块):**
请在同一个 `index.html` 文件中，创建以下垂直排列的区块 (section)。每个区块应有一个唯一的ID，以便导航栏可以链接到它。
1.  **首页/欢迎屏 (ID: `home`)**
2.  **关于我们 (ID: `about`)**
3.  **主要业务 (ID: `services`)**
4.  **联系我们 (ID: `contact`)**

**导航栏 (Header) 设计:**
* 左侧放置公司 Logo。
* 右侧是导航菜单，包括：**首页、关于我们、主要业务、联系我们**。
* **核心功能:**
    * 导航栏在用户向下滚动页面时，应始终**固定在屏幕顶部**。
    * 点击任何一个导航链接（如“关于我们”），页面应**平滑滚动**到对应的区块 (e.g., `about` section)。
    * 当用户滚动页面时，导航栏中对应当前视口区块的链接应**自动高亮**显示。

**页脚 (Footer) 设计:**
* 这是一个简单的页脚，位于整个页面的最底部。
* 包含公司全称、地址、联系电话、电子邮箱。
* 官网域名 (www.jiasuianguan.com)。
* 版权信息 (例如: © 2024 湖南嘉遂安全科技有限公司. All Rights Reserved.)。

现在，请为“湖南嘉遂安全科技有限公司”的单页面网站，依次生成以下每个区块的代码。所有代码应在同一个HTML文件中。

**1. 首页/欢迎屏区块 (Section ID: `home`)**
* **布局:** 全屏高度，作为访问者看到的第一屏。
* **背景:** 使用一张高清、专业的安全生产或科技相关的背景图片。
* **内容:**
    * 主标题: “**科技护航安全，专业铸就未来**”
    * 副标题: “您值得信赖的全方位安全管理解决方案提供商”
    * 一个醒目的按钮: 文字为“了解我们的业务”，点击后平滑滚动到“主要业务” (`services`) 区块。

**2. 关于我们区块 (Section ID: `about`)**
* **标题:** 关于我们
* **内容:**
    * **左侧 (或上方): 文字介绍**
        * “湖南嘉遂安全科技有限公司是一家专注于安全生产技术服务的创新型企业，致力于为政府、企业及各类组织机构提供全方位、专业化、系统化的安全管理解决方案。公司拥有一支由国家中级注册安全工程师和资深安全管理专家组成的核心团队，服务经验丰富，技术实力雄厚。”
        * “我们已成功为多家企业提供安全生产管理咨询、标准化建设、应急管理、安全教育培训等服务，助力客户提升安全管理水平，降低事故风险，实现可持续发展。”
    * **右侧 (或下方): 图片**
        * 配一张展示团队风采、专业会议或公司环境的图片。

**3. 主要业务区块 (Section ID: `services`)**
* **主标题:** 主要业务范围
* **布局:** 使用选项卡 (Tabs) 或手风琴 (Accordion) 效果来组织四大业务板块，这样可以保持页面整洁，避免内容过长。默认显示第一个板块。

    * **选项卡1: 咨询服务**
        * **安全生产帮扶与咨询:** 核心服务内容为企业安全诊断、管理体系设计、合规性审计；目标客户群是政府、企业。
        * **标准化与职业健康建设:** 核心服务内容为职业健康建设、心理疏导安全生产标准化创建；目标客户群是企业。
        * **安全评价与消防评估:** 核心服务内容为安全预评价 / 验收评价 / 现状评价、消防安全评估；目标客户群是园区、企业。

    * **选项卡2: 风险管理**
        * **风险辨识、双重预防:** 核心服务内容为 HAZOP 分析、LEC 评估、双重预防系统建设；目标客户群是政府、企业。
        * **应急管理体系:** 核心服务内容为应急预案编制、评审备案演练策划、应急能力评估；目标客户群是政府、企业。
        * **事故处理与保险理赔:** 核心服务内容为事故调查处理、保险索赔安责险技术服务；目标客户群是个人、企业、保险公司。

    * **选项卡3: 教育培训**
        * **安全教育培训:** 核心服务内容为三类人员培训、特种作业培训、VR 安全体验；目标客户群是政府、机构、企业、个人。
        * **“智慧学院” 平台:** 核心服务内容为 800 + 课程库、在线考试、学时管理、AI 学习助手；目标客户群是政府、机构、企业、个人。
        * **安全文化传播:** 核心服务内容为宣传片制作、安全文化长廊设计、新媒体运营；目标客户群是政府、机构、企业。

    * **选项卡4: 技术产品**
        * **安全活动策划:** 核心服务内容为安全生产月、知识竞赛、应急演练观摩会；目标客户群是政府、企业。
        * **安全软件开发:** 核心服务内容为双控平台、隐患排查 APP、应急管理系统；目标客户群是政府、企业。
        * **认证咨询服务与检测服务:** 核心服务内容为标准化、3A 信用、ISO 体系认证、毛发毒检等；目标客户群是银行、企业、事业单位。

**4. 联系我们区块 (Section ID: `contact`)**
* **主标题:** 联系我们
* **布局:** 采用两栏布局。
    * **左侧: 联系信息**
        * **公司名称:** 湖南嘉遂安全科技有限公司
        * **地址:** 长沙高新开发区麓谷街道麓龙路199号麓谷商务中心A栋1302-2
        * **电话:** 17775765957
        * **邮箱:** ants7@vip.qg.com
        * **官网:** www.jiasuianguan.com
    * **右侧: 地图**
        * 嵌入一个交互式地图 (例如百度地图或高德地图API)，并标记出公司地址。请在代码中为地图容器预留一个 div，ID 为 `map-container`。

## 图片位置
图片位置在 images下，其中还有个logo文件夹，logo在里面；设计板块的时候，请根据图片的文件名把对应的图片放在对应的板块