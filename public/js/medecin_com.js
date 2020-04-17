const __SOCKET = io('/chat');
const __HUB_SOCKET = io('/medecinHub');
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
    // document.getElementById('remote').innerText += msg.content + '\n';
});
// 
__HUB_SOCKET.on('getNotifs', data => {
    console.log(data);
    // 
    // 
    // __HUB_SOCKET.emit('requestValidated',)
});