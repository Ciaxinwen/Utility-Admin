import SvgIcon from '@/components/Icon/src/SvgIcon.vue';
import { DeleteOutlined, EditOutlined, StarFilled } from '@ant-design/icons-vue';
import { Button, Tag, Divider, Popconfirm, Tooltip } from 'ant-design-vue';

export const createColumns = (onEdit: Function, onDel: Function) => {
  return [
    {
      title: '菜单名称',
      dataIndex: 'title',
      width: 230,
      fixed: 'left',
      customRender: ({ record }: { record: MenuListItem }) => {
        return !record.isHomePage
          ? record.title
          : h('div', { class: 'flex items-center gap-2' }, [
              h(
                Tooltip,
                {
                  title: '系统主页',
                },
                () =>
                  h(StarFilled, {
                    style: 'color:#fbbf24; font-size:18px',
                  }),
              ),
              record.title,
            ]);
      },
    },
    {
      title: '图标',
      dataIndex: 'icon',
      align: 'center',
      width: 70,
      customRender: ({ record }: { record: MenuListItem }) => {
        return h(SvgIcon, { name: record.icon?.split(':')[1] || '' });
      },
    },
    {
      title: '权限标识',
      dataIndex: 'permission',
      width: 260,
    },
    {
      title: '路由路径',
      dataIndex: 'path',
      width: 260,
    },
    {
      title: '排序',
      dataIndex: 'order',
      align: 'center',
      width: 80,
    },
    {
      title: '启用状态',
      dataIndex: 'status',
      align: 'center',
      width: 80,
      customRender: ({ record }: { record: MenuListItem }) => {
        return h(Tag, { color: record.status ? 'green' : 'red' }, () =>
          record.status ? '启用' : '停用',
        );
      },
    },
    {
      title: '是否隐藏',
      dataIndex: 'isShow',
      align: 'center',
      width: 80,
      customRender: ({ record }: { record: MenuListItem }) => {
        return Number(record.isShow)
          ? h(Tag, { color: record.isShow ? '' : 'red' }, () => (record.isShow ? '否' : '是'))
          : '';
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      align: 'center',
      width: 150,
    },
    {
      title: '操作',
      dataIndex: 'action',
      align: 'center',
      width: 120,
      fixed: 'right',
      customRender: ({ record }: { record: MenuListItem }) => {
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
