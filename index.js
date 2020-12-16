const http = require('http').createServer();
const express = require('express');
const app = express();
const cors = require('cors');
const router = express.Router();

const port = process.env.PORT || 8080;

router.get('/', (req, res) => {
    res.send('Server is up and running');
});

app.use(cors());
app.use(router);

const io = require('socket.io')(http, {
    cors: {
        origin: "*"
    }
});

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('username', name => {
        socket.userName = name;
        io.emit('userConnected', name);
    })

    socket.on('message', (message) => {
        io.emit('displayMessage', {
            userName: socket.userName,
            message
        });
    });
});

http.listen(port, () => console.log(`listening on http://localhost:8080`));