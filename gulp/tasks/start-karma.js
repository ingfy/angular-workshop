'use strict';

let karma = require('karma');
let path = require('path');

module.exports = 
    gulp => 
        done => { 
            new karma.Server({
                configFile: path.join(process.cwd(), 'karma.conf.js'),
                singleRun: true
            }).start(done);
        };