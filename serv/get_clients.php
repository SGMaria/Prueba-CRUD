<?php
    include("connection.php");

    $qry1 = $mysql->query("SELECT * FROM clientes") or die($mysql->error);

    while($reg = $qry1->fetch_array(MYSQLI_ASSOC)){
        $result['clients'][] = $reg;
    }

    $mysql->close();

    echo json_encode($result);
?>