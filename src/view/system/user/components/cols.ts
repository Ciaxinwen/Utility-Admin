import { UserListItem } from '@/api/system/type';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons-vue';
import { Button, Tag, Divider, Popconfirm } from 'ant-design-vue';

export const createColumns = (onEdit: Function, onDel: Function) => {
  return [
    {
      title: '序号',
      dataIndex: 'index',
      align: 'center',
      width: 60,
      fixed: 'left',
      customRender: ({ index }: { index: number }) => {
        return index + 1;
      },
    },
    // {
    //   title: '头像',
    //   dataIndex: 'avatar',
    //   align: 'center',
    //   customRender: ({ record }: { record: UserListItem }) => {
    //     return h(Avatar, { src: record.avatar });
    //   },
    // },
    {
      title: '名称',
      align: 'center',
      dataIndex: 'username',
    },
    {
      title: '昵称',
      align: 'center',
      dataIndex: 'nickname',
    },
    {
      title: '性别',
      align: 'center',
      customRender: ({ record }: { record: UserListItem }) => {
        return h(
          Tag,
          {
            color: record.sex === 1 ? 'green' : 'red',
          },
          () => (record.sex === 1 ? '男' : '女'),
        );
      },
    },
    {
      title: '部门',
      align: 'center',
      customRender: ({ record }: { record: UserListItem }) => {
        return record.dept.name;
      },
    },
    {
      title: '手机号码',
      align: 'center',
      dataIndex: 'phone',
    },
    {
      title: '状态',
      align: 'center',
      dataIndex: 'status',
      customRender: ({ record }: { record: UserListItem }) => {
        return h(
          Tag,
          {
            color: record.status === 1 ? 'green' : 'red',
          },
          () => (record.status === 1 ? '启用' : '停用'),
        );
      },
    },
    {
      title: '创建时间',
      align: 'center',
      dataIndex: 'createTime',
    },
    {
      title: '操作',
      dataIndex: 'action',
      align: 'center',
      width: 120,
      customRender: ({ record }: { record: UserListItem }) => {
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
