// Fuente
// https://antonio.laguna.es/snippets/consigue-favicon-dinamico-modo-oscuro/

export default function setAppIcon() {
if ('not-all' === window.matchMedia('(prefers-color-scheme').media) {
    // No hay soporte
    return;
}

// Media Query para Modo Oscuro
const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
// Elementos Links para iconos
const links = document.querySelectorAll('link[rel="icon"]');

// Función para actualizar los iconos
const updateIcon = () => {
    const isDark = mediaQuery.matches;
    const dataKey = isDark ? 'hrefDark' : 'hrefLight';

    Array.prototype.slice.call(links).forEach(link => {
    link.href = link.dataset[dataKey];
    });
};

// Si cambia la media query mientras está visitando, llamamos la función
mediaQuery.addEventListener('change', updateIcon);
updateIcon();
};