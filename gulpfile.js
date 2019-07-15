//导入工具包 require('node_modules里对应模块')
var gulp = require('gulp');
var browserSync = require('browser-sync').create();

gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: ['./src'],
      directory: true
    },
    notify: false // 开启静默模式
  });
  //修改html后刷新页面
  gulp.watch("**/*.html").on('change', browserSync.reload);
});

//默认
gulp.task('browserSync', ['browser-sync']);