<script setup>
import { ref } from 'vue';
import CartList from '../components/CardList.vue';
import pokemonSearch from '../components/PokemonSearch.vue';

console.log("hello");

/** List of pokemons listened by the table */
const pokemon = ref([]);

function updatePokemon(pokemons){
  console.log('updating pokemon');
  pokemon.value = pokemons;
}

</script>

<template>
  <h1>Pokemon List</h1>
  <!--  <SimpleCard :pokemon="ditto"/> -->
  <pokemonSearch
  @search-end="updatePokemon"
  />
  
    <CartList
    :pokemons-names="pokemon"
     />
  

</template>
