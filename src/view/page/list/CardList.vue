<template>
  <PageWrapper title="卡片列表" dense contentFullHeight contentClass="pos-relative">
    <a-list :grid="{ gutter: 0, xs: 1, sm: 2, md: 4, lg: 4, xl: 4, xxl: 6 }" :data-source="data">
      <template #renderItem="{ item }">
        <a-list-item>
          <a-card>
            <template #title>
              <div class="flex items-center gap-2">
                <a-avatar :src="item.avatar" />
                <div>{{ item.title }}</div>
              </div>
            </template>
            <template #extra><a-button type="link">详情</a-button></template>
            <div class="i-ri:bug-line inline-block text-18px"></div>
            {{ item.desc }}
          </a-card>
        </a-list-item>
      </template>
    </a-list>
  </PageWrapper>
</template>

<script lang="ts" setup>
  interface DataItem {
    title: string;
    avatar: string;
    desc: string;
  }
  const avtarItems = [
    'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  ];

  const data = ref<DataItem[]>([]);
  for (let index = 0; index < 20; index++) {
    data.value.push({
      title: `攻城狮 ${index + 1}`,
      avatar: avtarItems[index % 2],
      desc: '每个星期，攻城狮们都努力地在写Bug，不会写Bug的攻城狮，不是好攻城狮',
    });
  }
</script>

<style lang="scss" scoped>
  :deep(.ant-row) {
    margin-right: unset !important;
    margin-left: unset !important;
  }
</style>
