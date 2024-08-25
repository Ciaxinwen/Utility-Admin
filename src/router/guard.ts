import { type Router } from 'vue-router';
import { startProgress, closeProgress } from '@/utils/nprogress';
import { i18n } from '@/locales';
import { getUserInfo } from '@/api/common';
import { useUserStoreHook } from '@/store/module/user';
import { useConfigStoreHook } from '@/store/module/config';
import { storeToRefs } from 'pinia';
import { message, notification } from 'ant-design-vue';
import { StorgeKeys } from '@/enum/storgeKeys';
import { useLocalStorage } from '@vueuse/core';
import { treeToList } from '@/utils/tree';
import { ConstantRoutes } from './routes/constant';
import { useSystemTitle } from '@/hook/web/useSystemTitle';

type Transform = (k: string) => string;

const constantRouteNames = new Set();
(function getConstantRouteNames(raw = []) {
  raw.forEach((item) => {
    item.name && constantRouteNames.add(item.name);
    if (item.children?.length) getConstantRouteNames(item.children);
  });
})(ConstantRoutes);

export const createGuard = (router: Router) => {
  const transformTitle = i18n.global.t as Transform;

  const userStore = useUserStoreHook();
  const configStore = useConfigStoreHook();
  const { userInfo, token } = storeToRefs(userStore);
  const { config } = storeToRefs(configStore);
  const storageAboutMenus = useLocalStorage<SystemMenuItem[]>(StorgeKeys.MENU_DATA, []);
  const { setTitle } = useSystemTitle();

  router.beforeEach(async (to, from, next) => {
    config.value.enableProgress && startProgress();
    if (config.value.dynamicTitle) {
      setTitle(transformTitle(to.meta.title || ''));
    }

    if (token.value) {
      if (to.fullPath !== '/login') {
        const res = await getUserInfo();
        userInfo.value = res.data;
        if (from.fullPath === '/login') {
          notification.success({
            message: '登录成功',
            description: `欢迎回来，${res.data.name}`,
          });
        }
        const homePage = router
          .getRoutes()
          .find((r) => storageAboutMenus.value.find((item) => item.isHomePage)?.path === r.path);
        if (
          storageAboutMenus.value.length &&
          ![homePage?.name, ...constantRouteNames].includes(to.name as string)
        ) {
          // 过滤出拥有权限的菜单项
          const menuList = treeToList({ treeData: storageAboutMenus.value as any[] });
          const hasPermission = menuList.some((item: any) => item.path === to.fullPath);
          if (!hasPermission) {
            message.error('暂无页面权限，请联系管理员');
            return next('/');
          }
        }
        return next();
      }
      next();
    } else {
      if (to.fullPath !== '/login') {
        notification.error({ message: '请重新登录' });
        next('/login');
        return;
      }
      next();
    }
  });

  router.afterEach(() => {
    config.value.enableProgress && closeProgress();
    // console.log('after');
  });
};
