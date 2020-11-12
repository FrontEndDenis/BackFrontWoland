module.exports = function() {
    $.gulp.task('serve', function() {
        return $.browserSync.init({
            notify: true,
            port: 8001,
            proxy: 'localhost:8002'
        })
    });
};
