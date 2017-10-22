<?php
header("application/javascript");

$request = $_POST;
$inputfields = array("form-sender-name", "form-email", "form-message");
$sendParams = array();

foreach ($inputfields as $field) {
  
  if(!isset($_POST[$field]) || empty($_POST[$field])) $error = true;
  $sendParams[$field] = $_POST[$field];

}
if ($error) { 
 echo json_encode(array("status" => "Missing fields!"));
 exit();
}else { 
  include("lib/mailer.php");
  sendMail($sendParams["form-email"], $sendParams["form-sender-name"], $sendParams["form-message"]);
echo json_encode(array("status" => "Ok!"));
}



?>
