module.exports = {

  PATHS:{
  	'bckdir': './BCK/',
  	'deploydir':'./deploy/',
  	'destinationdir':'./dist/',
    'sourcedir':'./source/'    
  },

  SASS_PATHS: [
    'node_modules/slick-carousel/slick/',
    'node_modules/rfs',
    'node_modules/susy/sass',
    'node_modules/normalize.css',
    'node_modules/@fortawesome/fontawesome-free/scss'
  ],

  //some configs:
  CONNECT:{
		'port':'8092'
	},
    //Optimization level for the postcss-clean task: `0`(disabled),`1`,`2`(maximum, includes rules reordering);
  POSTCSS: {
    clean:{
        'optimizationLevel':2
    }

  },
  //Optimization level for the imagemin task;
  IMAGEMIN :{
		'optimizationLevel':3
	},

  UGLIFY:{
        'comments': false,
        'compress': true,
        'beautify': false,
        'mangle':true
	},

  REPLACE:{ 
  },

  // Assets; this array is used in the "copy" task; it excludes Js folder
  ASSETS_FILES: [
    'source/Assets/**/*',
    '!source/Assets/Js/**'
  ],
  
  FONTS_FILES:[
   'node_modules/slick-carousel/slick/fonts/*.*',
   'node_modules/@fortawesome/fontawesome-free/webfonts/*.*'
  
  
  ],


  JS_VENDOR_FILES: [
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/parsleyjs/dist/parsley.min.js'    
  ],

  JS_FILES: [
      'node_modules/slick-carousel/slick/slick.js',
      'source/Assets/Js/app--common.js'
  ],


  // Assets to deploy; this array is used in the "deploy" task; it excludes all the files that must be handled with a) sass and postcss, and b) uglify.
  //Also, Images/test/ is excluded from deploy
  DEPLOY_FILES:[
    '**/*',
    '!{Css,Images/test,Json}/**',
    '!Js/app.js'
  ]

}
