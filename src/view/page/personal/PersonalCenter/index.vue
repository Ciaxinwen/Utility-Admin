<template>
  <PageWrapper defaultBgColor contentClass="pt-0">
    <template #header>
      <div class="h-full flex justify-between">
        <div class="flex gap-3 items-center">
          <a-avatar :src="userInfo?.avatar" :size="80" />
          <div>
            <div class="font-medium mb-1.5 flex items-center gap-2">
              <div class="text-lg">{{ userInfo?.name }}</div>
              <div class="i-ri:vip-crown-2-fill color-amber text-lg"></div>
            </div>
            <div class="text-sm text-gray">IP属地：{{ userInfo?.area }}</div>
            <div class="text-sm text-gray">
              简介：暂无填写
              <a-button type="link">
                <template #icon>
                  <EditOutlined />
                </template>
              </a-button>
            </div>
          </div>
        </div>
        <div class="flex gap-3 items-center">
          <div class="flex flex-col items-center gap-2">
            <span class="text-16px text-gray-400">粉丝</span>
            <span class="text-xl font-medium">30</span>
          </div>
          <a-divider class="h-1/2" type="vertical" />
          <div class="flex flex-col items-center gap-2">
            <span class="text-16px text-gray-400">关注</span>
            <span class="text-xl font-medium">10</span>
          </div>
          <a-divider class="h-1/2" type="vertical" />
          <div class="flex flex-col items-center gap-2">
            <span class="text-16px text-gray-400">收藏</span>
            <span class="text-xl font-medium">8</span>
          </div>
        </div>
      </div>
    </template>
    <a-tabs v-model:activeKey="activeKey">
      <template #rightExtra>
        <a-button type="text" shape="circle">
          <template #icon>
            <SearchOutlined />
          </template>
        </a-button>
      </template>
      <a-tab-pane v-for="item in settingTabs" :key="item.title" :tab="item.title">
        <component :is="item.component" />
      </a-tab-pane>
    </a-tabs>
  </PageWrapper>
</template>

<script lang="ts" setup>
  import { useUserStore } from '@/store/module/user';
  import { storeToRefs } from 'pinia';
  import Article from './Article.vue';
  import Collection from './Collection.vue';
  import Trends from './Trends.vue';

  const userStore = useUserStore();
  const { userInfo } = storeToRefs(userStore);

  const activeKey = ref('动态');
  const settingTabs = [
    {
      title: '动态',
      component: Trends,
    },
    {
      title: '文章',
      component: Article,
    },
    {
      title: '收藏集',
      component: Collection,
    },
  ];
</script>

<style lang="scss" scoped></style>
