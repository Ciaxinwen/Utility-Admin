<template>
  <PageWrapper title="Markdown编辑器" subTitle="使用vditor" dense>
    <div id="vditor"></div>
    <div class="mt-3">
      github地址：<a href="https://github.com/Vanessa219/vditor">
        https://github.com/Vanessa219/vditor
      </a>
    </div>
  </PageWrapper>
</template>

<script lang="ts" setup>
  import Vditor from 'vditor';
  import 'vditor/dist/index.css';

  const vditor = ref();
  onMounted(() => {
    vditor.value = new Vditor('vditor', {
      value: `##### utility Admin🎉️ `,
      height: '50vh',
      width: '100%',
      mode: 'sv', //sv, ir, wysiwyg
      placeholder: '输入内容',
      toolbarConfig: {
        hide: false,
        pin: false,
      },
      cache: {
        enable: false,
      },
      preview: {
        actions: [],
      },
    });
  });
</script>

<style lang="scss" scoped></style>
