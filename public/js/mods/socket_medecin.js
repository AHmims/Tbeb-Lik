const __SOCKET = io('/chat');
const __HUB_SOCKET = io('/medecinHub');
//
__SOCKET.on('connect', () => {
    __SOCKET.emit('setMedecin', sessionStorage.getItem('user_M'));
});
__SOCKET.on('msgReceived', msg => {
    console.log(msg);
    displayReceivedMsg(msg);
    // document.getElementById('remote').innerText += msg.content + '\n';
});
__SOCKET.on('p_liste', data => {
    console.log(data);
});
// 
__HUB_SOCKET.on('getNotifs', data => {
    console.log(data);
    notifMiddleMan(data);
    // 
    // 
    // __HUB_SOCKET.emit('requestValidated',)
});
// 
function notificationAccepted(notifId) {
    // console.log(notifId);
    __SOCKET.emit('joinRoom', notifId);
    __HUB_SOCKET.emit('updateNotif');
}

function sendMsg(msg) {
    // console.log('dong dong');
    __SOCKET.emit('msgSent', msg);
}