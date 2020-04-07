var state = false,
    styles = ["fit-content", '0'];
document.getElementById('formDropDownSelected').addEventListener('click', () => {
    document.getElementById('formDropDownExtension').style.height = styles[+state];
    state = !state;
});