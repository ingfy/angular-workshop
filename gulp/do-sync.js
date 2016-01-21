'use strict';

let through = require('through2');
let doSync = (action) => 
    through.obj((file, enc, cb) => { 
        action(file, enc);
         
        cb(null, file); 
    });
    
module.exports = doSync;