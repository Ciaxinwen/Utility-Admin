<template>
  <div ref="mapRef" class="w-full" :style="{ height: fullHeight }"></div>
</template>

<script lang="ts" setup>
  import { useFullHeight } from '@/hook/setting/useFullHeight';
  import AMapLoader from '@amap/amap-jsapi-loader';

  const { fullHeight } = useFullHeight();
  const mapRef = ref<HTMLDivElement>();

  let map: any;
  onMounted(() => {
    window._AMapSecurityConfig = {
      securityJsCode: 'e9d0a780bfd87cc0185c2391c0b8276e',
    };
    AMapLoader.load({
      key: 'e2594cb4eaad806c707be70ada037cb4',
      version: '1.4.15',
      plugins: ['AMap.Scale'],
    })
      .then((AMap) => {
        map = new AMap.Map(unref(mapRef), {
          viewMode: '3D', // 是否为3D地图模式
          zoom: 11,
          center: [116.397428, 39.90923],
        });
      })
      .catch((e) => {
        console.log(e);
      });
  });

  onUnmounted(() => {
    map?.destroy();
  });
</script>

<style lang="scss" scoped></style>
