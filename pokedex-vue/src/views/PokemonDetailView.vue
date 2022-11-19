
<script setup>
import { watch, ref } from 'vue';
import { useRoute } from 'vue-router';
import { pokedexInstance } from '../assets/js/utils';
import PokemonDescriptionVue from '../components/PokemonDescription.vue';
import PokemonStatsVue from '../components/PokemonStats.vue';
import SimpleCardVue from '../components/SimpleCard.vue';
import PokemonDetailsVue from '../components/PokemonDetails.vue';
import ClassBadgeVue from '../components/ClassBadge.vue';
import EvolutionBadgeVue from '../components/EvolutionBadge.vue';
import TypeDynamicsVue from '../components/TypeDynamics.vue';

const route = useRoute();

/* Current pokemon details */
const currentPokemon = ref(null);
const currentPokemonSpecie = ref(null);
const types = ref(null);

/* If the pokemon is an evolution, the previous pokemon is stored here */
const previousPokemon = ref(null);

await updatePokemon(route.params.name);

// Handle changes in the displayed pokemon
watch(() => route.params.name, async (newName) => {
  console.log("compute new pokemon data");
  await updatePokemon(newName);
});

async function updatePokemon(pokemonName){
  currentPokemon.value = await pokedexInstance.getPokemonByName(pokemonName);
  currentPokemonSpecie.value = await pokedexInstance.getPokemonSpeciesByName(pokemonName);

  previousPokemon.value = currentPokemonSpecie.value.evolves_from_species 
      ? await pokedexInstance.getPokemonByName(currentPokemonSpecie.value.evolves_from_species.name) 
      : undefined;

  types.value = await Promise.all(currentPokemon.value.types.map(async typeInstance => await pokedexInstance.getTypeByName(typeInstance.type.name)));
}


</script>

<template>
  <div class="pokemonDetailView">
    <p> {{ $route.params.name}} </p>
    <ClassBadgeVue :pokemon-specie="currentPokemonSpecie" />
    <EvolutionBadgeVue :pokemon="previousPokemon" /> 
    <SimpleCardVue :pokemon="currentPokemon"/>
    <PokemonDescriptionVue :pokemon-specie="currentPokemonSpecie" />
    <PokemonDetailsVue :pokemon="currentPokemon" :pokemon-specie="currentPokemonSpecie" />
    <PokemonStatsVue :pokemon="currentPokemon"/>
    <TypeDynamicsVue :types="types" />
  </div>
  
</template>

<style scoped>
.pokemonDetailView {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
}
</style>