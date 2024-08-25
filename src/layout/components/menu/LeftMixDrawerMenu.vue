<template>
  <div
    class="mix-menu-drawer h-full bg-[var(--common-bg-color)] z-10 transition-width"
    :class="[
      !config.isMixMenuFixed && 'pos-absolute top-0 ',
      config.isSiderCollapsed ? 'left-56px' : 'left-80px',
      visible || config.isMixMenuFixed ? 'w-230px' : 'w-0',
      !config.lightSidebar && 'bg-#001529',
    ]"
    @mouseleave="handleMouseLeave"
  >
    <div
      v-show="visible || config.isMixMenuFixed"
      class="mix-menu-drawer-header h-[var(--layout-header-height)] line-height-56px font-bold whitespace-nowrap flex items-center justify-between pr-4"
    >
      <span
        class="text-lg ml-2.5 font-semibold whitespace-nowrap"
        :style="{ color: config.themeColor }"
      >
        <template v-if="config.showLogo">
          {{ title }}
        </template>
      </span>
      <span
        class="text-4 cursor-pointer"
        :class="[!config.lightSidebar && 'color-#fff']"
        @click="config.isMixMenuFixed = !config.isMixMenuFixed"
      >
        <PushpinFilled v-if="config.isMixMenuFixed" />
        <PushpinOutlined v-else />
      </span>
    </div>
    <a-menu
      v-show="visible || config.isMixMenuFixed"
      v-model:selectedKeys="menuState.selectedKeys"
      :open-keys="menuState.openKeys"
      mode="inline"
      :items="mixMenus"
      style="border: unset"
      :theme="config.lightSidebar ? 'light' : 'dark'"
      @click="handleClickItem"
    />
  </div>
</template>

<script lang="ts" setup>
  import { useConfigStore } from '@/store/module/config';
  import { useSystemStore } from '@/store/module/sys';
  import { storeToRefs } from 'pinia';

  defineProps({
    visible: { type: Boolean, default: false },
  });

  const showMixDrawerMenu = defineModel('showMixDrawerMenu', { type: Boolean, default: false });

  const title = import.meta.env.VITE_SYSTEM_NAME;
  const router = useRouter();
  const route = useRoute();
  const configStore = useConfigStore();
  const { config } = storeToRefs(configStore);
  const sysStore = useSystemStore();
  const { mixMenus, menuState } = storeToRefs(sysStore);

  const handleMouseLeave = () => {
    showMixDrawerMenu.value = false;
  };

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

  watch(mixMenus, () => {
    if (!mixMenus.value.length) {
      config.value.isMixMenuFixed = false;
    }
  });
</script>

<style lang="scss" scoped>
  html.dark {
    .mix-menu-drawer {
      box-shadow: 1px 0 2px #0c0c0c;
    }
  }

  .mix-menu-drawer {
    box-shadow: 2px 0 3px #eeeeee;

    &-header {
      border-bottom: 2px solid #f7f7f7;
    }
  }

  .ant-menu {
    border: unset;

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

      &:hover {
        .ant-menu-item-icon {
          transform: scale(1.1);
          transition: all 0.3s;
        }
      }
    }
  }
</style>
