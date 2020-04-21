const __SOCKET = io('/chat');
const __HUB_SOCKET = io('/medecinHub');
let __PEER;
//
__SOCKET.on('connect', () => {
    console.log('ff');
    __SOCKET.emit('setMedecin', sessionStorage.getItem('user_M'));
});
__SOCKET.on('msgReceived', msg => {
    console.log(msg);
    displayReceivedMsg(msg);
    // document.getElementById('remote').innerText += msg.content + '\n';
});
__SOCKET.on('p_liste', patients => {
    console.log(patients);
    displayPatientsList(patients);
});
// 
// 
__SOCKET.on('liveStreamDataFlux', answer => {
    __PEER.signal(answer);
});
// 
__SOCKET.on('patientLinkFailed', () => {
    __PEER.destroy();
    document.getElementById('clientVideo').srcObject = null;
    console.log(__PEER);
});

// 
// 
__HUB_SOCKET.on('getNotifs', data => {
    console.log(data);
    notifMiddleMan(data);
    // 
    // 
    // __HUB_SOCKET.emit('requestValidated',)
});
// 
// 
// 
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
// 
function switchUser(notifId) {
    if (__PEER != null) {
        __PEER.destroy();
        document.getElementById('clientVideo').srcObject = null;
        document.getElementById('remoteVideo').srcObject = null;
    }
    __SOCKET.emit('joinRoom', notifId);
}
// 
// 
async function streaminit() {
    const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
    });
    // 
    document.getElementById('clientVideo').srcObject = stream;
    // 
    __PEER = new SimplePeer({
        initiator: true,
        stream: stream,
        trickle: false
    })
    __PEER.on('stream', function (stream) {
        document.getElementById('remoteVideo').srcObject = stream;
        document.getElementById('remoteVideoPoster').style.display = "none";
    });
    // 
    __SOCKET.emit('liveStreamInit');
    // 
    __PEER.on('signal', function (data) {
        console.log(data);
        __SOCKET.emit('liveStreamLink', data);
    });

}
// 