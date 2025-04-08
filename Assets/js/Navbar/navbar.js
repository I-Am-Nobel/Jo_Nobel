    import { Theme } from "../Theme/theme.js"
    export function AfficherNavbar(page){
       const navbar = document.querySelector('.NavbarContent')
       navbar.innerHTML=`
       
            <div  class="nav-item  home"><a href="./index.html">
                  <i  
                  ${
                    (()=>{
                        return page=='home'?
                        'class="bi bi-house-fill"': 
                        'class="bi bi-house"'})()
                  } 
                  ></i> Home
               </a></div>
       
            <div class="nav-item  rounded contact"><a href="./apropos.html">
                  <i ${
                    (()=>{
                        return page=='apropos'?
                        'class="bi bi-info-circle-fill"': 
                        'class="bi bi-info-circle"'})()
                  } 
                  
                  ></i> A propos
               </a></div>
               <div style="cursor:pointer;" class="nav-item dropdown">
                  <p  class="nav-link  dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">
                    Theme</p>
                  <div style="z-index:5" class="dropdown-menu">
                    <div><a id="Sombre" class="dropdown-item" href="#">Sombre</a></li>
                    <div><a id="White" class="dropdown-item" href="#">White</a></li>
                  </div>
                </div>
       `
       const White = document.querySelector('#White')
       const Sombre = document.querySelector('#Sombre')
       Sombre.addEventListener('click',e=>{
        e.preventDefault()
        document.body.style.backgroundColor='#444'
        localStorage.setItem('theme','#444')
        Theme()
       })
       White.addEventListener('click',e=>{
        e.preventDefault()
        document.body.style.backgroundColor='#ffffff'
        localStorage.setItem('theme','#ffffff')
        Theme()
       })
    }

