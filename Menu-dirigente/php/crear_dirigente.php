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
	$user = $obj['user'];
	$password = $obj['password'];
	$email = $obj['email'];
	$confirmacion_email = (int) $obj['confirmacion_email'];
    //$seisena1 =$obj['seisena1'];
    //$edad = (int) $obj['edad'];
    $tipo = $obj['tipo'];
    $nombre = $obj['nombre'];
    //$pseudonimo = $obj['pseudonimo'];
    $puntos = (int) $obj['puntos'];

    //verificar si el Usuario ya existe
    $sql1 = "SELECT * FROM Usuario WHERE user = '$user' ";
    $res1 = $mysqli->query($sql1);
    if($res1->num_rows > 0){
        $response -> message = "Usuario ya existe, intente con otro nombre de usuario";
        $response -> respuesta = 1;
        echo json_encode($response);
        exit;
    }
    $sql2 = "INSERT INTO  Usuario (user,password,email,confirmacion_email,tipo,nombre) VALUES ('$user','$password','$email','$confirmacion_email','$tipo','$nombre')";
    $res2 = $mysqli->query($sql2);
    if($res2 != false){
        $response -> message = "Usuario creado con éxito.";
        $response -> respuesta = 0;
        echo json_encode($response);
        exit;
    }else{
        $response -> message = "Usuario ya existe, intente con otro nombre de usuario";
        $response -> respuesta = 1;
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
