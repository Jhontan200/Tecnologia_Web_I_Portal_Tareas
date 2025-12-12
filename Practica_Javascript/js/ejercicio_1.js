const ICON_MAP = {
    'Frio': 'fas fa-snowflake',
    'Templado': 'fas fa-sun',
    'Calor': 'fas fa-fire',
    'Extremo': 'fas fa-wind',
    'Error': 'fas fa-exclamation-triangle',
    'Default': 'fas fa-question-circle'
};

function determinarClima(temperatura) {
    if (temperatura >= -10 && temperatura <= 15) {
        return { clima: 'Frio', claseCss: 'clima-frio', claseFondo: 'fondo-frio', icono: ICON_MAP.Frio };
    } else if (temperatura >= 16 && temperatura <= 25) {
        return { clima: 'Templado', claseCss: 'clima-templado', claseFondo: 'fondo-templado', icono: ICON_MAP.Templado };
    } else if (temperatura >= 26 && temperatura <= 40) {
        return { clima: 'Calor', claseCss: 'clima-calor', claseFondo: 'fondo-calor', icono: ICON_MAP.Calor };
    } else {
        return { clima: 'Extremo', claseCss: 'clima-extremo', claseFondo: 'fondo-extremo', icono: ICON_MAP.Extremo };
    }
}

function validarSoloNumeros(event) {
    const key = event.key;
    const input = event.target;
    const currentValue = input.value;

    if (event.ctrlKey || event.altKey || key.length > 1) {
        return;
    }

    if (/\d/.test(key)) {
        return;
    }

    if (key === '-') {
        if (currentValue.length === 0) {
            return;
        }
    }

    if (key === '.') {
        if (currentValue.indexOf('.') === -1) {
            return;
        }
    }

    event.preventDefault();
}

function actualizarFondoPagina(claseFondo) {
    const pageElement = document.querySelector('.bg-page');
    if (pageElement) {
        const clasesFondo = ['fondo-frio', 'fondo-templado', 'fondo-calor', 'fondo-extremo', 'fondo-error'];

        pageElement.classList.remove(...clasesFondo, 'default-bg');

        if (claseFondo) {
            pageElement.classList.add(claseFondo);
        } else {
            pageElement.classList.add('default-bg');
        }
    }
}

function mostrarClima() {
    const inputElement = document.getElementById('temperatura');
    const resultadoElement = document.getElementById('resultado');

    const temperaturaTexto = inputElement.value.trim().replace(/,/g, '.');
    const temperatura = parseFloat(temperaturaTexto);

    resultadoElement.className = 'result-box';
    resultadoElement.innerHTML = '';
    actualizarFondoPagina(null);

    if (temperaturaTexto === '' || isNaN(temperatura)) {
        resultadoElement.classList.add('clima-error');
        resultadoElement.innerHTML = `<i class="${ICON_MAP.Error} result-icon"></i><span class="result-text"> Ingresa un valor numérico válido</span>`;
        actualizarFondoPagina('fondo-error');
        return;
    }

    const resultado = determinarClima(temperatura);

    resultadoElement.classList.add(resultado.claseCss);

    resultadoElement.innerHTML = `
        <i class="${resultado.icono} result-icon"></i>
        <span class="result-text"> ${resultado.clima}</span>
    `;

    actualizarFondoPagina(resultado.claseFondo);
}

document.addEventListener('DOMContentLoaded', () => {
    const boton = document.getElementById('obtenerClimaBtn');
    const inputElement = document.getElementById('temperatura');

    actualizarFondoPagina('default-bg');

    if (inputElement) {
        inputElement.addEventListener('keydown', validarSoloNumeros);
    }

    if (boton) {
        boton.addEventListener('click', mostrarClima);
    }

    if (inputElement) {
        inputElement.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                mostrarClima();
            }
        });
    }
});