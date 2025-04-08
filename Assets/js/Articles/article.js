import Data from './data.js'
import { Theme } from '../Theme/theme.js';
const AlData = Data(); // Récupération des données
let Datas = [...AlData]; // Clonage pour éviter de modifier les données originales

// Variables de pagination
let pageAct = 1; // Page actuellement active
let firstPage = 1;
let pagesNbr = Math.ceil(Datas.length / 10); // Nombre total de pages
let Articles = Datas.slice(0, 10); // Premiers articles affichés
let SearchResult = [];
let notFound = false;

// Fonction debounce pour optimiser la recherche
const debounce = (fn, delay) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn(...args), delay);
    };
};

// Chargement des articles
function LoadData(Articles) {
    console.log('Chargé', Articles.length);
    const ArticlesContainer = document.querySelector('.articles-container');
    ArticlesContainer.innerHTML = ''; // Effacer le contenu précédent

    if (Articles.length === 0) {
        ArticlesContainer.innerHTML = `
            <div class="d-flex text-dark justify-content-center my-4 rounded p-4"
                style="flex-direction: column;
                background: radial-gradient(circle,rgb(112, 112, 112),rgb(173, 173, 173),rgb(151, 151, 151));
                text-align:center;">
                <h4>Oups !</h4> 
                Aucun livre ne correspond aux critères de recherche. Vérifiez l'orthographe !
            </div>`;
        return;
    }

    Articles.forEach((article, index) => {
        const ArticleBoucle = document.createElement("div");
        ArticleBoucle.classList.add("article");
        ArticleBoucle.innerHTML = `
             <div id='${index}' class="cards articles m-2 p-2">
                <h5 style="text-align: center;">${article.Titre}</h5>
                <img class="img-fluid w-100" loading="lazy" src="${article.ImgSrc}" alt="">
                <p >
                    ${marked.parse(article.description.trim())}
                </p>
                <div class="p-2 commande my-2 rounded" style="text-align: center;">
                <a style="text-decoration: none; color: #fff; font-weight: bold; " href='${article.url}'>
                    <i class="bi bi-book"></i>
                    Explorer
                </a>
                </div>
            </div>
        `;
        ArticlesContainer.appendChild(ArticleBoucle);
        Theme()
    });
}

// Fonction pour afficher les données en fonction de la page
const ShowData = () => {
    Articles = Datas.slice((pageAct - 1) * 10, pageAct * 10);
    LoadData(Articles);
};

// Gestion de la recherche avec `debounce`
document.getElementById('Rechercher').oninput = debounce((e) => {
    let searchData = e.target.value.trim().toLowerCase();
    // console.log('searchData', searchData);

    if (!searchData) {
        // Recherche vide => réinitialisation
        SearchResult = [];
        Datas = [...AlData]; // Recharger toutes les données
        notFound = false;
        pageAct = 1;
    } else {
        SearchResult = AlData.filter(art => art.Titre.toLowerCase().includes(searchData));
        notFound = SearchResult.length === 0;
        Datas = SearchResult;
    }

    pagesNbr = Math.ceil(Datas.length / 10);
    resetPagination();
}, 300);

// Fonction pour construire la pagination
const BuildPagination = () => {
    const pagination = document.getElementById('pagination');
    if (pagesNbr <= 1 || notFound) {
        pagination.innerHTML = ''; // Cacher la pagination si 404 ou une seule page
        return;
    }

    let paginationHTML = `<div class="m-0 border-0"><nav><ul class="pagination">`;

    if (firstPage > 1) {
        paginationHTML += `<li class="page-item"><a id="Prev" class="page-link" style="cursor:pointer;">&laquo;</a></li>`;
    }

    for (let i = firstPage; i <= Math.min(pagesNbr, firstPage + 4); i++) {
        paginationHTML += `<li class="page-item">
            <a id="page${i}" class="page-link ${pageAct === i ? 'activePage' : ''}" style="cursor:pointer;">${i}</a>
        </li>`;
    }

    if (pagesNbr > firstPage + 4) {
        paginationHTML += `<li class="page-item"><a id="Next" class="page-link" style="cursor:pointer;">&raquo;</a></li>`;
    }

    paginationHTML += `</ul></nav></div>`;
    pagination.innerHTML = paginationHTML;
};

// Reset de la pagination
const resetPagination = () => {
    pageAct = 1;
    firstPage = 1;
    BuildPagination();
    ShowData();
};

// Gestion des événements de pagination avec `event delegation`
document.getElementById('pagination').addEventListener('click', (e) => {
    if (e.target.classList.contains("page-link")) {
        if (e.target.id === "Next") {
            firstPage += 5;
        } else if (e.target.id === "Prev") {
            firstPage -= 5;
        } else {
            pageAct = parseInt(e.target.textContent);
            document.querySelector('.livreTITRE')?.click(); // Retourner en haut
        }
        BuildPagination();
        ShowData();
        // 
    }
});

// Gestion des commandes WhatsApp avec `event delegation`
document.querySelector('.articles-container').addEventListener('click', (e) => {
    if (e.target.closest(".whatsappMsg")) {
        const button = e.target.closest(".whatsappMsg");
        const numero = button.getAttribute("data-numero");
        const message = button.getAttribute("data-message");
        const url = `https://wa.me/${numero}?text=${encodeURIComponent(message)}`;
        window.open(url, "_blank");
    }
});

// Initialisation
BuildPagination();
ShowData();
