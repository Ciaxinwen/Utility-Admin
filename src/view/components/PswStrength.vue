<template>
  <PageWrapper title="密码强度校验组件" dense>
    <h4 class="mb-2">基础用法：</h4>
    <StrengthMether v-model="value1" placeholder="请输入密码" class="w-300px" />
    <h4 class="mb-2">隐藏输入框：</h4>
    <StrengthMether placeholder="请输入密码" :showInput="false" score="vue3!@#hh" class="w-300px" />
  </PageWrapper>
</template>

<script lang="ts" setup>
  import { StrengthMether } from '@/components/StrengthMether';

  const value1 = ref('utility');
</script>

<style lang="scss" scoped></style>
