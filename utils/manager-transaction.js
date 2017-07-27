var mysql = require('mysql');
var env = process.env.NODE_ENV || "development";
var path = require('path');
var dbConfig = require(path.join(__dirname, '..', 'config', 'config.json'))[env].db;
var manager = {};

manager.openConnection = function (conn, cb) {
    console.log('Connection is opened');
    var connection = mysql.createConnection(dbConfig.connection);
    connection.connect(function (err) {
        if (err) {
            console.log(err);
            cb(err, null);
        } else {
            cb(null, connection);
        }
    });
};

manager.closeConnection = function (conn) {
    if(conn === null) {
        console.log('Connection is null');
    }
    if(conn.constructor.name === "Connection") {
        console.log('Connection is closed');
        conn.destroy();
    }
};

module.exports = manager;