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
let peerConnections = {},
    peerConnection;
const config = {
    iceServers: [{
        urls: ["stun:stun.l.google.com:19302"]
    }]
};
// 
__SOCKET.on('streamStartAttempt', async (medecinId) => {
    let connectionResponse = confirm('Votre medecin ve se connecter avec vous.');
    if (connectionResponse) {
        __SOCKET.emit('streamStartSucces');
        // 
        try {
            const constraints = {
                'video': true,
                'audio': true
            };
            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            //
            var localVideo = document.getElementById('clientVideo');
            localVideo.srcObject = stream;
            window.stream = stream;
            // 
            const peerConnection = new RTCPeerConnection(config);
            peerConnections[medecinId] = peerConnection;
            // 
            stream.getTracks().forEach(track => peerConnection.addTrack(track, stream));
            // 
            peerConnection.onicecandidate = event => {
                if (event.candidate) {
                    __SOCKET.emit("candidate", medecinId, event.candidate);
                }
            };
            // 
            let sdp = await peerConnection.createOffer();
            await peerConnection.setLocalDescription(sdp);
            __SOCKET.emit('streamOffre', medecinId, peerConnection.localDescription);
        } catch (error) {
            console.error('Error accessing media devices.', error);
        }
    } else {
        __SOCKET.emit('streamStartFailure');
    }
});
// 
__SOCKET.on('candidate', (medecinId, candidate) => {
    peerConnections[medecinId].addIceCandidate(new RTCIceCandidate(candidate));
});
// 
__SOCKET.on('streamOffre', async (medecinId, remoteDescription) => {
    peerConnections[medecinId] = new RTCPeerConnection(config);
    await peerConnections[medecinId].setRemoteDescription(remoteDescription);
    let sdp = await peerConnections[medecinId].createAnswer();
    await peerConnections[medecinId].setLocalDescription(sdp);
    __SOCKET.emit('streamAnswer', medecinId, peerConnections[medecinId].localDescription);
    // 
    let remoteVideo = document.getElementById('remoteVideo');
    // 
    peerConnections[medecinId].ontrack = event => {
        remoteVideo.srcObject = event.streams[0];
    };
    // 
    peerConnections[medecinId].onicecandidate = event => {
        if (event.candidate) {
            socket.emit("candidate", medecinId, event.candidate);
        }
    };
    // 

});
// 
__SOCKET.on('streamAnswer', (medecinId, remoteDescription) => {
    peerConnections[medecinId].setRemoteDescription(remoteDescription);
});