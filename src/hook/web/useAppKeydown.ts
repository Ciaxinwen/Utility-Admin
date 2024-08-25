import { storeToRefs } from 'pinia';
import { useSystemStore } from '@/store/module/sys';

/**
 * @description: 全局监听键盘事件
 * @return {*}
 */
export function useAppKeydown() {
  const sysStore = useSystemStore();
  const { openSearchModal } = storeToRefs(sysStore);

  const searchModalFn = (e: KeyboardEvent) => {
    if (e.ctrlKey && e.key.toUpperCase() === 'K') {
      e.preventDefault();
      openSearchModal.value = !openSearchModal.value;
    }
  };

  onMounted(() => {
    addEventListener('keydown', searchModalFn);
  });

  onBeforeUnmount(() => {
    removeEventListener('keydown', searchModalFn);
  });
}
