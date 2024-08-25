<template>
  <a-popover trigger="click" overlayClassName="color-picker-popover" :arrow="false">
    <template #content>
      <Sketch v-model="color" :presetColors />
      <div class="flex justify-end my-1 mx-2">
        <a-button type="text" @click="color = modelValue">{{ $t('common.clear') }}</a-button>
        <a-button type="primary" @click="ok">{{ $t('common.confirm') }}</a-button>
      </div>
    </template>
    <div
      v-bind="$attrs"
      :class="[size ? SizeObj[size] : SizeObj.default]"
      class="border border-solid border-gray-300 dark:border-#464852 rounded-1 m-2 p-0.7 cursor-pointer box-border"
      :style="{ borderRadius: `${themeToken.borderRadius}px` }"
    >
      <div
        class="w-full h-full rounded-1 flex items-center justify-center"
        :style="{
          backgroundColor: modelValue,
          borderRadius: `${themeToken.borderRadius}px`,
        }"
      >
        <slot name="icon">
          <CheckOutlined class="opacity-50 color-white" />
        </slot>
      </div>
    </div>
  </a-popover>
</template>

<script lang="ts" setup>
  import { Sketch } from '@ckpack/vue-color';
  import { PropType } from 'vue';
  import { theme } from 'ant-design-vue';

  type ColorPickerSize = 'small' | 'default' | 'large';

  defineOptions({ name: 'ColorPicker' });
  defineProps({
    size: {
      type: String as PropType<ColorPickerSize>,
      defualt: 'default',
    },
  });

  const { useToken } = theme;
  const themeToken = useToken().token;

  const SizeObj = {
    large: 'w-40px h-40px',
    default: 'w-32px h-32px',
    small: 'w-24px h-24px',
  };
  const presetColors: string[] = [
    '#345CF5',
    '#5473e8',
    '#5E7EF4',
    '#5890FA',
    '#3277F9',
    '#4394F4',
    '#45ADF5',
    '#23CEF8',
    '#12CCF9',
    '#722ed1',
    '#52c41a',
    '#eb2f96',
    '#f5222d',
    '#fa8c16',
    '#fadb14',
    '#fa541c',
    '#faad14',
    '#a0d911',
  ];

  const modelValue = defineModel({ type: String, default: '' });
  const color = ref<any>('');

  const ok = () => {
    if (typeof color.value === 'string') {
      modelValue.value = color.value;
    }
    if (color.value instanceof Object && Object.keys(color.value).some((k) => k === 'hex')) {
      modelValue.value = color.value.hex;
    }
  };

  watch(
    modelValue,
    (newVal) => {
      if (color.value === newVal || color.value?.hex === newVal) {
        return;
      }
      color.value = newVal;
    },
    {
      immediate: true,
    },
  );
</script>

<style lang="scss">
  .color-picker-popover {
    .ant-popover-inner {
      padding: 5px;
    }

    .vc-sketch {
      width: 280px;
      box-shadow: none;

      .vc-sketch-color-wrap {
        display: none;
      }

      .vc-sketch-alpha-wrap,
      .vc-sketch-hue-wrap {
        height: 20px;

        .vc-hue-pointer,
        .vc-alpha-pointer {
          height: 100%;
          .vc-hue-picker,
          .vc-alpha-picker {
            height: 100%;
          }
        }
      }

      .vc-editable-input {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        .vc-input__input {
          height: 32px;
          font-size: 14px;
        }
        .vc-input__label {
          font-size: 16px;
        }
      }

      .vc-sketch-presets {
        .vc-sketch-presets-color {
          width: 20px;
          height: 20px;
        }
      }
    }
  }
</style>
