<template>
  <PageWrapper title="全屏功能" defaultBgColor>
    <a-button class="mr-3" type="primary" @click="toggle">
      <SwapOutlined />
      系统全屏
    </a-button>
    <a-button type="primary" @click="toggleAboutContent">
      <SwapOutlined />
      内容区全屏
    </a-button>

    <a-card class="mt-3 h-md shadow-sm" ref="assignCardRef">
      <a-button type="primary" @click="toggleAboutAssign">
        <SwapOutlined />
        指定区域全屏
      </a-button>
      <h2>
        {{ sysTitle }}
      </h2>
    </a-card>
  </PageWrapper>
</template>

<script lang="ts" setup>
  import { useFullscreen } from '@vueuse/core';
  import { storeToRefs } from 'pinia';
  import { useSystemStore } from '@/store/module/sys';

  const sysTitle = import.meta.env.VITE_SYSTEM_NAME;

  const sysStore = useSystemStore();
  const { contentRef } = storeToRefs(sysStore);

  const assignCardRef = ref();

  const { toggle } = useFullscreen();
  const { toggle: toggleAboutAssign } = useFullscreen(assignCardRef);
  const { toggle: toggleAboutContent } = useFullscreen(contentRef);
</script>

<style lang="scss" scoped></style>
