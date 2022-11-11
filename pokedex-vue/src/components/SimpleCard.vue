<script setup>
import { ref, computed } from "vue";
import { getTypeColor } from "../assets/js/utils.js";


const props = defineProps({
  pokemon: Object,
});

const backgroundColor = computed(() => {
  //console.dir(props.pokemon, {depth: null})
  return getTypeColor(props.pokemon.types[0].type.name);
});

</script>

<template>
  <div class="cardContainer">
    <p class="cardId">{{`#${pokemon.id}`}}</p>
    <img
      class="cardSprite"
      alt="A pokemon sprite"
      :src="props.pokemon.sprites.front_default"
    />
    <p class="cardName">{{ props.pokemon.name }}</p>
    <div class="cardIconContainer">
      <img v-for="type in props.pokemon.types"
        class="cardTypeIcon" 
        :alt="`Pokemon type: ${type.type.name}`"
        :src="`https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/${type.type.name}.svg`" 
        :style="{ 'background-color': getTypeColor(type.type.name) }"
      />
    </div>
  </div>
</template>

<style scoped>
.cardContainer {
  width: min-content;
  padding-top: 10px;
  padding-bottom: 10px;
  
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;

}

.cardId {
  margin: 0px;
}

.cardSprite {
  margin: 0px 4vw;
  display: block;
  
  background-color: v-bind("backgroundColor");
  border: dashed black;
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

.cardIconContainer {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-evenly;
}

.cardTypeIcon{
  width: 20%;
  border-radius: 100%;
  padding: 4%
}

</style>
