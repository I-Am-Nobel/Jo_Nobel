import Data from '../Articles/data.js'
import { Footer } from './footer.js';
const data =Data()
const url = new URL(window.location.href);
const params = new URLSearchParams(url.search);

const title = params.get('title')
let content =`Erreur 404 nous n'avons pas trouvés cette page ! `
let article={}
data.forEach(element => {
    if(element.Titre == title){
        content=element.content;
        article=element
        return ;
    }
});
document.addEventListener('DOMContentLoaded',e=>{
    const LireArticle= document.getElementById('LireArticle')
    const footer=document.querySelector('.footer')
    LireArticle.innerHTML=marked.parse(content.trim());
    footer.innerHTML=Footer(article)
})