var gulp = require('gulp');
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var less = require('gulp-less');
var livereload = require('gulp-livereload');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var reactify = require('reactify');

// Build our JS file & minify it
gulp.task('build', function() {
  gulp.src(['js/app.js'])
    .pipe(browserify({
      insertGlobals: true,
      transform: [reactify]
    }))
    //.pipe(uglify()) <- enable, easier to debug
    .pipe(rename('bundle.min.js'))
    .pipe(gulp.dest('build'))
});

// Processing LESS & minify it
gulp.task('less', function() {
  gulp.src('js/less/*.less')
    .pipe(concat('styles.min.less'))
    .pipe(less())
    .pipe(gulp.dest('build'))
});

// Run a constant task to watch for any file changes
gulp.task('watch', function() {
  livereload.listen();
  //gulp.watch('less/*.less', ['less']);
  //gulp.watch('app.js', ['build']);
  //gulp.watch('**/*.*', ['build', 'less']);
  gulp.watch('js/**/*.*', ['build']);
});

// Set the default run
gulp.task('default', ['build', 'less']);
