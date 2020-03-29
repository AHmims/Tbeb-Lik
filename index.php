<?php
$status = false;
if($_GET){
$status = true;
}
   
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title> Accueil </title>
    <link rel="stylesheet" href="app/css/Style.css">
    
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
</head>
<body>
    <header>
        <div class="part1">
            <div><img src="app/img/Logo.png" alt="logo"></div>
            <div> Tbeb-Lik </div>
        </div>
        <div class="part2">
            <a href=""> Comment ça marche? </a>
            <button class="btnIdentifier" onclick="Connexion()"> 
                <img src="app/img/Ident.png" alt="Identification">S'identifier
            </button>
        </div>
    </header>
    <div class="espace">
    </div>
    <div class="espace">
    </div>
    <section class="desc">
    <?php if($status): ?>
    <div class="alert alert-danger">
    <p>Vous n'avez pas rempli le formulaire correctement EMAIL ou Nom deja existe</p>
    </div>
    <?php endif;?>
        <div>
            <p class="p1"> La consultation <br> En tout temps <br> En tout lieu. </p>
            <p class="p2"> Tbeb-Lik est une plateforme de consultation en ligne qui assure la relation patient - médecin  sans avoir à se déplacer.</p>
            <input type="button" value="Consulter" class="btnConsulter">
        </div>
    </section>
    <div class="espace">
    </div>
    <div class="espace">
    </div>


    <form method="post" action="traitement.php" id="connexion" >
        <fieldset id="f2"> 
            <p><img src="app/img/login.png" alt="login" class="imageLog"> </p>
            <p> Bienvenue </p>
            <hr >
            <div>
                <input type="text" id="emailLog" placeholder="Email" autofocus required>
                <input type="password" id="mdpLog" placeholder="Mot de passe " required>
            </div>
            <input type="checkbox" class="show" onclick="myFunction()"> <span style="font-size: 14px">Montrer mot de passe</span> 
            <div class="BtnConnexion">
                <input type="submit" value="Connexion" >
            </div>
            <p class="lien"><a href=""> Mot de passe oublié? </a></p>
        </fieldset>
    </form>

    <script>
        var modal2 = document.getElementById("connexion");
        window.addEventListener("click", function(event) {
            if(event.target == modal2)
            {
                modal2.style.display="none";
            }
        });
        function Connexion(){   
            modal2.style.display="block";
        }
        function myFunction() {
            var x = document.getElementById("mdpLog");
            if (x.type === "password") {
                x.type = "text";
            } else {
                x.type = "password";
            }
        }
    </script>




    <form method="post" action="Connexion/Register.php" id="inscription" >
        <fieldset id="f1">
            <p> Inscrivez-vous </p>
            <hr >
            <div>
                <label for="nom"> Nom complet : </label>
                <input type="text" name="username" id="nomc"  >
            </div>
            <div>
                <label for="num"> Numéro de téléphone : </label>
                <input type="text" name="numtele" id="numc"  >
            </div>
            <div>
                <label for="email"> CIN : </label>
                <input type="text" name="cin" id="cin" autofocus><span id="6"  style="color:red;font-size: 13px;"></span>
            </div>
            <div>
                <label for="email"> Email : </label>
                <input type="text" name="email" id="email" autofocus><span id="6"  style="color:red;font-size: 13px;"></span>
            </div>
            <div>
                <label for="mdp"> Mot de passe : </label>
                <input type="password" name="pwd" id="mdp"><span id="7" style="color:red;font-size: 13px;"></span>
            </div>
            <div>
                <label for="cmdp"> Confirmation du mot de passe : </label>
                <input type="password" name="pwdc" id="cmdp"><span id="8" style="color:red;font-size: 13px;"></span>
            </div>
            <div class="BtnInscription">
                <input  value="Inscription" id="btn" onclick="ValiderInsc()" >
            </div>
            <div>
                <p> Déja inscris? <br/><a href="javascript:Connexion2()">Connectes-toi maintenant !</a></p>
            </div>
        </fieldset>
    </form>

    <script>
        function ValiderInsc(){
            // e.preventDefault();
            var modal = document.getElementById("inscription");
            var modal2 = document.getElementById("connexion");

            cpt2=0;
            var rgxEmail =/^[A-Za-z0-9-_.]+@[A-Za-z]{4,9}.[A-Za-z]{2,3}$/;
            var email=document.getElementById("email");
            var mdp=document.getElementById("mdp");
            var cmdp=document.getElementById("cmdp");

            if( email.value=="" ) document.getElementById('6').innerHTML= "Remplir l'email "; 
                else if(!rgxEmail.test(email.value)) document.getElementById('6').innerHTML = "Format incorrect";
                else {
                    document.getElementById('6').innerHTML=" ";
                    cpt2++;
                }
            if( mdp.value=="" ) document.getElementById('7').innerHTML= "Remplir le mdp";
                else {
                    document.getElementById('7').innerHTML=" ";
                    cpt2++;
                }
            if( cmdp.value=="" ) document.getElementById('8').innerHTML= "Remplir la confirmation";
                if(mdp.value != cmdp.value) document.getElementById('8').innerHTML="Confirmation incorrecte";   
                else {
                    document.getElementById('8').innerHTML=" ";
                    cpt2++;
                }
            if(cpt2==3){
                modal.style.display="none";
                document.getElementById('btn').setAttribute("type","submit");
                // modal2.style.display="block";
                
            }
        }
    </script>


    <section class="formulaire">
        <p> Votre consultation en un clic !</p>
        <div class="espace">
        </div>
        <form>
            <div class="ligne">
                <div> 
                    <div><label for="nom"> Nom complet : </label></div>
                    <div><input type="text" id="nom"><span id="1" style="color:red"></span></div>
                </div>
                <div> 
                    <div><label for="num"> Numéro de téléphone : </label></div>
                    <div><input type="tel"  id="num"><span id="2" style="color:red"></span></div>
                </div>
            </div>
            <div class="ligne">
                <div> 
                    <div><label for="objet"> Objet : </label></div>
                    <div><input type="text" id="objet"><span id="3" style="color:red"></span></div>
                </div>
                <div> 
                    <div><label for="categorie"> Catégorie : </label></div>
                    <div>
                        <select id="specialites">
                            <option value="" selected disabled hidden>Choisir spécialité</option>
                            <option value="spec1"> Spécialité1 </option>
                            <option value="spec2"> Spécialité2 </option>
                        </select><span id="4" style="color:red;"></span>
                    </div>
                </div>
            </div>
            <div class="ligne2">
                <div> 
                    <div><label for="message"> Message : </label></div>
                    <div><textarea id="message" required></textarea></div><span id="5" style="color:red;"></span>
                </div>
                <input type="button" value="Envoyer" class="btnEnvoyer" onclick="Valider()">
            </div>
        </form>
    </section>
    <script>  
         var modal = document.getElementById("inscription");
         var modal2 = document.getElementById("connexion");
         var nom2 = document.getElementById('nomc');
         var num2 = document.getElementById('numc');

        function Connexion2(){   
             modal.style.display="none";
             modal2.style.display="block"
        }

        function Valider(){
            cpt=0;
            var rgx=/^[0][5-7-6][0-9]{8}$/;
            var nom = document.getElementById('nom').value;
            var num = document.getElementById('num').value;
            var objet = document.getElementById('objet').value;
            var message = document.getElementById('message').value;
            var select = document.getElementById("specialites");
            var valeur = select.options[select.selectedIndex].value;
            if(nom=="")
                document.getElementById('1').innerText ="A remplir!";  
            else
            {
                 document.getElementById('1').innerText =" "; 
                 cpt++; 
            }
            if(num=="")
            {
                document.getElementById('2').innerText ="A remplir!";  
            }
            else if(!rgx.test(num)) document.getElementById('2').innerHTML="tel incorrect";
            else
            { 
                document.getElementById('2').innerText =""; 
                cpt++; 
            }
            if(objet=="")
                document.getElementById('3').innerText ="A remplir!";  
            else
            {
                 document.getElementById('3').innerText =""; cpt++; 
            }
            if(valeur=="")
            document.getElementById('4').innerText ="A remplir!";  
            else
            { 
                document.getElementById('4').innerText =""; cpt++; 
            }
            if(message=="")
            document.getElementById('5').innerText ="A remplir!";  
            else
            { 
                document.getElementById('5').innerText =""; cpt++; 
            }
            if(cpt==5)
            {
                modal.style.display = "block";
                nomc.value=nom;
                numc.value=num;
            }
        
            window.addEventListener("click", function(event) {
                    if(event.target == modal)
                    {
                        modal.style.display="none";
                    }
                });
            }
    </script>

    <div class="espace">
    </div>
</body>
</html>