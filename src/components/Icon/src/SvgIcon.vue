<template>
  <svg :class="svgClass" v-bind="$attrs" :style="iconStyle">
    <!-- use 元素在 SVG 文档内取得目标节点，并在别的地方复制它们 -->
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script lang="ts" setup>
  import { type CSSProperties } from 'vue';

  defineOptions({ name: 'SvgIcon' });

  interface Props {
    name: string;
    color?: string;
    size?: number;
  }

  const props = withDefaults(defineProps<Props>(), {
    color: '',
    size: 24,
  });

  const iconName = computed(() => `#icon-${props.name}`);
  const svgClass = computed(() => {
    if (props.name) return `svg-icon icon-${props.name}`;
    return 'svg-icon';
  });
  const iconStyle = computed<CSSProperties>(() => ({
    width: `${props.size}px`,
    height: `${props.size}px`,
    color: props.color,
  }));
</script>

<style lang="scss" scoped>
  .svg-icon {
    overflow: hidden;
    vertical-align: middle;
    fill: currentcolor;
  }
</style>
