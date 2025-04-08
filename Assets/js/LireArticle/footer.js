export function Footer(article) {
    if (!article) {
        return ''
    }
    else {
        return (
            `
                
        <div class="mt-4">
            <div class="mb-4" style="border: 0.1px solid #ccc;" ></div>
            <div class="container-fluid">
                <div class=" container d-flex justify-content-center">
                <h6>
                    <span style="font-weight: bold;" >" ${article.Titre} "</span>
                </h6>
                </div>
                <div class="">
                <i  class="bi bi-info-circle"></i>
                Apropos de l'auteur <i onclick="(()=>{

                const aboutAuthor=document.querySelector('.aboutAuthor')
                const chevron=document.querySelector('.chevron')
            
                if(aboutAuthor.classList.toString().includes('d-block')){
                    aboutAuthor.classList.remove('d-block')
                    aboutAuthor.classList.add('d-none')
                    chevron.classList.remove('bi-chevron-down')
                    chevron.classList.add('bi-chevron-right')
                }
                else{
                    aboutAuthor.classList.remove('d-none')
                    aboutAuthor.classList.add('d-block')
                    chevron.classList.remove('bi-chevron-right')
                    chevron.classList.add('bi-chevron-down')
                }

                }
                )()" style="cursor: pointer;" class="chevron bi bi-chevron-right" ></i>
                <div class="container aboutAuthor d-none">
                    ${article.aboutAuteur}
                </div>
                </div>
                <div class="">
                <i  class="bi bi-telephone"></i>
                Contacts de l'auteur <i onclick="(()=>{

                const social=document.querySelector('.social-media')
                const showContact=document.querySelector('.showContact')
            
                if(social.classList.toString().includes('d-flex')){
                    social.classList.remove('d-flex')
                    social.classList.add('d-none')
                    showContact.classList.remove('bi-chevron-down')
                    showContact.classList.add('bi-chevron-right')
                }
                else{
                    social.classList.remove('d-none')
                    social.classList.add('d-flex')
                    showContact.classList.remove('bi-chevron-right')
                    showContact.classList.add('bi-chevron-down')
                }

                }
                )()" style="cursor: pointer;" class="showContact bi bi-chevron-right" ></i>
            
                <div class="social-media container d-none flex-wrap" >

                    ${
                        article.AuteurContact.facebook ?
                        
           ` <a class="btn btn-link" href=${article.AuteurContact.facebook}  target="_blank">
                <i style="color: blue;" class="bi bi-facebook "></i>
            </a>
            `
            :''

            }
                        ${
           
            article.AuteurContact.instagram ?
            `
            <a class="btn btn-link" href=${article.AuteurContact.instagram} target="_blank">
                <i style="color: rgb(243, 28, 64);" class="bi bi-instagram "></i>
            </a>
            `:''
            }
                        ${article.AuteurContact.mail ?
            `
            <a class="btn btn-link" href=${"mailto:" + article.AuteurContact.mail} >
                <i class="bi bi-envelope "></i>
            </a>
            `:''
            }
                        ${article.AuteurContact.whatsapp ?
            `
            <a class="btn btn-link" href=${"https://wa.me/" + article.AuteurContact.whatsapp.toString()} target="_blank">
                <i style="color: rgb(0, 175, 0);" class="bi bi-whatsapp "></i>
            </a>
            `:''
            }
                        ${article.AuteurContact.x ?
            `
            <a class="btn btn-link" href={"https://wa.me/" + article.AuteurContact.x} target="_blank">
                <i style="color: rgb(0, 134, 175);" class="bi bi-twitter "></i>
            </a>
            `:''
            }
                        ${article.AuteurContact.youtube ?
            `
            <a class="btn btn-link" href={"https://wa.me/" + article.AuteurContact.youtube} target="_blank">
                <i style="color: rgb(145, 11, 1);" class="bi bi-youtube "></i>
            </a>
            `:''
            }
                            ${article.AuteurContact.github ?
            `
            <a class="btn btn-link" href=${"https://wa.me/" + article.AuteurContact.github} target="_blank">
                <i style="color: rgb(15, 15, 15);" class="bi bi-github "></i>
            </a>
            `:''
            }
                            ${article.AuteurContact.site ?
            `
            <a class="btn btn-link" href=${"https://wa.me/" + article.AuteurContact.site} target="_blank">
                <i style="color: rgb(37, 37, 37);" class="bi bi-bag "></i>
            </a>
            `:''
            }
                        ${article.AuteurContact.number ?
            `
            <a class="btn btn-link" href=${"tel:" + article.AuteurContact.number.toString()}>
                <i id="telephone" class="bi bi-phone" style="color: rgb(5, 2, 39);"></i>
            </a>
            `:''
            }
                </div>
                </div>

                <!-- Sources et references -->

            
                <div class="">
                    <i  class="bi bi-info-circle"></i>
                    Sources et references <i onclick="(()=>{
        
                const Sources=document.querySelector('.Sources')
                const chevron=document.querySelector('.chevron-source')
                
                if(Sources.classList.toString().includes('d-block')){
                    Sources.classList.remove('d-block')
                    Sources.classList.add('d-none')
                    chevron.classList.remove('bi-chevron-down')
                    chevron.classList.add('bi-chevron-right')
                }
                else{
                    Sources.classList.remove('d-none')
                    Sources.classList.add('d-block')
                    chevron.classList.remove('bi-chevron-right')
                    chevron.classList.add('bi-chevron-down')
                }
        
                    }
                    )()" style="cursor: pointer;" class="chevron-source bi bi-chevron-right" ></i>
                <div class="container Sources d-none">
                    ${marked.parse(article.sources.trim())}
                </div>

                <!-- Soutenir l'auteur -->
                    ${article.soutenir ?
                  `    
                <div class="">
                <i class="bi bi-info-circle"></i>
                Soutenir l'auteur <i onclick="(()=>{
        
                const Soutenir=document.querySelector('.Soutenir')
                const chevron=document.querySelector('.chevron-Soutenir')
                
                if(Soutenir.classList.toString().includes('d-block')){
                    Soutenir.classList.remove('d-block')
                    Soutenir.classList.add('d-none')
                    chevron.classList.remove('bi-chevron-down')
                    chevron.classList.add('bi-chevron-right')
                }
                else{
                    Soutenir.classList.remove('d-none')
                    Soutenir.classList.add('d-block')
                    chevron.classList.remove('bi-chevron-right')
                    chevron.classList.add('bi-chevron-down')
                }
        
                    }
                    )()" style="cursor: pointer;" class="chevron-Soutenir bi bi-chevron-right" ></i>
                <div class="container Soutenir d-none flex-wrap">

                    <a class="btn btn-link" href={"tel:" + article.AuteurContact.number}>
                        <i id="telephone" class="bi bi-phone " style="color: rgb(5, 2, 39);"></i>
                    </a>

                </div>
            </div>`
            :''
            }
                <!-- fin soutenir auteur -->
        </div>
                `
        )
    }
}