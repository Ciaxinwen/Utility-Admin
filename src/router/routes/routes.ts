import { type RouteRecordRaw } from 'vue-router';
import {
  HomeRoutes,
  SystemRoutes,
  PageRoutes,
  ComponentsRoutes,
  FuncRoutes,
  MultilevelMenuRoutes,
  DocumentRoutes,
  AuthRoutes,
  AboutRoutes,
  ChartsRoutes,
} from './module';

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'layout',
    redirect: '/home',
    component: () => import('@/layout'),
    children: [
      HomeRoutes,
      SystemRoutes,
      PageRoutes,
      ComponentsRoutes,
      FuncRoutes,
      MultilevelMenuRoutes,
      DocumentRoutes,
      AuthRoutes,
      AboutRoutes,
      ChartsRoutes,
    ],
  },
];
