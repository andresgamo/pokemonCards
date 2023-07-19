const url = "https://pokeapi.co/api/v2/pokemon";
let actionStatus = false;
let interval;
let id = 0;

pokemon = {
  sleep: 100,
  hunger: 100,
  sprint: 0,
  seniority: 0,
  eating: function () {
    if (pokemon.hunger <= 96) {
      pokemon.sleep -= 2;
      pokemon.hunger += 4;
    }else{
      pokemon.hunger = 100;
      stop();
    }
  },
  sleeping: function () {
    if (pokemon.sleep <= 98) {
      pokemon.sleep += 2;
      pokemon.hunger -= 1;
    }else{
      pokemon.sleep = 100;
      stop();
    }
  },
  coding: function () {
    if (pokemon.sleep > 0 && pokemon.hunger > 0) {
      pokemon.sleep -= 40;
      pokemon.hunger -= 6;
      pokemon.sprint += 4;
      pokemon.seniority += 1;
    }
  },
  alive: function(){
    return pokemon.sleep > 0 && pokemon.hunger > 0 ?  true: false;
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
  pokemon.sleep < 0 ? pokemon.sleep = 0 : pokemon.hunger = 0;
  statsUpdate();
  const actions = document.querySelector(".buttons-container");
  for (const action of actions.childNodes) {
    action.removeEventListener("click", play);
  };
}

function initListeners() {
  const actions = document.querySelector(".buttons-container");
  const changeCharacterSelector = document.querySelector('.button-selectors');

  changeCharacterSelector.addEventListener('click', changeCharacter);

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

function changeCharacter(evt){
  const assetsQuatinty = JSON.parse(sessionStorage.assets).length;
  const selector = evt.target.attributes.value.textContent;
  if(selector == 'back' && id > 0){
    id -= 1;
  }else if(selector == 'next' && id < (assetsQuatinty-1)){
    id += 1;
  }else if(selector == 'enter'){
    updateCharacter(id);
  }
  updateCharacterContainer(id);
}

function updateCharacterContainer(id = 0){
  const assets = JSON.parse(sessionStorage.assets);
  const name = document.querySelector('.character-name');
  const img = document.querySelector('.img-pokemon');
  img.src = assets[id].img;
  name.textContent = assets[id].name;
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
  initListeners();
  interval = setInterval(() => actions(action), 1000);
}

function stop() {
  actionStatus = false;
  updateAction( null , actionStatus);
  initListeners();
  clearInterval(interval);
  interval = null;
}

function showPokedex(){
  const pokedex = document.querySelector('.pokedex-section');
  pokedex.innerHTML = 
                        `<div class="pokedex">
                        <div class="character-container">
                            <img class="img-fit img-pokemon" src="./assets/QMark.png" alt="pokemon image">
                            <div class="character-name">Who's that Pokémon?</div>
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

function actions(action) {
  if (action === "sleep") {
    pokemon.sleeping();
  } else if (action === "feed") {
    pokemon.eating();
  } else if (action === "code") {
    pokemon.coding();
  }
  pokemon.alive() ? statsUpdate() : endGame();
}

async function updateCharacter(id = 0) {
  const assets = JSON.parse(sessionStorage.assets);
  const pokemonGif = document.querySelector(".gif-pokemon");
  pokemonGif.src = assets[id].gif;
}

(async () => {
  if (sessionStorage.assets) {
    showPokedex();
    updateCharacterContainer();
    updateCharacter();
  } else {
    const screen = document.querySelector(".middle");
    screen.innerHTML = 
    `<div class="txt-light">You got no pokémons yet.</div> 
    <div class="txt-bold">Go catch them all!</div>
    <a href="./marketPlace.html" class="pulse-link">BuyCards</a>`;
  }
  initListeners();
})();
