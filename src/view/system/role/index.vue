<template>
  <PageWrapper dense>
    <template #header>
      <a-form class="search-form" ref="formRef" :label-col="{ span: 6 }" :model="form">
        <a-row :gutter="36">
          <a-col :span="8">
            <a-form-item label="角色名称" name="roleName">
              <a-input v-model:value="form.roleName" placeholder="请输入"></a-input>
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
      title="角色管理"
      rowKey="id"
      :loading
      sticky
      v-model:expandedRowKeys="expandedRowKeys"
      :pagination="{
        current: page.pageNum,
        pageSize: page.pageSize,
        total: page.total,
        showTotal: (total: number) => `共 ${total} 条`,
      }"
      @reload="reset"
    >
      <template #pre-tools>
        <a-button type="primary" @click="handleAdd">
          <template #icon><PlusOutlined /> </template>
          新增
        </a-button>
      </template>
    </Table>
    <SetRoleModal v-model:open="open" :isEdit :data="currentData" />
  </PageWrapper>
</template>

<script lang="ts" setup>
  import { getRoleList } from '@/api/system';
  import type { DeptList, RoleListParams } from '@/api/system/type';
  import { Table } from '@/components/Table';
  import { message } from 'ant-design-vue';
  import SetRoleModal from './components/SetRoleModal.vue';
  import { createColumns } from './components/cols';

  const open = ref(false);
  const isEdit = ref(false);
  const form = reactive({
    roleName: '',
    status: null,
  });
  const formRef = ref();
  const currentData = ref();
  const expandedRowKeys = ref<string[]>([]);
  const loading = ref(false);
  const data = ref<DeptList[]>([]);
  const page = reactive({
    pageSize: 10,
    pageNum: 1,
    total: 0,
  });

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
    getList({ ...form, ...page });
  };

  const reset = () => {
    formRef.value.resetFields();
    page.pageNum = 1;
    page.pageSize = 10;
    page.total = 0;
    getList(page);
  };

  const getList = async (params?: RoleListParams) => {
    loading.value = true;
    const res = await getRoleList(params);
    data.value = res.data.rows;
    loading.value = false;
  };

  onMounted(() => {
    getList();
  });
</script>

<style lang="scss" scoped></style>
