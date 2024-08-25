import { useCssVar } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { useConfigStore } from '@/store/module/config';
import { isValidPixel } from '@/utils/pixel';

/**
 * @description: 获取可视区可用最大高度
 * @return {*}
 */
export const useFullHeight = () => {
  const configStore = useConfigStore();
  const { config } = storeToRefs(configStore);

  const layoutHeaderH = useCssVar('--layout-header-height');
  const layoutFooterH = useCssVar('--layout-footer-height');
  const layoutTabH = useCssVar('--layout-tab-height');
  const layoutContentP = useCssVar('--layout-content-padding');

  const fullHeight = ref('auto');
  const oHeight = ref('0px');

  function setOtherHeight(otherHeight: number | string | Ref<number | string> = 0) {
    if (typeof otherHeight === 'string') {
      oHeight.value = isValidPixel(unref(otherHeight)) ? otherHeight : '0px';
    } else if (typeof otherHeight === 'number') {
      oHeight.value = otherHeight + 'px';
    }
  }

  watch(
    () => [config.value.showFooter, oHeight.value],
    ([showFooter]) => {
      fullHeight.value = `calc(100vh - ${layoutHeaderH.value + `${showFooter ? ` - ${layoutFooterH.value}` : ''}`} - ${layoutTabH.value} - 2 * ${layoutContentP.value} - ${oHeight.value})`;
    },
    {
      immediate: true,
    },
  );

  return { fullHeight, setOtherHeight };
};
