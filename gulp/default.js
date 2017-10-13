'use strict';
const gulp = require('gulp');
gulp.task('default', ['jade', 'sprite', 'styles', 'imagemin', 'webpack', 'assets', 'watch', 'serve']);