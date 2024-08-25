import { createApp } from 'vue';
import './styles/index.scss';
import 'ant-design-vue/dist/reset.css';
import '@unocss/reset/normalize.css';
import App from './App.vue';
import 'virtual:uno.css';
import 'virtual:svg-icons-register';
import * as AntIcons from '@ant-design/icons-vue';
import { setupI18n } from './locales';
import { setupStore } from './store';
import { setupDirectives } from './directives';
import { registerGlobalComp } from './components/registerGlobalComp';
import { setupRouter } from './router';
import './mock';

const app = createApp(App);

const icons: any = AntIcons;
for (const key in AntIcons) {
  app.component(key, icons[key]);
}
app.provide('AntIcons', AntIcons);

setupStore(app);
setupI18n(app);
setupRouter(app);
setupDirectives(app);
registerGlobalComp(app);

app.mount('#app');
