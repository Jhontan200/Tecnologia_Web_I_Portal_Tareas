const ZONAS_HORARIAS_COMPLETAS = [
    'America/New_York', 'America/Chicago', 'America/Denver', 'America/Los_Angeles',
    'America/Vancouver', 'America/Toronto', 'America/Halifax', 'America/St_Johns',
    'America/Mexico_City', 'America/Cancun', 'America/Tijuana', 'America/Monterrey',
    'America/Havana', 'America/Port-au-Prince', 'America/Santo_Domingo',
    'America/Jamaica', 'America/Nassau', 'America/Costa_Rica', 'America/Tegucigalpa',
    'America/Guatemala', 'America/El_Salvador', 'America/Managua', 'America/Panama',
    'America/Bogota', 'America/Lima', 'America/Guayaquil', 'America/Caracas',
    'America/La_Paz', 'America/Santiago', 'America/Argentina/Buenos_Aires',
    'America/Argentina/Cordoba', 'America/Argentina/Mendoza', 'America/Sao_Paulo',
    'America/Rio_Branco', 'America/Recife', 'America/Montevideo', 'America/Asuncion',
    'America/Paramaribo', 'America/Georgetown', 'America/Cayenne', 'America/Puerto_Rico',
    'America/Barbados', 'America/Martinique', 'America/Curacao', 'America/Santo_Domingo',
    'America/Godthab', 'America/Nome', 'America/Anchorage', 'America/Juneau',
    'America/Phoenix', 'America/Indianapolis', 'America/Detroit', 'America/Puerto_Rico',
    'Asia/Tokyo', 'Asia/Shanghai', 'Asia/Hong_Kong', 'Asia/Seoul', 'Asia/Bangkok',
    'Asia/Singapore', 'Asia/Kuala_Lumpur', 'Asia/Jakarta', 'Asia/Manila', 'Asia/Taipei',
    'Asia/Ho_Chi_Minh', 'Asia/Kolkata', 'Asia/Karachi', 'Asia/Dhaka', 'Asia/Riyadh',
    'Asia/Dubai', 'Asia/Tehran', 'Asia/Jerusalem', 'Asia/Beirut', 'Asia/Damascus',
    'Asia/Baghdad', 'Asia/Amman', 'Asia/Yekaterinburg', 'Asia/Vladivostok',
    'Asia/Gaza', 'Asia/Macau', 'Asia/Phnom_Penh', 'Asia/Vientiane',
    'Europe/London', 'Europe/Madrid', 'Europe/Paris', 'Europe/Berlin', 'Europe/Rome',
    'Europe/Zurich', 'Europe/Amsterdam', 'Europe/Copenhagen', 'Europe/Stockholm',
    'Europe/Oslo', 'Europe/Dublin', 'Europe/Lisbon', 'Europe/Athens', 'Europe/Helsinki',
    'Europe/Istanbul', 'Europe/Moscow', 'Europe/Kiev', 'Europe/Warsaw', 'Europe/Prague',
    'Europe/Budapest', 'Europe/Bucharest', 'Europe/Minsk', 'Europe/Vienna',
    'Australia/Sydney', 'Australia/Melbourne', 'Australia/Brisbane', 'Australia/Perth',
    'Australia/Adelaide', 'Pacific/Auckland', 'Pacific/Fiji', 'Pacific/Honolulu',
    'Africa/Cairo', 'Africa/Lagos', 'Africa/Johannesburg', 'Africa/Algiers', 'Africa/Nairobi'
];

let timeZones = [
    { name: 'Ciudad de México, América', zone: 'America/Mexico_City' },
    { name: 'Nueva York, EE. UU.', zone: 'America/New_York' },
    { name: 'Santiago, América', zone: 'America/Santiago' }
];

const timeGrid = document.getElementById('timeGrid');
const openModalCard = document.getElementById('openModalCard');
const zoneModal = document.getElementById('zoneModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const modalSearchInput = document.getElementById('modalSearchInput');
const zoneListContainer = document.getElementById('zoneListContainer');

function formatTime(zone) {
    const now = new Date();

    const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, timeZone: zone };
    const dateOptions = { weekday: 'long', day: 'numeric', month: 'long', timeZone: zone };

    const time = now.toLocaleTimeString('es-ES', timeOptions);
    let date = now.toLocaleDateString('es-ES', dateOptions);

    date = date.replace(/,/, '').split(' de')[0] + ', ' + date.split(' de')[1];

    const timeZoneAbbreviation = now.toLocaleTimeString('en-US', { timeZone: zone, timeZoneName: 'short' }).split(' ')[2] || 'Local';

    return {
        time: time,
        date: date,
        abbr: timeZoneAbbreviation,
        dateTime: now.toLocaleString('en-US', { timeZone: zone })
    };
}

function calculateTimeDifference(zoneDateTime) {
    const nowLocal = new Date();
    const nowRemote = new Date(zoneDateTime);

    const diffMs = nowRemote.getTime() - nowLocal.getTime();
    const diffHours = Math.round(diffMs / (1000 * 60 * 60));

    let diffText = '';
    let diffClass = '';

    if (diffHours > 0) {
        diffText = `+ ${diffHours} hrs`;
        diffClass = 'is-positive-diff';
        if (diffHours >= 12) diffClass += ' is-next-day';
    } else if (diffHours < 0) {
        diffText = `- ${Math.abs(diffHours)} hrs`;
        diffClass = 'is-negative-diff';
        if (diffHours <= -12) diffClass += ' is-prev-day';
    } else {
        diffText = 'Misma hora';
        diffClass = 'is-same-time';
    }

    return { text: diffText, class: diffClass };
}

function updateMainCard() {
    const fecha = new Date();

    const dayOfWeek = fecha.toLocaleDateString('es-ES', { weekday: 'long' });
    const dayOfMonth = fecha.toLocaleDateString('es-ES', { day: 'numeric' });
    const month = fecha.toLocaleDateString('es-ES', { month: 'long' });
    const year = fecha.getFullYear();
    let fechaExtendida = `${dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1)}, ${dayOfMonth} de ${month} ${year}`;

    const horaActual = fecha.toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });

    const timeZoneString = fecha.toLocaleTimeString('en-US', { timeZoneName: 'shortOffset' }).split(' ')[0];
    const timeZoneAbbreviation = fecha.toLocaleTimeString('en-US', { timeZoneName: 'short' }).split(' ')[2] || 'Local';
    const zonaHorariaTexto = `${timeZoneString} ${timeZoneAbbreviation}`;

    document.getElementById('fechaExtendida').innerText = fechaExtendida;
    document.getElementById('horaActual').innerText = horaActual;
    document.getElementById('zonaHoraria').innerText = zonaHorariaTexto;
}

function getDisplayName(ianaZone) {
    const parts = ianaZone.split('/');
    const cityName = parts.pop().replace(/_/g, ' ');
    const regionName = parts.length > 0 ? parts.pop().replace(/_/g, ' ') : '';

    let displayName = cityName;
    if (regionName && regionName !== cityName) {
        displayName = `${cityName}, ${regionName}`;
    }
    return { name: displayName, region: regionName };
}

function renderZones() {
    const staticElements = [
        document.querySelector('.main-card'),
        openModalCard
    ];
    timeGrid.innerHTML = '';
    staticElements.forEach(el => timeGrid.appendChild(el));

    timeZones.forEach((zoneData, index) => {
        const { time, date, abbr, dateTime } = formatTime(zoneData.zone);
        const diff = calculateTimeDifference(dateTime);

        const card = document.createElement('div');
        card.className = 'time-card sub-card';
        card.setAttribute('data-index', index);

        card.innerHTML = `
            <div class="sub-card-header">
                <span class="time-diff ${diff.class.trim()}">${diff.text}</span>
                <i class="fas fa-times close-icon" data-zone-index="${index}"></i>
            </div>
            <h3 class="city-name">${zoneData.name}</h3>
            <p class="sub-date">${date}</p>
            <div class="sub-time-footer">
                <h4 class="sub-time">${time}</h4>
                <span class="sub-timezone">${abbr}</span>
            </div>
        `;
        timeGrid.insertBefore(card, openModalCard);
    });
}

function addZone(ianaZone) {
    if (timeZones.some(z => z.zone === ianaZone)) {
        alert('Esta zona horaria ya está añadida.');
        return;
    }

    try {
        const testDate = new Date().toLocaleTimeString('en-US', { timeZone: ianaZone });
        if (testDate) {
            const { name, region } = getDisplayName(ianaZone);

            let displayName = name;
            if (region && region !== name) {
                displayName = `${name}, ${region}`;
            }

            timeZones.push({
                name: displayName,
                zone: ianaZone
            });

            zoneModal.style.display = 'none';
            modalSearchInput.value = '';
            renderZones();
        }
    } catch (e) {
        alert('Error al procesar la zona horaria. Verifique el formato IANA.');
    }
}

function removeZone(index) {
    timeZones.splice(index, 1);
    renderZones();
}

function renderZoneList(filter = '') {
    zoneListContainer.innerHTML = '';
    const filterLower = filter.toLowerCase();

    ZONAS_HORARIAS_COMPLETAS
        .map(zone => {
            const { name, region } = getDisplayName(zone);
            return {
                iana: zone,
                display: `${name}, ${region}`,
                searchable: `${name} ${region} ${zone}`.toLowerCase()
            };
        })
        .filter(item => item.searchable.includes(filterLower))
        .sort((a, b) => a.display.localeCompare(b.display))
        .forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'zone-item';
            itemElement.setAttribute('data-iana', item.iana);
            itemElement.innerHTML = `
                <span>${item.display}</span>
                <span class="iana-name">${item.iana}</span>
            `;
            zoneListContainer.appendChild(itemElement);
        });
}

function openModal() {
    zoneModal.style.display = 'block';
    renderZoneList();
    modalSearchInput.focus();
}

function closeModal() {
    zoneModal.style.display = 'none';
    modalSearchInput.value = '';
    renderZoneList();
}

document.addEventListener('DOMContentLoaded', () => {
    updateMainCard();
    renderZones();

    setInterval(() => {
        updateMainCard();
        renderZones();
    }, 1000);

    openModalCard.addEventListener('click', openModal);

    closeModalBtn.addEventListener('click', closeModal);
    window.addEventListener('click', (event) => {
        if (event.target === zoneModal) {
            closeModal();
        }
    });

    modalSearchInput.addEventListener('input', (event) => {
        renderZoneList(event.target.value);
    });

    zoneListContainer.addEventListener('click', (event) => {
        let target = event.target;
        while (target !== zoneListContainer && !target.classList.contains('zone-item')) {
            target = target.parentElement;
        }

        if (target && target.classList.contains('zone-item')) {
            const ianaZone = target.getAttribute('data-iana');
            addZone(ianaZone);
        }
    });

    timeGrid.addEventListener('click', (event) => {
        if (event.target.classList.contains('close-icon')) {
            const index = event.target.getAttribute('data-zone-index');
            removeZone(parseInt(index));
        }
    });
});