const css = require('gulp-css');
const source = require('vinyl-source-stream');
const minifyCSS = require('gulp-csso')
const browserify = require('browserify');
const browserSync = require('browser-sync').create();
const { watch, series, src, dest } = require('gulp');

function jsHandle (cb) {
    browserify('./src/index.js').bundle()
        .pipe(source('index.js'))
        .pipe(dest('dest', { overwrite:true }))
        .pipe(browserSync.stream());
    cb();
}

function htmlHandle (cb) {
    src('src/*.html')
        .pipe(dest('dest', { overwrite:true }))
        .pipe(browserSync.stream());
    cb();
}

function cssHandle (cb) {
    src('./src/**/*.css')
        .pipe(css())
        .pipe(minifyCSS())
        .pipe(dest('dest'))
        .pipe(browserSync.stream());
    cb();
}

const watchOption ={
    events: 'all',
    ignoreInitial:false,
}

function watchFiles(){
    browserSync.init({
        server: {
            baseDir: 'dest',
            index: 'index.html'
        }

    })
    watch(
        'src/**/*.js',
        watchOption,
        htmlHandle,
    ).on('change', browserSync.reload )
    watch(
        'src/*.html',
        watchOption,
        htmlHandle,
    ).on('change', browserSync.reload)
    watch(
        'src/**/*.css',
        watchOption,
        cssHandle,
    ).on('change', browserSync.reload)

}

exports.watch = watchFiles;
exports.default = series(htmlHandle,cssHandle,jsHandle)