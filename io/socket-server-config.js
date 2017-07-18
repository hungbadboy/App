
module.exports = function (server) {
    var io = require('socket.io').listen(server);
    io.set('transports', ['websocket']);
    io.set('heartbeat interval', 5000); // Ping 5 second.
    io.set('heartbeat timeout', 10000); // timeout received pong 10 second.
    return io;
};
