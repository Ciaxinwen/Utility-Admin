import { type RouteRecordRaw } from 'vue-router';
import { t } from '@/locales';

export const ChartsRoutes: RouteRecordRaw = {
  path: 'charts',
  name: 'charts',
  redirect: { name: 'echarts' },
  meta: {
    title: t('route.titles.charts'),
  },
  children: [
    {
      path: 'echarts',
      name: 'echarts',
      redirect: { name: 'index' },
      meta: {
        title: t('route.titles.echarts'),
      },
      children: [
        {
          path: 'index',
          name: 'index',
          meta: {
            title: t('route.titles.chartsGather'),
          },
          component: () => import('@/view/charts/echarts/gather/index.vue'),
        },
        {
          path: 'map',
          name: 'map',
          meta: {
            title: t('route.titles.map'),
          },
          component: () => import('@/view/charts/echarts/map/index.vue'),
        },
      ],
    },
    {
      path: 'Amap',
      name: 'Amap',
      meta: {
        title: t('route.titles.Amap'),
      },
      component: () => import('@/view/charts/map/index.vue'),
    },
  ],
};
