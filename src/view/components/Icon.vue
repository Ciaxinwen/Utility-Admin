<template>
  <PageWrapper
    title="Icon组件示例"
    subTitle="SvgIcon组件、IconPicker组件，以及unocss预设图标"
    dense
  >
    <div class="flex gap-4 w-full justify-between">
      <a-card class="flex-1 shadow-sm" title="SvgIcon组件">
        <SvgIcon name="logo" :size="24" />
      </a-card>
      <a-card class="flex-1 shadow-sm" title="unocss预设图标">
        <div class="i-ri:notification-2-line text-24px inline-block mr-4"></div>
        <div class="i-ri:moon-clear-fill color-amber text-24px inline-block mr-4"></div>
        <div class="i-ri:translate-2 text-24px inline-block mr-4"></div>
        <div class="i-ri:user-3-line text-24px inline-block"></div>
      </a-card>
      <a-card class="flex-1 shadow-sm" title="IconPicker组件">
        <IconPicker v-model="value" />
      </a-card>
    </div>
  </PageWrapper>
</template>

<script lang="ts" setup>
  import { IconPicker } from '@/components/Icon';

  const value = ref('');
</script>

<style lang="scss" scoped></style>
