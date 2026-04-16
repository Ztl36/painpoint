<template>
  <view></view>
</template>

<script setup lang="ts">
</script>
<style>
:root,
page {
  /* Airbnb设计系统 - 主色调 */
  --c-primary: #ff385c; /* Rausch Red - 品牌强调色 */
  --c-accent: #ff385c; /* 同主色 */
  --c-bg: #ffffff; /* 纯白背景 */
  --c-card: #ffffff; /* 卡片背景 */
  --c-text: #222222; /* 近黑色文本 - 温暖非纯黑 */
  --c-title: #222222; /* 标题色 */
  --c-muted: #6a6a6a; /* 次要文本 */
  --c-border: #c1c1c1; /* 边框灰色 */
  --c-disabled: rgba(0, 0, 0, 0.24); /* 禁用状态 */
  --c-surface: #f2f2f2; /* 按钮/表面灰色 */
  --c-error: #c13515; /* 错误红色 */

  /* Airbnb三层面影系统 */
  --shadow-card: rgba(0, 0, 0, 0.02) 0px 0px 0px 1px, rgba(0, 0, 0, 0.04) 0px 2px 6px, rgba(0, 0, 0, 0.1) 0px 4px 8px;
  --shadow-hover: rgba(0, 0, 0, 0.08) 0px 4px 12px;
  --shadow-focus: 0 0 0 2px var(--c-text);

  /* Airbnb字体系统 */
  font-family: "Airbnb Cereal VF", Circular, -apple-system, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Noto Sans CJK SC", Arial, sans-serif;

  background-color: var(--c-bg);
  color: var(--c-text);
}

page {
  line-height: 1.45;
}

button {
  border: none;
}
</style>
