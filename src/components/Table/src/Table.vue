<template>
  <div class="u-table" bg="[var(--common-bg-color)]" p-2 px-4 rounded-1.5>
    <div class="u-table-header" mt-1.5 mb-3 flex items-center justify-between>
      <div class="u-table-title" text-16px>{{ title }}</div>
      <div class="u-table-tools" flex items-center>
        <slot name="pre-tools"></slot>
        <div class="u-table-tools-icon" text-18px>
          <a-divider type="vertical" mx-3 />
          <a-tooltip>
            <template #title>{{ $t('common.refresh') }}</template>
            <ReloadOutlined cursor-pointer mr-3 @click="emits('reload')" />
          </a-tooltip>
          <a-tooltip>
            <template #title>{{ $t('components.table.density') }}</template>
            <a-dropdown trigger="click" placement="bottom">
              <ColumnHeightOutlined cursor-pointer mr-3 />
              <template #overlay>
                <a-menu @click="onChangeSize">
                  <a-menu-item
                    v-for="item in tableSizeCols"
                    :key="item.key"
                    :style="{
                      backgroundColor: tableSize === item.key ? themeToken.colorPrimaryBg : '',
                      color: tableSize === item.key ? themeToken.colorPrimary : '',
                    }"
                  >
                    {{ item.title }}
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </a-tooltip>
          <a-tooltip>
            <template #title>{{ $t('common.setting') }}</template>
            <a-popover
              trigger="click"
              placement="bottom"
              :arrow="false"
              :overlayInnerStyle="{ padding: '0px', minWidth: '160px' }"
            >
              <template #content>
                <div px-2.5 py-2 whitespace-nowrap flex items-center justify-between>
                  <a-checkbox
                    v-model:checked="showColsState.checked"
                    :indeterminate="showColsState.indeterminate"
                    @click="onChangeColsAll"
                  >
                    {{ $t('components.table.columns') }}
                  </a-checkbox>
                  <a-button type="link" @click="tableCols = getCols()">
                    {{ $t('components.table.reset') }}
                  </a-button>
                </div>
                <a-divider style="margin: unset" />
                <VueDraggable
                  v-model="tableCols"
                  :animation="150"
                  handle=".handle"
                  p-2
                  flex
                  flex-col
                  gap-2
                >
                  <div
                    v-for="item in tableCols"
                    :key="item.dataIndex"
                    rounded-1.5
                    whitespace-nowrap
                    flex
                    items-center
                    gap-2
                  >
                    <div class="i-ri:draggable handle" cursor-move text-20px></div>
                    <a-checkbox v-model:checked="item.isShow" @change="onChangeColItem">
                      {{ item.title }}
                    </a-checkbox>
                  </div>
                </VueDraggable>
              </template>
              <SettingOutlined cursor-pointer mr-3 />
            </a-popover>
          </a-tooltip>
        </div>
      </div>
    </div>
    <a-table v-bind="$attrs" :size="tableSize" :columns="tableCols.filter((item) => item.isShow)">
      <template v-for="item in slotsKeys" #[item]="data">
        <slot :name="item" v-bind="data || {}"></slot>
      </template>
    </a-table>
  </div>
</template>

<script lang="ts" setup>
  import { TableProps, TableSize, tableSizeCols } from './props';
  import { theme } from 'ant-design-vue';
  import { cloneDeep } from 'lodash';
  import { VueDraggable } from 'vue-draggable-plus';

  defineOptions({ name: 'Table' });
  const props = defineProps(TableProps);
  const emits = defineEmits(['reload']);
  const slotsKeys = computed(() => {
    return Object.keys(useSlots()).filter((item) => item !== 'title');
  });

  const themeToken = theme.useToken().token;

  const tableSize = ref<TableSize>(props.size);
  const onChangeSize = (scope: any) => {
    tableSize.value = scope.key;
  };

  const showColsState = reactive({
    checked: true,
    indeterminate: false,
  });
  const tableCols = ref<any[]>([]);
  const getCols = () => {
    showColsState.checked = true;
    showColsState.indeterminate = false;
    return cloneDeep(props.columns).map((item) => {
      return {
        ...item,
        isShow: true,
      };
    });
  };
  const onChangeColsAll = () => {
    tableCols.value.forEach((item) => {
      item.isShow = !showColsState.checked;
    });
    showColsState.indeterminate = false;
  };
  const onChangeColItem = () => {
    const flag = tableCols.value.some((item) => !item.isShow);
    showColsState.checked = !flag;
    showColsState.indeterminate = tableCols.value.every((item) => !item.isShow) ? false : flag;
  };

  watch(
    () => props.columns,
    () => {
      tableCols.value = getCols();
    },
    {
      deep: true,
      immediate: true,
    },
  );
</script>

<style lang="scss" scoped>
  .ant-checkbox-wrapper {
    font-size: 16px;
  }
</style>
