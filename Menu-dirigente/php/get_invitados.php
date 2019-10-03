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
    $user = obj['usuario'];
	$query = "
    SELECT Usuario.user,Usuario.nombre  FROM `Usuario` WHERE Usuario.grupo = '$grupo' and Usuario.user <> '$user'
    ";
    if($result = $mysqli->query($query)){
        while($row = $result -> fetch_array(MYSQLI_ASSOC)){
            $myArray[] = $row;
        }
        echo json_encode($myArray);
    }
  mysqli_close($mysqli);
?>




