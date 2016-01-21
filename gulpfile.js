'use strict';

let gulp = require('gulp');
let typescript = require('gulp-typescript');
let jasmine = require('gulp-jasmine');
let gutil = require('gulp-util');

let doSync = require('./gulp/do-sync.js');

let project = typescript.createProject('tsconfig.json', {noExternalResolve: true});

gulp.task('compile', () => 
    gulp.src(['src/**/*.ts', 'typings/**/*.d.ts'])
        .pipe(typescript(project))
        .pipe(doSync((file, enc) => gutil.log(`Compiled ${file.path}`)))
        .pipe(gulp.dest('build')));

gulp.task('test', ['compile'], () => 
    gulp.src('build/**/*.spec.js')
        .pipe(jasmine()));

gulp.task('watch', () => 
    gulp.watch('src/**/*.ts', ['compile', 'test']));