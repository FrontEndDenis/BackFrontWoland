module.exports = function () {
	$.gulp.task('serve', function () {
		return $.browserSync.init({
			notify: true,
			port: 8000,
			proxy: 'localhost:8001'
		})
	});
};
