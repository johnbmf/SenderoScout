<?php
	require_once('db_conn.php');
    $mysqli = db_conn();
	$json = file_get_contents('php://input');
	$obj = json_decode($json,true);
	

	$nombre = $obj['nombre_unidad'];
	$grupo = $obj['grupo'];
	$distrito = $obj['distrito'];
	$rama = 'Manada';
	$usuario = $obj['usuario'];
	$ide = 0;


	if($obj['nombre_unidad']!="" and $obj['grupo']!="" and $obj['distrito']!="")
	{
	$result= $mysqli->query("SELECT * FROM Unidad where nombre_unidad='$nombre'");
		if($result->num_rows>0){
			echo json_encode('Ya existe una unidad con ese nombre.');  
		}
		else
		{
			$add = $mysqli->query("INSERT into Unidad (nombre_unidad,grupo,distrito,rama) values('$nombre','$grupo','$distrito','$rama')");
			if($add){
				$ide = $mysqli->query("SELECT id FROM Unidad WHERE nombre_unidad='$nombre'");
				$row = $ide->fetch_array(MYSQLI_NUM);
				$ide = $row[0];
				if($next = $mysqli->query("UPDATE Usuario SET Usuario.Unidad1='$ide' WHERE Usuario.user='$usuario'")){
					$response -> message = "Unidad creada con exito.";
					$response -> id_unidad = $ide;
					$response -> nombre_usuario = $usuario;
					echo json_encode($response);
				}
				else{
					echo json_encode('Error, compruebe su conexión a internet.');
				}
			}
			else{
				echo json_encode('Error, compruebe su conexión a internet.');
			} 
		}
	}
	else{
	  echo json_encode('Intente de nuevo');
	}
  mysqli_close($mysqli);
?>