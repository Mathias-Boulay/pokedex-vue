<script setup>
import { ref } from 'vue';

const props = defineProps({
  pokemonSpecie: {
    type: Object,
    required: true
  }
});

const currentDescriptionIndex = ref(0);

/** Update the description index to the next english entry. Loops if needed 
 * @param {Integer} direction The direction to loop the array over
 */
function findNextDescriptionIndex(direction){
  let textEntries = props.pokemonSpecie['flavor_text_entries'];
  let tempIndex = currentDescriptionIndex.value;

  function continueDirection(){
    tempIndex += direction;
    if(tempIndex >= textEntries.length) tempIndex = 0;
    if(tempIndex < 0) tempIndex = textEntries.length - 1;
  }
  continueDirection();
  
  while(
    (textEntries[tempIndex]['language']['name'] != 'en' && tempIndex != currentDescriptionIndex.value)
    || textEntries[tempIndex]['flavor_text'] == textEntries[currentDescriptionIndex.value]['flavor_text']
  ){
    continueDirection();
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
  <section class="card fullWidthCard pokemonDescription" >
    <h3>Descriptions</h3>
    <button class="borderlessButton" v-on:click="findNextDescriptionIndex(-1)">&lsaquo;</button>
    <p> {{ processDescription(pokemonSpecie['flavor_text_entries'][currentDescriptionIndex]['flavor_text']) }}</p>
    <button class="borderlessButton" v-on:click="findNextDescriptionIndex(1)">&rsaquo;</button>
  </section>
</template>

<style scoped>

p {
  text-align: center;
  min-width: min-content;
  max-width: 40rem;
}

.pokemonDescription {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-around;
}

.borderlessButton{
  border: none;
  width: 15%;
  height: 100%;
  transition: 1s;
  background-color: transparent;
  font-size: xxx-large;
  text-align: center;
  vertical-align: middle;
}

.borderlessButton:hover, .borderlessButton:active{
  background-color: rgba(255, 255, 255, 0.4);
}

</style>