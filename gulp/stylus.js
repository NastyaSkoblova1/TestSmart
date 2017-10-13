'use strict';

const gulp = require('gulp'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    lost = require('lost'),
    pe = require('postcss-pe'),
    pr = require('postcss-pr'),
    focus = require('postcss-focus'),
    object_fit_images = require('postcss-object-fit-images'),
    $ = require('gulp-load-plugins')();
const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

gulp.task('styles', function() {
    return gulp.src('dev/common/styles/styles.styl')
        .pipe($.plumber())
        .pipe($.if(isDevelopment, $.sourcemaps.init()))
        .pipe($.stylus({
            'include css': true
        }))
        .pipe(postcss([
            lost,
            focus,
            pe({fontSize: 16}),
            pr({fontSize: 16}),
            object_fit_images,
            autoprefixer({ browsers: ['ie 10-11', 'last 3 versions', '> 5%'] })
        ]))
        .pipe($.if(isDevelopment, $.sourcemaps.write()))
        .pipe($.if(!isDevelopment, $.cssnano({
            safe: true,
            autoprefixer: false
        })))
        .pipe(gulp.dest('build/css'));
});
