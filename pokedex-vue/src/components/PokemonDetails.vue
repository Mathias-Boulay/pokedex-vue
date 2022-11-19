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
  <section class="card fullWidthCard pokemonDetails">
    <h3>Details</h3>
    <div class="detailContainer">
      <p>Height: <br/> <span>{{ pokemon.height * 10 }} cm</span></p>
      <p>Weigth: <br/> <span> {{ pokemon.weight * 10 }} g</span></p>
      <p>Gender: <br/>
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
  </section>
</template>

<style scoped>

p {
  text-align: center;
}

.pokemonDetails {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
}

.detailContainer {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding-left: 2rem;
  padding-right: 2rem;
  gap: 1.25rem

}

</style>