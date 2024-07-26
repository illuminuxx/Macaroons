'use strict'
const gulp = require('gulp'); //подключение пакета gulp
//const concatCss = require('gulp-concat-css');
const less = require('gulp-less');
const clean = require('gulp-clean');
const rename = require("gulp-rename");
const cleanCSS = require('gulp-clean-css');
const path = require('path');
const concat = require('gulp-concat');
var jsmin = require('gulp-jsmin');


exports.css = function () {
    return gulp.src('./src/styles/*.less')
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(concat("style.css"))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./dist/styles'))
}

exports.js = function ()  {
    return gulp.src('./src/scripts/*.js')
        .pipe(concat('script.js'))
        .pipe(jsmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./dist/scripts'));
}

exports.clean = function () {
    return gulp.src('./dist/styles/*.css', './dist/scripts/*.js', {read: false})
        .pipe(clean());
}


exports.default = function () {
    gulp.watch(['./src/styles/*.less','./src/scripts/*.js'], gulp.series(['clean', 'css', 'js']))
}
