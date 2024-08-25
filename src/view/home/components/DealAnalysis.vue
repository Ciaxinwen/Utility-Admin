<template>
  <div v-loading.upperStory="loading" ref="chartRef" class="h-xs"></div>
</template>

<script lang="ts" setup>
  import { useECharts } from '@/hook/web/useECharts';
  import echarts from '@/utils/lib/echarts';

  const loading = ref(true);
  const chartRef = ref();

  const { setOptions } = useECharts(chartRef);

  function render() {
    setOptions({
      tooltip: {
        trigger: 'axis',
      },
      grid: { left: '1%', right: '1%', top: '15%', bottom: '3%', containLabel: true },
      xAxis: {
        type: 'category',
        data: [...new Array(12)].map((_item, index) => `${index + 1}月`),
      },
      yAxis: {
        name: '万元',
        type: 'value',
        nameTextStyle: {
          padding: [0, 0, 10, -20],
        },
        max: 8000,
        splitNumber: 4,
      },
      series: [
        {
          data: [3000, 1000, 3333, 5000, 3200, 4200, 3200, 2100, 3000, 5100, 6000, 3200, 4800],
          type: 'bar',
          barMaxWidth: 50,
          itemStyle: {
            borderRadius: [4, 4, 0, 0],
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 1,
                color: '#9ee6b8',
              },
              {
                offset: 0,
                color: '#36a37d',
              },
            ]),
          },
        },
      ],
    });
  }

  setTimeout(() => {
    loading.value = false;
    render();
  }, 1500);
</script>

<style lang="scss" scoped></style>
