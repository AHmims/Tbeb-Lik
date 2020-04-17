const globSocket = io();
const __SOCKET = io('/chat');
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