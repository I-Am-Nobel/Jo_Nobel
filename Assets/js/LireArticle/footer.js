/**
 * Gère le basculement des sections accordéon
 * @param {string} id - L'identifiant de la section
 */
function handleToggle(id) {
    return `(() => {
        const section = document.querySelector('.${id}');
        const chevron = document.querySelector('.chevron-${id}');
        const isVisible = section.classList.contains('d-block');
        
        section.classList.toggle('d-none', isVisible);
        section.classList.toggle('d-block', !isVisible);
        chevron.classList.toggle('bi-chevron-right', isVisible);
        chevron.classList.toggle('bi-chevron-down', !isVisible);
    })()`;
}

/**
 * Génère le HTML pour un lien social
 * @param {Object} contact - Les informations de contact
 * @param {string} platform - La plateforme sociale
 * @param {string} icon - L'icône Bootstrap
 * @param {string} color - La couleur de l'icône
 * @param {string} baseUrl - L'URL de base pour la plateforme
 * @returns {string} Le HTML du lien social
 */
const socialLink = (contact, platform, icon, color, baseUrl = '') => {
    if (!contact[platform]) return '';
    
    const href = baseUrl ? `${baseUrl}${contact[platform]}` : contact[platform];
    return `
        <a class="btn btn-link" href="${href}" target="_blank">
            <i style="color: ${color}" class="bi ${icon}"></i>
        </a>
    `;
};

/**
 * Crée un accordéon pour une section
 * @param {string} id - L'identifiant unique de la section
 * @param {string} icon - L'icône à afficher
 * @param {string} title - Le titre de la section
 * @param {string} content - Le contenu HTML de la section
 * @returns {string} Le HTML de l'accordéon
 */
const createAccordionSection = (id, icon, title, content) => `
    <div class="accordion-section">
        <div class="section-header">
            <i class="bi ${icon}"></i>
            ${title} 
            <i onclick="${handleToggle(id)}" 
               style="cursor: pointer;" 
               class="chevron-${id} bi bi-chevron-right">
            </i>
        </div>
        <div class="container ${id} d-none">
            ${content}
        </div>
    </div>
`;

/**
 * Génère le footer pour un article
 * @param {Object} article - L'article
 * @returns {string} Le HTML du footer
 */
export function Footer(article) {
    if (!article) return '';

    const socialLinks = [
        { platform: 'facebook', icon: 'bi-facebook', color: 'blue' },
        { platform: 'instagram', icon: 'bi-instagram', color: 'rgb(243, 28, 64)' },
        { platform: 'mail', icon: 'bi-envelope', color: 'inherit', baseUrl: 'mailto:' },
        { platform: 'whatsapp', icon: 'bi-whatsapp', color: 'rgb(0, 175, 0)', baseUrl: 'https://wa.me/' },
        { platform: 'x', icon: 'bi-twitter', color: 'rgb(0, 134, 175)' },
        { platform: 'youtube', icon: 'bi-youtube', color: 'rgb(145, 11, 1)' },
        { platform: 'github', icon: 'bi-github', color: 'rgb(15, 15, 15)' },
        { platform: 'site', icon: 'bi-bag', color: 'rgb(37, 37, 37)' },
        { platform: 'number', icon: 'bi-phone', color: 'rgb(5, 2, 39)', baseUrl: 'tel:' }
    ].map(({ platform, icon, color, baseUrl }) => 
        socialLink(article.AuteurContact, platform, icon, color, baseUrl)
    ).join('');

    return `
        <div class="mt-4">
            <div class="mb-4" style="border: 0.1px solid #ccc;"></div>
            <div class="container-fluid">
                <div class="container d-flex justify-content-center">
                    <h6>
                        <span style="font-weight: bold;">"${article.Titre}"</span>
                    </h6>
                </div>
                
                ${createAccordionSection('aboutAuthor', 'bi-person', 'À propos de l\'auteur', article.aboutAuteur)}
                
                ${createAccordionSection('social-media', 'bi-people', 'Contacts de l\'auteur', 
                    `<div class="d-flex flex-wrap">${socialLinks}</div>`
                )}
                
                ${createAccordionSection('Sources', 'bi-journal-text', 'Sources et références', 
                    marked.parse(article.sources.trim())
                )}
                
                ${article.soutenir ? createAccordionSection('Soutenir', 'bi-heart', 'Soutenir l\'auteur',
                    `<div class="d-flex flex-wrap">
                        <a class="btn btn-link" href="tel:${article.AuteurContact.number}">
                            <i class="bi bi-phone" style="color: rgb(5, 2, 39);"></i>
                        </a>
                    </div>`
                ) : ''}
            </div>
        </div>
    `;
}