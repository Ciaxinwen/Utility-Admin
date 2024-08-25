/**
 * @description: 阿拉伯数字转换成中文数字
 * @param {*} num number
 * @return {*}
 */
export function toChineseNum(num: number) {
  const chineseNum = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
  const unit = ['十', '百', '千', '万', '亿'];
  let str = num.toString();
  let result = '';
  let zero = false;
  for (let i = 0; i < str.length; i++) {
    let n = parseInt(str[i]);
    if (n === 0) {
      if (!zero) {
        result += chineseNum[n];
        zero = true;
      }
    } else {
      result += chineseNum[n] + (i > 0 ? unit[Math.floor((str.length - i - 1) / 4)] : '');
      zero = false;
    }
  }
  return result;
}
