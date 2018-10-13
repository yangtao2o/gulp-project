//导入工具包 require('node_modules里对应模块')
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var cssmin = require('gulp-minify-css');
var htmlmin = require('gulp-htmlmin');
var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');
// var jshint = require('gulp-jshint');

//事件监听


gulp.task('jsmin', function() {
  gulp.src(['src/js/*.js', '!src/js/**/{test1,test2}.js'])
    .pipe(uglify({
      mangle: true,
      compress: true,
      preservecomments: 'all'
    }))
    .pipe(gulp.dest('dist/jsmin'));
});

gulp.task('cssmin', function() {
  gulp.src('src/css/*.css')
    .pipe(cssmin({
      advanced: false,
      compatibility: 'ie8',
      keepBreaks: true,
      keepSpecialComments: '*'
    }))
    .pipe(gulp.dest('dist/cssmin'));
});

gulp.task('htmlmin', function() {
  var options = {
    removeComments: true,
    collapseWhitespace: true,
    removeEmptyAttributes: true,
    removeStyleLinkTypeAttributes: true,
    minifyJS: true,
    minifyCSS: true
  };
  gulp.src('src/html/*.html')
    .pipe(htmlmin(options))
    .pipe(gulp.dest('dist/htmlmin'));
});

gulp.task('concat', function() {
  gulp.src('src/js/*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('dist/concatjs'));
});

// gulp.task('jshint', function() {
// 	gulp.src('src/js/*.js')
// 			.pipe(jshint())
// 			.pipe(jshint.reporter());
// });

gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: ['./'],
      directory: true
    },
    notify: false // 开启静默模式
  });
  //修改html后刷新页面
  gulp.watch("**/*.html").on('change', browserSync.reload);
});

//默认
gulp.task('test', ['browser-sync']);