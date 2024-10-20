import { Layout, Theme, AnimationTypes, TabBarStyle } from '@/enum/system';

declare global {
  const __APP_BUILD_TIME__: string;

  export interface Window {
    _AMapSecurityConfig: Object<{
      securityJsCode: string;
    }>;
  }

  export type RouterHistoryMode = 'hash' | 'history';

  export interface ImportMetaEnv {
    readonly VITE_SYSTEM_NAME: string;
    readonly VITE_GLOB_API_URL: string;
    readonly VITE_GLOB_UPLOAD_URL: string;
    readonly VITE_BASE_URL: string;
    readonly VITE_ROUTER_MODE: RouterHistoryMode;
    readonly VITE_SPARK_APISECRET: stirng;
    readonly VITE_SPARK_APIKEY: stirng;
    readonly VITE_SPARK_APIID: stirng;
    readonly VITE_SPARK_CHAT_DOMAIN: stirng;
  }

  export interface Configurations {
    /* 主题 */
    theme: Theme;
    /* 导航栏模式 */
    layoutMode: Layout;
    /* 主题色 */
    themeColor: string;
    /* 成功色 */
    successColor: string;
    /* 警告色 */
    warnColor: string;
    /* 失败色 */
    errorColor: string;
    /* 浅色菜单栏 */
    lightSidebar: boolean;
    /* 菜单手风琴模式 */
    isAccordionMode: boolean;
    /* 菜单是否收起 */
    isSiderCollapsed: boolean;
    /* 是否显示标签栏 */
    showTabBar: boolean;
    /* 标签页风格 */
    tabBarStyle: TabBarStyle;
    /* 是否显示更多按钮 */
    showTabBarMoreBtn: boolean;
    /* 是否显示全屏按钮 */
    showTabBarFullScreen: boolean;
    /* 是否显示刷新按钮 */
    showTabBarRefresh: boolean;
    /* 是否显示顶部面包屑 */
    showHeaderBreadcrumb: boolean;
    /* 是否显示顶部面包屑图标 */
    showHeaderBreadcrumbIcon: boolean;
    /* 是否显示顶部面包屑下拉菜单 */
    showHeaderBreadcrumbMenu: boolean;
    /* 是否显示logo */
    showLogo: boolean;
    /* 是否显示页脚 */
    showFooter: boolean;
    /* 是否显示消息通知 */
    showMessage: boolean;
    /* 是否显示全屏按钮 */
    showFullScreen: boolean;
    /* 是否显示菜单搜索 */
    showMenuSearch: boolean;
    /* 是否显示主题切换 */
    showThemeSwitch: boolean;
    /* 是否显示语言切换 */
    showLanguageSwitch: boolean;
    /* 是否显示侧边栏切换 */
    showSidebarSwitch: boolean;
    /* 是否缓存标签栏 */
    isCacheTabBar: boolean;
    /* 是否开启水印 */
    showWaterMark: boolean;
    /* 灰色模式 */
    isGrayMode: boolean;
    /* 色弱模式 */
    isColorWeaknessMode: boolean;
    /* 菜单宽度 */
    siderWidth: number;
    /* 左侧混合菜单二级菜单状态 */
    isMixMenuFixed: boolean;
    /* 是否开启页面切换动画 */
    enablePageAnimation: boolean;
    /* 页面动画类型 */
    pageAnimationType: AnimationTypes;
    /* 顶部进度条 */
    enableProgress: boolean;
    /* 圆角 */
    borderRadius: number;
    /* 公司名 */
    companyName: string;
    /* 公司官网 */
    companyWebsite: string;
    /* 上线日期 */
    onlineDate: string;
    /* ICP备案号 */
    ICP_Number: string;
    /* ICP官方网站 */
    ICP_website: string;
    /* 动态页签标题 */
    dynamicTitle: boolean;
  }

  export interface UserInfo {
    id: string | number;
    name: string;
    avatar: string;
    email: string;
    phone: string;
    roles: string[];
    auth_code: string[];
    area: string;
    desc: string;
  }

  export interface SystemMenuItem {
    id: string | number;
    path: string;
    title: string;
    icon?: string;
    order: number;
    keepAlive: 0 | 1;
    children?: Array<SystemMenuItem>;
    status: 0 | 1;
    isShow: 0 | 1;
    isHomePage: 0 | 1;
    isLink: 0 | 1;
    href?: string;
  }

  export interface MenuListItem {
    id: string | number;
    path?: string;
    title: string;
    icon?: string;
    order?: number;
    keepAlive?: 0 | 1;
    children?: Array<MenuListItem>;
    status: 0 | 1;
    isShow?: 0 | 1;
    isHomePage?: 0 | 1;
    parentId: string | number | null;
    permission: string;
    createTime: string;
    isLink?: 0 | 1;
    type: 0 | 1 | 2;
    href?: string;
  }
}

export {};
