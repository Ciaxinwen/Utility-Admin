<template>
  <a-modal
    v-model:open="modelValue"
    :title="$t('components.resizer.modalTitle')"
    :okText="$t('components.resizer.ok')"
    width="800px"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <BasicResizer ref="basicResizerRef" :imgUrl="imgUrl">
      <template #prefixAction>
        <a-upload
          v-model:file-list="fileList"
          accept="image/png, image/jpeg, image/jpg"
          :maxCount="1"
          :showUploadList="false"
          :beforeUpload="() => false"
        >
          <a-button type="primary">
            <template #icon>
              <UploadOutlined />
            </template>
            {{ $t('components.resizer.choose') }}
          </a-button>
        </a-upload>
      </template>
    </BasicResizer>
  </a-modal>
</template>

<script lang="ts" setup>
  import BasicResizer from './BasicResizer.vue';
  import { UploadFile } from 'ant-design-vue';

  const modelValue = defineModel({ type: Boolean, default: false });
  const emits = defineEmits(['submit']);

  const fileList = ref<UploadFile[]>([]);

  const imgUrl = ref('');
  watch(
    fileList,
    () => {
      if (!fileList.value[0]) return;
      const reader = new FileReader();
      reader.readAsDataURL(fileList.value[0].originFileObj as File);
      reader.onload = () => {
        imgUrl.value = reader.result as string;
      };
    },
    {
      deep: true,
    },
  );

  const basicResizerRef = ref();
  const handleSubmit = () => {
    basicResizerRef.value.cropper.getCropBlob((data: Blob) => {
      emits('submit', data);
    });
  };
  const handleCancel = () => {
    modelValue.value = false;
    fileList.value = [];
    imgUrl.value = '';
  };
</script>

<style lang="scss" scoped></style>
