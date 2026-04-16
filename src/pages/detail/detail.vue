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
  background: #ffffff; /* 纯白背景 */
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
  color: #222222; /* Airbnb近黑色文本 */
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
  color: #6a6a6a; /* Airbnb次要文本色 */
  background: #f2f2f2; /* Airbnb表面灰色 */
  padding: 4rpx 14rpx;
  border-radius: 28rpx; /* Airbnb徽章圆角14px = 28rpx */
}

.meta-text {
  font-size: 22rpx;
  color: #6a6a6a; /* Airbnb次要文本色 */
}

.meta-sep {
  font-size: 22rpx;
  color: rgba(0, 0, 0, 0.24); /* Airbnb禁用状态 */
}

.meta-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20rpx;
}

.meta-id {
  font-size: 22rpx;
  color: rgba(0, 0, 0, 0.24); /* Airbnb禁用状态 */
}

.heat-badge {
  font-size: 24rpx;
  font-weight: 600;
  color: #6a6a6a; /* Airbnb次要文本色 */
  background: #f2f2f2; /* Airbnb表面灰色 */
  padding: 6rpx 18rpx;
  border-radius: 28rpx; /* Airbnb徽章圆角14px = 28rpx */
}

/* Content Card */
.content-card {
  margin: 20rpx 30rpx 0;
  background: #ffffff;
  border-radius: 40rpx; /* Airbnb卡片圆角20px = 40rpx */
  padding: 32rpx 36rpx;
  box-shadow: rgba(0, 0, 0, 0.02) 0rpx 0rpx 0rpx 1rpx, rgba(0, 0, 0, 0.04) 0rpx 2rpx 6rpx, rgba(0, 0, 0, 0.1) 0rpx 4rpx 8rpx; /* Airbnb三层面影 */
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
  color: #6a6a6a; /* Airbnb次要文本色 */
  text-transform: uppercase;
  letter-spacing: 0.5rpx;
  margin-bottom: 12rpx;
}

.section-body {
  font-size: 28rpx;
  color: #222222; /* Airbnb近黑色文本 */
  line-height: 1.7;
}

.pay-badge {
  display: inline-block;
  font-size: 24rpx;
  font-weight: 600;
  color: #ff385c; /* Airbnb Rausch Red */
  background: rgba(255, 56, 92, 0.1); /* 品牌红色10%透明度 */
  padding: 8rpx 20rpx;
  border-radius: 999px;
}

/* Comment Card */
.comment-card {
  margin: 20rpx 30rpx 0;
  background: #ffffff;
  border-radius: 40rpx; /* Airbnb卡片圆角20px = 40rpx */
  padding: 28rpx 36rpx;
  box-shadow: rgba(0, 0, 0, 0.02) 0rpx 0rpx 0rpx 1rpx, rgba(0, 0, 0, 0.04) 0rpx 2rpx 6rpx, rgba(0, 0, 0, 0.1) 0rpx 4rpx 8rpx; /* Airbnb三层面影 */
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
  color: #222222; /* Airbnb近黑色文本 */
}

.comment-tag {
  font-size: 22rpx;
  color: #6a6a6a; /* Airbnb次要文本色 */
}

.comment-empty {
  background: #f2f2f2; /* Airbnb表面灰色 */
  border-radius: 28rpx; /* Airbnb徽章圆角14px = 28rpx */
  padding: 40rpx 28rpx;
  display: flex;
  flex-direction: column;
  gap: 8rpx;
}

.comment-empty-title {
  font-size: 28rpx;
  font-weight: 600;
  color: #222222; /* Airbnb近黑色文本 */
}

.comment-empty-sub {
  font-size: 24rpx;
  color: #6a6a6a; /* Airbnb次要文本色 */
}

/* Action Bar */
.action-bar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 16rpx 30rpx calc(env(safe-area-inset-bottom) + 16rpx);
  background: #ffffff; /* 纯白背景 */
  box-shadow: 0 -2rpx 12rpx rgba(0, 0, 0, 0.06); /* 顶部轻微阴影 */
}

.action-panel {
  background: #ffffff;
  border-radius: 40rpx; /* Airbnb卡片圆角20px = 40rpx */
  display: flex;
  align-items: center;
  padding: 10rpx;
  gap: 12rpx;
  box-shadow: rgba(0, 0, 0, 0.02) 0rpx 0rpx 0rpx 1rpx, rgba(0, 0, 0, 0.04) 0rpx 2rpx 6rpx, rgba(0, 0, 0, 0.1) 0rpx 4rpx 8rpx; /* Airbnb三层面影 */
}

.action-support {
  flex: 1;
  height: 84rpx;
  border-radius: 16rpx; /* Airbnb按钮圆角8px = 16rpx */
  font-size: 28rpx;
  font-weight: 600;
  color: #ffffff;
  background: #222222; /* Airbnb深色按钮 */
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 200ms ease;
}

.action-support-on {
  background: #34c759; /* 保持绿色表示已支持状态 */
}

.action-follow {
  width: 160rpx;
  height: 84rpx;
  border-radius: 16rpx; /* Airbnb按钮圆角8px = 16rpx */
  font-size: 26rpx;
  font-weight: 600;
  color: #222222; /* Airbnb近黑色文本 */
  background: #f2f2f2; /* Airbnb表面灰色 */
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 200ms ease;
}

.action-follow-on {
  color: #ff385c; /* Airbnb Rausch Red */
  background: rgba(255, 56, 92, 0.1); /* 品牌红色10%透明度 */
}
</style>
