/*Start App*/
$(document).ready(function() {
    startDataBase();
    getAllClients();
});

function startDataBase(){ 
    $.ajax({
        async: true,
        type: "POST",
        url: "../serv/connection.php",
        success: function(){
            console.clear();
            console.log("Base de Datos Creada.");
        },
        timeout: 5000,
        beforeSend: function(){
            console.log("Cargando...");
        },
        error: function(){
            for($i = 0; $i <= 3; $i++){
                location.reload(true);
                if($i == 3){
                    window.location.href = "index.html";
                    console.log("Error.");
                }
            }
        }
      });
}

function getAllClients(){
    $.ajax({
        async: true,
        type: "POST",
        url: "../serv/get_clients.php",
        success: function(data){
            $a = JSON.parse(data);
            $("#table1").empty(); 
            $("#table1").append("<thead><tr class='text-center'><th>Nombre</th><th>Apellido</th><th>Fecha</th><th colspan='2'>Acciones</th></tr></thead><tbody></tbody>");
            if(Object.keys($a).length > 1){
                $a = $a.clients;
                for($i = 0; $i < Object.keys($a).length; $i++){
                    $("#table1").append("<tr class='text-center' value='" + $a[$i].id + "'><td scope='row'>" + $a[$i].nombre + "</td><td scope='row'>" + $a[$i].apellido + "</td><td scope='row'>" + $a[$i].fecha + "</td><td scope='row'><button type='button' class='btn btn-sm btn-primary' data-toggle='modal' data-target='#editModal' onclick='selectClient(this)'><i class='ion-edit'></i></button></td><td scope='row'><button type='button' class='btn btn-sm btn-danger' onclick='eraseClient(this)'><i class='ion-android-delete'></i></button></td></tr>");
                }
            } else{
               $("#table1").append("<tr class='text-center'><td scope='row' colspan='5'>Sin Resultados</td></tr>");
            }
        },
        timeout: 5000,
        error: function(){
            console.log("Error.");
        }
      });
}

/*Clear Inputs*/
$("#btnClean").on('click', function(){
    $("#inpName").val("");
    $("#inpLastName").val("");
    $("#inpDate").val("");
});

/*Save New Client*/
$("#btnSave").on('click', function(){
    getData();
});

function getData(){
    $a = checkName($("#inpName").val());
    $b = checkName($("#inpLastName").val());
    $c = checkDate($("#inpDate").val());
    if (($a == true)&&($b == true)&&($c == true)){
        $("#mainMsg").text("");
        $data = {
            "name": $("#inpName").val(),
            "last_name": $("#inpLastName").val(),
            "date": $("#inpDate").val()
        };
        $data = JSON.stringify($data);
        sentData($data);
    } else{
        $("#mainMsg").fadeIn(1000);
        $("#mainMsg").text("Ingrese los datos correctamente.");
        $("#mainMsg").fadeOut(4000);
    }
}

function sentData(data){
    $.ajax({
        async: true,
        type: "POST",
        url: "../serv/save_client.php",
        data: "q=" + $data,
        success: function(data){
            console.log(data); 
            getAllClients();           
        },
        timeout: 5000,
        error: function(){
            console.log("Error.");
        }
    });
}

/*Delete Client*/
function eraseClient(item){
    $a = item.parentNode.parentNode;
    $a = $a.getAttribute('value');
    $.ajax({
        async: true,
        type: "POST",
        url: "../serv/delete_client.php",
        data: "q=" + $a,
        success: function(data){
            console.log(data);
            getAllClients();
        },
        timeout: 5000,
        error: function(){
            console.log("Error.");
        }
    });
}

/*Show & Hide Table*/
$("#btnMostrar").on('click', function(){
    showTable();
});

function showTable(){
    var table = document.getElementById("table1");
    var btn1 = document.getElementById("btnMostrar");
    if(table.style.display != 'none'){
        table.style.display = 'none';
        btn1.innerHTML = "<i class='ion-eye'></i> Mostrar Tabla";
    } else{
        table.style.display = 'inline-table';
        btn1.innerHTML = "<i class='ion-eye-disabled'></i> Ocultar Tabla";
    }  
}

/*Select Client to Edit on Modal*/
function selectClient(item){
    $a = item.parentNode.parentNode;
    $a = $a.getAttribute('value');
    $.ajax({
        async: true,
        type: "POST",
        url: "../serv/select_client.php",
        data: "q=" + $a,
        success: function(data){
            $b = JSON.parse(data);
            $("#modalInpName").val($b.client.name);
            $("#modalInpLastName").val($b.client.last_name);
            $("#modalInpDate").val($b.client.date);
            $("#modalInpID").val($a);
            $("#editModal").show();
        },
        timeout: 5000,
        error: function(){
            console.log("Error.");
        }
    });
}

/*Edit Client*/
function editClient(data){
    $.ajax({
        async: true,
        type: "POST",
        url: "../serv/edit_client.php",
        data: "q=" + data,
        success: function(data){
            $("#editModal").hide();
            console.log(data);
            getAllClients();    
        },
        timeout: 5000,
        error: function(){
            console.log("Error.");
        }
    });
}

$("#editModal").on('mouseover input', function(){
    $a = checkName($("#modalInpName").val());
    $b = checkName($("#modalInpLastName").val());
    $c = checkDate($("#modalInpDate").val());
    if (($a == true)&&($b == true)&&($c == true)){
        $("#modalMainMsg").text("");
        $("#btnModalSaveChanges").attr('disabled', false); 
    } else{
        $("#btnModalSaveChanges").attr('disabled', true); 
        $("#modalMainMsg").fadeIn(1000);
        $("#modalMainMsg").text("Ingrese los datos correctamente.");
        $("#modalMainMsg").fadeOut(4000);
    } 
});

$("#btnModalSaveChanges").on('click', function(){
    $data = {
        "id": $("#modalInpID").val(),
        "name": $("#modalInpName").val(),
        "last_name": $("#modalInpLastName").val(),
        "date": $("#modalInpDate").val()
    };
    $data = JSON.stringify($data);
    editClient($data);  
});

/*Checks and Menssages*/
function checkName(name){
    $regex=/^[A-ZÑ][a-zñáéíóú]+$/;
    if ($regex.test(name)){
        return true;
    } else {
        return false;
    }
}

function checkDate(data){
    if(data != ""){
        return true;
    } else{
        return false;
    }
}

$("#inpName").on('input', function(){
    $a = checkName($("#inpName").val());
    if (($a == true)||($("#inpName").val() == "")){
        $("#inpNameMsg").text("");
    } else{
        $("#inpNameMsg").text("Nombre Inválido.");
    }
});

$("#inpLastName").on('input', function(){
    $a = checkName($("#inpLastName").val());
    if (($a == true)||($("#inpLastName").val() == "")){
        $("#inpLastNameMsg").text("");
    } else{
        $("#inpLastNameMsg").text("Apellido Inválido.");
    }
});

$("#inpDate").on('input', function(){
    $a = checkDate($("#inpDate").val());
    if ($a == true){
        $("#inpDateMsg").text("");
    } else{
        $("#inpDateMsg").text("Error en Fecha.");
    }
});

$("#modalInpName").on('input', function(){
    $a = checkName($("#modalInpName").val());
    if (($a == true)||($("#modalInpName").val() == "")){
        $("#modalInpNameMsg").text("");
    } else{
        $("#modalInpNameMsg").text("Nombre Inválido.");
    }
});

$("#modalInpLastName").on('input', function(){
    $a = checkName($("#modalInpLastName").val());
    if (($a == true)||($("#modalInpLastName").val() == "")){
        $("#modalInpLastNameMsg").text("");
    } else{
        $("#modalInpLastNameMsg").text("Apellido Inválido.");
    }
});

$("#modalInpDate").on('input', function(){
    $a = checkDate($("#modalInpDate").val());
    if ($a == true){
        $("#modalInpDateMsg").text("");
    } else{
        $("#modalInpDateMsg").text("Error en Fecha.");
    }
});

/*Close Modal*/
$("#editModalClose").on('click', function(){
    $("#editModal").hide();
});

$("#btnModalClose").on('click', function(){
    $("#editModal").hide();
});