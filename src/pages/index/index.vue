<template>
  <view class="min-h-screen bg-[#F8FAFC] px-6 pb-8 pt-4 text-[#1E293B]">
    <view class="flex items-start justify-between gap-4">
      <view class="min-w-0 flex-1">
        <view class="text-[34rpx] font-semibold text-[#0F172A]">需求广场</view>
        <view class="mt-2 text-[24rpx] text-[#64748B]">发现真实痛点，为好产品加一把火</view>
      </view>
      <button class="primary-btn px-5" @tap="goSubmit">去提交</button>
    </view>

    <scroll-view scroll-x class="mt-5 w-full" :show-scrollbar="false">
      <view class="flex items-center gap-5">
        <view v-for="c in categories" :key="c" class="shrink-0" @tap="selectCategory(c)">
          <view
            class="text-[26rpx]"
            :class="selectedCategory === c ? 'font-semibold text-[#3B82F6]' : 'text-[#64748B]'"
          >
            {{ c }}
          </view>
          <view
            class="mt-3 h-[6rpx] rounded-full"
            :class="
              selectedCategory === c
                ? 'w-[72rpx] bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6]'
                : 'w-[44rpx] bg-transparent'
            "
          />
        </view>
      </view>
    </scroll-view>

    <view class="mt-5 grid grid-cols-1 gap-5">
      <DemandCard
        v-for="item in visibleList"
        :key="item.id"
        :id="item.id"
        :title="item.title"
        :description="item.desc"
        :hot-value="item.heat"
        :category="item.category"
        :category-label="item.category"
        @support="onSupport"
        @open="onOpen"
      />

      <view
        v-if="visibleList.length === 0"
        class="rounded-[24rpx] bg-white px-6 py-10 text-center text-[#64748B] shadow-[0_4px_12px_rgba(0,0,0,0.04)]"
      >
        <view class="text-[28rpx] font-semibold text-[#0F172A]">暂无内容</view>
        <view class="mt-2 text-[24rpx]">换个分类看看</view>
      </view>

      <view v-else class="py-4 text-center text-[24rpx] text-[#94A3B8]">
        <view v-if="isLoading">加载中...</view>
        <view v-else-if="noMore">没有更多了</view>
        <view v-else>上拉加载更多</view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { onReachBottom } from "@dcloudio/uni-app";
import DemandCard from "../../components/DemandCard.vue";
import { toast } from "../../utils/toast";

type DemandCategory =
  | "全部"
  | "工具"
  | "生活"
  | "学习"
  | "健康"
  | "娱乐"
  | "赚钱"
  | "社交";

type DemandItem = {
  id: string;
  title: string;
  desc: string;
  heat: number;
  category: Exclude<DemandCategory, "全部">;
};

const categories = ref<DemandCategory[]>(["全部", "工具", "生活", "学习", "健康", "娱乐", "赚钱", "社交"]);
const selectedCategory = ref<DemandCategory>("全部");

const pageSize = 8;
const pageNo = ref(1);
const isLoading = ref(false);
const noMore = ref(false);

const allList = ref<DemandItem[]>(createMockList());

const filteredAll = computed(() => {
  if (selectedCategory.value === "全部") return allList.value;
  return allList.value.filter((x) => x.category === selectedCategory.value);
});

const visibleList = computed(() => {
  const end = pageNo.value * pageSize;
  return filteredAll.value.slice(0, end);
});

function selectCategory(c: DemandCategory) {
  if (selectedCategory.value === c) return;
  selectedCategory.value = c;
  pageNo.value = 1;
  noMore.value = false;
}

function createMockList(): DemandItem[] {
  const samples: Omit<DemandItem, "id">[] = [
    {
      title: "一个能识别路边植物并告诉我能不能吃的App",
      desc: "路边看到不认识的植物，总担心有毒又好奇能不能吃。希望拍照后能识别、给出食用风险提示，并附上靠谱来源。",
      heat: 342,
      category: "生活",
    },
    {
      title: "自动把会议录音变成可检索的行动清单",
      desc: "每次开会都来不及记笔记，会后又找不到关键结论。希望能自动整理要点、分配待办并提醒。",
      heat: 521,
      category: "工具",
    },
    {
      title: "把健身计划变成“像游戏一样”的每日任务",
      desc: "总是三天打鱼两天晒网。希望用闯关、成就、奖励机制，把运动坚持下来。",
      heat: 287,
      category: "健康",
    },
    {
      title: "学习时自动屏蔽分心内容并统计专注时长",
      desc: "一打开手机就被短视频吸走。希望一键进入专注模式，只允许学习相关App，并给出周报。",
      heat: 409,
      category: "学习",
    },
    {
      title: "把零散副业信息聚合成“赚钱路线图”",
      desc: "看到很多副业教程但不知道从哪开始。希望按目标收入给出路线、资源与里程碑，并可复盘。",
      heat: 613,
      category: "赚钱",
    },
    {
      title: "一个能把好友兴趣自动整理成送礼清单的工具",
      desc: "朋友生日总是临时抱佛脚。希望能记下TA喜欢的东西、预算区间，按场景推荐礼物并提醒。",
      heat: 198,
      category: "社交",
    },
    {
      title: "旅行前一键生成“轻量行程”并自动避坑",
      desc: "攻略太长看不完。希望按时间与预算给出简洁行程、避坑提示、必吃必去清单。",
      heat: 376,
      category: "娱乐",
    },
    {
      title: "把家里常见食材自动生成一周菜单",
      desc: "下班回家不知道吃什么。希望拍照/录入冰箱食材后，给出一周菜单与购物清单。",
      heat: 254,
      category: "生活",
    },
  ];

  const categoriesPool: Exclude<DemandCategory, "全部">[] = ["工具", "生活", "学习", "健康", "娱乐", "赚钱", "社交"];
  const list: DemandItem[] = [];
  for (let i = 0; i < 24; i += 1) {
    const s = samples[i % samples.length];
    const category = categoriesPool[i % categoriesPool.length];
    const heat = s.heat + (i % 6) * 17;
    list.push({
      id: `d_${i + 1}`,
      title: s.title,
      desc: s.desc,
      heat,
      category: category ?? s.category,
    });
  }
  return list;
}

function onSupport(id: string) {
  const item = allList.value.find((x) => x.id === id);
  if (!item) return;
  item.heat += 1;
  toast.success("已支持 +1", 1200);
}

function onOpen(id: string) {
  goDetail(id);
}

function goSubmit() {
  uni.switchTab({ url: "/pages/submit/submit" });
}

function goDetail(id: string) {
  uni.navigateTo({ url: `/pages/detail/detail?id=${encodeURIComponent(id)}` });
}

onReachBottom(() => {
  if (isLoading.value || noMore.value) return;
  if (visibleList.value.length >= filteredAll.value.length) {
    noMore.value = true;
    return;
  }

  isLoading.value = true;
  setTimeout(() => {
    pageNo.value += 1;
    isLoading.value = false;
    if (visibleList.value.length >= filteredAll.value.length) noMore.value = true;
  }, 450);
});
</script>

<style scoped>
.primary-btn {
  height: 72rpx;
  border-radius: 999px;
  font-size: 26rpx;
  font-weight: 600;
  color: #ffffff;
  background: linear-gradient(90deg, #3b82f6, #8b5cf6);
  box-shadow: 0 10rpx 24rpx rgba(59, 130, 246, 0.22);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
