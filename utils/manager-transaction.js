var mysql = require('mysql');
var env = process.env.NODE_ENV || "development";
var path = require('path');
var dbConfig = require(path.join(__dirname, '..', 'config', 'config.json'))[env].db;
var manager = {};
var connection;

manager.openConnection = function (conn, cb) {
    if(conn !== null && conn.constructor.name === "Connection") {
        connection = conn;
    }
    if(connection === null || connection === undefined) {
        console.log('Connection is opened');
        connection = mysql.createConnection(dbConfig.connection);
        connection.connect(function (err) {
            if (err) {
                cb(err, null);
            } else {
                cb(null, connection);
            }
        });
    } else {
        cb(null, connection);
    }

};

manager.closeConnection = function (conn) {
    if(conn === null) {
        console.log('Connection is null');
    }
    if(conn.constructor.name === "Connection") {
        console.log('Connection is closed');
        conn.destroy();
        connection = null;
    }
};

manager.getCurrentConnection = function () {
    return connection;
};
module.exports = manager;