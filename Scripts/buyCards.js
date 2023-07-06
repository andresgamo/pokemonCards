const id = new URLSearchParams(window.location.search).get('pokemon');
const url = 'https://pokeapi.co/api/v2/pokemon';
const grid = document.querySelector('#card-details-container');
const cardSection = document.querySelector('.pokemon-details');
const endPoint = `${url}/${id}`;

async function getData(allPokemonData){
    const pokemonData = [];
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
    const pokemonData = await getData(data);
    showImg(pokemonData);
    showCard(pokemonData);
    showDetails(pokemonData);
    showCart(pokemonData);
    
} main();