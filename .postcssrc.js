//以下postcss处理会增加 最少2-4秒的时间
const path = require('path');
module.exports = {
  "plugins": {
    "postcss-import": {},
    "postcss-url": {},
    "postcss-cssnext": {},
    "cssnano": {
      autoprefixer:false,
    }
  }
}