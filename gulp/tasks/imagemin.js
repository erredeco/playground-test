var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var CONFIG = require('../config.js');

gulp.task('imagemin', function() {
  return gulp.src(CONFIG.PATHS.deploydir+'/Assets/Images/**/*')
    .pipe(imagemin([
        imagemin.gifsicle({interlaced: true}),
        imagemin.jpegtran({progressive: true}),
        imagemin.optipng({optimizationLevel: CONFIG.IMAGEMIN.optimizationLevel})    
    ])) 
    .pipe(gulp.dest(CONFIG.PATHS.deploydir+'/Assets/Images/'));
});