 
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/styles_OCP.css">
    <script src="../js/styles_OCP.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css" />
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">

    <script src="https://cdn.jsdelivr.net/npm/flatpickr"></script>
    <title>PlayGround</title>
</head>

<body id="body">
    <div class="medecin" id="navBar">
    </div>
    <div id="content">
    <form action="<?php echo $_SERVER['PHP_SELF']?>" method="POST">
        <div id="header">
           <div  class="header_left">
            <span class="title">Historique des patients</span>
           </div>
           <div class="header_right">
               <div class="header_right_componant">
              
                  
                
                
                <div class="small-inputs">
                    <button name="BTN_SORT_AGE" id="id_ageFilter"><i class="fas fa-sort-amount-down"></i> Age</button>
                  </div>
                   
                <div class="small-inputs">
                    <button name="BTN_SORT_MATRICULE"><i class="fas fa-sort-amount-down"></i> Matricule</button>
                  </div>
                 
                  <div class="small-inputs">
                    <button id="BTN_SEXEH" name="SELECT_HOMME"><i class="fas fa-mars"></i> </button>
                  </div>
                  <div class="small-inputs">
                    <button id="BTN_SEXEF" name="SELECT_FEMME"> <i class="fas fa-venus"></i>  </button>
                  </div>
                 
                  
                  <div class="small-inputs">
                    <input type="date" placeholder="Date de consulation" name="SELECTED_DATE" class="box-rndv-date-input"><button name="SELECT_DATE" ><i class="fas fa-caret-down"></i></button>
                  </div>
                
                  <div class="small-inputs">
                    <button name="BTN_SEARCH"><i class="fas fa-search"></i></button><input type="text" name="inputSearch" id="">
                  </div>
               
               </div>
               
        

           </div>
        </div>
        </form>
        <div id="container" class="f-direction-row">
            <div class="fitBox">
               
                <?php
                 
                 
                 
             
                
                
               
               
                $req = 'SELECT DISTINCT patients.MATRICULE_PAT as MATRICULE_PAT , TIMESTAMPDIFF(year,Date_Naissence, now() ) as AGE, NOM_PAT,Prenom_PAT, TEL ,Date_Naissence ,ADRESS ,Genre,DATE_CONSULTATION FROM patients , consultation where patients.MATRICULE_PAT=consultation.MATRICULE_PAT
                ORDER BY `patients`.`MATRICULE_PAT`  ASC LIMIT 0, 10';

                if(isset($_POST['BTN_SORT_AGE']))
                {
                    $req = 'SELECT DISTINCT patients.MATRICULE_PAT as MATRICULE_PAT , TIMESTAMPDIFF(year,Date_Naissence, now() ) as AGE, NOM_PAT,Prenom_PAT, TEL ,Date_Naissence ,ADRESS ,Genre,DATE_CONSULTATION FROM patients , consultation where patients.MATRICULE_PAT=consultation.MATRICULE_PAT
                     ORDER BY AGE DESC LIMIT 0, 10';
                }
                else if(isset($_POST['BTN_SORT_MATRICULE']))
                {
                     
                    $req = 'SELECT DISTINCT patients.MATRICULE_PAT as MATRICULE_PAT , TIMESTAMPDIFF(year,Date_Naissence, now() ) as AGE, NOM_PAT,Prenom_PAT, TEL ,Date_Naissence ,ADRESS ,Genre,DATE_CONSULTATION FROM patients , consultation where patients.MATRICULE_PAT=consultation.MATRICULE_PAT
                ORDER BY `patients`.`MATRICULE_PAT`  DESC LIMIT 0, 10';
                }
               else if(isset($_POST['BTN_SEARCH']))
                {
                      
                    $req = 'SELECT DISTINCT patients.MATRICULE_PAT as MATRICULE_PAT , TIMESTAMPDIFF(year,Date_Naissence, now() ) as AGE, NOM_PAT,Prenom_PAT, TEL ,Date_Naissence ,ADRESS ,Genre,DATE_CONSULTATION FROM patients , consultation where patients.MATRICULE_PAT=consultation.MATRICULE_PAT  and NOM_PAT LIKE "%'.$_POST['inputSearch'].'%" or Prenom_PAT LIKE "%'.$_POST['inputSearch'].'%" or patients.MATRICULE_PAT LIKE "%'.$_POST['inputSearch'].'%" LIMIT 1 ';
                }

                else if(isset($_POST['SELECT_HOMME']))
                {
 
                       
                     

                    $req = 'SELECT DISTINCT patients.MATRICULE_PAT as MATRICULE_PAT , TIMESTAMPDIFF(year,Date_Naissence, now() ) as AGE, NOM_PAT,Prenom_PAT, TEL ,Date_Naissence ,ADRESS ,Genre,DATE_CONSULTATION FROM patients , consultation where patients.MATRICULE_PAT=consultation.MATRICULE_PAT and Genre="Homme" ';
                    
                }
                else if(isset($_POST['SELECT_FEMME']))
                {
 
                    $req = 'SELECT DISTINCT patients.MATRICULE_PAT as MATRICULE_PAT , TIMESTAMPDIFF(year,Date_Naissence, now() ) as AGE, NOM_PAT,Prenom_PAT, TEL ,Date_Naissence ,ADRESS ,Genre,DATE_CONSULTATION FROM patients , consultation where patients.MATRICULE_PAT=consultation.MATRICULE_PAT  and Genre="Femme" ';
       
                    
                }
                else if(isset($_POST['SELECT_DATE']))
                {
                      
                    $req = 'SELECT DISTINCT patients.MATRICULE_PAT as MATRICULE_PAT , TIMESTAMPDIFF(year,Date_Naissence, now() ) as AGE, NOM_PAT,Prenom_PAT, TEL ,Date_Naissence ,ADRESS ,Genre,DATE_CONSULTATION FROM patients , consultation where patients.MATRICULE_PAT=consultation.MATRICULE_PAT  and DATE_CONSULTATION LIKE "%'.$_POST['SELECTED_DATE'].'%"  ';
                }

              
                
                // Connexion à la base de données
                try
                {
                    $bdd = new PDO('mysql:host=localhost;dbname=bd_telemedecinev1;charset=utf8', 'root', '');
                }
                catch(Exception $e)
                {
                        die('Erreur : '.$e->getMessage());
                }

              
                $reponse = $bdd->query($req);

                // Affichage de chaque message (toutes les données sont protégées par htmlspecialchars)
                while ($donnees = $reponse->fetch())
                {
                    
               
                echo '<div class="patientRow">
                <div class="vertical">
                    <span class="font-w-m font-s-18 txt-c-D">'.htmlspecialchars($donnees['NOM_PAT'].' '.$donnees['Prenom_PAT']).'</span>
                    <span class="font-w-n font-s-14 txt-c-D">'.htmlspecialchars($donnees['Genre']).'</span>
                </div>
                <div class="vertical">
                    <span class="font-w-m font-s-18 txt-c-D">Date Consultation</span>
                    <span class="font-w-n font-s-14 txt-c-SD">'.htmlspecialchars($donnees['DATE_CONSULTATION']).'</span>
                </div>
                <div class="vertical">
                    <span class="font-w-m font-s-18 txt-c-D">Matricule</span>
                    <span class="font-w-n font-s-14 txt-c-SD">'.htmlspecialchars($donnees['MATRICULE_PAT']).'</span>
                </div>
                <div class="vertical">
                    <span class="font-w-m font-s-18 txt-c-D">Age</span>
                    <span class="font-w-n font-s-14 txt-c-SD">'.htmlspecialchars($donnees['AGE']).'</span>
                </div>
                <div class="vertical">
                    <span class="font-w-m font-s-18 txt-c-D">Adresse</span>
                    <span class="font-w-n font-s-14 txt-c-SD">'.htmlspecialchars($donnees['ADRESS']).'</span>
                </div>
                <div class="vertical">
                    <span class="font-w-m font-s-18 txt-c-D">Numéro de téléphone</span>
                    <span class="font-w-n font-s-14 txt-c-SD">'.htmlspecialchars($donnees['TEL']).'</span>
                </div>
            </div>';
        }

                $reponse->closeCursor();

               ?>

                
                <!--Premier patient-->
                
               

                 <!--deuxieme patient-->
                 <!-- <div class="patientRow">
                    <div class="vertical">
                        <span class="font-w-m font-s-18 txt-c-D">Nom Patient</span>
                        <span class="font-w-n font-s-14 txt-c-D">Sexe</span>
                    </div>
                    <div class="vertical">
                        <span class="font-w-m font-s-18 txt-c-D">Date Consultation</span>
                        <span class="font-w-n font-s-14 txt-c-SD">15/03/2020</span>
                    </div>
                    <div class="vertical">
                        <span class="font-w-m font-s-18 txt-c-D">Matricule</span>
                        <span class="font-w-n font-s-14 txt-c-SD">matricule</span>
                    </div>
                    <div class="vertical">
                        <span class="font-w-m font-s-18 txt-c-D">Age</span>
                        <span class="font-w-n font-s-14 txt-c-SD">age</span>
                    </div>
                    <div class="vertical">
                        <span class="font-w-m font-s-18 txt-c-D">Adresse</span>
                        <span class="font-w-n font-s-14 txt-c-SD">adresse</span>
                    </div>
                    <div class="vertical">
                        <span class="font-w-m font-s-18 txt-c-D">Numéro de téléphone</span>
                        <span class="font-w-n font-s-14 txt-c-SD">0102030405</span>
                    </div>
                </div>
                  troisieme patient-->
                  <!-- <div class="patientRow">
                    <div class="vertical">
                        <span class="font-w-m font-s-18 txt-c-D">Nom Patient</span>
                        <span class="font-w-n font-s-14 txt-c-D">Sexe</span>
                    </div>
                    <div class="vertical">
                        <span class="font-w-m font-s-18 txt-c-D">Date Consultation</span>
                        <span class="font-w-n font-s-14 txt-c-SD">15/03/2020</span>
                    </div>
                    <div class="vertical">
                        <span class="font-w-m font-s-18 txt-c-D">Matricule</span>
                        <span class="font-w-n font-s-14 txt-c-SD">matricule</span>
                    </div>
                    <div class="vertical">
                        <span class="font-w-m font-s-18 txt-c-D">Age</span>
                        <span class="font-w-n font-s-14 txt-c-SD">age</span>
                    </div>
                    <div class="vertical">
                        <span class="font-w-m font-s-18 txt-c-D">Adresse</span>
                        <span class="font-w-n font-s-14 txt-c-SD">adresse</span>
                    </div>
                    <div class="vertical">
                        <span class="font-w-m font-s-18 txt-c-D">Numéro de téléphone</span>
                        <span class="font-w-n font-s-14 txt-c-SD">0102030405</span>
                    </div>
                </div>   -->
                
            </div>
            <div class="fitBox fitBox_Customized">
                <div class="vertical space-between-5px">
                    <span class="font-w-m font-s-10 txt-c-D"><i class="fas fa-folder "></i> Archive des documents</span>
                    <!--Date 1-->
                    <div class="C_date">
                        <span >15/03/2020</span>
                    </div>
                    <div class="row-collection">
                   
                        <button class="btn-download">image.jpg</button>
                        <button class="btn-download">doc.pdf</button>
                    </div>
                    <!--Date 2-->
                    <div class="C_date">
                        <span >15/03/2020</span>
                    </div>
                    
                    <div class="row-collection">
                   
                        <button class="btn-download">image.jpg</button>
                        <button class="btn-download">doc.pdf</button>
                    </div>
                    <!--Date 3-->
                    <div class="C_date">
                        <span >15/03/2020</span>
                    </div>
                    
                    <div class="row-collection">
                   
                        <button class="btn-download">image.jpg</button>
                        <button class="btn-download">doc.pdf</button>
                    </div>
                </div>

                </div>
            
            
</div>
<style>
    .box-notif
    {
        display: none!important;
    }
    .fitBox_Customized
    {
        margin-left: 2%;
        display: none;
    }
    .C_date span
    {
        color:#6B7D8E;
        font-weight: 500;
        font-family: "Gilroy";
        font-size: 12px;
        letter-spacing: 0.6px;

    }
    .header_right
    {
       right:0;
       position: absolute;
       margin-right: 1%;
         
    }
    .header_right_componant
    {
        display: flex;
        
    }
    .header_right_componant div
    {
       padding-left: 5px;
    }
   #id_select
   {
    -webkit-appearance: none;
    background-image: url(../icon/sort-down-solid.svg);
    background-repeat: no-repeat;
    background-position-x: right;
    background-position-y: -5px;
    height:30px;
     
    
   }
   .small-inputs button 
   {
       background-color:  #1FDBAE;
       color:white;
   }
   .small-inputs button:hover
   {
       background-color:  white;
       color:#1FDBAE;
   }
  
         
     
</style>
    <!--  -->
    <script src="../js/medecin_ops_OCP_1.js"></script>
     
</body>

</html>