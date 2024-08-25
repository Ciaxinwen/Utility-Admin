<template>
  <div class="page-wrapper flex flex-col gap-3">
    <PageHeader ref="pageHeaderRef" v-if="showHeader" :title :subTitle>
      <component :is="$slots.header" />
    </PageHeader>
    <div
      class="rounded-1.5 transition-all"
      :class="[
        contentClass,
        dense ? '' : 'p-5',
        defaultBgColor ? 'bg-[var(--common-bg-color)] shadow-sm' : '',
      ]"
      :style="{ height: contentHeight }"
    >
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import PageHeader from './PageHeader.vue';
  import { useFullHeight } from '@/hook/setting/useFullHeight';

  defineOptions({ name: 'PageWrapper' });

  const props = defineProps({
    title: { type: String, default: '' },
    subTitle: { type: String, default: '' },
    contentFullHeight: { type: Boolean, default: false },
    dense: { type: Boolean, default: false },
    contentClass: { type: String, default: '' },
    defaultBgColor: { type: Boolean, default: false },
  });

  const $slot = useSlots();
  const showHeader = computed(() => $slot?.header || props.title || props.subTitle);

  const pageHeaderRef = ref();

  const { fullHeight, setOtherHeight } = useFullHeight();
  const contentHeight = computed(() => {
    pageHeaderRef.value?.getHeight() &&
      setOtherHeight(pageHeaderRef.value?.getHeight() + (showHeader.value ? 12 : 0));
    if (props.contentFullHeight) {
      return fullHeight.value;
    }
    return 'auto';
  });
</script>

<style lang="scss" scoped></style>
