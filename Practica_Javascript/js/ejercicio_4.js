let calificacionSeleccionada = 0;

const opcionesDeTour = [
    { id: 0, nombre: "Tour Clásico 3D/2N", precio: 1050.00, horario: "3 Días / 2 Noches" },
    { id: 1, nombre: "Tour Express Espejo", precio: 450.00, horario: "1 Día Completo (Lluvia)" },
    { id: 2, nombre: "Tour Amanecer (Privado)", precio: 1500.00, horario: "4 Horas (Madrugada)" }
];

let tourSeleccionadoIndex = opcionesDeTour[0].id;


const lugarTuristico = {
    nombre: "Salar de Uyuni",
    ciudad: "Uyuni, Potosí, Bolivia",
    precioOriginal: opcionesDeTour[0].precio,
    precioEntrada: opcionesDeTour[0].precio,
    horario: opcionesDeTour[0].horario,

    calificaciones: [5, 5, 5, 4, 5, 5, 5, 4, 5, 5, 5, 4, 5, 5, 5, 5, 4, 5, 5, 5],

    reseñas: [
        {
            puntuacion: 5,
            comentario: "¡La experiencia más increíble! El efecto espejo fue mágico, vale cada centavo del tour.",
            usuario: "Carlos M.",
            fecha: "hace 2 días"
        }
    ],

    promedioCalificaciones: function () {
        if (this.calificaciones.length === 0) {
            return '0.0';
        }
        const suma = this.calificaciones.reduce((acc, cal) => acc + cal, 0);
        return (suma / this.calificaciones.length).toFixed(1);
    },

    aplicarDescuento: function (porcentaje) {
        if (typeof porcentaje !== 'number' || porcentaje < 0 || porcentaje > 100) {
            return this.precioEntrada;
        }
        const descuentoDecimal = porcentaje / 100;
        const nuevoPrecio = this.precioOriginal * (1 - descuentoDecimal);

        this.precioEntrada = nuevoPrecio;
        return nuevoPrecio;
    }
};

function generarEstrellasHTML(puntuacion, isHalf = true) {
    let estrellasHTML = '';
    const valorRedondeado = isHalf ? Math.round(puntuacion * 2) / 2 : Math.floor(puntuacion);

    for (let i = 1; i <= 5; i++) {
        if (valorRedondeado >= i) {
            estrellasHTML += '<i class="fas fa-star"></i>';
        } else if (isHalf && valorRedondeado === i - 0.5) {
            estrellasHTML += '<i class="fas fa-star-half-alt"></i>';
        } else {
            estrellasHTML += '<i class="far fa-star"></i>';
        }
    }
    return estrellasHTML;
}

function renderizarBarrasCalificaciones() {
    const container = document.getElementById('ratingBarsContainer');
    const totalVotos = lugarTuristico.calificaciones.length;

    const conteo = lugarTuristico.calificaciones.reduce((acc, cal) => {
        acc[cal] = (acc[cal] || 0) + 1;
        return acc;
    }, {});

    let barrasHTML = '';
    for (let i = 5; i >= 1; i--) {
        const votos = conteo[i] || 0;
        const porcentaje = totalVotos > 0 ? (votos / totalVotos) * 100 : 0;

        barrasHTML += `
            <div class="bar-row">
                <span>${i}</span>
                <div class="bar-bg">
                    <div class="bar" style="width: ${porcentaje.toFixed(1)}%;"></div>
                </div>
            </div>
        `;
    }
    container.innerHTML = barrasHTML;
}

function renderizarReseñas() {
    const container = document.getElementById('reviewsListContainer');
    let reviewsHTML = '';

    const reseñasOrdenadas = [...lugarTuristico.reseñas].reverse();

    reseñasOrdenadas.forEach(reseña => {
        const estrellasReseña = generarEstrellasHTML(reseña.puntuacion, false);

        reviewsHTML += `
            <div class="review-item">
                <i class="fas fa-user-circle user-icon-fa"></i> 
                <div class="review-content">
                    <p class="user-name">${reseña.usuario} <span class="review-time">${reseña.fecha}</span></p>
                    <div class="review-rating-stars">${estrellasReseña}</div>
                    <p class="review-text">${reseña.comentario || '(Sin comentario)'}</p>
                </div>
            </div>
        `;
    });
    container.innerHTML = reviewsHTML;
}


function renderizarDatos() {
    const promedio = lugarTuristico.promedioCalificaciones();
    const totalVotos = lugarTuristico.calificaciones.length;

    document.getElementById('precioBaseDisplay').innerText = `Bs ${lugarTuristico.precioOriginal.toFixed(2).toLocaleString()}`;
    document.getElementById('horarioDisplay').innerText = lugarTuristico.horario;

    document.getElementById('promedioCalificacionesDisplay').innerText = promedio;
    document.getElementById('calificacion-header').innerText = `${promedio} (${totalVotos.toLocaleString()} reseñas)`;
    document.getElementById('estrellasPromedio').innerHTML = generarEstrellasHTML(parseFloat(promedio), true);

    document.getElementById('precioFinalDisplay').innerText = `Bs ${lugarTuristico.precioEntrada.toFixed(2).toLocaleString()}`;

    renderizarBarrasCalificaciones();
    renderizarReseñas();
}

function manejarPublicarReseña() {
    const reseñaInput = document.getElementById('reseñaInput');
    const mensajeDiv = document.getElementById('mensajePublicacion');

    mensajeDiv.style.display = 'none';

    if (calificacionSeleccionada === 0) {
        mensajeDiv.className = 'mensaje-oculto mensaje-error';
        mensajeDiv.innerText = 'Por favor, selecciona una puntuación antes de publicar.';
        mensajeDiv.style.display = 'block';
        return;
    }

    const nuevoComentario = reseñaInput.value.trim();

    lugarTuristico.calificaciones.push(calificacionSeleccionada);

    lugarTuristico.reseñas.push({
        puntuacion: calificacionSeleccionada,
        comentario: nuevoComentario,
        usuario: "Usuario Anónimo",
        fecha: "justo ahora"
    });

    mensajeDiv.className = 'mensaje-oculto mensaje-success';
    mensajeDiv.innerText = `¡Gracias! Calificación de ${calificacionSeleccionada}/5 y comentario publicado.`;
    mensajeDiv.style.display = 'block';

    calificacionSeleccionada = 0;
    reseñaInput.value = '';
    document.getElementById('starRatingInput').querySelectorAll('i').forEach(star => {
        star.classList.remove('fas');
        star.classList.add('far');
    });

    renderizarDatos();

    setTimeout(() => {
        mensajeDiv.style.display = 'none';
    }, 4000);
}

function manejarGuardarCambios() {
    const selectedRadio = document.querySelector('input[name="tourOption"]:checked');
    if (!selectedRadio) return;

    const nuevoId = parseInt(selectedRadio.value);
    const tourElegido = opcionesDeTour.find(opcion => opcion.id === nuevoId);
    tourSeleccionadoIndex = nuevoId;

    if (tourElegido) {
        lugarTuristico.precioOriginal = tourElegido.precio;
        lugarTuristico.horario = tourElegido.horario;

        const descuentoInput = document.getElementById('descuentoInput');
        const porcentajeActual = parseFloat(descuentoInput.value) || 0;
        lugarTuristico.aplicarDescuento(porcentajeActual);

        renderizarDatos();
    }
}

function manejarAplicarDescuento() {
    const inputElement = document.getElementById('descuentoInput');
    const porcentaje = parseFloat(inputElement.value);
    lugarTuristico.aplicarDescuento(porcentaje);
    renderizarDatos();
}

function manejarInteraccionEstrellas(event) {
    const starInputContainer = document.getElementById('starRatingInput');
    const stars = starInputContainer.querySelectorAll('i');
    const target = event.target.closest('i');
    if (!target) return;

    const valor = parseInt(target.getAttribute('data-value'));

    stars.forEach(star => {
        const starValue = parseInt(star.getAttribute('data-value'));
        if (starValue <= valor) {
            star.classList.remove('far');
            star.classList.add('fas');
        } else {
            star.classList.remove('fas');
            star.classList.add('far');
        }
    });

    if (event.type === 'click') {
        calificacionSeleccionada = valor;
    }
}

function renderizarOpcionesTour() {
    const container = document.getElementById('tourOptionsContainer');
    let optionsHTML = '';

    opcionesDeTour.forEach((opcion) => {
        const isChecked = opcion.id === tourSeleccionadoIndex;
        const className = isChecked ? 'selected' : '';

        optionsHTML += `
            <label class="tour-option-item ${className}">
                <input type="radio" name="tourOption" value="${opcion.id}" ${isChecked ? 'checked' : ''}>
                <div class="tour-details">
                    <div>
                        <div class="tour-name">${opcion.nombre}</div>
                        <div class="tour-duration">${opcion.horario}</div>
                    </div>
                    <span class="tour-price">Bs ${opcion.precio.toFixed(2).toLocaleString()}</span>
                </div>
            </label>
        `;
    });
    container.innerHTML = optionsHTML;

    container.querySelectorAll('input[name="tourOption"]').forEach(radio => {
        radio.addEventListener('change', (event) => {
            container.querySelectorAll('.tour-option-item').forEach(label => {
                label.classList.remove('selected');
            });
            event.target.closest('.tour-option-item').classList.add('selected');
        });
    });
}


document.addEventListener('DOMContentLoaded', () => {
    renderizarOpcionesTour();
    renderizarDatos();

    document.getElementById('guardarCambiosBtn').addEventListener('click', manejarGuardarCambios);
    document.getElementById('aplicarDescuentoBtn').addEventListener('click', manejarAplicarDescuento);

    const starInput = document.getElementById('starRatingInput');
    starInput.addEventListener('click', manejarInteraccionEstrellas);
    starInput.addEventListener('mouseover', manejarInteraccionEstrellas);

    starInput.addEventListener('mouseout', () => {
        const stars = starInput.querySelectorAll('i');
        stars.forEach(star => {
            const starValue = parseInt(star.getAttribute('data-value'));
            if (starValue <= calificacionSeleccionada) {
                star.classList.remove('far');
                star.classList.add('fas');
            } else {
                star.classList.remove('fas');
                star.classList.add('far');
            }
        });
    });

    document.getElementById('publicarReseñaBtn').addEventListener('click', manejarPublicarReseña);
});