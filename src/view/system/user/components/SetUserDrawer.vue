<template>
  <a-drawer v-model:open="open" :title placement="right" @close="reset">
    <a-form ref="formRef" :model="form" layout="vertical">
      <a-form-item label="名称" name="username" required>
        <a-input v-model:value="form.username" placeholder="请输入名称" allowClear />
      </a-form-item>
      <a-form-item label="昵称" name="nickname" required>
        <a-input v-model:value="form.nickname" placeholder="请输入昵称" allowClear />
      </a-form-item>
      <a-form-item label="性别" name="sex" required>
        <a-radio-group v-model:value="form.sex" button-style="solid">
          <a-radio-button :value="1">男</a-radio-button>
          <a-radio-button :value="0">女</a-radio-button>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="部门" name="deptId" required>
        <a-tree-select
          v-model:value="form.deptId"
          placeholder="请选择部门"
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
      <a-form-item label="手机号码" name="phone" required>
        <a-input v-model:value="form.phone" placeholder="请输入手机号码" allowClear />
      </a-form-item>
      <a-form-item label="状态" name="status" required>
        <a-radio-group v-model:value="form.status" button-style="solid">
          <a-radio-button :value="1">启用</a-radio-button>
          <a-radio-button :value="0">停用</a-radio-button>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="邮箱" name="email" required>
        <a-input v-model:value="form.email" placeholder="请输入邮箱" allowClear />
      </a-form-item>
      <a-form-item label="角色" name="role" required>
        <a-select v-model:value="form.role" placeholder="请选择角色" allowClear>
          <a-select-option v-for="item in roleOptions" :key="item.id" :value="item.roleCode">
            {{ item.roleName }}
          </a-select-option>
        </a-select>
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
  import { getDeptList, getRoleOptions } from '@/api/system';
  import { listToTree } from '@/utils/tree';
  import { DeptList, DeptListParams, RoleOptionItem } from '@/api/system/type';
  import { message } from 'ant-design-vue';
  import { PropType } from 'vue';
  import { useFormValue } from '@/hook/web/useFormValue';

  interface Form {
    username: string;
    nickname: string;
    phone: string;
    email: string;
    sex: number;
    status: number;
    deptId: number | null;
    role: string | null;
    dept?: {
      id: number;
    };
  }

  const props = defineProps({
    isEdit: { type: Boolean, default: false },
    data: { type: Object as PropType<Form>, default: () => ({}) },
  });
  const emits = defineEmits(['reload']);
  const open = defineModel('open', { type: Boolean, default: false });
  const title = computed(() => (props.isEdit ? '编辑用户' : '新增用户'));

  const treeData = ref<DeptList[]>([]);
  const formRef = ref();
  const { form, resetFormValue, setFormValue } = useFormValue<Form>({
    username: '',
    nickname: '',
    deptId: null,
    phone: '',
    status: 1,
    sex: 1,
    email: '',
    role: null,
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

  const getList = async (params?: DeptListParams) => {
    const res = await getDeptList(params);
    treeData.value = listToTree({ list: res.data, orderFiled: 'order' }) as DeptList[];
  };

  const roleOptions = ref<RoleOptionItem[]>([]);
  const getOptions = async () => {
    const res = await getRoleOptions();
    roleOptions.value = res.data;
  };

  watch(
    () => open.value,
    () => {
      if (open.value && props.isEdit) {
        setFormValue({ ...props.data, deptId: props.data?.dept?.id || null });
      }
    },
  );

  onMounted(() => {
    getList();
    getOptions();
  });
</script>

<style lang="scss" scoped></style>
