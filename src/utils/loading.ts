/**
 * Loading 状态管理
 *
 * 使用计数器防止并发请求时 Loading 闪烁：
 * - showLoading / hideLoading 可多次嵌套调用，只有最后一次 hide 才真正关闭
 * - withLoading 是推荐的使用方式，自动配对 show/hide
 */

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
    return;
  }

  loadingCount -= 1;
  if (loadingCount === 0) {
    uni.hideLoading();
  }
}

export async function withLoading<T>(
  task: () => Promise<T>,
  options: ShowLoadingOptions = {},
): Promise<T> {
  showLoading(options);
  try {
    return await task();
  } finally {
    hideLoading();
  }
}
