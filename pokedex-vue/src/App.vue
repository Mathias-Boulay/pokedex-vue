<script setup>
import { RouterView } from "vue-router";

</script>

<template>
  <header>
    <a href="/">
      <img
        src="./assets/img/pokedex_title.png"
        alt="Header icon"
      />
    </a>
    
  </header>

  <div id="main">
    <RouterView />
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
}

footer {
  height: min-content;
  padding: 1% 0;
  background-color: grey;
}
</style>
