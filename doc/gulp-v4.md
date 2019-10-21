# Gulp-v4
## 导出
项目根目录创建`gulpfile.js`:
```js
function defaultTask(cb) {
  console.log('success')
  cb();
}

exports.default = defaultTask;
```
gulp命令：
```bash
➜  gulp-project git:(master) ✗ gulp
[17:06:29] Using gulpfile ~/Documents/GitHub/gulp-project/gulpfile.js
[17:06:29] Starting 'default'...
success
[17:06:29] Finished 'default' after 2.67 ms
```

## Gulpfile 分割
> Node 的模块解析功能允许你将 gulpfile.js' 文件替换为同样命名为 gulpfile.js 的目录，该目录中包含了一个名为 index.js 的文件，该文件被当作 gulpfile.js 使用。并且，该目录中还可以包含各个独立的任务（task）模块。 --- 官方文档

创建 `gulpfile.js`目录，`gulpfile.js`目录下新建 `index.js`

## 组合任务
* series() 允许将多个独立的任务组合为一个更大的操作
* 对于希望以最大并发来运行的任务（tasks），可以使用 parallel() 方法将它们组合起来

```js
const { series, parallel } = require('gulp');

function clean(cb) {
  cb();
}

function cssTranspile(cb) {
  cb();
}

function cssMinify(cb) {
  cb();
}

function jsTranspile(cb) {
  cb();
}

function jsBundle(cb) {
  cb();
}

function jsMinify(cb) {
  cb();
}

function publish(cb) {
  cb();
}

function build(cb) {
  cb();
}

exports.default = series(
  clean,
  parallel(
    cssTranspile,
    series(jsTranspile, jsBundle)
  ),
  parallel(cssMinify, jsMinify),
  publish
);
```
输出：
```bash
[16:50:36] Starting 'default'...
[16:50:36] Starting 'clean'...
[16:50:36] Finished 'clean' after 606 μs
[16:50:36] Starting 'cssTranspile'...
[16:50:36] Finished 'cssTranspile' after 199 μs
[16:50:36] Starting 'jsTranspile'...
[16:50:36] Finished 'jsTranspile' after 131 μs
[16:50:36] Starting 'jsBundle'...
[16:50:36] Finished 'jsBundle' after 125 μs
[16:50:36] Starting 'cssMinify'...
[16:50:36] Starting 'jsMinify'...
[16:50:36] Finished 'cssMinify' after 183 μs
[16:50:36] Finished 'jsMinify' after 218 μs
[16:50:36] Starting 'publish'...
[16:50:36] Finished 'publish' after 115 μs
[16:50:36] Finished 'default' after 4.55 ms
```

当一个组合操作执行时，这个组合中的每一个任务每次被调用时都会被执行。

```js
// This is INCORRECT
const { series, parallel } = require('gulp');

const clean = function(cb) {
  // body omitted
  cb();
};

const css = series(clean, function(cb) {
  // body omitted
  cb();
});

const javascript = series(clean, function(cb) {
  // body omitted
  cb();
});

exports.default = parallel(css, javascript);
```

输出：
```bash
[17:02:45] Starting 'default'...
[17:02:45] Starting 'clean'...
[17:02:45] Starting 'clean'...
[17:02:45] Finished 'clean' after 850 μs
[17:02:45] Starting '<anonymous>'...
[17:02:45] Finished 'clean' after 2.04 ms
[17:02:45] Starting '<anonymous>'...
[17:02:45] Finished '<anonymous>' after 563 μs
[17:02:45] Finished '<anonymous>' after 438 μs
[17:02:45] Finished 'default' after 7.67 ms
```

重构：
```js
// This is INCORRECT
const { series, parallel } = require('gulp');

const clean = function(cb) {
  // body omitted
  cb();
};

const css = function(cb) {
  // body omitted
  cb();
};

const javascript = function(cb) {
  // body omitted
  cb();
};

exports.default = series(clean, parallel(css, javascript));
```
再次输出：
```bash
[17:04:48] Starting 'default'...
[17:04:48] Starting 'clean'...
[17:04:48] Finished 'clean' after 546 μs
[17:04:48] Starting 'css'...
[17:04:48] Starting 'javascript'...
[17:04:48] Finished 'css' after 242 μs
[17:04:48] Finished 'javascript' after 285 μs
[17:04:48] Finished 'default' after 3.4 ms
```

## 异步执行

> Node 库以多种方式处理异步功能。最常见的模式是 error-first callbacks，但是你还可能会遇到 streams、promises、event emitters、child processes, 或 observables。gulp 任务（task）规范化了所有这些类型的异步功能。 --- 官方文档

### 返回 stream

```js
const { src, dest } = require("gulp");

function streamTask() {
  return src('*.js')
  .pipe(dest('output'));
}

exports.default = streamTask;
```
然后发现，根目录下会看到 output 目录，及根目录下所有以 `*js`结尾的文件，包括目录。

### 返回 promise

```js
function promiseTask() {
  return Promise.resolve('the value is ignored');
}

exports.default = promiseTask;
```

## 返回 event emitter

```js
const { EventEmitter } = require("events");

function eventEmitterTask() {
  const emitter = new EventEmitter();
  setTimeout(() => emitter.emit("finish"), 250);
  return emitter;
}

exports.default = eventEmitterTask;
```

## 使用 callback

```js
function callbackTask(cb) {
  // `cb()` should be called by some async work
  cb();
}

exports.default = callbackTask;
```

## 使用 async/await

```js
const fs = require("fs");

async function asyncAwaitTask() {
  const { version } = fs.readFileSync('package.json');
  console.log('version');
  await Promise.resolve('some result');
}

exports.default = asyncAwaitTask;
```

## 使用插件

```js
const { src, dest } = require('gulp');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

exports.default = function() {
  return src('src/assets/**/*.js')
  .pipe(uglify())
  .pipe(rename({ extname: '.min.js' }))
  .pipe(dest('output/'));
}
```

## browsersync

* [Browsersync + Gulp.js](http://www.browsersync.cn/docs/gulp/#gulp-install)

下载：
```bash
npm install browser-sync gulp --save-dev
```
使用：
```js
const { task, watch } = require("gulp");
const browserSync = require("browser-sync").create();
const reload = browserSync.reload;
const serve = function(cb) {
  browserSync.init({
    server: {
      baseDir: './src',
      https: true,
      directory: true,   //从与目录列表的应用程序目录中的文件即成
      // index: "index.html"  //从应用程序目录中提供文件，指定特定文件名为索引
    },
    port: 8080,
    notify: false // 开启静默模式
  });

  watch("src/*.html").on('change', reload);
}

task(serve);
```

本地使用：
```js
const { src, dest, watch, series, parallel } = require("gulp");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const browserSync = require("browser-sync").create();
const reload = browserSync.reload;
const jsWatcher = watch("src/**/*.js");
const cssWatcher = watch("src/**/*.css");
const htmlWatcher = watch("src/**/*.html");

const clean = function(cb) {
  // body omitted
  cb();
};

const css = function(cb) {
  // body omitted
  cb();
};

const javascript = function(cb) {
  // body omitted
  cb();
};

const serve = function(cb) {
  browserSync.init({
    server: {
      baseDir: './src',
      // https: true,
      directory: true,   //从与目录列表的应用程序目录中的文件即成，如果要指定文件，可注释掉
      // index: "index.html"  //从应用程序目录中提供文件，指定特定文件名为索引
    },
    port: 8080,
    notify: false // 开启静默模式
  });
}

// 监听 globs 并在发生更改时运行任务
jsWatcher.on('change', function(path, stats) {
  console.log(`File ${path} was changed`);
});

cssWatcher.on('change', function(path, stats) {
  console.log(`File ${path} was changed`);
});

htmlWatcher.on('change', function(path, stats) {
  console.log(`File ${path} was changed`);
  reload();  // Reloading Browsers
});

exports.build = function() {
  return src("src/assets/**/*.js")
    .pipe(uglify())
    .pipe(rename({ extname: ".min.js" }))
    .pipe(dest("output/"));
};

exports.serve = serve;

exports.default = series(clean, parallel(css, javascript));
```

然后在根目录下的`package.json`，修改：

```json
"scripts": {
  "dev": "gulp",
  "build": "gulp build",
  "serve": "gulp serve"
},
```

启动：
```bash
npm run serve
```


