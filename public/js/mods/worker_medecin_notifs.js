document.getElementsByClassName('navIconBox')[0].parentElement.setAttribute('href', '/medecin/notifications');
document.getElementsByClassName('navIconBox')[1].parentElement.setAttribute('href', '/medecin/contact');
document.getElementsByClassName('navIconBox')[0].setAttribute('class', 'navIconBox notifSelected');
// 
// 
function notifMiddleMan(data) {
    data.forEach(element => {
        // var bluePrint = {
        //     name: element.data.name,
        //     date: "[Date]",
        //     matricule: element.data.matricule,
        //     age: "[Age]",
        //     numeroTel: "[Numero Tel]",
        //     motif: "[Motif]",
        //     atcds: "[ATCDs]",
        //     nbJourApporte: "[Nb]",
        //     files: ["fichier.ext"]
        // }
        // // 
        creationCardConsultation(element, element.index);
    });
}
// 
$.post('/getNotifications', {}, (response) => {
    notifMiddleMan(JSON.parse(response));
});