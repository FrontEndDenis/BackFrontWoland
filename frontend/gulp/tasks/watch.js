module.exports = function () {
    $.gulp.task('watch', function () {
        $.gulp.watch(['./frontend/templates/**/*.pug', './dev/blocks/**/*.pug']);
        $.gulp.watch([
            './frontend/static/styles/**/*.scss',
            './dev/blocks/**/*.scss',
            './dev/components/**/*.scss'
        ], $.gulp.series('styles:dev'));
        $.gulp.watch(['./frontend/static/images/general/**/*.{png,jpg,gif,svg}',
            './frontend/static/images/content/**/*.{png,jpg,gif,svg}'], $.gulp.series('img:dev'));
        $.gulp.watch('./frontend/static/images/svg/*.svg', $.gulp.series('svg'));
        $.gulp.watch('./frontend/static/js/**/*.js', $.gulp.series('js:dev'));
    });
};
