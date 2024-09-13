<?php
//función para limpiar las entradas
function sanitize_input($data)
{
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}





$errores = [];
///comprobar que se ha enviado el formulario
if ($_SERVER["REQUEST_METHOD"] === "POST") {


    echo "<pre> ";
    var_dump($_POST);
    echo "</pre>";
    //validad correo
    if (empty($_POST["correo"])) {
        $errores[] = "el correo no es obligatorio";
    } elseif (!filter_var(value: $_POST["correo"], filter: FILTER_VALIDATE_EMAIL)) {
        $errore[] = "el formato de correo no es válido";
    }
    if (empty($_POST["pass"])) {
        $errores[] = "La contraseña es obligatoria";
    }


    // Validar fecha
    if (empty($_POST["fecha"])) {
        $errores[] = "La fecha de antigüedad es obligatoria.";
    }

    // Validar color (no es obligatorio, pero si se selecciona, debe ser válido)
    if (isset($_POST["color"]) && !in_array($_POST["color"], ["rojo", "azul", "verde"])) {
        $errores[] = "El color seleccionado no es válido.";
    }

    // Validar aceptación de políticas
    if (isset($_POST["aceptoPoliticas"])) {
        $errores[] = "Debes aceptar las políticas de privacidad.";
    }

    // Si no hay errores, procesar los datos
    if (empty($errores)) {
        echo "<h2>Datos del formulario:</h2>";
        echo "<p><strong>Nombre:</strong> " . sanitize_input($_POST["nombre"]) . "</p>";
        echo "<p><strong>Dirección:</strong> " . sanitize_input($_POST["direccion"]) . "</p>";
        echo "<p><strong>Correo:</strong> " . sanitize_input($_POST["correo"]) . "</p>";
        echo "<p><strong>Contraseña:</strong> [Oculta por seguridad]</p>";
        echo "<p><strong>Antigüedad:</strong> " . sanitize_input($_POST["fecha"]) . "</p>";
        echo "<p><strong>Color elegido:</strong> " . (isset($_POST["color"]) ? sanitize_input($_POST["color"]) : "No seleccionado") . "</p>";
        echo "<p><strong>Comentarios:</strong> " . sanitize_input($_POST["comentarios"]) . "</p>";
        echo "<p><strong>Aceptó políticas:</strong> Sí</p>";
    } else {
        // Si hay errores, mostrarlos
        echo "<h2>Errores en el formulario:</h2>";
        echo "<ul>";
        foreach ($errores as $error) {
            echo "<li>" . sanitize_input($error) . "</li>";
        }
        echo "</ul>";
        echo "<p><a href='javascript:history.back()'>Volver al formulario</a></p>";
    }
} else {
    // Si no se ha enviado el formulario, redirigir al formulario
    header("Location: index.html");
    exit();
}



