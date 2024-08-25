import { HttpBasicResponse } from '@/utils/http/type';

export interface LoginParams {
  username: string;
  password: string;
}

export interface LoginResponse extends HttpBasicResponse {
  data: {
    token: string;
  };
}

export interface GetMenusResponse extends HttpBasicResponse {
  data: SystemMenuItem[];
}

export interface GetUserInfoResponse extends HttpBasicResponse {
  data: UserInfo;
}
