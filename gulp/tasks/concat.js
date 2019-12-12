'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var babel = require('gulp-babel');
var CONFIG = require('../config.js'); 
 

gulp.task('app-js', function() {
  return gulp.src(CONFIG.JS_FILES,{allowEmpty: true })
    .pipe(concat('app.js'))
    .pipe(babel({presets: ['@babel/env']}))
    .pipe(gulp.dest(CONFIG.PATHS.destinationdir+'Assets/Js/'));
});


gulp.task('concat', gulp.series('app-js'));