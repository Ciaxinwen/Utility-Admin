<template>
  <div
    v-if="config.showLogo"
    class="h-[var(--layout-header-height)] flex items-center cursor-pointer ml-4"
    @click="handleClickLogo"
  >
    <SvgIcon name="logo" :size="32" />
    <span
      v-if="titleVisible"
      class="text-lg ml-2.5 font-semibold whitespace-nowrap"
      :style="{ color: config.themeColor }"
    >
      {{ title }}
    </span>
  </div>
</template>

<script lang="ts" setup>
  import { useConfigStore } from '@/store/module/config';
  import { storeToRefs } from 'pinia';
  import { Layout } from '@/enum/system';
  import { useSystemStore } from '@/store/module/sys';

  const props = defineProps({ showTitle: { type: Boolean, default: false } });

  const router = useRouter();
  const configStore = useConfigStore();
  const sysStore = useSystemStore();
  const { config } = storeToRefs(configStore);
  const { menuState } = storeToRefs(sysStore);

  const title = import.meta.env.VITE_SYSTEM_NAME;

  const titleVisible = computed(() => {
    if (!props.showTitle) return props.showTitle;
    if (config.value.layoutMode === Layout.LEFT) return !config.value.isSiderCollapsed;
    return true;
  });

  const handleClickLogo = () => {
    router.push('/');
    menuState.value.openKeys = [];
  };
</script>

<style lang="scss" scoped></style>
