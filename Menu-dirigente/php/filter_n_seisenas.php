<?php
  require_once('db_conn.php');
  $mysqli = db_conn();
  $json = file_get_contents('php://input');
  $obj = json_decode($json,true);
  $response = new stdClass;
  
  //Var
  $nombre_n = $obj['nombre_n'];
  $id_unidad = $obj['id_unidad'];
  $filter = $obj['filter'];            // Valores posibles NULL: Nines sin seisena, 0: Nines con Seisena, 1: Todos los nines de la unidad.

  $nombre_n .= '%';
  //Buscar los nines sin seisena (-1)
if($filter == -1){
  $query = "SELECT * FROM Usuario WHERE (nombre LIKE '$nombre_n') AND unidad1 = $id_unidad AND tipo = 'nino' AND seisena1 IS NULL";
}
// Buscar los nines con seisena (0)
else if($filter == 0){
  echo 'holi';
  $query = "SELECT * FROM Usuario WHERE (nombre LIKE '$nombre_n') AND unidad1 = $id_unidad AND tipo = 'nino' AND seisena1 IS NOT NULL";
}
//Buscar todos los nines (1)
else{
  $query = "SELECT * FROM Usuario WHERE (nombre LIKE '$nombre_n') AND unidad1 = $id_unidad AND tipo = 'nino'";
}
  if($result = $mysqli->query($query)){
    if($result->num_rows==0){
      echo json_encode('No se encuentran personas con ese nombre.');  
    }
    else{
    while($row = $result -> fetch_array(MYSQLI_ASSOC)){
            if($row["seisena1"]==NULL){
              $row["seisena1"]='Sin seisena';
            }
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