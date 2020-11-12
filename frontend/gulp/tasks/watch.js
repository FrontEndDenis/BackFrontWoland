module.exports = function () {
    $.gulp.task('watch', function () {
        $.gulp.watch(['./frontend/templates/**/*.pug', './frontend/blocks/**/*.pug'], () => {
            $.browserSync.reload();
            done();
        });
        $.gulp.watch([
            './frontend/static/styles/**/*.scss',
            './frontend/blocks/**/*.scss',
            './frontend/components/**/*.scss'
        ], $.gulp.series('styles:dev'));
        $.gulp.watch(['./frontend/static/images/general/**/*.{png,jpg,gif,svg}',
            './frontend/static/images/content/**/*.{png,jpg,gif,svg}'], $.gulp.series('img:dev'));
        $.gulp.watch('./frontend/static/images/svg/*.svg', $.gulp.series('svg'));
        $.gulp.watch('./frontend/static/js/**/*.js', $.gulp.series('js:dev'));
    });
};
