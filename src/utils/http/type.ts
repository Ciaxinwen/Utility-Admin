import { HttpStatusCode } from 'axios';

// 定义响应基础数据类型
export interface HttpBasicResponse<T = any> {
  code: HttpStatusCode;
  msg: string;
  data: T;
}

export interface HttpBasicPaginationListRequest {
  pageSize: number;
  pageNum: number;
}

// 定义分页响应基础数据类型
export interface HttpBasicPaginationListResponse<T = any> extends HttpBasicResponse {
  data: {
    rows: T[];
    total: number;
    pageSize: number;
    pageNum: number;
  };
}
