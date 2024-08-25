import { storeToRefs } from 'pinia';
import { useUserStore } from '@/store/module/user';

export const usePermission = () => {
  const userStore = useUserStore();
  const { userInfo } = storeToRefs(userStore);

  const getCurrentRoles = () => userInfo.value!.roles;

  /**
   * @description: 判断是否有权限
   * @param {string | string[]} value 权限标识
   * @return {boolean}
   */
  const hasPermission = (value: string | string[]) => {
    if (!value) {
      return false;
    }
    const { auth_code } = userInfo.value as UserInfo;
    if (auth_code.includes('*')) {
      return true;
    }
    if (typeof value === 'string') {
      return auth_code.includes(value);
    }
    if (value instanceof Array) {
      return value.some((item) => auth_code.includes(item));
    }
    return true;
  };

  return {
    getCurrentRoles,
    hasPermission,
  };
};
