'use strict';

let karma = require('karma');
let path = require('path');
let process = require('process');

module.exports = function (configObject) {
    let config = Object.assign({
        configFile: path.join(process.cwd(), 'karma.conf.js'),
        singleRun: true
    }, configObject);
    
    return function (gulp) { 
        return done => new karma.Server(config).start(done);
    };
};