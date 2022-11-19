<script setup>
import StatBarVue from './StatBar.vue';
import { getTypeColor } from '../assets/js/utils';

const props = defineProps({
  pokemon: Object
});

</script>

<template>
  <section class="card fullWidthCard pokemonStats">
    <h3>Statistics</h3>
    <StatBarVue
    v-for="stat in pokemon.stats"
    :label="stat['stat']['name']"
    :value="stat['base_stat']"
    :max="255"
    :color="getTypeColor(pokemon.types[0].type.name)"
    />
  </section>
</template>

<style scoped>
.pokemonStats {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>