const gulp = require('gulp');

gulp.task('copy', function () {
  return gulp.src('./src/**/*.css').pipe(gulp.dest('./lib'));
});

gulp.task('default', gulp.series('copy'));