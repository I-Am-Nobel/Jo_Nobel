/**
 * Importe et retourne tous les articles disponibles
 * @returns {Array} Un tableau contenant tous les articles
 */
export default function Data() {
    // Importation des articles
    const articles = [
        CongoBelge10c()
    ];
    
    // Validation des articles
    articles.forEach(article => {
        if (!article.Titre || !article.content) {
            console.warn(`Article invalide détecté: ${JSON.stringify(article)}`);
        }
    });
    
    return articles;
}

// Import des articles
import { CongoBelge10c } from './Redaction/10cCongoBelge/10cCongoBelge.js';