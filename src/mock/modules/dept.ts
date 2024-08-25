import Mock from 'mockjs';
import { validToken, getUrlParams } from '../utils';
import { Response } from '../type';

const prefix = import.meta.env.VITE_GLOB_API_URL;

const mockData = [
  {
    name: '广州总公司',
    parentId: null,
    id: 100,
    order: 0,
    phone: '18888888888',
    principal: Mock.Random.cname(),
    email: Mock.Random.email(),
    status: 1,
    createTime: Mock.Random.datetime('yyyy-MM-dd HH:mm:ss'),
    remark: '这里是备注信息这里是备注信息这里是备注信息这里是备注信息',
  },
  {
    name: '郑州分公司',
    parentId: 100,
    id: 101,
    order: 1,
    phone: '18888888888',
    principal: Mock.Random.cname(),
    email: Mock.Random.email(),
    status: 1,
    createTime: Mock.Random.datetime('yyyy-MM-dd HH:mm:ss'),
    remark: '这里是备注信息这里是备注信息这里是备注信息这里是备注信息',
  },
  {
    name: '研发部门',
    parentId: 101,
    id: 103,
    order: 1,
    phone: '18888888888',
    principal: Mock.Random.cname(),
    email: Mock.Random.email(),
    status: 1,
    createTime: Mock.Random.datetime('yyyy-MM-dd HH:mm:ss'),
    remark: '这里是备注信息这里是备注信息这里是备注信息这里是备注信息',
  },
  {
    name: '市场部门',
    parentId: 102,
    id: 108,
    order: 1,
    phone: '18888888888',
    principal: Mock.Random.cname(),
    email: Mock.Random.email(),
    status: 1,
    createTime: Mock.Random.datetime('yyyy-MM-dd HH:mm:ss'),
    remark: '这里是备注信息这里是备注信息这里是备注信息这里是备注信息',
  },
  {
    name: '深圳分公司',
    parentId: 100,
    id: 102,
    order: 2,
    phone: '18888888888',
    principal: Mock.Random.cname(),
    email: Mock.Random.email(),
    status: 1,
    createTime: Mock.Random.datetime('yyyy-MM-dd HH:mm:ss'),
    remark: '这里是备注信息这里是备注信息这里是备注信息这里是备注信息',
  },
  {
    name: '市场部门',
    parentId: 101,
    id: 104,
    order: 2,
    phone: '18888888888',
    principal: Mock.Random.cname(),
    email: Mock.Random.email(),
    status: 1,
    createTime: Mock.Random.datetime('yyyy-MM-dd HH:mm:ss'),
    remark: '这里是备注信息这里是备注信息这里是备注信息这里是备注信息',
  },
  {
    name: '财务部门',
    parentId: 102,
    id: 109,
    order: 2,
    phone: '18888888888',
    principal: Mock.Random.cname(),
    email: Mock.Random.email(),
    status: 1,
    createTime: Mock.Random.datetime('yyyy-MM-dd HH:mm:ss'),
    remark: '这里是备注信息这里是备注信息这里是备注信息这里是备注信息',
  },
  {
    name: '测试部门',
    parentId: 101,
    id: 105,
    order: 3,
    phone: '18888888888',
    principal: Mock.Random.cname(),
    email: Mock.Random.email(),
    status: 0,
    createTime: Mock.Random.datetime('yyyy-MM-dd HH:mm:ss'),
    remark: '这里是备注信息这里是备注信息这里是备注信息这里是备注信息',
  },
  {
    name: '财务部门',
    parentId: 101,
    id: 106,
    order: 4,
    phone: '18888888888',
    principal: Mock.Random.cname(),
    email: Mock.Random.email(),
    status: 1,
    createTime: Mock.Random.datetime('yyyy-MM-dd HH:mm:ss'),
    remark: '这里是备注信息这里是备注信息这里是备注信息这里是备注信息',
  },
  {
    name: '运维部门',
    parentId: 101,
    id: 107,
    order: 5,
    phone: '18888888888',
    principal: Mock.Random.cname(),
    email: Mock.Random.email(),
    status: 0,
    createTime: Mock.Random.datetime('yyyy-MM-dd HH:mm:ss'),
    remark: '这里是备注信息这里是备注信息这里是备注信息这里是备注信息',
  },
];

Mock.mock(RegExp(`${prefix}/dept/list?.*`), 'get', (options): Response => {
  const [valid, result] = validToken();
  if (!valid) {
    return result as Response;
  }
  let data;
  const params = getUrlParams(options.url);
  if (params.name) {
    data = mockData.filter((item) => item.name.includes(params.name));
  } else if (params.status) {
    data = mockData.filter((item) => item.status === parseInt(params.status));
  } else {
    data = mockData;
  }
  return {
    code: 200,
    msg: '',
    data,
  };
});
