# CLAUDE.md

本文件为Claude Code (claude.ai/code) 在此代码库中工作时提供指导。

## 项目概述
**痛点灯塔 (painpoint-lighthouse)** 是一个Uni-app多平台应用，用于收集、浏览和管理用户痛点/功能需求。它基于Vue 3 + TypeScript + Tailwind CSS + Vite构建，目标平台包括：H5、微信小程序、支付宝小程序、百度小程序、QQ小程序、头条小程序、快手小程序、飞书小程序、京东小程序、鸿蒙和快应用。

## 开发命令

### 开发
- `npm run dev:h5` - 启动H5开发服务器
- `npm run dev:h5:ssr` - 启动H5开发（带SSR）
- `npm run dev:mp-weixin` - 启动微信小程序开发
- `npm run dev:mp-alipay` - 启动支付宝小程序开发
- `npm run dev:custom` - 启动自定义平台开发 (`uni -p`)
- 类似`dev:`命令适用于所有支持的平台（参见package.json）

### 构建
- `npm run build:h5` - 构建H5版本
- `npm run build:h5:ssr` - 构建H5版本（带SSR）
- `npm run build:mp-weixin` - 构建微信小程序版本
- `npm run build:custom` - 构建自定义平台版本 (`uni build -p`)
- 类似`build:`命令适用于所有支持的平台

### 类型检查
- `npm run type-check` - 运行TypeScript类型检查（不生成文件）

## 架构

### 多平台结构
这是一个**Uni-app**项目，可从单一代码库编译到多个平台。关键配置文件包括：
- `src/pages.json` - 页面路由和标签栏配置
- `src/manifest.json` - 不同平台的应用配置
- `project.config.json` - 平台特定的构建设置
- `vite.config.ts` - 包含Uni-app插件的Vite配置

### 构建工具
- **Vite**作为构建工具，使用`@dcloudio/vite-plugin-uni`
- **Tailwind CSS**配置了`weapp-tailwindcss`以实现小程序兼容性
- **TypeScript**配置了Vue 3和Uni-app类型
- **PostCSS**与autoprefixer用于CSS处理

### 代码结构
- `src/App.vue` - 根组件，定义了全局CSS变量（Apple风格设计系统）
- `src/main.ts` - 应用入口点，包含SSR设置和全局加载工具
- `src/pages/` - 四个主要页面：
  - `index/index.vue` - “需求广场”首页，包含分类筛选和无限滚动
  - `submit/submit.vue` - 提交新需求的表单
  - `detail/detail.vue` - 单个需求的详细视图
  - `mine/mine.vue` - 用户个人资料和统计信息
- `src/components/DemandCard.vue` - 可复用的需求卡片组件
- `src/utils/` - 加载、请求和Toast通知的实用函数

### 状态管理与数据流
- **当前数据为模拟数据**：所有数据在`index/index.vue`中的`createMockList()`函数中客户端生成
- **缺少类型定义**：代码引用但未包含以下文件：
  - `src/constants/category.ts`（用于`CATEGORIES`和`CATEGORIES_WITH_ALL`）
  - `src/types/demand.ts`（用于`DemandItem`、`DemandCategoryWithAll`、`SubmitForm`、`PAY_OPTIONS`）
- **无后端集成**：应用目前仅为前端，使用模拟API调用

### 设计系统
- **Apple风格设计**在`tailwind.config.cjs`中定义，包含`#007AFF`（Apple蓝）等颜色
- **全局CSS变量**在`App.vue`中定义颜色方案（--c-primary、--c-accent等）
- **响应式单位**使用`rpx`（响应式像素）以实现跨平台兼容性
- **Tailwind CSS**带有小程序兼容性的自定义配置

## 重要注意事项

### 缺失文件
以下文件在代码中被引用但不存在：
1. `src/constants/category.ts` - 应导出`CATEGORIES`和`CATEGORIES_WITH_ALL`
2. `src/types/demand.ts` - 应定义需求数据的TypeScript接口

修改使用这些导入的代码时，可能需要创建或更新这些文件。

### 平台特定注意事项
- **Weapp-tailwindcss**：项目使用`weapp-tailwindcss`使Tailwind在小程序中工作
- **rpx单位**：使用响应式像素单位进行跨平台尺寸调整
- **Uni-app API**：使用`@dcloudio/uni-app` API而非原生Web API
- **组件注册**：在`pages.json`中注册组件（`usingComponents`）

### 开发工作流
1. **平台选择**：为目标平台选择适当的`dev:`命令
2. **类型安全**：构建前运行`type-check`以验证TypeScript类型
3. **模拟数据**：所有数据当前均为模拟；真实后端集成需要：
   - 在`src/utils/request.ts`中实现API调用
   - 将模拟数据函数替换为真实API调用
   - 添加认证和用户管理

### 构建配置
- **Vite插件**：`@dcloudio/vite-plugin-uni` + `weapp-tailwindcss`插件
- **CSS处理**：Tailwind + autoprefixer通过PostCSS
- **TypeScript**：严格配置，包含Vue 3和Uni-app类型
- **路径别名**：`@/*`映射到`src/*`

## AI Agent Behaviors & Rules (智能体行为准则)
1. **强制中文交流**：所有的对话回复、方案解释必须100%使用中文。
2. **样式优先读取**：在执行任何涉及UI的Prompt（如”写一个卡片”、”调整首页布局”）时，第一步必须是`cat DESIGN.md`。
3. **拒绝过度封装**：在编写Vue 3代码时，统一使用`<script setup lang=”ts”>`语法，保持组件扁平化，不要过度拆分微小组件。
4. **修复缺失文件**：在处理业务逻辑前，优先检查并补齐`src/constants/category.ts`和`src/types/demand.ts`中的TypeScript接口和常量定义，确保不会出现`any`类型的隐患。
5. **Mock数据原则**：当前的`createMockList()`必须包含能够体现多行文本截断、不同状态（如”待解决”、”已采纳”）的测试数据，以便于UI调试。