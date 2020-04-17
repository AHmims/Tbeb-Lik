// 
document.getElementById('btnEnvoyer').addEventListener('click', () => {
    sendNotification({
        name: Math.random().toString()
    })
});