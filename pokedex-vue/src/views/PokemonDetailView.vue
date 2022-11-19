
<script setup>
import { watch, ref, computed } from 'vue';
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
const currentPokemonSpecie = ref(null);
const currentPokemons = ref(null);  // Take variants into account 
const types = ref(null);

/* If the pokemon is an evolution, the previous pokemon is stored here */
const previousPokemon = ref(null);

await updatePokemon(route.params.name);

// Handle changes in the displayed pokemon
watch(() => route.params.name, async (newName) => {
  console.log("compute new pokemon data");
  await updatePokemon(newName);
});

/* Points to the current variety */
const currentVariety = computed(() => {
  if(!currentPokemonSpecie.value.varieties) return 0; // Default
  if(!route.params.variety) return 0;

  let variety = route.params.variety;
  let index = 0;
  while(index < currentPokemonSpecie.value.varieties.length){
    console.log(variety, currentPokemonSpecie.value.varieties[index].pokemon.name)
    if(variety === currentPokemonSpecie.value.varieties[index].pokemon.name){
      console.log('value', index)
      return index
    }
    index ++;
  }
});

/** Query details for [pokemonName] ans its previous evolution, if applicable */
async function updatePokemon(pokemonName){
  currentPokemonSpecie.value = await pokedexInstance.getPokemonSpeciesByName(pokemonName);

  // Update the pokemon details of all species
  if(!currentPokemonSpecie.value.varieties){
    currentPokemons.value = [await pokedexInstance.getPokemonByName(pokemonName)];
  }else{
    currentPokemons.value = await Promise.all(currentPokemonSpecie.value.varieties.map(async variety => {
        // The regex only maps the decimal associated to the pokemon variant
        return pokedexInstance.getPokemonByName(variety.pokemon.url.match(/(?<=\/)\d+(?=\/)/g)[0]);
      })
    );
  }

  console.log(currentPokemons.value);

  previousPokemon.value = currentPokemonSpecie.value.evolves_from_species 
      ? await pokedexInstance.getPokemonByName(currentPokemonSpecie.value.evolves_from_species.name) 
      : undefined;

  types.value = await Promise.all(currentPokemons.value[0].types.map(async typeInstance => await pokedexInstance.getTypeByName(typeInstance.type.name)));
}


</script>

<template>
  <div class="pokemonDetailView">
    <h1> Pokemon - {{ currentPokemons[currentVariety].name }} </h1>
    
    <div class="flexContainer">
      <ClassBadgeVue :pokemon-specie="currentPokemonSpecie" />
      <EvolutionBadgeVue :pokemon="previousPokemon" /> 
    </div>
    <div class="flexContainer">
      <SimpleCardVue v-for="pokemon in currentPokemons" :pokemon="pokemon"/>
    </div>
    
    <PokemonDescriptionVue :pokemon-specie="currentPokemonSpecie" />
    <PokemonStatsVue :pokemon="currentPokemons[currentVariety]"/>
    <PokemonDetailsVue :pokemon="currentPokemons[currentVariety]" :pokemon-specie="currentPokemonSpecie" />
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


.flexContainer {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 2rem ;
}
</style>