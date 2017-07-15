'use strict';
var mysql = require('mysql');
var path = require('path');
var env = process.env.NODE_ENV || "development";
var dbConfig = require(path.join(__dirname, '..', 'config', 'config.json'))[env].db;
var scriptSQL=require(path.join(__dirname, '..', 'scripts', 'schema'));
var connection = mysql.createConnection(dbConfig.connection);

console.log('SQL', scriptSQL.sql);
connection.query(scriptSQL.sql, function (err) {
    connection.destroy();
    if (err) {
        console.log('Error: Database Created!', err);
    } else {
        console.log('Success: Database Created!');
    }
});

