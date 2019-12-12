'use strict';

var gulp = require('gulp');
var gulpif = require('gulp-if');
var postcss = require('gulp-postcss');
var rename = require('gulp-rename');
var replace = require('gulp-string-replace');
var stripdebug = require('gulp-strip-debug');
var clean = require('postcss-clean');
var uglify = require('gulp-uglify');
var minimist = require('minimist');
var CONFIG = require('../config.js');

var knownOptions = {
  string: 'env',
  default: { env: process.env.NODE_ENV || 'staging' }
};
var cmloption = minimist(process.argv.slice(2), knownOptions);
var uglifyoptions = {
    output: {
        comments: CONFIG.UGLIFY.comments,
        beautify: CONFIG.UGLIFY.beautify

    },
    compress: CONFIG.UGLIFY.compress,
    mangle: CONFIG.UGLIFY.mangle
};


gulp.task('copy:deploy', function() {
  return gulp.src(CONFIG.DEPLOY_FILES, { cwd:CONFIG.PATHS.destinationdir+'/Assets/' })
    .pipe(gulp.dest(CONFIG.PATHS.deploydir+'/Assets'));
});



gulp.task('uglify',function(){
    return gulp.src(['*.js','!*.min.js'], { cwd:CONFIG.PATHS.destinationdir+'/Assets/Js/' })
      .pipe(gulpif(cmloption.env === 'production', stripdebug()))
      .pipe(gulpif(cmloption.env === 'production', uglify(uglifyoptions)))      
      .pipe(rename({ suffix: '.min' }))
      .pipe(gulp.dest(CONFIG.PATHS.deploydir+'/Assets/Js/'));
});

gulp.task('postcss:deploy',function(){
    var plugins = [
        clean({
            level: CONFIG.POSTCSS.clean.optimizationLevel
        })
    ];
    return gulp.src(['*.css','!*.min.css' ], { cwd:CONFIG.PATHS.destinationdir+'/Assets/Css/' })
      .pipe(postcss(plugins))
      .pipe(rename({ suffix: '.min' }))
      .pipe(gulp.dest(CONFIG.PATHS.deploydir+'/Assets/Css/'));
});

gulp.task ('deploy',
    gulp.series('uglify',
                'postcss:deploy',
                'copy:deploy')
                );
