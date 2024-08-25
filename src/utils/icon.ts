/**
 * @description: 获取项目中所有svg图标name
 * @return {*} SvgIconNames
 */
export const getSvgNames = () => {
  const SvgIconNames = [];
  const SvgIconFiles = import.meta.glob('@/assets/svg/icon/*.svg', { eager: true });
  for (const key in SvgIconFiles) {
    SvgIconNames.push({ path: key, name: key.split('/').at(-1)?.split('.')[0] });
  }
  return SvgIconNames;
};

/**
 * @description: 转换iconName
 * @param {string} iconName
 * @return {*}
 */
export const transformIconData = (iconName: string) => {
  return {
    type: iconName.split(':')[0],
    icon: iconName.split(':')[1],
  };
};
