<template>
  <a-list item-layout="horizontal" :data-source="data">
    <template #renderItem="{ item }">
      <a-list-item>
        <a-list-item-meta :description="item.desc">
          <template #title>
            <strong>{{ item.title }}</strong>
          </template>
        </a-list-item-meta>
        <template #actions>
          <a-switch v-model:checked="item.state" />
        </template>
      </a-list-item>
    </template>
  </a-list>
</template>

<script lang="ts" setup>
  const data = ref([
    {
      title: '账号密码',
      desc: '其他用户的消息将以站内信的形式通知',
      state: true,
    },
    {
      title: '系统消息',
      desc: '系统消息将以站内信的形式通知',
      state: true,
    },
    {
      title: '待办任务',
      desc: '待办任务将以站内信的形式通知',
      state: true,
    },
  ]);
</script>

<style lang="scss" scoped></style>
