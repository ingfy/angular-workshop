'use strict';

let gulp = require('gulp');
let typescript = require('gulp-typescript');
let jasmine = require('gulp-jasmine');

let typescriptTests = require('./gulp/typescript-tests.js');


gulp.task('compile-tests', () => {
    gulp.src('src/*.spec.ts')
        .pipe(typescript({module: 'system'}));
});

gulp.task('test', () => {
    
});