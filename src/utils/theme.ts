import { useCssVar } from '@vueuse/core';

/**
 * @description: 设置系统主题色
 * @param {string} color 主题色
 */
export const setThemeColor = (color: string) => {
  const app = document.documentElement;
  const theme = useCssVar('--el-color-primary', app);
  theme.value = color;
};
