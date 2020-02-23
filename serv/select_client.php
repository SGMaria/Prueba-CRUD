<?php
    include("connection.php");

    $data = $_REQUEST['q'];

    $qry1 = $mysql->query("SELECT nombre, apellido, fecha FROM clientes WHERE id = '$data'") or die($mysql->error);

    if ($client = $qry1->fetch_array(MYSQLI_ASSOC)){
        $result['client']['name'] = $client['nombre'];
        $result['client']['last_name'] = $client['apellido'];
        $result['client']['date'] = $client['fecha'];
    } else {
        $result['client'][] = "Error";
    }   

    $mysql->close();

    echo json_encode($result);
?>