var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    jshint = require('gulp-jshint'),
    expect = require('gulp-expect-file'),
    newer = require('gulp-newer'),
    notify = require('gulp-notify'),
    browserify = require('browserify');


var BUILDDIR = 'dist/';
var SRCDIR = 'src/';
var VENDORFILES = ['vendor/cookies.min.js', 'vendor/browser.js'];



gulp.task('browserify', function() {
    var bundler = browserify(SRCDIR + '/activitytracker.js');
    return bundler.bundle()
        .pipe(vsource('activitytracker.min.js'))
        .on('error', errorHandler)
        .pipe(uglify())
        .pipe(gulp.dest(BUILDDIR))
        .pipe(expect(BUILDDIR + 'activitytracker.min.js'))
        .pipe(notify('browserify complete'));
});


gulp.task('build', function() {
    gulp.src(['vendor/cookies.min.js', 'vendor/browser.js', SRCDIR + '*'])
        .pipe(concat('activitytracker.full.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(BUILDDIR))
        .pipe(expect(BUILDDIR + 'activitytracker.full.min.js'))
        .pipe(notify('build complete'));
})