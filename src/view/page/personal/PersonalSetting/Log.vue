<template>
  <Table :columns="columns" :data-source="data" bordered title="登录日志" rowKey="id" />
</template>

<script lang="ts" setup>
  import { Table } from '@/components/Table';
  import dayjs from 'dayjs';

  const columns = [
    {
      title: '执行操作',
      dataIndex: 'action',
    },
    {
      title: 'IP地址',
      dataIndex: 'IP',
    },
    {
      title: '地点',
      dataIndex: 'area',
    },
    {
      title: '系统',
      dataIndex: 'OS',
    },
    {
      title: '时间',
      dataIndex: 'time',
    },
  ];
  const data = [
    {
      action: '登录',
      IP: '192.168.1.1',
      area: '中国北京',
      OS: 'Linux',
      time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      action: '修改密码',
      IP: '192.168.1.3',
      area: '中国广东',
      OS: 'Mac',
      time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      action: '修改个人信息',
      IP: '192.168.1.6',
      area: '中国上海',
      OS: 'Windows',
      time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    },
  ];
</script>

<style lang="scss" scoped></style>
