<?php
	require_once('db_conn.php');
  $mysqli = db_conn(); //generar conexion bd

	$json = file_get_contents('php://input'); // recivir Json desde React
  $obj = json_decode($json,true); //convertir json en objeto

  $response = new stdClass;
  $fecha = new DateTime();

  //SETEAR VARIABLES DESDE JSON
  $usuario = $obj['usuario'];
  $insignia = $obj['insignia'];
  $fecha = date("Y-m-d");
  $contador = 0;

  if ($mysqli == NULL){
    $response["response"] = -1;
    $response->message = "Error al establecer conexion";
    echo json_encode($response);
    exit;
  }

  else{
    $query = "SELECT * FROM `User_Insignia` WHERE user = '$usuario'";
    $result_query = $mysqli->query($query);
    
    if($result_query->num_rows > 0){
        while($fila = $result_query->fetch_assoc()){
          if ((int)$fila["id_insignia"] == (int)$insignia) {
            $contador ++;
          }
        }
        if ($contador > 0){
          $response->type = 2;
          $response->message = "El usuario ya cuenta con esta insignia";
          echo  json_encode($response);
        }
      }

    if ($response->type != 2){
      $add = $mysqli->query("INSERT INTO `User_Insignia` (`id`, `user`, `id_insignia`, `fecha`) VALUES (NULL, '$usuario', '$insignia', '$fecha')");
      
      if($add){
        $response->type = 1;
        $response->message = "Insignia entregada exitosamente";
        echo  json_encode($response);
      }
      else{
        $response->type = -1;
        $response->message = "Error al entregar la insignia, por favor intente nuevamente.";
        echo  json_encode($response);
      }
    }
  }

  mysqli_close($mysqli);
?>