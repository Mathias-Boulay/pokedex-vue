<script setup>
import { RouterView } from "vue-router";

</script>

<template>
  <header>
    <router-link to="/">
      <img class="logo"
        src="./assets/img/pokedex_title.png"
        alt="Header icon"
      />
    </router-link>
    
  </header>

  <main>
    <!-- Not the best use of such tag,
    but most components rely of the same data fetched by the view -->
    <Suspense>  
      <RouterView />
    </Suspense>
  </main>

  <footer>
    <p>Pokémon and Pokémon character names are trademarks of Nintendo.</p>
  </footer>
</template>



<style scoped>
header {
  height: min-content;
  padding: 0 0.3rem;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}


.logo {
  width: 100%;
}

footer {
  height: min-content;
  padding: 1% 0;
  background-color: rgb(255, 255, 255);
}

p {
  text-align: center;
}
</style>
