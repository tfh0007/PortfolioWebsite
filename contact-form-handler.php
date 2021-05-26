<?php
$first_name = $_POST['userFirst'];
$last_name = $_POST['userLast'];
$visitor_email = $_POST['userEmail'];
$message = $_POST['message'];

$email_from ='ghost24az@gmail.com';
$email_subject = "Someone just looked at your website";
$email_body = "User First Name: $first_name \n\n
                User Last Name: $last_name \n\n
                User Email: $visitor_email\n\n
                User Message: $message\n\n";

$to = "ghost34az@gmail.com";

$headers = "From: $email_from \r\n";

$headers .= "Rely-To: $visitor_email \r\n";

mail($to,$email_subject,$email_body,$headers) or die("Error!");
echo "Thank You!" . " -" . "<a href='index.html' style='text-decoration:none;color:#ff0099;'> Return Home</a>";

header("Location: index.html");

?>