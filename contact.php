<?php

// $post = (!empty($_POST)) ? true : false;

// if($post) {

    $to = 'k9904997@yandex.ru';
    $name = clear_data($_POST['name']);
    $text = clear_data($_POST['message']);
    $phone = clear_data($_POST["phone"]);
    $subject = 'Заявка с сайта';
    $error = '';

    $headers = "From: k9904997@yandex.ru\r\n";
    $headers .= "Reply-To: k9904997@yandex.ru\r\n";
    $headers .= "X-Mailer: PHP/". phpversion();

    if(!$name){ $error .= 'Пожалуйста введите ваше имя<br />'; }

    if(!$phone){ $error .= 'Пожалуйста введите ваш телефон<br />'; }

    if(!$text || strlen($text) < 1) { $error .= "Введите ваше сообщение<br />"; }

    function clear_data($val){
        $val = trim($val);
        $val = stripslashes($val);
        $val = htmlspecialchars($val);
        return $val;
    }

    if(!$error) {
        $message = "Имя: " .$name. "\n". "Телефон: ". $phone. "\n". "Сообщение: ". $text. "\n"; 

        $mail = mail($to, $subject, $message, $headers);

        if($mail) { echo 'OK'; }

    } 
    else{ echo '<div class="notification_error">'.$error.'</div>'; }
// }
?>