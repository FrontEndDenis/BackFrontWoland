const plumber = require('gulp-plumber'),
	pug = require('gulp-pug'),
	cached = require('gulp-cached');

module.exports = function () {
	$.gulp.task('pug', () => {
		return $.gulp.src('./frontend/templates/*.pug')
			.pipe(plumber())
			.pipe(pug({
				doctype: 'html',
				pretty: true
			}))
			.pipe(plumber.stop())
			.pipe(cached('pug'))
			.pipe($.gulp.dest('./build/'))
			.on('end', $.browserSync.reload);
	});
};
