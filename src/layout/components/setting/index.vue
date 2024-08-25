<template>
  <a-float-button class="right--5px bottom-40%" type="primary" shape="square" @click="showDrawer">
    <template #icon>
      <SettingOutlined />
    </template>
  </a-float-button>

  <a-drawer
    v-model:open="open"
    :title="$t('common.config.desc')"
    placement="right"
    :bodyStyle="{ padding: '0 4px', overflow: 'hidden' }"
  >
    <div ref="drawerContentRef" class="h-full flex flex-col gap-5 p-4 pr-1 overflow-y-scroll">
      <OptionalButtonGroup v-model:value="activeKey" :options />
      <Appearance v-show="activeKey === 1" />
      <Layout v-show="activeKey === 2" />
      <General v-show="activeKey === 3" />
    </div>

    <template #footer>
      <div class="flex items-center justify-end gap-3">
        <a-button type="primary" @click="configStore.copyConfigAboutJson">
          <template #icon>
            <CopyOutlined />
          </template>
          {{ $t('common.config.action.copy') }}
        </a-button>
        <a-button danger @click="configStore.resetConfig">
          <template #icon>
            <ReloadOutlined />
          </template>
          {{ $t('common.config.action.reset') }}
        </a-button>
      </div>
    </template>
  </a-drawer>
</template>

<script lang="ts" setup>
  import { useConfigStore } from '@/store/module/config.ts';
  import { useScrollOffset } from '@/hook/setting/useScrollOffset';
  import { OptionalButtonGroup, OptionsItem } from '@/components/OptionalButton';
  import Appearance from './Appearance.vue';
  import Layout from './Layout.vue';
  import General from './General.vue';

  const configStore = useConfigStore();

  const drawerContentRef = ref<HTMLElement>();
  const { setScrollTop } = useScrollOffset(drawerContentRef);
  const open = ref<boolean>(false);

  const showDrawer = () => {
    open.value = true;
    nextTick(() => {
      setScrollTop(0);
    });
  };

  const activeKey = ref(1);
  const options: OptionsItem[] = [
    {
      label: '外观',
      value: 1,
    },
    {
      label: '布局',
      value: 2,
    },
    {
      label: '通用',
      value: 3,
    },
  ];
</script>

<style lang="scss" scoped></style>
