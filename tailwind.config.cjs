/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}", "./src/**/*.wxml"],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        // Airbnb Design System — 纯白背景 + Rausch Red强调色
        primary: "#ff385c", // Rausch Red - 品牌强调色
        "primary-dark": "#e00b41", // Deep Rausch - 深色变体
        "error": "#c13515", // Error Red
        "text-primary": "#222222", // 近黑色文本 - 温暖非纯黑
        "text-secondary": "#6a6a6a", // 次要文本
        "text-tertiary": "#929292", // 链接禁用色
        "text-disabled": "rgba(0, 0, 0, 0.24)", // 禁用状态
        "bg-card": "#ffffff", // 纯白卡片背景
        "bg-page": "#ffffff", // 纯白页面背景
        "bg-surface": "#f2f2f2", // 按钮/表面灰色
        "border-light": "#c1c1c1", // 边框灰色
        "divider": "#e5e5e5", // 分割线
        "luxe": "#460479", // Luxe Purple - 高级版
        "plus": "#92174d", // Plus Magenta - Plus版
      },
      boxShadow: {
        "card": "rgba(0, 0, 0, 0.02) 0px 0px 0px 1px, rgba(0, 0, 0, 0.04) 0px 2px 6px, rgba(0, 0, 0, 0.1) 0px 4px 8px",
        "hover": "rgba(0, 0, 0, 0.08) 0px 4px 12px",
        "focus": "0 0 0 2px #222222",
      },
      borderRadius: {
        "btn": "8px", // 按钮圆角
        "badge": "14px", // 徽章圆角
        "card": "20px", // 卡片圆角
        "large": "32px", // 大型元素圆角
        "circle": "50%", // 圆形控制
      },
    },
  },
  plugins: [],
};
