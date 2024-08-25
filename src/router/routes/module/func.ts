import { type RouteRecordRaw } from 'vue-router';
import { t } from '@/locales';

export const FuncRoutes: RouteRecordRaw = {
  path: 'func',
  name: 'func',
  redirect: { name: 'tabs' },
  meta: {
    title: t('route.titles.func'),
  },
  children: [
    {
      path: 'tabs',
      name: 'tabs',
      component: () => import('@/view/func/Tabs.vue'),
      meta: {
        title: t('route.titles.tabs'),
      },
    },
    {
      path: 'copy',
      name: 'copy',
      component: () => import('@/view/func/Copy.vue'),
      meta: {
        title: t('route.titles.copy'),
      },
    },
    {
      path: 'fullscreen',
      name: 'fullscreen',
      component: () => import('@/view/func/Fullscreen.vue'),
      meta: {
        title: t('route.titles.fullscreen'),
      },
    },
    {
      path: 'print',
      name: 'print',
      component: () => import('@/view/func/Print.vue'),
      meta: {
        title: t('route.titles.print'),
      },
    },
  ],
};
