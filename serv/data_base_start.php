<?php
    $mysql = new mysqli("localhost","root","","phpmyadmin"); 
   
    if ($mysql->connect_error){
        die('Problemas con la conexion a la base de datos');
    } else{
        $qry1 = $mysql->query("CREATE DATABASE IF NOT EXISTS archivos CHARACTER SET utf8 COLLATE utf8_general_ci") or die($mysql->error);
    }
 
    $mysql->close();
?>