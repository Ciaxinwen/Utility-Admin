<template>
  <a-menu
    v-model:selectedKeys="menuState.selectedKeys"
    v-model:openKeys="menuState.openKeys"
    :mode
    :inlineIndent="14"
    :theme="config.lightSidebar ? 'light' : 'dark'"
    :items="menus"
    :class="[
      `mode-${mode}`,
      mode === 'horizontal' && 'ml-10 h-[var(--layout-header-height)]',
      config.layoutMode === Layout.LEFT &&
        'h-[calc(100%-var(--layout-header-height))] overflow-y-auto',
    ]"
    :style="{
      border: 'unset',
      '--scrollbar-color':
        getThemeMode === Theme.LIGHT && config.lightSidebar ? '#e4e4e7' : '#383737',
    }"
    @click="handleClickItem"
    @openChange="handleOpenChange"
  />
</template>

<script lang="ts" setup>
  import { useSystemStore } from '@/store/module/sys';
  import { storeToRefs } from 'pinia';
  import { useConfigStore } from '@/store/module/config';
  import { Layout, Theme } from '@/enum/system';

  defineProps({
    mode: {
      type: String as PropType<'vertical' | 'horizontal' | 'inline'>,
      default: 'inline',
    },
  });

  const router = useRouter();
  const route = useRoute();

  const sysStore = useSystemStore();
  const configStore = useConfigStore();
  const { menus, menuState } = storeToRefs(sysStore);
  const { config, getThemeMode } = storeToRefs(configStore);

  const handleClickItem = (scope: { key: string; item: any }) => {
    if (scope.item.isLink) {
      if (scope.item.href) {
        window.open(scope.item.href, '_blank');
        nextTick(() => {
          menuState.value.selectedKeys = [route.fullPath];
        });
        return;
      }
      const newPage = router.resolve(scope.key);
      window.open(newPage.href, '_blank');
      return;
    }
    router.push(scope.key);
  };

  const handleOpenChange = (openKeys: (string | number)[]) => {
    if (config.value.layoutMode !== Layout.LEFT) return;
    if (config.value.isAccordionMode) {
      menuState.value.openKeys = sysStore
        .findFullMenu(menus.value, openKeys[openKeys.length - 1] as string)
        .map((item) => item.key);
    }
  };
</script>

<style lang="scss">
  .ant-menu-submenu-popup {
    z-index: 999;

    .ant-menu-vertical {
      .ant-menu-item,
      .ant-menu-submenu-title {
        display: flex;
        align-items: center;

        &:hover {
          .ant-menu-item-icon {
            transform: scale(1.1);
            transition: all 0.3s;
          }
        }
      }
    }
  }
</style>
<style lang="scss" scoped>
  .mode-inline {
    &.ant-menu-inline-collapsed {
      :deep(.ant-menu-item),
      :deep(.ant-menu-submenu-title) {
        padding-inline: calc(50% - 14px);
      }
    }

    :deep(.ant-menu-item),
    :deep(.ant-menu-submenu > .ant-menu-submenu-title) {
      line-height: 46px !important;
      height: 42px !important;
    }
  }

  .mode-horizontal {
    :deep(.ant-menu-item),
    :deep(.ant-menu-submenu-title) {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      // padding: 0 16px;
    }
  }

  :deep(.ant-menu-item),
  :deep(.ant-menu-submenu-title) {
    &:hover {
      .ant-menu-item-icon {
        transform: scale(1.1);
        transition: all 0.3s;
      }
    }
  }
</style>
