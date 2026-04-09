<template>
  <view
    class="card"
    @touchstart="cardPressed = true"
    @touchend="cardPressed = false"
    @touchcancel="cardPressed = false"
    @tap="onCardTap"
  >
    <view class="card-inner">
      <view class="card-left">
        <view class="card-title">{{ title }}</view>
        <view class="card-desc clamp-2">{{ description }}</view>
        <view class="card-footer">
          <view class="card-tag">{{ categoryLabel }}</view>
          <view class="card-heat">{{ hotValue }} 热度</view>
        </view>
      </view>
      <view class="card-right">
        <button
          class="support-btn"
          :class="pressed ? 'support-btn-pressed' : ''"
          @touchstart.stop="pressed = true"
          @touchend.stop="onSupportEnd"
          @touchcancel.stop="pressed = false"
          @tap.stop="onSupportTap"
        >
          {{ pressed ? "已支持" : "支持" }}
        </button>
      </view>
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
  emit("support", props.id);
}

function onSupportEnd() {
  setTimeout(() => {
    pressed.value = false;
  }, 120);
}

function onCardTap() {
  emit("open", props.id);
}
</script>

<style scoped>
.card {
  background: #ffffff;
  border-radius: 20rpx;
  overflow: hidden;
  transition: opacity 160ms ease;
}

.card:active {
  opacity: 0.92;
}

.card-inner {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 32rpx 28rpx;
  gap: 20rpx;
}

.card-left {
  flex: 1;
  min-width: 0;
}

.card-title {
  font-size: 30rpx;
  font-weight: 600;
  color: #1d1d1f;
  line-height: 1.4;
  letter-spacing: -0.3rpx;
}

.card-desc {
  font-size: 26rpx;
  color: #86868b;
  line-height: 1.6;
  margin-top: 10rpx;
}

.clamp-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.card-footer {
  display: flex;
  align-items: center;
  gap: 12rpx;
  margin-top: 14rpx;
}

.card-tag {
  font-size: 22rpx;
  color: #86868b;
  background: #f5f5f7;
  padding: 4rpx 14rpx;
  border-radius: 999px;
}

.card-heat {
  font-size: 22rpx;
  color: #86868b;
}

.card-right {
  flex-shrink: 0;
  display: flex;
  align-items: flex-start;
}

.support-btn {
  font-size: 24rpx;
  font-weight: 600;
  color: #007aff;
  background: #f0f7ff;
  border-radius: 999px;
  padding: 10rpx 22rpx;
  transition: all 140ms ease;
  min-width: 0;
  white-space: nowrap;
}

.support-btn-pressed {
  color: #ffffff;
  background: #34c759;
}
</style>
