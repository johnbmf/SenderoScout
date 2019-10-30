<?php
	require_once('db_conn.php');
  //Poner una app verification con post.
  //Generar conexion a BD.
    $mysqli = db_conn();
	$json = file_get_contents('php://input');
	 // decoding the received JSON and store into $obj variable.
	 $obj = json_decode($json,true);
	 // name store into $tipo_mision.
	$tipo_mision = $obj['tipo_mision'];
	// same with $nombre_mision.
	$nombre_mision = $obj['nombre_mision'];
	$spot = $obj['spot'];
	$expiracion = $obj['expiracion'];
	// same with $descripcion_mision.
	$descripcion_mision = $obj['descripcion_mision'];
	$i = 0;
	$query = "
	set @unidad = (Select Usuario.unidad1 from Usuario
		where Usuario.user = 'dirigente');
	Select Usuario.user from Usuario where Usuario.unidad1 = @unidad and Usuario.tipo = 'nino';
	";
	$usuarios = $mysqli->multi_query($query) or die("Error".mysql_error());
	$mysqli->next_result();
	$usuarios2 = $mysqli->store_result();
	while ($fila = $usuarios2->fetch_array()){
		$users[$i] = $fila[0];
		$i++;
		// code...
	}
	if($obj['nombre_mision']!="")
	{
	$result= $mysqli->query("SELECT * FROM mision where nombre_mision='$nombre_mision'");
		if($result->num_rows>0){
			echo json_encode('Ya existe una mision con ese nombre.');  // alert msg in react native
		}
		else
		{
			$add = $mysqli->query("insert into mision (tipo_mision,nombre_mision,descripcion_mision) values('$tipo_mision','$nombre_mision','$descripcion_mision')");
			if($add){
				$query_id_mision = $mysqli->query("SELECT id_mision from mision where nombre_mision = '$nombre_mision'");
					$id_mision = $query_id_mision->fetch_array();
					foreach ($users as $key => $value) {
						$add_mision_mapa = $mysqli->query("insert into mision_mapa (user,estado,puntaje,fecha_expiracion,fecha_borrado,spot,id_mision) values('$value',0,0,DATE_ADD(CURRENT_DATE, INTERVAL $expiracion DAY),DATE_ADD(CURRENT_DATE, INTERVAL ($expiracion+2) DAY),'$spot',$id_mision[0])")or die("Error en los insert".mysql_error());
				}
				echo  json_encode('Mision creada con exito'); // alert msg in react native
			}
			else{
			   echo json_encode('Compruebe su conexion a internet.'); // our query fail
			}
		}
	}
	else{
	  echo json_encode('Intente de nuevo');
	}
  mysqli_close($mysqli);
?>