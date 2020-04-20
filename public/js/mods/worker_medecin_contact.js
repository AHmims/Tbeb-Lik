document.getElementsByClassName('navIconBox')[0].parentElement.setAttribute('href', '/medecin/notifications');
document.getElementsByClassName('navIconBox')[1].parentElement.setAttribute('href', '/medecin/contact');
document.getElementsByClassName('navIconBox')[1].setAttribute('class', 'navIconBox notifSelected');
// 
document.getElementById('msgSend').addEventListener('click', () => {
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
    createMsgBox(msg, 'sentMessage')
});
// 
document.getElementById('msgVideo').addEventListener('click', () => {
    document.getElementById('chatSection').style.display = "none";
    document.getElementById('videoSection').style.display = "block";
});
// 
document.getElementById('videoControl-btnEnd').addEventListener('click', () => {
    document.getElementById('chatSection').style.display = "flex";
    document.getElementById('videoSection').style.display = "none";
});
// 
document.getElementById('patientSubmit').addEventListener('click', () => {
    document.getElementsByClassName('submitPopupBg')[0].style.display = "flex";
});
document.getElementById('popup-btnSubmit').addEventListener('click', () => {
    document.getElementsByClassName('submitPopupBg')[0].style.display = "none";
});
// 
document.getElementsByClassName('submitPopupBg')[0].addEventListener('click', (e) => {
    if (e.target == document.getElementsByClassName('submitPopupBg')[0])
        document.getElementsByClassName('submitPopupBg')[0].style.display = "none";
});
// 
// 
function displayReceivedMsg(msg) {
    console.log(msg);
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
    document.getElementsByClassName('innerTable')[0].appendChild(container);
}