/**
* Représente un article sur Grace Hopper et l'invention du premier compilateur
* @returns {Object} Les données de l'article
*/
  export function GraceHopper() {
  const article = {
  aboutAuteur: 'Josué Nobel Musonga, passionné de technologies, d’histoire et d’inventions qui ont changé le monde.',
  ImgSrc: 'https://thafd.bing.com/th/id/OIP.BwUZn6Hwwb-aqh7r6iOoAwHaEY?w=303&h=180&c=7&r=0&o=5&pid=1.7',
  Titre: 'Grace Hopper : la reine du code et des bugs',
  description: "Découvrez l'histoire incroyable de Grace Hopper, la pionnière de la programmation moderne et l'inventrice du tout premier compilateur...",
  url: '/Jo_Nobel/article.html?title=Grace Hopper : la reine du code et des bugs',
  AuteurContact: {
  facebook: 'https://www.facebook.com/JosueNobel',
  github: 'https://www.github.com/i-am-nobel',
  mail: 'mailto:jonobelmusonga@gmail.com',
  number: 243851780126,
  whatsapp: 243851780126,
  },
  category: 'Technologie',
  content:`

# Grace Hopper : la reine du code et des bugs

<div class='d-flex justify-content-center'>
  <img src="https://thafd.bing.com/th/id/OIP.e8r4sxpNTA5o3BUrzLEyQgHaEK?w=328&h=184&c=7&r=0&o=5&pid=1.7" alt="Grace Hopper">
</div>

Quand tu entends le mot "bug" en informatique, tu penses à un petit problème technique, non ? Mais savais-tu que ce mot vient littéralement d'un vrai insecte ? Et que c'est **Grace Hopper**, une brillante mathématicienne de la Navy américaine, qui a popularisé ce terme ? 🐛

Voici une anecdote authentique : en 1947, un ordinateur Mark II tombe en panne. En ouvrant la machine, l'équipe de Hopper trouve... **un papillon coincé entre deux relais**. Il est alors scotché dans le journal de bord avec cette note : *"First actual case of bug being found"*. L’expression était née !

---

## Une pionnière visionnaire

Grace n'était pas seulement une femme brillante à une époque dominée par les hommes, elle était aussi révolutionnaire dans sa façon de penser. Alors que les ordinateurs étaient programmés en langage machine ultra-complexe, elle a eu une idée folle :

> **Et si on écrivait du code en anglais ?**

Tout le monde l'a prise pour une folle. Mais elle a persisté. Et en 1952, elle crée le tout premier **compilateur**, une invention qui permet à un ordinateur de traduire automatiquement un langage humain vers du code machine. Ce sera la naissance de COBOL, un des premiers langages de programmation de haut niveau.

---

## La démo qui a bluffé tout le monde

Lors d'une conférence militaire, on raconte que Hopper sort un rouleau de ruban de 11,8 pouces pour illustrer la distance parcourue par la lumière en une nanoseconde. Elle voulait que les généraux comprennent ce qu'elle voulait dire quand elle disait « il faut optimiser les cycles ! ». Elle distribuait ces bandes de ruban à tous ses étudiants. Sa manière d'expliquer les concepts abstraits était légendaire.

---

## Impact sur notre monde

Aujourd’hui, grâce à Grace Hopper, nous écrivons nos programmes avec Python, JavaScript ou C++, sans même penser à l’hexadécimal. Le compilateur est partout. Et son héritage perdure.

Son surnom ? **"Amazing Grace"**. Elle a servi dans la marine jusqu'à 79 ans et a reçu une médaille présidentielle à titre posthume. Elle est un modèle pour toutes les générations de développeurs et d’ingénieurs.

---

## Sources

* [Smithsonian National Museum of American History](https://americanhistory.si.edu/collections/search/object/nmah_334663)
* [Naval History and Heritage Command](https://www.history.navy.mil/)
* "Grace Hopper and the Invention of the Information Age" par Kurt Beyer

`
};

return article;

}
