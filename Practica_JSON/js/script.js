const body = document.body;
const title = document.getElementById('main-title');
const overlay = document.getElementById('bg-overlay');

function previewMode(mode) {
    if (mode === 'heroes') {
        body.classList.add('mode-heroes');
        overlay.style.backgroundColor = '#EF4444';
        overlay.style.opacity = '0.1';
        title.innerText = "¡ACCIÓN!";
    } else {
        body.classList.add('mode-places');
        overlay.style.backgroundColor = '#0ea5e9';
        overlay.style.opacity = '0.1';
        title.innerText = "EXPLORA";
    }
}

function resetPreview() {
    body.classList.remove('mode-heroes', 'mode-places');
    overlay.style.opacity = '0';
    title.innerText = "Práctica JSON";
}

function selectMode(mode) {
    body.style.opacity = '0';
    body.style.transform = 'scale(1.1)';
    setTimeout(() => {
        window.location.href = mode === 'heroes' ? 'primera_parte.html' : 'segunda_parte.html';
    }, 500);
}