import { StorgeKeys } from '@/enum/storgeKeys';
import { Response } from './type';

/**
 * @description: 验证用户是否登录（模拟）
 * @return {*}
 */
export const validToken = (): [boolean, Response | null] => {
  const token = localStorage.getItem(StorgeKeys.SYS_TOKEN) || '';
  if (!token) {
    return [
      false,
      {
        code: 401,
        msg: '未登录',
        data: null,
      },
    ];
  }
  return [true, null];
};

/**
 * @description:解析get请求参数
 * @param {string} URL
 * @return {*}
 */
export const getUrlParams = (URL: string) => {
  let url = URL.split('?')[1];
  const urlSearchParams = new URLSearchParams(url);
  const params = Object.fromEntries(urlSearchParams.entries());
  return params;
};
