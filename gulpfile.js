'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var source_files = [
    './src/cookie-monster/dist/cookie-monster.js',
    './src/fastclick/lib/fastclick.js',
    './src/pinkie/index.js',
    './src/querystring/querystring.js',
    './src/superagent/superagent.js',
    './src/vue/dist/vue.js'
];

gulp.task('build', function() {
    return gulp.src(source_files)
        .pipe(concat('index.js'))
        .pipe(gulp.dest('./build/'));
});
