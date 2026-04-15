type ToastType = "success" | "error" | "info";

type ToastOptions = {
  title: string;
  duration?: number;
};

const DEFAULT_DURATION = 1800;

function show(type: ToastType, options: ToastOptions) {
  const duration = options.duration ?? DEFAULT_DURATION;
  const title = options.title;
  const icon = type === "success" ? "success" : "none";
  uni.showToast({ title, icon, duration });
}

export const toast = {
  success(title: string, duration?: number) {
    show("success", { title, duration });
  },
  error(title: string, duration?: number) {
    show("error", { title, duration });
  },
  info(title: string, duration?: number) {
    show("info", { title, duration });
  },
};

