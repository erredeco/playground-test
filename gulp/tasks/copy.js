var gulp = require('gulp');
var fs = require('fs');
var CONFIG = require('../config.js');

var json = JSON.parse(fs.readFileSync('./package.json'));
var versionDate = new Date().toISOString().slice(0,19).replace(/[^0-9]/g, "-");

// Copies static assets
gulp.task('copy', function() {
  return gulp.src(CONFIG.ASSETS_FILES)
    .pipe(gulp.dest(CONFIG.PATHS.destinationdir+'/Assets'));
});

gulp.task('copy-fonts', function() {
  return gulp.src(CONFIG.FONTS_FILES)
    .pipe(gulp.dest(CONFIG.PATHS.destinationdir+'/Assets/Fonts/'));
});


gulp.task('copy-vendor-js', function() {
  return gulp.src(CONFIG.JS_VENDOR_FILES)
    .pipe(gulp.dest(CONFIG.PATHS.destinationdir+'/Assets/Js/Vendor'));
});

//backup
gulp.task('backup', function() {
  return gulp.src('./source/**/*.*')
    .pipe(gulp.dest(CONFIG.PATHS.bckdir+versionDate+'-version'+json.version));
});