<?php
  require_once('db_conn.php');
  $mysqli = db_conn();
  $json = file_get_contents('php://input');
  $obj = json_decode($json,true);
  $response = new stdClass;
  
  //Recibe id_unidad e id_seisena en caso de ser cambio a otra seisena, solo id_unidad en otros casos. 
  $id_unidad = $obj['id_unidad'];
  $id_seisena = $obj['id_seisena'];

if($id_seisena == NULL){
  $query = "SELECT * FROM Seisena WHERE id_unidad_seisena = $id_unidad";
}
else{
  $query = "SELECT * FROM Seisena WHERE id_unidad_seisena = $id_unidad AND id_seisena <> $id_seisena";
}
  if($result = $mysqli->query($query)){
    
    while($row = $result -> fetch_array(MYSQLI_ASSOC)){
            $myArray[] = $row;
    }
    $response -> data = $myArray;
    $response -> message = "Datos obtenidos con exito";
    echo json_encode($response);
  }else{
  $response -> data = null;
  $response -> message = "Error al obtener seisenas";
  echo json_encode($response);  
  }

 mysqli_close($mysqli);
?>