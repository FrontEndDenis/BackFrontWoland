const plumber = require('gulp-plumber'),
    pug = require('gulp-pug'),
    rename = require('gulp-rename'),
    cached = require('gulp-cached');

module.exports = function () {
    $.gulp.task('php', () => {
        return $.gulp.src('./frontend/templates/index.pug')
            .pipe(plumber())
            .pipe(pug({
                pretty: true
            }))
            .pipe(rename({
              basename: 'index',
              extname: '.php'
            }))
            .pipe(plumber.stop())
            .pipe(cached('pug'))
            .pipe($.gulp.dest('./build/'))
            .on('end', $.browserSync.reload);
    });
};
