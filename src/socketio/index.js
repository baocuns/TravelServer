
const connect = (io) => {
    io.on('connection', (socket) => {
        console.log("New client connected" + socket.id);

        socket.on('disconnect', () => {
            console.log('user disconnected');
        });

        socket.on("sendDataClient", function (data) { // Handle khi có sự kiện tên là sendDataClient từ phía client
            socket.emit("sendDataServer", { data });// phát sự kiện  có tên sendDataServer cùng với dữ liệu tin nhắn từ phía server
        })
    });
}

module.exports = { connect }