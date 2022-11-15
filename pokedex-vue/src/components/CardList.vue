<script setup>
import { pokedexInstance } from '../assets/js/utils.js'
import SimpleCardVue from './SimpleCard.vue';

import 'vue-virtual-scroller/dist/vue-virtual-scroller.css' 
import { RecycleScroller } from 'vue-virtual-scroller';

// FIXME Presence of magic number
const pokemonIds = new Array(50);
for(let i of pokemonIds.keys()){
  pokemonIds[i] = i+1;
}

const pokemons = await pokedexInstance.getPokemonByName(pokemonIds);



</script>

<template>
  <div class="cardList">
    <RecycleScroller
      style="height: 70vh; overflow-y:auto;"
      class="scroller"
      :items="pokemons"
      :item-size="260"
      :gridItems="4"
      
      v-slot="{item, index, active}"
    >
      <SimpleCardVue :pokemon="item" />
      
    </RecycleScroller>
  </div>
</template>

<style scoped>
.scroller{
  height: 100%;
}


</style>