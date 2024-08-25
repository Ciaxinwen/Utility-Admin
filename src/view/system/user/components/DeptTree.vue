<template>
  <div class="bg-[var(--common-bg-color)]">
    <div flex items-center p-3>
      <a-input-search
        v-model:value="searchDept"
        placeholder="搜索部门"
        allow-clear
        @search="onSearch"
      />
      <a-dropdown trigger="click">
        <MoreOutlined style="font-size: 20px; cursor: pointer" />
        <template #overlay>
          <a-menu @click="handleExpandDept">
            <a-menu-item key="expand"> 展开全部 </a-menu-item>
            <a-menu-item key="un-expand"> 折叠全部 </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
    <a-divider style="margin: unset" />
    <div class="p-3">
      <a-tree
        v-model:expandedKeys="expandedKeys"
        v-model:selectedKeys="selectedKeys"
        :tree-data="treeData"
        :fieldNames="{
          children: 'children',
          title: 'name',
          key: 'id',
        }"
        @select="handleSelectDept"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { getDeptList } from '@/api/system';
  import { listToTree } from '@/utils/tree';
  import { DeptList, DeptListParams } from '@/api/system/type';
  import { cloneDeep } from 'lodash';

  const emits = defineEmits(['change']);

  const searchDept = ref('');
  const onSearch = () => {
    getList({
      name: searchDept.value,
    });
  };
  const handleExpandDept = ({ key }: { key: string }) => {
    if (key === 'expand') {
      expandedKeys.value = expandedKeysCache.value;
    } else if (key === 'un-expand') {
      expandedKeys.value = [];
    }
  };
  const treeLoading = ref(false);
  const expandedKeysCache = ref<string[]>([]);
  const expandedKeys = ref<string[]>([]);
  const selectedKeys = ref<string[]>([]);
  const treeData = ref<DeptList[]>([]);
  const handleSelectDept = (selectedKeys: Array<string>) => {
    emits('change', selectedKeys[0]);
  };

  const getList = async (params?: DeptListParams) => {
    treeLoading.value = true;
    const res = await getDeptList(params);
    treeData.value = listToTree({ list: res.data, orderFiled: 'order' }) as DeptList[];
    expandedKeys.value = res.data.filter((item) => item?.children?.length).map((item) => item.id);
    expandedKeysCache.value = cloneDeep(expandedKeys.value);
    treeLoading.value = false;
  };

  onMounted(() => {
    getList();
  });
</script>

<style lang="scss" scoped></style>
