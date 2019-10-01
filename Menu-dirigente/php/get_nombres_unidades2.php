<?php
  require_once('db_conn.php');
  $mysqli = db_conn();
  $json = file_get_contents('php://input');
  $obj = json_decode($json,true);
  $response = new stdClass;
  
  //Var
  $id_unidad = $obj['id_unidad'];
  $nombre_u = $obj['nombre_u'];
  $nombre_u .= '%';

  $query = "SELECT * FROM Unidad WHERE id <> $id_unidad AND (nombre_unidad LIKE '$nombre_u')";

  if($result = $mysqli->query($query)){
    if($result->num_rows==0){
      echo json_encode('No se encuentran otras unidades.');  
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
  $response -> message = "Error al obtener unidades";
  echo json_encode($response);  
  }

 mysqli_close($mysqli);
?>