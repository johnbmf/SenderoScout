<?php

$para = 'hammersoft.fesw@gmail.com';
$titulo = 'Contacto a través de formulario web';
$nombre = $_POST["Nombre"];
$empresa = $_POST["Empresa"];
$telefono = $_POST["Telefono"];
$email = $_POST["E-mail"];
$mensaje = $_POST["Mensaje"];

$mensaje = wordwrap($mensaje, 70, "\r\n");
$enviar = 'Nombre: '. $nombre . "\r\n" . 'Telefono: '. $telefono . "\r\n" . 'Email: '. $email . "\r\n" . 'Mensaje: '. $mensaje;

$cabeceras = 'From: ' . $email . "\r\n" .
    'Name: '. $nombre . "\r\n" .
	'Telefono: '. $telefono . "\r\n" .
    'X-Mailer: PHP/' . phpversion();
	
if (mail($para, $titulo, $enviar, $cabeceras)){
    header('Location: localhost');
}
else{
    echo "Error.";
}
?>