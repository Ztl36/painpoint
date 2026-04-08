<template>
  <view class="min-h-screen bg-[#0B1220] px-4 pb-10 pt-4 text-slate-100">
    <view class="text-base font-semibold">我的</view>
    <view class="mt-1 text-xs text-slate-400">管理我发布的痛点与收藏</view>

    <view class="mt-4 rounded-2xl bg-[#111A2E] px-4 py-4">
      <view class="flex items-center gap-3">
        <image class="h-12 w-12 rounded-full bg-white/10" src="/static/logo.png" mode="aspectFill" />
        <view class="min-w-0 flex-1">
          <view class="truncate text-sm font-semibold">未登录用户</view>
          <view class="mt-1 text-xs text-slate-400">授权登录后可同步数据（后续实现）</view>
        </view>
      </view>

      <view class="mt-4 grid grid-cols-3 gap-2">
        <button class="rounded-xl bg-white/10 py-3 text-xs" @tap="goSubmit">去提交</button>
        <button class="rounded-xl bg-white/10 py-3 text-xs" @tap="goMyPosts">我发布的</button>
        <button class="rounded-xl bg-white/10 py-3 text-xs" @tap="goFavorites">我的收藏</button>
      </view>
    </view>

    <view class="mt-4 rounded-2xl bg-white/5 px-4 py-4">
      <view class="text-sm font-semibold">快捷说明</view>
      <view class="mt-2 text-xs leading-5 text-slate-300">
        当前阶段已完成：路由/导航栏样式/tabBar/Tailwind 与页面骨架。
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
function goSubmit() {
  uni.switchTab({ url: "/pages/submit/submit" });
}

function goMyPosts() {
  uni.showToast({ title: "我的发布（待实现）", icon: "none" });
}

function goFavorites() {
  uni.showToast({ title: "我的收藏（待实现）", icon: "none" });
}
</script>
