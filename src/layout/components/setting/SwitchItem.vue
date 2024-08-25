<template>
  <div
    class="w-full pos-relative px-2.5 py-2 overflow-hidden"
    :class="{ 'cursor-not-allowed': disabled }"
    :style="{ borderRadius: `${themeToken.borderRadius}px` }"
    @mouseover="showMask = true"
    @mouseleave="showMask = false"
  >
    <div
      v-if="showMask"
      class="bg-#f4f4f5 dark:bg-#2e3034 pos-absolute top-0 left-0 w-full h-full"
      @click="handleClick"
    />
    <div class="flex items-center justify-between">
      <div class="text-3.5 z-1">{{ label }}</div>
      <slot>
        <a-switch v-model:checked="modelValue" :disabled></a-switch>
      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { theme } from 'ant-design-vue';

  const { useToken } = theme;
  const themeToken = useToken().token;

  const slots = useSlots();

  const props = defineProps({
    label: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  });
  const emits = defineEmits(['click']);

  const modelValue = defineModel({ type: Boolean, default: false });

  const showMask = ref(false);
  const handleClick = async () => {
    if (props.disabled) return;
    if (typeof slots?.default !== 'function') {
      modelValue.value = !modelValue.value;
      await nextTick();
      emits('click', modelValue.value);
      return;
    }
    emits('click');
  };
</script>

<style lang="scss" scoped></style>
