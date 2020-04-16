const __SOCKET = io('/chat');
__SOCKET.on('connect', () => {
    __SOCKET.emit('setPatient', sessionStorage.getItem('patient_M'));
});
// 
document.getElementById('btn-send').addEventListener('click', () => {
    __SOCKET.emit('msgSent',
        document.getElementById('txt-field').value
    );
});
// 
__SOCKET.on('msgReceived', data => {
    console.log(data);
    document.getElementById('remote').innerText += data.msg + '\n';
});
// 
document.getElementById('btn-join').addEventListener('click', () => {
    __SOCKET.emit('joinRoom');
});
// 