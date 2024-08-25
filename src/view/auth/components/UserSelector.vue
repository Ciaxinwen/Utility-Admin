<template>
  <a-select v-model:value="role" style="width: 200px" @change="handleChange">
    <a-select-option value="superAdmin">超级管理员</a-select-option>
    <a-select-option value="user">普通用户</a-select-option>
  </a-select>
</template>

<script lang="ts" setup>
  import { storeToRefs } from 'pinia';
  import { useUserStore } from '@/store/module/user';
  import { useSystemStore } from '@/store/module/sys';
  import { getUserInfo, login } from '@/api/common';

  const emits = defineEmits(['change']);
  const userStore = useUserStore();
  const sysStore = useSystemStore();
  const { userInfo, token } = storeToRefs(userStore);

  const handleChange = async (val: string) => {
    // 更新用户信息  重新获取菜单
    const res1 = await login({
      username: val === 'superAdmin' ? 'utility' : val,
      password: '123456',
    });
    token.value = res1.data.token;
    const res2 = await getUserInfo();
    userInfo.value = res2.data;
    sysStore.getMenus();
    emits('change');
  };

  const role = ref<string>('');

  watch(
    userInfo,
    () => {
      role.value = userInfo.value!.roles[0] || '';
    },
    {
      immediate: true,
    },
  );
</script>

<style lang="scss" scoped></style>
