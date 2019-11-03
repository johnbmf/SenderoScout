<?php
  
  require_once('db_conn.php');
  //Poner una app verification con post.

  //Generar conexion a BD.
  $conexion = db_conn();
  
  $json = file_get_contents('php://input'); // recivir Json desde React
  $input = json_decode($json,true); //convertir json en objeto

  //Si la conexion es rechazada, entonces salir con error -1. (Cambiar en base a estructuras definidas posteriormente).
  if ($conexion == NULL){
    $ObjetoJson["response"] = -1;
    echo json_encode($ObjetoJson);
    exit;
  }
  //Si la conexion es aceptada, se sigue con el procedimiento.
  else{
    
    
    //Obtencion unidad consultada.
    //$unidad = 1;
    $unidad = $input['unidad'];
    
    $sql = "SELECT nombre, edad, seisena1 FROM `Usuario` INNER JOIN Unidad ON Usuario.unidad1 = Unidad.id WHERE unidad1 = '$unidad' AND tipo = 'nino'";
    $result = $conexion->query($sql);

    if($result->num_rows > 0){
        $ObjetoJson["response"] = 1;
        $ObjetoJson["num_rows"] = $result->num_rows;
        $ObjetoJson["miembros"] = array();
        while($fila = $result->fetch_assoc()){
            if($fila["nombre"] == ""){
                continue;
            } 
            
            if($fila["seisena1"] == null){
                $fila["seisena1"] = "Sin seisena";
            }
            $obj["nombre"] = $fila["nombre"];
            $obj["edad"] = $fila["edad"];
            $obj["seisena1"] = $fila["seisena1"];
            array_push($ObjetoJson["miembros"], $obj);
        }
       echo json_encode($ObjetoJson);
    }
    
    else if($result->num_rows == 0){
        $ObjetoJson["response"] = 0;
        $ObjetoJson["num_rows"] = 0;
        $ObjetoJson["miembros"] = array();
       echo json_encode($ObjetoJson);
    }
    
    else{
        $ObjetoJson["response"] = 0;
        echo json_encode($ObjetoJson);
    }
  }
?>