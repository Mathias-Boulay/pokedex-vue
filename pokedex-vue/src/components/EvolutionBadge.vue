<script setup>
import { getTypeColor } from '../assets/js/utils';
import { computed } from '@vue/reactivity';

const props = defineProps(['pokemon']);

const backgroundColor = computed(() => {
  return (props.pokemon ? getTypeColor(props.pokemon.types[0].type.name) : '#000');
});
</script>

<template>
  <div class="badge">
      <div v-if="pokemon">
        <router-link class="pokemonBadge" :to="`/pokemon/${pokemon.name}`">
          <img 
          class="badgeIcon"
          :src="pokemon.sprites.front_default"
          :alt="`${pokemon.name} sprite`"
          />
          <p>Evolution of {{ pokemon.name }}</p>
        </router-link>
      </div>
      <div v-else>
        <p>Base pokemon</p>
      </div>
  </div>
</template>

<style scoped>
.pokemonBadge { 
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  padding-right: 2rem;

  background-color: v-bind(backgroundColor);
}

.badgeIcon {
  object-fit: none;
  width: 5rem;
  height: 3rem;

}
</style>