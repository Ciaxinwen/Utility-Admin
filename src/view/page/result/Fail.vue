<template>
  <PageWrapper defaultBgColor>
    <a-result status="error" title="提交失败" sub-title="请核对并修改以下信息后，再重新提交。">
      <template #extra>
        <a-button type="primary">返回修改</a-button>
      </template>

      <h3 class="font-bold">您提交的内容有如下错误：</h3>
      <div class="flex flex-col gap-2 text-16px">
        <div><CloseCircleOutlined color-red />&nbsp;&nbsp;您的手机号码格式不正确 </div>
        <div><CloseCircleOutlined color-red />&nbsp;&nbsp;您的邮箱地址不正确</div>
      </div>
    </a-result>
  </PageWrapper>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped></style>
