<template>
  <PageWrapper contentClass="flex flex-col gap-4" dense>
    <a-card shadow-sm>
      <div ref="chartRef1" class="h-40vh"></div>
    </a-card>
    <a-card shadow-sm>
      <div ref="chartRef2" class="h-40vh"></div>
    </a-card>
    <a-card shadow-sm>
      <div ref="chartRef3" class="h-40vh"></div>
    </a-card>
    <div class="flex justify-between gap-4">
      <a-card flex-1 shadow-sm>
        <div ref="chartRef4" class="h-40vh"></div>
      </a-card>
      <a-card flex-1 shadow-sm>
        <div ref="chartRef5" class="h-40vh"></div>
      </a-card>
    </div>
    <div class="flex justify-between gap-4">
      <a-card flex-1 shadow-sm>
        <div ref="chartRef6" class="h-40vh"></div>
      </a-card>
      <a-card flex-1 shadow-sm>
        <div ref="chartRef7" class="h-40vh"></div>
      </a-card>
    </div>
  </PageWrapper>
</template>

<script lang="ts" setup>
  import { useECharts } from '@/hook/web/useECharts';
  import {
    lineOption,
    barOption,
    pieOption,
    radarOption,
    scatterOption,
    gaugeOption,
    sunburstOption,
  } from './options';

  const chartRef1 = ref();
  const chartRef2 = ref();
  const chartRef3 = ref();
  const chartRef4 = ref();
  const chartRef5 = ref();
  const chartRef6 = ref();
  const chartRef7 = ref();

  const { setOptions: setOptions1 } = useECharts(chartRef1);
  const { setOptions: setOptions2 } = useECharts(chartRef2);
  const { setOptions: setOptions3 } = useECharts(chartRef3);
  const { setOptions: setOptions4 } = useECharts(chartRef4);
  const { setOptions: setOptions5 } = useECharts(chartRef5);
  const { setOptions: setOptions6 } = useECharts(chartRef6);
  const { setOptions: setOptions7 } = useECharts(chartRef7);

  onMounted(() => {
    setOptions1(lineOption);
    setOptions2(barOption);
    setOptions3(scatterOption);
    setOptions4(radarOption);
    setOptions5(pieOption);
    setOptions6(gaugeOption);
    setOptions7(sunburstOption);
  });
</script>

<style lang="scss" scoped></style>
