import Mock from 'mockjs';
import { validToken } from '../utils';
import { Response } from '../type';

const mockMenu: MenuListItem[] = [
  {
    id: 0,
    path: '/home',
    title: '首页',
    icon: 'svg:RiHomeSmileLine',
    keepAlive: 1,
    isHomePage: 1,
    order: 1,
    parentId: null,
    isShow: 1,
    createTime: Mock.Random.datetime(),
    status: 1,
    permission: 'page:home',
    type: 1,
    isLink: 0,
  },
  {
    id: 1,
    path: '/components',
    title: '组件',
    icon: 'svg:RiPuzzle2Line',
    order: 2,
    parentId: null,
    isShow: 1,
    isHomePage: 0,
    status: 1,
    keepAlive: 0,
    createTime: Mock.Random.datetime(),
    permission: 'page:components',
    type: 0,
    isLink: 0,
    children: [
      {
        id: 2,
        path: '/components/icon',
        title: '图标',
        icon: 'svg:RiCreativeCommonsSaLine',
        order: 3,
        parentId: 1,
        isShow: 1,
        isHomePage: 0,
        status: 1,
        keepAlive: 0,
        createTime: Mock.Random.datetime(),
        type: 1,
        permission: 'page:components:icon',
        isLink: 0,
      },
      {
        id: 3,
        path: '/components/password-strength',
        title: '密码强度',
        icon: 'svg:RiLockPasswordLine',
        order: 4,
        parentId: 1,
        isShow: 1,
        isHomePage: 0,
        status: 1,
        keepAlive: 0,
        createTime: Mock.Random.datetime(),
        permission: 'page:components:password-strength',
        type: 1,
        isLink: 0,
      },
      {
        id: 4,
        path: '/components/number-animate',
        title: '数字动画',
        icon: 'svg:RiSortNumberDesc',
        order: 7,
        parentId: 1,
        isShow: 1,
        isHomePage: 0,
        status: 1,
        keepAlive: 0,
        createTime: Mock.Random.datetime(),
        permission: 'page:components:number-animate',
        type: 1,
        isLink: 0,
      },
      {
        id: 5,
        path: '/components/quarter-picker',
        title: '季度选择器',
        icon: 'svg:RiChatPollLine',
        order: 5,
        parentId: 1,
        isShow: 1,
        isHomePage: 0,
        status: 1,
        keepAlive: 0,
        createTime: Mock.Random.datetime(),
        permission: 'page:components:quarter-picker',
        type: 1,
        isLink: 0,
      },
      {
        id: 6,
        path: '/components/barcode',
        title: '条形码',
        icon: 'svg:RiBarcodeFill',
        order: 6,
        parentId: 1,
        isShow: 1,
        isHomePage: 0,
        status: 1,
        keepAlive: 0,
        createTime: Mock.Random.datetime(),
        permission: 'page:components:barcode',
        type: 1,
        isLink: 0,
      },
      {
        id: 7,
        path: '/components/ellipsis',
        title: '文本省略',
        icon: 'svg:RiStackOverflowLine',
        order: 3,
        parentId: 1,
        isShow: 1,
        isHomePage: 0,
        status: 1,
        keepAlive: 0,
        createTime: Mock.Random.datetime(),
        permission: 'page:components:ellipsis',
        type: 1,
        isLink: 0,
      },
      {
        id: 8,
        path: '/components/markdown-editor',
        title: 'Markdown编辑器',
        icon: 'svg:RiMarkdownLine',
        order: 14,
        parentId: 1,
        isShow: 1,
        isHomePage: 0,
        status: 1,
        keepAlive: 0,
        createTime: Mock.Random.datetime(),
        permission: 'page:components:markdown-editor',
        type: 1,
        isLink: 0,
      },
      {
        id: 9,
        path: '/components/richText-editor',
        title: '富文本编辑器',
        icon: 'svg:RiFileTextLine',
        order: 12,
        parentId: 1,
        isShow: 1,
        isHomePage: 0,
        status: 1,
        keepAlive: 0,
        createTime: Mock.Random.datetime(),
        permission: 'page:components:richText-editor',
        type: 1,
        isLink: 0,
      },
    ],
  },
  {
    id: 10,
    path: '/func',
    title: '功能',
    icon: 'svg:RiAppsLine',
    order: 3,
    parentId: null,
    isShow: 1,
    isHomePage: 0,
    status: 1,
    keepAlive: 0,
    createTime: Mock.Random.datetime(),
    type: 0,
    permission: 'page:func',
    isLink: 0,
    children: [
      {
        id: 11,
        path: '/func/tabs',
        title: '标签页',
        icon: 'svg:RiNotificationBadgeLine',
        order: 1,
        parentId: 10,
        isShow: 1,
        isHomePage: 0,
        status: 1,
        keepAlive: 0,
        createTime: Mock.Random.datetime(),
        permission: 'page:func:tabs',
        type: 1,
        isLink: 0,
      },
      {
        id: 12,
        path: '/func/copy',
        title: '一键复制',
        icon: 'svg:RiCheckboxMultipleBlankFill',
        order: 3,
        parentId: 10,
        isShow: 1,
        isHomePage: 0,
        status: 1,
        keepAlive: 0,
        createTime: Mock.Random.datetime(),
        permission: 'page:func:copy',
        type: 1,
        isLink: 0,
      },
      {
        id: 13,
        path: '/func/fullscreen',
        title: '全屏',
        icon: 'svg:RiFullscreenExitLine',
        order: 6,
        parentId: 10,
        isShow: 1,
        isHomePage: 0,
        status: 1,
        keepAlive: 0,
        createTime: Mock.Random.datetime(),
        permission: 'page:func:fullscreen',
        type: 1,
        isLink: 0,
      },
      {
        id: 14,
        path: '/func/print',
        title: '打印',
        icon: 'svg:RiPrinterLine',
        order: 4,
        parentId: 10,
        isShow: 1,
        isHomePage: 0,
        status: 1,
        keepAlive: 0,
        createTime: Mock.Random.datetime(),
        permission: 'page:func:print',
        type: 1,
        isLink: 0,
      },
    ],
  },
  {
    id: 15,
    path: '/page-error',
    title: '异常页面',
    icon: 'svg:RiErrorWarningLine',
    order: 6,
    parentId: null,
    isShow: 1,
    isHomePage: 0,
    status: 1,
    keepAlive: 0,
    createTime: Mock.Random.datetime(),
    type: 0,
    permission: 'page:error',
    isLink: 0,
    children: [
      {
        id: 16,
        path: '/page-error/403',
        icon: 'svg:RiForbidLine',
        title: '403',
        order: 3,
        parentId: 15,
        isShow: 1,
        isHomePage: 0,
        status: 1,
        keepAlive: 0,
        createTime: Mock.Random.datetime(),
        permission: 'page:error:403',
        type: 1,
        isLink: 0,
      },
      {
        id: 17,
        path: '/page-error/404',
        icon: 'svg:RiFileCloseLine',
        title: '404',
        order: 3,
        parentId: 15,
        isShow: 1,
        isHomePage: 0,
        status: 1,
        keepAlive: 0,
        createTime: Mock.Random.datetime(),
        permission: 'page:error:404',
        type: 1,
        isLink: 0,
      },
      {
        id: 18,
        path: '/page-error/500',
        icon: 'svg:RiWifiOffLine',
        title: '500',
        order: 3,
        parentId: 15,
        isShow: 1,
        isHomePage: 0,
        status: 1,
        keepAlive: 0,
        createTime: Mock.Random.datetime(),
        permission: 'page:error:500',
        type: 1,
        isLink: 0,
      },
    ],
  },
  {
    id: 19,
    path: '/multi-level-menu',
    title: '多级菜单',
    icon: 'svg:RiListOrdered2',
    order: 5,
    parentId: null,
    isShow: 1,
    isHomePage: 0,
    status: 1,
    keepAlive: 0,
    createTime: Mock.Random.datetime(),
    type: 0,
    permission: 'page:multi-level-menu',
    isLink: 0,
    children: [
      {
        id: 20,
        path: '/multi-level-menu/menu1',
        icon: 'svg:RiListOrdered2',
        title: '菜单一',
        order: 1,
        parentId: 19,
        isShow: 1,
        isHomePage: 0,
        status: 1,
        keepAlive: 0,
        createTime: Mock.Random.datetime(),
        type: 0,
        permission: 'page:multi-level-menu:menu1',
        isLink: 0,
        children: [
          {
            id: 21,
            path: '/multi-level-menu/menu1/menu1-child',
            icon: 'svg:RiListOrdered2',
            title: '菜单一子菜单',
            order: 3,
            parentId: 20,
            isShow: 1,
            isHomePage: 0,
            status: 1,
            keepAlive: 0,
            createTime: Mock.Random.datetime(),
            permission: 'page:multi-level-menu:menu1:child',
            type: 1,
            isLink: 0,
          },
        ],
      },
      {
        id: 22,
        path: '/multi-level-menu/menu2',
        icon: 'svg:RiListOrdered2',
        title: '菜单二',
        order: 2,
        parentId: 19,
        isShow: 1,
        isHomePage: 0,
        status: 1,
        keepAlive: 0,
        createTime: Mock.Random.datetime(),
        type: 0,
        permission: 'page:multi-level-menu:menu2',
        isLink: 0,
        children: [
          {
            id: 23,
            path: '/multi-level-menu/menu2/menu2-child',
            icon: 'svg:RiListOrdered2',
            title: '菜单二子菜单',
            order: 3,
            parentId: 22,
            isShow: 1,
            isHomePage: 0,
            status: 1,
            keepAlive: 0,
            createTime: Mock.Random.datetime(),
            permission: 'page:multi-level-menu:menu2:child',
            type: 1,
            isLink: 0,
          },
        ],
      },
    ],
  },
  {
    id: 24,
    path: '/system',
    icon: 'svg:RiSettings2Line',
    title: '系统菜单',
    order: 8,
    parentId: null,
    isShow: 1,
    isHomePage: 0,
    status: 1,
    keepAlive: 0,
    createTime: Mock.Random.datetime(),
    type: 0,
    permission: 'page:system',
    isLink: 0,
    children: [
      {
        id: 25,
        path: '/system/user',
        title: '用户菜单',
        order: 2,
        parentId: 24,
        isShow: 1,
        isHomePage: 0,
        status: 1,
        keepAlive: 0,
        createTime: Mock.Random.datetime(),
        permission: 'page:system:user',
        type: 1,
        isLink: 0,
        children: [
          {
            id: 29,
            title: '新建用户',
            parentId: 25,
            status: 1,
            createTime: Mock.Random.datetime(),
            permission: 'btn:system:user__create',
            type: 2,
          },
          {
            id: 30,
            title: '修改用户',
            parentId: 25,
            status: 1,
            createTime: Mock.Random.datetime(),
            permission: 'btn:system:user__edit',
            type: 2,
          },
          {
            id: 31,
            title: '删除用户',
            parentId: 25,
            status: 1,
            createTime: Mock.Random.datetime(),
            permission: 'btn:system:user__delete',
            type: 2,
          },
        ],
      },
      {
        id: 26,
        path: '/system/dept',
        title: '部门菜单',
        order: 1,
        parentId: 24,
        isShow: 1,
        isHomePage: 0,
        status: 1,
        keepAlive: 0,
        createTime: Mock.Random.datetime(),
        permission: 'page:system:dept',
        type: 1,
        isLink: 0,
      },
      {
        id: 27,
        path: '/system/menu',
        title: '菜单菜单',
        order: 4,
        parentId: 24,
        isShow: 1,
        isHomePage: 0,
        status: 1,
        keepAlive: 0,
        createTime: Mock.Random.datetime(),
        permission: 'page:system:menu',
        type: 1,
        isLink: 0,
      },
      {
        id: 28,
        path: '/system/role',
        title: '角色菜单',
        order: 3,
        parentId: 24,
        isShow: 1,
        isHomePage: 0,
        status: 1,
        keepAlive: 0,
        createTime: Mock.Random.datetime(),
        permission: 'page:system:role',
        type: 1,
        isLink: 0,
      },
    ],
  },
];

Mock.mock(RegExp('/api/menu/list?.*'), 'get', (_options): Response => {
  const [valid, result] = validToken();
  if (!valid) {
    return result as Response;
  }
  return {
    data: mockMenu,
    code: 200,
    msg: '',
  };
});
