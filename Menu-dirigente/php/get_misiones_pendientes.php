<?php
	require_once('db_conn.php');
  //Poner una app verification con post.
  //Generar conexion a BD.
    $mysqli = db_conn();
	$json = file_get_contents('php://input');
	 // decoding the received JSON and store into $obj variable.
	 $obj = json_decode($json,true);
	 // name store into $tipo_mision.
	$unidad = $obj['unidad'];
	$query = "
    SELECT Usuario.user, Usuario.unidad1, Usuario.nombre, mision_mapa.id,mision_mapa.estado, mision_mapa.fecha_expiracion,mision_mapa.fecha_borrado ,mision_mapa.id_mision, mision_mapa.respuesta,mision.nombre_mision, mision.descripcion_mision 
        FROM mision_mapa 
            LEFT Join Usuario on Usuario.user = mision_mapa.user
            LEFT JOIN mision on mision_mapa.id_mision = mision.id_mision
        WHERE mision_mapa.estado = 1 AND Usuario.unidad1 = '$unidad';
    ";
    if($result = $mysqli->query($query)){
        while($row = $result -> fetch_array(MYSQLI_ASSOC)){
            $myArray[] = $row;
        }
        echo json_encode($myArray);
    }
  mysqli_close($mysqli);
?>