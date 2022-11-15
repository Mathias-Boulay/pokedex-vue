<script setup>
import { ref, computed } from "vue";
import { getTypeColor } from "../assets/js/utils.js";
import TypeIconListVue from "./TypeIconList.vue";


const props = defineProps({
  pokemon: Object,
});

const typeNames = computed(() => {
  return props.pokemon.types.map((typeInstance) => typeInstance.type.name);
});

const backgroundColor = computed(() => {
  //console.dir(props.pokemon, {depth: null})
  return getTypeColor(props.pokemon.types[0].type.name);
});

</script>

<template>
  <router-link :to="`/pokemon/${pokemon.name}`" class="cardContainer card">
    <p class="cardId">{{`#${pokemon.id}`}}</p>
    <img
      class="cardSprite"
      alt="A pokemon sprite"
      :src="pokemon.sprites.front_default"
    />
    <p class="cardName">{{ pokemon.name }}</p>
    <TypeIconListVue :type-names="typeNames" />
  </router-link>
</template>


<style scoped>

p, .cardContainer {
  text-decoration: none;
  color: black;
}

.cardContainer {
  display: block;
  width: min-content;
  
  

  margin: auto;

}

.cardId {
  margin: 0px;
}

.cardSprite {
  margin: 0px 2.5rem;
  display: block;
  
  background-color: v-bind("backgroundColor");
  border: solid black;
  clip-path: polygon(
    30% 0%,
    70% 0%,
    100% 30%,
    100% 70%,
    70% 100%,
    30% 100%,
    0% 70%,
    0% 30%
  );
}

.cardName {
  text-align: center;
  text-transform: capitalize;
}


</style>
