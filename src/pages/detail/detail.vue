<template>
  <view class="min-h-screen bg-[#F8FAFC] pb-[180rpx] text-[#1E293B]">
    <view class="relative overflow-hidden rounded-b-[40rpx] bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] px-6 pb-10 pt-6">
      <view class="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10" />
      <view class="absolute -left-12 top-12 h-36 w-36 rounded-full bg-white/8" />

      <view class="glass rounded-[24rpx] px-6 py-6">
        <view class="text-[34rpx] font-semibold leading-7 text-[#0F172A]">{{ demand.title }}</view>
        <view class="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2">
          <view class="rounded-full bg-[#F1F5F9] px-3 py-1 text-[22rpx] font-medium text-[#64748B]">
            {{ demand.category }}
          </view>
          <view class="text-[22rpx] text-[#64748B]">发布者：{{ demand.author }}</view>
          <view class="text-[22rpx] text-[#94A3B8]">·</view>
          <view class="text-[22rpx] text-[#64748B]">{{ demand.createdAt }}</view>
        </view>

        <view class="mt-5 flex items-center justify-between">
          <view class="text-[22rpx] text-[#64748B]">ID: {{ id || "-" }}</view>
          <view class="rounded-full bg-white/60 px-4 py-1.5 text-[22rpx] font-semibold text-[#0F172A]">
            🔥 {{ heatCount }}
          </view>
        </view>
      </view>
    </view>

    <view class="px-6">
      <view class="-mt-6 rounded-[24rpx] bg-white px-6 py-6 shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
        <view class="section-title">具体场景</view>
        <view class="mt-3 text-[26rpx] leading-7 text-[#1E293B]">{{ demand.scene }}</view>

        <view v-if="demand.idea" class="mt-6">
          <view class="section-title">功能设想</view>
          <view class="mt-3 text-[26rpx] leading-7 text-[#1E293B]">{{ demand.idea }}</view>
        </view>

        <view class="mt-6">
          <view class="section-title">付费意愿</view>
          <view class="mt-3 inline-flex items-center rounded-full bg-[#EFF6FF] px-4 py-2 text-[22rpx] font-semibold text-[#3B82F6]">
            {{ payLabel }}
          </view>
        </view>
      </view>

      <view class="mt-5 rounded-[24rpx] bg-white px-6 py-6 shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
        <view class="flex items-center justify-between">
          <view class="text-[28rpx] font-semibold text-[#0F172A]">评论区</view>
          <view class="text-[22rpx] text-[#94A3B8]">预留</view>
        </view>

        <view class="mt-4 rounded-[20rpx] bg-[#F1F5F9] px-4 py-6">
          <view class="flex items-center gap-4">
            <view class="illu">
              <view class="illu-a" />
              <view class="illu-b" />
              <view class="illu-c" />
            </view>
            <view class="min-w-0 flex-1">
              <view class="text-[28rpx] font-semibold text-[#0F172A]">还没有评论</view>
              <view class="mt-2 text-[24rpx] text-[#64748B]">先把你的经历写下来，给后来者一束光</view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <view class="fab-wrap">
      <view class="mx-auto w-full max-w-[720rpx] px-6">
        <view class="fab-panel rounded-[999px] bg-white px-4 py-3">
          <button
            class="fab-btn flex-1"
            :class="supported ? 'fab-on' : 'fab-off'"
            @tap="toggleSupport"
          >
            <view v-if="rippleKey" :key="rippleKey" class="ripple" />
            <text class="mr-1">✨</text>{{ supported ? "已支持" : "我也遇到过" }}
          </button>
          <button class="follow-btn" :class="followed ? 'follow-on' : 'follow-off'" @tap="toggleFollow">
            <text class="mr-1">{{ followed ? "★" : "☆" }}</text>{{ followed ? "已关注" : "关注" }}
          </button>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { onLoad } from "@dcloudio/uni-app";
import { computed, reactive, ref } from "vue";
import { toast } from "../../utils/toast";

const id = ref<string>("");

type PayValue = "free" | "one_time" | "sub";

const supported = ref(false);
const followed = ref(false);
const baseHeat = ref(328);
const rippleKey = ref(0);

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

onLoad((query) => {
  const qid = typeof query?.id === "string" ? query.id : "";
  id.value = qid;
  if (qid) demand.title = `（示例）需求：${qid}`;
});

function goSubmit() {
  uni.switchTab({ url: "/pages/submit/submit" });
}

function toggleSupport() {
  if (supported.value) return;
  supported.value = true;
  rippleKey.value += 1;
  toast.success("已支持 +1", 1200);
}

function toggleFollow() {
  followed.value = !followed.value;
  toast.info(followed.value ? "已关注" : "已取消关注", 1400);
}
</script>

<style scoped>
.section-title {
  font-size: 24rpx;
  color: #64748b;
  font-weight: 600;
}

.glass {
  background: rgba(255, 255, 255, 0.72);
  border: 2rpx solid rgba(255, 255, 255, 0.55);
  backdrop-filter: blur(10px);
}

.fab-wrap {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  padding-bottom: env(safe-area-inset-bottom);
}

.fab-panel {
  box-shadow: 0 16rpx 36rpx rgba(15, 23, 42, 0.12);
  border: 2rpx solid #e2e8f0;
  display: flex;
  align-items: center;
  gap: 16rpx;
}

.fab-btn {
  height: 88rpx;
  border-radius: 999px;
  font-size: 28rpx;
  font-weight: 600;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.fab-off {
  background: linear-gradient(90deg, #3b82f6, #8b5cf6);
  color: #ffffff;
}

.fab-on {
  background: linear-gradient(90deg, #8b5cf6, #3b82f6);
  color: #ffffff;
}

.follow-btn {
  width: 180rpx;
  height: 88rpx;
  border-radius: 999px;
  font-size: 26rpx;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
}

.follow-off {
  background: #f1f5f9;
  color: #1e293b;
}

.follow-on {
  background: #eff6ff;
  color: #3b82f6;
}

.ripple {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 20rpx;
  height: 20rpx;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.35);
  transform: translate(-50%, -50%);
  animation: ripple 560ms ease-out forwards;
}

@keyframes ripple {
  0% {
    opacity: 0.55;
    transform: translate(-50%, -50%) scale(1);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(18);
  }
}

.illu {
  width: 120rpx;
  height: 120rpx;
  border-radius: 30rpx;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.18), rgba(139, 92, 246, 0.18));
  position: relative;
  overflow: hidden;
}

.illu-a {
  position: absolute;
  left: 16rpx;
  top: 20rpx;
  width: 44rpx;
  height: 44rpx;
  border-radius: 999px;
  background: rgba(59, 130, 246, 0.35);
}

.illu-b {
  position: absolute;
  right: 14rpx;
  top: 34rpx;
  width: 36rpx;
  height: 36rpx;
  border-radius: 999px;
  background: rgba(139, 92, 246, 0.35);
}

.illu-c {
  position: absolute;
  left: 26rpx;
  bottom: 18rpx;
  width: 70rpx;
  height: 18rpx;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.55);
}
</style>
