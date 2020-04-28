<?php 
 require '../../Database/database.php';
 require '../../include/function.php';
 $status = true;
 $nombre_jrs = $motif = $ATCDS = $Tele = $filenamecertif = $filenameordennance = $nombrjourerror = $motiferror = $ATCDSerror = $Teleerror = $filenamecertiferror = $filenameordennanceerror = "";

session_start(); 
if($_SESSION['matricule'] == null){
   header("Location:http://localhost/Tbeb-Lik/app/html/ocp_login.php");
}else{
    if(isset($_POST["envoi"])){
    $nombre_jrs  = checkInput($_POST["nombre_jrs"]);
    $motif  = checkInput($_POST["motif"]);
    $ATCDS = checkInput($_POST["ATCDS"]);
    $Tele = checkInput($_POST["tel"]);
    $filenamecertif   =   $_FILES['certif']['name'];
    $filenameordennance = $_FILES['ordonnance']['name'];
        if(empty($nombre_jrs)){
            $nombrjourerror = "Ce champ ne peut pas être vide";
             $status = false;
        }
        if(empty($motif)){
            $motiferror = "Ce champ ne peut pas être vide";
            $status = false;
        }
        if(empty($ATCDS)){
            $ATCDSerror = "Ce champ ne peut pas être vide";
            $status = false;
        }
        if(empty($Tele)){
            $Teleerror = "Ce champ ne peut pas être vide";
            $status = false;
        }
        if(empty($filenamecertif)){
            $filenamecertiferror = "Ce champ ne peut pas être vide";
            $status = false;
        }
        if(empty($filenameordennance)){
            $filenameordennanceerror = "Ce champ ne peut pas être vide";
            $status = false;
        }
        $destination = 'uploads/'.$filenamecertif;
        $destination2 = 'uploads/'.$filenameordennance;
        $extension = pathinfo($filenamecertif, PATHINFO_EXTENSION);
        $extensionordannace = pathinfo($filenameordennance, PATHINFO_EXTENSION);
        $file = $_FILES['certif']['tmp_name'];
        $fileordannace = $_FILES['ordonnance']['tmp_name'];
        if(strlen($Tele)!=10){
            $Teleerror = "Ce champ est incorrect";
            $status = false;
        }
if (!in_array($extension,['pdf', 'docx'])){
    $status = false;
    $filenamecertiferror = "Erreur dans l'extension du fichier, elle doit être soit pdf ou docs";
}
if(!in_array($extensionordannace,['pdf', 'docx'])){
    $status = false;
    $filenameordennanceerror = "Erreur dans l'extension du fichier, elle doit être soit pdf ou docs";
}
if($status)
{
    try{
        move_uploaded_file($file,$destination); 
        move_uploaded_file($fileordannace,$destination2);
        $db = Database::connect();  
        $statement = $db->prepare("Insert into certification_medical (DOCUMENT,ID_Sender) values (?,?)");
        $statement->execute(array($filenamecertif,$_SESSION["Matricule"]));  
        $statement = $db->prepare("Insert into ordonnance (DOCUMENT,ID_Sender) values (?,?)");
        $statement->execute(array($filenameordennance,$_SESSION["Matricule"])); 
        $statement = $db->prepare("Update patients set Tel = ? where  MATRICULE_PAT = ?");
        $statement->execute([$Tele,$_SESSION["Matricule"]]);
        $statement = $db->prepare("select * from ordonnance where ID_Sender = ? Order by ID_ord desc LIMIT 1 ");
        $statement->execute(array($_SESSION["Matricule"]));
        $id_ord = $statement->fetch();
        $statement = $db->prepare("select * from certification_medical where ID_Sender = ? order by ID desc LIMIT 1  ");
        $statement->execute(array($_SESSION["Matricule"]));
        $id_certif = $statement->fetch();
        $statement = $db->prepare("Insert into consultation (MATRICULE_PAT,JOUR_REPOS,MOTIF,ATC,ID_PIECE,ID) values (?,?,?,?,?,?)");
        $statement->execute(array($_SESSION["Matricule"],$nombre_jrs,$motif,$ATCDS,$id_ord["ID_ord"],$id_certif["ID"]));  
        Database::disconnect();  
        // header("Location:http://localhost/Tbeb-Lik/app/html/ocp_medecin_page3.php");  
    }catch(Exception $e){
        die('Error loading file "'.$e->getMessage());
    }
         
}
}
}
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
                    <a href="../../Connexion/Logout.php" id="logout">
                        <img src="../icon/logout.svg" alt="">
                        Se déconnecter
                    </a>
                </div>
            </div>
        </header>
        <section class="formulaire">
            <div style="margin-top:200px;">
                    <h2 style="color:#02A2AF; font-family: Gilroy;font-size:30px;text-align:center">  Veuillez remplir ce formulaire pour votre 
                    <br> <?php echo $_POST['name_selectedOption']?> </h2>
                    <img src="../img/doctor1.svg" alt="back">
            </div>

            <form id="form_patient" enctype="multipart/form-data" method="post">
                <h2> Informations personnelles : </h2>
                <div> 
                    <div><label for="nom"> Nom  : </label> 
                    <input type="text" name="nom" id="nom" disabled value="<?php echo $_SESSION['nom'] ?>"></div>
                    <div><label for="prenom"> Prénom : </label> 
                    <input type="text" name="prenom" id="prenom" disabled value="<?php echo $_SESSION['prenom'] ?>"></div>
                </div>
                <div>
                    <label for="matricule"> Matricule : </label> 
                    <input type="text" name="matricule" id="matricule" value="<?php echo  $_SESSION['matricule']  ?>" disabled>
                </div>
                <div>
                    <label for="date_naiss"> Date de naissance : </label> 
                    <input type="text" id="date_naiss"  value="<?php echo  $_SESSION['daten']?>"  disabled>
                </div>
                <div>
                    <label for="numero"> Numéro de téléphone : </label> 
                    <input type="number" name="tel" id="numero">
                </div>
                <span class="help-inline" style="color:red"> 
                <?php echo $Teleerror; ?>
                </span>
                <h2> Détails de maladie : </h2>
                <div> 
                    <label for="motif"> Motif : </label> 
                    <textarea name="motif" id="motif"></textarea>
                </div>
                <span class="help-inline" style="color:red"> 
                <?php echo $motiferror; ?>
                </span>
                <div> 
                    <label for="ATCDS"> ATCDs : </label> 
                    <textarea name="ATCDS" id="ATCDS"></textarea>
                </div>
                <span class="help-inline" style="color:red"> 
                <?php echo $ATCDSerror; ?>
                </span>
                <div> 
                    <label for="nombre_jrs"> Nombre de jours du RM : </label> 
                    <input type="number" name="nombre_jrs"  id="nombre_jrs">
                </div>
                <span class="help-inline" style="color:red"> 
                <?php echo $nombrjourerror; ?>
                </span>
                <div> 
                    <label for="ordonnance"> Ordonnance : </label> 
                    <input type="file" name="ordonnance" accept="application/pdf" id="ordonnance">
                </div>
                <span class="help-inline" style="color:red"> 
                <?php echo $filenameordennanceerror; ?>
                </span>
                <div> 
                    <label for="certif"> Certification médicale : </label> 
                    <input type="file" name="certif" accept="application/pdf" id="certif">
                </div>
                <span class="help-inline" style="color:red"> 
                <?php echo $filenamecertiferror; ?>
                </span>
                <div><button type="submit" name="envoi" id="btnEnvoyer"> Envoyer </button></div>

            </form>
            </section>
        <?php require "../../include/footer.php"?>
    </div>
    <script src="../js/patient_1_OCP.js"></script>
</body>
</html>