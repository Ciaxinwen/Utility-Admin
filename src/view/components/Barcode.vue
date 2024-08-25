<template>
  <PageWrapper title="条形码示例" sub-title="基于jsbarcode" dense>
    <div class="w-full flex justify-between flex-wrap">
      <svg id="barcode1"></svg>
      <canvas id="barcode2"></canvas>
      <img id="barcode3" />
    </div>
  </PageWrapper>
</template>

<script lang="ts" setup>
  import JsBarcode from 'jsbarcode';

  onMounted(() => {
    JsBarcode('#barcode1', 'CODE128', {
      format: 'CODE128',
      width: 4,
      displayValue: true,
      background: '#f1f1f1',
    });
    JsBarcode('#barcode2', 'CODE39', {
      format: 'CODE39',
      lineColor: '#0aa',
      width: 4,
      height: 80,
      displayValue: true,
    });
    JsBarcode('#barcode3', 'utility', {
      lineColor: '#0960bd',
      width: 4,
      height: 80,
      displayValue: true,
    });
  });
</script>

<style lang="scss" scoped></style>
