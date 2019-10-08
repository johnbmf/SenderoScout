<?php
	require_once('db_conn.php');
  //Poner una app verification con post.
  //Generar conexion a BD.
    $mysqli = db_conn();
	$json = file_get_contents('php://input');
	 // decoding the received JSON and store into $obj variable.
	 $obj = json_decode($json,true);
	 // name store into $tipo_mision.
    $grupo = $obj['grupo'];
    $user = $obj['usuario'];
	$query = "
    SELECT Unidad.nombre_unidad, invitacion_dirigente.user_reclutador, Unidad.id 
        FROM Unidad 
            LEFT Join invitacion_dirigente on Unidad.id = invitacion_dirigente.unidad_objetivo
        WHERE invitacion_dirigente.estado = 0 AND invitacion_dirigente.user_invitado = '$user';
    ";
    if($result = $mysqli->query($query)){
        while($row = $result -> fetch_array(MYSQLI_ASSOC)){
            $myArray[] = $row;
        }
        echo json_encode($myArray);
    }
  mysqli_close($mysqli);
?>
