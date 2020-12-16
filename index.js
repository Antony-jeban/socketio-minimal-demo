
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
    cors: { origin: "*" }
});

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('message', (message) =>     {
        console.log(message);
        io.emit('message', `${socket.id.substr(0,2)} said ${message}` );   
    });
});

http.listen(port, () => console.log(`listening on http://localhost:8080`) );


// Regular Websockets

// const WebSocket = require('ws')
// const server = new WebSocket.Server({ port: '8080' })

// server.on('connection', socket => { 

//   socket.on('message', message => {

//     socket.send(`Roger that! ${message}`);

//   });

// });


 
