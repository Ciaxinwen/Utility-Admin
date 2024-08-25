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
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: [...new Array(24)].map((_, index) => `${index}:00`),
      },
      yAxis: {
        name: '人次',
        type: 'value',
        nameTextStyle: {
          padding: [0, 0, 10, -20],
        },
      },
      grid: { left: '1%', right: '1%', top: '15%', bottom: '3%', containLabel: true },
      series: [
        {
          data: [
            4564, 7489, 10041, 9949, 11141, 22242, 44000, 18000, 33333, 55555, 66666, 33333, 14000,
            36000, 66666, 44444, 22222, 11111, 4000, 1000, 5000, 3333, 2222, 1111,
          ],
          type: 'line',
          smooth: true,
          areaStyle: {
            opacity: 0.5,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 1,
                color: 'rgb(142, 235, 253)',
              },
              {
                offset: 0,
                color: 'rgb(76, 125, 255)',
              },
            ]),
          },
          itemStyle: {
            color: '#5ab1ef',
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
