<?php
$first_name = $_POST['first_name'];
$last_name = $_POST['last_name'];
$visitor_email = $_POST['email'];
$message = $_POST['message'];

$email_from ='ghost24az@gmail.com';
$email_subject = "Someone just looked at your website";
$email_body = "User First Name: $first_name \n\n
                User Last Name: $last_name \n\n
                User Email: $visitor_email\n\n
                User Message $message\n\n";

$to = "ghost34az@gmail.com";

$headers = "From: $email_from \r\n";

$headers .= "Rely-To: $visitor_email \r\n";

mail($to,$email_subject,$email_body,$headers);

header("Location: ../index.html");

?>