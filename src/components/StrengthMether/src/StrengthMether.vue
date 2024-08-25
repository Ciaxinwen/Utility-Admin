<template>
  <div class="strength-mether">
    <a-input-password v-if="showInput" v-model:value="modelValue" v-bind="$attrs" show-password>
      <template v-for="item in Object.keys($slots)" #[item]="data">
        <slot :name="item" v-bind="data || {}"></slot>
      </template>
    </a-input-password>
    <meter class="w-full" min="0" max="12" low="4" high="8" optimum="10" :value="strength" />
  </div>
</template>

<script lang="ts" setup>
  import zxcvbn from 'zxcvbn';

  defineOptions({
    name: 'StrengthMether',
  });
  const props = defineProps({
    score: {
      type: String,
      default: '',
    },
    showInput: {
      type: Boolean,
      default: true,
    },
  });
  const modelValue = defineModel<string | number>();

  const strength = computed(() => {
    if (!props.showInput) return zxcvbn(props.score).guesses_log10;
    return zxcvbn(modelValue.value as string).guesses_log10;
  });
</script>

<style lang="scss" scoped></style>
