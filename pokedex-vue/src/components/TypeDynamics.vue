<script setup>
import TypeIconListVue from './TypeIconList.vue';
import { computed } from '@vue/reactivity';

const props = defineProps({
  types: {
    type: Array,
    required: true
  }
});

// Gather all the type tweaks, but create another var what is displayed
// In order to avoid the recursion
const immunities = computed(() => getTypeNames('no_damage_from'));
const weaknesses = computed(() => getTypeNames('double_damage_from'));
const strengths = computed(() => getTypeNames('half_damage_from'));

const displayedWeaknesses = computed(() => weaknesses.value.filter((value) => !strengths.value.includes(value)));
const displayeStrength = computed(() => strengths.value.filter((value) => !weaknesses.value.includes(value)));


/**
 * Get all the types listed inside the types props
 * @param {String} arrayName 
 * @return {Array<String>} An array of string 
 */
function getTypeNames(arrayName){
  let typeNameList = [];
  props.types.forEach(type => type.damage_relations[arrayName].forEach(damagingType => {
    typeNameList.push(damagingType.name);
  }));
  return typeNameList;
}


</script>

<template>
  <div class="card typeDynamics">
  <!-- TODO merge in one v-for directive ? -->
    <div v-if="displayedWeaknesses.length">
      <h3>Weaknesses:</h3>
      <TypeIconListVue :type-names="displayedWeaknesses"/>
    </div>
    <div v-if="displayeStrength.length">
      <h3>strengths:</h3>
      <TypeIconListVue :type-names="displayeStrength"/>
    </div>
    <div v-if="immunities.length">
      <h3>immunities</h3>
      <TypeIconListVue :type-names="immunities"/>
    </div>
  </div>
</template>

<style scoped>

.typeDynamics {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
}

</style>