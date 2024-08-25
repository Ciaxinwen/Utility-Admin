<template>
  <div class="w-full min-h-full flex gap-3">
    <DeptTree class="w-1/5" @change="changeDeptTree" />
    <div class="w-4/5">
      <div class="rounded-1.5 bg-[var(--common-bg-color)] p-4">
        <a-form class="search-form" ref="formRef" :label-col="{ span: 6 }" :model="form">
          <a-row :gutter="36">
            <a-col :span="8">
              <a-form-item label="用户名称" name="username">
                <a-input v-model:value="form.username" placeholder="请输入" allowClear></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="状态" name="status">
                <a-select v-model:value="form.status" placeholder="请选择" allowClear>
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
      </div>
      <Table
        class="mt-3"
        :columns="columns"
        :data-source="data"
        bordered
        title="用户管理"
        rowKey="id"
        :loading
        :pagination="{
          current: page.pageNum,
          pageSize: page.pageSize,
          total: page.total,
          showTotal: (total: number) => `共 ${total} 条`,
        }"
        :row-selection="rowSelection"
        @reload="reset"
      >
        <template #pre-tools>
          <a-button type="primary" @click="handleAdd">
            <template #icon><PlusOutlined /> </template>
            新增
          </a-button>
          <a-button ghost danger :disabled="!selectedKeys.length" @click="handleDel">
            <template #icon><DeleteOutlined /> </template>
            批量删除
          </a-button>
        </template>
      </Table>
    </div>
    <SetUserDrawer v-model:open="open" :data="currentData" :isEdit @reload="isEdit = false" />
  </div>
</template>

<script lang="ts" setup>
  import DeptTree from './components/DeptTree.vue';
  import SetUserDrawer from './components/SetUserDrawer.vue';
  import { Table } from '@/components/Table';
  import { Modal, message } from 'ant-design-vue';
  import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons-vue';
  import { createVNode } from 'vue';
  import { getUserList } from '@/api/system';
  import { UserListParams, UserListItem } from '@/api/system/type';
  import { createColumns } from './components/cols';

  const open = ref(false);
  const loading = ref(false);
  const formRef = ref();
  const form = reactive({
    username: '',
    status: null,
  });
  const isEdit = ref(false);
  const currentData = ref();
  const page = reactive({
    pageSize: 10,
    pageNum: 1,
    total: 0,
  });

  const editItem = (record: UserListItem) => {
    isEdit.value = true;
    currentData.value = record;
    open.value = true;
  };
  const delItem = (record: UserListItem) => {
    message.success('假装删除成功：' + record.username);
    getList();
  };
  const columns = createColumns(editItem, delItem);

  const data = ref();
  const deptKey = ref('');
  const changeDeptTree = (key: string) => {
    deptKey.value = key;
    getList({ ...form, dept: deptKey.value, ...page });
  };

  const reset = () => {
    formRef.value.resetFields();
    selectedKeys.value = [];
    page.pageNum = 1;
    page.pageSize = 10;
    page.total = 0;
    getList(page);
  };

  const handleSearch = async () => {
    getList({ ...form, dept: deptKey.value, ...page });
  };

  const selectedKeys = ref<string[]>([]);
  const rowSelection = ref({
    fixed: true,
    selectedRowKeys: selectedKeys,
    onChange: (selectedRowKeys: string[]) => {
      selectedKeys.value = selectedRowKeys;
    },
  });
  const handleAdd = () => {
    isEdit.value = false;
    open.value = true;
  };

  const handleDel = () => {
    Modal.confirm({
      title: '提示',
      icon: createVNode(ExclamationCircleOutlined),
      content: '请问确认批量删除吗？',
      closable: true,
      onOk() {
        return Promise.resolve().then(() => {
          message.success('假装删除成功');
          reset();
        });
      },
    });
  };

  const getList = async (params?: UserListParams) => {
    loading.value = true;
    const res = await getUserList(params);
    data.value = res.data.rows;
    page.total = res.data.total;
    loading.value = false;
  };

  onMounted(() => {
    getList();
  });
</script>

<style lang="scss" scoped></style>
