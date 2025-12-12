function generarSecuenciaFizzBuzz(limite) {
    let outputHTML = '';
    const isLimiteValido = typeof limite === 'number' && limite > 0;

    if (!isLimiteValido || limite > 1000) {
        return {
            html: `<p class="error-message">Límite inválido o demasiado grande. Por favor, ingresa un número positivo (máx. 1000).</p>`,
            rango: 'Inválido'
        };
    }

    const rangoActual = `1 - ${limite}`;

    for (let i = 1; i <= limite; i++) {
        let esMultipleDe3 = i % 3 === 0;
        let esMultipleDe5 = i % 5 === 0;
        let resultado = '';
        let claseCss = '';
        let icono = '';
        let multiplicador = '';

        if (esMultipleDe3 && esMultipleDe5) {
            resultado = 'FizzBuzz';
            claseCss = 'fizzbuzz';
            icono = '<i class="fas fa-bolt"></i>';
            multiplicador = '÷3 y ÷5';
        } else if (esMultipleDe3) {
            resultado = 'Fizz';
            claseCss = 'fizz';
            icono = '<i class="fas fa-leaf"></i>';
            multiplicador = '÷3';
        } else if (esMultipleDe5) {
            resultado = 'Buzz';
            claseCss = 'buzz';
            icono = '<i class="fas fa-bolt"></i>';
            multiplicador = '÷5';
        }

        if (resultado !== '') {
            outputHTML += `
                <div class="result-item ${claseCss} new-item"> 
                    <div class="result-item-content">
                        <div class="result-icon-wrapper">
                            ${icono}
                        </div>
                        <div class="result-text">
                            <span class="result-value">${resultado}</span>
                            <span class="result-number">Número: ${i}</span>
                        </div>
                    </div>
                    <div class="result-multiplier">${multiplicador}</div>
                </div>
            `;
        }
    }

    if (outputHTML === '') {
        outputHTML = `<p>No se encontraron resultados en el rango 1 - ${limite}.</p>`;
    }

    return {
        html: outputHTML,
        rango: rangoActual
    };
}

function actualizarResultado(htmlContent, rangoTexto) {
    const resultadoElement = document.getElementById('resultado');
    const rangeElement = document.getElementById('result-range');

    resultadoElement.innerHTML = htmlContent;
    rangeElement.textContent = rangoTexto !== 'Inválido' ? rangoTexto : '0';

    const isDefault = htmlContent.includes('<p>') || htmlContent === '';
    if (isDefault) {
        resultadoElement.classList.add('default-result');
    } else {
        resultadoElement.classList.remove('default-result');
    }
}

function iniciarCarga(buttonElement, originalText) {
    buttonElement.setAttribute('data-original-text', originalText);
    buttonElement.disabled = true;
    buttonElement.classList.add('loading');
    buttonElement.innerHTML = '<i class="fas fa-spinner"></i> Procesando...';
}

function detenerCarga(buttonElement) {
    const originalText = buttonElement.getAttribute('data-original-text');
    buttonElement.disabled = false;
    buttonElement.classList.remove('loading');
    if (originalText) {
        if (buttonElement.id === 'ejecutarFizzBuzzBtn') {
            buttonElement.innerHTML = '<i class="fas fa-play"></i> Iniciar FizzBuzz';
        } else {
            buttonElement.innerHTML = '<i class="fas fa-filter"></i> Generar FizzBuzz Personalizado';
        }
    }
}

function manejarModoEstandar() {
    const boton = document.getElementById('ejecutarFizzBuzzBtn');
    iniciarCarga(boton, 'Iniciar FizzBuzz');

    setTimeout(() => {
        const { html, rango } = generarSecuenciaFizzBuzz(100);
        actualizarResultado(html, rango);
        detenerCarga(boton);
    }, 500);
}

function manejarModoPersonalizado() {
    const boton = document.getElementById('generarPersonalizadoBtn');
    const inputElement = document.getElementById('numeroLimite');
    const valor = inputElement.value.trim();

    iniciarCarga(boton, 'Generar FizzBuzz Personalizado');

    setTimeout(() => {
        if (valor === '') {
            actualizarResultado('<p class="error-message">Por favor, ingresa un número límite.</p>', 'Rango no definido');
            detenerCarga(boton);
            return;
        }

        const limite = parseInt(valor);
        if (isNaN(limite)) {
            actualizarResultado('<p class="error-message">Entrada inválida. Ingresa solo números enteros.</p>', 'Inválido');
            detenerCarga(boton);
            return;
        }

        const { html, rango } = generarSecuenciaFizzBuzz(limite);

        if (rango === 'Inválido') {
            actualizarResultado(html, 'Inválido');
        } else {
            actualizarResultado(html, rango);
        }

        detenerCarga(boton);
    }, 500);
}

document.addEventListener('DOMContentLoaded', () => {
    const botonEstandar = document.getElementById('ejecutarFizzBuzzBtn');
    const botonPersonalizado = document.getElementById('generarPersonalizadoBtn');
    const inputElement = document.getElementById('numeroLimite');

    if (botonEstandar) {
        botonEstandar.addEventListener('click', manejarModoEstandar);
    }

    if (botonPersonalizado) {
        botonPersonalizado.addEventListener('click', manejarModoPersonalizado);
    }

    if (inputElement) {
        inputElement.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                manejarModoPersonalizado();
            }
        });
    }

    document.getElementById('result-range').textContent = '0';
});