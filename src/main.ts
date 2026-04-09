import { createSSRApp } from "vue";
import App from "./App.vue";
import { hideLoading, showLoading, withLoading } from "./utils/request";

import "./styles/tailwind.css";
export function createApp() {
  const app = createSSRApp(App);
  (app.config.globalProperties as any).$loading = {
    showLoading,
    hideLoading,
    withLoading,
  };

  return {
    app,
  };
}
