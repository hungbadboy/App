'use strict';
var managerTransaction = require('./manager-transaction');
var executeSQL = {};


executeSQL.select = function (sql, params, conn, callback) {
    console.log('SQL: ', sql);
    managerTransaction.openConnection(conn, function (err, connection) {
        connection.query(sql, params, function (err, data) {
            managerTransaction.closeConnection(connection);
            if (err) {
                console.log('Error: execute SQL!', sql, err);
            } else {
                callback(null, data);
                console.log('Success!');
            }
        });
    });
};

executeSQL.update = function (sql, conn) {
    console.log('SQL: ', sql);
    managerTransaction.openConnection(conn, function (err, connection) {
        connection.query(sql, function (err) {
            managerTransaction.closeConnection(connection);
            if (err) {
                console.log('Error: execute SQL!', sql, err);
            } else {
                console.log('Success!');
            }
        });
    });
};

executeSQL.delete = function (keySQL, callback) {
    connection.query(keySQL, function (err) {
        connection.destroy();
        if (err) {
            console.log('Error: execute SQL!', keySQL, err);
        } else {
            console.log('Success!');
        }
    })
};
executeSQL.insert = function (keySQL, callback) {
    openConnection(function (err, connection) {
        connection.query(keySQL, function (err) {
            connection.destroy();
            if (err) {
                console.log('Error: execute SQL!', keySQL, err);
            } else {
                console.log('Success!');
            }
        });
    });
};

module.exports = executeSQL;

