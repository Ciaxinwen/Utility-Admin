<template>
  <div class="basic-resizer w-full flex">
    <div class="min-h-380px flex-grow-1">
      <div class="h-90%">
        <VueCropper
          ref="cropper"
          :img="imgUrl"
          :info="true"
          :autoCrop="options.autoCrop"
          :autoCropWidth="options.autoCropWidth"
          :autoCropHeight="options.autoCropHeight"
          :fixedBox="options.fixedBox"
          :outputType="options.outputType"
          @realTime="handleRealTime"
        />
      </div>
      <div v-if="actions" class="mt-2 flex justify-between">
        <div>
          <slot name="prefixAction" />
        </div>
        <div v-show="showOperation">
          <a-tooltip :title="$t('components.resizer.zoomIn')" placement="bottom">
            <a-button type="primary" @click="cropper.changeScale(1.1)">
              <template #icon>
                <ZoomInOutlined />
              </template>
            </a-button>
          </a-tooltip>
          <a-tooltip :title="$t('components.resizer.zoomOut')" placement="bottom">
            <a-button type="primary" @click="cropper.changeScale(-1.1)">
              <template #icon>
                <ZoomOutOutlined />
              </template>
            </a-button>
          </a-tooltip>
          <a-tooltip :title="$t('components.resizer.clockwise')" placement="bottom">
            <a-button type="primary" @click="cropper.rotateRight()">
              <template #icon>
                <RedoOutlined />
              </template>
            </a-button>
          </a-tooltip>
          <a-tooltip :title="$t('components.resizer.anticlockwise')" placement="bottom">
            <a-button type="primary" @click="cropper.rotateLeft()">
              <template #icon>
                <UndoOutlined />
              </template>
            </a-button>
          </a-tooltip>
        </div>
      </div>
    </div>
    <div class="flex items-center mx-30px">
      <div
        class="preview-box overflow-hidden w-250px h-250px border border-solid border-#ccc rounded-1/2 dark:border-#303030"
      >
        <img :src="previews.url" :style="previews.img" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import 'vue-cropper/dist/index.css';
  import { VueCropper } from 'vue-cropper';

  defineOptions({ name: 'BasicResizer' });

  const props = defineProps({
    imgUrl: {
      type: String,
      default: '',
    },
    actions: {
      type: Boolean,
      default: true,
    },
  });

  const showOperation = computed(() => props.imgUrl.length);

  const cropper = ref();
  const options = reactive({
    autoCropWidth: 250,
    autoCropHeight: 250,
    outputType: 'png',
    autoCrop: true,
    fixedBox: false,
  });

  const previews = ref({ url: '', img: null });
  const handleRealTime = (data: any) => {
    previews.value = data;
  };

  defineExpose({ cropper });
</script>

<style lang="scss" scoped></style>
