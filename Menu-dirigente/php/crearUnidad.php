<?php
	require_once('db_conn.php');
    $mysqli = db_conn();
	$json = file_get_contents('php://input');
	$obj = json_decode($json,true);

	$nombre = $obj['nombre_unidad'];
	$grupo = $obj['grupo'];
	$distrito = $obj['distrito'];
	$rama = 'Manada';

	if($obj['nombre_unidad']!="")
	{
	$result= $mysqli->query("SELECT * FROM Unidad where nombre='$nombre'");
		if($result->num_rows>0){
			echo json_encode('Ya existe una unidad con ese nombre.');  
		}
		else
		{
			$add = $mysqli->query("insert into Unidad (nombre,grupo,distrito,rama) values('$nombre','$grupo','$distrito','$rama')");
			if($add){
				echo json_encode('¡Unidad agregada con exito!');
			}
			else{
				echo json_encode('Compruebe su conexión a internet.');
			}
		}
	}
	else{
	  echo json_encode('Intente de nuevo');
	}
  mysqli_close($mysqli);
?>