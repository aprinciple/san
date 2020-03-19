/* eslint-disable */

// npm install gulp gulp-plumber gulp-csso node-sass gulp-sass gulp-postcss autoprefixer gulp-pretty-html gulp-babel @babel/core @babel/preset-env gulp-rename del gulp-cache browser-sync --save-dev

const 
  gulp = require('gulp'),
  {src, dest} = require('gulp'),
  plumber = require('gulp-plumber'),
  csso = require('gulp-csso'),
  sass = require('gulp-sass'),
  postcss = require('gulp-postcss'),
  autoprefixer = require('autoprefixer'),
  prettyHtml = require('gulp-pretty-html'),
  babel = require('gulp-babel'),
  terser = require('gulp-terser'),
  rename = require('gulp-rename'),
  del = require('del'),
  cache = require('gulp-cache'),
  browserSync = require('browser-sync').create();

function html() {
  return src(['src/views/*.html'])
  .pipe(prettyHtml({
    indent_size: 2
  }))
  .pipe(dest('dist'))
  .pipe(browserSync.stream());
}

function style() {
  return src('src/styles/style.scss')
    .pipe(plumber())
    .pipe(sass()) 
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(dest('dist/css'))
    .pipe(csso())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(dest('dist/css'))
    .pipe(browserSync.stream());
}

function script() {
  return src('src/js/*.js')
    .pipe(plumber())
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(dest('dist/js'))
    .pipe(terser())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(dest('dist/js'))
    .pipe(browserSync.stream());
}

function server() {
  return browserSync.init({
    server: 'dist/',
    port: 3000,
    notify: true
  });
}

function watch() {
  gulp.watch(['src/views/*.html'], gulp.parallel(html));
  gulp.watch(['src/styles/**/*.scss'], gulp.parallel(style));
  gulp.watch(['src/js/*.js'], gulp.parallel(script));
}

function clean() {
  return del('dist');
}

function clear() {
  return cache.clearAll();
}

exports.build = gulp.series(clean, clear,
    gulp.parallel([html, style, script]),
    gulp.parallel(server, watch));