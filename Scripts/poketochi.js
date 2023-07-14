const url = "https://pokeapi.co/api/v2/pokemon";
let actionStatus = false;
let interval;

pokemon = {
  sleep: 100,
  hunger: 100,
  sprint: 0,
  seniority: 0,
  eating: function () {
    if (pokemon.hunger <= 96) {
      pokemon.sleep -= 2;
      pokemon.hunger += 4;
    }
  },
  sleeping: function () {
    if (pokemon.sleep <= 98) {
      pokemon.sleep += 2;
      pokemon.hunger -= 1;
    }
  },
  coding: function () {
    if (pokemon.sleep >= 0 && pokemon.hunger >= 0) {
      pokemon.sleep -= 4;
      pokemon.hunger -= 6;
      pokemon.sprint += 4;
      pokemon.seniority += 1;
    }
  },
};


function statsUpDate(){
  const sleepValue = document.querySelector(".sleep-percentaje");
  const hungerValue = document.querySelector(".hunger-percentaje");
  const sprint = document.querySelector('.sprint-level');
  const seniority = document.querySelector('.exp-level');
  sleepValue.textContent = pokemon.sleep;
  hungerValue.textContent = pokemon.hunger;
  sprint.style.width = `${pokemon.sprint}%`;
  seniority.style.width = `${pokemon.seniority}%`;
}

function initListeners() {
  console.log(actionStatus);
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

function play(evt) {
  const action = evt.target.attributes.value.textContent;
  actionStatus = true;
  initListeners();
  interval = setInterval(() => actions(action), 1000);
}

function stop() {
  actionStatus = false;
  initListeners();
  clearInterval(interval);
  interval = null;
}

function actions() {
  console.log(action);
  if (action === "sleep") {
    pokemon.sleeping();
  } else if (action === "feed") {
    pokemon.eating();
  } else if (action === "code") {
    pokemon.coding();
  }
  statsUpDate();
}


async function initPokemons(cart) {

  for (let id = 0; id < cart.length; id++) {

    const endPoint = `${url}/${cart[id]}`;
    const allPokemonData = await fetchData(endPoint);
    cart[id] = {
      id: cart[id],
      name: allPokemonData.species.name,
      gif: allPokemonData.sprites.versions["generation-v"]["black-white"].animated.front_default,
    };
    
  }
  return cart;

  // return cart.map(async (id) => {
  //   const endPoint = `${url}/${id}`;

  //   return await fetchData(endPoint);
  // })
}

async function main(characters, id) {
  const pokemonDetail = characters[id];
  const pokemonGif = document.querySelector(".gif-pokemon");
  pokemonGif.src = `${pokemonDetail.gif}`;
}

(async () => {
  initListeners();
  if (sessionStorage.cart) {
    const cart = sessionStorage.cart.split(",");
    const pokemons = await initPokemons(cart);
    main(pokemons, id = 0);
  } else {
    const screen = document.querySelector(".middle");
    screen.innerHTML = `<div class="txt-light">You got no pokémos yet.</div> 
                         <div class="txt-bold">Go catch them all!</div>`;
  }
})();
