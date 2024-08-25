<template>
  <div
    ref="pageHeaderRef"
    v-if="isShow"
    class="page-header bg-[var(--common-bg-color)] p-5 shadow-sm"
    :style="{ borderRadius: `${themeToken.borderRadius}px` }"
  >
    <slot>
      <h3 v-if="title" class="font-bold mb-0">{{ title }}</h3>
      <h4 v-if="subTitle" class="mt-4 mb-0 line-height-22px">{{ subTitle }}</h4>
    </slot>
  </div>
</template>

<script lang="ts" setup>
  import { theme } from 'ant-design-vue';

  defineOptions({ name: 'PageHeader' });

  const props = defineProps({
    title: { type: String, default: '' },
    subTitle: { type: String, default: '' },
  });

  const { useToken } = theme;
  const themeToken = useToken().token;
  const $slots = useSlots();
  const isShow = computed(() => $slots?.default || props.title || props.subTitle);

  const pageHeaderRef = ref();
  defineExpose({
    getHeight: () => pageHeaderRef.value?.offsetHeight,
  });
</script>

<style lang="scss" scoped></style>
