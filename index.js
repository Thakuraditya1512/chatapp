const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use('/css', express.static(__dirname + '/public/css'));
app.use('/js', express.static(__dirname + '/public/js'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');

    // Set the username for this socket
    socket.on('set-username', (name) => {
        socket.username = name;
    });

    socket.on('chat message', (msg) => {
        // Emit the message along with the sender's username and socket ID
        io.emit('chat message', { text: msg, senderId: socket.id, username: socket.username });
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.listen(8000, () => {
    console.log('listening on *:8000');
});
