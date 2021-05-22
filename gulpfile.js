const gulp = require('gulp');
const del = require('del');
const pug = require('gulp-pug');
const imagemin = require('gulp-imagemin');
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');
const scss = require('gulp-sass');
const minify = require('gulp-minify');

// change for production build
const isProduction = false;

var paths = {
  pug: {
    src: './src/views/index.pug',
    srcAll: './src/views/**/*.pug',
    dest: './build/',
  },
  images: {
    src: './src/images/*',
    dest: './build/images',
  },
  stylesScss: {
    src: './src/scss/*.scss',
    dest: './src/css',
  },
  stylesCss: {
    src: './src/css/*.css',
    dest: './build/css',
  },
  scripts: {
    src: './src/js/*.js',
    dest: './build/js',
  },
};

// html
function htmlPug() {
  return gulp
    .src(paths.pug.src)
    .pipe(pug({ pretty: isProduction ? false : true }))
    .pipe(gulp.dest(paths.pug.dest));
}

// images
function images() {
  return gulp
    .src(paths.images.src)
    .pipe(imagemin())
    .pipe(gulp.dest(paths.images.dest));
}

// css
function stylesScss() {
  return gulp
    .src(paths.stylesScss.src)
    .pipe(
      scss({
        bundleExec: true,
      })
    )
    .pipe(gulp.dest(paths.stylesScss.dest));
}

function stylesCss() {
  return gulp
    .src(paths.stylesCss.src)
    .pipe(cssmin())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(paths.stylesCss.dest));
}

// javascript
function scripts() {
  return gulp
    .src(paths.scripts.src)
    .pipe(minify({ noSource: isProduction }))
    .pipe(gulp.dest(paths.scripts.dest));
}

// clean build folder
function clean() {
  return del(['./build/']);
}

function watch() {
  gulp.watch(paths.pug.srcAll, htmlPug);
  gulp.watch(paths.images.src, images);
  gulp.watch(paths.stylesScss.src, stylesScss);
  gulp.watch(paths.stylesCss.src, stylesCss);
  gulp.watch(paths.scripts.src, scripts);
}

const build = gulp.series(
  clean,
  gulp.parallel(htmlPug, images, stylesScss, stylesCss, scripts)
);

exports.watch = watch;
exports.default = build;
