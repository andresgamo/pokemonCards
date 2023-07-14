async function fetchData (endPoint){
    try {
      const response = await fetch(endPoint);
      const data = await response.json();
      return data;
    } catch (error) {
      deleteLoadSpiner();
      console.error(error);
    } 
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

// export {fetchData,getData}