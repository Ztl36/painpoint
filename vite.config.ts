import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import autoprefixer from "autoprefixer";
import tailwindcss from "tailwindcss";
import { UnifiedViteWeappTailwindcssPlugin } from "weapp-tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [uni(), ...(UnifiedViteWeappTailwindcssPlugin() ?? [])],
  css: {
    postcss: {
      plugins: [
        tailwindcss(),
        autoprefixer(),
      ],
    },
  },
});
