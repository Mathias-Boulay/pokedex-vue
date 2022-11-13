<script setup>
import { ref } from 'vue';

const props = defineProps({
  pokemonSpecie: {
    type: Object,
    required: true
  }
});

const currentDescriptionIndex = ref(0);

/** Update the description index to the next english entry. Loops if needed */
function findNextDescriptionIndex(){
  let textEntries = props.pokemonSpecie['flavor_text_entries'];
  let tempIndex = currentDescriptionIndex.value;
  tempIndex = (tempIndex + 1 < textEntries.length) ? tempIndex + 1 : 0;
  
  while(textEntries[tempIndex]['language']['name'] != 'en'){
    tempIndex = (tempIndex + 1 < textEntries.length) ? tempIndex + 1 : 0;
  }

  currentDescriptionIndex.value = tempIndex;
}

/** Update the description index to the previous english entry. Loops if needed */
function findPreviousDescriptionIndex(){
  let textEntries = props.pokemonSpecie['flavor_text_entries'];
  let tempIndex = currentDescriptionIndex.value;
  tempIndex = (tempIndex - 1 > 0) ? tempIndex - 1 : textEntries.length-1;
  

  while(textEntries[tempIndex]['language']['name'] != 'en'){
    tempIndex = (tempIndex - 1 > 0) ? tempIndex - 1 : textEntries.length-1;
  }

  currentDescriptionIndex.value = tempIndex;
}

/** Remove unused chars from the description
 * @param {String} description The description
 * @return {String} The same description with a few adjustements 
 */
function processDescription(description){
  return description.replaceAll('\n', ' ');
}
</script>

<template>
  <div class="pokemonDescription" >
    <button class="borderlessButton" v-on:click="findPreviousDescriptionIndex()">↑</button>
    <p> {{ processDescription(pokemonSpecie['flavor_text_entries'][currentDescriptionIndex]['flavor_text']) }}</p>
    <button class="borderlessButton" v-on:click="findNextDescriptionIndex()">↓</button>
  </div>
</template>

<style scoped>
p, .borderlessButton {
  color: white;
  width: 90%;
}

p {
  text-align: center;
}

.pokemonDescription {
  width: fit-content;
  
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;

  background-color: black;
  clip-path: polygon(25% 0%, 100% 0, 100% 80%, 80% 100%, 0 100%, 0% 25%);
  border: solid grey;
  border-radius: 15px;

  padding-left: 15%;
  padding-right: 15%;
}

.borderlessButton{
  border: none;
  width: 50%;
  height: 10%;
  background-color: rgba(255, 255, 255, 0);
  transition: 1s;
  
}

.borderlessButton:hover, .borderlessButton:active{
  background-color: rgba(255, 255, 255, 0.4);
}

</style>