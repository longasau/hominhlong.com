<?php
require("vendor/swiftmailer/swiftmailer/lib/swift_required.php");


function sendMail($email, $name, $message) { 
$username = 'tellimus@vifi.ee'; 
$password = 'Martin123';
$host = 'smtp.zone.ee';
$port = 1025;

$transport = Swift_SmtpTransport::newInstance($host, $port)->setUsername($username)->setPassword($password);
$mailer = Swift_Mailer::newInstance($transport);


$message = Swift_Message::newInstance($mailer)->setSubject("new message from site, $email - $name")->setFrom(array($email =>  $name))->setBody($message)->setTo(array("longasau@gmail.com"));

$result = $mailer->send($message);

}
?>