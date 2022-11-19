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
    <p class="legendaryPokemon" v-if="pokemonSpecie.is_legendary">Legendary Pokemon</p>
    <p class="mythicalPokemon" v-else-if="pokemonSpecie.is_mythical">Mythical Pokemon</p>
    <p class="babyPokemon" v-else-if="pokemonSpecie.is_baby">Baby Pokemon</p>
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