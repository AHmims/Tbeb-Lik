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
let peerConnection;
const config = {
    iceServers: [{
        urls: ["stun:stun.l.google.com:19302"]
    }]
};

// const __SOCKET = io.connect(window.location.origin);
const video = document.getElementById('remoteVideo');

__SOCKET.on("offer", (id, description) => {
    peerConnection = new RTCPeerConnection(config);
    console.log('55');
    peerConnection
        .setRemoteDescription(description)
        .then(() => peerConnection.createAnswer())
        .then(sdp => peerConnection.setLocalDescription(sdp))
        .then(() => {
            __SOCKET.emit("answer", id, peerConnection.localDescription);
        });
    peerConnection.ontrack = event => {
        console.log('ff');
        console.log(event.streams);
        video.srcObject = event.streams[0];
    };
    peerConnection.onicecandidate = event => {
        if (event.candidate) {
            __SOCKET.emit("candidate", id, event.candidate);
        }
    };
});

__SOCKET.on("candidate", (id, candidate) => {
    peerConnection
        .addIceCandidate(new RTCIceCandidate(candidate))
        .catch(e => console.error(e));
});

__SOCKET.on("connect", () => {
    // console.log('55');
    // __SOCKET.emit("watcher");
});

__SOCKET.on("broadcaster", () => {
    console.log('cc');
    __SOCKET.emit("watcher");
});


window.onunload = window.onbeforeunload = () => {
    __SOCKET.close();
};