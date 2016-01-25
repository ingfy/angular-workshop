'use strict';

let path = require('path');
let gulp = require('gulp');
let plugins = require('gulp-load-plugins')();

let config = require('./gulp/config');

plugins.doSync = require('./gulp/do-sync.js');

function task(name, dependencies, path) {
    let theTask = path => require(path)(gulp, plugins);
    
    if (arguments.length == 2) {     
        path = arguments[1];
    
        return gulp.task(name, theTask(path));
    }
    
    gulp.task(name, dependencies, theTask(path));
}

task('compile', './gulp/tasks/compile');
gulp.task('build.dev', ['clean'], () => {
    gulp.start('compile');
    gulp.start('index.dev');
});
gulp.task('build.dev.rebuild', ['compile', 'index.dev']);
task('test', ['compile'], './gulp/tasks/karma.start');
task('index.dev', './gulp/tasks/index.dev');
task('clean', './gulp/tasks/clean');
task('watch.karma', './gulp/tasks/karma.watch');
task('serve', './gulp/tasks/serve');

gulp.task('watch', ['build.dev'], () => {    
    gulp.start('watch.karma');
    gulp.start('serve');
    gulp.watch(path.join(config.SRC, '**/*'), ['build.dev.rebuild']);    
});