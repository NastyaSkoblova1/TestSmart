const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

// gulp.task('jade', function() {
//     gulp.src(['dev/**/*.jade'])
//         .pipe($.plumber({errorHandler: $.notify.onError("Error: <%= error.message %>")}))
//         .pipe($.changed('build/', {extension: '.html'}))
//         .pipe($.if(global.isWatching, $.cached('jade')))
//         .pipe($.jadeInheritance({basedir: 'dev'}))
//         .pipe($.filter(function (file) {
//             return !/\/_/.test(file.path) || !/^_/.test(file.relative);
//         }))
//         .pipe($.jade({
//             pretty: true,
//             basedir: '/'
//         })).pipe($.rename(function (path) {
//             path.dirname = '';
//             return path;
//         }))
//         .pipe(gulp.dest('build/'))
// });
gulp.task('jade', function() {
    return gulp.src('dev/**/[^_]*.jade')
        .pipe($.plumber())

        //only pass unchanged *main* files and *all* the partials
        .pipe($.changed('build', {extension: '.html'}))

        //filter out unchanged partials, but it only works when watching
        .pipe($.if(global.isWatching, $.cached('jade')))

        //find files that depend on the files that have changed
        .pipe($.jadeInheritance({basedir: 'dev'}))

        //process jade templates
        .pipe($.jade({
            pretty: true,
            basedir: '/'
        })).pipe($.rename(function (path) {
            path.dirname = '';
            return path;
        }))

        //save all the files
        .pipe(gulp.dest('build'));
});
gulp.task('setWatch', function() {
    global.isWatching = true;
});
