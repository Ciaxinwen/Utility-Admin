<template>
  <div
    class="w-full flex justify-between items-center mr-5 ml-2.5"
    :class="[config.layoutMode === Layout.TOP && 'w-vw']"
  >
    <div v-if="config.layoutMode !== Layout.TOP" class="flex items-center gap-4 ml-2 text-16px">
      <template v-if="config.layoutMode === Layout.LEFT && config.showSidebarSwitch">
        <MenuUnfoldOutlined
          v-if="config.isSiderCollapsed"
          class="hover:opacity-50 transition-all"
          @click="changeSiderCollapsed"
        />
        <MenuFoldOutlined
          v-else
          class="hover:opacity-50 transition-all"
          @click="changeSiderCollapsed"
        />
      </template>
      <Breadcrumb />
    </div>

    <div v-if="config.layoutMode === Layout.TOP" class="flex items-center">
      <Logo showTitle />
      <Sider class="w-52vw" mode="horizontal" />
    </div>
    <Operation />
  </div>
</template>

<script lang="ts" setup>
  import { storeToRefs } from 'pinia';
  import { useConfigStore } from '@/store/module/config';
  import { useSystemStore } from '@/store/module/sys';
  import Sider from '../menu/index.vue';
  import Breadcrumb from '../breadcrumb/index.vue';
  import { Layout } from '@/enum/system';
  import Logo from '../logo/index.vue';
  import Operation from './Operation.vue';

  const configStore = useConfigStore();
  const { config } = storeToRefs(configStore);
  const sysStore = useSystemStore();

  const changeSiderCollapsed = async () => {
    config.value.isSiderCollapsed = !config.value.isSiderCollapsed;
    await nextTick();
    sysStore.getMenuOpenKeys();
  };
</script>

<style lang="scss" scoped></style>
