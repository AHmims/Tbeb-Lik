
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/patient_1_OCP.css">
    <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
    <title>PlayGround</title>
</head>

<body>
    <div id="content">
        <header id="navBar">
            <div id="navBarIn">
                <a href="#">
                    <img src="../icon/logo_full.svg" alt="logo" id="navBarLogo">
                </a>
                <div id="navBarNavText">
                    <a href="#" id="btnNotif" class="notifActive">
                        <img src="../icon/bellDark.svg" alt="">
                    </a>
                     <form action="/Tbeb-Lik/app/html/ocp_patient_formulaire.php" method="post"> 
                   <button id="btnLogin">
                        <div id="navMenuTextCont">
                            <span name="selectedOption" >
                                Repos maladie
                            </span>
                            <input type="hidden" name="name_selectedOption" id="hiddenInput">
                        </div>
                        <div id="navMenuIconCont">
                            <img src="../icon/menu.svg" alt="lockicon">
                        </div>
                    </button>
                   </form>
                    <a href="#" id="logout">
                        <img src="../icon/logout.svg" alt="">
                        Se déconnecter
                    </a>
                </div>
            </div>
        </header>
        <div id="main">
            <lottie-player src="../animation/lf30_editor_KzGjtg.json" background="transparent" speed="1" loop autoplay>
            </lottie-player>
            <!--  -->
            <div id="form">
                <h1>Veuillez choisir votre option : </h1>
                <div id="formDropDown">
                    <div id="formDropDownSelected" class="formDropDownItem">
                        <span>
                            Repos maladie
                        </span>
                        <svg fill="none" stroke="#004348" stroke-linecap="round" stroke-linejoin="round"
                            stroke-width="2" viewBox="0 0 24 24" class="w-8 h-8" width="30px">
                            <path d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </div>
                    <div id="formDropDownExtension">
                        <div class="formDropDownItem">
                            <span>
                                Repos maladie longue durée
                            </span>
                        </div>
                        <div class="formDropDownItem">
                            <span>
                                Repos accident de travail
                            </span>
                        </div>
                        <div class="formDropDownItem">
                            <span>
                                Consultation santé au travail
                            </span>
                        </div>
                        <div class="formDropDownItem">
                            <span>
                                Consultation médicale spontanée
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        
        <footer style="margin-top:250px;">
        <div class="part1">
            <div class="parags">
                <div class="parag1">
                    <h1> A propos de nous </h1>
                    <hr>
                    <p>
                        Equipe de 4 apprenants de YouCode-Safi.
                        <ul>
                            <li> Sanaa Saadoune </li>
                            <li> Mehdi Choukri </li>
                            <li> Zakaria Kamili</li>
                            <li> Ali Hmims </li>
                        </ul>
                    </p>
                </div>
                <div class="parag2">
                    <h1> Contactez-nous </h1>
                    <hr>
                    <div> <img src="../img/mail.png" alt="socialmedia" height="40px" width="40px"> Tbeb-Lik@gmail.com</div>
                    <div> <img src="../img/fb.png" alt="socialmedia"  height="40px" width="40px"> /Tbeb-Lik </div>
                    <div> <img src="../img/twitter.png" alt="socialmedia"  height="40px" width="40px"> @TbebLik </div>                    
                </div>
                <div class="parag3">
                    <h1> Comment ça marche? </h1>
                    <hr>
                    <p>
                        Tbeb-Lik est une plateforme de consultation en ligne qui assure la relation patient-médecin sans avoir à se déplacer.
                        <br><a href="" style="color:blue">Cliquez-ici</a> pour plus d'infos.
                    </p>
                </div>
            </div>
        </div>
        <div class="part2">
            <div>Powered By YouCode-Safi.</div>
            <span>Copyright © 2020. All rights reserved.</span>
        </div>
    </footer>


    </div>
    <script src="../js/patient_1_OCP.js"></script>
    <script>
        var input = document.getElementById('formDropDownExtension');
        var hiddenInput = document.getElementById('hiddenInput');
        input.addEventListener('click',()=>{
              hiddenInput.value=document.getElementsByName('selectedOption')[0].innerText;
         
        })
    </script>
</body>
 
</html>
