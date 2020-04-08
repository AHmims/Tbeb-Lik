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
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/login_OCP.css">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <title>PlayGround</title>
</head>

<body>
    <div id="content">
        <a href="../../index.php">
        <img src="../img/Logo_vertical.svg" alt="logo">
</a>

<?php if($status): ?>
    <div class="alert alert-danger">
    <p>Vous n'avez pas rempli le formulaire correctement MATRICULE ou Nom deja existe</p>
    </div>
    <?php endif;?>

        <form id="form" method="POST" action="../../Connexion/Login.php" >
            <h1>Identification</h1>
            <div class="inputCont">
                <span>Matricule :</span>
                <input type="text" name="Mtrcl">
            </div>
            <div class="inputCont">
                <span>Mot de passe :</span>
                <input type="password" name="pwd">
            </div>
            <!-- <input id="btnLogin" type="submit">Login</button> -->
            <input type="submit" id="btnLogin" value="Login">
</form>
    </div>
    <!-- <script src="../js/login_ocp.js"></script> -->
</body>

</html>