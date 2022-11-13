<script setup>
import StatBarVue from './StatBar.vue';

const props = defineProps({
  pokemon: Object
});

</script>

<template>
  <div class="pokemonStats">
    <StatBarVue
    v-for="stat in pokemon.stats"
    :label="stat['stat']['name']"
    :value="stat['base_stat']"
    
    />
  </div>
</template>

<style scoped>
  .pokemonStats {
    
  }
</style>