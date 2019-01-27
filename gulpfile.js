const gulp = require("gulp");
const stylus = require("gulp-stylus");
const { series, watch } = require("gulp");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const pug = require("gulp-pug");
const server = require("browser-sync").create();

function style() {
  return gulp
    .src("./source/styles/styles.styl")
    .pipe(stylus())
    .pipe(postcss([autoprefixer({ browsers: "last 2 versions" })]))
    .pipe(gulp.dest("./dist/css/"));
}

function pages() {
  return gulp
    .src("./source/pages/*.pug")
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest("./dist"));
}

function reload(done) {
  server.reload();
  done();
}

function serve(done) {
  server.init({
    server: {
      baseDir: "./dist"
    }
  });
  done();
}

function copy() {
  return gulp.src("./source/assets/**/*").pipe(gulp.dest("./dist"));
}

watch(
  ["./source/styles/**/*.styl", "./source/**/*.styl"],
  series(style, reload)
);
watch("./source/blocks/**/*.pug", series(pages, reload));

exports.dev = series(copy, style, pages, serve);
exports.build = series(copy, style, pages);
