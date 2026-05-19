<?php
header("Content-Type: text/html; charset=utf-8");
$name = htmlspecialchars($_POST["name"]);
$tel = htmlspecialchars($_POST["tel"]);
$region = htmlspecialchars($_POST["region"]);
$category = htmlspecialchars($_POST["category"]);
$time = htmlspecialchars($_POST["time"]);


$refferer = getenv('HTTP_REFERER');
$date=date("d.m.y"); // число.месяц.год  
$time=date("H:i"); // часы:минуты:секунды 
$myemail = "konkord_rekruting@mail.ru";

$tema = "Новая заявка";
$message_to_myemail = "
<br><br>
Имя: $name<br>
Телефон: $tel<br>
Регион: $region<br>
Категория годности: $category<br>
время для звонка: $time<br>

Источник (ссылка): $refferer
";

mail($myemail, $tema, $message_to_myemail, "From: Army <admin@kateweb.ru> \r\n  \r\n"."MIME-Version: 1.0\r\n"."Content-type: text/html; charset=utf-8\r\n" );



?>
