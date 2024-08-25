<template>
  <PageWrapper title="一键复制功能" dense>
    <div class="flex gap-2">
      <a-input class="w-300px" v-model:value="text" placeholder="请输入内容" allowClear />
      <a-button type="primary" @click="handleCopy"> 一键复制 </a-button>
    </div>
  </PageWrapper>
</template>

<script lang="ts" setup>
  import copyText from '@/utils/copyText';
  import { message } from 'ant-design-vue';

  const text = ref('');
  const handleCopy = () => {
    if (!unref(text)) {
      return message.warning('请输入内容');
    }
    copyText(unref(text));
  };
</script>

<style lang="scss" scoped></style>
