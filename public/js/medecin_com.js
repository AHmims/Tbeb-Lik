const __SOCKET = io('/chat');
__SOCKET.on('connect', () => {
    __SOCKET.emit('setMedecin', 'TbebLik');
});
// 
document.getElementById('btn-send').addEventListener('click', () => {

});
//  
document.getElementById('btn-join').addEventListener('click', () => {});
// 
__SOCKET.on('p_liste', data => {
    console.log(data);
});