
var net = require('net');

var server = net.createServer(function (socket) {

    socket.write('welcome!\r\n');

    // data ready - echo it back to the socket
    socket.on('data', function(chunk){
        socket.write(chunk);
    });

    socket.on('end', socket.end);

});

server.listen(1337, '0.0.0.0');

console.log('Server is running on port 1337');

