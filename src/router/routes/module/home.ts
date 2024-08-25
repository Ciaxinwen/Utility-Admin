import { type RouteRecordRaw } from 'vue-router';
import { t } from '@/locales';

/* 主页路由配置 */
export const HomeRoutes: RouteRecordRaw = {
  path: 'home',
  name: 'home',
  component: () => import('@/view/home/index.vue'),
  meta: {
    title: t('route.titles.home'),
  },
};
