const __SOCKET = io('/chat');
__SOCKET.on('connect', () => {
    __SOCKET.emit('setUser', [sessionStorage.getItem('id'), sessionStorage.getItem('type')]);
});
// 
document.getElementById('btn-send').addEventListener('click', () => {
    __SOCKET.emit('msgSent', {
        msg: document.getElementById('txt-field').value
    });
});
// 
__SOCKET.on('msgReceived', data => {
    document.getElementById('remote').innerText += data.msg + '\n';
});
// 
document.getElementById('btn-join').addEventListener('click', () => {
    __SOCKET.emit('joinRoom');
});