<template>
  <view class="min-h-screen bg-[#F8FAFC] pb-10 text-[#1E293B]">
    <view class="relative overflow-hidden rounded-b-[40rpx] bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] px-6 pb-10 pt-7">
      <view class="absolute -right-10 -top-10 h-44 w-44 rounded-full bg-white/10" />
      <view class="absolute -left-14 top-14 h-40 w-40 rounded-full bg-white/8" />

      <view class="flex items-center gap-4">
        <image class="h-16 w-16 rounded-full bg-white/30 ring-2 ring-white/60" :src="avatarUrl" mode="aspectFill" />
        <view class="min-w-0 flex-1">
          <view class="text-[34rpx] font-semibold text-white">{{ nickname }}</view>
          <view class="mt-2 inline-flex items-center rounded-full bg-white/70 px-4 py-2 text-[24rpx] font-semibold text-[#0F172A]">
            💎 {{ points }} 积分
          </view>
        </view>
      </view>
    </view>

    <view class="px-6">
      <view class="-mt-6 rounded-[24rpx] bg-white px-6 py-6 shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
        <view class="grid grid-cols-2 gap-5">
          <view class="entry" @tap="tapMySubmissions">
            <view class="icon i-blue">📌</view>
            <view class="entry-title">我的提交</view>
            <view class="entry-sub">查看我发布的需求</view>
            <view class="badge">{{ submissionCount }}</view>
          </view>

          <view class="entry" @tap="tapMySupports">
            <view class="icon i-purple">✨</view>
            <view class="entry-title">我的支持</view>
            <view class="entry-sub">我支持过的需求</view>
            <view class="badge">{{ supportedCount }}</view>
          </view>

          <view class="entry sign" :class="signedIn ? 'entry-disabled' : ''" @tap="tapSignIn">
            <view class="icon i-amber">💎</view>
            <view class="entry-title">积分签到</view>
            <view class="entry-sub">{{ signedIn ? '已签到 +5' : '每日签到得积分' }}</view>
            <view class="tag" :class="signedIn ? 'tag-on' : 'tag-off'">{{ signedIn ? '已签到' : '+5' }}</view>
          </view>

          <view class="entry" @tap="tapAbout">
            <view class="icon i-slate">i</view>
            <view class="entry-title">关于我们</view>
            <view class="entry-sub">了解项目介绍</view>
            <view class="tag tag-off">›</view>
          </view>
        </view>
      </view>

      <view class="mt-5 rounded-[24rpx] bg-white px-6 py-6 shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
        <view class="flex items-center justify-between">
          <view class="text-[28rpx] font-semibold text-[#0F172A]">近期支持过的需求</view>
          <view class="text-[22rpx] text-[#94A3B8]">静态示例</view>
        </view>

        <view class="mt-4 divide-y divide-[#E2E8F0]">
          <view v-for="item in recentSupported" :key="item.id" class="py-4" @tap="openDetail(item.id)">
            <view class="flex items-start justify-between gap-4">
              <view class="min-w-0 flex-1">
                <view class="truncate text-[28rpx] font-semibold text-[#0F172A]">{{ item.title }}</view>
                <view class="mt-2 flex items-center gap-3">
                  <view class="rounded-full bg-[#F1F5F9] px-3 py-1 text-[22rpx] font-medium text-[#64748B]">
                    {{ item.category }}
                  </view>
                  <view class="text-[22rpx] font-semibold text-[#F59E0B]">🔥 {{ item.heat }}</view>
                </view>
              </view>
              <view class="shrink-0 text-[26rpx] text-[#94A3B8]">›</view>
            </view>
          </view>
        </view>

        <view v-if="recentSupported.length === 0" class="mt-3 rounded-[20rpx] bg-[#F1F5F9] px-4 py-8 text-center text-[26rpx] text-[#64748B]">
          暂无记录
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { toast } from "../../utils/toast";

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
    title: "把零散副业信息聚合成“赚钱路线图”",
    category: "赚钱",
    heat: 613,
  },
]);

function tapMySubmissions() {
  toast.info(`我的提交：${submissionCount.value} 条（示例）`);
}

function tapMySupports() {
  toast.info(`我的支持：${supportedCount.value} 条（示例）`);
}

function tapSignIn() {
  if (signedIn.value) {
    toast.info("今天已签到");
    return;
  }
  signedIn.value = true;
  points.value += 5;
  toast.success("+5 积分");
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
  toast.info("打开详情（示例）");
  uni.navigateTo({ url: `/pages/detail/detail?id=${encodeURIComponent(id)}` });
}
</script>

<style scoped>
.entry {
  position: relative;
  border-radius: 20rpx;
  background: #ffffff;
  border: 2rpx solid #e2e8f0;
  padding: 24rpx;
  display: flex;
  flex-direction: column;
  gap: 10rpx;
  box-shadow: 0 10rpx 22rpx rgba(15, 23, 42, 0.05);
}

.entry-disabled {
  opacity: 0.75;
}

.sign {
  box-shadow: 0 16rpx 30rpx rgba(59, 130, 246, 0.14);
}

.icon {
  width: 68rpx;
  height: 68rpx;
  border-radius: 18rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28rpx;
  font-weight: 700;
  color: #ffffff;
}

.i-blue {
  background: linear-gradient(135deg, #3b82f6, #60a5fa);
}

.i-purple {
  background: linear-gradient(135deg, #8b5cf6, #a78bfa);
}

.i-amber {
  background: linear-gradient(135deg, #f59e0b, #fbbf24);
}

.i-slate {
  background: linear-gradient(135deg, #0f172a, #334155);
}

.entry-title {
  font-size: 28rpx;
  font-weight: 600;
  color: #0f172a;
}

.entry-sub {
  font-size: 22rpx;
  color: #64748b;
}

.badge {
  position: absolute;
  right: 18rpx;
  top: 18rpx;
  min-width: 40rpx;
  height: 40rpx;
  padding: 0 12rpx;
  border-radius: 999px;
  background: #ef4444;
  color: #ffffff;
  font-size: 22rpx;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tag {
  position: absolute;
  right: 18rpx;
  top: 18rpx;
  width: 48rpx;
  height: 48rpx;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24rpx;
  font-weight: 700;
}

.tag-off {
  background: #eff6ff;
  color: #3b82f6;
}

.tag-on {
  background: #dcfce7;
  color: #16a34a;
}
</style>

