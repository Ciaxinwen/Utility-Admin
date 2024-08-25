import { http } from '@/utils/http';
import type {
  DeptListResponse,
  DeptListParams,
  UserListParams,
  UserListResponse,
  MenuListResponse,
  RoleListParams,
  RoleListResponse,
  RoleOptionsResponse,
} from './type';

enum URL {
  DeptList = '/dept/list',
  UserList = '/user/list',
  MenuList = '/menu/list',
  RoleList = '/role/list',
  RoleOptions = '/role/options',
}

export const getDeptList = async (params?: DeptListParams) =>
  await http.get<DeptListResponse>({ url: URL.DeptList, params });

export const getUserList = async (params?: UserListParams) =>
  await http.get<UserListResponse>({ url: URL.UserList, params });

export const getMenuList = async () => await http.get<MenuListResponse>({ url: URL.MenuList });

export const getRoleList = async (params?: RoleListParams) =>
  await http.get<RoleListResponse>({ url: URL.RoleList, params });

export const getRoleOptions = async () =>
  await http.get<RoleOptionsResponse>({ url: URL.RoleOptions });
