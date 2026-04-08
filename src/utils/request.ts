type ShowLoadingOptions = {
  title?: string;
  mask?: boolean;
};

let loadingCount = 0;

export function showLoading(options: ShowLoadingOptions = {}) {
  loadingCount += 1;
  if (loadingCount > 1) return;
  uni.showLoading({
    title: options.title ?? "加载中",
    mask: options.mask ?? true,
  });
}

export function hideLoading() {
  if (loadingCount <= 0) {
    loadingCount = 0;
    uni.hideLoading();
    return;
  }

  loadingCount -= 1;
  if (loadingCount === 0) {
    uni.hideLoading();
  }
}

export async function withLoading<T>(task: () => Promise<T>, options: ShowLoadingOptions = {}) {
  showLoading(options);
  try {
    return await task();
  } finally {
    hideLoading();
  }
}

