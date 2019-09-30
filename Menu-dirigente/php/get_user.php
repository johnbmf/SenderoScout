<?php
	require_once('db_conn.php');
  //Poner una app verification con post.
  //Generar conexion a BD.
    $mysqli = db_conn();
	$json = file_get_contents('php://input');
	 // decoding the received JSON and store into $obj variable.
	 $obj = json_decode($json,true);
	 // name store into $tipo_mision.
    $usuario = $obj['usuario'];
    $password = $obj['password'];
	$query = "
    SELECT Usuario.user, Usuario.nombre, Usuario.pseudonimo, Usuario.edad, Usuario.email, Usuario.seisena1, Usuario.tipo, Usuario.grupo, Usuario.unidad1 
        FROM `Usuario` WHERE Usuario.user = '$usuario' AND Usuario.password = '$password';
    ";
    if($result = $mysqli->query($query)){
        while($row = $result -> fetch_array(MYSQLI_ASSOC)){
            $myArray[] = $row;
        }
        echo json_encode($myArray);
    }
  mysqli_close($mysqli);
?>