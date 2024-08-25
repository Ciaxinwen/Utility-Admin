<template>
  <div class="flex flex-col items-start gap-3">
    <div class="text-4 font-bold bg-inherit">{{ $t('common.config.theme.desc') }}</div>
    <SwitchItem
      v-model="state.auto"
      :label="$t('common.config.theme.auto')"
      @click="handleAutoChange"
    />
    <Transition name="fade" mode="out-in">
      <div v-if="!state.auto" class="w-full flex items-center justify-center gap-12">
        <div class="light flex flex-col items-center gap-2" @click="handleLightChange">
          <component :is="ThemeModeMap[config.layoutMode]" bgColor="#aaa" />
          <a-checkbox v-model:checked="state.isLight">
            <span>{{ $t('common.config.theme.light') }}</span>
          </a-checkbox>
        </div>
        <div class="dark flex flex-col items-center gap-2" @click="handleDarkChange">
          <component :is="ThemeModeMap[config.layoutMode]" :bgColor="themeToken.colorBgSpotlight" />
          <a-checkbox v-model:checked="state.isDark">
            <span>{{ $t('common.config.theme.dark') }}</span>
          </a-checkbox>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
  import { useConfigStore } from '@/store/module/config.ts';
  import { storeToRefs } from 'pinia';
  import { ThemeModeMap } from './data';
  import { Theme } from '@/enum/system';
  import SwitchItem from './SwitchItem.vue';
  import { theme } from 'ant-design-vue';

  const { useToken } = theme;
  const themeToken = useToken().token;
  const configStore = useConfigStore();
  const { config, getThemeMode } = storeToRefs(configStore);

  const state = reactive({
    auto: config.value.theme === Theme.AUTO,
    isLight: getThemeMode.value === Theme.LIGHT,
    isDark: getThemeMode.value === Theme.DARK,
  });

  const handleAutoChange = (val: boolean) => {
    config.value.theme = val ? Theme.AUTO : Theme.LIGHT;
    state.isLight = getThemeMode.value === Theme.LIGHT;
    state.isDark = getThemeMode.value === Theme.DARK;
  };
  const handleLightChange = () => {
    state.isLight = true;
    state.isDark = false;
    config.value.theme = Theme.LIGHT;
  };
  const handleDarkChange = () => {
    state.isDark = true;
    state.isLight = false;
    config.value.theme = Theme.DARK;
  };
</script>

<style lang="scss" scoped>
  :deep(.ant-checkbox-inner),
  :deep(.ant-checkbox-checked::after) {
    border-radius: 50%;
  }

  .nav-node-item {
    border-width: 1px !important;
    border-color: v-bind('themeToken.colorBorder') !important;
  }
</style>
