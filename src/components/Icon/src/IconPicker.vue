<template>
  <a-popover
    v-model:open="open"
    trigger="click"
    :arrow="false"
    placement="bottomLeft"
    :overlayStyle="{ width: '350px' }"
    :overlayInnerStyle="{ paddingTop: 'unset' }"
    @openChange="handleOpenChange"
  >
    <template #content>
      <a-tabs v-model:activeKey="activeKey">
        <a-tab-pane v-for="item in iconDatas" :key="item.key" :tab="item.name"></a-tab-pane>
      </a-tabs>
      <div ref="listRef" class="w-full h-300px overflow-y-scroll">
        <div
          class="text-18px inline-block py-1 px-2 box-border rounded-2 cursor-pointer hover:bg-#f2f3f5"
          v-for="item in data"
          :key="item.name"
          @click="selectIcon(item.name)"
        >
          <component v-if="activeKey === IconType.ANTV" :is="item.name" />
          <SvgIcon v-else :name="item.name" :size="18" />
        </div>
      </div>
      <a-pagination
        class="text-end pt-2"
        v-model:current="currentPage"
        v-model:pageSize="currentPageSize"
        size="small"
        :total="total"
        show-less-items
        @change="handlePageChange"
      />
    </template>
    <a-input v-bind="$attrs" v-model:value="modelValue" placeholder="请选择图标" allowClear>
      <template #addonAfter>
        <HolderOutlined v-if="!modelValue" />
        <component
          class="text-16px"
          v-else-if="transformIconData(modelValue).type === IconType.ANTV"
          :is="transformIconData(modelValue).icon"
        />
        <SvgIcon v-else :name="transformIconData(modelValue).icon || ''" :size="16" />
      </template>
    </a-input>
  </a-popover>
</template>

<script lang="ts" setup>
  import { useScrollOffset } from '@/hook/setting/useScrollOffset';
  import { usePaginationData } from '@/hook/web/usePaginationData';
  import { getSvgNames, transformIconData } from '@/utils/icon';

  interface IconItem {
    name: string;
    icon: () => VNode;
  }
  enum IconType {
    ANTV = 'ant',
    SVG = 'svg',
  }

  defineOptions({ name: 'IconPicker' });

  const modelValue = defineModel({ type: String, default: '' });

  const AntIcons = inject<Record<string, any>>('AntIcons') || {};
  const icons = ref<Array<IconItem>>([]);
  const currentPageSize = ref(100);
  Object.keys(AntIcons).forEach((key: string) => {
    if (!key.includes('Outlined')) return;
    icons.value.push({
      name: key,
      icon: AntIcons[key],
    });
  });
  const open = ref<boolean>(false);
  const listRef = ref();
  const rows = ref<IconItem[] | Record<string, any>[]>([]);

  const activeKey = ref(IconType.ANTV);
  const iconDatas = reactive([
    {
      key: IconType.ANTV,
      name: 'Ant design vue',
    },
    {
      key: IconType.SVG,
      name: '系统SVG',
    },
  ]);

  const { setScrollTop } = useScrollOffset(listRef);

  const { currentPage, total, data, setCurrentPage, setPageSize } = usePaginationData({
    rows,
    pageSize: currentPageSize.value,
    callback: () => setScrollTop(0),
  });

  const handlePageChange = (_page: number, pageSize: number) => {
    setPageSize(pageSize);
  };

  const handleOpenChange = (visible: boolean) => {
    if (visible) return;
    activeKey.value = IconType.ANTV;
    setCurrentPage(1);
    setScrollTop(0);
  };

  const selectIcon = (name: string) => {
    modelValue.value = activeKey.value + ':' + name;
    open.value = false;
  };

  watch(
    activeKey,
    () => {
      rows.value = activeKey.value === IconType.ANTV ? unref(icons) : getSvgNames();
      setCurrentPage(1);
    },
    {
      immediate: true,
    },
  );
</script>

<style lang="scss" scoped></style>
