<template>
  <PageWrapper dense>
    <template #header>
      <a-form class="search-form" ref="formRef" :label-col="{ span: 6 }" :model="form">
        <a-row :gutter="36">
          <a-col :span="8">
            <a-form-item label="部门名称" name="name">
              <a-input v-model:value="form.name" placeholder="请输入"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="状态" name="status">
              <a-select v-model:value="form.status" placeholder="请选择">
                <a-select-option :value="0">停用</a-select-option>
                <a-select-option :value="1">启用</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="8" text-end>
            <a-button @click="reset">
              <template #icon> <ReloadOutlined /> </template>
              重置
            </a-button>
            <a-button type="primary" ghost @click="handleSearch">
              <template #icon> <SearchOutlined /> </template>
              查询
            </a-button>
          </a-col>
        </a-row>
      </a-form>
    </template>
    <Table
      :columns="columns"
      :data-source="data"
      bordered
      title="部门管理"
      rowKey="id"
      :loading
      :scroll="{ x: 1300 }"
      sticky
      :pagination="false"
      v-model:expandedRowKeys="expandedRowKeys"
      @reload="reset"
    >
      <template #pre-tools>
        <a-button type="primary" @click="handleAdd">
          <template #icon><PlusOutlined /> </template>
          新增
        </a-button>
      </template>
    </Table>
    <SetDeptDrawer
      v-model:open="open"
      :isEdit
      :data="currentData"
      :treeData="data"
      @reload="getList"
    />
  </PageWrapper>
</template>

<script lang="ts" setup>
  import { getDeptList } from '@/api/system';
  import type { DeptList, DeptListParams } from '@/api/system/type';
  import { Table } from '@/components/Table';
  import { listToTree } from '@/utils/tree';
  import { message } from 'ant-design-vue';
  import SetDeptDrawer from './components/SetDeptDrawer.vue';
  import { createColumns } from './components/cols';

  const open = ref(false);
  const isEdit = ref(false);
  const form = reactive({
    name: '',
    status: null,
  });
  const formRef = ref();
  const currentData = ref();
  const expandedRowKeys = ref<string[]>([]);
  const loading = ref(false);
  const data = ref<DeptList[]>([]);

  const editItem = (record: DeptList) => {
    open.value = true;
    isEdit.value = true;
    currentData.value = record;
  };
  const delItem = (record: DeptList) => {
    message.success('假装删除成功：' + record.name);
    getList();
  };
  const columns = createColumns(editItem, delItem);

  const handleAdd = () => {
    isEdit.value = false;
    open.value = true;
  };

  const handleSearch = async () => {
    getList(form);
  };

  const reset = () => {
    formRef.value.resetFields();
    getList();
  };

  const getList = async (params?: DeptListParams) => {
    loading.value = true;
    const res = await getDeptList(params);
    data.value = listToTree({ list: res.data, orderFiled: 'order' }) as DeptList[];
    expandedRowKeys.value.push(data.value?.[0]?.id);
    loading.value = false;
  };

  onMounted(() => {
    getList();
  });
</script>

<style lang="scss" scoped></style>
