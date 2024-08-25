import { cloneDeep } from 'lodash';

export const useFormValue = <T>(raw: T) => {
  const form = ref<T>() as Ref<T>;

  watch(
    () => raw,
    (newVal) => {
      form.value = cloneDeep(newVal);
    },
    {
      immediate: true,
    },
  );

  function resetFormValue() {
    form.value = cloneDeep(raw);
  }

  function setFormValue(data: T) {
    form.value = cloneDeep(data);
  }

  return {
    form,
    resetFormValue,
    setFormValue,
  };
};
