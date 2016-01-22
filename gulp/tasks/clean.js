'use strict';

let del = require('del');

module.exports = (gulp, plugins) =>
    done => del('./build/**/*', done);