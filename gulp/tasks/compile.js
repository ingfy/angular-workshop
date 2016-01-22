'use strict';

module.exports = (gulp, plugins) =>  {
    let project = plugins.typescript.createProject('tsconfig.json', {});
    
    return () =>
        gulp.src('src/**/*.ts')
            .pipe(plugins.sourcemaps.init())
            .pipe(plugins.typescript(project))
            .pipe(plugins.doSync((file, enc) => plugins.util.log(`Compiled ${file.path}`)))
            .pipe(plugins.sourcemaps.write('.'))
            .pipe(gulp.dest('build'));
};