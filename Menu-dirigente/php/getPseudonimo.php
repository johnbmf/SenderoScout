<?php
	require_once('db_conn.php');
    //Poner una app verification con post.
    //Generar conexion a BD.
    $mysqli = db_conn();
    // decoding the received JSON and store into $obj variable.
    $json = file_get_contents('php://input');
	$obj = json_decode($json,true);
	// name store into variables.
	$unidad = $obj['unidad'];

    //verificar si el Usuario ya existe
    $sql1 = "SELECT * FROM cambioPseudonimo WHERE estado = 0 AND unidad  = $unidad";//'$unidad' ";
    $res1 = $mysqli->query($sql1);
    $ObjectoJson["solicitudes"] = $res1->num_rows;
    if($res1->num_rows > 0){
        $count = 1;
        while($fila = $res1->fetch_assoc()){
            $ObjectoJson[strval($count)]["usuario"] = $fila["usuario"];
            $ObjectoJson[strval($count)]["Pseudonimo"] = $fila["nuevoPseudonimo"];
            $count++;
        }
        
        echo json_encode($ObjectoJson);
        exit;
    }
    
    echo json_encode($ObjectoJson);
    exit;
?>