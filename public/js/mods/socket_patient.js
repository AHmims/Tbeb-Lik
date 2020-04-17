const globSocket = io();
const __SOCKET = io('/chat');
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
globSocket.on('notifAccepted', data => {
    sessionStorage.setItem('smtg', JSON.stringify(data));
    window.location.href = "/patient/contact";
});
// 
function sendNotification(data) {
    globSocket.emit('newNotif', data);
}

function sendMsg(msg) {
    __SOCKET.emit('msgSent', msg);
}