import Data from './data.js';
import { Theme } from '../Theme/theme.js';
const domaine='https://jonobel.netlify.app/'
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
const createArticleCard = (article, index) => {
    /**
 * fonction pour copier le lien
 * @param {String} url
 */
    const handleCopy = (url) => {
        console.log('Copier...')
        navigator.clipboard.writeText(url);
        const copier = document.querySelector('.copier-lien')
        copier && (copier.innerHTML = 'Lien copié')
        setTimeout(() => {
            copier && (copier.innerHTML = 'Copier Lien')
        }, 1000);
    }
   
    return `
    
                <article id='${index}' class="article article-card">
                    <img loading="lazy" src="${article.ImgSrc}" class="article-image w-100" alt="Article image">
                    <div class="article-content">
                        <h2 class="article-title">${article.Titre}</h2>
                        <p class="article-excerpt">
                            ${marked.parse(article.description.trim())}
                        </p>
                        <div class="d-flex justify-content-between align-items-center">
                            <div  class="read-more">
                                <i class="bi bi-book"></i>
                            <a class='a' href="${article.url.replace(/ /g, '-')}" >Lire la suite</a>
                            </div>
                            

                            
                            <div class="article-actions">
                                <button  class=" copier-lien" data-url="${article.url.replace(/ /g, '-')}">
                                    <i style="font-size: 27px;" class="bi bi-link-45deg"></i>
                                </button>
                                <button class="share-btn" data-index="${index}">
                                    <i style="font-size: 25px;" class="bi bi-share"></i>
                                </button>
                            </div>
                        </div>
                        </div>
                    </div>
                </article>

`;

}
/**
 * Charge les articles dans le conteneur
 * @param {Array} articles - Les articles à afficher
 */
function loadArticles(articles) {
    const container = document.querySelector('.articles-container');

    if (articles.length === 0) {
        container.innerHTML = `
            <div class="d-flex w-75 container text-dark justify-content-center my-4 rounded p-4"
                style="flex-direction: column;
                background: radial-gradient(circle,rgb(112, 112, 112),rgb(173, 173, 173),rgb(151, 151, 151));
                text-align:center;">
                <h4>Oups !</h4> 
                Nous n'avons trouvés aucun article !
            </div>`;
        return;
    }

    container.innerHTML = articles
        .map((article, index) => `
            <div  class="col-md-6 gap-4  col-lg-4">
                ${createArticleCard(article, index)}
            </div>
        `)
        .join('');

    // Ajouter les écouteurs d'événements après injection HTML
    container.querySelectorAll('.copier-lien').forEach(el => {
        const url =domaine + el.getAttribute('data-url');
        el.addEventListener('click', () => {
            navigator.clipboard.writeText(url).then(() => {
                el.innerHTML = '<i style="font-size: 27px;" class="bi bi-check"></i>';
                setTimeout(() => {
                    el.innerHTML = ' <i style="font-size: 27px;" class="bi bi-link-45deg"></i>';
                }, 1000);
            });
        });
    });

    container.querySelectorAll('.share-btn').forEach(el => {
        const index = el.getAttribute('data-index');
        const article = articles[index];
        el.addEventListener('click', () => {
            if (navigator.share) {
                navigator.share({
                    title: article.Titre,
                    text: article.description,
                    url:domaine + article.url.replace(/ /g, '-')
                }).then(() => {
                    console.log("Partagé !");
                }).catch(err => {
                    console.error("Erreur partage :", err);
                });
            } else {
                console.log("Partage non supporté");
            }
        });
    });

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
/**
 * Fonction pour filtrer les categories
 * @param value
 */
function filterCategory(value) {
    if (value === 'all') {
        state.currentData = [...state.allData];
    } else {
        state.currentData = state.allData.filter(article => article.category === value);
    }
    resetPagination();
    updateArticlesDisplay();
}
// Construire le filtre
function BuildFilter() {
    document.querySelector('.filtreDiv').innerHTML = `
     
      <form class="filtre d-flex w-75 align-items-center" role="search">
        <label class=" d-flex me-2 mb-0" for="categorySelect"><i style="font-size:30px" class="bi bi-filter i"></i></label>
        <select class="form-select custom-select" id="categorySelect">
            <option value="all">Toutes</option>
            <option value="Technologie">Technologie</option>
            <option value="art">Art</option>
            <option value="Histoire">Histoire</option>
            <option value="science">Science</option>
           
        </select>
      </form>
       <p style="text-align:center" class="mt-2 text">Explorez une variété de sujets passionnants et enrichissants.</p>
    `;
    // Attache l'événement après l'injection HTML
    document.getElementById('categorySelect').addEventListener('change', function () {
        filterCategory(this.value);
    });
}

// Initialisation
buildPagination();
updateArticlesDisplay();
BuildFilter();