// Constantes pour les thèmes
const THEME = {
    DARK: '#444',
    LIGHT: '#ffffff',
    TEXT: {
        DARK: '#eee',
        LIGHT: '#333',
        ARTICLE_DARK: '#fff',
        ARTICLE_LIGHT: '#000'
    }
};

/**
 * Applique le thème aux articles
 * @param {HTMLCollection} articles - Collection d'articles
 * @param {string} textColor - Couleur du texte à appliquer
 */
const applyThemeToArticles = (articles, textColor) => {
    Array.from(articles).forEach(article => {
        article.style.color = textColor;
    });
};

/**
 * Gère le thème de l'application
 * @returns {string} Le thème actuel
 */
export function Theme() {
    const theme = localStorage.getItem('theme') || THEME.LIGHT;
    
    // Appliquer le thème au body
    document.body.style.backgroundColor = theme;
    
    // Appliquer le thème aux articles de la liste
    const articles = document.getElementsByClassName('article');
    const articleTextColor = theme === THEME.DARK ? THEME.TEXT.ARTICLE_DARK : THEME.TEXT.ARTICLE_LIGHT;
    applyThemeToArticles(articles, articleTextColor);
    
    // Appliquer le thème au corps de l'article si présent
    const articleBody = document.getElementById('article-body');
    if (articleBody) {
        articleBody.style.color = theme === THEME.LIGHT ? THEME.TEXT.LIGHT : THEME.TEXT.DARK;
    }
    // Appliquer dans apropos si dispo
    const apropos = document.querySelector('.apropos')
    if (apropos) {
        apropos.style.color = theme === THEME.LIGHT ? THEME.TEXT.LIGHT : THEME.TEXT.DARK;
    }
    // appliquer a tout les autres elements dont les classes sont notes ici
    const Elements=  ['share-btn','copier-lien','a','text','i'] 
    Elements.forEach(e=>{
        const elements = document.querySelectorAll('.'+e)
        if(elements.length >0){
            elements.forEach(el=>{
                el.style.color = theme === THEME.LIGHT ? THEME.TEXT.LIGHT : THEME.TEXT.DARK;
            })
        }
    })
    return theme;
}