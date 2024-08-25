<template>
  <div class="login-bg flex items-center justify-center pos-relative">
    <div class="bg-#fff dark:bg-#18181c w-md rounded-3 p-6">
      <div class="flex items-center gap-4">
        <SvgIcon name="logo" :size="56" />
        <span class="text-3xl" :style="{ color: config.themeColor }">
          {{ sysTitle }}
        </span>
      </div>

      <div class="text-xl my-5" :style="{ color: config.themeColor }">
        {{ wrapComponents[currentMode].title }}
      </div>
      <component
        ref="formComRef"
        class="anim-into"
        :is="wrapComponents[currentMode].component"
        @reset-password="currentMode = LoginKeys.REST"
      />

      <a-button
        v-if="currentMode !== LoginKeys.PSW"
        class="w-full anim-into"
        size="large"
        @click="currentMode = LoginKeys.PSW"
      >
        {{ $t('common.back') }}
      </a-button>

      <template v-if="currentMode === LoginKeys.PSW">
        <div class="anim-into w-full flex items-center gap-3 mt-5">
          <a-button class="w-full" size="large" @click="currentMode = LoginKeys.AUTH_CODE">
            {{ $t('login.mode.authCode') }}
          </a-button>
          <a-button class="w-full" size="large" @click="currentMode = LoginKeys.REGISTER">
            {{ $t('login.mode.register') }}
          </a-button>
        </div>

        <a-divider class="anim-into" style="margin-top: 20px" plain>
          {{ $t('login.fastLogin') }}
        </a-divider>
        <div class="anim-into flex items-center justify-center gap-3">
          <a-button type="primary" @click="login(FastLoginType.SUPER_ADMIN)">
            {{ $t('login.fastMode.superAdmin') }}
          </a-button>
          <a-button type="primary" @click="login(FastLoginType.ADMIN)">
            {{ $t('login.fastMode.admin') }}
          </a-button>
          <a-button type="primary" @click="login(FastLoginType.USER)">
            {{ $t('login.fastMode.user') }}
          </a-button>
        </div>
      </template>
    </div>

    <div class="pos-absolute top-0 right-0 my-4 mx-6 flex items-center gap-4">
      <a-tooltip>
        <template #title> {{ $t('common.config.theme.desc') }} </template>
        <div :class="wrapperClass" @click="toggleTheme">
          <div v-if="getThemeMode === Theme.LIGHT" class="i-ri:sun-foggy-fill color-#fff"></div>
          <div v-else class="i-ri:moon-clear-fill color-amber"></div>
        </div>
      </a-tooltip>

      <a-dropdown :trigger="['click']">
        <div :class="wrapperClass">
          <div class="i-ri:translate-2 color-#fff"></div>
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
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useConfigStore } from '@/store/module/config';
  import { storeToRefs } from 'pinia';
  import { Locale, Theme } from '@/enum/system';
  import { useI18n } from 'vue-i18n';
  import { StorgeKeys } from '@/enum/storgeKeys';
  import { useLocalStorage } from '@vueuse/core';
  import PswMode from './components/PswMode.vue';
  import AuthCodeMode from './components/AuthCodeMode.vue';
  import Register from './components/Register.vue';

  enum LoginKeys {
    PSW,
    AUTH_CODE,
    REGISTER,
    REST,
  }

  enum FastLoginType {
    SUPER_ADMIN,
    ADMIN,
    USER,
  }

  interface WrapComponents {
    title: string;
    component: Component;
  }

  const sysTitle = import.meta.env.VITE_SYSTEM_NAME;

  const { t, locale } = useI18n();
  const configStore = useConfigStore();
  const { config, getThemeMode } = storeToRefs(configStore);
  const lang = useLocalStorage(StorgeKeys.SYS_LANG, Locale.ZH);

  const wrapperClass = 'text-2xl rounded-2 flex justify-center items-center cursor-pointer';

  const formComRef = ref();
  const currentMode = ref<LoginKeys>(LoginKeys.PSW);
  const wrapComponents: Record<LoginKeys, WrapComponents> = {
    [LoginKeys.PSW]: {
      title: t('login.mode.psw'),
      component: PswMode,
    },
    [LoginKeys.AUTH_CODE]: {
      title: t('login.mode.authCode'),
      component: AuthCodeMode,
    },
    [LoginKeys.REGISTER]: {
      title: t('login.mode.register'),
      component: Register,
    },
    [LoginKeys.REST]: {
      title: t('login.mode.reset'),
      component: Register,
    },
  };

  const toggleTheme = () => {
    config.value.theme = config.value.theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;
    config.value.lightSidebar = true;
  };

  const handleClickLocale = ({ key }: { key: Locale }) => {
    lang.value = key;
    locale.value = key;
    location.reload();
  };

  const login = (type: FastLoginType) => {
    switch (type) {
      case FastLoginType.SUPER_ADMIN:
        formComRef.value.login({
          username: 'utility',
          password: '123456',
        });
        break;
      case FastLoginType.ADMIN:
        formComRef.value.login({
          username: 'admin',
          password: '123456',
        });
        break;
      case FastLoginType.USER:
        formComRef.value.login({
          username: 'user',
          password: '123456',
        });
        break;
    }
  };
</script>

<style lang="scss" scoped>
  @import './index';

  :deep(.ant-form) {
    .ant-form-item {
      margin-top: 22px;
    }
  }
</style>
