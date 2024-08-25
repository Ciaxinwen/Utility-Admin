<template>
  <PageWrapper dense defaultBgColor>
    <a-tabs v-model:activeKey="activeKey" tab-position="left">
      <a-tab-pane v-for="item in settingTabs" :key="item.title" :tab="item.title">
        <component :is="item.component" />
      </a-tab-pane>
    </a-tabs>
  </PageWrapper>
</template>

<script lang="ts" setup>
  import { theme } from 'ant-design-vue';
  import PersonalData from './PersonalData.vue';
  import SecurityCenter from './SecurityCenter.vue';
  import OtherSetting from './OtherSetting.vue';
  import Log from './Log.vue';

  const { useToken } = theme;
  const themeToken = useToken().token;

  const activeKey = ref('个人资料');
  const settingTabs = [
    {
      title: '个人资料',
      component: PersonalData,
    },
    {
      title: '安全中心',
      component: SecurityCenter,
    },
    {
      title: '执行日志',
      component: Log,
    },
    {
      title: '其他设置',
      component: OtherSetting,
    },
  ];
</script>

<style lang="scss" scoped>
  :deep(.ant-tabs) {
    .ant-tabs-nav {
      width: 15%;

      .ant-tabs-tab-active {
        background-color: v-bind('themeToken.colorPrimaryBg');
      }
    }

    .ant-tabs-tabpane {
      padding: 24px;
    }
  }
</style>
