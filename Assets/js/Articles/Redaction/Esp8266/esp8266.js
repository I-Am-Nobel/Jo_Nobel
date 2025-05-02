/**
 * Représente un article sur la pièce de 10 centimes du Congo belge
 * @returns {Object} Les données de l'article
 */
export function Esp8266() {
    const article = {
        aboutAuteur: 'Josué Nobel Musonga, Etudiant en L3 Genie Informatique et passionné de l\'univers.',
        ImgSrc: 'Assets/js/Articles/Redaction/Esp8266/1744255247888.jpg',
        Titre: 'Contrôler une LED à distance avec un ESP8266 et une interface',
        description: "Dans ce tutoriel, nous allons apprendre à contrôler une LED (ou tout autre appareil électrique via un relais) à distance grâce à un ESP8266...",
        url: '/Jo_Nobel/article.html?title=Contrôler une LED à distance avec un ESP8266 et une interface',
        AuteurContact: {
            facebook: 'https://www.facebook.com/JosueNobel',
            github: 'https://www.github.com/i-am-nobel',
            mail: 'jonobelmusonga@gmail.com',
            number: 243851780126,
            whatsapp: 243851780126,
        },
        category: 'Technologie',
        content: `
# Contrôler une LED à distance avec un ESP8266 et une interface web simple

<div class='d-flex justify-content-center'>
  <img src="Assets/js/Articles/Redaction/Esp8266/1744255247888.jpg" alt="illustration">
</div>


 As-tu déjà rêvé de contrôler une lampe avec ton téléphone ? Ce tutoriel va te montrer qu’avec un simple microcontrôleur, un peu de code, et une LED, tu peux créer **ta propre interface web pour interagir avec le monde réel**.  
C’est la base de la **domotique**, et crois-moi, ça ouvre des portes incroyables.

Ce projet est **ultra accessible**, même si tu débutes en électronique ou en Arduino.  
Branche ton câble USB, ouvre l’IDE Arduino, et c’est parti 🔥

---

## Objectif du tutoriel

Dans ce tutoriel, tu vas apprendre à :

- Câbler une LED à un ESP8266
- Écrire le code Arduino pour créer un mini serveur web
- Contrôler la LED depuis ton navigateur
- Comprendre le fonctionnement d'une interface web minimaliste

---

## Matériel nécessaire

- Une carte ESP8266 (NodeMCU ou Wemos D1 Mini par exemple)
- Une LED
- Une résistance 220Ω
- Des fils Dupont
- (Facultatif) Un module relais pour des charges 220V
- Un ordinateur avec l’Arduino IDE installé
- Une connexion Wi-Fi (même celui de ton téléphone marche !)

💡 **Astuce :** Tu peux tout tester même sans relais, juste avec la LED pour t’amuser sans danger.

---

## Étape 1 : Câblage

- La **patte longue (anode)** de la LED va sur **D1 (GPIO5)**.
- La **patte courte (cathode)** va à la masse **(GND)** à travers une résistance de 220Ω.

💡 **Si tu veux contrôler une lampe 220V**, remplace la LED par un **module relais**. Le code reste identique.

---

## Étape 2 : Code Arduino

⚙️ **Configuration de l’IDE** :

1. Dans Arduino IDE, va dans \`Fichier > Préférences\`, puis ajoute cette URL dans le champ “URL de gestionnaire de cartes supplémentaires” :
\`\`\`
https://arduino.esp8266.com/stable/package_esp8266com_index.json
\`\`\`
2. Ensuite, va dans \`Outils > Type de carte > Gestionnaire de cartes\`, cherche "ESP8266" et installe le.

Voici le code complet à téléverser dans ton ESP8266 :

<button 
style="cursor:pointer;"
onclick="(()=>{console.log('Comment ca va?' ,document.getElementById('code-esp'));
navigator.clipboard.writeText(document.querySelector('.language-cpp') .innerText);
})()">
📋 Copier le code
</button>
<span id="code-esp">

\`\`\`cpp
#include <ESP8266WiFi.h>

const char* ssid = "TON_SSID"; // Ton Wi-Fi
const char* password = "TON_MOT_DE_PASSE"; // Ton mot de passe

WiFiServer server(80); // Port HTTP
int ledPin = 5; // GPIO5 (D1)

void setup() {
  Serial.begin(115200);
  pinMode(ledPin, OUTPUT);
  digitalWrite(ledPin, LOW);

  WiFi.begin(ssid, password);
  Serial.print("Connexion au Wi-Fi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nConnecté !");
  Serial.print("Adresse IP : ");
  Serial.println(WiFi.localIP());

  server.begin();
}

void loop() {
  WiFiClient client = server.available();
  if (client) {
    String request = client.readStringUntil('\r');
    client.flush();

    if (request.indexOf("/ON") != -1) {
      digitalWrite(ledPin, HIGH);
    }
    if (request.indexOf("/OFF") != -1) {
      digitalWrite(ledPin, LOW);
    }

    // Interface HTML simple
    client.println("HTTP/1.1 200 OK");
    client.println("Content-Type: text/html");
    client.println();
    client.println("<!DOCTYPE html><html><head><meta charset='UTF-8'><title>Contrôle LED</title>");
    client.println("<style>body{font-family:sans-serif;text-align:center;padding:40px;}button{padding:10px 20px;margin:10px;font-size:18px;}</style>");
    client.println("</head><body>");
    client.println("<h1>Contrôle LED</h1>");
    client.println("<button onclick=\"location.href='/ON'\">Allumer</button>");
    client.println("<button onclick=\"location.href='/OFF'\">Éteindre</button>");
    client.println("</body></html>");
    delay(1);
    client.stop();
  }
}
\`\`\`

</span>

---

## Étape 3 : Obtenir l’IP de ton ESP8266

1. Ouvre le **Moniteur Série** (🔍 en haut à droite de l'IDE).
2. Régle la vitesse sur **115200 bauds**.
3. Note l'adresse IP affichée après “Adresse IP : ...”

⚠️ Cette IP change selon ton réseau. Note-la bien, elle permet d'accéder à ton interface web.

**Ce que tu devrait voir dans le moniteur serie :**
<div class='d-flex justify-content-center'>
<img src="Assets/js/Articles/Redaction/Esp8266/Capture.PNG" alt="MoniteurSerie">
</div>

---

## Étape 4 : Accès via navigateur

Une fois l’adresse IP notée, entre-la dans ton navigateur comme ceci :

\`\`\`
http://192.168.1.xxx/
\`\`\`

Tu verras une petite interface avec deux boutons : **Allumer** et **Éteindre** 🎉  
Assure-toi que ton téléphone ou ton PC est **sur le même Wi-Fi** que l’ESP8266.

---

## 🎮 Démo interactive (simulation)

<div style="border:1px solid #ccc;padding:20px;text-align:center"> 
  <h2>Contrôle LED</h2> 
  <button onclick="alert('💡 LED simulée allumée')">Allumer</button> 
  <button onclick="alert('💤 LED simulée éteinte')">Éteindre</button> 
</div>

---

## 💡 Et après ?

Ce projet n’est qu’un début ! Voici des idées d’évolutions :

- Ajouter une interface plus stylée (avec Bootstrap ?)
- Contrôler plusieurs LEDs ou relais
- Créer un dashboard mobile
- Ajouter un mot de passe pour sécuriser l'accès
- Envoyer les données à un serveur (si tu veux plus tard ajouter un backend)

---

## 🤝 En cas de besoin…

Si tu bloques à une étape, ou que tu veux en savoir plus, **tu peux me contacter directement en privé**.  
Je réponds toujours avec plaisir aux passionnés (:


💥 Merci d’avoir suivi ce tutoriel. À très bientôt pour un nouveau projet sur le blog !

`
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