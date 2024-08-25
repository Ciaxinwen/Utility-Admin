<template>
  <div class="flex flex-col">
    <div class="text-4 font-bold mb-3">{{ $t('common.config.navMode.desc') }}</div>
    <div class="flex items-center gap-4.5">
      <a-tooltip placement="bottom">
        <template #title>{{ $t('common.config.navMode.left') }}</template>
        <LeftModeItem />
      </a-tooltip>

      <a-tooltip placement="bottom">
        <template #title>{{ $t('common.config.navMode.top') }}</template>
        <TopModeItem />
      </a-tooltip>

      <a-tooltip placement="bottom">
        <template #title>{{ $t('common.config.navMode.mix') }}</template>
        <MixModeItem />
      </a-tooltip>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { LeftModeItem, TopModeItem, MixModeItem } from './NavModeItem';
</script>

<style lang="scss" scoped></style>
