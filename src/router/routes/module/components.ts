import { type RouteRecordRaw } from 'vue-router';
import { t } from '@/locales';

export const ComponentsRoutes: RouteRecordRaw = {
  path: 'components',
  name: 'components',
  redirect: { name: 'icon' },
  meta: {
    title: t('route.titles.components'),
  },
  children: [
    {
      path: 'icon',
      name: 'icon',
      component: () => import('@/view/components/Icon.vue'),
      meta: {
        title: t('route.titles.icon'),
      },
    },
    {
      path: 'image-resizer',
      name: 'image-resizer',
      component: () => import('@/view/components/ImageResizer.vue'),
      meta: {
        title: t('route.titles.imageResizer'),
      },
    },
    {
      path: 'password-strength',
      name: 'password-strength',
      component: () => import('@/view/components/PswStrength.vue'),
      meta: {
        title: t('route.titles.pswStrength'),
      },
    },
    {
      path: 'number-animate',
      name: 'number-animate',
      component: () => import('@/view/components/NumberAnimate.vue'),
      meta: {
        title: t('route.titles.numberAnim'),
      },
    },
    {
      path: 'quarter-picker',
      name: 'quarter-picker',
      component: () => import('@/view/components/QuarterPicker.vue'),
      meta: {
        title: t('route.titles.quarterPicker'),
      },
    },
    {
      path: 'barcode',
      name: 'barcode',
      component: () => import('@/view/components/Barcode.vue'),
      meta: {
        title: t('route.titles.barcode'),
      },
    },
    {
      path: 'ellipsis',
      name: 'ellipsis',
      component: () => import('@/view/components/Ellipsis.vue'),
      meta: {
        title: t('route.titles.ellipsis'),
      },
    },
    //     {
    //       path: 'tableTransfer',
    //       name: 'tableTransfer',
    //       component: () => import('@/view/components/tableTransfer.vue'),
    //       meta: {
    //         title: t('route.titles.tableTransfer'),
    //       },
    //     },
    {
      path: 'markdown-editor',
      name: 'markdown-editor',
      meta: {
        title: t('route.titles.markdownEditor'),
      },
      component: () => import('@/view/components/Markdown.vue'),
    },
    {
      path: 'richText-editor',
      name: 'richText-editor',
      meta: {
        title: t('route.titles.richText'),
      },
      component: () => import('@/view/components/RichText.vue'),
    },
  ],
};
