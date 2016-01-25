module.exports = {
    SRC: './src',
    BUILD: './build',
    INDEX: 'index.html',
    shimjs: [
        'node_modules/systemjs/dist/system-polyfills.js',
        'node_modules/es6-module-loader/dist/es6-module-loader.js',
        'node_modules/es6-shim/es6-shim.js',
        'node_modules/reflect-metadata/Reflect.js',
        'node_modules/systemjs/dist/system.src.js',
        'node_modules/angular2/bundles/angular2-polyfills.js'
    ],
    libjs: [
        'node_modules/rxjs/bundles/Rx.js',
        'node_modules/angular2/bundles/angular2.dev.js',
        // TODO: Add more here
    ]
};