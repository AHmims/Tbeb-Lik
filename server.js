//PACKAGES DECLARATION
const __EXPRESS = require('express');
const __APP = __EXPRESS();
const __HTTP = require('http').Server(__APP);
const __IO = require('socket.io')(__HTTP);
const __PATH = require('path');
//IMPORTED MODULES

//GLOBAL VARIABLES
const __PORT = 8080;
let chatters = [];
//MIDDLEWARES
__APP.use(__EXPRESS.static(__PATH.join(__dirname, 'public')));
//TRAITMENT
__IO.on('connection', socket => {
    // console.log('Socket connected!');
    socket.on('disconnect', () => {
        // console.log('Socket off');
    });
    // 
});
// CHAT
const __CHAT = __IO.of('/chat');
__CHAT.on('connection', socket => {
    console.log('Chat in');
    // 
    socket.on('setUser', data => {
        chatters.push({
            userId: data[0],
            type: data[1],
            socket: socket.id
        });
        console.log(chatters);
    });
    // 
    socket.on('disconnect', () => {
        chatters = chatters.filter(chatter => {
            return chatter.socket != socket.id;
        });
        // 
        console.log(chatters);
    });
    // 
    socket.on('joinRoom', () => {
        socket.join('alibaba');
    });
    // 
    socket.on('msgSent', (data) => {
        socket.to('alibaba').emit('msgReceived', data);
    });
});
// ROUTES
__APP.get('/', (req, res) => {
    res.send('<h1>Hello</h1>');
});
__APP.get('/m', (req, res) => {
    res.sendFile(__PATH.join(__dirname, 'public', 'html', 'medecin.html'));
});
__APP.get('/p', (req, res) => {
    res.sendFile(__PATH.join(__dirname, 'public', 'html', 'patient.html'));
});
//START SERVER
__HTTP.listen(__PORT, () => {
    console.log(`Server started...\nListening on port ${__PORT}`);
});