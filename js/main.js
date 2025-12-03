const BASE_URL = 'https://jhontan200.github.io/';
const REPO_URL = 'https://github.com/Jhontan200/';

const PROJECTS = [
    {
        id: 1,
        title: "Servidor Web",
        status: "Completado",
        date: "02-12-2025",
        category: "Práctica 1",
        pageUrl: `${BASE_URL}Tecnologia_Web_I_Portal_Tareas/`,
        repoUrl: `${REPO_URL}Tecnologia_Web_I_Portal_Tareas`
    },
    {
        id: 2,
        title: "Práctica - CSS",
        status: "Completado",
        date: "03-12-2025",
        category: "Práctica en Clase",
        pageUrl: `${BASE_URL}Tecnologia_Web_I_Portal_Tareas/Pracica_css/practica_css.html`,
        repoUrl: `${REPO_URL}Tecnologia_Web_I_Portal_Tareas/Pracica_css`
    },
    {
        id: 3,
        title: "Práctica JavaScript",
        status: "Pendiente",
        date: "10-12-2025",
        category: "Práctica 2",
        pageUrl: `${BASE_URL}`,
        repoUrl: `${REPO_URL}`
    },
    {
        id: 4,
        title: "Lenguaje de Intercambio JSON",
        status: "Pendiente",
        date: "17-12-2025",
        category: "Práctica 3",
        pageUrl: `${BASE_URL}`,
        repoUrl: `${REPO_URL}`
    },
];

tailwind.config = {
    theme: {
        extend: {
            colors: {
                'primary': 'var(--color-primary)',
                'secondary': 'var(--color-secondary)',
                'bg-dark': 'var(--color-bg-dark)',
                'bg-medium': 'var(--color-bg-medium)',
                'text-light': 'var(--color-text-light)',
            },
            boxShadow: {
                'neon': 'var(--shadow-glow)',
            }
        }
    }
}

function handleInitialLoad() {
    const mainContent = document.getElementById('main-content');

    setTimeout(() => {
        document.body.classList.add('loaded');
        mainContent.classList.remove('hidden');
        animateElementsOnLoad();
    }, 500);
}

function initializeProjects() {
    const list = document.getElementById('project-list');

    const skeletonCount = 4;
    const skeletonHTML = Array.from({ length: skeletonCount }, (_, i) => `
        <div class="futuristic-card p-6 rounded-xl space-y-4 skeleton h-48" data-delay="${1.0 + (i * 0.1)}">
            <div class="h-6 w-3/4 skeleton"></div>
            <div class="h-4 w-1/2 skeleton"></div>
            <div class="h-4 w-full skeleton"></div>
            <div class="h-4 w-5/6 skeleton"></div>
            <div class="h-8 w-full skeleton mt-6"></div> 
        </div>
    `).join('');
    list.innerHTML = skeletonHTML;

    setTimeout(() => {
        const realProjectHTML = PROJECTS.map((p, i) => {
            let statusClass;
            // 1. Lógica de color de estado actualizada
            if (p.status === 'Completado') {
                statusClass = 'text-green-400';
            } else if (p.status === 'En curso') {
                statusClass = 'text-yellow-400 animate-pulse';
            } else if (p.status === 'Pendiente') {
                // Estado Pendiente ahora usa el color secundario (rosa neón)
                statusClass = 'text-secondary';
            } else {
                statusClass = 'text-text-light/50';
            }

            return `
                <div class="futuristic-card p-6 rounded-xl fade-in-up" data-delay="${1.0 + (i * 0.1)}">
                    <h3 class="text-xl font-bold mb-2 neon-text">${p.title}</h3>
                    <p class="text-sm text-text-light/70">${p.category}</p>
                    <p class="mt-4 text-base">Estado: 
                        <span class="${statusClass} font-semibold">
                            ${p.status}
                        </span>
                    </p>
                    <p class="text-sm mt-1 mb-6 text-text-light/50">Fecha Límite: ${p.date}</p>
                    
                    <div class="flex justify-between space-x-3">
                        <a href="${p.pageUrl}" target="_blank"
                            class="action-button flex-1 text-sm text-center !py-2 !px-3">
                            <span class="hidden sm:inline">Ver </span>Página Web
                        </a>
                        <a href="${p.repoUrl}" target="_blank"
                            class="action-button flex-1 text-sm text-center !py-2 !px-3 !bg-transparent !text-primary border border-primary hover:!bg-primary/20">
                            <span class="hidden sm:inline">Ver </span>Repositorio
                        </a>
                    </div>
                </div>
            `;
        }).join('');

        list.innerHTML = realProjectHTML;
        animateElementsOnLoad();

    }, 1500);
}

function animateElementsOnLoad() {
    const elements = document.querySelectorAll('.fade-in-up');
    elements.forEach(el => {
        const delay = parseFloat(el.getAttribute('data-delay')) || 0;
        setTimeout(() => {
            el.classList.add('show');
        }, delay * 1000);
    });
}

window.onload = function () {
    handleInitialLoad();
    initializeProjects();
};