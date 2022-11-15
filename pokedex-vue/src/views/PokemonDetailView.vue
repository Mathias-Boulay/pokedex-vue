
<script setup>
import { useRoute } from 'vue-router';
import { pokedexInstance } from '../assets/js/utils.js';
import PokemonDescriptionVue from '../components/PokemonDescription.vue';
import PokemonStatsVue from '../components/PokemonStats.vue';
import SimpleCardVue from '../components/SimpleCard.vue';
import PokemonDetailsVue from '../components/PokemonDetails.vue';
import ClassBadgeVue from '../components/ClassBadge.vue';
import EvolutionBadgeVue from '../components/EvolutionBadge.vue';
import TypeDynamicsVue from '../components/TypeDynamics.vue';

const route = useRoute();

const param = route.params.name;
const currentPokemon = await pokedexInstance.getPokemonByName(route.params.name);
const currentPokemonSpecie = await pokedexInstance.getPokemonSpeciesByName(route.params.name);

const previousPokemon = currentPokemonSpecie.evolves_from_species 
    ? await pokedexInstance.getPokemonByName(currentPokemonSpecie.evolves_from_species.name) 
    : undefined;

const types = await Promise.all(currentPokemon.types.map(async typeInstance => await pokedexInstance.getTypeByName(typeInstance.type.name)));
</script>

<template>
  <p> {{ $route.params.name}} - {{ param }} </p>
  <ClassBadgeVue :pokemon-specie="currentPokemonSpecie" />
  <EvolutionBadgeVue :pokemon="previousPokemon" /> 
  <SimpleCardVue :pokemon="currentPokemon"/>
  <PokemonDescriptionVue :pokemon-specie="currentPokemonSpecie" />
  <PokemonDetailsVue :pokemon="currentPokemon" :pokemon-specie="currentPokemonSpecie" />
  <PokemonStatsVue :pokemon="currentPokemon"/>
  <TypeDynamicsVue :types="types" />
</template>

<style scoped>

</style>