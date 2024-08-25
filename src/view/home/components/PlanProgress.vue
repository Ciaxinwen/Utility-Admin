<template>
  <a-card title="最新进度" shadow-sm :loading size="small">
    <a-steps progress-dot :current="items.length" direction="vertical" :items></a-steps>
  </a-card>
</template>

<script lang="ts" setup>
  const items = reactive([
    {
      title: '项目构思',
      description: '构思项目的初步想法和目标',
    },
    {
      title: '项目开发',
      description: '根据构思进行项目开发',
    },
    {
      title: '项目测试',
      description: '对项目进行测试，确保其正常运行',
    },
    {
      title: '项目上线',
      description: '将项目上线，供用户使用',
    },
    {
      title: '项目维护',
      description: '对项目进行维护，修复可能出现的问题',
    },
    {
      title: '项目迭代',
      description: '根据用户反馈进行项目迭代，优化用户体验',
    },
  ]);

  const loading = ref(true);

  setTimeout(() => {
    loading.value = false;
  }, 1000);
</script>

<style lang="scss" scoped></style>
