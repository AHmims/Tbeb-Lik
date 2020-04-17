document.getElementById('btnAdd').addEventListener('click', () => {
    // console.log('click');
    sendMsg(document.getElementById('write').value);
    // 
    let msg = {
        date: new Date(Date.now()),
        content: document.getElementById('write').value,
        type: 'Text',
        room: {
            id: null,
            sender: null,
            receiver: null
        }
    }
    createMsgBox(msg, 'msgUser');
});
// 
function displayReceivedMsg(msg) {
    createMsgBox(msg, '');
}
// 
function createMsgBox(msg, type) {
    var msgBox = document.createElement('p');
    msgBox.setAttribute('class', type);
    msgBox.innerText = msg.content;
    // 
    document.getElementsByClassName('msgs')[0].appendChild(msgBox);
}