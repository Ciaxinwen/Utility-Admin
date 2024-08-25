import { PropType } from 'vue';
import type { TableColumnsType } from 'ant-design-vue';

export enum TableSize {
  SMALL = 'small',
  MIDDLE = 'middle',
  LARGE = 'large',
}

export const tableSizeCols = [
  {
    title: '紧凑',
    key: TableSize.SMALL,
  },
  {
    title: '中等',
    key: TableSize.MIDDLE,
  },
  {
    title: '宽松',
    key: TableSize.LARGE,
  },
];

export const TableProps = {
  title: {
    type: String,
    default: '',
  },
  size: {
    type: String as PropType<TableSize>,
    default: TableSize.MIDDLE,
  },
  columns: {
    type: Array as PropType<TableColumnsType>,
    default: () => [],
  },
};
