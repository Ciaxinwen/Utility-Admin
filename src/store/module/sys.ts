import { defineStore, storeToRefs } from 'pinia';
import { transformI18n } from '@/locales';
import SvgIcon from '@/components/Icon/src/SvgIcon.vue';
import * as AntIcons from '@ant-design/icons-vue';
import { TabItem } from '@/hook/web/useTabNav';
import { isEqual } from 'lodash';
import { Layout, TabActionKeys } from '@/enum/system';
import { getSystemMenus } from '@/api/common';
import { VNode } from 'vue';
import { useConfigStoreHook } from './config';
import { orderBy } from 'lodash';
import { store } from '..';
import { useLocalStorage } from '@vueuse/core';
import { StorgeKeys } from '@/enum/storgeKeys';

export interface MenuItem {
  key: string;
  label: string;
  title: string;
  disabled?: boolean;
  icon?: string | (() => VNode);
  isHomePage?: boolean;
  children?: MenuItem[];
  order: number;
  isLink: boolean;
  href?: string;
  isShow?: boolean;
  keepAlive: boolean;
}

export const useSystemStore = defineStore('system', () => {
  const route = useRoute();
  const storageAboutMenus = useLocalStorage<SystemMenuItem[]>(StorgeKeys.MENU_DATA, []);
  const configStore = useConfigStoreHook();
  const { config } = storeToRefs(configStore);

  // =====================菜单=============================
  const menus = ref<MenuItem[]>([]);
  const menuState = ref({
    openKeys: [] as string[],
    selectedKeys: [] as string[],
  });
  const mixMenus = ref<MenuItem[]>([]);
  const menuLoading = ref(false);
  const HomeMenu = ref<MenuItem>();
  const fullMenus = ref<Record<string, any>[]>([]);

  /**
   * @description: 生成菜单数据
   * @param {SystemMenuItem} list
   * @return {*}
   */
  const generateMenus = (list: SystemMenuItem[]): MenuItem[] => {
    return list
      .filter((item) => item.isShow)
      .map((item) => {
        const menu: MenuItem = {
          key: item.path,
          label: transformI18n(item.title),
          title: transformI18n(item.title),
          disabled: !Boolean(item.status),
          isLink: Boolean(item.isLink),
          href: item.href,
          icon:
            typeof item.icon === 'string' && item.icon?.includes('svg')
              ? () => h(SvgIcon, { name: item.icon?.replace('svg:', '') as string, size: 20 })
              : item.icon?.includes('ant')
                ? () => h(AntIcons['PicCenterOutlined'], { style: 'font-size:18px' })
                : '',
          isHomePage: Boolean(item.isHomePage),
          order: item.order,
          isShow: Boolean(item.isShow),
          keepAlive: Boolean(item.keepAlive),
        };
        if (item.children?.length) {
          const hasShow = item.children?.some((item) => item.isShow);
          if (hasShow) {
            menu.children = generateMenus(item.children);
          }
        }
        return menu;
      });
  };

  /**
   * @description: 菜单排序
   * @param {MenuItem} items
   * @return {*}
   */
  const orderMenus = (items: MenuItem[]) => {
    const result = orderBy(items, ['order'], ['asc']);
    result.forEach((item) => {
      if (item.children?.length) {
        item.children = orderMenus(item.children);
      }
    });
    return result;
  };

  /**
   * @description: 获取菜单数据
   * @return {*}
   */
  const getMenus = async () => {
    menuLoading.value = true;
    resetNav();
    const res = await getSystemMenus();
    menus.value = orderMenus(generateMenus(res.data));
    storageAboutMenus.value = res.data;
    HomeMenu.value = getHomePageItem(menus.value) || menus.value[0];
    !tabNav.value.some((tab) => tab.path === HomeMenu.value?.key) &&
      tabNav.value.unshift({
        title: HomeMenu.value.title,
        path: HomeMenu.value.key,
        icon: HomeMenu.value.icon,
        closable: !HomeMenu.value.isHomePage,
      });
    menuLoading.value = false;
  };

  /**
   * @description: 获取由祖先菜单和当前菜单组成的完整菜单
   * @return {*}
   */
  const findFullMenu = (list: MenuItem[], path: string, result: MenuItem[] = []): MenuItem[] => {
    const dataItem = list.find((item) => {
      return new RegExp('^' + item.key, 'i').test(path) || item.key === path;
    });
    if (dataItem) {
      result.push(dataItem);
      if (dataItem.children && dataItem.children.length > 0) {
        return findFullMenu(dataItem.children, path, result);
      }
    }
    return result;
  };

  /**
   * @description: 获取首页菜单
   * @param {MenuItem} list
   * @return {*}
   */
  const getHomePageItem = (list: MenuItem[]): MenuItem | null => {
    for (const item of list) {
      if (item.isHomePage) {
        return item;
      }
      if (item.children && item.children.length > 0) {
        return getHomePageItem(item.children);
      }
    }
    return null;
  };

  /**
   * @description: 获取菜单展开的key
   * @return {*}
   */
  const getMenuOpenKeys = () => {
    if (
      config.value.isSiderCollapsed ||
      config.value.layoutMode === Layout.TOP ||
      config.value.isAccordionMode
    ) {
      menuState.value.openKeys = [];
    }
    if (route.matched.length > 1) {
      route.matched.forEach((item, index) => {
        if (!index || route.matched.length - 1 === index) return;
        const isHas = menuState.value.openKeys.some((menu) => menu === item.path);
        !isHas && menuState.value.openKeys.push(item.path);
      });
    }
  };

  // =====================tabNav=============================
  const tabNav = ref<TabItem[]>([]);
  const cacheTabNav = ref(new Set<string>());
  const currentDisabledActionItems = ref(new Set() as Set<TabActionKeys>);
  // 内容区节点
  const contentRef = ref();

  /**
   * @description: 重置tabNav
   * @return {*}
   */
  const resetNav = () => {
    tabNav.value = [];
    cacheTabNav.value.clear();
    currentDisabledActionItems.value.clear();
    menuState.value.openKeys = [];
    menuState.value.selectedKeys = [];
  };

  watch(
    () => [route.fullPath, menus.value],
    () => {
      fullMenus.value = findFullMenu(menus.value, route.fullPath) || [];
      const currentMenu = fullMenus.value[fullMenus.value.length - 1] as MenuItem;
      if (!currentMenu?.isShow) return;

      /** menu */
      menuState.value.selectedKeys = [route.fullPath];
      getMenuOpenKeys();
      if (config.value.isMixMenuFixed) {
        mixMenus.value =
          menus.value.find((item) => item.key === route.matched[1].path)?.children || [];
      }

      /** tabNav  */
      if (fullMenus.value[fullMenus.value.length - 1].keepAlive) {
        cacheTabNav.value.add(route.name as string);
      }
      const newTab: TabItem = {
        title: currentMenu.title || '无标题',
        path: currentMenu.key,
        icon: currentMenu.icon,
        closable: !currentMenu.isHomePage,
      };
      !tabNav.value.some((tab) => isEqual(tab, newTab)) && tabNav.value.push(newTab);
    },
  );

  // =====================searchModal=============================
  const openSearchModal = ref<boolean>(false);

  return {
    // 菜单
    menus,
    mixMenus,
    menuLoading,
    fullMenus,
    menuState,
    HomeMenu,
    findFullMenu,
    getMenus,
    getMenuOpenKeys,
    // tab
    tabNav,
    cacheTabNav,
    currentDisabledActionItems,
    contentRef,
    resetNav,
    // searchModal
    openSearchModal,
  };
});

export const useSystemStoreHook = () => {
  return useSystemStore(store);
};
