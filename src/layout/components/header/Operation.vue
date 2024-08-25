<template>
  <div class="flex items-center gap-1">
    <div
      v-if="config.showMenuSearch"
      class="h-9 line-height-9 cursor-pointer bg-#f4f4f5 dark:bg-#2e3034 rounded-7.5 px-4.5"
      @click="openSearchModal = true"
    >
      <div
        class="h-full flex justify-center items-center gap-2 opacity-70 hover:opacity-100 transition-all"
      >
        <div class="i-ri:search-line"></div>
        <div class="text-nowrap">{{ t('common.search.desc') }}</div>
        <div class="h-5.5 line-height-5.5 bg-#fff dark:bg-#141414 px-1.5 rounded-7.5">ctrl+k</div>
      </div>
    </div>

    <Notice v-if="config.showMessage">
      <div :class="wrapperClass">
        <a-badge dot>
          <div class="i-ri:notification-2-line"></div>
        </a-badge>
      </div>
    </Notice>

    <a-tooltip v-if="config.showThemeSwitch">
      <template #title> {{ t('common.config.theme.desc') }} </template>
      <div :class="wrapperClass" @click="toggleTheme">
        <div
          v-if="configStore.getThemeMode === Theme.LIGHT"
          class="i-ri:sun-foggy-line text-16px"
        />
        <div
          v-if="configStore.getThemeMode === Theme.DARK"
          class="i-ri:moon-clear-fill text-16px color-amber"
        />
      </div>
    </a-tooltip>

    <a-tooltip v-if="config.showFullScreen">
      <template #title>{{ t('common.fullscreen') }}</template>
      <div :class="wrapperClass" class="text-16px" @click="toggle">
        <FullscreenExitOutlined v-if="isFullscreen" />
        <FullscreenOutlined v-else />
      </div>
    </a-tooltip>

    <a-dropdown v-if="config.showLanguageSwitch" :trigger="['click']">
      <div :class="wrapperClass">
        <div class="i-ri:translate-2 text-16px"></div>
      </div>
      <template #overlay>
        <a-menu @click="handleClickLocale">
          <a-menu-item
            :key="Locale.ZH"
            :style="{
              color: lang === Locale.ZH ? config.themeColor : '',
            }"
          >
            <template #icon>
              <CheckOutlined :class="[lang !== Locale.ZH && 'opacity-0']" />
            </template>
            简体中文
          </a-menu-item>
          <a-menu-item
            :key="Locale.EN"
            :style="{ color: lang === Locale.EN ? config.themeColor : '' }"
          >
            <template #icon>
              <CheckOutlined :class="[lang !== Locale.EN && 'opacity-0']" />
            </template>
            English
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>

    <a-dropdown :trigger="['click']" placement="bottomRight" :overlayStyle="{ minWidth: '110px' }">
      <div :class="wrapperClass" class="w-auto gap-2.5 rounded-2 px-2">
        <a-avatar :src="userInfo!.avatar" />
        <span class="whitespace-nowrap"> {{ userInfo!.name }} </span>
        <CaretDownOutlined />
      </div>
      <template #overlay>
        <a-menu>
          <a-menu-item>
            <template #icon>
              <div class="i-ri:user-3-line" style="font-size: 14px"></div>
            </template>
            个人中心
          </a-menu-item>
          <a-menu-divider />
          <a-menu-item @click="handleLogout">
            <template #icon>
              <div class="i-ri:logout-box-r-line" style="font-size: 14px"></div>
            </template>
            退出登录
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
  <SearchModal v-model:open="openSearchModal" />
</template>

<script lang="ts" setup>
  import { storeToRefs } from 'pinia';
  import Notice from './Notice.vue';
  import { useFullscreen, useLocalStorage } from '@vueuse/core';
  import { useI18n } from 'vue-i18n';
  import { useUserStore } from '@/store/module/user';
  import { StorgeKeys } from '@/enum/storgeKeys';
  import { Locale, Theme } from '@/enum/system';
  import { useConfigStore } from '@/store/module/config';
  import { Modal } from 'ant-design-vue';
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
  import { createVNode } from 'vue';
  import { useSystemStore } from '@/store/module/sys';
  import SearchModal from './SearchModal.vue';

  const wrapperClass =
    'h-10 w-10 rounded-2 flex justify-center items-center cursor-pointer  hover:bg-#f2f3f5 dark:hover:bg-#313131 transition-all';

  const router = useRouter();
  const configStore = useConfigStore();
  const sysStore = useSystemStore();
  const { openSearchModal } = storeToRefs(sysStore);
  const { config } = storeToRefs(configStore);
  const userStore = useUserStore();
  const { userInfo, token } = storeToRefs(userStore);
  const lang = useLocalStorage(StorgeKeys.SYS_LANG, Locale.ZH);
  const { t, locale } = useI18n();
  const { toggle, isFullscreen } = useFullscreen();

  const toggleTheme = () => {
    config.value.theme = config.value.theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;
  };

  const handleClickLocale = ({ key }: { key: Locale }) => {
    lang.value = key;
    locale.value = key;
    location.reload();
  };

  const handleLogout = () => {
    Modal.confirm({
      title: '提示',
      icon: createVNode(ExclamationCircleOutlined),
      content: '请问确认退出登录吗？',
      closable: true,
      onOk() {
        return Promise.resolve().then(() => {
          sysStore.resetNav();
          token.value = '';
          localStorage.clear();
          router.push('/login');
        });
      },
    });
  };
</script>

<style lang="scss" scoped></style>
