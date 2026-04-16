<template>
  <view class="page">
    <!-- Header -->
    <view class="header">
      <view class="header-title">提交需求</view>
      <view class="header-sub">把痛点写下来，让它被看见</view>
    </view>

    <!-- Form Card -->
    <view class="form-card">
      <!-- 需求标题 -->
      <view class="field">
        <view class="field-label">需求标题</view>
        <input
          class="field-input"
          :class="focused === 'title' ? 'field-input-focus' : ''"
          :value="form.title"
          placeholder="我想要一个能……的App"
          placeholder-class="placeholder"
          @focus="focused = 'title'"
          @blur="focused = ''"
          @input="onTitleInput"
        />
      </view>

      <!-- 具体场景 -->
      <view class="field">
        <view class="field-label">具体场景</view>
        <textarea
          class="field-textarea"
          :class="focused === 'scene' ? 'field-input-focus' : ''"
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

      <!-- 功能设想 -->
      <view class="field">
        <view class="field-label">功能设想（选填）</view>
        <textarea
          class="field-textarea"
          :class="focused === 'idea' ? 'field-input-focus' : ''"
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

      <!-- 付费意愿 -->
      <view class="field">
        <view class="field-label">付费意愿</view>
        <view class="pay-options">
          <view
            v-for="o in payOptions"
            :key="o.value"
            class="pay-option"
            :class="form.pay === o.value ? 'pay-option-on' : ''"
            @tap="form.pay = o.value"
          >
            <view class="pay-option-text">{{ o.label }}</view>
            <view class="pay-check" :class="form.pay === o.value ? 'pay-check-on' : ''">
              <view v-if="form.pay === o.value" class="pay-check-dot" />
            </view>
          </view>
        </view>
      </view>

      <!-- 分类标签 -->
      <view class="field">
        <view class="field-label">分类标签</view>
        <picker mode="selector" :range="categories" :value="categoryIndex" @change="onCategoryChange">
          <view class="field-picker" :class="focused === 'category' ? 'field-input-focus' : ''">
            <view class="field-picker-text" :class="form.category ? '' : 'placeholder'">
              {{ form.category || "请选择分类" }}
            </view>
            <view class="field-picker-arrow">›</view>
          </view>
        </picker>
      </view>
    </view>

    <!-- Submit Button -->
    <view class="submit-wrap">
      <button class="submit-btn" :disabled="submitting" @tap="submit">
        {{ submitting ? "发布中…" : "发布需求" }}
      </button>
    </view>

    <view class="note">示例页面：当前仅做静态交互与校验占位</view>
  </view>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import { withLoading } from "../../utils/loading";
import { toast } from "../../utils/toast";
import { CATEGORIES } from "../../constants/category";
import { PAY_OPTIONS } from "../../types/demand";
import type { SubmitForm } from "../../types/demand";

/** 提交页分类不含"全部" */
const categories = ref([...CATEGORIES]);

const payOptions = ref(PAY_OPTIONS);

const form = reactive<SubmitForm>({
  title: "",
  scene: "",
  idea: "",
  pay: "free",
  category: "生活",
});

const submitting = ref(false);
const focused = ref<"" | "title" | "scene" | "idea" | "category">("");

const categoryIndex = computed(() => {
  const idx = categories.value.indexOf(form.category);
  return idx >= 0 ? idx : 0;
});

function onTitleInput(e: { detail: { value: string } }) {
  form.title = e.detail.value ?? "";
}

function onSceneInput(e: { detail: { value: string } }) {
  form.scene = e.detail.value ?? "";
}

function onIdeaInput(e: { detail: { value: string } }) {
  form.idea = e.detail.value ?? "";
}

function onCategoryChange(e: { detail: { value: number } }) {
  const idx = Number(e.detail.value ?? 0);
  form.category = categories.value[idx] ?? "全部";
}

async function submit() {
  if (submitting.value) return;
  if (!form.title.trim()) {
    toast.info("请输入需求标题");
    return;
  }
  if (!form.scene.trim()) {
    toast.info("请输入具体场景");
    return;
  }

  submitting.value = true;
  try {
    await withLoading(() => new Promise<void>((r) => setTimeout(r, 450)));
    toast.success("提交成功");
    setTimeout(() => {
      uni.navigateBack();
    }, 550);
  } finally {
    submitting.value = false;
  }
}
</script>

<style scoped>
.page {
  min-height: 100vh;
  background: #f5f5f7;
  padding-bottom: 60rpx;
}

/* Header */
.header {
  background: #ffffff;
  padding: 56rpx 40rpx 32rpx;
}

.header-title {
  font-size: 34rpx;
  font-weight: 700;
  color: #1d1d1f;
  letter-spacing: -0.5rpx;
}

.header-sub {
  font-size: 26rpx;
  color: #86868b;
  margin-top: 8rpx;
}

/* Form Card */
.form-card {
  margin: 20rpx 30rpx 0;
  background: #ffffff;
  border-radius: 40rpx; /* Airbnb卡片圆角20px = 40rpx */
  padding: 36rpx 36rpx 12rpx;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 0px 0px 1px, rgba(0, 0, 0, 0.04) 0px 2px 6px, rgba(0, 0, 0, 0.1) 0px 4px 8px; /* Airbnb三层面影 */
}

/* Field */
.field {
  margin-bottom: 32rpx;
}

.field-label {
  font-size: 24rpx;
  font-weight: 600;
  color: #6a6a6a; /* Airbnb次要文本色 */
  text-transform: uppercase;
  letter-spacing: 0.5rpx;
  margin-bottom: 12rpx;
}

.field-input {
  height: 88rpx;
  background: #f2f2f2; /* Airbnb表面灰色 */
  border-radius: 14rpx;
  padding: 0 24rpx;
  font-size: 30rpx;
  color: #222222; /* Airbnb近黑色文本 */
  border: 2rpx solid transparent;
  transition: border-color 160ms ease;
}

.field-input-focus {
  border-color: #ff385c; /* Airbnb Rausch Red */
  background: #ffffff;
}

.field-textarea {
  background: #f2f2f2; /* Airbnb表面灰色 */
  border-radius: 14rpx;
  padding: 20rpx 24rpx;
  font-size: 30rpx;
  color: #222222; /* Airbnb近黑色文本 */
  border: 2rpx solid transparent;
  transition: border-color 160ms ease;
  min-height: 200rpx;
  line-height: 1.6;
  width: 100%;
  box-sizing: border-box;
}

.placeholder {
  color: rgba(0, 0, 0, 0.24); /* Airbnb禁用状态 */
}

/* Pay Options */
.pay-options {
  display: flex;
  flex-direction: column;
  gap: 12rpx;
}

.pay-option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f2f2f2; /* Airbnb表面灰色 */
  border-radius: 14rpx;
  padding: 24rpx 28rpx;
  border: 2rpx solid transparent;
  transition: all 160ms ease;
}

.pay-option-on {
  background: #ffffff;
  border-color: #ff385c; /* Airbnb Rausch Red */
}

.pay-option-text {
  font-size: 28rpx;
  color: #222222; /* Airbnb近黑色文本 */
  font-weight: 500;
}

.pay-check {
  width: 36rpx;
  height: 36rpx;
  border-radius: 999px;
  border: 3rpx solid #c1c1c1; /* Airbnb边框灰色 */
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 160ms ease;
  flex-shrink: 0;
}

.pay-check-on {
  border-color: #ff385c; /* Airbnb Rausch Red */
  background: #ff385c; /* Airbnb Rausch Red */
}

.pay-check-dot {
  width: 10rpx;
  height: 10rpx;
  border-radius: 999px;
  background: #ffffff;
}

/* Picker */
.field-picker {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f2f2f2; /* Airbnb表面灰色 */
  border-radius: 14rpx;
  padding: 0 24rpx;
  height: 88rpx;
  border: 2rpx solid transparent;
  transition: border-color 160ms ease;
}

.field-picker-text {
  font-size: 30rpx;
  color: #222222; /* Airbnb近黑色文本 */
}

.field-picker-arrow {
  font-size: 32rpx;
  color: rgba(0, 0, 0, 0.24); /* Airbnb禁用状态 */
}

/* Submit */
.submit-wrap {
  margin: 28rpx 30rpx 0;
}

.submit-btn {
  width: 100%;
  height: 96rpx;
  background: #222222; /* Airbnb深色按钮 */
  color: #ffffff;
  border-radius: 16rpx; /* Airbnb按钮圆角8px = 16rpx */
  font-size: 30rpx;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 0.2rpx;
  transition: background-color 200ms ease;
}

.submit-btn:active {
  background-color: #ff385c; /* 悬停时变为品牌红色 */
}

.submit-btn[disabled] {
  opacity: 0.45;
}

.note {
  text-align: center;
  margin-top: 20rpx;
  font-size: 22rpx;
  color: rgba(0, 0, 0, 0.24); /* Airbnb禁用状态 */
}
</style>
