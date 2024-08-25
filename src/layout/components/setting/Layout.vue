<template>
  <div class="flex flex-col gap-4">
    <NavMode />
    <div>
      <div class="text-4 font-bold mb-2">{{ $t('common.config.UIDisplay.sidebar') }}</div>
      <SwitchItem class="mb-1" :label="$t('common.config.UIDisplay.siderWidth')">
        <a-input-number
          v-model:value="config.siderWidth"
          :formatter="(value: string) => `${value}px`"
          :parser="(value: string) => value.replace('px', '')"
          :min="200"
          :step="10"
          :disabled="config.layoutMode !== Layout.LEFT"
          size="small"
        />
      </SwitchItem>
      <SwitchItem
        class="mb-1"
        :disabled="config.layoutMode === Layout.TOP"
        v-model="config.isSiderCollapsed"
        :label="$t('common.config.UIDisplay.foldSidebar')"
      />
      <SwitchItem
        class="mb-1"
        :disabled="config.layoutMode !== Layout.LEFT"
        v-model="config.isAccordionMode"
        :label="$t('common.config.UIDisplay.accordion')"
      />
    </div>
    <div>
      <div class="text-4 font-bold mb-2">{{ $t('common.config.UIDisplay.breadcrumb') }}</div>
      <template v-for="item in breadcrumbSwitchData" :key="item.filed">
        <SwitchItem class="mb-1" v-model="config[item.filed]" :label="item.label" />
      </template>
    </div>
    <div>
      <div class="text-4 font-bold mb-2">{{ $t('common.config.UIDisplay.tabNav') }}</div>
      <SwitchItem class="mb-1" :label="$t('common.config.UIDisplay.tabBarStyle.desc')">
        <a-select v-model:value="config.tabBarStyle" style="width: 120px" size="small">
          <a-select-option v-for="item in tabBarStyles" :value="item.value">
            {{ item.label }}
          </a-select-option>
        </a-select>
      </SwitchItem>
      <template v-for="item in tabSwitchData" :key="item.filed">
        <SwitchItem class="mb-1" v-model="config[item.filed]" :label="item.label" />
      </template>
    </div>
    <div>
      <div class="text-4 font-bold mb-2">{{ $t('common.config.UIDisplay.systemComponents') }}</div>
      <template v-for="item in actionSwitchData" :key="item.filed">
        <SwitchItem
          class="mb-1"
          v-model="config[item.filed]"
          :label="item.label"
          :disabled="item.disabled"
        />
      </template>
    </div>
    <div>
      <div class="text-4 font-bold mb-2">{{ $t('common.config.UIDisplay.footer') }}</div>
      <SwitchItem
        class="mb-1"
        v-model="config.showFooter"
        :label="$t('common.config.UIDisplay.showFooter')"
      />
      <template v-for="item in footerSwitchData" :key="item.filed">
        <SwitchItem class="mb-1" :label="item.label">
          <a-input v-model:value="config[item.filed]" style="width: 150px" size="small" />
        </SwitchItem>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { storeToRefs } from 'pinia';
  import { useConfigStore } from '@/store/module/config.ts';
  import { Layout, TabBarStyle } from '@/enum/system';
  import SwitchItem from './SwitchItem.vue';
  import NavMode from './NavMode.vue';
  import { SwitchItemType } from './data';
  import { useI18n } from 'vue-i18n';

  const { t } = useI18n();
  const configStore = useConfigStore();
  const { config } = storeToRefs(configStore);

  const tabBarStyles = [
    {
      label: t('common.config.UIDisplay.tabBarStyle.card'),
      value: TabBarStyle.CARD,
    },
    {
      label: t('common.config.UIDisplay.tabBarStyle.google'),
      value: TabBarStyle.GOOGLE,
    },
  ];
  const breadcrumbSwitchData: SwitchItemType[] = [
    {
      label: t('common.config.UIDisplay.breadcrumb'),
      filed: 'showHeaderBreadcrumb',
    },
    {
      label: t('common.config.UIDisplay.breadcrumbMenu'),
      filed: 'showHeaderBreadcrumbMenu',
    },
    {
      label: t('common.config.UIDisplay.breadcrumbIcon'),
      filed: 'showHeaderBreadcrumbIcon',
    },
  ];
  const footerSwitchData: SwitchItemType[] = [
    {
      label: t('common.config.UIDisplay.companyName'),
      filed: 'companyName',
    },
    {
      label: t('common.config.UIDisplay.companyWebsite'),
      filed: 'companyWebsite',
    },
    {
      label: t('common.config.UIDisplay.onlineDate'),
      filed: 'onlineDate',
    },
    {
      label: t('common.config.UIDisplay.ICP_Number'),
      filed: 'ICP_Number',
    },
    {
      label: t('common.config.UIDisplay.ICP_website'),
      filed: 'ICP_website',
    },
  ];
  const tabSwitchData: SwitchItemType[] = [
    {
      label: t('common.config.UIDisplay.showTabNav'),
      filed: 'showTabBar',
    },
    {
      label: t('common.config.UIDisplay.cacheTab'),
      filed: 'isCacheTabBar',
    },
    {
      label: t('common.config.UIDisplay.tabBarMoreBtn'),
      filed: 'showTabBarMoreBtn',
    },
    {
      label: t('common.config.UIDisplay.tabBarFullScreen'),
      filed: 'showTabBarFullScreen',
    },
    {
      label: t('common.config.UIDisplay.tabBarRefresh'),
      filed: 'showTabBarRefresh',
    },
  ];
  const actionSwitchData = computed<SwitchItemType[]>(() => [
    {
      label: t('common.config.UIDisplay.notice'),
      filed: 'showMessage',
    },
    {
      label: t('common.config.UIDisplay.fullscreen'),
      filed: 'showFullScreen',
    },
    {
      label: t('common.config.UIDisplay.menuSearch'),
      filed: 'showMenuSearch',
    },
    {
      label: t('common.config.UIDisplay.themeSwitch'),
      filed: 'showThemeSwitch',
    },
    {
      label: t('common.config.UIDisplay.langSwitch'),
      filed: 'showLanguageSwitch',
    },
    {
      label: t('common.config.UIDisplay.sidebarSwitch'),
      filed: 'showSidebarSwitch',
      disabled: config.value.layoutMode !== Layout.LEFT,
    },
  ]);
</script>

<style lang="scss" scoped></style>
