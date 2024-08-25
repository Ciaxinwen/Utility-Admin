import { Spin } from 'ant-design-vue';
import { SpinSize } from 'ant-design-vue/es/spin/Spin';
import { render, type Directive, type DirectiveBinding } from 'vue';

interface Modifiers {
  upperStory: boolean;
  fullscreen: boolean;
}

enum LoadingAttrs {
  TIP = 'loading-tip',
  BACKGROUND = 'loading-background',
  CUSTOM_CLASS = 'loading-custom-class',
  SIZE = 'loading-size',
}

const maskClassName = 'utility-loading-mask';

function isVaildSpinSize(str: string): str is SpinSize {
  return ['small', 'default', 'large'].includes(str);
}

function getAttrs(el: HTMLElement): string[] {
  return [
    el.getAttribute(LoadingAttrs.TIP) || '',
    el.getAttribute(LoadingAttrs.BACKGROUND) || '',
    el.getAttribute(LoadingAttrs.CUSTOM_CLASS) || '',
    el.getAttribute(LoadingAttrs.SIZE) || 'default',
  ];
}

function mount(el: HTMLElement, { upperStory, fullscreen }: Modifiers) {
  let ele;
  const [tip, background, customClass, size] = getAttrs(el);
  if (fullscreen) {
    ele = document.body;
  } else {
    ele = (upperStory ? el.parentElement : el) as HTMLElement;
  }
  ele.style.position = 'relative';
  ele.style.overflow = 'hidden';
  let maskElement: HTMLDivElement | null = ele.querySelector(`.${maskClassName}`);
  if (!maskElement) {
    maskElement = document.createElement('div');
    maskElement.className = maskClassName;
    ele.appendChild(maskElement);
  }
  maskElement.style.backgroundColor = background;

  render(
    h(Spin, {
      spinning: true,
      size: isVaildSpinSize(size) ? size : 'default',
      tip,
      class: customClass,
    }),
    maskElement,
  );
}

function unmount(el: HTMLElement, { upperStory, fullscreen }: Modifiers) {
  let ele;
  if (fullscreen) {
    ele = document.body;
  } else {
    ele = (upperStory ? el.parentElement : el) as HTMLElement;
  }
  const loadingNode = ele.querySelector(`.${maskClassName}`) as Node;
  if (loadingNode) {
    ele.style.position = 'static';
    ele.style.overflow = 'auto';
    ele.removeChild(loadingNode);
  }
}

/**
 * @description: 加载效果
 * tips: 设置了fullscreen会忽略upperStory
 * binding.modifiers.upperStory 是否向上层元素挂载
 * binding.modifiers.fullscreen 全屏loading效果
 */
export const loading: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const { value } = binding;
    const { upperStory, fullscreen } = binding.modifiers;
    value && mount(el, { upperStory, fullscreen });
  },
  updated(el: HTMLElement, binding: DirectiveBinding) {
    const { value } = binding;
    const { upperStory, fullscreen } = binding.modifiers;
    value ? mount(el, { upperStory, fullscreen }) : unmount(el, { upperStory, fullscreen });
  },
};
