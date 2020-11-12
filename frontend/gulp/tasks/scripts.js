const uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    scriptsPATH = {
        "input": "./frontend/static/js/",
        "output": "./static/js/"
    },
    babel = require('gulp-babel');

module.exports = function () {
    $.gulp.task('libsJS:dev', () => {
        return $.gulp.src([
                'node_modules/svg4everybody/dist/svg4everybody.min.js',
                'node_modules/bootstrap/dist/js/bootstrap.min.js',
                'node_modules/swiper/swiper-bundle.min.js',
                'node_modules/headroom.js/dist/headroom.min.js',
            ])
            .pipe(concat('libs.min.js'))
            .pipe($.gulp.dest(scriptsPATH.output));
    });

    $.gulp.task('libsJS:build', () => {
        return $.gulp.src([
                'node_modules/svg4everybody/dist/svg4everybody.min.js',
                'node_modules/bootstrap/dist/js/bootstrap.min.js',
                'node_modules/swiper/swiper-bundle.min.js',
                'node_modules/headroom.js/dist/headroom.min.js',
            ])
            .pipe(concat('libs.min.js'))
            .pipe(uglify())
            .pipe($.gulp.dest(scriptsPATH.output));
    });

    $.gulp.task('js:dev', () => {
        return $.gulp.src([scriptsPATH.input + '*.js',
            '!' + scriptsPATH.input + 'libs.min.js'])
            .pipe(babel({
                presets: ['@babel/preset-env']
            }))
            .pipe($.gulp.dest(scriptsPATH.output))
            .pipe($.browserSync.reload({
                stream: true
            }));
    });

    $.gulp.task('js:build', () => {
        return $.gulp.src([scriptsPATH.input + '*.js',
            '!' + scriptsPATH.input + 'libs.min.js'])
            .pipe(babel({
                presets: ['@babel/preset-env']
            }))
            .pipe($.gulp.dest(scriptsPATH.output))
    });

    $.gulp.task('js:build-min', () => {
        return $.gulp.src([
            scriptsPATH.input + 'main.js',
        ])
            .pipe(babel({
                presets: ['@babel/preset-env', 'minify']
            }))
            .pipe($.gulp.dest(scriptsPATH.output))
    });
};