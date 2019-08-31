<?php
	require_once('db_conn.php');
  //Generar conexion a BD.
    $mysqli = db_conn();
    
  if ($result= $mysqli->query("SELECT * FROM usuario WHERE seisena1 = 'Azul'")){
    while( $row = $result -> fetch_array(MYSQLI_ASSOC)){
      $myArray[] = $row;
    }
    echo json_encode($myArray);
  } 
  mysqli_close($mysqli);
?>
