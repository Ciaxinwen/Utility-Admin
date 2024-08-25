<template>
  <PageWrapper title="富文本编辑器示例" subTitle="使用wangeditor" dense>
    <div class="z-10001">
      <Toolbar
        style="border-bottom: 1px solid #cccccc"
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
        mode="default"
      />
      <Editor
        style="overflow-y: hidden; height: 500px"
        v-model="valueHtml"
        :defaultConfig="editorConfig"
        mode="default"
        @onCreated="handleCreated"
      />
    </div>
    <div class="mt-3">
      github地址：<a href="https://github.com/wangeditor-team/wangEditor">
        https://github.com/wangeditor-team/wangEditor
      </a>
    </div>
  </PageWrapper>
</template>

<script lang="ts" setup>
  import '@wangeditor/editor/dist/css/style.css';
  import { IToolbarConfig } from '@wangeditor/editor';
  import { Editor, Toolbar } from '@wangeditor/editor-for-vue';

  const editorRef = shallowRef();
  const valueHtml = ref('<h2>✍️Untility Admin</h2>');
  const toolbarConfig: Partial<IToolbarConfig> = {};
  const editorConfig = { placeholder: '请输入内容...' };

  const handleCreated = (editor: HTMLElement) => {
    editorRef.value = editor; // 记录 editor 实例，重要！
  };

  onBeforeUnmount(() => {
    const editor = editorRef.value;
    if (editor == null) return;
    editor.destroy();
  });
</script>

<style lang="scss" scoped></style>
