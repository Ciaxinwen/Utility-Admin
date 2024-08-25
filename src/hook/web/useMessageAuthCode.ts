import { useI18n } from 'vue-i18n';

export const useMessageAuthCode = (wait: number = 60) => {
  const { t } = useI18n();

  const text = ref(t('login.getCode'));
  const disabled = ref(false);

  const timer = ref();

  const getCode = () => {
    timer.value = setInterval(() => {
      // 倒计时
      wait--;
      if (wait === 0) {
        disabled.value = false;
        text.value = t('login.getCode');
      } else {
        disabled.value = true;
        text.value = t('login.regain', { second: wait });
      }
    }, 1000);
  };

  onUnmounted(() => {
    clearInterval(timer.value);
  });

  return {
    wait,
    text,
    disabled,
    getCode,
  };
};
