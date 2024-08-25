<template>
  <div class="w-full h-full flex flex-col items-center text-center">
    <img class="w-sm" src="@/assets/img/expect.png" alt="" />
    <div class="text-2xl mt-3 font-bold" :style="{ color: config.themeColor }">
      {{ $t('common.expect') }}~~~
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { storeToRefs } from 'pinia';
  import { useConfigStore } from '@/store/module/config';

  const configStore = useConfigStore();
  const { config } = storeToRefs(configStore);
</script>

<style lang="scss" scoped></style>
