'use strict';

const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

gulp.task('imagemin', function() {
    return gulp.src(['dev/img/**/*.{svg,png,jpg}', '!dev/img/sprite/*.*'])
        .pipe($.newer('build/img'))
        .pipe($.imagemin({
            progressive: true,
            optimizationLevel: 4
        }))
        .pipe(gulp.dest('build/img'));
});
