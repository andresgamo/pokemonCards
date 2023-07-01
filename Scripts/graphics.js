const darkMode = document.querySelector('#dark-mode');
const header = document.querySelector('header');
const footer = document.querySelector('footer');
const section = document.querySelector('section');
const socials = document.querySelectorAll('.socials');

const all = document.getElementsByTagName("*");

darkMode.addEventListener("click", () => {
  if (sessionStorage.darkMode === "off") {
    sessionStorage.darkMode = "on";
  } else {
    sessionStorage.darkMode = "off";
  }
  toggleTheme()
});


function toggleTheme() {
  for (let i = 0; i < all.length; i++) {
    all[i].classList.toggle("dark-txt");
  }
  header.classList.toggle("dark-1");
  footer.classList.toggle("dark-1");
  section.classList.toggle("dark-2");
  socials.forEach(element => element.classList.toggle("dark-2"));
}

function showCards(pokemons){
    for (let i = 0; i < pokemons.length; i++) {
        const card = document.createElement('div');
        card.classList.add('main-container');
        card.innerHTML = 
        
            `<div class="up-container">
                <p>${pokemons[i].name}</p>
                <a href="">${pokemons[i].hp} HP</a>
            </div>
            <div class="img-container">
                <img class="img-pokemon" src="${pokemons[i].img}" alt="${pokemons[i].name}">
            </div>
            <div class="down-container">
                <p>${pokemons[i].exp} exp</p>
                <a href="./buyCard.html?pokemon=${pokemons[i].id}" value="buy"><input type="button" value="Buy"></a>
            </div> `;  
        grid.appendChild(card);    
    }
}

function showCard(pokemons){
    for (let i = 0; i < pokemons.length; i++) {
        const card = document.createElement('div');
        card.classList.add('main-container');
        card.innerHTML = 
        
            `<div class="up-container">
                <p>${pokemons[i].name}</p>
                <a href="">${pokemons[i].hp} HP</a>
            </div>
            <div class="img-container">
                <img class="img-pokemon" src="${pokemons[i].img}" alt="charmander">
            </div>
            <div class="down-container">
                <p>${pokemons[i].exp} exp</p>
                <div id="pokemon-logo"> <img src="./Assets/logo.png" alt="pokémon-logo"></div>
            </div> `;  
        cardSection.appendChild(card);    
    }
}

function showDetails(pokemons) {
  const details = document.querySelector('.card-details');
  const pokemonDetalis = pokemons[0];
  for (const [attributeName,attributeValue] of Object.entries(pokemonDetalis)) {
    if(attributeName != 'img' && attributeName != 'gif'){
        const detail = document.createElement('li');
        detail.innerHTML = `<span class="txt-1">${attributeName}:</span><span class="txt-2">&nbsp&nbsp${attributeValue}</span>`
        details.appendChild(detail);
    }
  }
}

function showImg(pokemons) {
  const pokemonDetalis = pokemons[0];
  const centralImagen = document.querySelector('#central-img');
  centralImagen.src = `${pokemonDetalis.img}`;
}

function addLoadSpiner(){
    const endSection = document.querySelector('#end-section');
    const loadSpiner = document.createElement('div');
    loadSpiner.classList.add('spinner-border');
    loadSpiner.classList.add('text-light');
    endSection.appendChild(loadSpiner);
}

async function deleteLoadSpiner(){
    document.querySelector('.spinner-border').remove();
}

async function removeGrid(){
    const grid = document.querySelector('.grid-2');
    grid.innerHTML = '';
}

function updateNumCards(){
    const cards = document.querySelectorAll('.main-container').length;
    numCards.textContent = `${cards} cards`;
}

(() => {
    if(sessionStorage.darkMode === 'on'){
        toggleTheme();
    }
})()