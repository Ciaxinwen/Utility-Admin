<template>
  <a-tabs
    v-if="config.showTabBar"
    v-model:activeKey="currentKey"
    :class="tabBarStyleClasses[config.tabBarStyle]"
    type="editable-card"
    hideAdd
    size="small"
    :tabBarGutter="0"
    :style
    @edit="closeTab"
    @change="changeTab"
  >
    <a-tab-pane v-for="tab in tabNav" :key="tab.path" :closable="tab.closable">
      <template #tab>
        <Contextmenu
          :trigger="['contextmenu']"
          :disabledActionItems="targetDisabledActionItems"
          :target="tab.path"
          @openChange="handleOpenChange($event, tab.path)"
        >
          <div class="opacity-30 pos-absolute top-0 left-0 w-full h-full z-9"></div>
        </Contextmenu>
        <div class="flex items-center gap-2">
          <component v-if="tab.icon" :is="tab.icon" style="width: 16px" />
          <div class="text-sm">{{ tab.title }}</div>
        </div>
      </template>
    </a-tab-pane>
    <template #rightExtra>
      <div class="h-full flex items-center gap-5">
        <Contextmenu
          v-if="config.showTabBarMoreBtn"
          :disabledActionItems="currentDisabledActionItems"
          :target="route.fullPath"
        >
          <DownOutlined class="cursor-pointer hover:opacity-50 transition-all ml-3" />
        </Contextmenu>
        <a-tooltip v-if="config.showTabBarRefresh" :title="$t('common.refresh')">
          <ReloadOutlined class="cursor-pointer hover:opacity-50 transition-all" @click="reload" />
        </a-tooltip>
        <a-tooltip v-if="config.showTabBarFullScreen" :title="$t('common.fullscreen')">
          <FullscreenOutlined
            class="cursor-pointer hover:opacity-50 transition-all mr-2"
            @click="fullscreenAboutContent"
          />
        </a-tooltip>
      </div>
    </template>
  </a-tabs>
</template>

<script lang="ts" setup>
  import { useTabNav } from '@/hook/web/useTabNav';
  import { storeToRefs } from 'pinia';
  import { useConfigStore } from '@/store/module/config';
  import { theme } from 'ant-design-vue';
  import Contextmenu from './Contextmenu.vue';
  import { TabBarStyle } from '@/enum/system';

  const tabBarStyleClasses = {
    [TabBarStyle.GOOGLE]: 'google-mode',
    [TabBarStyle.CARD]: 'card-mode',
  };

  const { useToken } = theme;
  const themeToken = useToken().token;
  const style = computed(() => ({
    '--color-primary-bg': themeToken.value.colorPrimaryBg,
    '--control-item-bg-hover': themeToken.value.controlItemBgHover,
  }));

  const router = useRouter();
  const route = useRoute();

  const configStore = useConfigStore();
  const { config } = storeToRefs(configStore);
  const {
    currentKey,
    tabNav,
    currentDisabledActionItems,
    targetDisabledActionItems,
    forbiddenActionItems,
    closeTab,
    reload,
    fullscreenAboutContent,
  } = useTabNav();

  const changeTab = (key: string) => {
    router.push(key);
  };

  const handleOpenChange = (open: boolean, path: string) => {
    if (!open) return;
    forbiddenActionItems(path, targetDisabledActionItems);
  };
</script>

<style lang="scss" scoped>
  @import './style';
</style>
