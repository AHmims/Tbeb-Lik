<?php session_start();
   
    ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/patient_1_OCP.css">
    <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
    <title>Formulaire</title>
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
                    <a href="#" id="logout">
                        <img src="../icon/logout.svg" alt="">
                        Se déconnecter
                    </a>
                </div>
            </div>
        </header>
        

        <section class="formulaire">
            <div style="margin-top:200px;">
                <h2 style="color:#02A2AF; font-family: Gilroy;font-size:30px;text-align:center">  Veuillez remplir ce formulaire pour votre 
                <br> <?php echo $_POST['name_selectedOption']; ?> </h2>
                <img src="../img/doctor1.svg" alt="back">
            </div>
            <form id="form_patient" method="post">
 
                <h2> Informations personnelles : </h2>
                <div> 
                    <div><label for="nom"> Nom  : </label> 
                    <input type="text" name="nom" id="nom" disabled value="<?php echo $_SESSION["NOM_PAT"] ?>"></div>
                    <div><label for="prenom"> Prénom : </label> 
                    <input type="text" name="prenom" id="prenom" disabled value="<?php echo $_SESSION["Prenom_PAT"] ?>"></div>
                </div>
                <div>
                    <label for="matricule"> Matricule : </label> 
<<<<<<< HEAD
                    <input type="text" name="matricule" id="matricule" value="<?php echo  $_SESSION['matricule']  ?>" disabled>
=======
                    <input type="text" name="matricule" id="matricule" value="<?php echo  $_SESSION["Matricule"]  ?>" disabled>
>>>>>>> 7bc27770bd1b2f69797a3ddd3d9d0e6cbfe2fd51
                </div>
                <div>
                    <label for="date_naiss"> Date de naissance : </label> 
                    <input type="text" id="date_naiss"  value="<?php echo $_SESSION["D_Nais"]?>"  disabled>
                </div>
                <div>
                    <label for="numero"> Numéro de téléphone : </label> 
<<<<<<< HEAD
                    <input type="number" name="tel" id="numero" >
=======
                    <input type="number" name="tel" id="numero">
>>>>>>> 7bc27770bd1b2f69797a3ddd3d9d0e6cbfe2fd51
                </div>
                <h2> Détails de maladie : </h2>
                <div> 
                    <label for="motif"> Motif : </label> 
                    <textarea name="motif" id="motif"></textarea>
                </div>
                <div> 
                    <label for="ATCDS"> ATCDs : </label> 
                    <textarea name="ATCDS" id="ATCDS"></textarea>
                </div>
                <div> 
                    <label for="nombre_jrs"> Nombre de jours du RM : </label> 
                    <input type="number" name="nombre_jrs"  id="nombre_jrs">
                </div>
                <div> 
                    <label for="ordonnance"> Ordonnance : </label> 
                    <input type="file" name="ordonnance" accept="application/pdf" id="ordonnance">
                </div>
                <div> 
                    <label for="certif"> Certification médicale : </label> 
                    <input type="file" name="certif" accept="application/pdf" id="certif">
                </div>
                <div><button type="submit" name="envoi" id="btnEnvoyer"> Envoyer </button></div>
              

            </form>
            </section>

            <?php   
                if(isset($_POST['envoi'])){

                    extract($_POST);

                    if(!empty($motif) && !empty($ATCDS) && !empty($nombre_jrs) )
                    {
                        include '../Login/connexiondb.php';
                        global $db;

                        $q = $db->prepare("INSERT INTO consultation (MATRICULE_PAT,JOUR_REPOS_R,MOTIF,ATC) VALUES
                         (:matricule,:jours,:motif,:atc)");

                        $q->execute([
                                'matricule' =>  $_SESSION['matricule'],
                                'jours' => $nombre_jrs,
                                'motif' => $motif,
                                'atc' => $ATCDS
                        ]);
                    }
                    else{
                    ?>
                    <p style="text-align:center; color:red; font-size:20px;"> 
                    <?php
                        echo "Veuillez remplir tous les champs";
                    ?> </p> 
                    <?php
                    }
                }
            ?>


        

        <!-- <footer>
            <div class="footer-bottom-text ">
                <div>Powered By YouCode-Safi.</div>
                <span>Copyright © 2020. All rights reserved.</span>
            </div>
        </footer> -->
        <footer>
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
</body>

</html>