/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}", "./src/**/*.wxml"],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        // Apple Design System — 极简灰阶 + 单一强调色
        primary: "#007AFF", // Apple Blue
        "primary-light": "#F5F5F7", // Apple Light Gray Background
        "text-primary": "#1D1D1F", // Apple Near-Black
        "text-secondary": "#86868B", // Apple Gray
        "text-tertiary": "#AEAEB2", // Apple Light Gray Text
        "bg-card": "#FFFFFF", // Pure White Card
        "bg-page": "#F5F5F7", // Apple Page Background
        "border-light": "#E5E5EA", // Apple Border
        "divider": "#D1D1D6", // Apple Divider
      },
    },
  },
  plugins: [],
};
