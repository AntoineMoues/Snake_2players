
// devDependencies
const gulp = require('gulp'),


        // TOOLS
            gulp_useref = require('gulp-useref'),
            gulp_if = require('gulp-if'),
            gulp_lazypipe = require('lazypipe'),
            gulp_rename = require('gulp-rename'),
            gulp_plumber  = require('gulp-plumber'),
            gulp_sourcemaps  = require('gulp-sourcemaps'),
            gulp_notify = require('gulp-notify'),
            gulp_clean = require('gulp-clean'),
            gulp_browsersync = require('browser-sync').create(),


        // CSS
             gulp_sass  = require('gulp-sass'),
             gulp_autoprefixer  = require('gulp-autoprefixer'),
             gulp_cssnano  = require('gulp-cssnano'),

           //JS
            gulp_babel = require('gulp-babel'),
            es2015 = require('babel-preset-es2015'),
            gulp_uglify=require('gulp-uglify'),

            // IMAGES
            gulp_imagemin=require('gulp-imagemin');


// INIT

  // CONFIG
  const config = {
      dist:'../dist/',
      src:'../src/'
  }

  // GULP
  gulp.task('default', gulp.series(clean, gulp.parallel(browsersync,fonts,sass,js_html,images,watch), () => {

  }));

function gulp_reload(done) {
    gulp_browsersync.reload()
    done();
}

  // WATCH FILES CHANGE
  function watch() {
      gulp.watch(config.src+'styles/**/*.scss', gulp.series(sass,gulp_reload));
      gulp.watch(config.src+'js/**/*.js', gulp.series(js_html,gulp_reload));
      gulp.watch(config.src+'**.html', gulp.series(js_html,gulp_reload));
  };

// BROWSER SYNC & LAUNCH
function browsersync() {
  gulp_browsersync.init({
        server: {
            baseDir: '../dist/'
        }
    });
}

// CLEAN DIST
function clean() {
    return gulp.src('../dist/', {read: false})
        .pipe(gulp_clean({force:true}))
}

// GULP TASKS

  // move fonts to dist
  function fonts() {
      return gulp.src(config.src+'fonts/**/**')
      .pipe(gulp.dest(config.dist+'fonts'))
  }

  // minimify images
  function images() {
      gulp.src(config.src+'img/**')
          .pipe(gulp_imagemin())
          .pipe(gulp.dest(config.dist+'img'));
  }

  // SASS --> CSS --> Autoprefix --> Rename
  function sass() {
      return gulp.src(config.src+'styles/main.scss')
          .pipe(gulp_plumber({
              errorHandler: gulp_notify.onError('SASS Error: <%= error.message %>')
          }))
          .pipe(gulp_sourcemaps.init())
          .pipe(gulp_sass().on('error', gulp_sass.logError))
          .pipe(gulp_autoprefixer({
              browsers:['last 2 versions']
          }))
          .pipe(gulp_cssnano())
          .pipe(gulp_sourcemaps.write())
          .pipe(gulp_rename('main.min.css'))
          .pipe(gulp.dest(config.dist+'assets/css'))
          .pipe(gulp_notify('SASS compiled: <%= file.relative %>'))
  }

  // All js --> One js --> Uglify

var chainjs = gulp_lazypipe().pipe(gulp_babel, {presets:[es2015]}).pipe(gulp_uglify)
  function js_html() {
      return gulp.src(config.src+'*.html')
          .pipe(gulp_useref({}, gulp_lazypipe().pipe(gulp_sourcemaps.init, { loadMaps: true })))

          .pipe(gulp_if('*.js',
             chainjs()
          ))
          .pipe(gulp_sourcemaps.write('maps'))
          .pipe(gulp.dest(config.dist))
          .pipe(gulp_notify('JS compiled/HTML updated'));
  }
