const ENV = process.env.NODE_ENV;
export default {
  host:(ENV==='development'?'https://wework.cn/api/dev':'https://wework.cn/api/v1'),
  staticlist:(ENV==='development'?'assets/static_list.json':'../assets/static_list.json')//图片列表
}