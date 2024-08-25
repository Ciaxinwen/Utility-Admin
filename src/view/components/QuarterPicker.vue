<template>
  <PageWrapper title="季度选择器" dense>
    <QuarterPicker style="width: 350px" v-model="value" type="quarter" placeholder="请选择时间" />
  </PageWrapper>
</template>

<script lang="ts" setup>
  import { QuarterPicker } from '@/components/QuarterPicker';

  const value = ref();
</script>

<style lang="scss" scoped></style>
