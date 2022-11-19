<script setup>
import { ref, computed, watch } from 'vue'
import { useElementSize } from '@vueuse/core'

import { pokedexInstance } from '../assets/js/utils'
import SimpleCardVue from './SimpleCard.vue';

import 'vue-virtual-scroller/dist/vue-virtual-scroller.css' 
import { RecycleScroller } from 'vue-virtual-scroller';

const props = defineProps({
  pokemonsNames: {
    type: Array,
    required: true
  }
});

// The pokemons from the API, resetted when the name list resets
const pokemons = ref(null);
pokemons.value = [];
watch(() => props.pokemonsNames, async () => {
  console.log('HELLO WORLD')
  console.log(props.pokemonsNames)
  pokemons.value = [];
  await handleNewPokemons();
});

// Handle resizing the RecyclerView
const rootElement = ref(null);
const { width, height } = useElementSize(rootElement);

const gridItems = computed(() => {
  return Math.floor(width.value/260);
});
const gridWidth = computed(() => {
  return gridItems.value * 260; 
});



let isFetching = false;
/** Fetch pokemons when reaching the end */
async function handleNewPokemons(){
  if(isFetching) return;
  
  isFetching = true;
  console.log("handle pokemon")
  // Create a list of new pokemon to gather
  let start = pokemons.value.length;
  let end = Math.min(props.pokemonsNames.length, pokemons.value.length + 50);

  let pokemonsToGet = props.pokemonsNames.slice(start, end);
  let newPokemons = await pokedexInstance.getPokemonByName(pokemonsToGet);
  pokemons.value.push(...newPokemons);
  refreshRecyclerView()
  
  isFetching = false;
}

/* Width of an individual card */
const cardWidth = ref(260);
/** Force the recycler view to take new entries into accounty
 * Note: Yes, it is a hack. The RecyclerView is supposed to be listening to the ref
 * but it doesn't take it into account unless I force a layout change.
 */
function refreshRecyclerView(){
  cardWidth.value += 1;
  if(cardWidth.value > 261) cardWidth.value = 260;
}

</script>

<template>
  <div ref="rootElement" class="cardList">
    <RecycleScroller
      class="scroller"
      :items="pokemons"
      :item-size="cardWidth"
      :gridItems="gridItems"
      :style="{width: gridWidth + 'px'}"
      :buffer="400"
      @scroll-end="handleNewPokemons"
      v-slot="{item, index, active}"
    >
      <SimpleCardVue :pokemon="item" />
      
    </RecycleScroller>
  </div>
</template>

<style scoped>


.scroller{
  height: 70vh;
  overflow-y:auto;
  margin: auto;
}


</style>