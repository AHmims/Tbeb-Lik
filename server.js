//PACKAGES DECLARATION
const __FS = require('fs');
const __EXPRESS = require('express');
const __APP = __EXPRESS();
const __SERVER = require('https').createServer({
    key: __FS.readFileSync('./key.pem'),
    cert: __FS.readFileSync('./cert.pem'),
    passphrase: 'tbeblik'
}, __APP);
const __IO = require('socket.io')(__SERVER);
const __PATH = require('path');
//IMPORTED MODULES

//GLOBAL VARIABLES
const __PORT = 8080;
let chatters = [],
    rooms = [],
    notifications = [];
//MIDDLEWARES
__APP.use(__EXPRESS.static(__PATH.join(__dirname, 'public')));
//TRAITMENT
__IO.on('connection', socket => {
    // console.log('Socket connected!');
    socket.on('newNotif', data => {
        chatters.forEach(user => {
            // console.log(user.socket, socket.id);
            if (user.socket == `/chat#${socket.id}`) {
                console.log('___________________________________________');
                data.matricule = user.userId // this is key
            }
        });
        // 
        let notifData = {
            index: `NOTIF-${notifications.length + 1}`,
            data: data,
            medecin: null,
            resolved: false
        }
        // 
        notifications.push(notifData);
        // 
        __HUB.emit('getNotifs', notifications);
    });
    socket.on('disconnect', () => {
        // console.log('Socket off');
    });
    // 
});
// NAMEPSACES
const __CHAT = __IO.of('/chat');
const __HUB = __IO.of('/medecinHub');
// 
// CHAT
__CHAT.on('connection', socket => {
    console.log('Chat in');
    // 
    socket.on('setPatient', patientId => {
        let userData = setUserSocket('Patient', socket, patientId);
        // THE MEDECIN HE WILL BE CONNECTED TO
        userData.linkedMedecin = null;
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
        //JOIN THE FIRST ROOM IF THE DOCTOR IS A PART OF ON
        for (let i = 0; i < notifications.length; i++) {
            if (notifications[i].medecin == medecinId) {
                let functionData = joiningRoom(notifications[i].index);
                let roomId = functionData.roomId;
                // 
                socket.join(roomId);
                break;
            }

        }

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
    socket.on('joinRoom', notificationId => {
        let functionData = joiningRoom(notificationId);
        let roomId = functionData.roomId;
        // 
        // 
        socket.leaveAll();
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
        notifications[functionData.arrayIndex].medecin = medecinId;
        // notifications[functionData.arrayIndex].resolved = true;
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
        console.log('_______________\n' + msg + '\n__________');
        let roomId = getRoomIdFromSocket();
        // 
        console.log(roomId);
        msg = getMsgAdditionalData(msg, 'Text');
        socket.to(roomId).emit('msgReceived', msg); //MESSAGE RECEIVED BY EVERYONE EXCEPT SENDER
        //__CHAT.to(roomId).emit('msgReceived', msg); // MESSAGE RECEIVED BY EVERYONE INCLUDIG SENDER
    });
    // 
    // VIDEO
    socket.on('hostStreamInit', () => {
        let roomId = getRoomIdFromSocket();
        // 
        socket.to(roomId).emit('streamStartAttempt', socket.id);
    });
    // 
    socket.on('streamStartSucces', () => {
        console.log('accepted~~~~~~~~~~');
        socket.emit('streamStartSuccess', socket.id);
    });
    socket.on('streamStartFailure', () => {
        console.log('refused~~~~~~~~~~~~');
    });
    // 
    socket.on('candidate', (id, candidate) => {
        socket.to(id).emit('candidate', socket.id, candidate);
    });
    // 
    socket.on('streamOffre', (id, description) => {
        socket.to(id).emit('streamOffre', socket.id, description);
    });
    // 
    socket.on('streamAnswer', (id, description) => {
        socket.to(id).emit('streamAnswer', socket.id, description);
    });
    // 
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
    // 
    function getMsgAdditionalData(msgTxt, type) {
        let msgObject = {
            date: new Date(Date.now()),
            content: msgTxt,
            type: type,
            room: {
                id: null,
                sender: null,
                receiver: null
            }
        }
        // 
        rooms.forEach(room => {
            if (room.patient.socketId == socket.id) {
                msgObject.room.id = room.id;
                msgObject.room.sender = room.patient.id;
                msgObject.room.receiver = room.medecin.id;
            } else if (room.medecin.socketId == socket.id) {
                msgObject.room.id = room.id;
                msgObject.room.sender = room.medecin.id;
                msgObject.room.receiver = room.patient.id;
            }
        });
        // 
        return msgObject;
    }
    // 
    function joiningRoom(nId) {
        let retData = {
            roomId: null,
            arrayIndex: -1
        }
        // 
        for (let i = 0; i < notifications.length; i++) {
            if (notifications[i].index == nId) {
                let patient = notifications[i].data.matricule;
                chatters.forEach(user => {
                    if (user.userId == patient)
                        retData.roomId = user.roomId;
                });
                notifications[i].resolved = true;
                retData.arrayIndex = i;
            }
        }
        // 
        console.log(retData);
        return retData;
    }
    // 
    function getRoomIdFromSocket() {
        let roomId = null;
        console.log(socket.id);
        rooms.forEach(element => {
            console.log(element);
            if (element.patient.socketId == socket.id || element.medecin.socketId == socket.id)
                roomId = element.id;
        });
        return roomId;
    }
});
// NOTIICATION SYSTEM
__HUB.on('connection', socket => {
    console.log('___MEDECIN ON___' + socket.id);
    socket.on('updateNotif', () => {
        // SOME SHIT HERE
        // AND BY SHIT I MEAN SEND SOME DATA TO ALL DOCTORS TO INFORM THEM 
        // THAT THIS ORDER IS NO LONGER ACTIVE
        __IO.emit('notifAccepted', 'SOME DATA');
    });
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
// 
__APP.get('/medecin/notifications', (req, res) => {
    res.sendFile(__PATH.join(__dirname, 'public', 'html', 'ocp_medecin_page1.html'));
});
__APP.get('/medecin/contact', (req, res) => {
    res.sendFile(__PATH.join(__dirname, 'public', 'html', 'ocp_medecin_page2.html'));
});
__APP.get('/patient/form', (req, res) => {
    res.sendFile(__PATH.join(__dirname, 'public', 'html', 'ocp_patient_formulaire.html'));
});
__APP.get('/patient/contact', (req, res) => {
    res.sendFile(__PATH.join(__dirname, 'public', 'html', 'ocp_patient_contact.html'));
});
//START SERVER
__SERVER.listen(__PORT, () => {
    console.log(`Server started...\nListening on port ${__PORT}`);
});