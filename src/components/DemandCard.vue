<template>
  <view
    class="card"
    @tap="onCardTap"
  >
    <view class="card-inner">
      <view class="card-left">
        <view class="card-title">{{ title }}</view>
        <view class="card-desc clamp-2">{{ description }}</view>
        <view class="card-footer">
          <view class="card-tag">{{ categoryLabel }}</view>
          <view class="card-heat">{{ heat }} 热度</view>
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
  heat: number;
  category: string;
  categoryLabel: string;
};

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: "support", id: string): void;
  (e: "open", id: string): void;
}>();

const pressed = ref(false);

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
  border-radius: 40rpx; /* Airbnb卡片圆角20px = 40rpx */
  overflow: hidden;
  transition: all 200ms ease;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 0px 0px 1px, rgba(0, 0, 0, 0.04) 0px 2px 6px, rgba(0, 0, 0, 0.1) 0px 4px 8px; /* Airbnb三层面影 */
}

.card:active {
  opacity: 0.95;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 12px; /* Airbnb悬停阴影 */
  transform: translateY(-1px);
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
  color: #222222; /* Airbnb近黑色文本 */
  line-height: 1.4;
  letter-spacing: -0.3rpx;
}

.card-desc {
  font-size: 26rpx;
  color: #6a6a6a; /* Airbnb次要文本色 */
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
  color: #6a6a6a; /* Airbnb次要文本色 */
  background: #f2f2f2; /* Airbnb表面灰色 */
  padding: 4rpx 14rpx;
  border-radius: 28rpx; /* Airbnb徽章圆角14px = 28rpx */
}

.card-heat {
  font-size: 22rpx;
  color: #6a6a6a; /* Airbnb次要文本色 */
}

.card-right {
  flex-shrink: 0;
  display: flex;
  align-items: flex-start;
}

.support-btn {
  font-size: 24rpx;
  font-weight: 600;
  color: #ff385c; /* Airbnb Rausch Red */
  background: #f2f2f2; /* Airbnb表面灰色 */
  border-radius: 16rpx; /* Airbnb按钮圆角8px = 16rpx */
  padding: 10rpx 22rpx;
  transition: all 140ms ease;
  min-width: 0;
  white-space: nowrap;
}

.support-btn-pressed {
  color: #ffffff;
  background: #ff385c; /* Airbnb Rausch Red */
}
</style>
