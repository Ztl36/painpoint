<template>
  <view class="min-h-screen bg-[#0B1220] px-4 pb-10 pt-4 text-slate-100">
    <view class="text-base font-semibold">提交需求</view>
    <view class="mt-1 text-xs text-slate-400">把痛点写下来，让它被看见</view>

    <view class="mt-4 rounded-2xl bg-[#111A2E] px-4 py-4">
      <view class="text-xs text-slate-300">标题</view>
      <input
        class="mt-2 h-10 w-full rounded-lg bg-white/5 px-3 text-sm"
        :value="title"
        placeholder="一句话概括你的痛点"
        placeholder-class="text-slate-500"
        @input="onTitleInput"
      />

      <view class="mt-4 text-xs text-slate-300">描述</view>
      <textarea
        class="mt-2 w-full rounded-lg bg-white/5 px-3 py-3 text-sm"
        :value="desc"
        placeholder="补充上下文、影响范围、期望结果（可选）"
        placeholder-class="text-slate-500"
        :maxlength="600"
        auto-height
        @input="onDescInput"
      />

      <view class="mt-4 text-xs text-slate-300">标签（用空格分隔）</view>
      <input
        class="mt-2 h-10 w-full rounded-lg bg-white/5 px-3 text-sm"
        :value="tags"
        placeholder="例如：协作 效率 流程"
        placeholder-class="text-slate-500"
        @input="onTagsInput"
      />
    </view>

    <button
      class="mt-4 w-full rounded-xl bg-[#2979ff] py-3 text-sm font-semibold text-white disabled:opacity-50"
      :disabled="submitting || !title.trim()"
      @tap="submit"
    >
      {{ submitting ? "提交中…" : "提交" }}
    </button>

    <view class="mt-3 text-center text-xs text-slate-500">
      示例页面：当前仅做前端骨架与交互占位
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";

const title = ref("");
const desc = ref("");
const tags = ref("");
const submitting = ref(false);

function onTitleInput(e: any) {
  title.value = e?.detail?.value ?? "";
}

function onDescInput(e: any) {
  desc.value = e?.detail?.value ?? "";
}

function onTagsInput(e: any) {
  tags.value = e?.detail?.value ?? "";
}

async function submit() {
  if (!title.value.trim()) return;
  if (submitting.value) return;
  submitting.value = true;
  try {
    await new Promise((r) => setTimeout(r, 500));
    uni.showToast({ title: "已提交（示例）", icon: "success" });
    uni.switchTab({ url: "/pages/index/index" });
  } finally {
    submitting.value = false;
  }
}
</script>
