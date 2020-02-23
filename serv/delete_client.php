<?php
    include("connection.php");

    $data = $_REQUEST['q'];

    $qry1 = $mysql->query("DELETE FROM clientes WHERE id = '$data'") or die($mysql->error);

    $mysql->close();

    echo "El cliente ha sido eliminado satisfactoriamente.";
?>