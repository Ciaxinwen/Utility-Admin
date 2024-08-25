import { http } from '@/utils/http';
import type { GetMenusResponse, LoginParams, LoginResponse, GetUserInfoResponse } from './type';

enum URL {
  Login = '/login',
  UserInfo = '/userInfo',
  Menu = '/menu',
}

export const login = async (data: LoginParams) =>
  await http.post<LoginResponse>({ url: URL.Login, data });

export const getSystemMenus = async () => await http.get<GetMenusResponse>({ url: URL.Menu });

export const getUserInfo = async () => await http.get<GetUserInfoResponse>({ url: URL.UserInfo });
