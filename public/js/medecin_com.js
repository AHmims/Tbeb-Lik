const __SOCKET = io('/chat');
const __HUB_SOCKET = io('/medecinHub');
let peer = null;
// 
//
__SOCKET.on('connect', () => {
    __SOCKET.emit('setMedecin', 'TbebLik');
});
// 
document.getElementById('btn-send').addEventListener('click', () => {
    __SOCKET.emit('msgSent', document.getElementById('txt-field').value);
});
//  
document.getElementById('btn-join').addEventListener('click', () => {
    __SOCKET.emit('joinRoom', document.getElementById('roomId').value);
    // 
    if (peer != null) {
        peer.destroy();
        document.getElementById('clientVideo').srcObject = null;
        document.getElementById('remoteVideo').srcObject = null;
    }
});
// 
__SOCKET.on('p_liste', data => {
    console.log(data);
});
// 
__SOCKET.on('msgReceived', msg => {
    console.log(msg);
    document.getElementById('remote').innerText += msg.content + '\n';
});
// 
__HUB_SOCKET.on('getNotifs', data => {
    console.log(data);
    // 
    // 
    __HUB_SOCKET.emit('requestValidated', )
});
// 
// 
// 
// 
// 
document.getElementById('btn-video').addEventListener('click', async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
    });
    // 
    document.getElementById('clientVideo').srcObject = stream;
    // 
    peer = new SimplePeer({
        initiator: true,
        stream: stream,
        trickle: false
    })
    peer.on('stream', function (stream) {
        document.getElementById('remoteVideo').srcObject = stream;
    });
    // 
    __SOCKET.emit('liveStreamInit');
    // 
    peer.on('signal', function (data) {
        console.log(data);
        __SOCKET.emit('liveStreamLink', data);
    });
    // 
    console.log(peer);
});
// 
__SOCKET.on('liveStreamDataFlux', answer => {
    peer.signal(answer);
});
// 
__SOCKET.on('patientLinkFailed', () => {
    peer.destroy();
    document.getElementById('clientVideo').srcObject = null;
    console.log(peer);
});
// 