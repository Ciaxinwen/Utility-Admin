import type { EChartsOption } from 'echarts';
import echarts from '@/utils/lib/echarts';
import { useConfigStore } from '@/store/module/config';
import { storeToRefs } from 'pinia';
import { cloneDeep, debounce } from 'lodash';
import { useEventListener } from '@vueuse/core';

export const useECharts = (
  el: HTMLDivElement | Ref<HTMLDivElement>,
  theme: 'light' | 'dark' | 'default' = 'default',
) => {
  let chartInstance: echarts.ECharts | null = null;
  const cacheOptions = ref({}) as Ref<EChartsOption>;
  let removeEventListener = () => {};

  const configStore = useConfigStore();
  const { getThemeMode: getSysThemeMode, config } = storeToRefs(configStore);

  const getThemeMode = computed(() => {
    return theme === 'default' ? getSysThemeMode.value : theme;
  });
  const getOptions = computed(() => {
    return {
      backgroundColor: 'transparent',
      ...unref(cacheOptions),
    };
  });

  function initCharts(t = theme) {
    if (!el || !unref(el)) {
      return;
    }

    chartInstance = echarts.init(unref(el), t);
    const cleanup = useEventListener('resize', resize);
    removeEventListener = cleanup;
  }

  function setOptions(options: EChartsOption, clear = true) {
    cacheOptions.value = cloneDeep(options);

    nextTick(() => {
      setTimeout(() => {
        if (!chartInstance) {
          initCharts(getThemeMode.value);
          if (!chartInstance) return;
        }
        clear && chartInstance.clear();
        chartInstance.setOption(getOptions.value);
      }, 50);
    });
  }

  function resize() {
    chartInstance?.resize({
      animation: { duration: 300 },
    });
  }

  watch(
    () => getSysThemeMode.value,
    (newVal) => {
      if (chartInstance) {
        chartInstance.dispose();
        removeEventListener();
        initCharts(newVal);
        setOptions(getOptions.value);
      }
    },
  );

  watch(
    () => [config.value.siderWidth, config.value.isSiderCollapsed, config.value.showFooter],
    debounce(resize, 300),
  );

  onUnmounted(() => {
    if (!chartInstance) return;
    chartInstance.dispose();
    removeEventListener();
    chartInstance = null;
  });

  return {
    setOptions,
    resize,
    echarts,
  };
};
