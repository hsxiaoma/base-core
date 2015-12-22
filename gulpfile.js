'use strict';

var gulp = require('gulp');

var paths = {
    dst: './build/pages/',
    htmlSrc: ['./src/pages/**/*.html'],
    jsSrc: ['./src/pages/**/*.js'],
    cssSrc: ['./src/pages/**/*.scss'],
    bsSrc: ['./build/pages/**/*']
};

var source = require('vinyl-source-buffer');
var browserify = require('browserify');
var babelify = require('babelify');
var envify = require('envify');
var unreachable = require('unreachable-branch-transform');
var collapser = require('bundle-collapser/plugin');
var vendors = [
    'querystring',
    'vue',
    'superagent',
    'fastclick',
    'cookie-monster',
    'pinkie-promise'
];

var _bCache = {};
var _bPackageCache = {};

gulp.task('build', function() {
    var vendorsBundle = browserify({
        entries: './src/base.js',
        cache: _bCache,
        packageCache: _bPackageCache
    });

    vendors.map(function(v) {
        vendorsBundle.require(v);
    });

    vendorsBundle = vendorsBundle
        .transform(babelify.configure({
            'presets': ['es2015']
        }))
        .transform(envify)
        .transform(unreachable)
        .plugin(collapser);

    vendorsBundle.bundle()
        .pipe(source('build.js'))
        .pipe(gulp.dest('./build'));

    vendorsBundle.on('error', function(err) {
        console.log('Error: ' + err.message);
    });
});
