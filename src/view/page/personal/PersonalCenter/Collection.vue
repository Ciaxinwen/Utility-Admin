<template>
  <div class="flex justify-between items-center">
    <OptionalButtonGroup v-model:value="activeKey" :options />
    <a-button type="primary" ghost>
      <template #icon>
        <PlusOutlined />
      </template>
      新建收藏集
    </a-button>
  </div>
  <a-list item-layout="vertical" :data-source="listData">
    <template #renderItem="{ item }">
      <a-list-item :key="item.title">
        <a-list-item-meta>
          <template #description>
            <div class="flex justify-between items-center">
              <div>{{ item.description }}</div>
              <div>
                <a-button type="link">
                  <template #icon>
                    <EditOutlined />
                  </template>
                  编辑
                </a-button>
                <a-divider type="vertical" />
                <a-button type="link" danger>
                  <template #icon>
                    <DeleteOutlined />
                  </template>
                  删除
                </a-button>
              </div>
            </div>
          </template>
          <template #title>
            <div class="flex items-center gap-1.5">
              <span>{{ item.title }}</span>
              <template v-if="item.isDefault">
                <div class="i-ri:lock-fill color-#aaa"></div>
                <a-tag color="blue" :bordered="false">默认</a-tag>
              </template>
            </div>
          </template>
        </a-list-item-meta>
      </a-list-item>
    </template>
  </a-list>
</template>

<script lang="ts" setup>
  import dayjs from 'dayjs';
  import { OptionalButtonGroup, OptionsItem } from '@/components/OptionalButton';

  const activeKey = ref('a');
  const options: OptionsItem[] = [
    {
      label: '我创建的(2)',
      value: 'a',
    },
    {
      label: '我订阅的(0)',
      value: 'b',
    },
  ];

  const listData: Record<string, string | Object>[] = [
    {
      title: '我的收藏',
      isDefault: true,
      description: dayjs().format('YYYY-MM-DD') + ' 更新 · 16篇文章 · 0订阅',
    },
    {
      title: 'Vue3从入门到精通',
      isDefault: false,
      description: dayjs().format('YYYY-MM-DD') + ' 更新 · 36篇文章 · 0订阅',
    },
  ];
</script>

<style lang="scss" scoped>
  :deep(.ant-list-item-meta-title) {
    margin-block-end: 4px !important;
  }
  :deep(.ant-list-item-meta) {
    margin-block-end: 0 !important;
  }
</style>
