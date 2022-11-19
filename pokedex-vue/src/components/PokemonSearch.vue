<script setup>
import { typeList, getTypeColor, pokedexInstance } from '../assets/js/utils'
import { ref } from 'vue';

const props = defineProps({
  
});

const emitFunction = defineEmits([
  'searchStart',  // No value are passed
  'searchEnd'     // Value passed: List of pokemon names
]);

const interval = {
  limit: 906
}
const pokemonList = await pokedexInstance.getPokemonsList(interval);

/* Search typed by the user */
const searchTerm = ref('');
/**
 * Build a list of all pokemon starting by a name
 * @param {String} searchTerm The pokemon name typed by the user
 * @return {Array<String>} The list of all pokemon
 */
function buildPokemonList(){
  console.log('searchStart');
  emitFunction('searchStart');

  // Fast pass for the initial array loading
  if(searchTerm.value.length == 0){
    const names = new Array(pokemonList.length);
    for(let i = 0; i < pokemonList.results.length; ++i){
      names[i] = pokemonList.results[i].name;
    }
    emitFunction('searchEnd', names);
    return;
  }

  // Fast pass for id lookup
  let parsedValue = parseInt(searchTerm.value)
  if(!Number.isNaN(parsedValue)){
    if(parsedValue <= 0 || parsedValue >= pokemonList.length){
      emitFunction('searchEnd', []);
      return
    }

    emitFunction('searchEnd', [pokemonList.results[parsedValue - 1].name]);
    return;
  }

  // Normal search, slower
  let lowercaseSearch = searchTerm.value.toLocaleLowerCase();
  const names = [];
  for(const pokemon of pokemonList.results){
    if(pokemon.name.includes(lowercaseSearch)){
      names.push(pokemon.name);
    }
  }
  console.log('searchEnd', names );
  emitFunction('searchEnd', names);
}


// Initial list is always all pokemons
buildPokemonList();
</script>

<template>
<div class="card pokemonSearch">
  <div class="searchBar">
    <form @submit.prevent="buildPokemonList">  
      <label for="pokemon-search">Search across pokemons by name:</label>
      <input v-model="searchTerm" id="pokemon-search" type="search" name="search-pokemon">
      <input type="submit" value="Search">
    </form>
  </div>
</div>
</template>

<style>

.pokemonSearch {
  width: 80%;
  margin: auto;
  margin-bottom: 1.1rem;
}

form {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem
}


</style>