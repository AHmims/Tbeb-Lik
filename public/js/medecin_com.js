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
let peerConnections = {},
    peerConnection;
const config = {
    iceServers: [{
        urls: ["stun:stun.l.google.com:19302"]
    }]
};
// 
document.getElementById('btn-video').addEventListener('click', async () => {
    // IF THERE IS ALREADY A STREAM STOP IT
    /*if (window.stream) {
        window.stream.getTracks().forEach(track => {
            track.stop();
        });
    }*/
    // 
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
        __SOCKET.emit('hostStreamInit');

    } catch (error) {
        console.error('Error accessing media devices.', error);
    }

});
// 
__SOCKET.on('streamStartSuccess', async (patientId) => {
    const peerConnection = new RTCPeerConnection(config);
    peerConnections[patientId] = peerConnection;
    // 
    var localVideo = document.getElementById('clientVideo');
    let stream = localVideo.srcObject;
    // 
    stream.getTracks().forEach(track => peerConnection.addTrack(track, stream));
    // 
    peerConnection.onicecandidate = event => {
        if (event.candidate) {
            __SOCKET.emit("candidate", patientId, event.candidate);
        }
    };
    // 
    let sdp = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(sdp);
    __SOCKET.emit('streamOffre', patientId, peerConnection.localDescription);
});
// 
__SOCKET.on('candidate', (patientId, candidate) => {
    peerConnections[patientId].addIceCandidate(new RTCIceCandidate(candidate));
})
// 
__SOCKET.on('streamOffre', async (patientId, remoteDescription) => {
    peerConnections[patientId] = new RTCPeerConnection(config);
    await peerConnections[patientId].setRemoteDescription(remoteDescription);
    let sdp = await peerConnections[patientId].createAnswer();
    await peerConnections[patientId].setLocalDescription(sdp);
    __SOCKET.emit('streamAnswer', patientId, peerConnections[patientId].localDescription);
    // 
    let remoteVideo = document.getElementById('remoteVideo');
    // 
    peerConnections[patientId].ontrack = event => {
        remoteVideo.srcObject = event.streams[0];
    };
    // 
    peerConnections[patientId].onicecandidate = event => {
        if (event.candidate) {
            socket.emit("candidate", patientId, event.candidate);
        }
    };
    // 

});
// 
__SOCKET.on('streamAnswer', (patientId, remoteDescription) => {
    peerConnections[patientId].setRemoteDescription(remoteDescription);
});