const gulp        = require('gulp');
const concat      = require('gulp-concat-css');
const clean       = require('gulp-clean-css');
const livereload  = require('gulp-livereload');

module.exports = () => {
  gulp.task( 'img', function () {
    return gulp.src( [ './src/img/**/*.*' ], {base:'./src/'} )
      .pipe( gulp.dest('./dist/') )
      .pipe( livereload() );
  });
};
