<?php
  require_once('db_conn.php');
  $mysqli = db_conn();
  $json = file_get_contents('php://input');
  $obj = json_decode($json,true);
  $response = new stdClass;
  
  //Var
  $usuarios = $obj['usuarios'];
  $id_seisena = $obj['id_seisena'];
  $nombre_seisena = $obj['nombre_seisena'];


  foreach ($usuarios as $nine){
    $usuario = $nine['user'];
    $query = "UPDATE Usuario SET seisena1 = '$nombre_seisena'  WHERE user = '$usuario'";
    $result = $mysqli->query($query);
    if($result){
      $response -> message = "Cambio realizado con exito";

      
    }else{   
    $response -> message = "Error al realizar el cambio";

    }
  }
echo json_encode($response);
 mysqli_close($mysqli);
?>