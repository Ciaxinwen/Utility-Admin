import { defineStore } from 'pinia';
import { store } from '..';
import { useLocalStorage } from '@vueuse/core';
import { StorgeKeys } from '@/enum/storgeKeys';

export const useUserStore = defineStore('user', () => {
  const userInfo = ref<UserInfo>();
  const token = useLocalStorage(StorgeKeys.SYS_TOKEN, '');

  return { userInfo, token };
});

export const useUserStoreHook = () => {
  return useUserStore(store);
};
