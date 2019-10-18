var gulp = require('gulp');
var browserSync = require('browser-sync').create();

gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: './src',
      directory: true
    },
    notify: false // 开启静默模式
  });
  //修改html后刷新页面
  gulp.watch("src/**/*.js").on('change', browserSync.reload);
  gulp.watch("src/**/*.css").on('change', browserSync.reload);
  gulp.watch("src/**/*.html").on('change', browserSync.reload);
});

gulp.task('default', ['browser-sync']);