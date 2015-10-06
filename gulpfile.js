/**
 * Gulpfile Scurri
 * v.0.1
 * @juniorgodoi
 */

/*====================================
=            Requirements            =
====================================*/

var gulp     = require('gulp'),

// General
rename       = require('gulp-rename');

// Sass
sass         = require('gulp-sass'),
sourcemaps   = require('gulp-sourcemaps'),
autoprefixer = require('gulp-autoprefixer'),
minifyCss    = require('gulp-minify-css'),
combineMq    = require('gulp-combine-mq'),

// Javascript
uglify       = require('gulp-uglify'),
jshint       = require('gulp-jshint'),

// BrowserSync
browserSync  = require('browser-sync'),
reload       = browserSync.reload,

// Error handle
plumber      = require('gulp-plumber'),
notify       = require('gulp-notify');

/*============================
=            Vars            =
============================*/

// Assets
var assets = 'assets/';

// Site folder
var site   = 'scurri';

/*=====================================
=            Handle Errors            =
=====================================*/

function errorAlert(error){
  notify.onError({title: "Error", message: "Check your terminal", sound: "Sosumi"})(error); //Error Notification
  console.log(error.toString());//Prints Error to Console
  this.emit("end"); //End function
};

/*=============================
=            Tasks            =
=============================*/

// Sass
gulp.task('styles', function() {
  return gulp.src(assets+'sass/styles.scss')
  .pipe(plumber({errorHandler: errorAlert}))
  .pipe(sourcemaps.init())
  .pipe(sass({outputStyle: "compressed", noCache: true}))
  .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
  .pipe(combineMq({beautify: false}))
  .pipe(minifyCss({compatibility: 'ie8'}))
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest(assets+'css'))
  .pipe(sourcemaps.write())
  .pipe(browserSync.reload({stream:true}))
  .pipe(notify({ message: 'Styles task complete' }));
});

// Linting
gulp.task('lint', function(){
  return gulp.src([assets+'js/app.js'])
    .pipe(plumber())
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Uglify
gulp.task('uglify', ['lint'], function(){
  gulp.src([assets+'js/app.js'])
    .pipe(plumber())
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(assets+'js/'))
    .pipe(notify({ message: 'Script task complete' }));
});

// Browser-sync
gulp.task('browser-sync', function() {
    browserSync({
        proxy: "http://localhost/" + site
    });
});

gulp.task('reload-files', function(){
  browserSync.reload();
});

// Watch
gulp.task('watch', ['styles', 'browser-sync', 'lint', 'uglify'], function() {

  // Watch .scss files
  gulp.watch(assets+'sass/**/*.scss', ['styles']);


  // Watch .scss files
  gulp.watch([assets+'js/app.js'], ['lint', 'uglify', 'reload-files']);

  // Watch .html files
  gulp.watch('../**/*.html', ['reload-files']);

});

gulp.task('default', ['styles', 'watch']);
