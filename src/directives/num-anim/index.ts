import type { Directive, DirectiveBinding } from 'vue';

/**
 * @description: 数字动画指令 用法：<span v-num-anim:步长="[动画时长，分隔符]">值</span>
 */
export const numAnim: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const duration = Number(binding.value[0]) || 1000;
    const separator = binding.value[1] || ',';
    const rate = Number(binding.arg) || 30;
    const count = Number(el.innerText);
    let _count = 0;
    const step = (count / duration) * rate;

    const numPoint = count.toString().split('.')?.[1];
    let fixed = numPoint ? numPoint.length : 0;

    const generateNum = (num: number) => {
      const splitRes = num.toFixed(fixed).split('.');
      let int = splitRes[0].split('').reverse();
      const float = splitRes[1];
      let arr = [];
      for (let i = 0; i < int.length; i++) {
        if (!(i % 3) && i) arr.push(separator);
        arr.push(int[i]);
      }
      return arr.reverse().join('') + (float ? `.${float}` : '');
    };

    let timer: NodeJS.Timeout | null = setInterval(() => {
      if (_count > count) {
        _count = count;
        el.innerText = generateNum(_count);
        clearInterval(timer as NodeJS.Timeout);
        timer = null;
        return;
      }
      _count = _count + step;
      el.innerText = generateNum(_count);
    }, rate);
  },
};
