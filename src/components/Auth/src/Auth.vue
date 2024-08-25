<template>
  <template v-if="hasPermission(code)">
    <slot />
  </template>
</template>

<script lang="ts" setup>
  import { usePermission } from '@/hook/web/usePermission';
  import { PropType } from 'vue';

  defineProps({
    code: {
      type: [String, Array<String>] as PropType<string | string[]>,
      default: '',
    },
  });

  const { hasPermission } = usePermission();
</script>

<style lang="scss" scoped></style>
