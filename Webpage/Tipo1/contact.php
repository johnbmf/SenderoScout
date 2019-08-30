
<?php

if (isset($_POST["submit"])) {
	require 'phpmailer/PHPMailerAutoload.php';
	function sendemail($to, $from, $fromName, $body){
		$mail = new phpMailer();
		$mail ->setForm($from, $fromName);
		$mail ->addAdress($to);
		$mail ->Subject ='Contact Form - Email';
		$mail ->Body = $body;
		$mail -> isHTML (isHtml: false);

		return $mail->send();
	}

	$name = $POST["name"];
	$email = $POST["email"];
	$body = $POST["message"];


    if (sendemail(to:hammersoft.fesw@gmail.com,$email,$name,$body){
    	$msg="<p>Thank you! Your message has been sent.</p>";
    	}else{ $msg = "Email Failed"
    	}
}

?>