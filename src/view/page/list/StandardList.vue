<template>
  <PageWrapper
    title="标准列表"
    defaultBgColor
    contentFullHeight
    contentClass="pos-relative overflow-hidden"
  >
    <a-list class="h-full overflow-auto pb-12" item-layout="horizontal" :data-source="data">
      <template #renderItem="{ item }">
        <a-list-item>
          <a-list-item-meta :description="item.desc">
            <template #title>
              <strong>{{ item.title }}</strong>
            </template>
            <template #avatar>
              <a-avatar :src="item.avatar" />
            </template>
          </a-list-item-meta>
          <template #actions>
            <a-button type="link">详情</a-button>
            <a-button type="link" danger>删除</a-button>
          </template>
        </a-list-item>
      </template>
    </a-list>
    <a-pagination
      class="w-full pos-absolute bottom-5 right-5 pt-3 text-align-end bg-[var(--common-bg-color)]"
      v-model:current="current"
      :total="10"
      show-less-items
    />
  </PageWrapper>
</template>

<script lang="ts" setup>
  interface DataItem {
    title: string;
    avatar: string;
    desc: string;
  }

  const current = ref(1);

  const avtarItems = [
    'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  ];

  const data = ref<DataItem[]>([]);
  for (let index = 0; index < 10; index++) {
    data.value.push({
      title: `攻城狮 ${index + 1}`,
      avatar: avtarItems[index % 2],
      desc: '每个星期，攻城狮们都努力地在写Bug，不会写Bug的攻城狮，不是好攻城狮',
    });
  }
</script>

<style lang="scss" scoped></style>
