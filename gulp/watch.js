'use strict';
const gulp = require('gulp');
// gulp.task('watch', ['setWatch', 'jade'], function() {
//     gulp.watch('dev/**/*.jade', ['jade']);
//     gulp.watch(['dev/stylus/**/*.styl','dev/components/**/*.styl'], ['styles']);
//
//     // gulp.watch('dev/**/*.js', ['webpack']);
//
//     gulp.watch('dev/img/**/*.{svg,png,jpg}', ['imagemin']);
//
//     gulp.watch('dev/assets/**/*.*}', ['assets']);
//
//
// });
const $ = require('gulp-load-plugins')();

gulp.task('watch-jade', ['setWatch', 'jade'], function() {
    return $.watch('dev/**/*.jade', function(){
        gulp.start('jade');
    });
});

gulp.task('watch-styles', function() {
    return $.watch(['dev/common/styles/**/*.styl', 'dev/components/**/*.styl', 'dev/pages/**/*.styl'], function(){
        gulp.start('styles');
    });
});

gulp.task('watch-js', function() {
    return $.watch('dev/**/*.js', function(){
        gulp.start('webpack');
    });
});

gulp.task('watch-assets', function() {
    return $.watch('dev/assets/**/*.*', function(){
        gulp.start('assets');
    });
});

gulp.task('watch-img', function() {
    return $.watch('dev/img/**/*.{svg,png,jpg}', function(){
        gulp.start('imagemin');
    });
});

gulp.task('watch-sprite', function() {
    return $.watch('dev/img/sprite/*.*', function(){
        gulp.start('sprite');
    });
});

gulp.task('watch', ['watch-jade', 'watch-styles', 'watch-js', 'watch-assets', 'watch-img', 'watch-sprite']);
