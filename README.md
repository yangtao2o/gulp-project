# Gulp Project

## Gulp

- [Gulp](https://gulpjs.com/docs/en/getting-started/quick-start)
- [Browsersync + Gulp.js](https://www.browsersync.io/docs/gulp)

```shell
cd src/mygulp/
npm i
npm run dev
```

Gulp@4 版本详情：[Demo](https://github.com/yangtao2o/gulp-project/tree/master/src/tool/_gulp)。

Gulp@3 版本`gulpfile.js` 配置：只使用了 `browser-sync` 插件来监控 `html/css/js` 文件的变化，并自动刷新浏览器页面。

```javascript
var gulp = require("gulp");
var browserSync = require("browser-sync").create();

gulp.task("browser-sync", function() {
  browserSync.init({
    server: {
      baseDir: "./src",
      directory: true
    },
    notify: false
  });
  gulp.watch("src/**/*.js").on("change", browserSync.reload);
  gulp.watch("src/**/*.css").on("change", browserSync.reload);
  gulp.watch("src/**/*.html").on("change", browserSync.reload);
});

gulp.task("default", ["browser-sync"]);
```

## Learning Document

## MyReact

### 学习「井字游戏」

```shell
cd myreact/01-ttt

npm i
npm start
```

学习资料：[用 React 开发一个井字棋（tic-tac-toe）](https://react.docschina.org/tutorial/tutorial.html#before-we-start-the-tutorial)

- [x] tic-tac-toe(三连棋)游戏的所有功能
- [x] 能够判定玩家何时获胜
- [x] 能够记录游戏进程
- [x] 允许玩家查看游戏的历史记录，也可以查看任意一个历史版本的游戏棋盘状态

## MyWebpack

```shell
cd src/tool/_webpack/
npm i
npm start
```

## MyRollup

- rollup 功能单一，webpack 功能强大
- 参考设计原则和《Linux/Unix 设计思想》
- 工具要尽量功能单一，可集成，可扩展
- gulp + rollup

```bash
mkdir myrollup
cd myrollup

# 初始化
npm init

# 下载依赖包
npm i rollup-plugin-node-resolve rollup-plugin-babel babel-core babel-plugin-external-helpers babel-preset-latest --save-dev

# 配置文件
touch .babelrc rollup.config.js
```

## 关于 JS 众多模块化标准

- 没有模块化
- AMD 成为标准，require.js(也有 CMD)
- 前端打包工具，是 node.js 模块化（Commonjs 规范）可以被使用
- ES6 出现，想统一现在所有模块化标准
- nodejs 积极支持，浏览器尚未统一

### 模块化

- 语法：import export(注意有无 default)
- 环境：babel 编译 ES6 语法，模块化可用 webpack 和 rollup
- 扩展：对模块化标准统一的期待

## Riot

- [Riot.js 框架深入解析](http://eux.baidu.com/blog/fe/riot-js-%E6%A1%86%E6%9E%B6%E6%B7%B1%E5%85%A5%E8%A7%A3%E6%9E%90)
- [riot.js 教程【一】简介](https://cloud.tencent.com/developer/article/1019472)
- [RIOT](https://riot.js.org/documentation/)文档

## 其他

### docsify 无需构建快速生成文档网站

Github：[docsify](https://github.com/docsifyjs/docsify)

Quick start

```shell
npm i docsify-cli -g
```

Initialize

If you want to write the documentation in the ./docs subdirectory, you can use the init command.

```js
docsify init ./docs
```

我的配置：

```js
window.$docsify = {
  name: "project",
  loadSidebar: true,
  subMaxLevel: 2,
  alias: {
    "/.*/_sidebar.md": "/docs/_sidebar.md"
  },
};
```
