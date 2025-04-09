import { Theme } from "../Theme/theme.js"

export async function AfficherNavbar(page = '') {
    // Constantes pour les thèmes
    const THEME = {
        DARK: '#444',
        LIGHT: '#ffffff'
    };

    // Configuration des pages pour les icônes
    const PAGE_ICONS = {
        home: {
            active: 'bi-house-fill',
            inactive: 'bi-house'
        },
        apropos: {
            active: 'bi-info-circle-fill',
            inactive: 'bi-info-circle'
        }
    };

    // Fonction helper pour générer la classe d'icône
    const getIconClass = (pageName, currentPage) => {
        const icons = PAGE_ICONS[pageName];
        return icons ? `bi ${currentPage === pageName ? icons.active : icons.inactive}` : '';
    };

    const navbar = document.querySelector('.NavbarContent');
    if (!navbar) return;

    navbar.innerHTML = `
        <div class="nav-item home">
            <a href="./index.html">
                <i class="${getIconClass('home', page)}"></i> Home
            </a>
        </div>
        
        <div class="nav-item rounded contact">
            <a href="./apropos.html">
                <i class="${getIconClass('apropos', page)}"></i> A propos
            </a>
        </div>

        <div style="cursor: pointer;" class="nav-item dropdown">
            <p class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">
                Theme
            </p>
            <div style="z-index: 5" class="dropdown-menu">
                <div><a id="Sombre" class="dropdown-item" href="#">Sombre</a></div>
                <div><a id="White" class="dropdown-item" href="#">White</a></div>
            </div>
        </div>
    `;

    // Gestionnaire de thème
    const handleThemeChange = (theme) => {
        document.body.style.backgroundColor = theme;
        localStorage.setItem('theme', theme);
        Theme();
    };

    // Event listeners
    document.querySelector('#Sombre')?.addEventListener('click', (e) => {
        e.preventDefault();
        handleThemeChange(THEME.DARK);
    });

    document.querySelector('#White')?.addEventListener('click', (e) => {
        e.preventDefault();
        handleThemeChange(THEME.LIGHT);
    });
}