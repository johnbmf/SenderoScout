<?php
	require_once('db_conn.php');
  //Poner una app verification con post.
  //Generar conexion a BD.
    $mysqli = db_conn();
    $json = file_get_contents('php://input');
    $response = new stdClass;
	 // decoding the received JSON and store into $obj variable.
	 $obj = json_decode($json,true);
	 // name store into variables.
	$user_reclutador = $obj['user_reclutador'];
	$user_invitado = $obj['user_invitado'];
    $unidad_objetivo = $obj['unidad_objetivo'];
    //verificar si el Usuario ya existe
    $sql1 = "SELECT * FROM invitacion_dirigente WHERE invitacion_dirigente.user_invitado = '$user_invitado' and invitacion_dirigente.estado = 0";
    $res1 = $mysqli->query($sql1);
    if($res1->num_rows > 0){
        $response -> message = "El usuario ya cuenta con una invitación de esta unidad, por favor espere hasta que se acepte.";
        $response -> respuesta = -2;
        echo json_encode($response);
        exit;
    }
    $sql2 = "INSERT INTO  invitacion_dirigente (user_reclutador,user_invitado,unidad_objetivo) VALUES ('$user_reclutador','$user_invitado','$unidad_objetivo')";
    $res2 = $mysqli->query($sql2);
    if($res2 != false){
        $response -> message = "Invitacion enviada con éxito.";
        $response -> respuesta = 0;
        echo json_encode($response);
        exit;
    }else{
        $response -> message = "Hubo un error en el envío de la invitación, intente nuevamente.";
        $response -> respuesta = -1;
        echo json_encode($response);
        exit;
    }
   // $response -> message = "Usuario creado con éxito.";
 //   $response -> respuesta = 0;
//    echo json_encode($response);

    //echo 0;
    exit;
//    mysqli_close($mysqli); 
?>