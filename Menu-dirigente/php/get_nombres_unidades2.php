<?php
  require_once('db_conn.php');
  $mysqli = db_conn();
  $json = file_get_contents('php://input');
  $obj = json_decode($json,true);
  $response = new stdClass;
  
  //Var
  $id_unidad = $obj['id_unidad'];

  $nombre_n .= '%';

  $query = "SELECT * FROM Usuario WHERE unidad1 = $id_unidad AND tipo = 'nino' ";

  if($result = $mysqli->query($query)){
    if($result->num_rows==0){
      echo json_encode('No se encuentran personas con ese nombre.');  
    }
    else{
    while($row = $result -> fetch_array(MYSQLI_ASSOC)){
            $myArray[] = $row;
    }
    $response -> data = $myArray;
    $response -> message = "Datos obtenidos con exito";
    echo json_encode($response);
    }
  }else{
  $response -> data = null;
  $response -> message = "Error al obtener nombres";
  echo json_encode($response);  
  }

 mysqli_close($mysqli);
?>