const id = new URLSearchParams(window.location.search).get('pokemon');
const url = 'https://pokeapi.co/api/v2/pokemon';
const grid = document.querySelector('#card-details-container');
const cardSection = document.querySelector('.pokemon-details');
const endPoint = `${url}/${id}`;

let pokemonData = [];

const buyButton = document.querySelector('input[value=Buy]');

buyButton.addEventListener('click', addToCart);

function addToCart() {

  const currentData = pokemonData[0];

  if (sessionStorage.assets) {
    const assetsData = JSON.parse(sessionStorage.assets);
    if(!assetsData.find(asset => asset.id === currentData.id)){
      assetsData.push(currentData);
      sessionStorage.setItem("assets", JSON.stringify(assetsData));
    }
  } else {
    sessionStorage.setItem("assets", JSON.stringify([currentData]));
  }
  upDateTaxesContainer(pokemonData);
}

async function getData(allPokemonData){
    pokemonData.push({
        id: allPokemonData.id,
        name: allPokemonData.species.name,
        height: allPokemonData.height,
        weight: allPokemonData.weight,
        ability: extract(allPokemonData.abilities, 'ability'),
        types: extract(allPokemonData.types, 'type'),
        img: allPokemonData.sprites.other['official-artwork'].front_default,
        exp: allPokemonData.base_experience,
        hp: allPokemonData.stats[0].base_stat,
        gif: allPokemonData.sprites.versions['generation-v']['black-white'].animated.front_default,
    });
    return pokemonData; 
}

function extract(elements, categoryName){
    const categoryCompiled = []
    elements.forEach(element => {
        categoryCompiled.push(`&nbsp${element[categoryName].name}`)
    });
    return categoryCompiled;
}



async function main (){
    const data = await fetchData(endPoint);
    pokemonData = await getData(data);
    showImg(pokemonData);
    showCard(pokemonData);
    showDetails(pokemonData);
    showCart(pokemonData);
} main();