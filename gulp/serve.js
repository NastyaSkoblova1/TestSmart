'use strict';

const gulp = require('gulp');
const browserSync = require('browser-sync').create();

gulp.task('serve', function() {
    browserSync.init({
        server: 'build',
        port: 3000

    });

    browserSync.watch('build/**/*.*').on('change', browserSync.reload);
});