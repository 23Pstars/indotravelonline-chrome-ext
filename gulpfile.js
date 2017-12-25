const gulp = require('gulp');
const fs = require('fs');
const htmlclean = require('gulp-htmlclean');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const cssnano = require('gulp-cssnano');
const rename = require('gulp-rename');

const _src = 'src',
    _dest = 'dist',
    _addt_files = [_src + '/header-ito.png',
        _src + '/logo-ito.png',
        _src + '/header-ito.png',
        _src + '/lrs.min.css',
        _src + '/manifest.json'
    ];

gulp.task('copy', function () {
    gulp.src(_addt_files)
        .pipe(gulp.dest(_dest));
});

gulp.task('html', function () {
    gulp.src(_src + '/*.html')
        .pipe(htmlclean())
        .pipe(gulp.dest(_dest));
});

gulp.task('css', function () {
    gulp.src(_src + '/style.sass')
        .pipe(sass())
        .pipe(cssnano())
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest(_dest));
});

gulp.task('js', function () {
    gulp.src(_src + '/script.js')
        .pipe(uglify())
        .pipe(rename('script.min.js'))
        .pipe(gulp.dest(_dest));
    gulp.src(_src + '/option.js')
        .pipe(uglify())
        .pipe(rename('option.min.js'))
        .pipe(gulp.dest(_dest));
});

gulp.task('default', ['copy', 'html', 'css', 'js']);

gulp.task('watch', ['default'], function () {
    gulp.watch(_addt_files, ['copy']);
    gulp.watch(_src + '/*.html', ['html']);
    gulp.watch(_src + '/style.sass', ['css']);
    gulp.watch(_src + '/*.js', ['js']);
});