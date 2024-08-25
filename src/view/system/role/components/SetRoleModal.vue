<template>
  <a-modal v-model:open="open" :title width="550px" destroyOnClose @ok="ok" @cancel="cancel">
    <a-form class="my-6" ref="formRef" :model="form" layout="horizontal" :label-col="{ span: 4 }">
      <a-form-item label="角色名称" name="roleName" required>
        <a-input v-model:value="form.roleName" placeholder="请输入角色名称" allowClear />
      </a-form-item>
      <a-form-item label="角色标识" name="roleCode" required>
        <a-input v-model:value="form.roleCode" placeholder="请输入角色标识" allowClear />
      </a-form-item>
      <a-form-item label="菜单分配" name="menus" required>
        <a-tree-select
          v-model:value="form.menus"
          placeholder="请选择菜单"
          allow-clear
          :tree-data="treeData"
          tree-node-filter-prop="title"
          tree-checkable
          :showCheckedStrategy="TreeSelect.SHOW_PARENT"
          :field-names="{
            children: 'children',
            label: 'title',
            value: 'id',
          }"
        >
          <template #title="{ title }"> {{ title }} </template>
          <template #tagRender="{ label, closable, onClose }">
            <a-tag :closable="closable" color="blue" @close="onClose">
              {{ label }}&nbsp;&nbsp;
            </a-tag>
          </template>
        </a-tree-select>
      </a-form-item>
      <a-form-item label="状态" name="status" required>
        <a-radio-group v-model:value="form.status" button-style="solid">
          <a-radio-button :value="1">启用</a-radio-button>
          <a-radio-button :value="0">停用</a-radio-button>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="备注" name="remark">
        <a-textarea
          v-model:value="form.remark"
          placeholder="请输入备注"
          :auto-size="{ minRows: 3, maxRows: 5 }"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script lang="ts" setup>
  import { message, TreeSelect } from 'ant-design-vue';
  import { getMenuList } from '@/api/system';
  import { useFormValue } from '@/hook/web/useFormValue';
  import { PropType } from 'vue';

  interface Form {
    roleName: string;
    roleCode: string;
    remark: string;
    menus: number[];
    status: number;
  }

  const props = defineProps({
    isEdit: { type: Boolean, default: false },
    data: { type: Object as PropType<Form>, default: () => ({}) },
  });
  const open = defineModel('open', { type: Boolean });
  const title = computed(() => (props.isEdit ? '编辑角色' : '新增角色'));
  const emits = defineEmits(['reload']);

  const formRef = ref();
  const { form, resetFormValue, setFormValue } = useFormValue<Form>({
    roleName: '',
    roleCode: '',
    remark: '',
    menus: [],
    status: 0,
  });
  const treeData = ref<MenuListItem[]>([]);

  const ok = async () => {
    await formRef.value.validate();
    message.success('操作成功');
    emits('reload');
    cancel();
  };

  const cancel = () => {
    resetFormValue();
    open.value = false;
  };

  const getMenuData = async () => {
    const res = await getMenuList();
    treeData.value = res.data;
  };

  watch(
    () => open.value,
    () => {
      if (open.value && props.isEdit) {
        setFormValue(props.data);
      }
    },
  );

  onMounted(() => {
    getMenuData();
  });
</script>
