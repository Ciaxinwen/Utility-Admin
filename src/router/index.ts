import { createRouter, createWebHashHistory, createWebHistory, RouterHistory } from 'vue-router';
import { App } from 'vue';
import { routes } from './routes/routes';
import { ConstantRoutes } from './routes/constant';
import { createGuard } from './guard';

const { VITE_BASE_URL, VITE_ROUTER_MODE } = import.meta.env;

const routerHistoryModeMap: Record<RouterHistoryMode, (base?: string) => RouterHistory> = {
  hash: createWebHashHistory,
  history: createWebHistory,
};

export const router = createRouter({
  history: routerHistoryModeMap[VITE_ROUTER_MODE](VITE_BASE_URL),
  routes: [...routes, ...ConstantRoutes],
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

export const setupRouter = (app: App) => {
  createGuard(router);
  app.use(router);
};
