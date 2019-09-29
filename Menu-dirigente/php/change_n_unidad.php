<?php
  require_once('db_conn.php');
  $mysqli = db_conn();
  $json = file_get_contents('php://input');
  $obj = json_decode($json,true);
  $response = new stdClass;
  
  //Var
  $nombre_n = $obj['nombre_n'];
  $id_unidad = $obj['id_unidad'];

  $query = "UPDATE Usuario SET Unidad1 = $id_unidad  WHERE nombre = '$nombre_n'";
  $result = $mysqli->query($query);
  if($result){
    $response -> message = "Cambio realizado con exito";
    echo json_encode($response);
    
  }else{   
  $response -> message = "Error al realizar el cambio";
  echo json_encode($response);  
  }

 mysqli_close($mysqli);
?>