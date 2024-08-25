import Mock from 'mockjs';
import { Response } from '../type';
import { StorgeKeys } from '@/enum/storgeKeys';
import { validToken } from '../utils';
import { UserType, Tokens, decodeToken } from '../token';

const prefix = import.meta.env.VITE_GLOB_API_URL;

interface LoginParams {
  username: UserType;
  password: string;
}

type Users = 'utility' | 'admin' | 'user';

const mockUserInfo: Record<Users, UserInfo> = {
  utility: {
    id: Mock.Random.id(),
    name: '超级管理员',
    avatar: 'https://www.xiguama.com/content/templates/default/static/images/randem/pic19.jpg',
    email: 'superAdmin@qq.com',
    phone: '18888888888',
    roles: ['superAdmin'],
    auth_code: ['*'],
    desc: '超级管理员拥有所有权限，请谨慎操作',
    area: '中国广东',
  },
  admin: {
    id: Mock.Random.id(),
    name: '管理员',
    avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    email: 'admin@qq.com',
    phone: '18888888888',
    roles: ['admin'],
    auth_code: ['*'],
    desc: '管理员拥有部分权限，请谨慎操作',
    area: '中国北京',
  },
  user: {
    id: Mock.Random.id(),
    name: '普通用户',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    email: 'user@qq.com',
    phone: '18888888888',
    roles: ['user'],
    auth_code: ['btn:auth_edit'],
    desc: '普通用户权限较低，请谨慎操作',
    area: '中国上海',
  },
};

function getLoginResponse(reqBody: LoginParams): Response {
  const { username, password } = reqBody;
  const userTable = [];
  for (const key in Tokens) {
    userTable.push({
      ...decodeToken(Tokens[key as UserType]),
    });
  }
  if (!userTable.some((u) => u.username === username)) {
    return {
      code: 500,
      msg: '用户不存在',
      data: null,
    };
  }
  const info = userTable.find((u) => u.username === username);
  if (info.password !== password) {
    return {
      code: 500,
      msg: '密码错误',
      data: null,
    };
  }
  return {
    code: 200,
    msg: '登录成功',
    data: {
      token: Tokens[info.role as UserType],
    },
  };
}

Mock.mock(RegExp(`${prefix}/login`), 'post', (options): Response => {
  const reqBody: LoginParams = JSON.parse(options.body);
  return getLoginResponse(reqBody);
});

Mock.mock(RegExp(`${prefix}/userInfo`), 'get', (_options): Response => {
  const token = localStorage.getItem(StorgeKeys.SYS_TOKEN) || '';
  const [valid, result] = validToken();
  if (!valid) {
    return result as Response;
  }
  return {
    data: mockUserInfo[decodeToken(token).username as Users],
    code: 200,
    msg: '',
  };
});
