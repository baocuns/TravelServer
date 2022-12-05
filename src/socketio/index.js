const Tour = require('../app/models/Tour')


const connect = (io) => {
    const count = io.engine.clientsCount;
    console.log('count:', count);

    io.on('connection', (socket) => {
        console.log("New client connected: " + socket.id);
        socket.on('disconnect', () => {
            console.log('user disconnected: ', socket.id);
        });

        
    });

    Tour.watch().on('change', () => {
        io.emit('on-change', 'tour')
    })
}

module.exports = { connect }