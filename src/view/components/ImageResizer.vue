<template>
  <div w-full>
    <PageHeader title="图片裁剪组件" />
    <a-card mt-3 title="BasicResizer基础图片裁剪组件">
      <div class="w-3/5">
        <BasicResizer
          ref="basicResizer"
          imgUrl="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
        >
          <template #prefixAction> </template>
        </BasicResizer>
      </div>
    </a-card>
    <a-card mt-3 title="UploadResizerModal图片裁剪弹窗组件">
      <div class="flex flex-col items-center w-200px">
        <div
          class="w-200px h-200px rounded-1/2 border-1 border-solid border-#eee dark:border-#303030 mb-4 overflow-hidden hover:cursor-pointer"
          @click="showModal = true"
        >
          <div
            class="w-full h-full text-6xl bg-#999 color-#ccc dark:bg-#0d0d0d opacity-50 hover:opacity-100 transition duration-150 ease-in-out flex items-center justify-center"
          >
            <CloudUploadOutlined />
          </div>
        </div>
        <a-button @click="showModal = true">
          <template #icon>
            <UploadOutlined />
          </template>
          选择图片
        </a-button>
      </div>
    </a-card>
    <UploadResizerModal v-model="showModal" />
  </div>
</template>

<script lang="ts" setup>
  import { BasicResizer, UploadResizerModal } from '@/components/ImageResizer';

  const basicResizer = ref();
  const showModal = ref(false);
</script>

<style lang="scss" scoped></style>
