export type Code = 200 | 400 | 401 | 403 | 404 | 500;

export interface Response {
  code: Code;
  msg: string;
  data: any;
}
