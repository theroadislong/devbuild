const gulp = require('gulp');
const stylus = require('gulp-stylus');
const { series, watch } = require('gulp');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const pug = require('gulp-pug');
const server = require('browser-sync').create();

function style() {
  return gulp.src('./source/styles/styles.styl')
    .pipe(stylus())
    .pipe(postcss([autoprefixer({ browsers: 'last 2 versions' })]))
    .pipe(gulp.dest('./build/css/'));
}

function pages() {
  return gulp.src('./source/pages/*.pug')
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest('./build'))
}

function reload(done) {
  server.reload();
  done();
}

function serve(done) {
  server.init({
    server: {
      baseDir: './build'
    }
  });
  done();
}

watch(['./source/styles/**/*.styl', './source/**/*.styl'], series(style, reload))
watch('./source/blocks/**/*.pug', series(pages, reload))

exports.dev = series(style, pages, serve);