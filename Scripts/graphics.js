const header = document.querySelector("header");
const footer = document.querySelector("footer");
const section = document.querySelector("section");
const socials = document.querySelectorAll(".socials");
const all = document.getElementsByTagName("*");
const darkMode = document.querySelector("#dark-mode");
const body = document.querySelector("body");

darkMode.addEventListener("click", () => {
  if (sessionStorage.darkMode === "on") {
    sessionStorage.darkMode = "off";
    darkMode.textContent = 'Dark Mode';
  } else {
    sessionStorage.darkMode = "on";
    darkMode.textContent = 'Light Mode';
  }
  toggleTheme();
});

function toggleTheme() {
  header.classList.toggle("dark-1");
  footer.classList.toggle("dark-1");
  section.classList.toggle("dark-2");
  body.classList.toggle("dark-2");
  socials.forEach((element) => element.classList.toggle("dark-2"));

  for (let i = 0; i < all.length; i++) {
      all[i].classList.toggle("dark-txt");
      if(all[i].classList.contains('fa-solid') && window.location.pathname === '/poketochi.html'){
        all[i].classList.toggle("dark-txt");
      }
  }

  if (window.location.pathname === '/buyCard.html') {
    const delimiter = document.querySelector("#delimiter");
    const upCart = document.querySelector(".up-shopping-cart");
    const downCart = document.querySelector(".down-shopping-cart");
    const shoppingCart = document.querySelector(".shopping-cart");
    delimiter.classList.toggle("dark-3");
    upCart.classList.toggle("dark-1");
    upCart.classList.toggle("dark-border");
    downCart.classList.toggle("dark-1");
    downCart.classList.toggle("dark-border");
    shoppingCart.classList.toggle("dark-border");
  }

  if (window.location.pathname === '/poketochi.html') {
    const thead = document.querySelector('thead');
    thead.classList.toggle("dark-2");
  }

}

function upDateTaxesContainer(pokemons){
  const shoppingCart = document.querySelector('.taxes-details');
  shoppingCart.innerHTML = `<div class="txt-4"> Hurraaay! </div>
                            <div class="txt-4"> You catch 1</div> 
                            <div class="txt-4 txt-capitalize"> ${pokemonData[0].name} </div>`;
}

function showCards(pokemons) {
  for (let i = 0; i < pokemons.length; i++) {
    const card = document.createElement("div");
    card.classList.add("main-container");
    card.innerHTML = `<div class="up-container">
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

function showCard(pokemons) {
  for (let i = 0; i < pokemons.length; i++) {
    const card = document.createElement("div");
    card.classList.add("main-container");
    card.innerHTML = `<div class="up-container">
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
  const details = document.querySelector(".card-details");
  const pokemonDetails = pokemons[0];
  for (const [attributeName, attributeValue] of Object.entries(pokemonDetails)) {
    if (attributeName != "img" && attributeName != "gif") {
      const detail = document.createElement("li");
      if (sessionStorage.darkMode === "on") {
        detail.innerHTML = `<span class="txt-1 dark-txt">${attributeName}:</span><span class="txt-2 dark-txt">&nbsp&nbsp${attributeValue}</span>`;
        details.appendChild(detail);
      } else {
        detail.innerHTML = `<span class="txt-1">${attributeName}:</span><span class="txt-2">&nbsp&nbsp${attributeValue}</span>`;
        details.appendChild(detail);
      }
    }
  }
}

function showImg(pokemons) {
  const pokemonDetalis = pokemons[0];
  const centralImagen = document.querySelector("#central-img");
  centralImagen.src = `${pokemonDetalis.img}`;
}

function showCart(pokemons) {
  const pokemonDetails = pokemons[0];
  const pokemonGif = document.querySelector(".gif-pokemon");
  pokemonGif.src = `${pokemonDetails.gif}`;  
}

function addLoadSpiner() {
  const endSection = document.querySelector("#end-section");
  const loadSpiner = document.createElement("div");
  loadSpiner.classList.add("spinner-border");
  loadSpiner.classList.add("text-light");
  endSection.appendChild(loadSpiner);
}

async function deleteLoadSpiner() {
  document.querySelector(".spinner-border").remove();
}

async function removeGrid() {
  const grid = document.querySelector(".grid-2");
  grid.innerHTML = "";
}

function updateNumCards() {
  const cards = document.querySelectorAll(".main-container").length;
  numCards.textContent = `${cards} cards`;
}

(() => {
  if (sessionStorage.darkMode === "on") {
    toggleTheme();
  }
})();
