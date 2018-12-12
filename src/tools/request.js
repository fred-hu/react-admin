/*
   用法请参考：https://github.com/axios/axios
 */
import axios from 'axios';
import config from './config';
const Qs = require('qs');
const CancelToken = axios.CancelToken;
window.cancelRequest = undefined;


//定义post 数据格式
axios.defaults.headers.post['Content-Type'] = 'application/json';

const host = config.host;
let instance = axios.create({
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
   transformResponse: [function (data) {
    // 对 data 进行任意转换处理
    return data;
  }],
  // paramsSerializer: function(params) {

  // },

  // options are 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
  responseType: 'json', // default
  onUploadProgress: function (progressEvent) {

  },

  onDownloadProgress: function (progressEvent) {

  },
  validateStatus: function (status) {
    window.console.log('status',status);
    switch (status){
      case 401:
        break;
      default:
        break;
    }
    return (status >= 200 && status < 300) || status === 304; // default
  },

  //cancelRequest() 取消发送
  cancelToken: new CancelToken(function executor(cancel) {
    window.cancelRequest = cancel;
  })

});
export default instance;