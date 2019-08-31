<?php
	require_once('db_conn.php');
  //Generar conexion a BD.
    $mysqli = db_conn();

  mysqli_close($mysqli);
?>