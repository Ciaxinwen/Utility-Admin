/**
 * @description: 判断是否是合法的像素值
 * @param {string} str
 * @return {*}
 */
export function isValidPixel(str: string) {
  const pattern = /^\d+px$/;
  if (pattern.test(str)) {
    return true;
  } else {
    throw new Error('Invalid pixel');
  }
}
