<template>
  <PageWrapper title="页面权限示例" sub-title="注意观察左侧菜单以及用户信息变化" defaultBgColor>
    <div class="mb-2">
      <strong>当前用户：</strong>
      {{ userInfo!.name }}
    </div>
    <div class="mb-2">
      <strong> 当前角色：</strong>
      {{ userInfo!.roles }}
    </div>
    <UserSelector />
  </PageWrapper>
</template>

<script lang="ts" setup>
  import { storeToRefs } from 'pinia';
  import { useUserStore } from '@/store/module/user';
  import UserSelector from '../components/UserSelector.vue';

  const userStore = useUserStore();
  const { userInfo } = storeToRefs(userStore);
</script>

<style lang="scss" scoped></style>
