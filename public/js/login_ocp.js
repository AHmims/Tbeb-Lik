document.getElementById('btnLogin').addEventListener('click', () => {
    const inputs = document.getElementsByClassName('loginData');
    // 
    sessionStorage.setItem('patient_M', inputs[0].value);
    // sessionStorage.setItem('patient_P', inputs[1].value);
    // 
    window.location.href = "/p";
});