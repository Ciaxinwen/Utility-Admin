<template>
  <PageWrapper title="标签页操作" defaultBgColor>
    <a-button
      class="mr-3"
      v-for="item in actionMenu"
      :key="item.value"
      type="primary"
      :disabled="currentDisabledActionItems.has(item.value)"
      @click="executeFuncs[item.value]"
    >
      {{ $t(item.label) }}
    </a-button>
  </PageWrapper>
</template>

<script lang="ts" setup>
  import { useTabNav } from '@/hook/web/useTabNav';
  import { useSystemStore } from '@/store/module/sys';
  import { storeToRefs } from 'pinia';

  const sysStore = useSystemStore();
  const { currentDisabledActionItems } = storeToRefs(sysStore);
  const { actionMenu, executeFuncs } = useTabNav();
</script>

<style lang="scss" scoped></style>
