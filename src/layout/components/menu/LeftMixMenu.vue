<template>
  <div class="mix-menu h-[calc(100%-var(--layout-header-height))] p-1 overflow-y-auto">
    <div
      v-for="item in menus"
      :key="item.key"
      w-full
      rounded-2
      flex
      flex-col
      items-center
      justify-center
      gap-2
      cursor-pointer
      transition-all
      mb-2
      class="mix-menu-item"
      :class="{
        'bg-#f0f6ff color-[var(--theme-color)]': isActive === item.key && config.lightSidebar,
        'hover:bg-#ebebeb ':
          isActive !== item.key && config.lightSidebar && getThemeMode === Theme.LIGHT,
        'bg-[var(--theme-color)] color-#fff': isActive === item.key && !config.lightSidebar,
        'hover:color-#fff color-#ffffffa6':
          isActive !== item.key && (!config.lightSidebar || getThemeMode === Theme.DARK),
        'active-item': isActive === item.key && getThemeMode === Theme.DARK,
        'h-68px': !config.isSiderCollapsed,
        'h-40px': config.isSiderCollapsed,
        'cursor-not-allowed opacity-25': item.disabled,
      }"
      @click="handleClickItem(item)"
    >
      <component :is="item.icon" />
      <span v-if="!config.isSiderCollapsed" whitespace-nowrap>{{ item.label }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { MenuItem, useSystemStore } from '@/store/module/sys';
  import { storeToRefs } from 'pinia';
  import { useConfigStore } from '@/store/module/config';
  import { theme } from 'ant-design-vue';
  import { Theme } from '@/enum/system';

  const route = useRoute();
  const router = useRouter();

  const showMixDrawerMenu = defineModel('showMixDrawerMenu', { type: Boolean, default: false });

  const { useToken } = theme;
  const themeToken = useToken().token;
  const sysStore = useSystemStore();
  const configStore = useConfigStore();
  const { menus, mixMenus } = storeToRefs(sysStore);
  const { config, getThemeMode } = storeToRefs(configStore);

  const isActive = ref('');

  watch(
    () => route.fullPath,
    () => {
      const isFirstLevel = menus.value.some((item) => item.key === route.fullPath);
      if (isFirstLevel) {
        isActive.value = route.fullPath;
      }
      isActive.value = route.matched[1].path;
    },
    {
      immediate: true,
    },
  );

  const handleClickItem = (item: MenuItem) => {
    if (item.disabled) return;
    isActive.value = item.key;
    !item.children?.length && router.push(item.key);
    mixMenus.value = item.children?.length ? item.children : [];
    showMixDrawerMenu.value = Boolean(item.children?.length);
  };
</script>

<style lang="scss" scoped>
  .active-item {
    background-color: v-bind('themeToken.colorPrimaryBg');
  }

  .mix-menu {
    --scrollbar-color: v-bind('config.lightSidebar?"#e4e4e7":"#383737"');

    &-item {
      &:hover {
        .svg-icon {
          transform: scale(1.1);
          transition: all 0.3s;
        }
      }
    }
  }
</style>
