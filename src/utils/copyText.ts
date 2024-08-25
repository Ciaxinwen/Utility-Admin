import { message } from 'ant-design-vue';

/**
 * @description:一键复制文本
 * @param {string} text 要复制的文本
 * @param {string} info 复制成功的提示
 * @return {*}
 */
export default (text: string, info: string | null = '复制成功') => {
  if (!navigator.clipboard) {
    return message.warning('当前浏览器不支持');
  }

  navigator.clipboard
    .writeText(text)
    .then((_res) => {
      message.success(info);
    })
    .catch((err) => {
      message.error('复制失败!' + err);
    });
};
