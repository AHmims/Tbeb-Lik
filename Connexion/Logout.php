<?php 
session_start();
$_SESSION['matricule'] = null; 
header("Location:http://localhost/Tbeb-Lik/index.php");
?>