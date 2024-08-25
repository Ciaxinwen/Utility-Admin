import dayjs from 'dayjs';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';
import { cloneDeep } from 'lodash';
import { toChineseNum } from '@/utils/convert';

dayjs.extend(quarterOfYear);

export interface DateRangeType {
  label: string;
  id: number;
}

export interface DateRangeData {
  list: DateRangeType[];
  start: string[];
  end: string[];
}

const quarterData: DateRangeData = {
  list: [
    {
      id: 1,
      label: '第一季度',
    },
    {
      id: 2,
      label: '第二季度',
    },
    {
      id: 3,
      label: '第三季度',
    },
    {
      id: 4,
      label: '第四季度',
    },
  ],
  start: ['-01-01', '-04-01', '-07-01', '-10-01'],
  end: ['-03-31', '-06-30', '-09-30', '-12-31'],
};

/**
 * @description: 获取初始数据
 * @return {*}
 */
export const getDateRange = () => cloneDeep(quarterData);

/**
 * @description: 获取当前时间（季度）
 * @return {*}
 */
export const getCurrentDate = () => {
  const y = dayjs().year();
  const q = toChineseNum(dayjs().quarter());
  return `${y}年第${q}季度`;
};
