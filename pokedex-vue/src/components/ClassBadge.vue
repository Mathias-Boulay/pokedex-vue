<script setup>
const props = defineProps({
  pokemonSpecie: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <div class="badge pokemonClass">
    <p class="legendaryPokemon" v-if="pokemonSpecie.is_mythical">Legendary Pokemon</p>
    <p class="mythicalPokemon" v-if="pokemonSpecie.is_legendary">Mythical Pokemon</p>
    <p class="babyPokemon" v-if="pokemonSpecie.is_mythical">Baby Pokemon</p>
    <p class="normalPokemon" v-else>Normal Pokemon</p>
  </div>
</template>

<style scoped>
/* .pokemonClass {
  width: min-content;
  white-space: nowrap;
  border-radius: 1rem;
  overflow: hidden;
} */

.mythicalPokemon {
  background-color: blueviolet;
}
.legendaryPokemon {
  background-color: azure;
}

.babyPokemon {
  background-color: pink;
}

.normalPokemon {
  background-color: orange;
}
</style>