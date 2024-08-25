import Mock from 'mockjs';
import { Response } from '../type';
import { validToken, getUrlParams } from '../utils';

const prefix = import.meta.env.VITE_GLOB_API_URL;

const mockData = [
  {
    username: 'super-admin',
    nickname: 'super-admin',
    phone: '16888888888',
    email: Mock.Random.email(),
    sex: 0,
    id: Mock.Random.id(),
    status: 1,
    dept: {
      id: 100,
      name: '广州总公司',
    },
    role: 'super-admin',
    remark: '超级管理员',
    createTime: Mock.Random.datetime('yyyy-MM-dd HH:mm:ss'),
  },
  {
    username: 'admin',
    nickname: 'admin',
    phone: '16666666666',
    email: Mock.Random.email(),
    sex: 0,
    id: Mock.Random.id(),
    status: 1,
    dept: {
      id: 103,
      name: '研发部门',
    },
    role: 'admin',
    remark: '管理员',
    createTime: Mock.Random.datetime('yyyy-MM-dd HH:mm:ss'),
  },
  {
    username: 'common',
    nickname: 'common',
    phone: '18888888888',
    email: Mock.Random.email(),
    sex: 1,
    id: Mock.Random.id(),
    status: 1,
    dept: {
      id: 105,
      name: '测试部门',
    },
    role: 'user',
    remark: '普通用户',
    createTime: Mock.Random.datetime('yyyy-MM-dd HH:mm:ss'),
  },
];

Mock.mock(RegExp(`${prefix}/user/list?.*`), 'get', (options): Response => {
  const [valid, result] = validToken();
  if (!valid) {
    return result as Response;
  }
  let data = mockData;
  const params = getUrlParams(options.url);
  if (params.username) {
    data = mockData.filter((item) => item.username.includes(params.username));
  } else if (params.status) {
    data = mockData.filter((item) => item.status === parseInt(params.status));
  } else if (params.dept) {
    data = mockData.filter((item) => item.dept.id === Number(params.dept));
  } else {
    data = mockData;
  }
  return {
    code: 200,
    msg: '',
    data: {
      rows: data,
      pageSize: params.pageSize,
      pageNum: params.pageNum,
      total: 3,
    },
  };
});
