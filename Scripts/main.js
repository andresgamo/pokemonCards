// import { fetchData,getData } from "./fetchData";

const url = 'https://pokeapi.co/api/v2';
const grid = document.querySelector('.grid-2');
const navs = document.querySelectorAll('.item');
const numCards = document.querySelector('#num-cards');
const showMoreCards = document.querySelector('input[value="Show more cards"]');
const goUp = document.querySelector('#go-up');
const btnSearch = document.querySelector('.btn-search');
const userInput = document.querySelector('input[type="text"]');

btnSearch.addEventListener('click', search);
userInput.addEventListener('keypress',search);
showMoreCards.addEventListener('click', addCards);
goUp.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
navs.forEach(nav => {
    nav.addEventListener('click', changeNavIdentifier);
});

let offset = 0;

endSectionButtons = [numCards,showMoreCards, goUp];

function displayEndSecButtons (key){
    endSectionButtons.forEach(button => button.style.display = `${key}`);
}

async function search(e) {
  if (e.keyCode == 13 || e.target.type == 'submit') {
    if (userInput.value == "") {
        removeGrid();
        searchByCategory();
    } else {
      removeGrid();
      showCards(await searchByName(userInput.value.toLowerCase()));
      deleteLoadSpiner();
    }
  }
  displayEndSecButtons(key = 'none');
}

async function getPokemonData (filterData, from, to){
    const pokemonData = [];
    let allPokemonData;

    for (let pokemon = from; pokemon <= to; pokemon++) {
        
        if(Array.isArray(filterData)){
            allPokemonData = await fetchData(filterData[pokemon]);
        }else{
            allPokemonData = await fetchData(`${filterData}/${pokemon}`);
        }
        
        getData(pokemonData, allPokemonData);
    }
    return pokemonData;
}

async function getUrl(data){
    const pokemonApis = []
    data.forEach(pokemon => {
        pokemonApis.push(pokemon.pokemon.url)
    });
    return pokemonApis;
}

async function getData(pokemonData, allPokemonData){
    pokemonData.push({
        id: allPokemonData.id,
        name: allPokemonData.species.name,
        img: allPokemonData.sprites.other['official-artwork'].front_default,
        exp: allPokemonData.base_experience,
        hp: allPokemonData.stats[0].base_stat,
    });
}

async function changeNavIdentifier(e){
    document.querySelector('.item-a').classList.replace('item-a','item-b');
    e.target.classList.replace('item-b','item-a');
    offset = 0;
    removeGrid();
    displayEndSecButtons(key = 'none');
    await searchByCategory();
}

async function addCards(){
    showMoreCards.removeEventListener('click', addCards);
    offset += 20;
    await searchByCategory();
    showMoreCards.addEventListener('click', addCards);
}

async function searchByName(name){
    addLoadSpiner();
    const pokemonData = [];
    const path = `pokemon`;
    const endPoint = `${url}/${path}/${name}`;
    const allPokemonData = await fetchData(endPoint);
    if(allPokemonData.length !== 0){
        getData(pokemonData, allPokemonData);
    }
  return pokemonData;
}

async function searchByCategory(from, to) {
  userInput.value = '';
  const cardCategory = document.querySelector(".item-a").textContent;
  addLoadSpiner();
  if (cardCategory == "all") {
    let from = 1 + offset,
      to = 20 + offset;
    const path = `pokemon`;
    const endPoint = `${url}/${path}`;
    const pokemonData = await getPokemonData(endPoint, from, to);
    showCards(pokemonData);
    updateNumCards();
  } else {
    let from = 0 + offset,
      to = 19 + offset;
    const path = "type";
    const endPoint = `${url}/${path}/${cardCategory}`;
    const data = await fetchData(endPoint);
    const filterData = await getUrl(data.pokemon);
    const pokemonData = await getPokemonData(filterData, from, to);
    showCards(pokemonData);
    updateNumCards();
  }
  await deleteLoadSpiner();
  displayEndSecButtons(key = 'block');
}

searchByCategory();
