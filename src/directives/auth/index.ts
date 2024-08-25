import type { Directive, DirectiveBinding } from 'vue';
import { usePermission } from '@/hook/web/usePermission';

/**
 * @description: 权限判断
 */
export const auth: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const { value } = binding;
    const { hasPermission } = usePermission();

    if (!value) return;
    if (!hasPermission(value)) {
      el.parentNode && el.parentNode.removeChild(el);
    }
  },
};
