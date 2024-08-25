import { notification } from 'ant-design-vue';
import Axios, { AxiosRequestConfig, AxiosInstance } from 'axios';
import { isArray } from 'lodash';
import { useUserStoreHook } from '@/store/module/user';
import { storeToRefs } from 'pinia';
import { router } from '@/router';

const basicUrl = import.meta.env.VITE_GLOB_API_URL;
const uploadUrl = import.meta.env.VITE_GLOB_UPLOAD_URL;

/**
 * @description: 基础axios实例配置
 */
const createBasicConfig = (): AxiosRequestConfig => {
  return {
    baseURL: basicUrl || '',
    timeout: 1000 * 10,
  };
};

/**
 * @description: 文件上传axios实例配置
 */
const createUploadConfig = (): AxiosRequestConfig => {
  return {
    baseURL: uploadUrl || '',
    timeout: 1000 * 10,
    headers: {
      'Content-type': 'multipart/form-data;charset=UTF-8',
    },
  };
};

/**
 * @description:创建axios拦截器
 * @param {AxiosInstance} instance axios实例
 * @return {*}
 */
const setInterceptors = (instance: AxiosInstance) => {
  instance.interceptors.request.use(
    (config) => {
      const userToken = useUserStoreHook();
      const { token } = storeToRefs(userToken);
      if (token.value) {
        config.headers['Authorization'] = `Bearer ${token.value}`;
      }
      // console.log('config', config);
      return config;
    },
    (error) => {
      console.log('error', error);
    },
  );
  instance.interceptors.response.use(
    (result) => {
      if (result.data.code === 401) {
        notification.error({ message: '请重新登录' });
        router.push('/login');
        return;
      }
      if (result.data.code !== 200) {
        notification.error({ message: result.data.msg });
        return Promise.reject(result);
      }
      return result.data;
    },
    (error) => {
      console.log('error', error);
      return Promise.reject(error);
    },
  );
};

class Http {
  // 创建axios实例
  protected axiosInstance: AxiosInstance;

  constructor(config: AxiosRequestConfig) {
    this.axiosInstance = Axios.create(config);
    setInterceptors(this.axiosInstance);
  }

  request<T>(config: AxiosRequestConfig): Promise<T> {
    return new Promise((resolve) => {
      this.axiosInstance.request<any, T>(config).then((res) => {
        resolve(res);
      });
    });
  }

  get<T>(config: AxiosRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'GET' });
  }

  post<T>(config: AxiosRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'POST' });
  }

  put<T>(config: AxiosRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'PUT' });
  }

  delete<T>(config: AxiosRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'DELETE' });
  }
}

class UploadHttp {
  protected axiosInstance: AxiosInstance;

  constructor(config: AxiosRequestConfig) {
    this.axiosInstance = Axios.create(config);
    setInterceptors(this.axiosInstance);
  }

  uploadFile<T>(config: AxiosRequestConfig): Promise<T> {
    const data = config.data;
    const formData = new FormData();
    for (const key in data) {
      if (isArray(data[key])) {
        data[key].forEach((item: string) => {
          formData.append(`${key}[]`, item);
        });
        continue;
      }
      formData.append(key, data[key]);
    }

    return this.axiosInstance.request({
      ...config,
      method: 'POST',
      data: formData,
    });
  }
}

export const http = new Http(createBasicConfig());

export const uploadHttp = new UploadHttp(createUploadConfig());
