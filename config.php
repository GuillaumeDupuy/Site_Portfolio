<?php
// Informations d'identification
define('DB_SERVER', 'localhost');
define('DB_USERNAME', 'u992063229_guillaumedupuy');
define('DB_PASSWORD', 'Justinou93_');
define('DB_NAME', 'u992063229_portfolio');
 
// Connexion à la base de données MySQL 
$conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
 
// Vérifier la connexion
if($conn === false){
    die("ERREUR : Impossible de se connecter. " . mysqli_connect_error());
}
?>