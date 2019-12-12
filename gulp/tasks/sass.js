'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var gulppostcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var updateRule = require('postcss-sprites/lib/core').updateRule;   
var assets  = require('postcss-assets');
var sprites  = require('postcss-sprites');
var postcss = require('postcss');
var CONFIG = require('../config.js');

// Compiles  Sass
gulp.task('sass', function() {      

    var assetsopts = {    
        cachebuster: true,
        loadPaths: ['Fonts/', 'Images/', 'Sprites/'],
        relative: true,          
        basePath: CONFIG.PATHS.destinationdir+'Assets/',   
    };


    var sassopts = {
        includePaths: CONFIG.SASS_PATHS,
        outputStyle: 'expanded',
        sourceComments:true,
        sourceMap: true
    };

    var spritesopts = {
        spritePath: CONFIG.PATHS.destinationdir+'Assets/Sprites/',
        retina: true,
        verbose:false,
        hooks: {
            onUpdateRule: function(rule, token, image) {
                // Use built-in logic for background-image & background-position
                updateRule(rule, token, image);
      
                ['width', 'height'].forEach(function(prop) {
                    var value = image.coords[prop];
                    if (image.retina) {
                        value /= image.ratio;
                    }
                    rule.insertAfter(rule.last, postcss.decl({
                        prop: prop,
                        value: value + 'px'
                    }));
                });
            }
        },
        
        // use only images inside Sprites
        filterBy: function(image) {
                
            if (!/Sprites\//.test(image.url)) {
                return Promise.reject();
            }
            return Promise.resolve('Sprites');
        }                  
    };

    var plugins = [        
        autoprefixer(), // uses ".browserslistrc" 
        assets(assetsopts),
        sprites(spritesopts)
    ];  
  
  return gulp.src(CONFIG.PATHS.sourcedir+'Scss/*.scss')
    .pipe(sourcemaps.init())
    .pipe(plumber())    
    .pipe(sass(sassopts).on('error', sass.logError))   
    .pipe(gulp.dest(CONFIG.PATHS.destinationdir+'Assets/Css'))
    .pipe(gulppostcss(plugins))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(CONFIG.PATHS.destinationdir+'Assets/Css'))
    ;
});