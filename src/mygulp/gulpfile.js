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
      baseDir: './',
      // https: true,
      // directory: true,   //从与目录列表的应用程序目录中的文件即成
      // index: "index.html"  //从应用程序目录中提供文件，指定特定文件名为索引
    },
    port: 8080
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
