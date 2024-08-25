<template>
  <span class="number-animate">{{ digit }}</span>
</template>

<script lang="ts" setup>
  const props = defineProps({
    count: {
      type: Number,
      default: 0,
    },
    duration: {
      type: Number,
      default: 1000,
    },
    separator: {
      type: String,
      default: ',',
    },
  });

  const _count = ref(0);
  const fixed = ref(0);
  const digit = computed(() => {
    const splitRes = _count.value.toFixed(fixed.value).split('.');
    let int = splitRes[0].split('').reverse();
    const float = splitRes[1];
    let arr: string[] = [];
    for (let i = 0; i < int.length; i++) {
      if (!(i % 3) && i) arr.push(props.separator);
      arr.push(int[i]);
    }
    return arr.reverse().join('') + (float ? `.${float}` : '');
  });

  const hasManyDecimalPoint = (num: number) => {
    const numPoint = num.toString().split('.')?.[1];
    return numPoint ? numPoint.length : 0;
  };

  watch(
    () => props,
    () => {
      const { count, duration } = props;
      const rate = 30;
      const step = (count / duration) * rate;
      fixed.value = hasManyDecimalPoint(count);

      let timer: NodeJS.Timeout | null = setInterval(() => {
        if (_count.value > count) {
          _count.value = count;
          clearInterval(timer as NodeJS.Timeout);
          timer = null;
          return;
        }
        _count.value = _count.value + step;
      }, rate);
    },
    {
      deep: true,
      immediate: true,
    },
  );
</script>

<style lang="scss" scoped></style>
