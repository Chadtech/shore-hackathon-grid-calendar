'use strict';

//npm i gulp gulp-sass gulp-clean-css gulp-uglify gulp-rename gulp-changed --save-dev   

//dependencies
var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var changed = require('gulp-changed');


///////////////
///SCSS/CSS
//////////////

var SCSS_SRC = './src/Assets/sass/**/*.scss';
var SCSS_DEST = './src/Assets/css';

// Compile SCSS
gulp.task('sass', function(){
    return gulp.src(SCSS_SRC)
    .pipe(sass().on('error', sass.logError))
    .pipe(minifyCSS())
    .pipe(rename({ suffix: '.min'}))
    .pipe(changed(SCSS_DEST))
    .pipe(gulp.dest(SCSS_DEST));
});

//Compile JS
var JS_SRC = './src/Assets/js/**/*.js';
var JS_DEST = './src/Assets';



// Detect changes
gulp.task('watch',function() {
    gulp.watch(SCSS_SRC, ['sass']);
});

// Build Assets
gulp.task('build', function () {
    gulp.start('sass');
 });

//Run Tasks
gulp.task('default', function() {
    gulp.start('build','watch');
});

