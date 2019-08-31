<?php

$para = 'hammersoft.fsw@gmail.com';
$titulo = 'Contacto a través de formulario web';
$nombre = $_POST["sender"];
$email = $_POST["senderEmail"];
$mensaje = $_POST["message"];

$mensaje = wordwrap($mensaje, 70, "\r\n");
$enviar = 'Nombre: '. $nombre . "\r\n" . 'Email: '. $email . "\r\n" . 'Mensaje: '. $mensaje;

$cabeceras = 'From: ' . $email . "\r\n" .
     'Name: '. $nombre . "\r\n" .
	   'Telefono: '. $telefono . "\r\n" .
     'X-Mailer: PHP/' . phpversion();

if (mail($para, $titulo, $enviar, $cabeceras)){
    //header('Location: RUTA');
    echo "Ok";
}
else{
    echo "Error.";
}
?>
