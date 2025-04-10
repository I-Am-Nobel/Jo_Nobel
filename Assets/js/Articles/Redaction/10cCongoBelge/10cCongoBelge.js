/**
 * Représente un article sur la pièce de 10 centimes du Congo belge
 * @returns {Object} Les données de l'article
 */
export function CongoBelge10c() {
    const article = {
        aboutAuteur: 'Josué Nobel Musonga, Etudiant en L3 Genie Informatique et passionné de l\'univers.',
        ImgSrc: 'Assets/js/Articles/Redaction/10cCongoBelge/CongoBelge10c.jpg',
        Titre: 'Pièce de 10 centimes du Congo belge',
        description: "Frappée en **1910**, deux ans seulement après que le Congo soit passé du statut d'**État indépendant du roi Léopold II** à **colonie de la Belgique**...",
        url: 'https://i-am-nobel.github.io/Jo_Nobel/article.html?title=Pièce de 10 centimes du Congo belge',
        AuteurContact: {
            facebook: 'https://www.facebook.com/JosueNobel',
            github: 'https://www.github.com/i-am-nobel',
            mail: 'jonobelmusonga@gmail.com',
            number: 243851780126,
            whatsapp: 243851780126,
        },
        sources: `
---

## Sources

- [Numista – 10 centimes 1910 Congo belge](https://en.numista.com/catalogue/pieces1136.html)
- [NGC Coin Explorer](https://www.ngccoin.com/price-guide/world/belgian-congo-10-centimes-km-18-1910-19287-cuid-33650-duid-98155)
- [CoinQuest – Congo Belgian 10 Centimes 1910](https://coinquest.com/cgi-bin/cq/coins.pl?coin=15971)

---`,
        content: `
# La pièce de 10 centimes du Congo belge (1910)  
*Quand l'histoire coloniale tenait dans le creux d'une main.*
<div class='d-flex justify-content-center'>
<img src="Assets/js/Articles/Redaction/10cCongoBelge/CongoBelge10c.jpg" alt="Pièce de 10 centimes du Congo belge de 1910">
</div>

Il est difficile d'imaginer aujourd'hui ce que pouvait représenter une simple pièce trouée en cupronickel au début du XXe siècle. Et pourtant, en 1910, dans les marchés poussiéreux, les comptoirs administratifs ou les postes militaires du **Congo belge**, cette petite rondelle de métal frappée d'une étoile avait une valeur bien réelle. Elle participait à l'organisation de la vie quotidienne dans une colonie marquée par les grandes transformations imposées par la Belgique.

## Une étoile au cœur de l'Afrique

Frappée en **1910**, deux ans seulement après que le Congo soit passé du statut d'**État indépendant du roi Léopold II** à **colonie de la Belgique**, cette pièce de **10 centimes** est l'un des premiers signes concrets du nouveau pouvoir colonial.

Elle se distingue immédiatement par son **étoile à cinq branches** percée d'un trou central. Ce design n'est pas anodin : l'étoile symbolisait le "rayonnement" de la Belgique sur sa colonie, une métaphore souvent utilisée dans l'idéologie coloniale pour justifier la présence européenne.

Le **trou au centre** permettait d'enfiler plusieurs pièces sur une ficelle ou un bâton pour les transporter facilement — un système encore utilisé dans plusieurs régions d'Afrique et d'Asie à l'époque.

---

## Détails de fabrication

| Caractéristique       | Détail                          |
|------------------------|----------------------------------|
| **Année d'émission**   | 1910                             |
| **Pays**               | Congo belge                     |
| **Valeur faciale**     | 10 centimes                     |
| **Métal**              | Cupronickel (cuivre + nickel)   |
| **Diamètre**           | 22 mm                           |
| **Poids**              | 4 g                             |
| **Tranche**            | Lisse                           |
| **Tirage**             | 5 000 000 exemplaires           |

---

## Une pièce du quotidien… mais pour qui ?

Il est important de noter que, bien que cette pièce circulait au Congo, **elle était surtout destinée aux échanges dans l'économie coloniale contrôlée par les Européens**. Elle servait dans les transactions entre colons, dans l'administration, ou pour le paiement des ouvriers dans les grands travaux et les plantations.

Cependant, **les Congolais n'étaient pas tous familiarisés avec ce type de monnaie**, encore moins avec sa valeur faciale. Le système monétaire colonial se superposait aux économies locales qui fonctionnaient souvent par troc ou avec d'autres types de monnaies (cauris, tissus, outils...).

Malheureusement, **les archives ne donnent pas de données précises sur le pouvoir d'achat de cette pièce à l'époque**. Mais on peut supposer, en se basant sur d'autres colonies, que **10 centimes** permettaient d'acheter de petites denrées locales (un fruit, une boisson, un service ponctuel), sans représenter une somme importante. C'était donc une pièce "de poche", légère, pratique, mais aussi chargée de symboles.

---

## Une pièce, un symbole

Au-delà de sa fonction monétaire, cette pièce représente une époque, une vision du monde, et un rapport de pouvoir. Aujourd'hui, elle fascine **collectionneurs, historiens et passionnés d'Afrique** pour sa forme unique et ce qu'elle raconte de l'histoire coloniale belge.

Avec le temps, elle est devenue un objet de mémoire. Certains y voient un artefact précieux, d'autres un vestige douloureux. Mais une chose est sûre : **elle continue de faire parler d'elle, plus d'un siècle plus tard**.


> Rédigé avec passion par **Josué Nobel Musonga**  
> Pour faire revivre les objets qui racontent l'Afrique.`
    };

    // Validation des champs requis
    const requiredFields = ['Titre', 'content', 'description'];
    for (const field of requiredFields) {
        if (!article[field]) {
            console.error(`Champ requis manquant: ${field}`);
            throw new Error(`Le champ ${field} est requis pour l'article`);
        }
    }

    // Validation des URLs
    const urls = [
        article.ImgSrc,
        article.url,
        article.AuteurContact?.facebook,
        article.AuteurContact?.github,
        article.AuteurContact?.site
    ].filter(Boolean);

    for (const url of urls) {
        try {
            new URL(url, window.location.origin);
        } catch (e) {
            console.warn(`URL potentiellement invalide: ${url}`);
        }
    }

    return article;
}