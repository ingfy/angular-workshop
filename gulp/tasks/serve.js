'use strict';

let liveServer = require('live-server');
let path = require('path');

let config = require('../config');

module.exports = (gulp, plugins) =>
    () => liveServer.start({
        open: '/build',
        watch: config.BUILD
    });