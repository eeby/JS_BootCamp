var currentData = '';

function connectionHandler(socket) {
    socket.emit('init', currentData);
    socket.on('myServer', function (data) {
        socket.broadcast.emit('dataChange', data);
        currentData = data;
    });
}



module.exports = {
    connectionHandler: connectionHandler,
}


