<template>
  <div
    class="optional-button-group flex gap-3"
    :class="{ 'flex-col': mode === 'vertical', 'items-center': mode === 'horizontal' }"
  >
    <OptionalButton
      v-for="item in options"
      :key="item.value"
      :value="item.value"
      @change="hanldeItemChange"
    >
      {{ item.label }}
    </OptionalButton>
  </div>
</template>

<script lang="ts" setup>
  import { PropType } from 'vue';
  import OptionalButton from './OptionalButton.vue';

  export interface OptionsItem {
    label: string;
    value: string | number;
  }
  export type Mode = 'horizontal' | 'vertical';

  const activeVal = defineModel<string | number>('value', { default: '' });
  defineProps({
    options: { type: Array as PropType<OptionsItem[]>, default: () => [] },
    mode: { type: String as PropType<Mode>, defualt: 'horizontal' },
  });
  const emits = defineEmits(['change']);

  const hanldeItemChange = (val: string | number) => {
    activeVal.value = val;
    emits('change', val);
  };

  provide('activeVal', activeVal);
</script>

<style lang="scss" scoped></style>
