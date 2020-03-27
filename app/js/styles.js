window.onload = () => {
    if (dgid('navBar')) {
        var navBar = dgid('navBar');
        navBar.appendChild(makeLogo());
        navBar.appendChild(makeNavigation(navBar.classList[0]));
        navBar.appendChild(makeExit());
    }
}
// 
function dgid(id) {
    return document.getElementById(id);
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