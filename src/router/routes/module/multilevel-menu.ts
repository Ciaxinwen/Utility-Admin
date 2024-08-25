import { type RouteRecordRaw } from 'vue-router';
import { t } from '@/locales';

export const MultilevelMenuRoutes: RouteRecordRaw = {
  path: 'multi-level-menu',
  name: 'multi-level-menu',
  redirect: { name: 'menu1' },
  meta: {
    title: t('route.titles.multilevelMenu'),
  },
  children: [
    {
      path: 'menu1',
      name: 'menu1',
      redirect: { name: 'menu1-child' },
      meta: {
        title: t('route.titles.menu1'),
      },
      children: [
        {
          path: 'menu1-child',
          name: 'menu1-child',
          meta: {
            title: t('route.titles.menu1Child'),
          },
          component: () => import('@/view/common/Expect.vue'),
        },
      ],
    },
    {
      path: 'menu2',
      name: 'menu2',
      redirect: { name: 'menu2-child' },
      meta: {
        title: t('route.titles.menu2'),
      },
      children: [
        {
          path: 'menu2-child',
          name: 'menu2-child',
          meta: {
            title: t('route.titles.menu2Child'),
          },
          component: () => import('@/view/common/Expect.vue'),
        },
      ],
    },
  ],
};
