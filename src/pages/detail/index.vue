<template>
  <view class="min-h-screen bg-[#0B1220] px-4 pb-10 pt-4 text-slate-100">
    <view class="flex items-center justify-between">
      <view class="text-base font-semibold">需求详情</view>
      <button class="rounded-lg bg-white/10 px-3 py-2 text-xs" @tap="share">分享</button>
    </view>

    <view class="mt-4 rounded-2xl bg-[#111A2E] px-4 py-4">
      <view class="text-[10px] text-slate-500">ID: {{ id || "-" }}</view>
      <view class="mt-2 text-sm font-semibold">{{ detail.title }}</view>
      <view class="mt-2 text-xs leading-5 text-slate-300">{{ detail.content }}</view>

      <view class="mt-3 flex flex-wrap gap-2">
        <view
          v-for="tag in detail.tags"
          :key="tag"
          class="rounded-full bg-white/5 px-2 py-1 text-[10px] text-slate-200"
        >
          {{ tag }}
        </view>
      </view>

      <view class="mt-4 flex items-center gap-2">
        <button
          class="flex-1 rounded-xl bg-white/10 py-3 text-sm"
          @tap="toggleFavorite"
        >
          {{ favorite ? "已收藏" : "收藏" }}
        </button>
        <button class="flex-1 rounded-xl bg-[#2979ff] py-3 text-sm font-semibold text-white" @tap="goSubmit">
          我也要提
        </button>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { onLoad } from "@dcloudio/uni-app";
import { reactive, ref } from "vue";

const id = ref<string>("");
const favorite = ref(false);

const detail = reactive({
  title: "（示例）痛点详情标题",
  content: "这里是详情内容占位。后续可以接入本地存储或云端数据源。",
  tags: ["示例", "占位"],
});

onLoad((query) => {
  const qid = typeof query?.id === "string" ? query.id : "";
  id.value = qid;
  if (qid) {
    detail.title = `（示例）来自广场的痛点：${qid}`;
  }
});

function toggleFavorite() {
  favorite.value = !favorite.value;
  uni.showToast({ title: favorite.value ? "已收藏" : "已取消", icon: "none" });
}

function goSubmit() {
  uni.switchTab({ url: "/pages/submit/index" });
}

function share() {
  uni.showToast({ title: "触发分享（示例）", icon: "none" });
}
</script>
