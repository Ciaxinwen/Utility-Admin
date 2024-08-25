import type { App, Component, Plugin } from 'vue';

export const withInstall = <T>(component: T) => {
  const comp = component as any;
  comp.install = (app: App) => {
    app.component(comp.name || comp.displayName, component as Component);
  };
  return component as Plugin;
};
