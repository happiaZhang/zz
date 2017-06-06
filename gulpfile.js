const gulp = require('gulp');
const less = require('gulp-less');
const concat = require('gulp-concat');

gulp.task('less', function () {
  gulp.src('src/less/index.less')
    .pipe(less())
    .pipe(concat('app.css'))
    .pipe(gulp.dest('src/css'));
});