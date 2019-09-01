<?php
	require_once('db_conn.php');
  $mysqli = db_conn(); //generar conexion bd

	$json = file_get_contents('php://input'); // recivir Json desde React
  $obj = json_decode($json,true); //convertir json en objeto
  $fecha = new DateTime();
  //SETEAR VARIABLES DESDE JSON
  $usuario = $obj['usuario'];
  $nombre = $obj['nombre'];
  $fecha = date("Y-m-d H:i:s");
	$corporalidad = $obj['corporalidad'];
  $creatividad = $obj['creatividad'];
  $caracter =$obj['caracter'];
  $afectividad =$obj['afectividad'];
  $sociabilidad =$obj['sociabilidad'];
  $espiritualidad =$obj['espiritualidad'];


	$add = $mysqli->query("INSERT INTO evalaptitud (fecha, usuario, nombre, corporalidad, creatividad, caracter, afectividad, sociabilidad, espiritualidad) values('$fecha','$usuario','$nombre', '$corporalidad', '$creatividad', '$caracter','$afectividad','$sociabilidad','$espiritualidad')");
	if($add){
		echo  json_encode('Evaluacion enviada con exito'); // alert msg in react native
	}
	else{
		echo json_encode('Compruebe su conexion a internet.'); // our query fail
	  }
  mysqli_close($mysqli);
?>