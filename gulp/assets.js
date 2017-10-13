'use strict';

const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

gulp.task('assets', function() {

    return gulp.src('dev/assets/**/*.*')
        .pipe($.newer('build'))
        .pipe(gulp.dest('build'));
});