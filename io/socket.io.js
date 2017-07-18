module.exports = function (socket) {
    // Open connection
    var client;
    socket.on("connection", function (client) {
        var socket_id = client.id;
        client.emit("connected", {status: true, socket_id: socket_id});


        // join room
        client.on('disconnect', function(){
            client.join('ROMM');
            client.disconnect();
        });

        // Listener 0
        client.on('listener1', function(data, ackCallBack) {
            console.log(data);
        });

        // Listener 1
        client.on("listener2", function(data, ackCallBack) {
            console.log(data);
        });

        // Disconnect
        client.on('disconnect', function(){
            client.leave(client.room);
            client.disconnect();
        });

        // Broadcast
        client.broadcast.emit('an event', { some: 'data' });
    });
};

