'use strict';


let gulp = require('gulp');
let plugins = require('gulp-load-plugins')();

plugins.doSync = require('./gulp/do-sync.js');

function task(name, dependencies, path) {
    let theTask = path => require(path)(gulp, plugins);
    
    if (arguments.length == 2) {     
        path = arguments[1];
    
        return gulp.task(name, theTask(path));
    }
    
    gulp.task(name, dependencies, theTask(path));
}

task('compile', ['clean'], './gulp/tasks/compile');
task('test', ['compile'], './gulp/tasks/start-karma');
task('clean', [], './gulp/tasks/clean');

gulp.task('watch', () => 
    gulp.watch('src/**/*.ts', ['compile', 'test']));