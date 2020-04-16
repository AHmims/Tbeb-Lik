const __SOCKET = io('/chat');
const __HUB_SOCKET = io('/medecinHub');
//
__SOCKET.on('connect', () => {
    __SOCKET.emit('setMedecin', 'TbebLik');
});
// 
document.getElementById('btn-send').addEventListener('click', () => {
    __SOCKET.emit('msgSent', {
        msg: document.getElementById('txt-field').value
    });
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
__SOCKET.on('msgReceived', data => {
    console.log(data);
    document.getElementById('remote').innerText += data.msg + '\n';
});
// 
__HUB_SOCKET.on('newNotif', data => {
    console.log(data);
});