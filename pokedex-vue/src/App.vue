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

  <div id="main">
    <!-- Not the best use of such tag,
    but most components rely of the same data fetched by the view -->
    <Suspense>  
      <RouterView />
    </Suspense>
  </div>

  <footer>
    <p>Made with hate by Mathias Boulay</p>
  </footer>
</template>



<style scoped>
header {
  height: min-content;
  padding: 0 50px;
  background-color: red;
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
  background-color: grey;
}
</style>
