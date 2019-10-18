const { src, dest, watch, series } = require('gulp');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();

// exports.default = function() {
//   return src('src/assets/**/*.js')
//   .pipe(uglify())
//   .pipe(rename({ extname: '.min.js' }))
//   .pipe(dest('output/'));
// }