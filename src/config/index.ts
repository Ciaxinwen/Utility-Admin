import { cloneDeep } from 'lodash';
import { Theme, Layout, AnimationTypes, TabBarStyle } from '@/enum/system';
import dayjs from 'dayjs';

const defaultConfig: Configurations = {
  theme: Theme.LIGHT,
  layoutMode: Layout.LEFT,
  themeColor: '#5473e8',
  successColor: '#52c41a',
  errorColor: '#ff4d4f',
  warnColor: '#faad14',
  lightSidebar: true,
  showTabBar: true,
  showTabBarFullScreen: true,
  showTabBarMoreBtn: true,
  showTabBarRefresh: true,
  showHeaderBreadcrumb: true,
  showHeaderBreadcrumbIcon: true,
  showLogo: true,
  showFooter: true,
  showMessage: true,
  showFullScreen: true,
  showMenuSearch: true,
  showThemeSwitch: true,
  showLanguageSwitch: true,
  showSidebarSwitch: true,
  isCacheTabBar: true,
  showWaterMark: false,
  isGrayMode: false,
  isColorWeaknessMode: false,
  isSiderCollapsed: false,
  siderWidth: 230,
  isMixMenuFixed: false,
  enablePageAnimation: true,
  pageAnimationType: AnimationTypes.FADE_SLIDE,
  enableProgress: true,
  borderRadius: 6,
  isAccordionMode: true,
  tabBarStyle: TabBarStyle.GOOGLE,
  showHeaderBreadcrumbMenu: false,
  companyName: import.meta.env.VITE_SYSTEM_NAME,
  companyWebsite: '',
  onlineDate: dayjs().format('YYYY'),
  ICP_Number: '粤ICP备xxxxx号',
  ICP_website: '',
  dynamicTitle: true,
};

/**
 * @description: 获取默认配置
 * @return {*}
 */
export const getDefaultConfig = () => cloneDeep(defaultConfig) as Configurations;
