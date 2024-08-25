<template>
  <PageWrapper dense>
    <Table
      :columns="columns"
      :data-source="data"
      bordered
      title="菜单管理"
      rowKey="id"
      :loading
      sticky
      :scroll="{ x: 1300 }"
      :pagination="false"
      v-model:expandedRowKeys="expandedRowKeys"
      @reload="getList"
    >
      <template #pre-tools>
        <a-button type="primary" @click="handleAdd">
          <template #icon><PlusOutlined /> </template>
          新增
        </a-button>
      </template>
    </Table>
    <SetMenuModal v-model:open="open" :isEdit :data="currentData" :treeData="data" />
  </PageWrapper>
</template>

<script lang="ts" setup>
  import { getMenuList } from '@/api/system';
  import { message } from 'ant-design-vue';
  import SetMenuModal from './components/SetMenuModal.vue';
  import { createColumns } from './components/cols';
  import { useI18n } from 'vue-i18n';

  const { t } = useI18n();
  const loading = ref(false);
  const expandedRowKeys = ref([]);
  const data = ref<MenuListItem[]>([]);
  const open = ref(false);
  const isEdit = ref(false);
  const currentData = ref();
  const editItem = (record: MenuListItem) => {
    open.value = true;
    isEdit.value = true;
    currentData.value = record;
  };
  const delItem = (record: MenuListItem) => {
    message.success('假装删除成功：' + t(record.title));
    getList();
  };
  const columns = createColumns(editItem, delItem);

  const handleAdd = () => {
    isEdit.value = false;
    open.value = true;
  };

  const getList = async () => {
    loading.value = true;
    const res = await getMenuList();
    data.value = res.data;
    loading.value = false;
  };

  onMounted(() => {
    getList();
  });
</script>

<style lang="scss" scoped></style>
