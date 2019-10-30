<?php
  require_once('db_conn.php');
  $mysqli = db_conn();
  $json = file_get_contents('php://input');
  $obj = json_decode($json,true);
  $response = new stdClass;
  
  //Var
  $nuevo_nombre = $obj['nuevo_nombre'];      // Revisar respecto a chequeo de unidad.
  $id_seisena = $obj['id_seisena'];



  $query = "SELECT Seisena WHERE nombre_seisena = '$nuevo_nombre'";
  $result = $mysqli->query($query);
if($result->num_rows==0){ // En el caso de que las seisenas no pueden tener el mismo nombre
  
  $query = "UPDATE Seisena SET nombre_seisena = '$nuevo_nombre'  WHERE id_seisena = $id_seisena";
  $result = $mysqli->query($query);
  if($result and $id_seisena!=NULL){
    $response -> message = "Cambio realizado con exito";
    echo json_encode($response);
    
  }else{   
  $response -> message = "Error al realizar el cambio";
  echo json_encode($response);  
  }
}
else{
  $response -> message = "Ya existe una seisena con ese nombre";
  echo json_encode($response);  
}
 mysqli_close($mysqli);
?>