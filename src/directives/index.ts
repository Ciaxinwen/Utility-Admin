import { App, Directive } from 'vue';
import { numAnim } from './num-anim';
import { auth } from './auth';
import { loading } from './loading';

const directives: Record<string, Directive> = { numAnim, auth, loading };

export const setupDirectives = (app: App) => {
  Object.keys(directives).forEach((key: string) => {
    app.directive(key, directives[key]);
  });
};
