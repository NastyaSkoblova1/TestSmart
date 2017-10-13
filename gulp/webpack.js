'use strict';

const gulp = require('gulp');
const named = require('vinyl-named');
const webpackStream = require('webpack-stream');
var webpack = require('gulp-webpack');
var webpackSource = require('gulp-webpack').webpack
// const webpack = webpackStream.webpack;
const $ = require('gulp-load-plugins')();
const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

gulp.task('webpack', function(callback) {
    let firstBuildReady = false;
    let options = require('../webpack.config.js');
    if (!isDevelopment) {
        options.plugins.push(
            new webpackSource.optimize.UglifyJsPlugin({
                compress: {
                    // don't show unreachable variables etc
                    warnings:     false,
                    unsafe:       true
                }
            })
        );
    }
    function done(err, stats) {
        firstBuildReady = true;

        if (err) { // hard error, see https://webpack.github.io/docs/node.js-api.html#error-handling
            return;  // emit('error', err) in webpack-stream
        }

        $.log[stats.hasErrors() ? 'error' : 'info'](stats.toString({
            colors: true
        }));

    }
    return gulp.src('dev/common/js/*.js')
        .pipe($.plumber())
        .pipe(named())
        .pipe(webpackStream( options ))
        .pipe(gulp.dest('build/js'))
        .on('data', function() {
            if (firstBuildReady) {
                callback();
            }
        });
});
