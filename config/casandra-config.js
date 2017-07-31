var cassandra = require('cassandra-driver');
var client = new cassandra.Client({ contactPoints: ['localhost:9042'], keyspace: 'app' });
module.exports = client;
