const { src, dest, watch, task, series, parallel } = require("gulp");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const sass = require("gulp-sass");
sass.compiler = require("node-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const babel = require("gulp-babel");
const del = require("del");
const browserSync = require("browser-sync").create();
const reload = browserSync.reload;
const ts = require('gulp-typescript');
const tsProject = ts.createProject("tsconfig.json");

const allGlobSrc = "src/**/*";
const scssGlobSrc = "src/assets/sass/*.scss";
const jsGlobSrc = "src/assets/js/*.js";

const watcher = watch(allGlobSrc);

function clean(cb) {
  (async () => {
    const deletedPaths = await del(["dist/**/*", "!dist/unicorn.js"]);
    console.log("Deleted files and directories:\n", deletedPaths.join("\n"));
  })();
  cb();
}

function html(cb) {
  cb();
}

function css() {
  const plugins = [autoprefixer(), cssnano()];
  return src("./dist/sass/*")
    .pipe(postcss(plugins))
    .pipe(rename({ extname: ".min.css" }))
    .pipe(dest("dist/css"));
}

function scss() {
  return src(scssGlobSrc)
    .pipe(sass({ outputStyle: "expanded" }).on("error", sass.logError))
    .pipe(dest("dist/sass"));
}

function js() {
  return src(jsGlobSrc)
    .pipe(
      babel({
        presets: ["@babel/preset-env"]
      })
    )
    .pipe(uglify())
    .pipe(rename({ extname: ".min.js" }))
    .pipe(dest("dist/js"));
}

function typescript() {
  return tsProject.src()
    .pipe(tsProject())
    .js.pipe(dest('dist/ts'));
}

function serve(cb) {
  browserSync.init({
    server: {
      baseDir: "./"
      // https: true,
      // directory: true,   //从与目录列表的应用程序目录中的文件即成
      // index: "index.html"  //从应用程序目录中提供文件，指定特定文件名为索引
    },
    port: 8080
  });
  cb();
}

// 监听 globs 并在发生更改时运行任务
watcher.on("change", function(path, stats) {
  console.log(`File ${path} was changed`);
});

watcher.on("add", function(path, stats) {
  console.log(`File ${path} was added`);
});

watcher.on("unlink", function(path, stats) {
  console.log(`File ${path} was removed`);
});

// 可以只关联一个任务
watch(jsGlobSrc, js);
// 或者关联一个任务组合
watch(scssGlobSrc, series(scss, css));
// 文件第一次修改之后要等待 800 毫秒才执行关联的任务
watch(allGlobSrc, { delay: 800 }, cb => {
  reload(); // 刷新页面
  cb();
});

exports.js = js;
exports.css = css;
exports.scss = scss;
exports.html = html;
exports.typescript = typescript;

if (process.env.NODE_ENV === "dev") {
  exports.serve = serve;
  exports.build = series(clean, scss, parallel(css, js));
  exports.default = series(scss, parallel(css, js), serve);
}
