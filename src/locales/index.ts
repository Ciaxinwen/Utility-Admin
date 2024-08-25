import { App } from 'vue';
import { createI18n } from 'vue-i18n';
import { useLocalStorage } from '@vueuse/core';
import { get } from 'lodash';
import messages from './lang/export';
import { Locale } from '@/enum/system';
import { StorgeKeys } from '@/enum/storgeKeys';

const generateI18n = (): ReturnType<typeof createI18n> => {
  const lang = useLocalStorage(StorgeKeys.SYS_LANG, Locale.ZH);
  const options = {
    locale: unref(lang), // 设置当前语言类型
    legacy: false, // 如果要支持compositionAPI，此项必须设置为false;
    globalInjection: true, // 全局注册$t方法
    fallbackLocale: 'zh',
    messages,
  };
  return createI18n(options);
};

export const i18n = generateI18n();

/**
 * @description: 加强获取国际化文本方法
 * @param {T} key 文本属性值
 * @return {*} 国际化文本
 */
export function transformI18n(key: string | undefined) {
  if (typeof key === 'undefined') return '';
  const { messages, locale } = i18n.global;
  return get(unref(messages)[unref(locale as Locale)], key);
}

/** 此函数只是配合i18n Ally插件来进行国际化智能提示，并无实际意义（只对提示起作用） */
export const t = (key: string) => key;

export const setupI18n = (app: App) => {
  app.use(i18n);
};
