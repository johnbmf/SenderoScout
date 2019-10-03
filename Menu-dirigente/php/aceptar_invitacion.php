<?php
	require_once('db_conn.php');
  //Poner una app verification con post.
  //Generar conexion a BD.
    $mysqli = db_conn();
	$json = file_get_contents('php://input');
	$response = new stdClass;
	 // decoding the received JSON and store into $obj variable.
	$obj = json_decode($json,true);
    $user = $obj['user'];
    $nombre = $obj['nombre'];
    $estado = $obj['estado'];
    $reclutador = $obj['user_reclutador'];
    $nueva_unidad = $obj['nueva_unidad'];
    $add_puntos = $mysqli->query("UPDATE invitacion_dirigente SET invitacion_dirigente.estado = $estado WHERE invitacion_dirigente.user_invitado = '$nombre' and invitacion_dirigente.user_reclutador = '$reclutador' and invitacion_dirigente.estado = 0");
    if($estado == 1){
        $add = $mysqli->query("UPDATE Usuario SET Usuario.unidad1 = '$nueva_unidad' WHERE Usuario.user = '$user'");
    }
    if($add_puntos){
        $response -> message = "Invitaci贸n aceptada con 茅xito";
        $response -> alert_type = 1;
        echo json_encode($response);
    }else{
        $response -> message = "Algo inesperado ha ocurrido, por favor intente nuevamente";
        $response -> alert_type = -1;
        echo json_encode($response);
    }
  mysqli_close($mysqli);
?>