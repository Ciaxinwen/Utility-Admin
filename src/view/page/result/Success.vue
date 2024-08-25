<template>
  <PageWrapper defaultBgColor>
    <a-result
      status="success"
      title="提交成功"
      sub-title="提交结果页用于反馈一系列操作任务的处理结果， 如果仅是简单操作，使用 Message 全局提示反馈即可。 
      本文字区域可以展示简单的补充说明，如果有类似展示 “单据”的需求，下面这个灰色区域可以呈现比较复杂的内容。"
    >
      <template #extra>
        <a-button type="primary">返回列表</a-button>
        <a-button>查看项目</a-button>
        <a-button>打印</a-button>
      </template>
      <a-descriptions title="项目名称">
        <a-descriptions-item label="项目ID">10086</a-descriptions-item>
        <a-descriptions-item label="负责人">Utility</a-descriptions-item>
        <a-descriptions-item label="生效时间">
          {{ dayjs().format('YYYY-MM-DD HH:mm:ss') }}
        </a-descriptions-item>
      </a-descriptions>
      <a-steps
        progress-dot
        :current="2"
        :items="[
          {
            title: '创建项目',
            subTitle: 'Utility',
            description: '2024-08-08 11:11:11',
          },
          {
            title: '部门初审',
            description: '2024-08-09 11:12:12',
          },
          {
            title: '项目部署',
            description: '2024-08-10 11:12:12',
          },
          {
            title: '项目上线',
            description: '2024-08-11 12:12:12',
          },
        ]"
      ></a-steps>
    </a-result>
  </PageWrapper>
</template>

<script lang="ts" setup>
  import dayjs from 'dayjs';
</script>

<style lang="scss" scoped></style>
