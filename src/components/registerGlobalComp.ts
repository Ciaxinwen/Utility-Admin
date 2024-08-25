import { App } from 'vue';
import { SvgIcon } from './Icon';
import { PageHeader, PageWrapper } from './Page';
import { Auth } from './Auth';

const components = [SvgIcon, PageHeader, PageWrapper, Auth];

/**
 * @description: 注册全局组件
 * @param {App} app
 * @return {*}
 */
export const registerGlobalComp = (app: App) => {
  components.forEach((component) => {
    app.use(component);
  });
};
