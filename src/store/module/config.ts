import { getDefaultConfig } from '@/config';
import { defineStore } from 'pinia';
import { theme as antTheme, message } from 'ant-design-vue';
import { useColorMode, useCssVar } from '@vueuse/core';
import { useStorage } from '@vueuse/core';
import { StorgeKeys } from '@/enum/storgeKeys';
import copyText from '@/utils/copyText';
import { store } from '..';
import { Theme, Layout } from '@/enum/system';

export const useConfigStore = defineStore('config', () => {
  const { defaultAlgorithm, darkAlgorithm, compactAlgorithm } = antTheme;
  const config = useStorage<Configurations>(StorgeKeys.SYS_CONFIG, getDefaultConfig());
  const themtMode = useColorMode();

  // ant-design-vue 主题配置
  const getThemeConfig = computed<any>(() => {
    document.documentElement.setAttribute('data-themeColor', config.value.themeColor);
    return {
      token: {
        colorPrimary: config.value.themeColor,
        borderRadius: config.value.borderRadius,
        colorSuccess: config.value.successColor,
        colorError: config.value.errorColor,
        colorWarning: config.value.warnColor,
      },
      algorithm: [themtMode.value === 'light' ? defaultAlgorithm : darkAlgorithm],
      // compactAlgorithm
    };
  });

  const getThemeMode = computed(() => themtMode.value);

  function toggleGrayMode(bool: boolean) {
    bool ? document.body.classList.add('html-grey') : document.body.classList.remove('html-grey');
  }

  function toggleWeaknessMode(bool: boolean) {
    bool
      ? document.body.classList.add('html-weakness')
      : document.body.classList.remove('html-weakness');
  }

  function copyConfigAboutJson() {
    copyText(JSON.stringify(config.value));
  }

  function resetConfig() {
    config.value = getDefaultConfig();
    message.success('已重置');
  }

  watchEffect(() => {
    if (themtMode.value === Theme.LIGHT && config.value.layoutMode === Layout.TOP) {
      config.value.lightSidebar = true;
    }
    themtMode.value = config.value.theme;
    toggleGrayMode(config.value.isGrayMode);
    toggleWeaknessMode(config.value.isColorWeaknessMode);
    const themeColor = useCssVar('--theme-color');
    themeColor.value = config.value.themeColor;
  });

  return {
    config,
    getThemeConfig,
    copyConfigAboutJson,
    resetConfig,
    getThemeMode,
  };
});

export const useConfigStoreHook = () => {
  return useConfigStore(store);
};
