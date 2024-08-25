export function useSystemTitle() {
  const SYS_NAME = import.meta.env.VITE_SYSTEM_NAME;

  const systemTitle = ref<string>(SYS_NAME);

  function setTitle(subTitle: string) {
    systemTitle.value = `${subTitle} - ${SYS_NAME}`;
    document.title = systemTitle.value;
  }

  function resetTitle() {
    systemTitle.value = SYS_NAME;
    document.title = systemTitle.value;
  }

  return { systemTitle, setTitle, resetTitle };
}
