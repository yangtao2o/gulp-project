# Gulp Project

> 文档[阅读](https://yangtao2o.github.io/gulp-project/)

## Gulp

- [Gulp](https://gulpjs.com/docs/en/getting-started/quick-start)
- [Browsersync + Gulp.js](https://www.browsersync.io/docs/gulp)

```shell
cd src/mygulp/
npm i
npm run dev
```

### Gulp-v4

Gulp@4 版本详情：[Demo](https://github.com/yangtao2o/gulp-project/tree/master/src/tool/_gulp)。

比如：[Hexo 博客](https://www.yangtao.site)中压缩文件配置

```js
const path = require("path");
const { src, dest, series } = require("gulp");
const uglify = require("gulp-uglify");
const htmlmin = require("gulp-htmlmin");
const htmlclean = require("gulp-htmlclean");
const minifyCss = require("gulp-clean-css");
const imagemin = require("gulp-imagemin");
const babel = require("gulp-babel");
// const useref = require('gulp-useref');
// const gulpif = require('gulp-if');

const destPath = path.join(__dirname, "public");

function minifyHtml() {
  return src(destPath + "/**/*.html")
    .pipe(htmlclean())
    .pipe(
      htmlmin({
        collapseWhitespace: true,
        removeComments: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        removeTagWhitespace: true,
        removeEmptyAttributes: true,
        minifyCSS: true,
        minifyJS: true,
        sortAttributes: true,
        sortClassName: true,
        useShortDoctype: true
      })
    )
    .pipe(dest(destPath));
}

function minifyStyle() {
  return src(destPath + "/**/*.css")
    .pipe(minifyCss({ compatibility: "ie8" }))
    .pipe(dest(destPath));
}

function minifyJs() {
  return src(destPath + "/js/**/*.js")
    .pipe(
      babel({
        presets: ["@babel/env"]
      })
    )
    .pipe(uglify())
    .pipe(dest(destPath + "/js"));
}

function minifyImg() {
  return src(destPath + "/img/**/*.*")
    .pipe(imagemin())
    .pipe(dest(destPath + "/img"));
}

exports.html = minifyHtml;
exports.js = minifyJs;
exports.css = minifyStyle;
exports.img = minifyImg;
exports.build = series(minifyHtml, minifyStyle, minifyJs, minifyImg);
```

### Gulp-v3

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

比如：[本站](https://yangtao2o.github.io/gulp-project/)，Github：[docsify](https://github.com/docsifyjs/docsify)

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
  }
};
```
