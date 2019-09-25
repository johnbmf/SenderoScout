<?php
  require_once('db_conn.php');
  $mysqli = db_conn();
  $json = file_get_contents('php://input');
  $obj = json_decode($json,true);
  $response = new stdClass;

  $date = new DateTime();
  $date = date("Y-m-d");

  //Var
  $seisena = $obj['seisena'];
  $unidad = $obj['unidad'];

  $query = "SELECT AVG(EvaluacionSemanal.corporalidad), AVG(EvaluacionSemanal.creatividad), AVG(EvaluacionSemanal.caracter), AVG(EvaluacionSemanal.afectividad), AVG(EvaluacionSemanal.sociabilidad), AVG(EvaluacionSemanal.espiritualidad) FROM EvaluacionSemanal, Usuario WHERE (EvaluacionSemanal.fecha BETWEEN (NOW() - INTERVAL 2 MONTH) AND NOW()) AND Usuario.seisena1 = '$seisena' AND Usuario.user = EvaluacionSemanal.usuario";

  
  if($result = $mysqli->query($query)){
    $row = $result->fetch_array(MYSQLI_NUM);

    $response -> data = $row;
    $response -> corporalidad = $row[0];
    $response -> creatividad = $row[1];
    $response -> caracter = $row[2];
    $response -> afectividad = $row[3];
    $response -> sociabilidad = $row[4];
    $response -> espiritualidad = $row[5];
    $response -> message = "Atributos totales obtenidos con exito";
    echo json_encode($response);
    }
    else{
    $response -> data = null;
    $response -> message = "Error al obtener atributos totales";   
    }

 mysqli_close($mysqli);
?>