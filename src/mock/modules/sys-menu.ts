import Mock from 'mockjs';
import { t } from '@/locales';
import { validToken } from '../utils';
import { Response } from '../type';
import { decodeToken } from '../token';
import { StorgeKeys } from '@/enum/storgeKeys';

const mockMenu: SystemMenuItem[] = [
  {
    id: Mock.Random.id(),
    path: '/home',
    title: t('route.titles.home'),
    icon: 'svg:RiComputerLine',
    keepAlive: 1,
    isHomePage: 1,
    order: 1,
    isShow: 1,
    status: 1,
    isLink: 0,
  },
  {
    id: Mock.Random.id(),
    path: '/about',
    title: t('route.titles.about'),
    icon: 'svg:RiFileInfoLine',
    keepAlive: 0,
    isHomePage: 0,
    order: 99,
    isShow: 1,
    status: 1,
    isLink: 0,
  },
  {
    id: Mock.Random.id(),
    path: '/components',
    title: t('route.titles.components'),
    icon: 'svg:RiPuzzle2Line',
    order: 2,
    isShow: 1,
    isHomePage: 0,
    status: 1,
    keepAlive: 0,
    isLink: 0,
    children: [
      {
        id: Mock.Random.id(),
        path: '/components/icon',
        title: t('route.titles.icon'),
        icon: 'svg:RiCreativeCommonsSaLine',
        order: 3,
        isShow: 1,
        isHomePage: 0,
        status: 1,
        keepAlive: 0,
        isLink: 0,
      },
      {
        id: Mock.Random.id(),
        path: '/components/password-strength',
        title: t('route.titles.pswStrength'),
        icon: 'svg:RiLockPasswordLine',
        order: 4,
        isShow: 1,
        isHomePage: 0,
        status: 1,
        keepAlive: 0,
        isLink: 0,
      },
      {
        id: Mock.Random.id(),
        path: '/components/image-resizer',
        title: t('route.titles.imageResizer'),
        icon: 'svg:RiImageEditFill',
        order: 4,
        isShow: 1,
        isHomePage: 0,
        status: 1,
        keepAlive: 0,
        isLink: 0,
      },
      {
        id: Mock.Random.id(),
        path: '/components/number-animate',
        title: t('route.titles.numberAnim'),
        icon: 'svg:RiSortNumberDesc',
        order: 7,
        isShow: 1,
        isHomePage: 0,
        status: 1,
        keepAlive: 0,
        isLink: 0,
      },
      {
        id: Mock.Random.id(),
        path: '/components/quarter-picker',
        title: t('route.titles.quarterPicker'),
        icon: 'svg:RiChatPollLine',
        order: 5,
        isShow: 1,
        isHomePage: 0,
        status: 1,
        keepAlive: 0,
        isLink: 0,
      },
      {
        id: Mock.Random.id(),
        path: '/components/barcode',
        title: t('route.titles.barcode'),
        icon: 'svg:RiBarcodeFill',
        order: 6,
        isShow: 1,
        isHomePage: 0,
        status: 1,
        keepAlive: 0,
        isLink: 0,
      },
      {
        id: Mock.Random.id(),
        path: '/components/ellipsis',
        title: t('route.titles.ellipsis'),
        icon: 'svg:RiStackOverflowLine',
        order: 3,
        isShow: 1,
        isHomePage: 0,
        status: 1,
        keepAlive: 0,
        isLink: 0,
      },
      {
        id: Mock.Random.id(),
        path: '/components/markdown-editor',
        title: t('route.titles.markdownEditor'),
        icon: 'svg:RiMarkdownLine',
        order: 14,
        isShow: 1,
        isHomePage: 0,
        status: 1,
        keepAlive: 0,
        isLink: 0,
      },
      {
        id: Mock.Random.id(),
        path: '/components/richText-editor',
        title: t('route.titles.richText'),
        icon: 'svg:RiFileTextLine',
        order: 12,
        isShow: 1,
        isHomePage: 0,
        status: 1,
        keepAlive: 0,
        isLink: 0,
      },
    ],
  },
  {
    id: Mock.Random.id(),
    path: '/func',
    title: t('route.titles.func'),
    icon: 'svg:RiAppsLine',
    order: 3,
    isShow: 1,
    isHomePage: 0,
    status: 1,
    keepAlive: 0,
    isLink: 0,
    children: [
      {
        id: Mock.Random.id(),
        path: '/func/tabs',
        title: t('route.titles.tabs'),
        icon: 'svg:RiNotificationBadgeLine',
        order: 1,
        isShow: 1,
        isHomePage: 0,
        status: 1,
        keepAlive: 0,
        isLink: 0,
      },
      {
        id: Mock.Random.id(),
        path: '/func/copy',
        title: t('route.titles.copy'),
        icon: 'svg:RiCheckboxMultipleBlankFill',
        order: 3,
        isShow: 1,
        isHomePage: 0,
        status: 1,
        keepAlive: 0,
        isLink: 0,
      },
      {
        id: Mock.Random.id(),
        path: '/func/fullscreen',
        title: t('route.titles.fullscreen'),
        icon: 'svg:RiFullscreenExitLine',
        order: 6,
        isShow: 1,
        isHomePage: 0,
        status: 1,
        keepAlive: 0,
        isLink: 0,
      },
      {
        id: Mock.Random.id(),
        path: '/func/print',
        title: t('route.titles.print'),
        icon: 'svg:RiPrinterLine',
        order: 4,
        isShow: 1,
        isHomePage: 0,
        status: 1,
        keepAlive: 0,
        isLink: 0,
      },
      {
        id: Mock.Random.id(),
        path: '/func/ai',
        icon: 'svg:BiRobot',
        title: t('route.titles.ai'),
        order: 6,
        isShow: 1,
        isHomePage: 0,
        status: 1,
        keepAlive: 0,
        isLink: 0,
        children: [
          {
            id: Mock.Random.id(),
            path: '/func/ai/spark',
            title: t('route.titles.spark'),
            order: 3,
            isShow: 1,
            isHomePage: 0,
            status: 1,
            keepAlive: 0,
            isLink: 0,
          },
        ],
      },
    ],
  },
  {
    id: Mock.Random.id(),
    path: '/page',
    title: t('route.titles.page'),
    icon: 'svg:RiFileList3Line',
    order: 6,
    isShow: 1,
    isHomePage: 0,
    status: 1,
    keepAlive: 0,
    isLink: 0,
    children: [
      {
        id: Mock.Random.id(),
        path: '/page/effect',
        title: t('route.titles.resultPage'),
        // icon: 'svg:RiErrorWarningLine',
        order: 9,
        isShow: 1,
        isHomePage: 0,
        status: 1,
        keepAlive: 0,
        isLink: 0,
        children: [
          {
            id: Mock.Random.id(),
            path: '/page/effect/success',
            // icon: 'svg:RiForbidLine',
            title: t('route.titles.successPage'),
            order: 3,
            isShow: 1,
            isHomePage: 0,
            status: 1,
            keepAlive: 0,
            isLink: 0,
          },
          {
            id: Mock.Random.id(),
            path: '/page/effect/fail',
            // icon: 'svg:RiFileCloseLine',
            title: t('route.titles.failPage'),
            order: 3,
            isShow: 1,
            isHomePage: 0,
            status: 1,
            keepAlive: 0,
            isLink: 0,
          },
        ],
      },
      {
        id: Mock.Random.id(),
        path: '/page/error',
        title: t('route.titles.error'),
        // icon: 'svg:RiErrorWarningLine',
        order: 6,
        isShow: 1,
        isHomePage: 0,
        status: 1,
        keepAlive: 0,
        isLink: 0,
        children: [
          {
            id: Mock.Random.id(),
            path: '/page/error/403',
            // icon: 'svg:RiForbidLine',
            title: t('route.titles.403'),
            order: 3,
            isShow: 1,
            isHomePage: 0,
            status: 1,
            keepAlive: 0,
            isLink: 0,
          },
          {
            id: Mock.Random.id(),
            path: '/page/error/404',
            // icon: 'svg:RiFileCloseLine',
            title: t('route.titles.404'),
            order: 3,
            isShow: 1,
            isHomePage: 0,
            status: 1,
            keepAlive: 0,
            isLink: 0,
          },
          {
            id: Mock.Random.id(),
            path: '/page/error/500',
            // icon: 'svg:RiWifiOffLine',
            title: t('route.titles.500'),
            order: 3,
            isShow: 1,
            isHomePage: 0,
            status: 1,
            keepAlive: 0,
            isLink: 0,
          },
        ],
      },
      {
        id: Mock.Random.id(),
        path: '/page/list',
        title: t('route.titles.listPage'),
        // icon: 'svg:RiErrorWarningLine',
        order: 6,
        isShow: 1,
        isHomePage: 0,
        status: 1,
        keepAlive: 0,
        isLink: 0,
        children: [
          {
            id: Mock.Random.id(),
            path: '/page/list/standard',
            // icon: 'svg:RiForbidLine',
            title: t('route.titles.standardList'),
            order: 3,
            isShow: 1,
            isHomePage: 0,
            status: 1,
            keepAlive: 0,
            isLink: 0,
          },
          {
            id: Mock.Random.id(),
            path: '/page/list/card',
            // icon: 'svg:RiFileCloseLine',
            title: t('route.titles.cardList'),
            order: 3,
            isShow: 1,
            isHomePage: 0,
            status: 1,
            keepAlive: 0,
            isLink: 0,
          },
        ],
      },
      {
        id: Mock.Random.id(),
        path: '/page/personal',
        title: t('route.titles.personPage'),
        // icon: 'svg:RiErrorWarningLine',
        order: 6,
        isShow: 1,
        isHomePage: 0,
        status: 1,
        keepAlive: 0,
        isLink: 0,
        children: [
          {
            id: Mock.Random.id(),
            path: '/page/personal/center',
            // icon: 'svg:RiForbidLine',
            title: t('route.titles.personalCenter'),
            order: 3,
            isShow: 1,
            isHomePage: 0,
            status: 1,
            keepAlive: 0,
            isLink: 0,
          },
          {
            id: Mock.Random.id(),
            path: '/page/personal/setting',
            // icon: 'svg:RiFileCloseLine',
            title: t('route.titles.personalSetting'),
            order: 3,
            isShow: 1,
            isHomePage: 0,
            status: 1,
            keepAlive: 0,
            isLink: 0,
          },
        ],
      },
    ],
  },
  {
    id: Mock.Random.id(),
    path: '/charts',
    title: t('route.titles.charts'),
    icon: 'svg:RiBarChart2Line',
    order: 3,
    isShow: 1,
    isHomePage: 0,
    status: 1,
    keepAlive: 0,
    isLink: 0,
    children: [
      {
        id: Mock.Random.id(),
        path: '/charts/echarts',
        icon: 'svg:echarts',
        title: t('route.titles.echarts'),
        order: 2,
        isShow: 1,
        isHomePage: 0,
        status: 1,
        keepAlive: 0,
        isLink: 0,
        children: [
          {
            id: Mock.Random.id(),
            path: '/charts/echarts/index',
            title: t('route.titles.chartsGather'),
            order: 3,
            isShow: 1,
            isHomePage: 0,
            status: 1,
            keepAlive: 0,
            isLink: 0,
          },
          {
            id: Mock.Random.id(),
            path: '/charts/echarts/map',
            title: t('route.titles.map'),
            order: 3,
            isShow: 1,
            isHomePage: 0,
            status: 1,
            keepAlive: 0,
            isLink: 0,
          },
        ],
      },
      {
        id: Mock.Random.id(),
        path: '/charts/Amap',
        icon: 'svg:AMap',
        title: t('route.titles.Amap'),
        order: 1,
        isShow: 1,
        isHomePage: 0,
        status: 1,
        keepAlive: 0,
        isLink: 0,
      },
    ],
  },
  {
    id: Mock.Random.id(),
    path: '/multi-level-menu',
    title: t('route.titles.multilevelMenu'),
    icon: 'svg:RiListOrdered2',
    order: 5,
    isShow: 1,
    isHomePage: 0,
    status: 1,
    keepAlive: 0,
    isLink: 0,
    children: [
      {
        id: Mock.Random.id(),
        path: '/multi-level-menu/menu1',
        icon: 'svg:RiListOrdered2',
        title: t('route.titles.menu1'),
        order: 1,
        isShow: 1,
        isHomePage: 0,
        status: 1,
        keepAlive: 0,
        isLink: 0,
        children: [
          {
            id: Mock.Random.id(),
            path: '/multi-level-menu/menu1/menu1-child',
            icon: 'svg:RiListOrdered2',
            title: t('route.titles.menu1Child'),
            order: 3,
            isShow: 1,
            isHomePage: 0,
            status: 1,
            keepAlive: 0,
            isLink: 0,
          },
        ],
      },
      {
        id: Mock.Random.id(),
        path: '/multi-level-menu/menu2',
        icon: 'svg:RiListOrdered2',
        title: t('route.titles.menu2'),
        order: 2,
        isShow: 1,
        isHomePage: 0,
        status: 1,
        keepAlive: 0,
        isLink: 0,
        children: [
          {
            id: Mock.Random.id(),
            path: '/multi-level-menu/menu2/menu2-child',
            icon: 'svg:RiListOrdered2',
            title: t('route.titles.menu2Child'),
            order: 3,
            isShow: 1,
            isHomePage: 0,
            status: 1,
            keepAlive: 0,
            isLink: 0,
          },
        ],
      },
    ],
  },
  {
    id: Mock.Random.id(),
    path: '/document',
    icon: 'svg:RiArticleLine',
    title: t('route.titles.document'),
    order: 7,
    isShow: 1,
    isHomePage: 0,
    status: 1,
    keepAlive: 0,
    isLink: 0,
    children: [
      {
        id: Mock.Random.id(),
        path: '/document/project',
        icon: 'svg:logo',
        title: t('route.titles.project'),
        order: 2,
        isShow: 1,
        isHomePage: 0,
        status: 1,
        keepAlive: 0,
        isLink: 0,
      },
      {
        id: Mock.Random.id(),
        path: '/document/project-link',
        icon: 'svg:logo',
        title: t('route.titles.project-link'),
        order: 2,
        isShow: 1,
        isHomePage: 0,
        status: 1,
        keepAlive: 0,
        isLink: 1,
        href: 'https://www.antdv.com/',
      },
      {
        id: Mock.Random.id(),
        path: '/document/ant-design-vue',
        icon: 'svg:antdv',
        title: t('route.titles.antdv'),
        order: 2,
        isShow: 1,
        isHomePage: 0,
        status: 1,
        keepAlive: 0,
        isLink: 0,
      },
    ],
  },
  {
    id: Mock.Random.id(),
    path: '/auth',
    icon: 'svg:RiKeyLine',
    title: t('route.titles.auth'),
    order: 4,
    isShow: 1,
    isHomePage: 0,
    status: 1,
    keepAlive: 0,
    isLink: 0,
    children: [
      {
        id: Mock.Random.id(),
        path: '/auth/page',
        icon: 'svg:RiPagesLine',
        title: t('route.titles.page-auth'),
        order: 0,
        isShow: 1,
        isHomePage: 0,
        status: 1,
        keepAlive: 0,
        isLink: 0,
      },
      {
        id: Mock.Random.id(),
        path: '/auth/btn',
        icon: 'svg:RiRobotLine',
        title: t('route.titles.btn-auth'),
        order: 1,
        isShow: 1,
        isHomePage: 0,
        status: 1,
        keepAlive: 0,
        isLink: 0,
      },
    ],
  },
  {
    id: Mock.Random.id(),
    path: '/system',
    icon: 'svg:RiSettings2Line',
    title: t('route.titles.system'),
    order: 8,
    isShow: 1,
    isHomePage: 0,
    status: 1,
    keepAlive: 0,
    isLink: 0,
    children: [
      {
        id: Mock.Random.id(),
        path: '/system/user',
        icon: 'svg:RiUserLine',
        title: t('route.titles.systemUser'),
        order: 2,
        isShow: 1,
        isHomePage: 0,
        status: 1,
        keepAlive: 0,
        isLink: 0,
      },
      {
        id: Mock.Random.id(),
        path: '/system/dept',
        icon: 'svg:RiCompasses2Line',
        title: t('route.titles.systemDepartment'),
        order: 1,
        isShow: 1,
        isHomePage: 0,
        status: 1,
        keepAlive: 0,
        isLink: 0,
      },
      {
        id: Mock.Random.id(),
        path: '/system/menu',
        icon: 'svg:RiListSettingsLine',
        title: t('route.titles.systemMenu'),
        order: 4,
        isShow: 1,
        isHomePage: 0,
        status: 1,
        keepAlive: 0,
        isLink: 0,
      },
      {
        id: Mock.Random.id(),
        path: '/system/role',
        icon: 'svg:RiUserSettingsLine',
        title: t('route.titles.systemRole'),
        order: 3,
        isShow: 1,
        isHomePage: 0,
        status: 1,
        keepAlive: 0,
        isLink: 0,
      },
    ],
  },
];

Mock.mock('/api/menu', 'get', (_options): Response => {
  const [valid, result] = validToken();
  if (!valid) {
    return result as Response;
  }
  let menus;
  const token = localStorage.getItem(StorgeKeys.SYS_TOKEN) || '';
  if (decodeToken(token).role === 'superAdmin') {
    menus = mockMenu;
  } else {
    menus = mockMenu.filter((item) => ['/home', '/auth', '/about'].includes(item.path));
  }

  return {
    data: menus,
    code: 200,
    msg: '',
  };
});
