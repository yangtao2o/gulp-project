# Gulp 
* [文档](https://www.gulpjs.com.cn/docs/getting-started/creating-tasks/)

## Learning Document

* [VirtualDom](https://github.com/yangtao2o/gulp-project/blob/master/src/JavaScript/vdom/doc.md )
* [MVVM框架](https://github.com/yangtao2o/gulp-project/blob/master/src/JavaScript/mvvm/doc.md)
* [Zepto源码学习一二](https://github.com/yangtao2o/gulp-project/blob/master/src/zepto/doc.md#zepto)
* [Zepto对象思想及源码学习](https://github.com/yangtao2o/gulp-project/blob/master/src/zepto/myzepto-core.md)
* [防抖、节流，原型链继承之圣杯模式](https://github.com/yangtao2o/gulp-project/blob/master/src/zepto/doc.md)
* [Class、继承、Promise](https://github.com/yangtao2o/gulp-project/blob/master/src/JavaScript/es6/doc.md )

## Gulp(全局)

### Gulp-v3
#### 文档
* [Gulp](https://gulpjs.com/docs/en/getting-started/quick-start)
* [Browsersync + Gulp.js](https://www.browsersync.io/docs/gulp)
```bash
# 克隆
git clone https://github.com/yangtao2o/gulp-project.git

cd gulp-project

# 安装
yarn install

# 启动
npm run dev
```
gulpfile.js配置：只使用了 `browser-sync` 插件来监控 html/css/js 文件的变化，并自动刷新浏览器页面。
```javascript
var gulp = require('gulp');
var browserSync = require('browser-sync').create();

gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: './src',
      directory: true
    },
    notify: false
  });
  gulp.watch("src/**/*.js").on('change', browserSync.reload);
  gulp.watch("src/**/*.css").on('change', browserSync.reload);
  gulp.watch("src/**/*.html").on('change', browserSync.reload);
});

gulp.task('default', ['browser-sync']);
```
### Gulp-v4


## MyReact

#### 学习「井字游戏」
##### 学习资料：[用 React 开发一个井字棋（tic-tac-toe）](https://react.docschina.org/tutorial/tutorial.html#before-we-start-the-tutorial)

* [x] tic-tac-toe(三连棋)游戏的所有功能
* [x] 能够判定玩家何时获胜
* [x] 能够记录游戏进程
* [x] 允许玩家查看游戏的历史记录，也可以查看任意一个历史版本的游戏棋盘状态

```bash
cd ~/Documents/GitHub/gulp-project/project/myreact/01-ttt 

➜  01-ttt git:(master) ✗ npm i
➜  01-ttt git:(master) ✗ npm start   
```
## MyWebpack
```bash
➜  gulp-project git:(master) ✗ cd src/mywebpack/
➜  mywebpack git:(master) ✗ npm i
➜  mywebpack git:(master) ✗ npm start

> mywebpack@1.0.0 start /Users/yangtao/Documents/github/gulp-project/src/mywebpack
> webpack --mode=development

Hash: b0d74482c77a2aa40e58
Version: webpack 4.29.5
Time: 751ms
Built at: 2019-02-21 09:24:16
            Asset      Size  Chunks             Chunk Names
./build/bundle.js  3.95 KiB    main  [emitted]  main
Entrypoint main = ./build/bundle.js
[./src/index.js] 157 bytes {main} [built]

> mywebpack@1.0.0 dev /Users/yangtao/Documents/github/gulp-project/src/mywebpack
> webpack-dev-server --config ./webpack.config.js --mode=development

ℹ ｢wds｣: Project is running at http://localhost:8080/
ℹ ｢wds｣: webpack output is served from /
ℹ ｢wdm｣: Hash: 0cff533f8881da90d38f
Version: webpack 4.29.5
Time: 991ms
Built at: 2019-02-21 09:27:39
```

## MyRollup
* rollup 功能单一，webpack 功能强大
* 参考设计原则和《Linux/Unix设计思想》
* 工具要尽量功能单一，可集成，可扩展
* gulp + rollup

```bash
➜  src git:(master) ✗ mkdir myrollup
➜  src git:(master) ✗ cd myrollup 
# 初始化
➜  myrollup git:(master) ✗ npm init

# 下载依赖包
➜  myrollup git:(master) ✗ npm i rollup-plugin-node-resolve rollup-plugin-babel babel-core babel-plugin-external-helpers babel-preset-latest --save-dev

# 配置文件
➜  myrollup git:(master) ✗ touch .babelrc rollup.config.js
```

## 关于 JS 众多模块化标准
* 没有模块化
* AMD成为标准，require.js(也有CMD)
* 前端打包工具，是node.js模块化可以被使用
* ES6出现，想统一现在所有模块化标准
* nodejs积极支持，浏览器尚未统一

#### 模块化
* 语法：import export(注意有无default)
* 环境：babel编译 ES6 语法，模块化可用 webpack 和 rollup
* 扩展：对模块化标准统一的期待
  
