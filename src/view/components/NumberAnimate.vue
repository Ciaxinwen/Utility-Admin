<template>
  <PageWrapper title="数字动画" subTitle="封装了组件模式和指令模式" dense>
    <div class="flex gap-3">
      <a-card class="flex-1 shadow-sm" title="组件模式">
        <div class="text-6 font-bold color-emerald">
          $<NumberAnimate :count="28000000.456" separator="," />
        </div>
        <div class="text-6 font-bold color-blue mt-6">
          $<NumberAnimate :count="36000000.789" separator="-" />
        </div>
      </a-card>
      <a-card class="flex-1 shadow-sm" title="指令模式">
        <div class="text-6 font-bold color-amber">
          $<span v-num-anim:10="[2000]">30000000</span>
        </div>
        <div class="text-6 font-bold color-rose mt-6">
          $<span v-num-anim:10="[2000, '~']">30000000</span>
        </div>
      </a-card>
    </div>
  </PageWrapper>
</template>

<script lang="ts" setup>
  import { NumberAnimate } from '@/components/NumberAnimate';
</script>

<style lang="scss" scoped></style>
