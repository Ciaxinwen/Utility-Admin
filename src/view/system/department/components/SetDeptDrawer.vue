<template>
  <a-drawer v-model:open="open" :title placement="right" @close="reset">
    <a-form ref="formRef" :model="form" layout="vertical">
      <a-form-item label="部门名称" name="name" required>
        <a-input v-model:value="form.name" placeholder="请输入部门名称" allowClear />
      </a-form-item>
      <a-form-item label="上级部门" name="parentId" :required="!isEdit || Boolean(form.parentId)">
        <a-tree-select
          v-model:value="form.parentId"
          placeholder="请选择上级部门"
          allow-clear
          :tree-data="treeData"
          tree-default-expand-all
          tree-node-filter-prop="name"
          :field-names="{
            children: 'children',
            label: 'name',
            value: 'id',
          }"
        />
      </a-form-item>
      <a-form-item label="负责人" name="principal" required>
        <a-input v-model:value="form.principal" placeholder="请输入负责人" allowClear />
      </a-form-item>
      <a-form-item label="排序" name="order" required>
        <a-input-number v-model:value="form.order" :min="1" />
      </a-form-item>
      <a-form-item label="状态" name="status" required>
        <a-radio-group v-model:value="form.status" button-style="solid">
          <a-radio-button :value="1">启用</a-radio-button>
          <a-radio-button :value="0">停用</a-radio-button>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="备注" name="remark">
        <a-textarea v-model:value="form.remark" placeholder="请输入备注" allowClear />
      </a-form-item>
    </a-form>

    <template #footer>
      <div text-end>
        <a-button type="primary" @click="ok">确定</a-button>
        <a-button @click="reset">取消</a-button>
      </div>
    </template>
  </a-drawer>
</template>

<script lang="ts" setup>
  import { PropType } from 'vue';
  import type { DeptList } from '@/api/system/type';
  import { message } from 'ant-design-vue';
  import { useFormValue } from '@/hook/web/useFormValue';

  interface Form {
    name: string;
    parentId: string | null;
    order: number;
    principal: string;
    status: number;
    remark: string;
    children?: DeptList[];
  }

  const props = defineProps({
    data: { type: Object as PropType<Form>, default: () => ({}) },
    treeData: { type: Array as PropType<DeptList[]>, default: () => [] },
    isEdit: { type: Boolean, default: false },
  });
  const emits = defineEmits(['reload']);
  const open = defineModel('open', {
    type: Boolean,
    default: false,
  });
  const title = computed(() => (props.isEdit ? '编辑部门' : '新增部门'));

  const formRef = ref();

  const { form, resetFormValue, setFormValue } = useFormValue<Form>({
    name: '',
    parentId: null,
    order: 0,
    principal: '',
    status: 1,
    remark: '',
  });

  const ok = async () => {
    await formRef.value.validate();
    message.success('操作成功');
    emits('reload');
    reset();
  };

  const reset = () => {
    resetFormValue();
    open.value = false;
  };

  watch(
    () => open.value,
    () => {
      if (open.value && props.isEdit) {
        setFormValue(props.data);
      }
    },
  );
</script>
