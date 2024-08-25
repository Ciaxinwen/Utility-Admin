import { set } from 'lodash';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import en from 'ant-design-vue/es/locale/en_US';

const zhModules = import.meta.glob('./zh/*.json', { eager: true });
const enModules = import.meta.glob('./en/*.json', { eager: true });

const generateMessage = (langs: Record<string, any>) => {
  const messages: Record<string, any> = {};
  Object.keys(langs).forEach((path) => {
    const fileName = path.split('/').pop();
    const moduleName = fileName?.split('.')[0] as string;
    set(messages, moduleName, langs[path].default);
  });

  return messages;
};

export default {
  zh: { ...generateMessage(zhModules), ant: zhCN },
  en: { ...generateMessage(enModules), ant: en },
};
