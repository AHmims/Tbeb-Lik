window.onload = () => {
    if (dgid('navBar')) {
        var navBar = dgid('navBar');
        navBar.appendChild(makeLogo());
        navBar.appendChild(makeNavigation(navBar.classList[0]));
        navBar.appendChild(makeExit());
    }
    if (dgclass('btn-doc').length > 0) {
        var btns = dgclass('btn-doc');
        for (let i = 0; i < btns.length; i++) {
            var str = btns[i].innerText;
            btns[i].innerHTML = "";
            // 
            btns[i].innerHTML = `<img src="../icon/doc.svg"/> ${str}`;
        }
    }
    if (dgclass('btn-acc').length > 0) {
        var btns = dgclass('btn-acc');
        for (let i = 0; i < btns.length; i++) {
            var str = btns[i].innerText;
            btns[i].innerHTML = "";
            // 
            btns[i].innerHTML = `<img src="../icon/check.svg"/> ${str}`;
        }
    }
    if (dgclass('btn-no').length > 0) {
        var btns = dgclass('btn-no');
        for (let i = 0; i < btns.length; i++) {
            var str = btns[i].innerText;
            btns[i].innerHTML = "";
            // 
            btns[i].innerHTML = `<img src="../icon/cross.svg"/> ${str}`;
        }
    }
    if (dgclass('btn-download').length > 0) {
        var btns = dgclass('btn-download');
        for (let i = 0; i < btns.length; i++) {
            var str = btns[i].innerText;
            btns[i].innerHTML = "";
            // 
            btns[i].innerHTML = `${str} <img src="../icon/download.svg"/>`;
        }
    }
    if (dgclass('btn-send').length > 0) {
        var btns = dgclass('btn-send');
        for (let i = 0; i < btns.length; i++) {
            var str = btns[i].innerText;
            btns[i].innerHTML = "";
            // 
            btns[i].innerHTML = `${str} <img src="../icon/send1.svg"/>`;
        }
    }
}
// 
function dgid(id) {
    return document.getElementById(id);
}
// 
function dgclass(value) {
    return document.getElementsByClassName(value);
}
// 
function makeLogo() {
    var link = document.createElement('a');
    link.setAttribute('href', '#');
    var logo = document.createElement('img');
    logo.setAttribute('src', '../img/logo.svg');
    // 
    link.appendChild(logo);
    return link;
}
// 
function makeExit() {
    var link = document.createElement('a');
    link.setAttribute('href', '#');
    var icon = document.createElement('img');
    icon.setAttribute('src', '../icon/exit.svg');
    // 
    link.appendChild(icon);
    return link;
}
// 
function makeNavigation(mode) {
    var icons = [];
    var container = document.createElement('div');
    container.setAttribute('class', 'navCont');
    switch (mode) {
        case 'medecin':
            icons = ["bell", "note", "chat"];
            break;
        case 'patient':
            icons = ["bell", "chat"];
            break;
        case 'pharmacie':
            icons = ["note", "calendar", "chat"];
            break;
        case 'admin':
            icons = ["medecin", "pharmacie"];
            break;
    }
    // 
    for (var i = 0; i < icons.length; i++) {
        var link = document.createElement('a');
        link.setAttribute('href', '#');
        var box = document.createElement('div');
        box.setAttribute('class', "navIconBox");
        var icon = document.createElement('img');
        icon.setAttribute('src', `../icon/${icons[i]}.svg`);
        // 
        box.appendChild(icon);
        link.appendChild(box)
        container.appendChild(link);
    }

    return container;
}
// 