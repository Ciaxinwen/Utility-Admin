import { type RouteRecordRaw } from 'vue-router';
import { t } from '@/locales';

export const AboutRoutes: RouteRecordRaw = {
  path: 'about',
  name: 'about',
  component: () => import('@/view/about/index.vue'),
  meta: {
    title: t('route.titles.about'),
  },
};
