import {
  HttpBasicResponse,
  HttpBasicPaginationListRequest,
  HttpBasicPaginationListResponse,
} from '@/utils/http/type';

export interface DeptList {
  name: string;
  parentId: string;
  id: string;
  order: number;
  principal: string;
  status: number;
  createTime: string;
  remark: string;
  children?: DeptList[];
}

export interface DeptListResponse extends HttpBasicResponse {
  data: DeptList[];
}

export interface DeptListParams {
  status?: 0 | 1 | null;
  name?: string;
}

export interface UserListParams extends HttpBasicPaginationListRequest {
  status?: 0 | 1 | null;
  name?: string;
  dept?: number | string;
}

export interface UserListItem {
  username: string;
  nickname: string;
  phone: string;
  email: string;
  sex: number;
  id: string;
  status: number;
  dept: {
    id: number;
    name: string;
  };
  createTime: string;
}
export interface UserListResponse extends HttpBasicPaginationListResponse {
  rows: UserListItem[];
}

export interface MenuListResponse extends HttpBasicResponse {
  data: MenuListItem[];
}

export interface RoleListParams extends HttpBasicPaginationListRequest {
  status?: 0 | 1 | null;
  roleName?: string;
}

export interface RoleListItem {
  id: string;
  status: number;
  remark: string;
  createTime: string;
  roleName: string;
  roleCode: string;
  role: string;
  menus: string[];
}

export interface RoleListResponse extends HttpBasicPaginationListResponse {
  rows: RoleListItem[];
}

export interface RoleOptionItem {
  id: string;
  roleName: string;
  roleCode: string;
}

export interface RoleOptionsResponse extends HttpBasicResponse {
  data: RoleOptionItem[];
}
