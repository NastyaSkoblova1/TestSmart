'use strict';
const gulp = require('gulp');
gulp.task('build', ['jade', 'sprite', 'styles', 'imagemin', 'webpack', 'assets']);
