import Data from './data.js';
import { Theme } from '../Theme/theme.js';

// Configuration
const ARTICLES_PER_PAGE = 10;
const SEARCH_DEBOUNCE_DELAY = 300;

// État de l'application
const state = {
    allData: Data(),
    currentData: [...Data()],
    currentPage: 1,
    firstPageInView: 1,
    searchResults: [],
    notFound: false
};

/**
 * Crée une carte d'article
 * @param {Object} article - Les données de l'article
 * @param {number} index - L'index de l'article
 * @returns {string} HTML de la carte
 */
const createArticleCard = (article, index) => `
    <div id='${index}' class="cards articles m-2 p-2">
        <h5 style="text-align: center;">${article.Titre}</h5>
        <img class="img-fluid w-100" loading="lazy" src="${article.ImgSrc}" alt="">
        <p>${marked.parse(article.description.trim())}</p>
        <div class="p-2 commande my-2 rounded" style="text-align: center;">
            <a style="text-decoration: none; color: #fff; font-weight: bold;" href='${article.url}'>
                <i class="bi bi-book"></i>
                Explorer
            </a>
        </div>
    </div>
`;

/**
 * Charge les articles dans le conteneur
 * @param {Array} articles - Les articles à afficher
 */
function loadArticles(articles) {
    const container = document.querySelector('.articles-container');
    
    if (articles.length === 0) {
        container.innerHTML = `
            <div class="d-flex text-dark justify-content-center my-4 rounded p-4"
                style="flex-direction: column;
                background: radial-gradient(circle,rgb(112, 112, 112),rgb(173, 173, 173),rgb(151, 151, 151));
                text-align:center;">
                <h4>Oups !</h4> 
                Aucun article trouvé, vérifiez l'orthographe !
            </div>`;
        return;
    }

    container.innerHTML = articles
        .map((article, index) => `
            <div class="article">
                ${createArticleCard(article, index)}
            </div>
        `)
        .join('');

    Theme();
}

/**
 * Met à jour l'affichage des articles
 */
function updateArticlesDisplay() {
    const startIndex = (state.currentPage - 1) * ARTICLES_PER_PAGE;
    const endIndex = startIndex + ARTICLES_PER_PAGE;
    const articlesToShow = state.currentData.slice(startIndex, endIndex);
    loadArticles(articlesToShow);
}

/**
 * Construit la pagination
 */
function buildPagination() {
    const totalPages = Math.ceil(state.currentData.length / ARTICLES_PER_PAGE);
    const pagination = document.getElementById('pagination');

    if (totalPages <= 1 || state.notFound) {
        pagination.innerHTML = '';
        return;
    }

    const pages = Array.from(
        { length: Math.min(5, totalPages - state.firstPageInView + 1) },
        (_, i) => state.firstPageInView + i
    );

    pagination.innerHTML = `
        <div class="m-0 border-0">
            <nav>
                <ul class="pagination">
                    ${state.firstPageInView > 1 ? 
                        '<li class="page-item"><a id="Prev" class="page-link" style="cursor:pointer;">&laquo;</a></li>' 
                        : ''
                    }
                    ${pages.map(page => `
                        <li class="page-item">
                            <a id="page${page}" 
                               class="page-link ${state.currentPage === page ? 'activePage' : ''}" 
                               style="cursor:pointer;">
                                ${page}
                            </a>
                        </li>
                    `).join('')}
                    ${totalPages > state.firstPageInView + 4 ?
                        '<li class="page-item"><a id="Next" class="page-link" style="cursor:pointer;">&raquo;</a></li>'
                        : ''
                    }
                </ul>
            </nav>
        </div>
    `;
}

/**
 * Réinitialise la pagination
 */
function resetPagination() {
    state.currentPage = 1;
    state.firstPageInView = 1;
    buildPagination();
    updateArticlesDisplay();
}

/**
 * Gère la recherche d'articles
 * @param {string} searchTerm - Le terme de recherche
 */
const handleSearch = debounce((searchTerm) => {
    searchTerm = searchTerm.trim().toLowerCase();

    if (!searchTerm) {
        state.searchResults = [];
        state.currentData = [...state.allData];
        state.notFound = false;
        state.currentPage = 1;
    } else {
        state.searchResults = state.allData.filter(
            article => article.Titre.toLowerCase().includes(searchTerm)
        );
        state.notFound = state.searchResults.length === 0;
        state.currentData = state.searchResults;
    }

    resetPagination();
}, SEARCH_DEBOUNCE_DELAY);

// Event Listeners
document.getElementById('Rechercher').addEventListener('input', 
    (e) => handleSearch(e.target.value)
);

document.getElementById('pagination').addEventListener('click', (e) => {
    if (!e.target.classList.contains('page-link')) return;

    if (e.target.id === 'Next') {
        state.firstPageInView += 5;
    } else if (e.target.id === 'Prev') {
        state.firstPageInView -= 5;
    } else {
        state.currentPage = parseInt(e.target.textContent);
        document.querySelector('.livreTITRE')?.click();
    }

    buildPagination();
    updateArticlesDisplay();
});

document.querySelector('.articles-container').addEventListener('click', (e) => {
    const whatsappButton = e.target.closest('.whatsappMsg');
    if (!whatsappButton) return;

    const { numero, message } = whatsappButton.dataset;
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
});

// Fonction utilitaire debounce
function debounce(fn, delay) {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn(...args), delay);
    };
}

// Initialisation
buildPagination();
updateArticlesDisplay();