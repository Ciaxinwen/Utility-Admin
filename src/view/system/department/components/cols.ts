import { DeptList } from '@/api/system/type';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons-vue';
import { Button, Tag, Divider, Popconfirm } from 'ant-design-vue';

export const createColumns = (onEdit: Function, onDel: Function) => {
  return [
    {
      title: '部门名称',
      dataIndex: 'name',
      fixed: 'left',
    },
    {
      title: '排序',
      dataIndex: 'order',
      align: 'center',
      width: 80,
    },
    {
      title: '状态',
      dataIndex: 'status',
      align: 'center',
      customRender: ({ text }: { text: string }) => {
        return h(Tag, { color: text ? 'green' : 'red' }, () => (text ? '启用' : '停用'));
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      align: 'center',
    },
    {
      title: '备注',
      dataIndex: 'remark',
      align: 'center',
      width: 600,
    },
    {
      title: '操作',
      dataIndex: 'action',
      align: 'center',
      width: 120,
      fixed: 'right',
      customRender: ({ record }: { record: DeptList }) => {
        return h('div', {}, [
          h(Button, {
            type: 'link',
            icon: h(EditOutlined),
            onClick: () => onEdit(record),
          }),
          h(Divider, { type: 'vertical' }),
          h(
            Popconfirm,
            {
              title: '确定删除吗？',
              overlayStyle: {
                width: '200px',
              },
              onConfirm: () => onDel(record),
            },
            () =>
              h(Button, {
                type: 'link',
                danger: true,
                icon: h(DeleteOutlined),
              }),
          ),
        ]);
      },
    },
  ];
};
