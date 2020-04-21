document.getElementById('msgSend').addEventListener('click', () => {
    // console.log('click');
    sendMsg(document.getElementById('msgInput').value);
    // 
    let msg = {
        date: new Date(Date.now()),
        content: document.getElementById('msgInput').value,
        type: 'Text',
        room: {
            id: null,
            sender: null,
            receiver: null
        }
    }
    createMsgBox(msg, 'sentMessage');
    // 
    document.getElementById('msgInput').value = "";
});
// 
function displayReceivedMsg(msg) {
    createMsgBox(msg, 'receivedMessage');
}
// 
function createMsgBox(msg, type) {
    var container = document.createElement('div');
    container.setAttribute('class', `messageContainer ${type}`);
    var txt = document.createElement('span');
    txt.innerText = msg.content;
    // 
    container.appendChild(txt);
    document.getElementsByClassName('chatSectionMessages')[0].appendChild(container);
}