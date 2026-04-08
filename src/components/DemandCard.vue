<template>
  <view
    class="card rounded-[24rpx] bg-white px-6 py-5"
    :class="cardPressed ? 'card-pressed' : 'card-rest'"
    @touchstart="cardPressed = true"
    @touchend="cardPressed = false"
    @touchcancel="cardPressed = false"
    @tap="onCardTap"
  >
    <view class="flex items-start justify-between gap-3">
      <view class="min-w-0 flex-1">
        <view class="text-[32rpx] font-semibold leading-6 text-[#0F172A]">{{ title }}</view>
        <view class="mt-3 text-[26rpx] leading-6 text-[#64748B] clamp-2">{{ description }}</view>
      </view>
      <view class="shrink-0 rounded-full bg-[#FFFBEB] px-3 py-1.5 text-[22rpx] font-semibold text-[#F59E0B]">
        <text class="mr-1">🔥</text>{{ hotValue }}
      </view>
    </view>

    <view class="mt-3 flex items-center justify-between">
      <view class="inline-flex items-center gap-2">
        <view class="rounded-full bg-[#F1F5F9] px-3 py-1 text-[22rpx] font-medium text-[#64748B]">
          {{ categoryLabel }}
        </view>
      </view>

      <button
        class="support-btn flex items-center gap-1 rounded-full border border-[#E2E8F0] bg-white px-4 py-2 text-[24rpx] font-semibold text-[#64748B]"
        :class="pressed ? 'support-pressed support-on' : 'support-rest'"
        @touchstart.stop="pressed = true"
        @touchend.stop="pressed = false"
        @touchcancel.stop="pressed = false"
        @tap.stop="onSupportTap"
      >
        <text class="text-[26rpx]">✨</text>
        <text>支持</text>
      </button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";

type Props = {
  id: string;
  title: string;
  description: string;
  hotValue: number;
  category: string;
  categoryLabel: string;
};

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: "support", id: string): void;
  (e: "open", id: string): void;
}>();

const pressed = ref(false);
const cardPressed = ref(false);

function onSupportTap() {
  pressed.value = true;
  setTimeout(() => {
    pressed.value = false;
  }, 140);
  emit("support", props.id);
}

function onCardTap() {
  emit("open", props.id);
}
</script>

<style scoped>
.card {
  transition: transform 160ms ease, box-shadow 160ms ease;
}

.card-rest {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
  transform: scale(1);
}

.card-pressed {
  box-shadow: 0 10px 22px rgba(0, 0, 0, 0.06);
  transform: scale(0.99);
}

.clamp-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.support-btn {
  transform: scale(1);
  transition: transform 140ms ease, background 140ms ease, color 140ms ease, border-color 140ms ease;
}

.support-pressed {
  transform: scale(0.94);
}

.support-rest {
  box-shadow: 0 6px 14px rgba(15, 23, 42, 0.05);
}

.support-on {
  background: linear-gradient(90deg, #3b82f6, #8b5cf6);
  color: #ffffff;
  border-color: transparent;
  box-shadow: 0 10px 22px rgba(139, 92, 246, 0.25);
}
</style>

