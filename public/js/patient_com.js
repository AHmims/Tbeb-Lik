const globSocket = io();
const __SOCKET = io('/chat');
// 
// 
__SOCKET.on('connect', () => {
    __SOCKET.emit('setPatient', sessionStorage.getItem('user_M'));
});
// 
document.getElementById('btn-send').addEventListener('click', () => {
    __SOCKET.emit('msgSent',
        document.getElementById('txt-field').value
    );
});
// 
__SOCKET.on('msgReceived', msg => {
    console.log(msg);
    document.getElementById('remote').innerText += msg.content + '\n';
});
// 
document.getElementById('btn-notif').addEventListener('click', () => {
    globSocket.emit('newNotif', {
        name: Math.random().toString()
    });
});
// 
// 
// 
// 
let peer;
// 
__SOCKET.on('patientLink', async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
    });
    // 
    document.getElementById('clientVideo').srcObject = stream;
    // 
    peer = new SimplePeer({
        initiator: false,
        stream: stream,
        trickle: false
    })
    peer.on('stream', function (stream) {
        document.getElementById('remoteVideo').srcObject = stream;
    });
    // 
    peer.on('signal', function (data) {
        console.log(data);
        __SOCKET.emit('Answer', data);
    });
});
__SOCKET.on('BackOffer', offer => {
    peer.signal(offer);
});