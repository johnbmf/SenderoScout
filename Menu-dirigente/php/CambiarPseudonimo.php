<?php
	require_once('db_conn.php');
    //Poner una app verification con post.
    //Generar conexion a BD.
    $mysqli = db_conn();
    // decoding the received JSON and store into $obj variable.
    $json = file_get_contents('php://input');
	$obj = json_decode($json,true);
	// name store into variables.
    $usuario = $obj['usuario'];
    $cambio = (int) $obj['cambio'];
    $nuevo = $obj['nuevo'];

    $sql1 = "UPDATE cambioPseudonimo SET estado = '$cambio' WHERE cambioPseudonimo.usuario = '$usuario'";// cambia el estado en la tabla de pseudonimos
    $res1 = $mysqli->query($sql1);
    $ObjetoJson["query1"] = $res1;
    $ObjetoJson["cambiooo"] = $cambio;
    if($res1 ){
        if($cambio == 1 ){//solo si acepta el cambio
            $sql2 = "UPDATE Usuario SET pseudonimo = '$nuevo' WHERE Usuario.user = '$usuario' ";//asigna el nuevo pseudonimo en usuario
            $res2 = $mysqli->query($sql2);
            $ObjetoJson["query2"] = $res2;
            if($res2 ){
                $ObjetoJson["response"] = 0;
                
            }
        }
        else if ($cambio == 2){//si no acepta el cambio
            $ObjetoJson["response"] = 1;
        }
    }
    else{
        $ObjetoJson["response2"] = -1;
    }
    
    echo json_encode($ObjetoJson);
    exit;
?>