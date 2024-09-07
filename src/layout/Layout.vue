<template>
  <a-layout class="pos-relative">
    <template v-if="config.layoutMode === Layout.LEFT">
      <a-layout-sider
        v-loading="menuLoading"
        v-model:collapsed="config.isSiderCollapsed"
        :theme="config.lightSidebar ? 'light' : 'dark'"
        :collapsedWidth="60"
        :trigger="null"
        :width="config.siderWidth"
      >
        <Logo showTitle />
        <Sider />
      </a-layout-sider>

      <a-layout>
        <a-layout-header>
          <Header />
        </a-layout-header>
        <Tab class="layout-tabs" />
        <Main />
        <Footer />
      </a-layout>
    </template>

    <template v-if="config.layoutMode === Layout.TOP">
      <a-layout-header>
        <Header />
      </a-layout-header>
      <Tab class="layout-tabs" />
      <Main />
      <Footer />
    </template>

    <template v-if="config.layoutMode === Layout.MIX">
      <a-layout-sider
        v-model:collapsed="config.isSiderCollapsed"
        :theme="config.lightSidebar ? 'light' : 'dark'"
        :collapsedWidth="60"
        collapsible
        :width="80"
      >
        <template #trigger>
          <DoubleRightOutlined v-if="config.isSiderCollapsed" />
          <DoubleLeftOutlined v-else />
        </template>
        <div class="w-full h-[var(--layout-header-height)] flex items-center justify-center">
          <SvgIcon name="logo" :size="32" />
        </div>
        <LeftMixMenu v-model:showMixDrawerMenu="showMixDrawerMenu" />
      </a-layout-sider>
      <LeftMixDrawerMenu
        :visible="showMixDrawerMenu"
        v-model:showMixDrawerMenu="showMixDrawerMenu"
      />
      <a-layout>
        <a-layout-header>
          <Header />
        </a-layout-header>
        <Tab class="layout-tabs" />
        <Main />
        <Footer />
      </a-layout>
    </template>

    <Setting />
  </a-layout>
</template>

<script lang="ts" setup>
  import Header from './components/header/index.vue';
  import Tab from './components/tab/index.vue';
  import Main from './components/main/index.vue';
  import Logo from './components/logo/index.vue';
  import Sider from './components/menu/index.vue';
  import Setting from './components/setting/index.vue';
  import LeftMixMenu from './components/menu/LeftMixMenu.vue';
  import LeftMixDrawerMenu from './components/menu/LeftMixDrawerMenu.vue';
  import { useConfigStore } from '@/store/module/config';
  import { storeToRefs } from 'pinia';
  import { useSystemStore } from '../store/module/sys';
  import { Layout } from '@/enum/system';
  import Footer from './components/footer/index.vue';

  const configStore = useConfigStore();
  const sysStore = useSystemStore();
  const { config } = storeToRefs(configStore);
  const { menuLoading } = storeToRefs(sysStore);

  const showMixDrawerMenu = ref(false);
</script>

<style lang="scss" scoped>
  html.dark {
    .ant-layout-sider {
      box-shadow: 1px 0 2px #0c0c0c;
    }

    .ant-layout-header {
      // box-shadow: 0 2px 1px #0c0c0c;
      border-color: #0c0c0c;
    }

    .layout-tabs {
      box-shadow: 0 4px 3px #0c0c0c;
    }
  }

  .ant-layout {
    height: 100vh;

    :deep(.ant-spin-container) {
      height: 100%;
    }
  }

  .ant-layout-sider {
    z-index: 11;
    height: 100%;

    &:not(&-dark) {
      box-shadow: 2px 0 3px #eeeeee;
    }
  }

  .layout-tabs {
    z-index: 8;
    box-shadow: 0 4px 3px #f7f7f7;
  }

  .ant-layout-header {
    z-index: 9;
    display: flex;
    align-items: center;
    padding: 0;
    height: var(--layout-header-height);
    // box-shadow: 0 4px 3px #f7f7f7;
    border-bottom: 2px solid #f7f7f7;
    background: var(--common-bg-color);
  }

  :deep(.ant-layout-footer) {
    padding: unset;
    height: var(--layout-footer-height);
    font-size: 12px;
    text-align: center;
    line-height: var(--layout-footer-height);
    // background: var(--common-bg-color);
  }
</style>
