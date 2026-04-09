<template>
  <view class="page">
    <!-- Header Card -->
    <view class="header-card">
      <view class="title">{{ demand.title }}</view>
      <view class="meta">
        <view class="meta-tag">{{ demand.category }}</view>
        <view class="meta-text">{{ demand.author }}</view>
        <view class="meta-sep">·</view>
        <view class="meta-text">{{ demand.createdAt }}</view>
      </view>
      <view class="meta-bottom">
        <view class="meta-id">ID: {{ id || "-" }}</view>
        <view class="heat-badge">{{ heatCount }} 热度</view>
      </view>
    </view>

    <!-- Content Card -->
    <view class="content-card">
      <view class="section">
        <view class="section-label">具体场景</view>
        <view class="section-body">{{ demand.scene }}</view>
      </view>

      <view v-if="demand.idea" class="section">
        <view class="section-label">功能设想</view>
        <view class="section-body">{{ demand.idea }}</view>
      </view>

      <view class="section">
        <view class="section-label">付费意愿</view>
        <view class="pay-badge">{{ payLabel }}</view>
      </view>
    </view>

    <!-- Comment Card -->
    <view class="comment-card">
      <view class="comment-header">
        <view class="comment-title">评论区</view>
        <view class="comment-tag">预留</view>
      </view>

      <view class="comment-empty">
        <view class="comment-empty-title">还没有评论</view>
        <view class="comment-empty-sub">先把你的经历写下来，给后来者一束光</view>
      </view>
    </view>

    <!-- Bottom Action Bar -->
    <view class="action-bar">
      <view class="action-panel">
        <button
          class="action-support"
          :class="supported ? 'action-support-on' : ''"
          @tap="toggleSupport"
        >
          {{ supported ? "已支持" : "我也遇到过" }}
        </button>
        <button
          class="action-follow"
          :class="followed ? 'action-follow-on' : ''"
          @tap="toggleFollow"
        >
          {{ followed ? "已关注" : "关注" }}
        </button>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { onLoad } from "@dcloudio/uni-app";
import { computed, reactive, ref } from "vue";

const id = ref<string>("");

type PayValue = "free" | "one_time" | "sub";

const supported = ref(false);
const followed = ref(false);
const baseHeat = ref(328);

const demand = reactive({
  title: "一个能识别路边植物并告诉我能不能吃的App",
  category: "生活",
  author: "匿名用户",
  createdAt: "2026-04-08 10:32",
  scene:
    "路边看到不认识的植物，总担心有毒又好奇能不能吃。希望拍照识别后，给出可食用/慎食/有毒的判断，以及可靠的科普来源与相似植物对比。",
  idea:
    "1）拍照识别：给出学名/别名与相似物种；2）食用风险提示：可食用部位、处理方式、禁忌人群；3）离线常见库：无网也能查；4）收藏与分享：把发现记录下来。",
  pay: "sub" as PayValue,
});

const payLabel = computed(() => {
  if (demand.pay === "free") return "不愿意";
  if (demand.pay === "one_time") return "一次性买断";
  return "订阅或内购";
});

const heatCount = computed(() => baseHeat.value + (supported.value ? 1 : 0));

function showToast(title: string, duration = 1800, icon: "success" | "none" = "none") {
  uni.showToast({ title, duration, icon });
}

onLoad((query) => {
  const qid = typeof query?.id === "string" ? query.id : "";
  id.value = qid;
  if (qid) demand.title = `（示例）需求：${qid}`;
});

function toggleSupport() {
  if (supported.value) return;
  supported.value = true;
  showToast("已支持 +1", 1200, "success");
}

function toggleFollow() {
  followed.value = !followed.value;
  showToast(followed.value ? "已关注" : "已取消关注", 1400);
}
</script>

<style scoped>
.page {
  min-height: 100vh;
  background: #f5f5f7;
  padding-bottom: calc(env(safe-area-inset-bottom) + 140rpx);
}

/* Header Card */
.header-card {
  background: #ffffff;
  padding: 40rpx 40rpx 32rpx;
}

.title {
  font-size: 34rpx;
  font-weight: 700;
  color: #1d1d1f;
  line-height: 1.4;
  letter-spacing: -0.5rpx;
}

.meta {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8rpx;
  margin-top: 16rpx;
}

.meta-tag {
  font-size: 22rpx;
  color: #86868b;
  background: #f5f5f7;
  padding: 4rpx 14rpx;
  border-radius: 999px;
}

.meta-text {
  font-size: 22rpx;
  color: #86868b;
}

.meta-sep {
  font-size: 22rpx;
  color: #aeaeb2;
}

.meta-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20rpx;
}

.meta-id {
  font-size: 22rpx;
  color: #aeaeb2;
}

.heat-badge {
  font-size: 24rpx;
  font-weight: 600;
  color: #86868b;
  background: #f5f5f7;
  padding: 6rpx 18rpx;
  border-radius: 999px;
}

/* Content Card */
.content-card {
  margin: 20rpx 30rpx 0;
  background: #ffffff;
  border-radius: 20rpx;
  padding: 32rpx 36rpx;
}

.section {
  margin-bottom: 32rpx;
}

.section:last-child {
  margin-bottom: 0;
}

.section-label {
  font-size: 22rpx;
  font-weight: 600;
  color: #86868b;
  text-transform: uppercase;
  letter-spacing: 0.5rpx;
  margin-bottom: 12rpx;
}

.section-body {
  font-size: 28rpx;
  color: #1d1d1f;
  line-height: 1.7;
}

.pay-badge {
  display: inline-block;
  font-size: 24rpx;
  font-weight: 600;
  color: #007aff;
  background: #f0f7ff;
  padding: 8rpx 20rpx;
  border-radius: 999px;
}

/* Comment Card */
.comment-card {
  margin: 20rpx 30rpx 0;
  background: #ffffff;
  border-radius: 20rpx;
  padding: 28rpx 36rpx;
}

.comment-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24rpx;
}

.comment-title {
  font-size: 30rpx;
  font-weight: 600;
  color: #1d1d1f;
}

.comment-tag {
  font-size: 22rpx;
  color: #aeaeb2;
}

.comment-empty {
  background: #f5f5f7;
  border-radius: 14rpx;
  padding: 40rpx 28rpx;
  display: flex;
  flex-direction: column;
  gap: 8rpx;
}

.comment-empty-title {
  font-size: 28rpx;
  font-weight: 600;
  color: #1d1d1f;
}

.comment-empty-sub {
  font-size: 24rpx;
  color: #86868b;
}

/* Action Bar */
.action-bar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 16rpx 30rpx calc(env(safe-area-inset-bottom) + 16rpx);
  background: #f5f5f7;
}

.action-panel {
  background: #ffffff;
  border-radius: 20rpx;
  display: flex;
  align-items: center;
  padding: 10rpx;
  gap: 12rpx;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.06);
}

.action-support {
  flex: 1;
  height: 84rpx;
  border-radius: 14rpx;
  font-size: 28rpx;
  font-weight: 600;
  color: #ffffff;
  background: #007aff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.action-support-on {
  background: #34c759;
}

.action-follow {
  width: 160rpx;
  height: 84rpx;
  border-radius: 14rpx;
  font-size: 26rpx;
  font-weight: 600;
  color: #1d1d1f;
  background: #f5f5f7;
  display: flex;
  align-items: center;
  justify-content: center;
}

.action-follow-on {
  color: #007aff;
  background: #f0f7ff;
}
</style>
