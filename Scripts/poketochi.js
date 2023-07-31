const url = "https://pokeapi.co/api/v2/pokemon";
let actionStatus = false;
let interval;
let id;

let pokemon = {
  sleep: 100,
  hunger: 100,
  sprint: 0,
  seniority: 0,
  medals: 0,
  gif: 0,
  eating: function () {
    if (pokemon.hunger <= 96) {
      pokemon.sleep -= 2;
      pokemon.hunger += 4;
    } else {
      pokemon.hunger = 100;
      stop();
    }
  },
  sleeping: function () {
    if (pokemon.sleep <= 98) {
      pokemon.sleep += 2;
      pokemon.hunger -= 1;
    } else {
      pokemon.sleep = 100;
      stop();
    }
  },
  coding: function () {
    if (pokemon.sleep > 0 && pokemon.hunger > 0) {
      pokemon.sleep -= 4;
      pokemon.hunger -= 6;
      pokemon.sprint += 50;
      if(pokemon.medals < 8){
        pokemon.seniority += 1;
      }
    }
  },
  alive: function () {
    return pokemon.sleep > 0 && pokemon.hunger > 0 ? true : false;
  },
  getMedals: function (){
     for (const gif of document.querySelectorAll('td > img')) {
          if(gif.src == pokemon.gif){
            return gif.parentElement.nextElementSibling.nextElementSibling.nextElementSibling.childElementCount;
          };
     };
  },
  sprintEnd: function(){
    return pokemon.sprint >= 100 ? true : false;
  },
  init: function () {
    this.sleep = 100;
    this.hunger = 100;
    this.sprint = 0;
    this.medals = pokemon.getMedals();
  },
};

function statsUpdate(){
  const sleepValue = document.querySelector(".sleep-percentaje");
  const hungerValue = document.querySelector(".hunger-percentaje");
  const sprint = document.querySelector('.sprint-level');
  const seniority = document.querySelector('.exp-level');
  sleepValue.textContent = pokemon.sleep;
  hungerValue.textContent = pokemon.hunger;
  sprint.style.width = `${pokemon.sprint}%`;
  seniority.style.width = `${pokemon.seniority}%`;
}

function endGame(){
  stop();
  pokemon.sleep < 0 ? (pokemon.sleep = 0) : (pokemon.hunger = 0);
  statsUpdate();
  const actions = document.querySelector(".buttons-container");
  for (const action of actions.childNodes) {
    action.removeEventListener("click", play);
  }
  const screen = document.querySelector(".middle");
  screen.innerHTML = `  <div class="txt-screen">
                        <img class="gif-pokemon" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/129.gif" alt="pokemon gif">
                          <p class="txt-bold">Game Over!</p>
                        </div>
                        <div class="icon-container">
                          <i class="fa-solid fa-bed fa-lg"></i>
                          <i class="fa-solid fa-laptop fa-lg"></i>
                          <i class="fa-solid fa-utensils fa-lg"></i>
                        </div>`;
}

function initPoketochiListeners() {
  const actions = document.querySelector(".buttons-container");

  for (const action of actions.childNodes) {
    if (actionStatus) {
      action.removeEventListener("click", play);
      action.addEventListener("click", stop);
    } else {
      action.addEventListener("click", play);
      action.removeEventListener("click", stop);
    }
  }
}

function initPokedexListeners(){
  const changeCharacterSelector = document.querySelector('.button-selectors');
  changeCharacterSelector.addEventListener('click', changeCharacter);

  const detalis = document.querySelector('.character-name');
  

  detalis.addEventListener('click', () => {
    closeDetailsContainer();
    const close = document.querySelector('.close');
    close.addEventListener('click', closeDetailsContainer);
  });
}

function closeDetailsContainer() {
  const detailsContainer = document.querySelector('.modal-polygon');
  detailsContainer.classList.toggle('display-block');
};

function changeCharacter(evt){
  const assetsQuatinty = JSON.parse(sessionStorage.assets).length;
  const selector = evt.target.attributes.value.textContent;
  if(selector == 'back' && id < (assetsQuatinty-1)){
    id += 1;
  }else if(selector == 'next' && id > 0){
    id -= 1;
  }else if(selector == 'enter'){
    initPoketochi();
  }
  updateCharacterContainer();
}

function updateCharacterContainer(){
  const assets = JSON.parse(sessionStorage.assets);
  const name = document.querySelector('.character-name');
  const img = document.querySelector('.img-pokemon');
  img.src = assets[id].img;
  name.textContent = assets[id].name;
  updateDetailsContainer(assets);
 
}

function updateDetailsContainer(pokemons) {
  const details = document.querySelector(".card-details");
  details.innerHTML = '';
  const pokemonDetails = pokemons[id];
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

function updateAction(action, actionStatus){
  if(actionStatus){
    if(action == 'code'){
      const codeIcon = document.querySelector('.fa-laptop');
      codeIcon.classList.toggle('icon-active');
    }else if(action == 'sleep'){
      const codeIcon = document.querySelector('.fa-bed');
      codeIcon.classList.toggle('icon-active');
    }else{
      const codeIcon = document.querySelector('.fa-utensils');
      codeIcon.classList.toggle('icon-active');
    }
  }else{
    const iconActive = document.querySelector('.icon-active');
    iconActive.classList.remove('icon-active');
  }
}

function play(evt) {
  const action = evt.target.attributes.value.textContent;
  actionStatus = true;
  updateAction(action, actionStatus);
  initPoketochiListeners();
  interval = setInterval(() => actions(action), 1000);
}

function stop() {
  actionStatus = false;
  updateAction( null , actionStatus);
  initPoketochiListeners();
  clearInterval(interval);
  interval = null;
}

function showPokedex(){
  const pokedex = document.querySelector('.pokedex-section');
  pokedex.innerHTML = 
                        `<div class="modal-polygon">
                            <div class="modal">
                                <span class="close">&times;</span>
                                <ul class="card-details"></ul>
                            </div>
                          </div>
                          <div class="pokedex">
                              <div class="character-container">
                                  <img class="img-fit img-pokemon" src="./assets/QMark.png" alt="pokemon image">
                                  <button class="character-name">Who's that Pokémon?</button>
                              </div>
                              <div class="button-selectors">
                                  <div class="btn-left prev-character" value="back">
                                      <i class="fa fa-backward txt-light" value="back"></i>
                                  </div>
                                  <div class="btn-enter">
                                    <img class="img-fit" value="enter" src="./assets/Poké_Ball_icon.svg.png" alt="pokeball">
                                  </div>
                                  <div class="btn-right next-character" value="next">
                                      <i class="fa fa-forward txt-bold" value="next"></i>
                                  </div>
                              </div>
                          </div>`
      }

function updateTableStandings(){
  const assets = JSON.parse(sessionStorage.assets);
  const tableStandings = document.querySelector('.table-standings');
  const tableHeader = document.querySelector('thead');

  tableHeader.innerHTML = ` <tr>
                              <th colspan="4" class="txt-center main-header">Pokétochi League standings</th>
                            </tr>
                            <tr>
                              <th id="col-1"></th>
                              <th id="col-2">Id</th>
                              <th id="col-3">Name</th>
                              <th id="col-4">Sprints</th>
                            </tr>`;
  assets.forEach(pokemon => {
    const tableRow = document.createElement('tr');
    tableRow.innerHTML = 
                          ` <td><img class="img-fit" src="${pokemon.gif}" alt=""></td>
                            <td>${pokemon.id}</td>
                            <td class="txt-capitalize">${pokemon.name}</td>
                            <td class="flex td-medal"></td>`;
    tableStandings.appendChild(tableRow);
  });
}

function actions(action) {
  if (action === "sleep") {
    pokemon.sleeping();
  } else if (action === "feed") {
    pokemon.eating();
  } else if (action === "code") {
    pokemon.coding();
  }
  pokemon.alive() ? statsUpdate() : endGame();
  if(pokemon.sprintEnd()){
    pokemon.sprint = 100;
    stop();
    statsUpdate();
    updateMedals();
    statsUpdate();
  };
}

function updateMedals(){
  const medals = [
    '<img class="img-fit img-medal" src="./assets/cascade.png" alt="Cascade Badge">',
    '<img class="img-fit img-medal" src="./assets/boulder.png" alt="boulder badge">',
    '<img class="img-fit img-medal" src="./assets/earth.png" alt="Cascade Badge">',
    '<img class="img-fit img-medal" src="./assets/volcano.png" alt="boulder badge">',
    '<img class="img-fit img-medal" src="./assets/soul.png" alt="Cascade Badge">',
    '<img class="img-fit img-medal" src="./assets/rainbaow.png" alt="boulder badge">',
    '<img class="img-fit img-medal" src="./assets/marsh.png" alt="Cascade Badge">',
    '<img class="img-fit img-medal" src="./assets/thunder.png" alt="boulder badge">',
  ];
  if(pokemon.medals < 8){
    for (const gif of document.querySelectorAll("td > img")) {
      if (gif.src == pokemon.gif) {
        gif.parentElement.nextElementSibling.nextElementSibling.nextElementSibling.insertAdjacentHTML('beforeend',medals[pokemon.medals]);
      };
    };
    pokemon.medals += 1;
  }
  pokemon.init();
}

function updateCharacter() {
  const assets = JSON.parse(sessionStorage.assets);
  const screen = document.querySelector('.middle');
  screen.innerHTML = 
                      ` <img class="gif-pokemon" src="${assets[id].gif}" alt="pokemon gif">
                        <div class="icon-container">
                          <i class="fa-solid fa-bed fa-lg"></i>
                          <i class="fa-solid fa-laptop fa-lg"></i>
                          <i class="fa-solid fa-utensils fa-lg"></i>
                        </div>`;
  pokemon.gif = assets[id].gif;
}

function initPoketochi(){
  updateCharacter();
  initPoketochiListeners();
  pokemon.init();
  statsUpdate()
}

(async () => {
  if (sessionStorage.assets) {
    id = JSON.parse(sessionStorage.assets).length - 1;
    showPokedex();
    updateCharacterContainer();
    initPokedexListeners();
    updateTableStandings();
  } else {
    const screen = document.querySelector(".middle");
    screen.innerHTML = 
    `<div class="txt-light">You got no pokémons yet.</div> 
    <div class="txt-bold">Go catch them all!</div>
    <a href="./marketPlace.html" class="pulse-link">BuyCards</a>`;
  }
  
})();
