<template>
  <a-popover
    :open="visible"
    overlayClassName="quarter-picker-popover"
    placement="bottomLeft"
    :arrow="false"
    trigger="click"
  >
    <template #content>
      <div ref="datePoperContentRef" class="quarter-picker-content">
        <div class="quarter-picker-content__header">
          <DoubleLeftOutlined
            class="text-#8c8c8c hover:text-#1f1f1f dark:hover:text-#dedede dark:text-#848484 transition-all duration-300"
            @click="preYear"
          />
          <span>{{ currYear }} 年</span>
          <DoubleRightOutlined
            class="text-#8c8c8c hover:text-#1f1f1f dark:hover:text-#dedede dark:text-#848484 transition-all duration-300"
            @click="nextYear"
          />
        </div>
        <div class="quarter-picker-content__body">
          <span
            v-for="item in pickerList"
            :key="item.id"
            class="hover:bg-#f2f3f5 dark:hover:bg-#313131 transition-all duration-300"
            :style="{
              backgroundColor: isActive(item) ? config.themeColor : '',
              color: isActive(item) ? '#fff' : '',
            }"
            @click="handleChangeValue(item)"
          >
            {{ item.label }}
          </span>
        </div>
      </div>
    </template>
    <a-input
      v-bind="$attrs"
      v-model:value="modelValue"
      prefix-icon="Calendar"
      @input="handleInput"
      @click="visible = true"
    >
      <template #suffix>
        <CalendarOutlined class="dark:text-#4f4f4f text-#bfbfbf" />
      </template>
    </a-input>
  </a-popover>
</template>

<script lang="ts" setup>
  import { getDateRange, DateRangeType, getCurrentDate } from './helper';
  import { onClickOutside } from '@vueuse/core';
  import dayjs from 'dayjs';
  import { useConfigStore } from '@/store/module/config';
  import { storeToRefs } from 'pinia';

  defineOptions({ name: 'QuarterPicker' });

  const emits = defineEmits(['change']);
  const modelValue = defineModel({ type: String, default: '' });

  const configStore = useConfigStore();
  const { config } = storeToRefs(configStore);

  const datePoperContentRef = ref();
  const visible = ref(false);
  const currYear = ref<number>(dayjs().year());
  const pickerList = ref<DateRangeType[]>([]);
  const currData = ref<DateRangeType>();
  const isActive = computed(() => {
    return (item: DateRangeType) => {
      const curArr = modelValue.value ? modelValue.value.split('年') : getCurrentDate().split('年');
      return Number(curArr[0]) === currYear.value && curArr[1] === item.label;
    };
  });

  const startDate = ref<string[]>([]);
  const endDate = ref<string[]>([]);
  const nextYear = () => {
    currYear.value = dayjs()
      .year(currYear.value + 1)
      .year();
  };
  const preYear = () => {
    currYear.value = dayjs()
      .year(currYear.value - 1)
      .year();
  };

  const handleChangeValue = (item: DateRangeType) => {
    currData.value = item;
    modelValue.value = currYear.value + '年' + currData.value.label;
    nextTick(() => {
      visible.value = false;
    });
  };

  const handleInput = async (value: string) => {
    if (!value) return;
    modelValue.value = value;
    await nextTick();
    emits('change', {
      value,
      startDate: currYear.value + (currData.value ? startDate.value[currData.value.id - 1] : ''),
      endDate: currYear.value + (currData.value ? endDate.value[currData.value.id - 1] : ''),
    });
  };

  watch(
    modelValue,
    () => {
      const { list, start, end } = getDateRange();
      pickerList.value = list;
      currData.value = list[0];
      startDate.value = start;
      endDate.value = end;
      if (modelValue.value) {
        currYear.value = +modelValue.value.split('年')[0];
      } else {
        currYear.value = dayjs().year();
      }
    },
    {
      immediate: true,
    },
  );

  onClickOutside(datePoperContentRef, () => {
    visible.value = false;
  });
</script>

<style lang="scss" scoped>
  .quarter-picker-content {
    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 12px;
      font-size: 16px;
    }

    &__body {
      display: flex;
      flex-wrap: nowrap;
      gap: 10px;
      padding-top: 12px;
      width: 100%;

      & > span {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 8px;
        height: 40px;
        border-radius: 8px;
        text-align: center;
        cursor: pointer;
      }
    }
  }
</style>
