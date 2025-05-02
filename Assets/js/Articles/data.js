/**
 * Importe et retourne tous les articles disponibles
 * @returns {Array} Un tableau contenant tous les articles
 */
export default function Data() {
    // Importation des articles
    const articles = [
        CongoBelge10c(),
        Esp8266(),
        IntelligenceArtificielle(),
        Wifi7(),
        AlanTuringEnigma(),
        GraceHopper()
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
import { AlanTuringEnigma } from './Redaction/Enigma/Enigma.js';
import { Esp8266 } from './Redaction/Esp8266/esp8266.js';
import { GraceHopper } from './Redaction/Hopper/Hopper.js';
import { IntelligenceArtificielle} from './Redaction/IA/IA.js';
import { Wifi7 } from './Redaction/Wifi7/Wifi7.js';
