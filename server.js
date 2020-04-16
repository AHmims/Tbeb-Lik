//PACKAGES DECLARATION
const __EXPRESS = require('express');
const __APP = __EXPRESS();
const __HTTP = require('http').Server(__APP);
const __IO = require('socket.io')(__HTTP);
const __PATH = require('path');
//IMPORTED MODULES

//GLOBAL VARIABLES
const __PORT = 8080;
let chatters = [],
    rooms = [];
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

    // 
    socket.on('setPatient', patientId => {
        let userData = setUserSocket('Patient', socket, patientId);
        // THE MEDECIN HE WILL BE CONNECTED TO
        userData.linkedMedecin = 'TbebLik';
        // CHANGE THIS ROOM ID LATER WITH A BETTER RANDOM GENERATED ONE
        userData.roomId = generateRoomId();
        // 
        let exsists = false;
        for (let i = 0; i < chatters.length; i++) {
            if (chatters[i].userId == userData.userId) {
                chatters[i].socket = socket.id;
                exsists = true;
                // 
                socket.join(chatters[i].roomId);
                // 
                chatters[i].online = true;
                // 
                getPatientList(chatters[i].linkedMedecin);
                updateRooms(userData.userId);
                // 
                break;
            }
        }
        if (!exsists) {
            chatters.push(userData);
            // __IO.sockets.in(userData.roomId).on('connection', () => {
            //     console.log('connection to ' + userData.roomId);
            // });
            socket.join(userData.roomId);
            getPatientList(userData.linkedMedecin);
        }
        // UPDATE THE ROOMS USER SOCKETID #IF EXISTS
        //BY THE NEW ONE
        updateRooms();

    });
    // 
    socket.on('setMedecin', medecinId => {
        let userData = setUserSocket('Medecin', socket, medecinId);
        // 
        let exsists = false;
        for (let i = 0; i < chatters.length; i++) {
            if (chatters[i].userId == userData.userId) {
                chatters[i].socket = socket.id;
                exsists = true;
                chatters[i].online = true;
                updateRooms(userData.userId);
                break;
            }
        }
        // 
        if (!exsists) {
            chatters.push(userData);
        }
        console.log(chatters);
        // 
        // UPDATE THE ROOMS USER SOCKETID #IF EXISTS
        //BY THE NEW ONE
    });
    // 
    socket.on('disconnect', () => {
        for (let i = 0; i < chatters.length; i++) {
            // IF A USER DISCONNECTS SET THEIR STATUS TO OFFLINE
            if (chatters[i].socket == socket.id)
                chatters[i].online = false;
            // WHEN A PATIENT DISCONNECTS SEND A REQUEST TO REFRESH THE CORRESPONDING
            // MEDECIN PATIENTS LIST 
            if (chatters[i].type == 'Patient') {
                if (chatters[i].socket == socket.id)
                    getPatientList(chatters[i].linkedMedecin);
            }
        }
        // 
    });
    // 
    socket.on('joinRoom', roomId => {
        socket.join(roomId);
        // 
        let roomInstance = {
            id: roomId,
            patient: {
                id: null,
                socketId: null
            },
            medecin: {
                id: null,
                socketId: null
            }
        }
        // 
        var medecinId = null;
        chatters.forEach(element => {
            if (element.socket == socket.id) {
                medecinId = element.userId;
                roomInstance.medecin.id = element.userId;
                roomInstance.medecin.socketId = element.socket;
            }
        });
        // 
        for (let i = 0; i < chatters.length; i++) {
            if (chatters[i].type == 'Patient') {
                if (chatters[i].roomId == roomId) {
                    chatters[i].linkedMedecin = medecinId;
                    roomInstance.patient.id = chatters[i].userId;
                    roomInstance.patient.socketId = chatters[i].socket;
                }
            }
        }
        // CHECK FOR DUPS
        let roomExists = false;
        for (let i = 0; i < rooms.length; i++) {
            if (rooms[i].id == roomInstance.id) {
                rooms[i] == roomInstance // IF THE ROOM ALREADY EXISTS UPDATE IT'S INFOS
                roomExists = true;
            }
        }
        if (!roomExists)
            rooms.push(roomInstance);
    });
    // 
    socket.on('msgSent', (msg) => {
        let roomId = null;
        console.log(socket.id);
        rooms.forEach(element => {
            console.log(element);
            if (element.patient.socketId == socket.id || element.medecin.socketId == socket.id)
                roomId = element.id;
        });
        // 
        console.log(roomId);
        // socket.to(roomId).emit('msgReceived', msg); //MESSAGE RECEIVED BY EVERYONE EXCEPT SENDER
        __CHAT.to(roomId).emit('msgReceived', msg); // MESSAGE RECEIVED BY EVERYONE INCLUDIG SENDER
    });
    // 
    function setUserSocket(type, socket, id) {
        return {
            userId: id,
            type: type,
            socket: socket.id,
            online: true
        }
    }
    // 
    function generateRoomId() {
        let exists = true;
        let id = '';
        while (exists) {
            exists = false;
            id = `cRoom-${Math.floor(Math.random()*100000)}`;
            for (let i = 0; i < chatters.length; i++) {
                if (chatters[i].roomId == id)
                    exists = true;
            }
        }
        // 
        return id;
    }
    // 
    function getPatientList(medecinId) {
        let patientByMedecin = chatters.filter(element => {
            if (element.type == 'Patient')
                return element.linkedMedecin == medecinId;
            else
                return false;
        });
        // 
        let medecinSocketId = null;
        chatters.forEach(element => {
            if (element.userId == medecinId)
                medecinSocketId = element.socket;
        });
        // SEND DATA TO A SPECEFIC SOCKET
        socket.broadcast.to(medecinSocketId).emit('p_liste', patientByMedecin);
    }
    // 
    function updateRooms(userId) {
        for (let i = 0; i < rooms.length; i++) {
            if (rooms[i].patient.id == userId)
                rooms[i].patient.socketId = socket.id;
            if (rooms[i].medecin.id == userId)
                rooms[i].medecin.socketId = socket.id;
        }
    }
});
// NOTIICATION SYSTEM
const __HUB = __IO.of('/medecinHub');
__HUB.on('connection', socket => {
    console.log('___MEDECIN ON___' + socket.id);
    setTimeout(() => {
        __HUB.emit('newNotif', 'Notifications here!');
    }, 1000);
});
// ROUTES
__APP.get('/', (req, res) => {
    res.sendFile(__PATH.join(__dirname, 'public', 'html', 'ocp_login.html'));
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