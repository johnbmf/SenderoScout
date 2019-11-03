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
    $unidad = $input['unidad'];
    $seisena = $input['seisena'];

    
    //$sql_miembros = "SELECT user, nombre, edad, seisena1 FROM `Usuario` INNER JOIN Unidad ON Usuario.unidad1 = Unidad.id WHERE (unidad1 = '$unidad' AND seisena1 = '$seisena' AND tipo = 'nino')";
    $sql_miembros = "SELECT user, nombre, edad, seisena1 FROM `Usuario` INNER JOIN Unidad ON Usuario.unidad1 = Unidad.id WHERE (unidad1 = '$unidad' AND seisena1 = '$seisena' AND tipo = 'nino')";

    $sql_insignias = "SELECT User_Insignia.user, id_insignia, fecha FROM User_Insignia INNER JOIN Usuario ON User_Insignia.user = Usuario.user WHERE (unidad1 = '$unidad' AND seisena1 = '$seisena' AND tipo = 'nino')";

    $result_miembros = $conexion->query($sql_miembros);
    
    if($result_miembros->num_rows > 0){

        $result_insignias = $conexion->query($sql_insignias);

        $ObjetoJson["response"] = 1;
        $ObjetoJson["num_rows"] = $result_miembros->num_rows;
        $ObjetoJson["miembros"] = array();
        $Listamiembros = array();
        
        while($fila_miembros = $result_miembros->fetch_assoc()){
            if($fila_miembros["nombre"] == ""){
                continue;
            } 
            
            if($fila_miembros["seisena1"] == null){
                $fila_miembros["seisena1"] = "Sin seisena";
            }
            $obj["user"] = $fila_miembros["user"];
            $obj["nombre"] = $fila_miembros["nombre"];
            $obj["edad"] = $fila_miembros["edad"];
            $obj["seisena1"] = $fila_miembros["seisena1"];
            $obj["insignias"] =array();
            array_push($Listamiembros, $obj);
        }

        if($result_insignias->num_rows > 0){
          foreach($Listamiembros as $miembro){
            $array_insignias_temp = array();

            while($fila_insignias = $result_insignias->fetch_assoc()){
              if($miembro["user"] == $fila_insignias["user"]){
                $insignia_temp["id"] = (int)$fila_insignias["id_insignia"];
                $insignia_temp["fecha"] = $fila_insignias["fecha"];
                array_push($array_insignias_temp, $insignia_temp);
              }
            }
            $miembro["insignias"] = $array_insignias_temp;
            //array_push($miembro["insignias"], $array_insignias_temp);
            array_push($ObjetoJson["miembros"], $miembro);
          }
        }
        echo json_encode($ObjetoJson);
      }

    else if($result_miembros->num_rows == 0){
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