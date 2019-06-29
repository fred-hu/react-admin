/*
   用法请参考：https://github.com/axios/axios
 */
import axios from 'axios';
import config from './config';

// const Qs = require('qs');

const { CancelToken } = axios;
window.cancelRequest = undefined;

// 定义post 数据格式
axios.defaults.headers.post['Content-Type'] = 'application/json';

const { host } = config;
const instance = axios.create({
  baseURL: host,
  timeout: 3000,
  // headers: {
  //     'Authorization':"bearer "+localStorage.token,
  //     'token':'Bearer '+localStorage.token
  // },
  params: {
    version: 1
  },
  // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
  transformResponse: [
    data => data// 对 data 进行任意转换处理
  ],
  // paramsSerializer: function(params) {

  // },

  // options are 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
  responseType: 'json', // default
  onUploadProgress(progressEvent) {},

  onDownloadProgress(progressEvent) {},
  validateStatus(status) {
    window.console.log('status', status);
    switch (status) {
    case 401:
      break;
    default:
      break;
    }
    return (status >= 200 && status < 300) || status === 304; // default
  },

  // cancelRequest() 取消发送
  cancelToken: new CancelToken(((cancel) => {
    window.cancelRequest = cancel;
  }))
});
export default instance;
