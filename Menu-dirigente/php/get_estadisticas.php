<?php
	require_once('db_conn.php');
  //Generar conexion a BD.
  $mysqli = db_conn();

  $json = file_get_contents('php://input');
  $obj = json_decode($json,true);
  $response = new stdClass;

  $unidad = $obj['unidad'];

  $exito = "";
  $fracaso = "";
/*  De momento esta query entrega los promedios agrupados por semana, eso quiere decir que todas las fechas a las que considera dentro de la misma semana les saca el promedio, de momento se le tiene que entregar como parametro la unidad en la que pertenecen los usarios que estan siendo considerados. También se está considerando que solo busque por el año actual en el que se realiza la consulta osea si estoy haciendo la consulta en el año 2019, entonces mis datos solo perteneceran a ese año. Lo ideal sería que eso pudiese cambiar a futuro, pero de momento quedará así. */

if ($result= $mysqli->query("SELECT Usuario.unidad1, EvaluacionSemanal.fecha, WEEK(EvaluacionSemanal.fecha) as semana , DAY(EvaluacionSemanal.fecha) as dia, DATE_FORMAT(EvaluacionSemanal.fecha, '%b') as mes, YEAR(EvaluacionSemanal.fecha) as anio ,AVG(EvaluacionSemanal.corporalidad) as corporalidad,AVG(EvaluacionSemanal.creatividad) as creatividad, AVG(EvaluacionSemanal.caracter) as caracter, AVG(EvaluacionSemanal.afectividad) as afectividad, AVG(EvaluacionSemanal.sociabilidad) as sociabilidad, AVG(EvaluacionSemanal.espiritualidad) as espiritualidad 
from EvaluacionSemanal 
	LEFT JOIN Usuario on Usuario.unidad1 = '$unidad'
    WHERE Usuario.user = EvaluacionSemanal.usuario AND YEAR(EvaluacionSemanal.fecha) = YEAR(NOW())
GROUP BY WEEK(EvaluacionSemanal.fecha)")){
    while( $row = $result -> fetch_array(MYSQLI_ASSOC)){
    $myArray[] = $row;
    }
    if (!is_null($myArray)){
        $response -> data = $myArray;
        $response -> type = 1;
        $response -> message = "Datos obtenidos con exito";

        if ($result= $mysqli->query("SELECT AVG(EvaluacionSemanal.corporalidad) as corporalidad,AVG(EvaluacionSemanal.creatividad) as creatividad, AVG(EvaluacionSemanal.caracter) as caracter, AVG(EvaluacionSemanal.afectividad) as afectividad, AVG(EvaluacionSemanal.sociabilidad) as sociabilidad, AVG(EvaluacionSemanal.espiritualidad) as espiritualidad 
        from EvaluacionSemanal 
            LEFT JOIN Usuario on Usuario.unidad1 = '$unidad'
            WHERE Usuario.user = EvaluacionSemanal.usuario AND YEAR(EvaluacionSemanal.fecha) = YEAR(NOW())
        GROUP BY Usuario.unidad1")){
            while( $row = $result -> fetch_array(MYSQLI_ASSOC)){
            $myArray2[] = $row;
            }
            if (!is_null($myArray2)){
                $response -> radar = $myArray2;
        }
        if ($result= $mysqli->query("SELECT Usuario.unidad1 as unidad, Usuario.seisena1 as seisena, IFNULL(SUM(Usuario.puntos),0) as puntaje
        FROM Usuario
        WHERE Usuario.unidad1 = '$unidad'
        GROUP BY seisena1")){
            while( $row = $result -> fetch_array(MYSQLI_ASSOC)){
                $myArray3[] = $row;
                }
                if (!is_null($myArray3)){
                    $response -> barra = $myArray3;
                }
            }
        echo json_encode($response);
    }
    }

    else{
        $response -> data = null;
        $response -> type = -1;
        $response -> message = "Error al obtener los datos";   
        echo json_encode($response);    
    }
}
else{
    $response -> data = null;
    $response -> type = -1;
    $response -> message = "Error al obtener los datos";   
    echo json_encode($response);
}
  mysqli_close($mysqli);
?>