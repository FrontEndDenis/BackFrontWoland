module.exports = function () {
	$.gulp.task('fonts', () => {
		return $.gulp.src('./frontend/static/fonts/**/*.*')
			.pipe($.gulp.dest('./static/fonts/'));
	});
};