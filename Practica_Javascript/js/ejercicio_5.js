class Hotel {
    constructor(nombre, ciudad, totalHabitaciones, habitacionesDisponibles, personalActivo = 18, proximosCheckins = 8) {
        this.nombre = nombre;
        this.ciudad = ciudad;
        this.totalHabitaciones = totalHabitaciones;
        this.habitacionesDisponibles = habitacionesDisponibles;
        this.personalActivo = personalActivo;
        this.proximosCheckins = proximosCheckins;
    }

    reservar(cantidad) {
        if (cantidad <= 0 || isNaN(cantidad)) {
            return "Error: La cantidad a reservar debe ser un número positivo.";
        }
        if (cantidad > this.habitacionesDisponibles) {
            return `Error: Solo hay ${this.habitacionesDisponibles} habitaciones disponibles. No se pudo completar la reserva de ${cantidad}.`;
        }
        this.habitacionesDisponibles -= cantidad;
        return `Éxito: Se reservaron ${cantidad} habitaciones. Disponibles restantes: ${this.habitacionesDisponibles}.`;
    }

    liberar(cantidad) {
        if (cantidad <= 0 || isNaN(cantidad)) {
            return "Error: La cantidad a liberar debe ser un número positivo.";
        }

        const habitacionesOcupadas = this.totalHabitaciones - this.habitacionesDisponibles;

        if (cantidad > habitacionesOcupadas) {
            this.habitacionesDisponibles += habitacionesOcupadas;
            if (this.habitacionesDisponibles > this.totalHabitaciones) {
                this.habitacionesDisponibles = this.totalHabitaciones;
            }
            return `Advertencia: Solo hay ${habitacionesOcupadas} habitaciones ocupadas. Se liberaron solo las ocupadas.`;
        }

        this.habitacionesDisponibles += cantidad;
        return `Éxito: Se liberaron ${cantidad} habitaciones. Disponibles totales: ${this.habitacionesDisponibles}.`;
    }

    info() {
        const habitacionesOcupadas = this.totalHabitaciones - this.habitacionesDisponibles;
        const ocupacionPorcentaje = (habitacionesOcupadas / this.totalHabitaciones) * 100;

        const disponiblesClase = this.habitacionesDisponibles < 10 ? 'warning' : 'highlight';
        const ocupacionClase = ocupacionPorcentaje > 85 ? 'warning' : 'info';

        return `
            <p style="font-size: 0.8rem; color: #888; text-align: right;">Generado: ${new Date().toLocaleString()}</p>
            
            <h4 class="reporte-section-title">Información Básica</h4>
            <ul class="reporte-list">
                <li><span class="label-reporte"><i class="fas fa-signature"></i> Nombre del Hotel:</span> <span class="value-reporte">${this.nombre}</span></li>
                <li><span class="label-reporte"><i class="fas fa-city"></i> Ciudad:</span> <span class="value-reporte">${this.ciudad}</span></li>
            </ul>

            <h4 class="reporte-section-title">Ocupación y Disponibilidad</h4>
            <ul class="reporte-list">
                <li><span class="label-reporte"><i class="fas fa-hotel"></i> Total de Habitaciones:</span> <span class="value-reporte info">${this.totalHabitaciones}</span></li>
                <li><span class="label-reporte"><i class="fas fa-bed"></i> Habitaciones Disponibles:</span> <span class="value-reporte ${disponiblesClase}">${this.habitacionesDisponibles}</span></li>
                <li><span class="label-reporte"><i class="fas fa-users-slash"></i> Habitaciones Ocupadas:</span> <span class="value-reporte">${habitacionesOcupadas}</span></li>
                <li><span class="label-reporte"><i class="fas fa-chart-pie"></i> Porcentaje de Ocupación:</span> <span class="value-reporte ${ocupacionClase}">${ocupacionPorcentaje.toFixed(2)}%</span></li>
            </ul>

            <h4 class="reporte-section-title">Estadísticas Operacionales</h4>
            <ul class="reporte-list">
                <li><span class="label-reporte"><i class="fas fa-users"></i> Personal Activo:</span> <span class="value-reporte">${this.personalActivo}</span></li>
                <li><span class="label-reporte"><i class="fas fa-sign-in-alt"></i> Próximos Check-ins (Hoy):</span> <span class="value-reporte warning">${this.proximosCheckins}</span></li>
            </ul>
        `;
    }
}

const grandPlaza = new Hotel("Hotel Palacio de Sal", "Uyuni, Bolivia", 30, 8, 10, 4);

const editModal = document.getElementById('editModal');
const reporteModal = document.getElementById('reporteModal');
const modalMensajeDiv = document.getElementById('modalMensaje');

function mostrarMensaje(element, mensaje, tipo) {
    element.className = `mensaje-oculto mensaje-${tipo}`;
    element.innerText = mensaje;
    element.style.display = 'block';

    setTimeout(() => {
        element.style.display = 'none';
    }, 4000);
}

function renderizarInfoHotel() {
    document.getElementById('habitacionesDisponibles').innerText = grandPlaza.habitacionesDisponibles;
    document.getElementById('totalHabitacionesDisplay').innerText = grandPlaza.totalHabitaciones;

    document.getElementById('hotelNombre').innerText = grandPlaza.nombre;
    document.getElementById('hotelCiudad').innerText = grandPlaza.ciudad;

    const habitacionesOcupadas = grandPlaza.totalHabitaciones - grandPlaza.habitacionesDisponibles;
    const ocupacionPorcentaje = ((habitacionesOcupadas / grandPlaza.totalHabitaciones) * 100).toFixed(0);

    const infoDetailRow = document.getElementById('infoDetailRow');
    infoDetailRow.innerHTML = `
        <div class="info-item kpi-total">
            <span class="info-label">Total Habitaciones</span>
            <span class="info-value"><i class="fas fa-hotel"></i> ${grandPlaza.totalHabitaciones}</span>
        </div>
        <div class="info-item kpi-ocupacion">
            <span class="info-label">Ocupación Actual</span>
            <span class="info-value"><i class="fas fa-chart-pie"></i> ${ocupacionPorcentaje}%</span>
        </div>
        <div class="info-item kpi-personal">
            <span class="info-label">Personal Activo</span>
            <span class="info-value"><i class="fas fa-users"></i> ${grandPlaza.personalActivo}</span>
        </div>
        <div class="info-item kpi-checkins">
            <span class="info-label">Próximos Check-ins</span>
            <span class="info-value"><i class="fas fa-sign-in-alt"></i> ${grandPlaza.proximosCheckins}</span>
        </div>
    `;
}

function abrirModalEdicion() {
    document.getElementById('modalNombre').value = grandPlaza.nombre;
    document.getElementById('modalCiudad').value = grandPlaza.ciudad;
    document.getElementById('modalTotalHabitaciones').value = grandPlaza.totalHabitaciones;
    document.getElementById('modalPersonalActivo').value = grandPlaza.personalActivo;
    document.getElementById('modalProximosCheckins').value = grandPlaza.proximosCheckins;

    modalMensajeDiv.style.display = 'none';
    editModal.classList.remove('hidden-controls');
}

function cerrarModalEdicion() {
    editModal.classList.add('hidden-controls');
}

function abrirModalReporte() {
    const reporteOutput = document.getElementById('reporteOutput');
    reporteOutput.innerHTML = grandPlaza.info();
    reporteModal.classList.remove('hidden-controls');
}

function cerrarModalReporte() {
    reporteModal.classList.add('hidden-controls');
}


function manejarGuardarCambiosModal(e) {
    e.preventDefault();

    const nuevoNombre = document.getElementById('modalNombre').value.trim();
    const nuevaCiudad = document.getElementById('modalCiudad').value.trim();
    const nuevoTotalHabitaciones = parseInt(document.getElementById('modalTotalHabitaciones').value);
    const nuevoPersonalActivo = parseInt(document.getElementById('modalPersonalActivo').value);
    const nuevoProximosCheckins = parseInt(document.getElementById('modalProximosCheckins').value);

    modalMensajeDiv.style.display = 'none';

    if (!nuevoNombre || !nuevaCiudad || isNaN(nuevoTotalHabitaciones) || nuevoTotalHabitaciones <= 0 ||
        isNaN(nuevoPersonalActivo) || nuevoPersonalActivo < 0 || isNaN(nuevoProximosCheckins) || nuevoProximosCheckins < 0) {
        mostrarMensaje(modalMensajeDiv, "Error: Por favor, revise que todos los campos sean válidos y positivos.", 'error');
        return;
    }


    if (grandPlaza.habitacionesDisponibles > nuevoTotalHabitaciones) {
        mostrarMensaje(modalMensajeDiv, `Advertencia: La disponibilidad se ajustará al nuevo total.`, 'warning');
        grandPlaza.habitacionesDisponibles = nuevoTotalHabitaciones;
    }

    grandPlaza.nombre = nuevoNombre;
    grandPlaza.ciudad = nuevaCiudad;
    grandPlaza.totalHabitaciones = nuevoTotalHabitaciones;
    grandPlaza.personalActivo = nuevoPersonalActivo;
    grandPlaza.proximosCheckins = nuevoProximosCheckins;

    mostrarMensaje(modalMensajeDiv, "Datos del hotel actualizados con éxito.", 'success');

    setTimeout(() => {
        cerrarModalEdicion();
        renderizarInfoHotel();
    }, 1500);
}

function manejarReserva() {
    const inputReserva = document.getElementById('cantidadReservar');
    const mensajeDiv = document.getElementById('reservaMensaje');
    const cantidad = parseInt(inputReserva.value);

    mensajeDiv.style.display = 'none';

    const resultado = grandPlaza.reservar(cantidad);

    if (resultado.startsWith("Error")) {
        mostrarMensaje(mensajeDiv, resultado, 'error');
    } else {
        mostrarMensaje(mensajeDiv, resultado, 'success');
        renderizarInfoHotel();
        inputReserva.value = 1;
    }
}

function manejarLiberacion() {
    const inputLiberar = document.getElementById('cantidadLiberar');
    const mensajeDiv = document.getElementById('liberarMensaje');
    const cantidad = parseInt(inputLiberar.value);

    mensajeDiv.style.display = 'none';

    const resultado = grandPlaza.liberar(cantidad);

    if (resultado.startsWith("Error")) {
        mostrarMensaje(mensajeDiv, resultado, 'error');
    } else if (resultado.startsWith("Advertencia")) {
        mostrarMensaje(mensajeDiv, resultado, 'warning');
        renderizarInfoHotel();
        inputLiberar.value = 1;
    }
    else {
        mostrarMensaje(mensajeDiv, resultado, 'success');
        renderizarInfoHotel();
        inputLiberar.value = 1;
    }
}

function manejarMostrarInfoCompleta(e) {
    e.preventDefault();
    abrirModalReporte();
}


function manejarCierreAlHacerClicFuera(e, modalElement) {
    if (e.target === modalElement) {
        modalElement.classList.add('hidden-controls');
    }
}


document.addEventListener('DOMContentLoaded', () => {
    renderizarInfoHotel();

    document.getElementById('editarInfoBtn').addEventListener('click', abrirModalEdicion);
    document.getElementById('closeModalBtn').addEventListener('click', cerrarModalEdicion);
    document.getElementById('cancelarModalBtn').addEventListener('click', cerrarModalEdicion);
    document.getElementById('editHotelForm').addEventListener('submit', manejarGuardarCambiosModal);

    document.getElementById('infoCompletaLink').addEventListener('click', manejarMostrarInfoCompleta);
    document.getElementById('closeReporteModalBtn').addEventListener('click', cerrarModalReporte);
    const cerrarReporteBtn = document.getElementById('cerrarReporteBtn');
    if (cerrarReporteBtn) {
        cerrarReporteBtn.addEventListener('click', cerrarModalReporte);
    }

    editModal.addEventListener('click', (e) => manejarCierreAlHacerClicFuera(e, editModal));
    reporteModal.addEventListener('click', (e) => manejarCierreAlHacerClicFuera(e, reporteModal));

    document.getElementById('confirmarReservaBtn').addEventListener('click', manejarReserva);
    document.getElementById('liberarHabitacionesBtn').addEventListener('click', manejarLiberacion);
});