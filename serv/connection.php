<?php
    include_once("data_base_start.php");

    $mysql = new mysqli("localhost","root","","archivos"); 
    
    if ($mysql->connect_error){
        die('Problemas con la conexion a la base de datos');
    } else{
        $qry1 = $mysql->query("CREATE TABLE IF NOT EXISTS clientes(
            id INT UNSIGNED ZEROFILL AUTO_INCREMENT,
            nombre VARCHAR(50) NOT NULL,
            apellido VARCHAR(50) NOT NULL,
            fecha DATE NOT NULL,
            PRIMARY KEY(id)
        )") or die($mysql->error);
    }

    if (!$mysql->set_charset("utf8")) {
        $result['characterset'] = "Error loading character set utf8: ".$mysql->error;
    } else {
        $result['characterset'] = $mysql->character_set_name();
    }

?>
