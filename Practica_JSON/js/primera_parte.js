let globalHeroesData = [];
const powerIcons = ['bolt', 'compress', 'waves', 'fingerprint', 'fitness_center', 'shield', 'speed', 'all_inclusive', 'whatshot', 'public'];
const requestURL = 'https://raw.githubusercontent.com/Jhontan200/Tecnologia_Web_I_Portal_Tareas/main/Practica_JSON/json/superheroes.json';
const request = new XMLHttpRequest();

request.open("GET", requestURL);
request.responseType = "json";
request.send();

request.onload = function () {
    const superHeroes = request.response;
    globalHeroesData = superHeroes.members;

    populateHeader(superHeroes);
    populateHeroes(superHeroes);
};

request.onerror = function () {
    console.error("Error de conexión al cargar los héroes.");
};

function populateHeader(obj) {
    const myH1 = document.getElementById('squad-name');
    const homeTownSpan = document.getElementById('squad-hometown');
    const formedSpan = document.getElementById('squad-formed');

    if (myH1) myH1.textContent = obj.squadName;
    if (homeTownSpan) homeTownSpan.textContent = obj.homeTown;
    if (formedSpan) formedSpan.textContent = obj.formed;
}

function populateHeroes(obj) {
    const container = document.getElementById('heroes-container');
    container.innerHTML = ''; 

    const heroStyles = [
        { color: 'comic-blue', imagePath: 'imagenes/heroe_1.png', delay: 800 },
        { color: 'comic-purple', imagePath: 'imagenes/heroe_2.png', delay: 1000 },
        { color: 'primary', imagePath: 'imagenes/heroe_3.png', delay: 1200 }
    ];

    obj.members.forEach((hero, index) => {
        const style = heroStyles[index % heroStyles.length];
        const art = document.createElement('article');
        art.className = `group cursor-pointer opacity-0 animate-card-entrance [animation-delay:${style.delay}ms]`;

        art.innerHTML = `
            <div class="bg-white dark:bg-gray-800 border-4 border-black dark:border-white h-full p-6 shadow-comic group-hover:shadow-comic-hover group-hover:-translate-y-2 group-hover:scale-105 group-hover:rotate-1 transition-all duration-300 flex flex-col justify-start relative z-0 group-hover:z-10">
                <div class="w-full h-32 bg-${style.color}/20 dark:bg-${style.color}/10 border-b-4 border-black dark:border-gray-600 mb-6 flex items-center justify-center overflow-hidden relative group-hover:bg-${style.color}/30 transition-colors">
                    <img src="${style.imagePath}" alt="${hero.name}" class="h-full w-auto object-contain transform group-hover:scale-110 group-hover:rotate-1 transition-transform duration-500 p-2" />
                </div>
                <h3 class="font-display text-4xl mb-1 text-black dark:text-white leading-none -skew-x-6 group-hover:text-${style.color} transition-colors">
                    ${hero.name.split(' ')[0]} <br /> 
                    <span class="text-${style.color} group-hover:text-black dark:group-hover:text-white">
                        ${hero.name.split(' ').slice(1).join(' ') || ''}
                    </span>
                </h3>
                <div class="w-full h-1 bg-black dark:bg-white my-4 transition-all duration-500 group-hover:w-1/2"></div>
                <div class="space-y-2 mb-6 flex-grow"> 
                    <p class="text-lg transform translate-x-0 group-hover:translate-x-2 transition-transform duration-300">
                        <span class="font-bold bg-yellow-200 dark:bg-yellow-900 px-1 border border-black dark:border-yellow-500 text-sm uppercase tracking-bold mr-2">Secret ID</span>
                        ${hero.secretIdentity}
                    </p>
                    <p class="text-lg transform translate-x-0 group-hover:translate-x-2 transition-transform duration-300 delay-75">
                        <span class="font-bold bg-yellow-200 dark:bg-yellow-900 px-1 border border-black dark:border-yellow-500 text-sm uppercase tracking-bold mr-2">Age</span>
                        ${hero.age}
                    </p>
                </div>
                <div class="bg-gray-100 dark:bg-gray-700 p-4 border-2 border-dashed border-gray-400 rounded-sm relative transition-all duration-500 min-h-[75px] group-hover:border-primary group-hover:bg-white dark:group-hover:bg-gray-800">
                    <div class="absolute top-4 left-4 bg-white dark:bg-gray-800 px-2 font-display text-primary tracking-widest text-lg z-10">POWERS</div>
                    <div class="opacity-50 group-hover:opacity-100 transition-opacity duration-500 pt-8"> 
                        <ul class="space-y-2 mt-2 max-h-0 overflow-hidden group-hover:max-h-[70rem] transition-all duration-500">
                            ${hero.powers.map(p => `<li class="flex items-center"><span class="material-icons text-primary mr-2 text-sm">bolt</span>${p}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        `;
        art.onclick = () => populateModal(hero, index, style);
        container.appendChild(art);
    });
}

// --- FUNCIONES DEL MODAL Y TOGGLE ---

function togglePowers(btn, list, limit, total) {
    const isExpanded = list.style.maxHeight !== "180px";

    if (isExpanded) {
        list.style.maxHeight = "180px";
        list.style.overflowY = "hidden";
        btn.innerHTML = `<span class="material-icons text-xs mr-1">add</span> SHOW ${total - limit} MORE`;
        btn.classList.replace('bg-primary', 'bg-black');
    } else {
        list.style.maxHeight = list.scrollHeight + "px";
        list.style.overflowY = "visible";
        btn.innerHTML = `<span class="material-icons text-xs mr-1">remove</span> HIDE INFO`;
        btn.classList.replace('bg-black', 'bg-primary');
    }
}

function populateModal(hero, index, style) {
    const modalId = index + 1;
    const LIMIT = 3;

    document.getElementById(`modal-${modalId}-identity`).textContent = hero.secretIdentity;
    document.getElementById(`modal-${modalId}-age`).textContent = hero.age;

    const titleElement = document.getElementById(`modal-${modalId}-title`);
    titleElement.classList.add('pr-16', 'block');

    const nameParts = hero.name.split(' ');
    titleElement.innerHTML = `${nameParts[0]} <span class="text-${style.color}">${nameParts.slice(1).join(' ')}</span>`;

    const roleElement = document.getElementById(`modal-${modalId}-role`);
    const roles = {
        'Molecule Man': 'Team Leader',
        'Madame Uppercut': 'Combat Specialist',
        'Eternal Flame': 'Wildcard'
    };
    roleElement.textContent = roles[hero.name] || 'Team Member';

    const list = document.getElementById(`modal-${modalId}-powers-list`);
    list.innerHTML = '';
    hero.powers.forEach((p, i) => {
        const li = document.createElement('li');
        li.className = 'flex items-center bg-gray-100 dark:bg-gray-700 p-3 border border-gray-300 rounded hover:bg-white dark:hover:bg-gray-600 transition-colors';
        li.innerHTML = `<span class="material-icons text-primary mr-3">${powerIcons[i % powerIcons.length]}</span> ${p}`;
        list.appendChild(li);
    });

    let headerContainer = document.getElementById(`modal-${modalId}-header-container`);
    const powersTitle = document.getElementById(`modal-${modalId}-powers-title`);

    if (!headerContainer) {
        headerContainer = document.createElement('div');
        headerContainer.id = `modal-${modalId}-header-container`;
        headerContainer.className = "flex items-center justify-between mb-4 border-b-2 border-gray-200 dark:border-gray-600 pb-2";
        powersTitle.parentNode.insertBefore(headerContainer, powersTitle);
        headerContainer.appendChild(powersTitle);
    }

    powersTitle.className = `font-display text-xl md:text-2xl text-${style.color}`;

    const oldBtn = document.getElementById(`btn-toggle-${modalId}`);
    if (oldBtn) oldBtn.remove();

    if (hero.powers.length > LIMIT) {
        list.style.maxHeight = "180px";
        list.style.overflowY = "hidden";

        const btn = document.createElement('button');
        btn.id = `btn-toggle-${modalId}`;
        btn.className = "flex items-center px-3 py-1 bg-black text-white font-display text-xs uppercase hover:bg-primary transition-all duration-300 transform -skew-x-12 hover:skew-x-0 italic shadow-sm";
        btn.innerHTML = `<span class="material-icons text-xs mr-1">add</span> SHOW ${hero.powers.length - LIMIT} MORE`;

        btn.onclick = () => togglePowers(btn, list, LIMIT, hero.powers.length);
        headerContainer.appendChild(btn);
    } else {
        list.style.maxHeight = "none";
        list.style.overflowY = "visible";
    }

    const modal = document.getElementById(`modal-${modalId}`);
    modal.classList.remove('opacity-0', 'pointer-events-none');
    modal.querySelector('.modal-panel').classList.replace('scale-90', 'scale-100');
}

function closeModal(id) {
    const modal = document.getElementById(`modal-${id}`);
    modal.classList.add('opacity-0', 'pointer-events-none');
    modal.querySelector('.modal-panel').classList.add('scale-90');
    modal.querySelector('.modal-panel').classList.remove('scale-100');
}