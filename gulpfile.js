const gulp = require('gulp')
const plumber = require('gulp-plumber')
const webserver = require('gulp-webserver')
const webpack = require('webpack')
const webpackStream = require('webpack-stream')
const webpackConfig = require('./webpack.config.js')

gulp.task('webpack', function () {
    gulp.src(['./src/app.ts'])
        .pipe(plumber())
        .pipe(webpackStream(webpackConfig, webpack))
        .pipe(gulp.dest('./dst/js'))
});

gulp.task('webserver', function () {
    gulp.src('dst')
        .pipe(webserver({
                host: 'localhost',
                port: 8888,
                livereload: false,
                proxies: [
                    {
                        source: '/api',
                        target: 'http://localhost:8080/'
                    }
                ],
            })
        )
});

gulp.task('watch', function () {
    gulp.watch([
        './src/**/*.ts',
        './src/**/*.vue',
        './src/**/*.pug',
        './dst/index.html'
    ], ['webpack']);
});

gulp.task('default', ['webpack', 'watch', 'webserver']);
