<template>
  <a-list item-layout="vertical" :pagination="pagination" :data-source="listData">
    <template #renderItem="{ item }">
      <a-list-item :key="item.title">
        <template #actions>
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
        <a-list-item-meta :description="item.description">
          <template #title>
            <strong>{{ item.title }}</strong>
          </template>
          <template #avatar><a-avatar :size="50" :src="item.avatar" /></template>
        </a-list-item-meta>
        {{ item.content }}
      </a-list-item>
    </template>
  </a-list>
</template>

<script lang="ts" setup>
  import Mock from 'mockjs';

  const listData: Record<string, string | Object>[] = [];

  for (let i = 0; i < 13; i++) {
    listData.push({
      title: Mock.Random.cname(),
      avatar:
        i % 2 === 0
          ? 'https://p9-passport.byteacctimg.com/img/user-avatar/c01c52dcc59b98c1b026eb96f408329f~130x130.awebp'
          : 'https://p26-passport.byteacctimg.com/img/user-avatar/61130727b6e6bf9ed813434aeaed8ac3~130x130.awebp',
      description: `优秀创作者 ${i + 1}小时前`,
      content:
        'utility-admin 是一个基于Vue5.0、Vite、 Ant-Design-Vue、UnoCss 、TypeScript 的后台解决方案，目标是为中大型项目开发，提供现成的开箱解决方案及丰富的示例， 为您提供了一站式的后台管理解决方案，无需额外配置，开箱即用。同样是一个快速学习前沿技术的最佳实践。',
      actions: {
        like: '99',
        comment: '68',
        star: '12',
      },
    });
  }

  const pagination = {
    pageSize: 5,
  };
</script>

<style lang="scss" scoped>
  :deep(.ant-list-item-meta) {
    margin-block-end: 6px !important;
  }
  :deep(.ant-list-item-meta-title) {
    margin-block-end: 6px !important;
  }
  :deep(.ant-list-item-action) {
    margin-block-start: 6px !important;
  }
</style>
