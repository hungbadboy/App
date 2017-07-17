'use strict';
var path = require('path');
var scriptSQL=require(path.join(__dirname, '..', 'scripts', 'schema'));

var dbUtil = require(path.join(__dirname, '..', 'utils', 'dbUtil'));
dbUtil.update(scriptSQL.sql, null, function (err, data) {
    console.log(err, data);
});
