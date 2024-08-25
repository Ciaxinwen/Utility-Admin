<template>
  <PageWrapper dense>
    <template #header>
      <a-skeleton :loading :avatar="{ size: 80 }" :paragraph="{ rows: 1 }">
        <div class="h-full flex justify-between">
          <div class="flex gap-3 items-center">
            <a-avatar :src="userInfo?.avatar" :size="80" />
            <div>
              <div class="text-lg font-bold mb-1.5">
                早上好，{{ userInfo?.name }}，祝你开心每一天！
              </div>
              <div class="text-sm text-gray">今日多云转晴，20℃ - 25℃!</div>
            </div>
          </div>
          <div class="flex gap-3 items-center">
            <div class="flex flex-col items-center gap-2">
              <span class="text-16px text-gray-400">项目数</span>
              <span class="text-2xl">30</span>
            </div>
            <div class="flex flex-col items-center gap-2">
              <span class="text-16px text-gray-400">待办</span>
              <span class="text-2xl">10/18</span>
            </div>
            <div class="flex flex-col items-center gap-2">
              <span class="text-16px text-gray-400">未读消息</span>
              <span class="text-2xl">8</span>
            </div>
          </div>
        </div>
      </a-skeleton>
    </template>

    <CountCards />
    <a-card class="analysis-card mt-3" shadow-sm>
      <a-segmented class="mb-1" v-model:value="activeKey" :options="visitOptions">
        <template #label="{ title }">
          <span>{{ title }}</span>
        </template>
      </a-segmented>
      <div>
        <VisitAnalysis v-if="activeKey === '1'" />
        <DealAnalysis v-else />
      </div>
    </a-card>
    <a-row class="mt-3" :gutter="12">
      <a-col :span="18">
        <DynamicList />
      </a-col>
      <a-col :span="6">
        <PlanProgress />
      </a-col>
    </a-row>
  </PageWrapper>
</template>

<script lang="ts" setup>
  import { useUserStore } from '@/store/module/user';
  import { storeToRefs } from 'pinia';
  import CountCards from './components/CountCards.vue';
  import VisitAnalysis from './components/VisitAnalysis.vue';
  import DealAnalysis from './components/DealAnalysis.vue';
  import DynamicList from './components/DynamicList.vue';
  import PlanProgress from './components/PlanProgress.vue';

  const userStore = useUserStore();
  const { userInfo } = storeToRefs(userStore);

  const activeKey = ref('1');
  const visitOptions = [
    {
      title: '访问量',
      value: '1',
    },
    {
      title: '成交额',
      value: '2',
    },
  ];

  const loading = ref(true);

  setTimeout(() => {
    loading.value = false;
  }, 1000);
</script>

<style lang="scss" scoped></style>
