'use strict';

let path = require('path');

let config = require('../config');

module.exports = function (gulp, plugins) {    
    return () => {
        let shim = gulp.src(config.shimjs, {read: false}),
            lib = gulp.src(config.libjs, {read: false});
    
        return gulp.src(path.join(config.SRC, config.INDEX))
            .pipe(plugins.inject(shim, {name: 'shim'}))
            .pipe(plugins.inject(lib, {name: 'lib'}))
            .pipe(gulp.dest(config.BUILD));
    };
};