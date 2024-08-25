import { type RouteRecordRaw } from 'vue-router';

/**
 * @description: 判断是否有子路由
 * @param {*} route
 * @return {*}
 */
export const isHasSubRoute = (route: RouteRecordRaw) => Boolean(route.children?.length);
