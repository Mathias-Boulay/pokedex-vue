<script setup>
const props = defineProps({
  pokemon: {
    type: Object,
    required: true
  },
  pokemonSpecie: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="pokemonDetails">
    <h3>Details</h3>
    <div>
      <p>Height: <span>{{ pokemon.height }}</span></p>
      <p>Weigth: <span> {{ pokemon.weight }}</span></p>
      <p>Gender:
        <span v-if="pokemonSpecie.gender_rate === -1">Unknown</span>
        <span v-else-if="pokemonSpecie.gender_rate === 0">Male</span>
        <span v-else-if="pokemonSpecie.gender_rate === 8">Female</span>
        <span v-else>Male/Female</span>
        </p>
      <div class="abilities">
        <p>Abilities:</p>
        <ul>
        <li v-for="ability in pokemon.abilities">{{ ability.ability.name }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>

.pokemonDetails {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;

  background-color: aquamarine;
  border-radius: 15px ;
}

</style>