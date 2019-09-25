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

  $query = "SELECT SUM(EvaluacionSemanal.corporalidad), SUM(EvaluacionSemanal.creatividad), SUM(EvaluacionSemanal.caracter), SUM(EvaluacionSemanal.afectividad), SUM(EvaluacionSemanal.sociabilidad), SUM(EvaluacionSemanal.espiritualidad) FROM EvaluacionSemanal, Usuario WHERE (EvaluacionSemanal.fecha BETWEEN (NOW() - INTERVAL 2 MONTH) AND NOW()) AND Usuario.seisena1 = '$seisena' AND Usuario.user = EvaluacionSemanal.usuario";

  
  if($result = $mysqli->query($query)){
    echo "hla";
    $row = $result->fetch_array(MYSQLI_NUM);
    $myArray[] = $row;
    $response -> data = $myArray;
    $response -> message = "Atributos totales obtenidos con exito";
    echo json_encode($response);
    }
    else{
    $response -> data = null;
    $response -> message = "Error al obtener atributos totales";   
    }

 mysqli_close($mysqli);
?>