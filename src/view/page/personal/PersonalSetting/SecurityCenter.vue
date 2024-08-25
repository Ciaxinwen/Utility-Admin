<template>
  <a-list item-layout="horizontal" :data-source="data">
    <template #renderItem="{ item }">
      <a-list-item>
        <a-list-item-meta>
          <template #title>
            <strong>{{ item.title }}</strong>
          </template>
          <template #description>
            <component :is="item?.icon" />
            {{ item.desc }}
          </template>
        </a-list-item-meta>
        <template #actions>
          <a-button type="link">修改</a-button>
        </template>
      </a-list-item>
    </template>
  </a-list>
</template>

<script lang="ts" setup>
  import {
    WechatOutlined,
    PhoneOutlined,
    LockOutlined,
    InsuranceOutlined,
    HighlightOutlined,
  } from '@ant-design/icons-vue';

  const data = ref([
    {
      title: '账号密码',
      desc: '当前密码强度：强',
      icon: h(LockOutlined),
    },
    {
      title: '关联手机',
      desc: '已绑定手机：159****5226',
      icon: h(PhoneOutlined),
    },
    {
      title: '关联微信',
      desc: '已绑定微信：Utility',
      icon: h(WechatOutlined, { class: 'text-#1cd66c' }),
    },
    {
      title: '密保问题',
      desc: '未设置密保问题，密保问题可提升账号安全指数',
      icon: h(InsuranceOutlined),
    },
    {
      title: '备用邮箱',
      desc: '已绑定邮箱：159****5226@qq.com',
      icon: h(HighlightOutlined),
    },
  ]);
</script>

<style lang="scss" scoped></style>
