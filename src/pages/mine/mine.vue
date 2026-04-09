<template>
  <view class="page">
    <!-- Profile Card -->
    <view class="profile-card">
      <view class="profile-left">
        <image class="avatar" :src="avatarUrl" mode="aspectFill" />
        <view class="profile-info">
          <view class="nickname">{{ nickname }}</view>
          <view class="points">{{ points }} 积分</view>
        </view>
      </view>
    </view>

    <!-- Stats Row -->
    <view class="stats-card">
      <view class="stat-item" @tap="tapMySubmissions">
        <view class="stat-num">{{ submissionCount }}</view>
        <view class="stat-label">我的提交</view>
      </view>
      <view class="stat-divider" />
      <view class="stat-item" @tap="tapMySupports">
        <view class="stat-num">{{ supportedCount }}</view>
        <view class="stat-label">我的支持</view>
      </view>
      <view class="stat-divider" />
      <view class="stat-item" @tap="tapSignIn">
        <view class="stat-num">{{ signedIn ? "已签" : "+5" }}</view>
        <view class="stat-label">{{ signedIn ? "已签到" : "积分签到" }}</view>
      </view>
    </view>

    <!-- Recent Supported -->
    <view class="section-card">
      <view class="section-header">
        <view class="section-title">近期支持过的需求</view>
        <view class="section-tag">静态示例</view>
      </view>

      <view v-if="recentSupported.length > 0" class="recent-list">
        <view
          v-for="item in recentSupported"
          :key="item.id"
          class="recent-item"
          @tap="openDetail(item.id)"
        >
          <view class="recent-info">
            <view class="recent-title">{{ item.title }}</view>
            <view class="recent-meta">
              <view class="recent-tag">{{ item.category }}</view>
              <view class="recent-heat">{{ item.heat }} 热度</view>
            </view>
          </view>
          <view class="recent-arrow">›</view>
        </view>
      </view>

      <view v-else class="recent-empty">
        <view class="recent-empty-text">暂无记录</view>
      </view>
    </view>

    <!-- About -->
    <view class="about-card" @tap="tapAbout">
      <view class="about-text">关于我们</view>
      <view class="about-arrow">›</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";

const avatarUrl = ref("/static/logo.png");
const nickname = ref("灯塔探索者");

const points = ref(120);
const submissionCount = ref(12);
const supportedCount = ref(28);
const signedIn = ref(false);

type RecentItem = {
  id: string;
  title: string;
  category: string;
  heat: number;
};

const recentSupported = reactive<RecentItem[]>([
  {
    id: "d_3",
    title: "学习时自动屏蔽分心内容并统计专注时长",
    category: "学习",
    heat: 409,
  },
  {
    id: "d_8",
    title: "把家里常见食材自动生成一周菜单",
    category: "生活",
    heat: 254,
  },
  {
    id: "d_5",
    title: "把零散副业信息聚合成"赚钱路线图"",
    category: "赚钱",
    heat: 613,
  },
]);

function showToast(title: string, duration = 1800, icon: "success" | "none" = "none") {
  uni.showToast({ title, duration, icon });
}

function tapMySubmissions() {
  showToast(`我的提交：${submissionCount.value} 条（示例）`);
}

function tapMySupports() {
  showToast(`我的支持：${supportedCount.value} 条（示例）`);
}

function tapSignIn() {
  if (signedIn.value) {
    showToast("今天已签到");
    return;
  }
  signedIn.value = true;
  points.value += 5;
  showToast("+5 积分", 1800, "success");
}

function tapAbout() {
  uni.showModal({
    title: "关于痛点灯塔",
    content:
      "痛点灯塔是一款用来收集、浏览与管理用户痛点/需求的小程序。\n\n当前版本为前端原型演示，后续将接入真实数据与账号体系。",
    showCancel: false,
    confirmText: "知道了",
  });
}

function openDetail(id: string) {
  uni.navigateTo({ url: `/pages/detail/detail?id=${encodeURIComponent(id)}` });
}
</script>

<style scoped>
.page {
  min-height: 100vh;
  background: #f5f5f7;
  padding-bottom: 40rpx;
}

/* Profile Card */
.profile-card {
  background: #ffffff;
  padding: 56rpx 40rpx 36rpx;
}

.profile-left {
  display: flex;
  align-items: center;
  gap: 24rpx;
}

.avatar {
  width: 96rpx;
  height: 96rpx;
  border-radius: 999px;
  background: #f5f5f7;
  flex-shrink: 0;
}

.profile-info {
  display: flex;
  flex-direction: column;
  gap: 6rpx;
}

.nickname {
  font-size: 34rpx;
  font-weight: 700;
  color: #1d1d1f;
  letter-spacing: -0.5rpx;
}

.points {
  font-size: 24rpx;
  color: #86868b;
}

/* Stats Card */
.stats-card {
  margin: 0 30rpx;
  background: #ffffff;
  border-radius: 20rpx;
  display: flex;
  align-items: center;
  padding: 28rpx 0;
}

.stat-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6rpx;
}

.stat-num {
  font-size: 36rpx;
  font-weight: 700;
  color: #1d1d1f;
  letter-spacing: -0.5rpx;
}

.stat-label {
  font-size: 22rpx;
  color: #86868b;
}

.stat-divider {
  width: 1rpx;
  height: 60rpx;
  background: #d1d1d6;
}

/* Section Card */
.section-card {
  margin: 20rpx 30rpx 0;
  background: #ffffff;
  border-radius: 20rpx;
  overflow: hidden;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 28rpx 32rpx 20rpx;
  border-bottom: 1rpx solid #f0f0f0;
}

.section-title {
  font-size: 30rpx;
  font-weight: 600;
  color: #1d1d1f;
}

.section-tag {
  font-size: 22rpx;
  color: #aeaeb2;
}

/* Recent List */
.recent-list {
  padding: 0 32rpx;
}

.recent-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24rpx 0;
  border-bottom: 1rpx solid #f0f0f0;
}

.recent-item:last-child {
  border-bottom: none;
}

.recent-info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 8rpx;
}

.recent-title {
  font-size: 28rpx;
  color: #1d1d1f;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.recent-meta {
  display: flex;
  align-items: center;
  gap: 16rpx;
}

.recent-tag {
  font-size: 22rpx;
  color: #86868b;
  background: #f5f5f7;
  padding: 4rpx 14rpx;
  border-radius: 999px;
}

.recent-heat {
  font-size: 22rpx;
  color: #86868b;
}

.recent-arrow {
  font-size: 32rpx;
  color: #d1d1d6;
  flex-shrink: 0;
  margin-left: 12rpx;
}

.recent-empty {
  padding: 40rpx;
  text-align: center;
}

.recent-empty-text {
  font-size: 26rpx;
  color: #aeaeb2;
}

/* About Card */
.about-card {
  margin: 20rpx 30rpx 0;
  background: #ffffff;
  border-radius: 20rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 28rpx 32rpx;
}

.about-text {
  font-size: 30rpx;
  color: #1d1d1f;
  font-weight: 500;
}

.about-arrow {
  font-size: 32rpx;
  color: #d1d1d6;
}
</style>
