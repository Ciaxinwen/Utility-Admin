<template>
  <a-config-provider :theme="getThemeConfig" :locale="locale">
    <RouterView />
  </a-config-provider>
</template>

<script lang="ts" setup>
  import { useI18n } from 'vue-i18n';
  import { useConfigStore } from '@/store/module/config';
  import { storeToRefs } from 'pinia';
  import { useAppKeydown } from '@/hook/web/useAppKeydown';

  const configStore = useConfigStore();
  const { getThemeConfig } = storeToRefs(configStore);

  const { locale: i18nLocale, getLocaleMessage } = useI18n();
  const locale = computed(() => getLocaleMessage(unref(i18nLocale)).ant);

  useAppKeydown();

  console.log('测试ci/cd，测试代码提交');
</script>

<style lang="scss" scoped></style>
