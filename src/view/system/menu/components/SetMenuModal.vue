<template>
  <a-modal v-model:open="open" :title width="750px" @ok="ok" @cancel="cancel">
    <a-form class="mt-6" ref="formRef" :model="form" layout="horizontal" :label-col="{ span: 7 }">
      <a-row>
        <a-col :span="12">
          <a-form-item label="菜单类型" name="type" required>
            <a-radio-group v-model:value="form.type" button-style="solid">
              <a-radio-button :value="0">目录</a-radio-button>
              <a-radio-button :value="1">菜单</a-radio-button>
              <a-radio-button :value="2">按钮</a-radio-button>
            </a-radio-group>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="12">
          <a-form-item label="菜单名称" name="title" required>
            <a-input v-model:value="form.title" placeholder="请输入菜单名称" allowClear />
          </a-form-item>
        </a-col>
        <a-col v-show="form.type !== 2" :span="12">
          <a-form-item label="路径" name="path" required>
            <a-input v-model:value="form.path" placeholder="请输入路径" allowClear />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="上级菜单" name="parentId">
            <a-tree-select
              v-model:value="form.parentId"
              placeholder="请选择部门"
              allow-clear
              :tree-data="treeData"
              tree-node-filter-prop="title"
              :field-names="{
                children: 'children',
                label: 'title',
                value: 'id',
              }"
            >
              <template #title="{ title }"> {{ $t(title) }} </template>
            </a-tree-select>
          </a-form-item>
        </a-col>
        <a-col v-show="form.type !== 2" :span="12">
          <a-form-item label="图标" name="icon">
            <a-form-item-rest>
              <IconPicker v-model="form.icon" />
            </a-form-item-rest>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="排序" name="order" required="">
            <a-input-number
              v-model:value="form.order"
              :min="1"
              placeholder="请输入排序"
              style="width: 100%"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="权限标识" name="permission" required>
            <a-input v-model:value="form.permission" placeholder="请输入权限标识" allowClear />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="状态" name="status" required>
            <a-radio-group v-model:value="form.status" button-style="solid">
              <a-radio-button :value="0">启用</a-radio-button>
              <a-radio-button :value="1">停用</a-radio-button>
            </a-radio-group>
          </a-form-item>
        </a-col>
        <a-col v-if="form.type === 1" :span="12">
          <a-form-item label="外链" name="isLink" required>
            <a-radio-group v-model:value="form.isLink" button-style="solid">
              <a-radio-button :value="1">是</a-radio-button>
              <a-radio-button :value="0">否</a-radio-button>
            </a-radio-group>
          </a-form-item>
        </a-col>
        <a-col v-show="form.type !== 2" :span="12">
          <a-form-item label="是否隐藏" name="isShow" required>
            <a-radio-group v-model:value="form.isShow" button-style="solid">
              <a-radio-button :value="1">是</a-radio-button>
              <a-radio-button :value="0">否</a-radio-button>
            </a-radio-group>
          </a-form-item>
        </a-col>
        <a-col v-show="form.type === 1" :span="12">
          <a-form-item label="系统首页" name="isHomePage" required>
            <a-radio-group v-model:value="form.isHomePage" button-style="solid">
              <a-radio-button :value="1">是</a-radio-button>
              <a-radio-button :value="0">否</a-radio-button>
            </a-radio-group>
          </a-form-item>
        </a-col>
        <a-col v-show="form.type !== 2" :span="12">
          <a-form-item label="缓存" name="keepAlive" required>
            <a-radio-group v-model:value="form.keepAlive" button-style="solid">
              <a-radio-button :value="1">是</a-radio-button>
              <a-radio-button :value="0">否</a-radio-button>
            </a-radio-group>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-modal>
</template>
<script lang="ts" setup>
  import { message } from 'ant-design-vue';
  import { useFormValue } from '@/hook/web/useFormValue';
  import { PropType } from 'vue';
  import { useI18n } from 'vue-i18n';

  interface Form {
    path?: string;
    title: string;
    icon?: string;
    order?: number | null;
    keepAlive?: 0 | 1;
    children?: Array<MenuListItem>;
    status: 0 | 1;
    isShow?: 0 | 1;
    isHomePage?: 0 | 1;
    parentId: string | number | null;
    permission: string;
    isLink?: 0 | 1;
    type: 0 | 1 | 2;
  }

  const props = defineProps({
    isEdit: { type: Boolean, default: false },
    data: { type: Object as PropType<Form>, default: () => ({}) },
    treeData: { type: Array, default: () => [] },
  });
  const open = defineModel('open', { type: Boolean });
  const title = computed(() => (props.isEdit ? '编辑菜单' : '新增菜单'));
  const emits = defineEmits(['reload']);

  const { t } = useI18n();
  const formRef = ref();
  const { form, resetFormValue, setFormValue } = useFormValue<Form>({
    title: '',
    type: 0,
    path: '',
    parentId: null,
    icon: '',
    order: null,
    permission: '',
    status: 0,
    isShow: 1,
    isHomePage: 1,
    keepAlive: 1,
    isLink: 0,
  });

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

  watch(
    () => open.value,
    () => {
      if (open.value && props.isEdit) {
        setFormValue(props.data);
        form.value.title = t(props.data.title);
      }
    },
  );
</script>
