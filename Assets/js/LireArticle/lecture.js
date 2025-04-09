import Data from '../Articles/data.js';
import { Footer } from './footer.js';

/**
 * Récupère l'article en fonction du titre dans l'URL
 * @returns {Object} L'article trouvé ou un article d'erreur
 */
function getArticleFromUrl() {
    const DEFAULT_ARTICLE = {
        content: 'Erreur 404 : Cette page n\'a pas été trouvée !',
        Titre: 'Page non trouvée',
        // Autres propriétés par défaut si nécessaires
    };

    try {
        const url = new URL(window.location.href);
        const title = url.searchParams.get('title');

        if (!title) return DEFAULT_ARTICLE;

        const articles = Data();
        const article = articles.find(element => element.Titre === title);
        
        return article || DEFAULT_ARTICLE;
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'article :', error);
        return DEFAULT_ARTICLE;
    }
}

/**
 * Affiche l'article et le footer
 * @param {Object} article - L'article à afficher
 */
function renderArticle(article) {
    try {
        const articleContainer = document.getElementById('LireArticle');
        const footerContainer = document.querySelector('.footer');

        if (!articleContainer || !footerContainer) {
            console.error('Conteneurs non trouvés');
            return;
        }

        // Utilisation de marked avec gestion d'erreur
        try {
            articleContainer.innerHTML = marked.parse(article.content?.trim() || '');
        } catch (parseError) {
            console.error('Erreur lors du parsing Markdown :', parseError);
            articleContainer.innerHTML = '<p>Erreur lors du chargement du contenu</p>';
        }

        footerContainer.innerHTML = Footer(article);
    } catch (error) {
        console.error('Erreur lors du rendu de l\'article :', error);
    }
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    const article = getArticleFromUrl();
    renderArticle(article);
});