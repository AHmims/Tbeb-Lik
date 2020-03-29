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
    if (dgclass('box-notif').length > 0) {
        var boxes = dgclass('box-notif');
        for (let i = 0; i < boxes.length; i++) {
            var icon = document.createElement('img');
            icon.setAttribute('class', 'box-notif-switch');
            icon.setAttribute('src', '../icon/switch.svg');
            // 
            icon.addEventListener('click', () => {
                var icons = dgclass('box-notif-switch');
                var extension = dgclass('box-notif-ext');
                var state = extension[i].style.display;
                // 
                if (state == "flex")
                    icons[i].classList.remove("trans-flip");
                else
                    icons[i].classList.add("trans-flip");
                // 
                extension[i].style.display = state == "flex" ? "none" : "flex";
            });
            // 
            boxes[i].appendChild(icon);
        }
    }
    if (dgclass('box-rndv-date').length > 0) {
        var txt = dgclass('box-rndv-date');
        for (let i = 0; i < txt.length; i++) {
            var string = txt[i].innerText;
            txt[i].innerHTML = `<img src="../icon/calendar2.svg" class="box-rndv-date-icon"> <span>${string}</span>`;
        }
    }
    if (dgclass('box-rndv-note').length > 0) {
        var txt = dgclass('box-rndv-note');
        for (let i = 0; i < txt.length; i++) {
            var string = txt[i].innerText;
            txt[i].innerHTML = `<img src="../icon/pen.svg" class="box-rndv-note-icon"> <span>${string}</span>`;
        }
    }
    if (dgclass('patientRow').length > 0) {
        var rows = dgclass('patientRow');
        for (let i = 0; i < rows.length; i++) {
            var icon = document.createElement('img');
            icon.setAttribute('src', '../icon/dots.svg');
            icon.setAttribute('class', 'align-right');
            rows[i].appendChild(icon);
            // 
            rows[i].addEventListener('click', () => {
                for (let j = 0; j < rows.length; j++) {
                    if (i != j)
                        rows[j].setAttribute('class', 'patientRow');
                    else
                        rows[j].setAttribute('class', 'patientRow patientRow-active');
                }
            });
            // 
        }
    }
    if (dgclass('patientInfos-ordo-info').length > 0) {
        var cont = dgclass('patientInfos-ordo-info');
        for (let i = 0; i < cont.length; i++) {
            var icon = document.createElement('img');
            icon.setAttribute('class', 'patientInfos-ordo-info-icon');
            icon.setAttribute('src', '../icon/hint.svg');
            // 
            cont[i].appendChild(icon);
        }
    }
    if (dgclass('bottomTable').length > 0) {
        var bottom = dgclass('bottomTable');
        for (var i = 0; i < bottom.length; i++) {
            var input = document.createElement('input');
            var iconSend = document.createElement('img');
            // 
            input.setAttribute('type', "text");
            input.setAttribute('class', 'bottomTable-msgInput');
            input.setAttribute('id', bottom[i].getAttribute('data-idInput'));
            input.setAttribute('placeholder', "Votre message text...");
            iconSend.setAttribute('src', '../icon/send2.svg');
            iconSend.setAttribute('class', 'bottomTable-msgSend');
            iconSend.setAttribute('id', bottom[i].getAttribute('data-idSend'));
            // 
            bottom[i].appendChild(input);
            bottom[i].appendChild(iconSend);
        }
    }
    // 
    // 
    flatpickr('.box-rndv-date-input', {
        "disable": [
            (date) => {
                return (date.getDay() === 0 || date.getDay() === 6);
            }
        ],
        "locale": {
            "firstDayOfWeek": 1
        }
    });
    // 
    // console.log('%c ', 'font-size:400px; background:url(https://pics.me.me/codeit-google-until-youfinda-stackoverflow-answerwith-code-to-copy-paste-34126823.png) no-repeat;');
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