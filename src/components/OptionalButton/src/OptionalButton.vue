<template>
  <div
    v-bind="$attrs"
    class="optional-button inline-block w-max rounded-2xl px-3 h-30px line-height-30px cursor-pointer bg-#f2f3f5 dark:bg-#464646 color-#9791aa"
    :style="activeStyle"
    @click="handleClick"
  >
    <span class="optional-button__text transition-all hover:opacity-85">
      <slot />
    </span>
  </div>
</template>

<script lang="ts" setup>
  import { theme } from 'ant-design-vue';
  import { CSSProperties } from 'vue';

  const { useToken } = theme;
  const themeToken = useToken().token;

  const props = defineProps({
    value: { type: [String, Number], default: '' },
  });
  const emits = defineEmits(['change']);
  const activeVal = inject<Ref<string | number>>('activeVal');

  const isActive = computed(() => activeVal?.value === props.value);
  const activeStyle = computed<CSSProperties>(() => {
    return isActive.value
      ? {
          backgroundColor: themeToken.value.colorPrimaryBgHover,
          color: themeToken.value.colorPrimaryText,
        }
      : {};
  });

  const handleClick = () => {
    emits('change', props.value);
  };
</script>

<style lang="scss" scoped></style>
