<?php 
//requirement
require_once '../Database/database.php';
require '../include/function.php';
//variable
$Matricule = $password = "" ;
$status2 = false;
//insertion
 if(!empty($_POST)){
     $Matricule = checkInput($_POST['Mtrcl']);
     $password = $_POST["pwd"];
     $db = Database::connect();
$statement = $db->prepare("select MATRICULE_PAT,PASSWORD from patient where MATRICULE_PAT = ?");
$statement->execute(array($Matricule));
$item = $statement->fetch();
if($item["MATRICULE_PAT"] == $Matricule && $item["PASSWORD"] == $password){
    $status2 = true;
}
else{
  
    $status2 = false;
}

if($status2){
     session_start();
     $_SESSION["Matricule"] = $Matricule;
     $_SESSION["password"] = $password;
     header("location:../app/patient/ocp_patient.php");
}else{
    echo $item["MATRICULE_PAT"];
    header("location:../app/Login/Login_patient.php?status =" . $status2);
}
   
Database::disconnect();
 }else{
    header("location:../index.php"); 
}
 ?>