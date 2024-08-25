<template>
  <a-layout-content id="SYS_MAIN" ref="contentRef" class="bg-#f5f5f5 dark:bg-#000">
    <RouterView v-slot="{ Component, route }">
      <Transition :name="config.enablePageAnimation ? config.pageAnimationType : ''" mode="out-in">
        <KeepAlive :include="config.isCacheTabBar ? [...cacheTabNav] : []">
          <Component :is="Component" :key="route.path" />
        </KeepAlive>
      </Transition>
    </RouterView>
    <a-back-top :target="backTopHTML" class="right-10 bottom-10" />
  </a-layout-content>
</template>

<script lang="ts" setup>
  import { useScrollOffset } from '@/hook/setting/useScrollOffset';
  import { useConfigStore } from '@/store/module/config';
  import { useSystemStore } from '@/store/module/sys';
  import { storeToRefs } from 'pinia';

  const route = useRoute();
  const sysStore = useSystemStore();
  const configStore = useConfigStore();
  const { cacheTabNav, contentRef } = storeToRefs(sysStore);
  const { config } = storeToRefs(configStore);

  let setScrollTo: {
    (left: number, top: number): void;
    (options: ScrollToOptions): void;
  };
  nextTick(() => {
    const { setScrollTo: setScrollToFn } = useScrollOffset(document.getElementById('SYS_MAIN'));
    setScrollTo = setScrollToFn;
  });
  watch(
    () => route.fullPath,
    async () => {
      setScrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    },
  );

  const backTopHTML = () => {
    return document.getElementById('SYS_MAIN');
  };
</script>

<style lang="scss" scoped>
  .ant-layout-content {
    overflow-x: hidden;
    overflow-y: auto;
    padding: var(--layout-content-padding);
  }
</style>
