<template>
  <div class="w-full" :style="{ height: fullHeight }">
    <iframe
      v-loading.upperStory="loading"
      class="w-full h-full"
      frameborder="0"
      :src="url"
      @load="handleLoaded"
    ></iframe>
  </div>
</template>

<script lang="ts" setup>
  import { useFullHeight } from '@/hook/setting/useFullHeight.ts';

  defineProps({
    url: { type: String, default: '' },
  });

  const { fullHeight } = useFullHeight();
  const loading = ref(true);

  const handleLoaded = () => {
    loading.value = false;
  };
</script>

<style lang="scss" scoped></style>
