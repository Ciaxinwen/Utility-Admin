<template>
  <div ref="chartRef" class="h-70vh" :style="{ height: fullHeight }"></div>
</template>

<script lang="ts" setup>
  import { useFullHeight } from '@/hook/setting/useFullHeight';
  import { useECharts } from '@/hook/web/useECharts';
  import { provinceData } from './data';

  const { fullHeight } = useFullHeight();
  const chartRef = ref();
  const { setOptions } = useECharts(chartRef);

  onMounted(() => {
    setOptions({
      title: {
        text: '全国地图大数据',
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
      },
      visualMap: [
        {
          type: 'continuous',
          min: 0,
          max: 2500,
          left: 'left',
          top: 'bottom',
          text: ['高', '低'],
          calculable: true,
          seriesIndex: 0,
          inRange: {
            color: ['#c4edfb', '#abd9e9', '#74add1', '#0a74de'],
          },
        },
      ],
      geo: {
        map: 'china',
        roam: false,
        zoom: 1.15,
        center: [105, 36],
        itemStyle: {
          areaColor: '#f5f2f2',
          borderColor: '#835f5f',
          shadowColor: '#0f4c74',
          shadowOffsetX: 0,
          shadowOffsetY: 10,
          shadowBlur: 2,
        },
      },
      series: [
        {
          name: '产量',
          map: 'china',
          type: 'map',
          roam: false,
          zoom: 1.15,
          center: [105, 36],
          itemStyle: {
            areaColor: '#f5f2f2',
            borderColor: '#835f5f',
          },
          label: {
            show: true,
            fontSize: '11.5',
            color: 'rgb(107,102,102)',
          },
          emphasis: {
            itemStyle: {
              areaColor: '#328ad9',
            },
            label: {
              show: true,
              color: 'rgb(255,255,255)',
            },
          },
          data: provinceData,
        },
        {
          name: 'Top 4',
          type: 'effectScatter',
          coordinateSystem: 'geo',
          data: [
            {
              name: '北京',
              value: [116.46, 39.92, 666],
            },
            {
              name: '上海',
              value: [121.48, 31.22, 666],
            },
            {
              name: '广州',
              value: [113.23, 23.16, 666],
            },
            {
              name: '深圳',
              value: [114.07, 22.62, 666],
            },
          ],
          symbolSize: 15,
          tooltip: {
            show: true,
          },
          encode: {
            value: 2,
          },
          showEffectOn: 'render',
          rippleEffect: {
            brushType: 'stroke',
            color: '#fc5733',
            period: 8,
            scale: 4,
          },
          label: {
            formatter: '{b}',
            position: 'right',
            show: true,
          },
          itemStyle: {
            color: '#fc5733',
            shadowBlur: 2,
            shadowColor: '#333',
          },
          zlevel: 1,
        },
      ],
    });
  });
</script>

<style lang="scss" scoped></style>
