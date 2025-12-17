function loadData() {
    const requestURL = 'https://raw.githubusercontent.com/Jhontan200/Prueba_JSON/main/json/lugar_turistico.json';
    const request = new XMLHttpRequest();
    request.open("GET", requestURL);
    request.responseType = "json";
    request.send();
    request.onload = function () {
        if (request.status === 200) {
            const data = request.response;
            if (data) {
                updateDOM(data);
            }
        }
    };
}

function updateDOM(data) {
    document.getElementById('page-title').textContent = data.Lugar;
    document.getElementById('header-title').textContent = data.Lugar.replace('Especial ', '');
    document.getElementById('hero-title').innerHTML = 'Reserva Especial de<br /><span class="text-primary bg-clip-text">Ankarana</span>';
    const descParts = data.Descripcion.split('. La Reserva');
    const heroDesc = descParts[0] + '.';
    document.getElementById('hero-description').textContent = heroDesc;
    const overviewDesc = document.getElementById('overview-description');
    const overviewText = 'La Reserva' + descParts[1];
    const overviewParts = overviewText.split('. Bajo la roca');
    overviewDesc.innerHTML = `<p>${overviewParts[0]}.</p><p>Bajo la roca${overviewParts[1]}</p>`;
    document.getElementById('extension').textContent = data.Extension.split(' ')[0];
    document.getElementById('red-de-cuevas').textContent = data.RedDeCuevas.split(' ')[0];
    const ubiParts = data.Ubicacion.split(' (');
    document.getElementById('ubicacion').textContent = ubiParts[0];
    document.getElementById('coordenadas').textContent = ubiParts[1].replace(')', '');
    const maravillasContainer = document.getElementById('maravillas');
    const maravillasColors = ['amber', 'blue', 'green', 'purple'];
    const maravillasIcons = ['pets', 'water_drop', 'volcano', 'temple_hindu'];
    const maravillasDarkBg = ['amber-900/30', 'blue-900/30', 'green-900/30', 'purple-900/10'];
    const maravillasText = ['amber-600 dark:text-amber-400', 'blue-600 dark:text-blue-400', 'green-600 dark:text-green-400', 'purple-600 dark:text-purple-400'];
    maravillasContainer.innerHTML = '';
    data.Maravillas.forEach((m, index) => {
        let div;
        if (index < 3) {
            const colSpan = index === 0 ? 'md:col-span-2' : '';
            const titleSize = index === 0 ? 'text-xl mb-2' : 'text-lg mb-1';
            div = document.createElement('div');
            div.className = `flex flex-col gap-4 p-6 rounded-2xl bg-surface-light dark:bg-surface-dark border border-slate-200 dark:border-slate-700 hover:border-primary/50 hover:shadow-lg transition-all duration-300 group ${colSpan}`;
            div.innerHTML = `<div class="size-12 rounded-full bg-${maravillasColors[index]}-100 dark:bg-${maravillasDarkBg[index]} flex items-center justify-center text-${maravillasText[index]} mb-2 group-hover:scale-110 transition-transform"><span class="material-symbols-outlined">${maravillasIcons[index]}</span></div><div><h3 class="${titleSize} font-bold text-[#111418] dark:text-white">${m.Titulo}</h3><p class="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">${m.Descripcion}</p></div>`;
        } else {
            div = document.createElement('div');
            div.className = 'flex flex-col gap-4 p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-white dark:from-purple-900/10 dark:to-surface-dark border border-purple-100 dark:border-slate-700 hover:border-purple-300 dark:hover:border-purple-500/50 hover:shadow-lg transition-all duration-300 group md:col-span-4';
            div.innerHTML = `<div class="flex flex-col md:flex-row items-start md:items-center gap-6"><div class="size-14 rounded-full bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center text-purple-600 dark:text-purple-400 shrink-0 group-hover:scale-110 transition-transform shadow-sm"><span class="material-symbols-outlined text-2xl">${maravillasIcons[index]}</span></div><div class="flex-1"><h3 class="text-xl font-bold text-[#111418] dark:text-white mb-2">${m.Titulo}</h3><p class="text-slate-600 dark:text-slate-400 text-sm leading-relaxed max-w-3xl">${m.Descripcion}</p></div></div>`;
        }
        maravillasContainer.appendChild(div);
    });
    const actividadesContainer = document.getElementById('actividades');
    const actividadesIcons = ['landscape', 'flashlight_on', 'visibility'];
    actividadesContainer.innerHTML = '';
    data.Actividades.forEach((a, index) => {
        const div = document.createElement('div');
        div.className = 'group relative overflow-hidden rounded-2xl bg-surface-light dark:bg-surface-dark border border-slate-200 dark:border-slate-700 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer p-6 flex flex-col items-center text-center gap-4';
        div.innerHTML = `<div class="size-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300"><span class="material-symbols-outlined text-3xl">${actividadesIcons[index]}</span></div><h4 class="text-lg font-bold text-[#111418] dark:text-white">${a.Titulo}</h4><p class="text-sm text-slate-500 dark:text-slate-400">${a.Descripcion}</p>`;
        actividadesContainer.appendChild(div);
    });
    const gastronomiaContainer = document.getElementById('gastronomia');
    gastronomiaContainer.innerHTML = '';
    data.Gastronomia.forEach(g => {
        const div = document.createElement('div');
        div.className = 'flex gap-4 group rounded-xl p-2 hover:bg-white dark:hover:bg-slate-800 transition-colors';
        div.innerHTML = `<div class="w-32 h-32 shrink-0 rounded-lg overflow-hidden"><div class="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-500" data-alt="${g.Alt}" style='background-image: url("${g.Imagen}");'></div></div><div class="flex flex-col justify-center"><h4 class="font-bold text-lg text-[#111418] dark:text-white mb-1 group-hover:text-primary transition-colors">${g.Titulo}</h4><p class="text-sm text-slate-600 dark:text-slate-400">${g.Descripcion}</p></div>`;
        gastronomiaContainer.appendChild(div);
    });
    const tarifasContainer = document.getElementById('tarifas');
    tarifasContainer.innerHTML = `<div class="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-700/50"><span class="text-slate-600 dark:text-slate-400 text-sm">Entrada Parque</span><span class="font-bold text-[#111418] dark:text-white">${data.Tarifas.EntradaParque}</span></div><div class="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-700/50"><span class="text-slate-600 dark:text-slate-400 text-sm">Guía (Día)</span><span class="font-bold text-[#111418] dark:text-white">${data.Tarifas.GuiaDia}</span></div><p class="text-xs text-slate-400 mt-1 italic">${data.Tarifas.Nota}</p>`;
    const horariosContainer = document.getElementById('horarios-clima');
    horariosContainer.innerHTML = `<div><span class="text-xs uppercase tracking-wider text-slate-400 font-bold">Horario</span><p class="font-medium text-[#111418] dark:text-white">${data.Horarios}</p></div><div><span class="text-xs uppercase tracking-wider text-slate-400 font-bold">Mejor Época</span><p class="font-medium text-[#111418] dark:text-white">${data.MejorEpoca}</p></div><div><span class="text-xs uppercase tracking-wider text-slate-400 font-bold">Nota</span><p class="font-medium text-[#111418] dark:text-white">${data.NotaClima}</p></div>`;
    const requisitosContainer = document.getElementById('requisitos');
    requisitosContainer.innerHTML = '';
    data.Requisitos.forEach(r => {
        const div = document.createElement('div');
        div.className = 'flex items-center gap-3 p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50';
        div.innerHTML = `<span class="material-symbols-outlined text-sm text-green-500">check_circle</span><span class="text-sm font-medium text-[#111418] dark:text-white">${r}</span>`;
        requisitosContainer.appendChild(div);
    });
    const fadyContainer = document.getElementById('cultura-fady');
    fadyContainer.innerHTML = `<div class="flex items-start gap-4"><div class="size-12 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0"><span class="material-symbols-outlined">lightbulb</span></div><div><h4 class="font-bold text-lg text-[#111418] dark:text-white mb-1">Cultura 'Fady' (Tabú)</h4><p class="text-sm text-slate-600 dark:text-slate-400 max-w-lg">${data.CulturaFady}</p></div></div><a href="https://www.antropologiainuit.com/wp-content/uploads/2021/11/xpmd01-viaje-antropoloxxgico-madagascar.pdf" target="_blank" class="w-full md:w-auto"><button class="w-full md:w-auto px-8 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-all duration-300 shadow-lg shadow-primary/20 hover:shadow-primary/40 whitespace-nowrap">Descargar Mapa PDF</button></a>`;
    document.getElementById('footer').textContent = data.Footer;
    document.getElementById('footer-title').textContent = data.Lugar;
    document.getElementById('hero-bg').style.backgroundImage = `url(${data.Imagenes[0].URL})`;
    document.getElementById('tsingy-bg').style.backgroundImage = `url(${data.Imagenes[1].URL})`;
    document.getElementById('map-bg').style.backgroundImage = `url(${data.Imagenes[2].URL})`;

    document.getElementById('map-card-container').innerHTML = `
        <div class="size-14 rounded-lg bg-primary/20 flex items-center justify-center text-primary shrink-0">
            <span class="material-symbols-outlined text-2xl">map</span>
        </div>
        <div class="flex-1">
            <h3 class="font-bold text-[#111418] dark:text-white text-lg">Ambilobe</h3>
            <p class="text-sm text-slate-500 dark:text-slate-400">Población base (30km sur)</p>
        </div>
        <a href="https://maps.google.com/?q=Ankarana+Special+Reserve" target="_blank">
            <button class="size-10 rounded-full bg-primary flex items-center justify-center text-white hover:bg-primary-dark shadow-lg shadow-primary/30 transition-all hover:scale-110">
                <span class="material-symbols-outlined">near_me</span>
            </button>
        </a>`;
}

loadData();

const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const htmlElement = document.documentElement;
if (localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    htmlElement.classList.add('dark');
    themeIcon.textContent = 'light_mode';
} else {
    htmlElement.classList.remove('dark');
    themeIcon.textContent = 'dark_mode';
}
themeToggle.addEventListener('click', () => {
    htmlElement.classList.toggle('dark');
    if (htmlElement.classList.contains('dark')) {
        localStorage.setItem('theme', 'dark');
        themeIcon.textContent = 'light_mode';
    } else {
        localStorage.setItem('theme', 'light');
        themeIcon.textContent = 'dark_mode';
    }
});

const menuBtn = document.getElementById('menu-btn');
const closeBtn = document.getElementById('close-menu');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = mobileMenu.querySelectorAll('a');
function toggleMenu() {
    mobileMenu.classList.toggle('translate-x-full');
}
menuBtn.addEventListener('click', toggleMenu);
closeBtn.addEventListener('click', toggleMenu);
mobileLinks.forEach(link => {
    link.addEventListener('click', toggleMenu);
});