const ENV = process.env.NODE_ENV;
export default {
  host: (ENV === 'development' ? 'http://127.0.0.1:3000' : 'https://wework.cn/api/v1'),
  staticlist: (ENV === 'development' ? 'assets/static_list.json' : '../assets/static_list.json')// 图片列表
};
