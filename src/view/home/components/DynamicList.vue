<template>
  <a-card title="项目动态" shadow-sm :loading size="small">
    <template #extra>
      <a-button type="link">更多动态</a-button>
    </template>
    <a-list item-layout="horizontal" :data-source="data">
      <template #renderItem="{ item }">
        <a-list-item>
          <a-list-item-meta :description="item.description">
            <template #title>
              {{ item.title }}
            </template>
            <template #avatar>
              <a-avatar :src="userInfo?.avatar" />
            </template>
          </a-list-item-meta>
        </a-list-item>
      </template>
    </a-list>
  </a-card>
</template>

<script lang="ts" setup>
  import { useUserStore } from '@/store/module/user';
  import { storeToRefs } from 'pinia';
  import dayjs from 'dayjs';

  const userStore = useUserStore();
  const { userInfo } = storeToRefs(userStore);
  const data = [
    {
      title: `${userInfo.value?.name}将项目发布到github并获得了999+个Star`,
      description: dayjs().subtract(1, 'day').format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: `${userInfo.value?.name}基本完成了项目的示例代码`,
      description: dayjs().subtract(2, 'day').format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: `${userInfo.value?.name}新增了ECharts、高德地图api等依赖`,
      description: dayjs().subtract(3, 'day').format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: `${userInfo.value?.name}更新了项目整体架构代码`,
      description: dayjs().subtract(4, 'day').format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: `${userInfo.value?.name}创建了Utility Admin，还开源啦！`,
      description: dayjs().subtract(5, 'day').format('YYYY-MM-DD HH:mm:ss'),
    },
  ];

  const loading = ref(true);

  setTimeout(() => {
    loading.value = false;
  }, 1000);
</script>

<style lang="scss" scoped></style>
