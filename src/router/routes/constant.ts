import { type RouteRecordRaw } from 'vue-router';
import { t } from '@/locales';

export const ConstantRoutes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    meta: {
      hidden: true,
      title: t('route.titles.login'),
    },
    component: () => import('@/view/common/login/index.vue'),
  },
  {
    path: '/',
    component: () => import('@/layout'),
    children: [
      {
        path: '/:pathMatch(.*)*',
        name: 'notFound',
        meta: {
          hidden: true,
          title: t('route.titles.404'),
        },
        component: () => import('@/view/page/error/404.vue'),
      },
      {
        path: '/403',
        name: 'notAuthorized',
        meta: {
          hidden: true,
          title: t('route.titles.403'),
        },
        component: () => import('@/view/page/error/403.vue'),
      },
      {
        path: '/500',
        name: 'serverError',
        meta: {
          hidden: true,
          title: t('route.titles.500'),
        },
        component: () => import('@/view/page/error/500.vue'),
      },
      {
        path: '/redirect/:path(.*)',
        name: 'redirect',
        meta: {
          hidden: true,
          title: t('route.titles.loading'),
        },
        component: () => import('@/view/common/redirect/index.vue'),
      },
    ],
  },
];
