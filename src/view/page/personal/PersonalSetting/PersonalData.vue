<template>
  <div class="flex gap-6 ml-6">
    <div class="pos-relative h-max">
      <a-avatar :size="120" :src="userInfo?.avatar" />
      <a-button
        class="pos-absolute bottom-0 right-1/2 translate-x-1/2 translate-y-1/2"
        type="primary"
        shape="circle"
        @click="showModal = true"
      >
        <template #icon>
          <CameraOutlined />
        </template>
      </a-button>
    </div>
    <a-form
      class="flex-grow-1 max-w-xl"
      :model="formState"
      :label-col="{ span: 3 }"
      :wrapper-col="{ span: 16 }"
      @finish="onFinish"
    >
      <a-form-item label="昵称" name="name">
        <a-input v-model:value="formState.name" placeholder="请输入昵称" allowClear />
      </a-form-item>
      <a-form-item label="邮箱" name="email">
        <a-input v-model:value="formState.email" placeholder="请输入邮箱" allowClear />
      </a-form-item>
      <a-form-item label="个人简介" name="desc">
        <a-textarea v-model:value="formState.desc" placeholder="请输入个人简介" allowClear />
      </a-form-item>
      <a-form-item label="联系电话" name="phone">
        <a-input v-model:value="formState.phone" placeholder="请输入联系电话" allowClear />
      </a-form-item>
      <a-form-item label="所在地区" name="area">
        <a-input v-model:value="formState.area" placeholder="请输入所在地区" allowClear />
      </a-form-item>
      <a-form-item :wrapper-col="{ offset: 3 }">
        <a-button type="primary" html-type="submit">保存</a-button>
      </a-form-item>
    </a-form>
  </div>
  <UploadResizerModal v-model="showModal" />
</template>

<script lang="ts" setup>
  import { useUserStore } from '@/store/module/user';
  import { storeToRefs } from 'pinia';
  import { UploadResizerModal } from '@/components/ImageResizer';

  const userStore = useUserStore();
  const { userInfo } = storeToRefs(userStore);

  const showModal = ref(false);
  const formState = ref({
    name: '',
    email: '',
    desc: '',
    phone: '',
    area: '',
  });

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  onMounted(() => {
    Object.assign(formState.value, userInfo.value);
  });
</script>

<style lang="scss" scoped></style>
