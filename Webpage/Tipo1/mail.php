<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;
    require(dirname(__FILE__) .'/PHPMailer/src/PHPMailer.php');
    require(dirname(__FILE__) .'/PHPMailer/src/Exception.php');
    require(dirname(__FILE__) .'/PHPMailer/src/SMTP.php');
    // use PHPMailer/src/PHPMailer;
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    header("Allow: GET, POST, OPTIONS, PUT, DELETE");
    $requestMethod = $_SERVER["REQUEST_METHOD"];

    if($requestMethod == 'POST'){
        try{
            $json = file_get_contents('php://input');
            $data = json_decode($json);
            $mail = new PHPMailer();
            $mail->isSMTP();
            $mail->SMTPAuth = true;
            $mail->SMTPSecure = 'ssl';
            $mail->Host = 'smtp.gmail.com';
            $mail->Port = 465;
            $mail->Username = 'hammersoft.fesw@gmail.com';
            $mail->Password = 'Ham123-*';
            $mail->SetFrom('stalin@dropoutforecast.cl','Stalin Mailer');
            $mail->Subject='Mensaje Contacto de '.$data->name;

            $mail->addAddress('felipe.vasquez.14@sansano.usm.cl', 'DiFroggy');
            $mail->addAddress('felipevegavalencia@gmail.com', 'Mauro');
            $mail->addAddress('ignacio.salas.14@sansano.usm.cl', 'Nacho');
            $mail->addAddress('andres.huerta.14@sansano.usm.cl', 'Meatboy');
            $mail->addAddress('victor.zavala.14@sansano.usm.cl', 'Victor');
            $mail->isHTML(true); 
            $mail->Body = "Hay un nuevo mensaje de contacto de ".$data-> name."<br> Correo: ".$data->email."<br> Asunto: ".$data->subject."<br><br>"."Mensaje:".$data->message;
            $mail->send();
            $response['status_code_header'] = 'HTTP/1.1 200 OK';
            echo json_encode(array('status' => 0, 'message' => "OK"));
            
             
        }
        catch (Exception $e) {
            $response['status_code_header'] = 'HTTP/1.1 200 OK';
            echo json_encode(array('status' => 1, 'message' => $e));  
        }
    }
    else{
        $response['status_code_header'] = 'HTTP/1.1 403 Forbidden';
        echo "Method not supported";
    } 
?>