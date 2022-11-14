<script setup>
import { getTypeColor } from '../assets/js/utils.js';

const props = defineProps({
  typeNames: {
    type: Array,
    required: true
  }
});
</script>

<template>
  <div class="typeIconContainer">
    <ul class="typeIconList">
      <li v-for="type in typeNames">
        <img
        class="typeIcon" 
        :alt="`Pokemon type: ${type}`"
        :src="`https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/${type}.svg`" 
        :style="{ 'background-color': getTypeColor(type) }"
        />
      </li>
    </ul>
  </div>
</template>

<style>

.typeIconList {
  padding: 0px;
  margin: 0px;
  list-style: none;

  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-evenly;
  align-items: center;
}

.typeIconList > li {
  padding: 0px;
  margin: 0px;

  width: fit-content;
}

.typeIcon {
  display: block;
  width: 2rem;
  border-radius: 100%;
  padding: 0.5rem;
  margin: auto;
}


</style>