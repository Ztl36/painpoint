<template>
  <view class="min-h-screen bg-[#F8FAFC] px-6 pb-8 pt-4 text-[#1E293B]">
    <view class="text-[34rpx] font-semibold text-[#0F172A]">提交需求</view>
    <view class="mt-2 text-[24rpx] text-[#64748B]">把痛点写下来，让它被看见</view>

    <view class="mt-5 rounded-[24rpx] bg-white px-6 py-6 shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
      <view class="field">
        <view class="label">需求标题</view>
        <input
          class="control"
          :class="focused === 'title' ? 'control-focus' : ''"
          :value="form.title"
          placeholder="我想要一个能……的App"
          placeholder-class="placeholder"
          @focus="focused = 'title'"
          @blur="focused = ''"
          @input="onTitleInput"
        />
      </view>

      <view class="field">
        <view class="label">具体场景</view>
        <textarea
          class="control textarea"
          :class="focused === 'scene' ? 'control-focus' : ''"
          :value="form.scene"
          placeholder="在什么时候/什么情况下你觉得特别需要？"
          placeholder-class="placeholder"
          :maxlength="800"
          auto-height
          @focus="focused = 'scene'"
          @blur="focused = ''"
          @input="onSceneInput"
        />
      </view>

      <view class="field">
        <view class="label">功能设想（选填）</view>
        <textarea
          class="control textarea"
          :class="focused === 'idea' ? 'control-focus' : ''"
          :value="form.idea"
          placeholder="希望它有哪些具体功能？（选填）"
          placeholder-class="placeholder"
          :maxlength="800"
          auto-height
          @focus="focused = 'idea'"
          @blur="focused = ''"
          @input="onIdeaInput"
        />
      </view>

      <view class="field">
        <view class="label">付费意愿</view>
        <view class="mt-1 grid grid-cols-1 gap-3">
          <view
            v-for="o in payOptions"
            :key="o.value"
            class="pay-card"
            :class="form.pay === o.value ? 'pay-card-on' : 'pay-card-off'"
            @tap="form.pay = o.value"
          >
            <view class="text-[28rpx] font-semibold" :class="form.pay === o.value ? 'text-[#0F172A]' : 'text-[#1E293B]'">
              {{ o.label }}
            </view>
            <view class="check" :class="form.pay === o.value ? 'check-on' : 'check-off'">
              <view class="dot" />
            </view>
          </view>
        </view>
      </view>

      <view class="field">
        <view class="label">分类标签</view>
        <picker mode="selector" :range="categories" :value="categoryIndex" @change="onCategoryChange">
          <view class="control picker" :class="focused === 'category' ? 'control-focus' : ''" @tap="focused = 'category'">
            <view class="text-[28rpx]" :class="form.category ? 'text-[#0F172A]' : 'text-[#94A3B8]'">
              {{ form.category || '请选择分类' }}
            </view>
            <view class="text-[30rpx] text-[#94A3B8]">›</view>
          </view>
        </picker>
      </view>
    </view>

    <button class="submit-btn mt-5 w-full" :disabled="submitting" @tap="submit">
      {{ submitting ? "发布中…" : "发布需求" }}
    </button>

    <view class="mt-4 text-center text-[22rpx] text-[#94A3B8]">示例页面：当前仅做静态交互与校验占位</view>
  </view>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import { withLoading } from "../../utils/request";

type PayValue = "free" | "one_time" | "sub";

const categories = ref(["全部", "工具", "生活", "学习", "健康", "娱乐", "赚钱", "社交"]);

const payOptions = ref([
  { label: "不愿意", value: "free" as const },
  { label: "一次性买断", value: "one_time" as const },
  { label: "订阅或内购", value: "sub" as const },
]);

const form = reactive({
  title: "",
  scene: "",
  idea: "",
  pay: "free" as PayValue,
  category: "生活",
});

const submitting = ref(false);
const focused = ref<"" | "title" | "scene" | "idea" | "category">("");

const categoryIndex = computed(() => {
  const idx = categories.value.indexOf(form.category);
  return idx >= 0 ? idx : 0;
});

function showToast(title: string, duration = 1800, icon: "success" | "none" = "none") {
  uni.showToast({ title, duration, icon });
}

function onTitleInput(e: any) {
  form.title = e?.detail?.value ?? "";
}

function onSceneInput(e: any) {
  form.scene = e?.detail?.value ?? "";
}

function onIdeaInput(e: any) {
  form.idea = e?.detail?.value ?? "";
}

function onCategoryChange(e: any) {
  const idx = Number(e?.detail?.value ?? 0);
  form.category = categories.value[idx] ?? "全部";
}

async function submit() {
  if (submitting.value) return;
  if (!form.title.trim()) {
    showToast("请输入需求标题");
    return;
  }
  if (!form.scene.trim()) {
    showToast("请输入具体场景");
    return;
  }

  submitting.value = true;
  try {
    await withLoading(() => new Promise<void>((r) => setTimeout(r, 450)));
    showToast("提交成功", 1800, "success");
    setTimeout(() => {
      uni.navigateBack();
    }, 550);
  } finally {
    submitting.value = false;
  }
}
</script>

<style scoped>
.field {
  display: flex;
  flex-direction: column;
  gap: 12rpx;
}

.field + .field {
  margin-top: 20rpx;
}

.label {
  font-size: 24rpx;
  color: #64748b;
  font-weight: 600;
}

.control {
  height: 84rpx;
  border-radius: 16rpx;
  background: #f1f5f9;
  padding: 0 24rpx;
  font-size: 28rpx;
  color: #0f172a;
  border: 2rpx solid transparent;
  transition: border-color 160ms ease, box-shadow 160ms ease;
}

.control-focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 10rpx rgba(59, 130, 246, 0.16);
}

.textarea {
  height: auto;
  min-height: 220rpx;
  padding: 18rpx 24rpx;
}

.placeholder {
  color: #94a3b8;
}

.picker {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.pay-card {
  border-radius: 20rpx;
  padding: 22rpx 24rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f8fafc;
  border: 2rpx solid #e2e8f0;
}

.pay-card-on {
  background: #eff6ff;
  border-color: #3b82f6;
  box-shadow: 0 10rpx 24rpx rgba(59, 130, 246, 0.12);
}

.pay-card-off {
  box-shadow: 0 6rpx 16rpx rgba(15, 23, 42, 0.04);
}

.check {
  width: 40rpx;
  height: 40rpx;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2rpx solid #cbd5e1;
  background: #ffffff;
}

.check-on {
  border-color: #3b82f6;
  background: #3b82f6;
}

.check-off {
  border-color: #cbd5e1;
}

.dot {
  width: 12rpx;
  height: 12rpx;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.95);
}

.submit-btn {
  height: 96rpx;
  border-radius: 48rpx;
  font-size: 30rpx;
  font-weight: 600;
  color: #ffffff;
  background: linear-gradient(90deg, #3b82f6, #8b5cf6);
  box-shadow: 0 14rpx 30rpx rgba(59, 130, 246, 0.22);
  display: flex;
  align-items: center;
  justify-content: center;
}

.submit-btn[disabled] {
  opacity: 0.55;
}
</style>

