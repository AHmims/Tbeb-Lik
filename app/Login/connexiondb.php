<?php
try {
    $db = new PDO('mysql:dbname=bd_telemedecine;host=localhost', 'root');
    
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);
    } catch (PDOException $e) {
        echo "Erreur : " . $e->getMessage();
    }
?>