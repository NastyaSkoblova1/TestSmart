const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

gulp.task('sprite', function() {
    var spriteData =
        gulp.src('dev/img/sprite/*.*') // путь, откуда берем картинки для спрайта
            .pipe($.plumber())
            .pipe($.spritesmith({
                imgName: 'sprite.png',
                retinaImgName: 'sprite@2x.png',
                cssName: 'sprite.styl',
                cssFormat: 'stylus',
                padding: 10,
                retinaSrcFilter: 'dev/img/sprite/*@2x.png',
                algorithm: 'top-down',
                cssTemplate: 'stylus.template.mustache',
                cssVarMap: function(sprite) {
                    sprite.name = 's-' + sprite.name;
                }
            }));

    spriteData.img.pipe(gulp.dest('dev/img/')); // путь, куда сохраняем картинку
    spriteData.css.pipe(gulp.dest('dev/common/styles/')); // путь, куда сохраняем стили
});
