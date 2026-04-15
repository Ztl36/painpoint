<template>
  <view class="page">
    <!-- Header -->
    <view class="header">
      <view class="header-title">需求广场</view>
      <view class="header-sub">发现真实痛点，为好产品加一把火</view>
    </view>

    <!-- Category Filter -->
    <view class="filter-wrap">
      <scroll-view scroll-x :show-scrollbar="false">
        <view class="filter-row">
          <view
            v-for="c in categories"
            :key="c"
            class="filter-item"
            :class="selectedCategory === c ? 'filter-active' : ''"
            @tap="selectCategory(c)"
          >
            {{ c }}
          </view>
        </view>
      </scroll-view>
    </view>

    <!-- Card List -->
    <view class="list">
      <DemandCard
        v-for="item in visibleList"
        :key="item.id"
        :id="item.id"
        :title="item.title"
        :description="item.desc"
        :heat="item.heat"
        :category="item.category"
        :category-label="item.category"
        @support="onSupport"
        @open="onOpen"
      />

      <!-- Empty State -->
      <view v-if="visibleList.length === 0" class="empty">
        <view class="empty-title">暂无内容</view>
        <view class="empty-sub">换个分类试试</view>
      </view>

      <!-- Load More -->
      <view v-if="visibleList.length > 0" class="load-more">
        <view v-if="isLoading">加载中…</view>
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
import { CATEGORIES_WITH_ALL } from "../../constants/category";
import type { DemandCategoryWithAll, DemandItem } from "../../types/demand";

const categories = ref<DemandCategoryWithAll[]>([...CATEGORIES_WITH_ALL]);
const selectedCategory = ref<DemandCategoryWithAll>("全部");

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

function selectCategory(c: DemandCategoryWithAll) {
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
      title: "把健身计划变成「像游戏一样」的每日任务",
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
      title: "把零散副业信息聚合成「赚钱路线图」",
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
      title: "旅行前一键生成「轻量行程」并自动避坑",
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

  const categoriesPool: DemandItem["category"][] = ["工具", "生活", "学习", "健康", "娱乐", "赚钱", "社交"];
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
  toast.success("已支持 +1");
}

function onOpen(id: string) {
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
    if (noMore.value) {
      isLoading.value = false;
      return;
    }
    pageNo.value += 1;
    isLoading.value = false;
    if (visibleList.value.length >= filteredAll.value.length) noMore.value = true;
  }, 450);
});
</script>

<style scoped>
.page {
  min-height: 100vh;
  background: #f5f5f7;
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

/* Category Filter */
.filter-wrap {
  background: #ffffff;
  padding: 0 40rpx 24rpx;
}

.filter-row {
  display: flex;
  align-items: center;
  gap: 0;
  white-space: nowrap;
}

.filter-item {
  display: inline-block;
  font-size: 28rpx;
  color: #86868b;
  padding: 8rpx 24rpx;
  border-radius: 999px;
  transition: all 200ms ease;
  flex-shrink: 0;
}

.filter-active {
  color: #ffffff;
  background: #007aff;
  font-weight: 600;
}

/* List */
.list {
  padding: 20rpx 30rpx 40rpx;
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

/* Empty */
.empty {
  background: #ffffff;
  border-radius: 20rpx;
  padding: 80rpx 40rpx;
  text-align: center;
}

.empty-title {
  font-size: 30rpx;
  font-weight: 600;
  color: #1d1d1f;
}

.empty-sub {
  font-size: 26rpx;
  color: #86868b;
  margin-top: 8rpx;
}

/* Load More */
.load-more {
  text-align: center;
  padding: 40rpx 0;
  font-size: 24rpx;
  color: #aeaeb2;
}
</style>
