import { type RouteRecordRaw } from 'vue-router';
import { t } from '@/locales';

export const PageRoutes: RouteRecordRaw = {
  path: 'page',
  name: 'page',
  redirect: { name: 'page-error' },
  meta: {
    title: t('route.titles.page'),
  },
  children: [
    {
      path: 'error',
      name: 'page-error',
      redirect: { name: '403' },
      meta: {
        title: t('route.titles.error'),
      },
      children: [
        {
          path: '403',
          name: '403',
          component: () => import('@/view/page/error/403.vue'),
          meta: {
            title: t('route.titles.403'),
          },
        },
        {
          path: '404',
          name: '404',
          component: () => import('@/view/page/error/404.vue'),
          meta: {
            title: t('route.titles.404'),
          },
        },
        {
          path: '500',
          name: '500',
          component: () => import('@/view/page/error/500.vue'),
          meta: {
            title: t('route.titles.500'),
          },
        },
      ],
    },
    {
      path: 'effect',
      name: 'page-result',
      redirect: { name: 'success' },
      meta: {
        title: t('route.titles.resultPage'),
      },
      children: [
        {
          path: 'success',
          name: 'page-result-success',
          component: () => import('@/view/page/result/Success.vue'),
          meta: {
            title: t('route.titles.successPage'),
          },
        },
        {
          path: 'fail',
          name: 'page-result-fail',
          component: () => import('@/view/page/result/Fail.vue'),
          meta: {
            title: t('route.titles.failPage'),
          },
        },
      ],
    },
    {
      path: 'list',
      name: 'page-list',
      redirect: { name: 'standard' },
      meta: {
        title: t('route.titles.listPage'),
      },
      children: [
        {
          path: 'standard',
          name: 'page-list-standard',
          component: () => import('@/view/page/list/StandardList.vue'),
          meta: {
            title: t('route.titles.standardList'),
          },
        },
        {
          path: 'card',
          name: 'page-list-card',
          component: () => import('@/view/page/list/CardList.vue'),
          meta: {
            title: t('route.titles.cardList'),
          },
        },
      ],
    },
    {
      path: 'personal',
      name: 'page-personal',
      redirect: { name: 'center' },
      meta: {
        title: t('route.titles.personPage'),
      },
      children: [
        {
          path: 'center',
          name: 'page-personal-center',
          component: () => import('@/view/page/personal/PersonalCenter/index.vue'),
          meta: {
            title: t('route.titles.personalCenter'),
          },
        },
        {
          path: 'setting',
          name: 'page-personal-setting',
          component: () => import('@/view/page/personal/PersonalSetting/index.vue'),
          meta: {
            title: t('route.titles.personalSetting'),
          },
        },
      ],
    },
  ],
};
