<template>
  <div class="flex flex-col gap-3">
    <div class="text-4 font-bold">{{ $t('common.config.themeColor.desc') }}</div>
    <div v-for="item in themeItems" :key="item.label" class="flex items-center justify-between">
      <div class="text-3.5 pl-2.5">{{ item.label }}</div>
      <ColorPicker v-model="config[item.filed]" style="margin: unset; width: 100px">
        <template #icon>
          <span class="opacity-40">
            {{ config[item.filed] }}
          </span>
        </template>
      </ColorPicker>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { storeToRefs } from 'pinia';
  import { useConfigStore } from '@/store/module/config.ts';
  import { ColorPicker } from '@/components/ColorPicker';
  import { SwitchItemType } from './data';
  import { useI18n } from 'vue-i18n';

  const { t } = useI18n();
  const configStore = useConfigStore();
  const { config } = storeToRefs(configStore);

  const themeItems: SwitchItemType[] = [
    {
      label: t('common.config.themeColor.primary'),
      filed: 'themeColor',
    },
    {
      label: t('common.config.themeColor.success'),
      filed: 'successColor',
    },
    {
      label: t('common.config.themeColor.error'),
      filed: 'errorColor',
    },
    {
      label: t('common.config.themeColor.warn'),
      filed: 'warnColor',
    },
  ];
</script>

<style lang="scss" scoped></style>
