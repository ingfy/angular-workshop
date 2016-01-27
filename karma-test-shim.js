// Known globals:
/* global jasmine */    // Running in a Karma environment with Jasmine framework
/* global __karma__ */  // Running in a Karma environment
/* global System */     // Imported SystemJS: node_modules/systemjs/dist/system.src.js

// Turn on full stack traces in errors to help debugging
Error.stackTraceLimit=0; //Infinity

jasmine.DEFAULT_TIMEOUT_INTERVAL = 2000;

// Cancel Karma's synchronous start,
// we will call `__karma__.start()` later, once all the specs are loaded.
__karma__.loaded = function() {};

System.config({
  baseURL: '/base/',
  defaultJSExtensions: true,
  paths: {
    'angular2/*': 'node_modules/angular2/*.js',
    'rxjs/*': 'node_modules/rxjs/*.js'
  }
});

function runModuleMainMethod(module, path) {
    if (module.hasOwnProperty('main')) {
        module.main();
    } else {
        throw new Error(`Module ${path} does not implement main() method.`);
    }
}

function loadAllKarmaFiles() {
    return Promise.all(
        Object.keys(window.__karma__.files) // All files served by Karma.
            .filter(onlySpecFiles)
            .map(file2moduleName)
            .map(path => System.import(path).then(module => runModuleMainMethod(module, path))));
}

System.import('angular2/src/platform/browser/browser_adapter')
    .then(browser_adapter => browser_adapter.BrowserDomAdapter.makeCurrent())
    .then(loadAllKarmaFiles)
    .then(() => __karma__.start(), error => {
        console.error(error.stack || error);
        __karma__.start();
    });

function onlySpecFiles(path) {
    return /[\.|_]spec\.js$/.test(path);
}

// Normalize paths to module names.
function file2moduleName(filePath) {
    return filePath.replace(/\\/g, '/')
        .replace(/^\/base\//, '')
        .replace(/\.js/, '');
}