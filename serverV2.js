//PACKAGES DECLARATION
var _ = require('lodash');
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
const __PDF = require('./model/savePdf');
const _CLASSES = require('./model/classes');
const _DB = require('./model/dbOperations');
//GLOBAL VARIABLES
const __PORT = 8080;
let chatters = [],
    rooms = [],
    notifications = []; // .reolves => true / false / complete
//MIDDLEWARES
__APP.use(__EXPRESS.urlencoded({
    extended: true
}));
__APP.use(__EXPRESS.json());
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
            date: null,
            resolved: false
        }
        // 
        console.log(notifData);
        notifications.push(notifData);
        // 
        let toSendNotifs = notifications.filter(element => {
            return element.resolved == false;
        });
        // 
        __HUB.emit('getNotifs', toSendNotifs);
    });
    socket.on('disconnect', () => {
        // console.log('Socket off');
    });
    // 
});
// NAMEPSACES
const __CHAT = __IO.of('/chat');
const __HUB = __IO.of('/medecinHub');
// CHAT
__CHAT.on('connection', socket => {
    console.log('Chat in');
    // 
    socket.on('setPatient', async patientId => {
        let userInstance = setUserSocket('Patient', socket, patientId);
        // 
        let exsistingUser = await _DB.getAppUserDataById(userInstance.userId);
        // 
        if (exsistingUser != null) {
            let updatingResult = await _DB.customDataUpdate({
                socket: socket.id,
                online: true
            }, exsistingUser.userId, {
                table: "appUser",
                id: "userId"
            });
            // 
            socket.join(exsistingUser.roomId);
            // 
            if (exsistingUser.linkedMedecinMatricule != null)
                getPatientList(exsistingUser.linkedMedecinMatricule);
            // updateRooms(userData.userId);
        }
        // 
        else {
            let insertResult = await _DB.insertData(userInstance);
            socket.join(userInstance.roomId);
            // getPatientList(userInstance.linkedMedecinMatricule);
        }
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
                // 
                // updateRooms(userData.userId);
                // getPatientList(chatters[i].userId);
                // 
                break;
            }
        }
        // 
        if (!exsists) {
            chatters.push(userData);
        }
        console.log(chatters);
        //JOIN THE FIRST ROOM IF THE DOCTOR IS A PART OF ONE
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
    socket.on('disconnect', async () => {
        let retData = await _DB.getAppUserCustomDataBySocket(["userId", "userType", "linkedMedecinMatricule"], socket.id);
        if (retData != null) {
            // IF A USER DISCONNECTS SET THEIR STATUS TO OFFLINE
            let updatingResult = await _DB.customDataUpdate({
                online: false
            }, retData.userId, {
                table: "appUser",
                id: "userId"
            });
            // WHEN A PATIENT DISCONNECTS SEND A REQUEST TO REFRESH THE CORRESPONDING
            // MEDECIN PATIENTS LIST 
            if (retData.userType == 'Patient') {
                getPatientList(retData.linkedMedecinMatricule);
            } else
                removeMeFromEveryInstanceSoThatThingsWontBreakLater();
            // 
        }
    });
    // 
    socket.on('joinRoom', (notificationId, date) => {
        let functionData = joiningRoom(notificationId, date);
        let roomId = functionData.roomId;
        // 
        // 
        removeMeFromEveryInstanceSoThatThingsWontBreakLater();
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
        if (medecinId != null) {
            if (notifications[functionData.arrayIndex]) {
                notifications[functionData.arrayIndex].medecin = medecinId;
                notifications[functionData.arrayIndex].date = date;
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
                        rooms[i] = roomInstance; // IF THE ROOM ALREADY EXISTS UPDATE IT'S INFOS
                        console.log(roomInstance)
                        roomExists = true;
                    }
                }
                if (!roomExists)
                    rooms.push(roomInstance);
            }
        }
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
    // socket.on('liveStreamInit', () => {
    //     let roomId = getRoomIdFromSocket();
    //     console.log('liveStreamInit()');
    //     socket.to(roomId).emit('patientLink');
    // });
    // 
    socket.on('liveStreamInitFail', () => {
        let roomId = getRoomIdFromSocket();
        console.log('liveStreamInitFail()');
        socket.to(roomId).emit('patientLinkFailed');
    });
    // 
    socket.on('liveStreamLink', (data) => {
        let roomId = getRoomIdFromSocket();
        console.log('liveStreamLink()');
        socket.to(roomId).emit('liveStreamDataFlux', data);
    });
    //
    //  
    // 
    function setUserSocket(type, socket, id) {
        return new _CLASSES.appUser(id, type, socket.id, true);
        // -- ----------
        // let status = await _DB.insertData(new _CLASSES.appUser(id, type, socket.id, true));
        // if (status > 0) {
        //     return await _DB.getAppUserDataById(id);
        // }
        // -- -------------
        // return {
        //     userId: id,
        //     type: type,
        //     socket: socket.id,
        //     online: true
        // }
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
    async function getPatientList(medecinId) {
        let appUsersPatients = await _DB.getAppUserPatientsByMedecinId(medecinId);
        //
        for (let i = 0; i < appUsersPatients.length; i++) {
            let objectClass = new _CLASSES.appUser(Object.values(appUsersPatients[i]));
            let refinedObject = objectClass.getStatus();
            // 
            refinedObject.notifId = null;
            // 
            let userNotifications = await _DB.getNotificationDataByPatientId(refinedObject.userId);
            // 
            userNotifications.forEach(notif => {
                if (notif.MATRICULE_PAT == refinedObject.userId)
                    refinedObject.notifId = notif.idPreCons;
            });
            // 
            refinedObject.nom = `${appUsersPatients[i].NOM_PAT} ${appUsersPatients[i].Prenom_PAT.toUpperCase()}`;
            // 
            appUsersPatients[i] = refinedObject;
        }
        let medecinSocketId = await _DB.getAppUserCustomData(["socket"], medecinId);
        socket.to(medecinSocketId).emit('p_liste', appUsersPatients);
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
    function joiningRoom(nId, date = null) {
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
                //
                if (notifications[i].resolved == false && retData.roomId != null)
                    socket.to(retData.roomId).emit('newNotification', date, true);
                // 
                notifications[i].resolved = true;
                retData.arrayIndex = i;
            }
        }
        // 
        console.log('joiningRoom()', retData);
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
    // 
    async function removeMeFromEveryInstanceSoThatThingsWontBreakLater() {
        socket.leaveAll();
        // REMOVE TRACE FROM THE ROOMS
        let retData = await _DB.getAppUserCustomDataBySocket(["userId"], socket.id);
        let roomId = await _DB.getRoomId("userMedecinMatricule", retData.userId);
        // 
        if (roomId != null) {
            let updatingResult = await _DB.customDataUpdate({
                userMedecinMatricule: ""
            }, room.roomId, {
                table: "room",
                id: "roomId"
            });
            // STOP STREAM FLUX
            socket.to(room.roomId).emit('liveStreamTerminated');
        }
        // 
    }
});
// NOTIICATION SYSTEM
__HUB.on('connection', socket => {
    console.log('___MEDECIN ON___' + socket.id);
    socket.on('updateNotif', (notifId) => {
        // SOME SHIT HERE
        // AND BY SHIT I MEAN SEND SOME DATA TO ALL DOCTORS TO INFORM THEM 
        // THAT THIS ORDER IS NO LONGER ACTIVE
        socket.emit('notifAccepted', notifId);
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
// 
// 
__APP.post('/getActivePatients', (req, res) => {
    let medecinId = req.body.medecinId;
    let patientByMedecin = chatters.filter(element => {
        if (element.type == 'Patient')
            return element.linkedMedecin == medecinId;
        else
            return false;
    });
    // 
    for (let i = 0; i < patientByMedecin.length; i++) {
        let refinedObject = _.pick(patientByMedecin[i], ["userId", "online"]);
        refinedObject.notifId = null;
        // 
        notifications.forEach(notif => {
            if (notif.data.matricule == patientByMedecin[i].userId)
                refinedObject.notifId = notif.index;
        });
        // 
        patientByMedecin[i] = refinedObject;
    } // 
    // 
    res.end(JSON.stringify(patientByMedecin));
});
// 
__APP.post('/createDoc', async (req, res) => {
    let data = req.body.data;
    rooms.forEach(room => {
        if (room.medecin.id == req.body.userId) {
            data.mle = room.patient.id;
            chatters.forEach(user => {
                data.nom = "nom";
                data.prenom = "prenom";
                data.direction = "direction";
            });
        }
    });
    // 
    var state = await __PDF.makeDoc(data);
    res.end(state.toString());
});
// 
// 
//START SERVER
__SERVER.listen(__PORT, '0.0.0.0', () => {
    console.log(`Server started...\nListening on port ${__PORT}`);
});