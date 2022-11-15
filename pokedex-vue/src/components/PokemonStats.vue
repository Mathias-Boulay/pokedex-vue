<script setup>
import StatBarVue from './StatBar.vue';
import { getTypeColor } from '../assets/js/utils.js';

const props = defineProps({
  pokemon: Object
});

</script>

<template>
  <div class="card pokemonStats">
    <StatBarVue
    v-for="stat in pokemon.stats"
    :label="stat['stat']['name']"
    :value="stat['base_stat']"
    :max="255"
    :color="getTypeColor(pokemon.types[0].type.name)"
    />
  </div>
</template>

<style scoped>
.pokemonStats {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>