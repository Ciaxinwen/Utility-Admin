import { type RouteRecordRaw } from 'vue-router';
import { t } from '@/locales';

export const SystemRoutes: RouteRecordRaw = {
  path: 'system',
  name: 'system',
  redirect: { name: 'dept' },
  meta: {
    title: t('route.titles.system'),
  },
  children: [
    {
      path: 'dept',
      name: 'dept',
      component: () => import('@/view/system/department/index.vue'),
      meta: {
        title: t('route.titles.systemDepartment'),
      },
    },
    {
      path: 'menu',
      name: 'menu',
      component: () => import('@/view/system/menu/index.vue'),
      meta: {
        title: t('route.titles.systemMenu'),
      },
    },
    {
      path: 'role',
      name: 'role',
      component: () => import('@/view/system/role/index.vue'),
      meta: {
        title: t('route.titles.systemRole'),
      },
    },
    {
      path: 'user',
      name: 'user',
      component: () => import('@/view/system/user/index.vue'),
      meta: {
        title: t('route.titles.systemUser'),
      },
    },
  ],
};
