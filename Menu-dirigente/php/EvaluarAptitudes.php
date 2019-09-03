<?php
	require_once('db_conn.php');
  $mysqli = db_conn(); //generar conexion bd

	$json = file_get_contents('php://input'); // recivir Json desde React
  $obj = json_decode($json,true); //convertir json en objeto
  $response = new stdClass;
  $fecha = new DateTime();
  //SETEAR VARIABLES DESDE JSON
  $usuario = $obj['usuario'];
  $nombre = $obj['nombre'];
  $fecha = date("Y-m-d");
	$corporalidad = $obj['corporalidad'];
  $creatividad = $obj['creatividad'];
  $caracter =$obj['caracter'];
  $afectividad =$obj['afectividad'];
  $sociabilidad =$obj['sociabilidad'];
  $espiritualidad =$obj['espiritualidad'];


	$add = $mysqli->query("INSERT INTO EvaluacionSemanal (fecha, usuario, nombre, corporalidad, creatividad, caracter, afectividad, sociabilidad, espiritualidad) values('$fecha','$usuario','$nombre', '$corporalidad', '$creatividad', '$caracter','$afectividad','$sociabilidad','$espiritualidad')");
	if($add){
    $response -> data = null;
    $response -> type = 1;
    $response -> message = "Evaluacion enviada con exito";
		echo  json_encode($response);
	}
	else{
    $response -> data = null;
    $response -> type = -1;
    $response -> message = "Error al enviar la evaluacion, por favor intente nuevamente.";
		echo  json_encode($response);
	  }
  mysqli_close($mysqli);
?>