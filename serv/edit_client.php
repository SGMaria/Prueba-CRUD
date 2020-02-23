<?php
    include("connection.php");

    $data = json_decode(stripslashes($_REQUEST['q']));

    $qry1 = $mysql->query("UPDATE clientes 
        SET nombre = '$data->name', apellido = '$data->last_name', fecha = '$data->date' WHERE id = '$data->id'") or die($mysql->error);

    $mysql->close();

    echo "El cliente ha sido modificado satisfactoriamente.";
?>