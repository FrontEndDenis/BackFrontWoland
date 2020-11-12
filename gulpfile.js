"use strict";

global.$ = {
    path: {
        task: require('./frontend/gulp/path/tasks.js')
    },
    gulp: require('gulp'),
    browserSync: require('browser-sync').create(),
    del: require('del')
};

$.path.task.forEach(function (taskPath) {
    require(taskPath)();
});

$.gulp.task('dev', $.gulp.series(
    $.gulp.parallel(
        'fonts',
        'styles:dev',
        'img:dev',
        'libsJS:dev',
        'js:dev',
        'svg'
    )
));

$.gulp.task('build', $.gulp.series(
    $.gulp.parallel(
        'fonts',
        'styles:build',
        'img:build',
        'libsJS:build',
        'js:build',
        'svg'
    )
));


$.gulp.task('build-min', $.gulp.series(
    $.gulp.parallel(
        'fonts',
        'styles:build-min',
        'img:build',
        'libsJS:build',
        'js:build-min',
        'svg'
    )
));

$.gulp.task('default', $.gulp.series(
    'dev',
    $.gulp.parallel(
        'watch',
        'serve'
    )
));
