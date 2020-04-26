const globSocket = io();
const __SOCKET = io('/chat');
let __PEER = null;
// 
__SOCKET.on('connect', () => {
    __SOCKET.emit('setPatient', sessionStorage.getItem('user_M'));
});
__SOCKET.on('msgReceived', msg => {
    console.log(msg);
    displayReceivedMsg(msg);
    // document.getElementById('remote').innerText += msg.content + '\n';
});
// 
// 
__SOCKET.on('liveStreamDataFlux', async (offer) => {
    // let status = ;
    if (confirm('Votre medecin est entrain de vous appelle.')) {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        });
        // 
        document.getElementById('clientVideo').srcObject = stream;
        // 
        __PEER = new SimplePeer({
            initiator: false,
            stream: stream,
            trickle: false
        })
        // 
        // 
        __PEER.on('stream', function (stream) {
            document.getElementById('remoteVideo').srcObject = stream;
            document.getElementById('remoteVideoPoster').style.display = "none";
            console.log('Stream()');
        });
        // 
        __PEER.on('signal', function (data) {
            console.log('signal()');
            __SOCKET.emit('liveStreamLink', data);
        });
        // 
        __PEER.signal(offer);
    } else {
        __SOCKET.emit('liveStreamInitFail');
    }
});
// 
__SOCKET.on('liveStreamTerminated', () => {
    if (__PEER != null) {
        __PEER = null;
        document.getElementById('clientVideo').srcObject = null;
        document.getElementById('remoteVideo').srcObject = null;
        // 
        document.getElementById('remoteVideoPoster').style.display = "flex";
        console.log('ended');
    }
});
// 
// 
__SOCKET.on('newNotification', (date, state) => {
    // sessionStorage.setItem('smtg', JSON.stringify(data));
    // window.location.href = "/patient/contact";
    console.log(date);
    addNotification(date, state);
});
// 
// 
// 
function sendNotification(data) {
    globSocket.emit('newNotif', data);
}

function sendMsg(msg) {
    __SOCKET.emit('msgSent', msg);
}
// 
// 
function addNotification(date, state) {
    let cont = document.createElement('div');
    let contClass = 'notification';
    if (state != true)
        contClass += ' notif-inactive';
    cont.setAttribute('class', contClass);
    // 
    let iconbox = document.createElement('div');
    let icon = document.createElement('img');
    iconbox.setAttribute('class', 'iconBox');
    icon.setAttribute('src', '../icon/Calendar3.svg');
    iconbox.appendChild(icon);
    // 
    let txtCont = document.createElement('div');
    txtCont.setAttribute('class', 'notifText');
    let txtTitle = document.createElement('span');
    txtTitle.setAttribute('class', 'notifTitle');
    txtTitle.innerText = "Votre demande à été accepte";
    let txtDesc = document.createElement('span');
    txtDesc.setAttribute('class', 'notifiDesc');
    txtDesc.innerText = "Une réunion était prévue pour le ";
    let txtDescDate = document.createElement('span');
    txtDescDate.setAttribute('class', 'notifDate');
    date = date.split(" ");
    txtDescDate.innerText = `${date[0]} à ${date[1]}`;
    // 
    txtDesc.appendChild(txtDescDate);
    // 
    txtCont.appendChild(txtTitle);
    txtCont.appendChild(txtDesc);
    // 
    cont.appendChild(iconbox);
    cont.appendChild(txtCont);
    // 
    cont.addEventListener('click', () => {
        window.location.href = "/patient/contact";
    });
    // 
    document.getElementById('notifBoxBody').appendChild(cont);
    // 
    document.getElementById('btnNotif').setAttribute('class', 'notifActive');
}