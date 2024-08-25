<template>
  <div class="flex flex-col gap-4">
    <div>
      <div class="text-4 font-bold mb-2">{{ $t('common.config.UIDisplay.general') }}</div>
      <SwitchItem class="mb-1" :label="$t('common.config.UIDisplay.langSwitch')">
        <a-select
          v-model:value="locale"
          style="width: 120px"
          size="small"
          @change="handleChangeLocale"
        >
          <a-select-option v-for="item in localeOptions" :value="item.value">
            {{ item.label }}
          </a-select-option>
        </a-select>
      </SwitchItem>
      <template v-for="item in generalSwitchData" :key="item.filed">
        <SwitchItem class="mb-1" v-model="config[item.filed]" :label="item.label" />
      </template>
    </div>
    <div>
      <div class="text-4 font-bold mb-2">{{ $t('common.config.animation.desc') }}</div>
      <div class="flex flex-col gap-1">
        <template v-for="item in animationSwitchData" :key="item.filed">
          <SwitchItem class="mb-1" v-model="config[item.filed]" :label="item.label" />
        </template>
        <SwitchItem class="mb-1" :label="$t('common.config.animation.pageAnimationType')">
          <a-select
            v-model:value="config.pageAnimationType"
            style="width: 120px"
            :disabled="!config.enablePageAnimation"
            size="small"
          >
            <a-select-option v-for="item in AnimationTypes" :value="item">
              {{ item }}
            </a-select-option>
          </a-select>
        </SwitchItem>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { SwitchItemType } from './data';
  import { useConfigStore } from '@/store/module/config.ts';
  import { storeToRefs } from 'pinia';
  import { AnimationTypes } from '@/enum/system';
  import SwitchItem from './SwitchItem.vue';
  import { useI18n } from 'vue-i18n';
  import { Locale } from '@/enum/system';
  import { useLocalStorage } from '@vueuse/core';
  import { StorgeKeys } from '@/enum/storgeKeys';
  import { useSystemTitle } from '@/hook/web/useSystemTitle';

  const route = useRoute();
  const { t, locale } = useI18n();
  const lang = useLocalStorage(StorgeKeys.SYS_LANG, Locale.ZH);
  const configStore = useConfigStore();
  const { config } = storeToRefs(configStore);
  const { resetTitle, setTitle } = useSystemTitle();

  const localeOptions = [
    {
      value: Locale.ZH,
      label: '简体中文',
    },
    {
      value: Locale.EN,
      label: 'English',
    },
  ];
  const generalSwitchData: SwitchItemType[] = [
    {
      label: t('common.config.UIDisplay.dynamicTitle'),
      filed: 'dynamicTitle',
    },
    {
      label: t('common.config.UIDisplay.watermark'),
      filed: 'showWaterMark',
    },
  ];
  const animationSwitchData: SwitchItemType[] = [
    {
      label: t('common.config.animation.enableProgress'),
      filed: 'enableProgress',
    },
    {
      label: t('common.config.animation.enablePageAnimation'),
      filed: 'enablePageAnimation',
    },
  ];

  const handleChangeLocale = (value: Locale) => {
    lang.value = value;
    location.reload();
  };

  watch(
    () => config.value.dynamicTitle,
    (newVal) => {
      newVal ? setTitle(t(route.meta.title || '')) : resetTitle();
    },
  );
</script>

<style lang="scss" scoped></style>
