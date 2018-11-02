# webpack-fullseries-tool
> 曰：“工欲善其事，必先利其器”，此项目专为前端工程师打造的webpack全系列开发，不局限于官网建设、后台管理系统、移动端开发（h5）。不局限于react、vue等框架
---
# 一、项目分支介绍
> 项目分支目前支持基础webpack项目建设（可扩展性），移动端开发，后台管理系统
- ##### dev分支
> 配置完善的webpack基建，可由用户在此基础上应用于其他框架项目
- ##### mobile分支
> 用于开发h5的利器，具备完善的手机适配方案，全面支持sass
- ##### mobile-react分支
> 用于团队组件化协同开发h5，react+swiper3+sass+3种手机适配方案（默认：vm、vh适配，flexible适配，hotcss适配）
- ##### admin分支
> react+redux+antdesign+less开发大中型企业级后台管理系统
---
# 二、项目使用教程
> 在node环境下安装有npm、cnpm、yarn其中一种包管理器（默认为npm）
- ##### 安装依赖包

```
npm i
```

- ##### 运行项目

```
npm start
```

- ##### 上线打包

```
npm run dist
```
- ##### 模拟线上

```
npm run test
```
- ##### 打包分析

```
npm run analyze
```
- ##### 项目恢复出厂设置（admin分支）

```
npm run clean
```
- ##### 快速生成compoment模板，提供了ts、es6、es7以及无状态模板（admin分支）

```
npm run generate
```
---
# 三：babel编译转换标准通用语法

> 项目中可以使用最新javascript版本语法，但是浏览器并不完全支持，为了浏览器能够支持所以需要编译转换为浏览器的支持的标准语法，所以babel是不二首选
- ## webpack4的babel配置
1. 安装babel核心、模块解析包以及预处理器

```
npm install --save-dev babel-core babel-loader babel-preset-env
```
2. 配置模块解析包（配置文件例如：webpack.config.js）以及预处理器（.babelrc）

```
rules: [
  {
    test: /\.js|jsx$/,
    exclude: /node_modules/,
    use: [
      "babel-loader"
    ]
  },
]
```

```
{
  "presets": ["env"]
}
```
- ## 如何配置支持jsx语法以及react热刷新？
1. 安装babel-preset-react
```
npm i babel-preset-react --save-dev
```
2. 安装react-hot-loader
```
npm i react-hot-loader --save-dev
```
3. 入口文件或者模块加入hot设置
```
import {hot} from 'react-hot-loader';
export class BasicExample extends React.Component {
  ...
}
...
export default hot(module)(BasicExample);
```
4. 在.babelrc文件里的presets加上react,在plugins里加上react-hot-loader
```
{
  "presets": ["env","react"],
  "plugins": ["syntax-dynamic-import","react-hot-loader/babel"]
}
```


- ## 不支持新的通用标准以及原生语法怎么办？比如Promise
1. babel-polyfill的cdn方式，放在html head标签里靠前位置
```
<script src="https://cdn.bootcss.com/babel-polyfill/6.26.0/polyfill.min.js"></script>
```
2. babel-polyfill的npm方式（两种）
```
npm i babel-polyfill --save-dev
```
&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;方法1：在入口文件最顶部
```
import 'babel-polyfill'
```
&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;方法2：配置入口文件，比如：
```
entry: {
    app: [
      'babel-polyfill',
      './src/index'
    ]
  },
```
---


# 四：按需加载
> 有时候项目需要为了提高首次载入速度而需要按需加载，比如react-router的按需加载
- ## webpack4项目配置
1. babel-plugin-syntax-dynamic-import插件

```
npm install --save-dev babel-plugin-syntax-dynamic-import
```
2. 配置.babelrc

```
{
  "plugins": ["syntax-dynamic-import"]
}
```

3. webpack生产环境中的output配置

```
{
    ...
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
}
```

- ## 按需加载的写法
1. import
```
function getComponent() {
  return import('lodash').then(_ => {
    var element = document.createElement('div');
    return element;
  }).catch(error => console.log(error));
}
getComponent().then(component => {
  console.log(component);
});
```
2. async

```
async function getComponent() {
  const bundle = await import('lodash');
  return bundle;
}
getComponent().then(bundle => {
  console.log(bundle.default)
});
```
3.require

```
require.ensure([], function(require) {
  let bundle = require("lodash");
  console.log(bundle);
}, 'bundle');
```
# 五：依赖包升级
> 为了及时更新技术和相应api需要升级依赖包,请不要在未阅读各依赖包版本说明情况下升级，避免各相关依赖api有较大的调整而不能正常运行项目
- ## npm-check-updates
1. 全局安装npm-check-updates

```
npm install -g npm-check-updates
```
2. 查看可以升级的依赖包
```
ncu
```
3. 全部升级
```
ncu -u -a
```
# 六：目录以及文件说明
> 

目录以及文件 | 说明
---|---
internals | 项目其他操作文件夹
internals/generators | 模板生成器
internals/helpers | 命令行标记函数以及进度函数等
internals/templates | 初始模板
internals/clean.js | 用于项目恢复出厂设置
src | 程序开发核心文件夹
src/components | 存放自定义的组件以及其他组件（项目组件的UI底层）
src/comtainers | 存放自定义的组件容器以及其他组件容器（redux的视图层）
src/reducers | 存放自定义的数据(store管理的state)以及其他数据（redux的数据层）
src/static | 存放静态文件
src/styles | 存放项目的所有样式
src/tools | 存放项目的其他工具性js比如封装的请求文件工具函数以及api接口ip等
src/index.js | 项目入口文件（一等公民）
src/router.js | react路由或者其他路由
dist | 项目打包文件夹
dist/assets | 项目用到的静态资源
dist/assets/static_list.json | 项目用到的静态资源列表（可用于图片加载进度）
dist/js | 项目的js文件夹
dist/static | 项目的所有静态资源
dist/index.html | 首页
.babelrc | babel配置文件
.gitignore | git忽略文件（忽略包括node环境下、mac环境下、idea等环境下）
.postcssrc.js | postcss配置文件（配置插件）
index.html | 项目首页（一等公民）或者叫项目的html模板
package.json | 项目依赖包配置文件
README.md | 自述文件
server.js | 本地服务器
tsconfig.json | typescript配置文件

## 支持
<a href="https://gitlab.com/hufei1993" target="_blank"><img width=100 src="http://ocrma5t24.bkt.clouddn.com/img.jpg"></a>

作者 胡飞

