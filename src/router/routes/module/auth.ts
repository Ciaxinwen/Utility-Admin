import { type RouteRecordRaw } from 'vue-router';
import { t } from '@/locales';

export const AuthRoutes: RouteRecordRaw = {
  path: 'auth',
  name: 'auth',
  redirect: { name: 'auth-page' },
  meta: {
    title: t('route.titles.auth'),
  },
  children: [
    {
      path: 'page',
      name: 'auth-page',
      component: () => import('@/view/auth/page/index.vue'),
      meta: {
        title: t('route.titles.page-auth'),
      },
    },
    {
      path: 'btn',
      name: 'auth-btn',
      component: () => import('@/view/auth/btn/index.vue'),
      meta: {
        title: t('route.titles.btn-auth'),
      },
    },
  ],
};
