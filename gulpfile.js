// jshint esversion: 6
const gulp = require('gulp');
const scss = require('gulp-sass');
const browserSync = require('browser-sync');

gulp.task('scss', () => {
  return gulp.src('./scss/*.scss')
  .pipe(scss())
  .pipe(gulp.dest('./public/css'));
});

gulp.task('browserSync', () => {
  return browserSync.init(['./scss', './public'], {
    server: {
      baseDir: './public'
    }
  });
});

// gulp.task('live-reload', () => {
//     gulp.src('./public/**/*')
//     .pipe(connect.reload());
// });

gulp.task('default', ['watch','scss']);

gulp.task('watch', ['browserSync'], () => {
  gulp.watch('./scss/**/*.scss', ['scss']);
});