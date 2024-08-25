<template>
  <div class="flex flex-col gap-4">
    <ThemeSelector />
    <SwitchItem
      :disabled="config.theme === Theme.DARK"
      v-model="config.lightSidebar"
      :label="$t('common.config.UIDisplay.lightSidebar')"
    />
    <ThemeColor />
    <div>
      <div class="text-4 font-bold mb-2">{{ $t('common.other') }}</div>
      <SwitchItem class="mb-1" :label="$t('common.config.UIDisplay.borderRadius')">
        <a-input-number
          v-model:value="config.borderRadius"
          :formatter="(value: string) => `${value}px`"
          :parser="(value: string) => value.replace('px', '')"
          :min="0"
          :max="20"
          :step="1"
          size="small"
        />
      </SwitchItem>
      <template v-for="item in otherSwitchData" :key="item.filed">
        <SwitchItem v-model="config[item.filed]" class="mb-1" :label="item.label" />
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { storeToRefs } from 'pinia';
  import { useConfigStore } from '@/store/module/config.ts';
  import { Theme } from '@/enum/system';
  import ThemeSelector from './ThemeSelector.vue';
  import ThemeColor from './ThemeColor.vue';
  import SwitchItem from './SwitchItem.vue';
  import { useI18n } from 'vue-i18n';
  import { SwitchItemType } from './data';

  const { t } = useI18n();
  const configStore = useConfigStore();
  const { config } = storeToRefs(configStore);

  const otherSwitchData: SwitchItemType[] = [
    {
      label: t('common.config.UIDisplay.logo'),
      filed: 'showLogo',
    },
    {
      label: t('common.config.UIDisplay.grayMode'),
      filed: 'isGrayMode',
    },
    {
      label: t('common.config.UIDisplay.colorWeaknessMode'),
      filed: 'isColorWeaknessMode',
    },
  ];
</script>

<style lang="scss" scoped></style>
