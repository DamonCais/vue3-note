import axios, { AxiosRequestConfig } from 'axios';
console.log(import.meta.env);
const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASEURL
});

// 请求拦截器
request.interceptors.request.use(function (config) {
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// 响应拦截器
request.interceptors.response.use(function (response) {
  // 其它错误情况
  // 手动返回一个 Promise 异常
  return Promise.resolve(response);
}, function (error) {
  console.log('error', error);
  return Promise.reject(error);
});

export default <T = any>(config: AxiosRequestConfig) => {
  return request(config).then(res => {
    return (res.data) as T;
  });
};
