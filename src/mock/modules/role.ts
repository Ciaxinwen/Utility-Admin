import Mock from 'mockjs';
import { Response } from '../type';
import { validToken, getUrlParams } from '../utils';

const prefix = import.meta.env.VITE_GLOB_API_URL;

const roleOptions = [
  {
    roleName: '超级管理员',
    roleCode: 'super-admin',
    id: Mock.Random.id(),
  },
  {
    roleName: '管理员',
    roleCode: 'admin',
    id: Mock.Random.id(),
  },
  {
    roleName: '车间管理员',
    roleCode: 'workshop-admin',
    id: Mock.Random.id(),
  },
  {
    roleName: '用户',
    roleCode: 'user',
    id: Mock.Random.id(),
  },
];

const list = [
  {
    roleName: '超级管理员',
    roleCode: 'super-admin',
    id: Mock.Random.id(),
    status: 1,
    remark: '我是老大吼吼吼吼吼吼吼吼吼吼吼吼吼吼吼吼',
    createTime: Mock.Random.datetime('yyyy-MM-dd HH:mm:ss'),
    menus: [0, 1, 5, 10, 15, 19, 24],
  },
  {
    roleName: '管理员',
    roleCode: 'admin',
    id: Mock.Random.id(),
    status: 1,
    remark: '千年老二吼吼吼吼吼吼吼吼吼吼吼吼吼吼吼吼',
    createTime: Mock.Random.datetime('yyyy-MM-dd HH:mm:ss'),
    menus: [0, 1, 10, 15, 19],
  },
  {
    roleName: '车间管理员',
    roleCode: 'workshop-admin',
    id: Mock.Random.id(),
    status: 1,
    remark: '千年小弟吼吼吼吼吼吼吼吼吼吼吼吼吼吼吼吼',
    createTime: Mock.Random.datetime('yyyy-MM-dd HH:mm:ss'),
    menus: [0, 1, 5, 10],
  },
  {
    roleName: '用户',
    roleCode: 'user',
    id: Mock.Random.id(),
    status: 1,
    remark: '千年牛马吼吼吼吼吼吼吼吼吼吼吼吼吼吼吼吼',
    createTime: Mock.Random.datetime('yyyy-MM-dd HH:mm:ss'),
    menus: [0],
  },
];

Mock.mock(RegExp(`${prefix}/role/list?.*`), 'get', (options): Response => {
  const [valid, result] = validToken();
  if (!valid) {
    return result as Response;
  }
  let data = list;
  const params = getUrlParams(options.url);
  if (params.roleName) {
    data = list.filter((item) => item.roleName.includes(params.roleName));
  } else if (params.status) {
    data = list.filter((item) => item.status === parseInt(params.status));
  } else {
    data = list;
  }
  return {
    code: 200,
    msg: '',
    data: {
      rows: data,
      pageSize: params.pageSize,
      pageNum: params.pageNum,
      total: 4,
    },
  };
});

Mock.mock(RegExp(`${prefix}/role/options?.*`), 'get', (_options): Response => {
  const [valid, result] = validToken();
  if (!valid) {
    return result as Response;
  }
  return {
    code: 200,
    msg: '',
    data: roleOptions,
  };
});
