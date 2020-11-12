const imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    imgCompress  = require('imagemin-jpeg-recompress'),
    imgPATH = {
        "input": ["./frontend/static/images/**/*.{png,jpg,gif,svg}",
            '!./frontend/static/images/svg/*'],
        "output": "./static/images/"
    };

module.exports = function () {
    $.gulp.task('img:dev', () => {
        return $.gulp.src(imgPATH.input)
            .pipe($.gulp.dest(imgPATH.output));
    });

    $.gulp.task('img:build', () => {
        return $.gulp.src(imgPATH.input)
            .pipe(cache(imagemin([
                imgCompress({
                    loops: 4,
                    min: 70,
                    max: 80,
                    quality: 'high'
                }),
                imagemin.gifsicle(),
                imagemin.optipng(),
                imagemin.svgo()
            ])))
            .pipe($.gulp.dest(imgPATH.output));
    });
};

