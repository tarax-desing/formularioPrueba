<?php
echo "<h1>Validando formulario</h1>";
$errores = [];
///comprobar que se ha enviado el formulario
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    //ECHO 

    //     "<pre> "
// var_dump($_POST);
//     "</pre>";
//validad correo
    if (empty($_POST["correo"])) {
        $errores[] = "el correo no es obligatorio";
    } else if (filter_var(value: $_POST["correo"], filter: FILTER_VALIDATE_EMAIL)) {
        $errore[] = "el formato de correo no es válido";
    }
    if (empty($_POST["pass"])) {
        $errores[] = "La contraseña es obligatoria";
    }

}