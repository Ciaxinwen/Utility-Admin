import { type RouteRecordRaw } from 'vue-router';
import { t } from '@/locales';

export const DocumentRoutes: RouteRecordRaw = {
  path: '/document',
  name: 'document',
  redirect: { name: 'project' },
  meta: {
    title: t('route.titles.document'),
  },
  children: [
    {
      path: 'project',
      name: 'project',
      component: () => import('@/view/common/Iframe.vue'),
      props: {
        url: 'https://www.antdv.com/',
      },
      meta: {
        title: t('route.titles.project'),
      },
    },
    {
      path: 'project-link',
      name: 'project-link',
      component: () => import('@/view/common/Expect.vue'),
      meta: {
        title: t('route.titles.project-link'),
      },
    },
    {
      path: 'ant-design-vue',
      name: 'ant-design-vue',
      component: () => import('@/view/common/Iframe.vue'),
      props: {
        url: 'https://www.antdv.com/',
      },
      meta: {
        title: t('route.titles.antdv'),
      },
    },
  ],
};
