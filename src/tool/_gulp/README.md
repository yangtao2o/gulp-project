# Gulp 自动化构建

- [Gulp-v4总结](https://github.com/yangtao2o/gulp-project/blob/master/docs/gulp-v4.md)
- [Gulp快速入门指南](https://www.gulpjs.com.cn/docs/getting-started/quick-start/)

## Gulp + SASS

-[如何安装 Sass](https://www.sass.hk/install/)

```shell
npm install node-sass gulp-sass --save-dev
```

`gulpfile.js` 文件主要配置如下：

```js
const { src, dest, watch } = require("gulp");
const sass = require("gulp-sass");
sass.compiler = require("node-sass");

function scss() {
  return src(scssGlobSrc)
    .pipe(sass({ outputStyle: "expanded" }).on("error", sass.logError))
    .pipe(dest("dist/sass"));
}

exports.scss = scss;
```

启动：`gulp scss`。

## Gulp + Browsersync

- [Browsersync + Gulp.js](http://www.browsersync.cn/docs/gulp/)

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

exports.serve = serve;
```

运行：

```shell
gulp serve
```

## Gulp + TypeScript

根目录下初始化：`tsc --init`。

安装依赖：

```shell
npm i -D typescript gulp-typescript
```

配置：

```js
const ts = require('gulp-typescript');
const tsProject = ts.createProject("tsconfig.json");

function typescript() {
  return tsProject.src()
    .pipe(tsProject())
    .js.pipe(dest('dist/ts'));
}

exports.typescript = typescript;
```

src 目录下新建文件 `main.ts`：

```ts
class Student {
  fullName: string;
  constructor(public firstName: string, public lastName: string) {
    this.fullName = `${firstName} ${lastName} `;
  }
}

interface Person {
  firstName: string;
  lastName: string;
}

function greeter(person: Person) {
  console.log(`hello, ${person.firstName} ${person.lastName}`);
}

let user = new Student('Yang', 'Tao');

greeter(user);
console.log(user.fullName)
```

运行：

```shell
gulp typescript
```

## Riot
- [Riot.js 框架深入解析](http://eux.baidu.com/blog/fe/riot-js-%E6%A1%86%E6%9E%B6%E6%B7%B1%E5%85%A5%E8%A7%A3%E6%9E%90)
- [riot.js教程【一】简介](https://cloud.tencent.com/developer/article/1019472)
- [RIOT](https://riot.js.org/documentation/)文档
