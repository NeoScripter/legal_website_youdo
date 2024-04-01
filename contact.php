<?php

    $to = 'k9904997@yandex.ru';
    $name = clear_data($_POST['name']);
    $text = clear_data($_POST['message']);
    $phone = clear_data($_POST["phone"]);
    $subject = 'Заявка с сайта';
    $error = '';

    $headers = "From: k9904997@yandex.ru\r\n";
    $headers .= "Reply-To: k9904997@yandex.ru\r\n";
    $headers .= "X-Mailer: PHP/". phpversion();

    function clear_data($val){
        $val = trim($val);
        $val = stripslashes($val);
        $val = htmlspecialchars($val);
        return $val;
    }

    function validate_email($email) {
        return filter_var($email, FILTER_VALIDATE_EMAIL);
    }
    
    function validate_phone($phone) {
        $pattern = '/^(\+7|8)\d{10}$/';
        return preg_match($pattern, $phone);
    }

    if (!empty($_POST['fax'])) {
        exit;
    }

    if(!$name) { $error .= 'Пожалуйста введите ваше имя<br />'; }
    if(!$phone || !validate_phone($phone)) { $error .= 'Пожалуйста введите правильный телефонный номер<br />'; }
    if(!$email || !validate_email($email)) { $error .= 'Пожалуйста введите правильный email<br />'; }
    if(!$text || strlen($text) < 1) { $error .= "Введите ваше сообщение<br />"; }

    if(!$error) {
        $message = "Имя: " .$name. "\n". "Телефон: ". $phone. "\n". "Сообщение: ". $text. "\n"; 
        $mail = mail($to, $subject, $message, $headers);
        if($mail) { echo 'OK'; }

    } 
    else{ echo '<div class="notification_error">'.$error.'</div>'; }
?>