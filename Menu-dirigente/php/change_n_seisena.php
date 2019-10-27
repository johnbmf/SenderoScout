<?php
  require_once('db_conn.php');
  $mysqli = db_conn();
  $json = file_get_contents('php://input');
  $obj = json_decode($json,true);
  $response = new stdClass;
  
  //Var
  $usuario = $obj['usuario'];
  $id_seisena = $obj['id_seisena'];

  $query = "UPDATE Usuario SET seisena1 = $id_seisena  WHERE user = '$usuario'";
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