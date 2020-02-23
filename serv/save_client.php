<?php
    include("connection.php");

    $data = json_decode(stripslashes($_REQUEST['q']));

    $qry1 = $mysql->query("INSERT INTO clientes(nombre, apellido, fecha) 
        VALUES ('$data->name', '$data->last_name', '$data->date')") or die($mysql->error);

    $mysql->close();

    echo "El cliente ha sido agregado satisfactoriamente.";
?>