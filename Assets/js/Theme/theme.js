export function Theme(){
    const theme = localStorage.getItem('theme')
    theme? 
    (
    ()=>{
    document.body.style.backgroundColor=theme
    
    const article=document.getElementsByClassName('article')
    for (const art in article) {
        if (Object.prototype.hasOwnProperty.call(article, art)) {
            const element = article[art];
            element.style.color = theme=='#444'?'#fff':'#000'
        }
    }
    }
    )()
    :
(
    ()=>{
    document.body.style.backgroundColor='#ffffff'
    const article=document.getElementsByClassName('article')
    for (const art in article) {
        if (Object.prototype.hasOwnProperty.call(article, art)) {
            const element = article[art];
            element.style.color = '#000'
        }
    }
    }
)()
const article = document.getElementById('article-body')
article &&( article.style.color=theme=='#ffffff'?'#333':'#eee')
    return theme
}