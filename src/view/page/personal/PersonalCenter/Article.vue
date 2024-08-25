<template>
  <div class="flex gap-2">
    <a-select v-model:value="searchForm.visible" :bordered="false">
      <a-select-option value="all">全部可见</a-select-option>
      <a-select-option value="me">仅我可见</a-select-option>
      <a-select-option value="audit">审核中</a-select-option>
      <a-select-option value="error">审核不通过</a-select-option>
    </a-select>
    <a-select v-model:value="searchForm.releaseTime" :bordered="false">
      <a-select-option value="asc">发布时间升序</a-select-option>
      <a-select-option value="desc">发布时间降序</a-select-option>
    </a-select>
  </div>
  <a-divider style="margin: 6px 0" />
  <a-list item-layout="vertical" :data-source="listData">
    <template #renderItem="{ item, index }">
      <a-list-item :key="item.title">
        <template #actions>
          <span> {{ index + 1 }} 分钟前 </span>
          <span> <LikeOutlined mr-1 />{{ item.actions.like }} </span>
          <span> <MessageOutlined mr-1 />{{ item.actions.comment }} </span>
          <span> <StarOutlined mr-1 />{{ item.actions.star }} </span>
        </template>
        <template #extra>
          <img
            width="120"
            alt="logo"
            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
          />
        </template>
        <a-list-item-meta>
          <template #description>
            <div class="text-nowrap overflow-hidden text-ellipsis">{{ item.description }}</div>
          </template>
          <template #title>
            <a-tag v-show="item.state === 0" color="green" :bordered="false">已发布</a-tag>
            <a-tag v-show="item.state === 1" color="orange" :bordered="false">审核中</a-tag>
            <a-tag v-show="item.state === 2" color="red" :bordered="false">审核不通过</a-tag>
            <strong>{{ item.title }}</strong>
          </template>
        </a-list-item-meta>
      </a-list-item>
    </template>
  </a-list>
</template>

<script lang="ts" setup>
  import Mock from 'mockjs';

  const searchForm = reactive({
    visible: 'all',
    releaseTime: 'asc',
  });

  const listData: Record<string, string | Object>[] = [];

  for (let i = 0; i < 5; i++) {
    listData.push({
      title: Mock.Random.cname(),
      state: Math.floor(Math.random() * 3),
      description:
        'utility-admin 是一个基于Vue5.0、Vite、 Ant-Design-Vue、UnoCss 、TypeScript 的后台解决方案，目标是为中大型项目开发，提供现成的开箱解决方案及丰富的示例， 为您提供了一站式的后台管理解决方案，无需额外配置，开箱即用。同样是一个快速学习前沿技术的最佳实践。',
      actions: {
        like: '99',
        comment: '68',
        star: '12',
      },
    });
  }
</script>

<style lang="scss" scoped>
  :deep(.ant-list-item-meta) {
    margin-block-end: 4px !important;
  }
  :deep(.ant-list-item-meta-title) {
    margin-block-end: 4px !important;
  }
  :deep(.ant-list-item-action) {
    margin-block-start: 4px !important;
  }
</style>
