const url = 'https://pokeapi.co/api/v2';
const grid = document.querySelector('.grid-2');
const navs = document.querySelectorAll('.item');
const numCards = document.querySelector('#num-cards');
let offset = 0;

document.querySelector('input[value="Show more cards"]').addEventListener('click', addCards);
document.querySelector('#go-up').addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
navs.forEach(nav => {
    nav.addEventListener('click', changeNavIdentifier);
});

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
    await main();
}

async function addCards(){
    offset += 20;
    await main();
}

async function main(from, to) {
  const cardCategory = document.querySelector('.item-a').textContent;
  addLoadSpiner();
  if (cardCategory == 'all') {
    let from = 1 + offset, to = 20 + offset;
    const path = `pokemon`;
    const endPoint = `${url}/${path}`
    const pokemonData = await getPokemonData(endPoint, from, to);
    showCards(pokemonData);
    updateNumCards();
  } else {
    let from = 0 + offset, to = 19 + offset;
    const path = 'type';
    const endPoint = `${url}/${path}/${cardCategory}`;
    const data = await fetchData(endPoint);
    const filterData = await getUrl(data.pokemon);
    const pokemonData = await getPokemonData(filterData, from, to);
    showCards(pokemonData);
    updateNumCards();
  }
  await deleteLoadSpiner();
}

main();
