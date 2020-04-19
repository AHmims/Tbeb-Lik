const __SOCKET = io('/chat');
const __HUB_SOCKET = io('/medecinHub');
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
const peerConnections = {};
const config = {
    iceServers: [{
        urls: ["stun:stun.l.google.com:19302"]
    }]
};
let videoElement = document.querySelector('video');
// 
document.getElementById('btn-video').addEventListener('click', async () => {
    try {
        const constraints = {
            'video': true,
            'audio': true
        };
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        // 
        document.getElementById('clientVideo').srcObject = stream;
        window.stream = stream;
        // 
        __SOCKET.emit("broadcaster");


    } catch (error) {
        console.error('Error accessing media devices.', error);
    }

});
// 
__SOCKET.on("answer", (id, description) => {
    peerConnections[id].setRemoteDescription(description);
});

__SOCKET.on("watcher", id => {
    console.log('8888');
    const peerConnection = new RTCPeerConnection(config);
    peerConnections[id] = peerConnection;

    let stream = videoElement.srcObject;
    stream.getTracks().forEach(track => {
        console.log({
            track,
            stream
        });
        peerConnection.addTrack(track, stream);
    });

    peerConnection.onicecandidate = event => {
        if (event.candidate) {
            __SOCKET.emit("candidate", id, event.candidate);
        }
    };
    console.log('99999');

    peerConnection
        .createOffer()
        .then(sdp => peerConnection.setLocalDescription(sdp))
        .then(() => {
            console.log('99');
            __SOCKET.emit("offer", id, peerConnection.localDescription);
        });
});

__SOCKET.on("candidate", (id, candidate) => {
    peerConnections[id].addIceCandidate(new RTCIceCandidate(candidate));
});