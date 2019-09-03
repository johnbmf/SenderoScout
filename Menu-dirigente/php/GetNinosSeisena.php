<?php
	require_once('db_conn.php');
  //Generar conexion a BD.
    $mysqli = db_conn();

    $json = file_get_contents('php://input');
    $obj = json_decode($json,true);
    $response = new stdClass;

    $seisena = $obj['seisena'];

    $exito = "";
    $fracaso = "";

 
  if ($result= $mysqli->query("SELECT * FROM Usuario WHERE seisena1 = '$seisena'")){
    while( $row = $result -> fetch_array(MYSQLI_ASSOC)){
      $myArray[] = $row;
    }
    $response -> data = $myArray;
    $response -> type = 1;
    $response -> message = "Usuarios obtenidos con exito";

    echo json_encode($response);
  }
  else{
    $response -> data = null;
    $response -> type = -1;
    $response -> message = "Error al obtener usuarios";

  }
  mysqli_close($mysqli);
?>
