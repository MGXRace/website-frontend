'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var reload = browserSync.reload;

function bundle(bundler) {
  return bundler.bundle()
    .on('error', $.util.log.bind($.util, 'Browserify Error:'))
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe($.sourcemaps.init({loadMaps: true}))
    .pipe($.uglify())
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('.tmp/scripts'))
    .on('end', function() { reload(); });
};

var bundler = watchify(browserify({
  entries: ['./src/scripts/main.js'],
  debug: true,
  insertGlobals: true,
  cache: {},
  packageCache: {},
  fullPaths: true,
  transform: ['browserify-shim', 'reactify']
}));
bundler.on('update', bundle.bind(this, bundler));
bundler.on('log', $.util.log);

gulp.task('watchScripts', bundle.bind(this, bundler));

gulp.task('scripts', function() {
  return bundle(browserify(['./src/scripts/main.js']));
});

gulp.task('styles', function () {
  return gulp.src('src/styles/main.scss')
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      outputStyle: 'nested',
      precision: 10,
      includePaths: ['.'],
      onError: $.util.log.bind($.util, 'Sass error:')
    }))
    .pipe($.postcss([
      require('autoprefixer-core')({browsers: ['last 1 version']})
    ]))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('.tmp/styles'))
    .pipe(reload({stream: true}));
});

gulp.task('images', function() {
  return gulp.src('src/images/**/*')
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true,
      svgoPlugins: [{cleanupIDs: false}]
    })))
    .pipe(gulp.dest('build/images'));
});

gulp.task('fonts', function () {
  return gulp.src(['node_modules/**/*.{eot,ttf,woff,woff2}', 'src/fonts/**/*'])
    .pipe($.flatten())
    .pipe(gulp.dest('.tmp/fonts'))
    .pipe(gulp.dest('build/fonts'));
});

gulp.task('html', ['styles'], function() {
  return gulp.src('src/**/*.html')
    .pipe($.useref())
    .pipe(gulp.dest('build'));
});

gulp.task('clean', require('del').bind(null, ['.tmp', 'build']));

gulp.task('serve', ['watchScripts', 'styles', 'fonts'], function() {
  browserSync({
    notify: false,
    port: 9000,
    server: ['.tmp', 'src', '.']
  });

  gulp.watch(['src/styles/**/*.scss'], ['styles', reload]);
  gulp.watch(['src/images/**/*', 'src/fonts/**/*', 'src/**/*.html'])
    .on('change', reload);
});

gulp.task('build', ['clean', 'html'], function() {
});

gulp.task('default', ['serve'], function() {
});
