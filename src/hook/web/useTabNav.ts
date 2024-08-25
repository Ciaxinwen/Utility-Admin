import { TabActionKeys } from '@/enum/system';
import { t } from '@/locales';
import { useSystemStore } from '@/store/module/sys';
import { storeToRefs } from 'pinia';
import { useFullscreen } from '@vueuse/core';
import { VNode } from 'vue';

export interface TabItem {
  title: string;
  path: string;
  closable?: boolean;
  icon?: string | (() => VNode);
}

export interface TabActionItem {
  label: string;
  icon: string;
  value: TabActionKeys;
  divided?: boolean;
  // disabled: boolean;
}

const actionMenu: Array<TabActionItem> = [
  {
    label: t('common.tabAction.current'),
    icon: 'CloseOutlined',
    value: TabActionKeys.CLOSE_CURRENT,
  },
  {
    label: t('common.tabAction.maximize'),
    icon: 'FullscreenOutlined',
    value: TabActionKeys.MAXMIZE,
  },
  {
    label: t('common.tabAction.reload'),
    icon: 'ReloadOutlined',
    value: TabActionKeys.RELOAD,
  },
  {
    label: t('common.tabAction.newOpen'),
    icon: 'ExportOutlined',
    value: TabActionKeys.NEW_WINDOW_OPENS,
  },
  {
    label: t('common.tabAction.left'),
    icon: 'VerticalRightOutlined',
    value: TabActionKeys.CLOSE_LEFT,
    divided: true,
  },
  {
    label: t('common.tabAction.right'),
    icon: 'VerticalLeftOutlined',
    value: TabActionKeys.CLOSE_RIGHT,
  },
  {
    label: t('common.tabAction.other'),
    icon: 'SwapOutlined',
    value: TabActionKeys.CLOSE_OTHER,
    divided: true,
  },
  {
    label: t('common.tabAction.all'),
    icon: 'RetweetOutlined',
    value: TabActionKeys.CLOSE_ALL,
  },
];

export const useTabNav = () => {
  const route = useRoute();
  const router = useRouter();

  const sysStore = useSystemStore();
  const { tabNav, HomeMenu, currentDisabledActionItems, contentRef, menus } = storeToRefs(sysStore);

  const currentKey = ref(route.fullPath);
  const targetDisabledActionItems = ref(new Set() as Set<TabActionKeys>);

  function closeTab(key?: string) {
    const currentKey = typeof key === 'string' ? key : route.fullPath;
    if (currentKey === HomeMenu.value?.key && tabNav.value.length === 1) {
      reload();
      return;
    }
    if (currentKey === route.fullPath) {
      const index = tabNav.value.findIndex((tab) => tab.path === currentKey) - 1;
      index >= 0 && router.push(tabNav.value[index].path);
    }
    tabNav.value = tabNav.value.filter((tab) => tab.path !== currentKey);
    !tabNav.value.length && router.push('/');
    forbiddenActionItems();
  }

  function reload() {
    router.replace({
      path: `/redirect${route.fullPath}`,
      query: route.query,
    });
  }

  function closeLeftTab(currentKey: string = route.fullPath) {
    const currentIndex = tabNav.value.findIndex((tab) => tab.path === currentKey);
    if (currentIndex === 0) return;
    tabNav.value = tabNav.value.filter(
      (tab, index) => index >= currentIndex || tab.path === HomeMenu.value?.key,
    );
    router.push(currentKey);
    forbiddenActionItems();
  }

  function closeRightTab(currentKey: string = route.fullPath) {
    const currentIndex = tabNav.value.findIndex((tab) => tab.path === currentKey);
    tabNav.value = tabNav.value.filter(
      (tab, index) => index <= currentIndex || tab.path === HomeMenu.value?.key,
    );
    router.push(currentKey);
    forbiddenActionItems();
  }

  function closeAllTab() {
    tabNav.value = [];
    router.push('/');
  }

  function closeOtherTab(currentKey: string = route.fullPath) {
    tabNav.value = tabNav.value.filter(
      (tab) => tab.path === currentKey || tab.path === HomeMenu.value?.key,
    );
    router.push(currentKey);
    forbiddenActionItems();
  }

  function forbiddenActionItems(
    key: string = route.fullPath,
    items: Set<TabActionKeys> | Ref<Set<TabActionKeys>> = currentDisabledActionItems,
  ) {
    unref(items).clear();
    const currentIndex = tabNav.value.findIndex((tab) => tab.path === key);
    if (currentIndex <= 1) {
      unref(items).add(TabActionKeys.CLOSE_LEFT);
      if (
        key !== HomeMenu.value?.key &&
        tabNav.value.length <= 2 &&
        tabNav.value.some((item) => item.path === HomeMenu.value?.key)
      ) {
        unref(items).add(TabActionKeys.CLOSE_OTHER);
      }
      if (key === HomeMenu.value?.key && tabNav.value.length === 1) {
        unref(items).add(TabActionKeys.CLOSE_OTHER);
      }
      if (key === HomeMenu.value?.key) {
        unref(items).add(TabActionKeys.CLOSE_ALL);
        unref(items).add(TabActionKeys.CLOSE_CURRENT);
      }
    }
    if (currentIndex === tabNav.value.length - 1) {
      unref(items).add(TabActionKeys.CLOSE_RIGHT);
    }
  }

  function fullscreenAboutContent() {
    const { toggle } = useFullscreen(contentRef);
    toggle();
  }

  function openNewPage(currentKey: string = route.fullPath) {
    const newPage = router.resolve(currentKey);
    window.open(newPage.href, '_blank');
  }

  const executeFuncs: Record<TabActionKeys, Function> = {
    [TabActionKeys.RELOAD]: reload,
    [TabActionKeys.CLOSE_ALL]: closeAllTab,
    [TabActionKeys.CLOSE_CURRENT]: closeTab,
    [TabActionKeys.CLOSE_LEFT]: closeLeftTab,
    [TabActionKeys.CLOSE_RIGHT]: closeRightTab,
    [TabActionKeys.CLOSE_OTHER]: closeOtherTab,
    [TabActionKeys.MAXMIZE]: fullscreenAboutContent,
    [TabActionKeys.NEW_WINDOW_OPENS]: openNewPage,
  };

  watch(
    () => [route.fullPath, menus.value],
    () => {
      currentKey.value = route.fullPath;
      forbiddenActionItems();
    },
  );

  return {
    tabNav,
    currentDisabledActionItems,
    targetDisabledActionItems,
    actionMenu,
    currentKey,
    closeTab,
    reload,
    closeLeftTab,
    closeRightTab,
    closeAllTab,
    closeOtherTab,
    forbiddenActionItems,
    fullscreenAboutContent,
    executeFuncs,
  };
};
