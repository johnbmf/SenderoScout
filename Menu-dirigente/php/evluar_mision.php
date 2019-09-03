<?php
	require_once('db_conn.php');
  //Poner una app verification con post.
  //Generar conexion a BD.
    $mysqli = db_conn();
	$json = file_get_contents('php://input');
	
	 // decoding the received JSON and store into $obj variable.
	$obj = json_decode($json,true);
    $user = $obj['user'];
    $id_mision_mapa = $obj['id'];
    $rating = $obj['rating'];
    $expiracion = $obj['fecha_expiracion'];
    $borrado = $obj['fecha_borrado'];
    $formato = 'Y-m-d';
    $exp_format = DateTime::createFromFormat('Y-m-d', $expiracion)-> format('Y-m-d');
    $date1 = DateTime::createFromFormat($formato, $expiracion);
    $date2 = DateTime::createFromFormat($formato, $borrado);
    $date3 = $date1->diff($date2)->days;
    if($date3 < 3){
        $add = $mysqli->query("UPDATE mision_mapa SET mision_mapa.estado = 2, mision_mapa.puntaje = $rating, mision_mapa.fecha_borrado = DATE_ADD('$expiracion', INTERVAL 2 DAY) Where mision_mapa.id = $id_mision_mapa ");
        $add_puntos = $mysqli->query("UPDATE Usuario SET Usuario.puntos = Usuario.puntos + $rating WHERE Usuario.user = '$user'");
            if($add and $add_puntos){
                echo  json_encode('Mision creada con exito');
            }else{
                echo $date3;
                echo  json_encode('Ocurrio un error1');
            }
    }else{
        $add = $mysqli->query("UPDATE mision_mapa SET mision_mapa.estado = 2, mision_mapa.puntaje = $rating, Where mision_mapa.id = $id_mision_mapa ");
        $add_puntos = $mysqli->query("UPDATE Usuario SET Usuario.puntos = Usuario.puntos + $rating WHERE Usuario.user = '$user'");
            if($add and $add_puntos){
                echo  json_encode('Mision creada con exito');
            }else{
                echo  json_encode('Ocurrio un error2');
            }
    }
  mysqli_close($mysqli);
?>