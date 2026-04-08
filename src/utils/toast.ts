type ToastType = "success" | "error" | "info";

type ToastOptions = {
  title: string;
  duration?: number;
};

const DEFAULT_DURATION = 1800;

function show(type: ToastType, options: ToastOptions) {
  const duration = options.duration ?? DEFAULT_DURATION;
  const title = options.title;

  if (type === "success") {
    uni.showToast({ title, icon: "success", duration });
    return;
  }

  uni.showToast({ title, icon: "none", duration });
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

