<script setup>
import SimpleCard from '../components/SimpleCard.vue';
import CartList from '../components/CardList.vue';

console.log("hello");

</script>

<template>
  <p>Hello world</p>
  <!--  <SimpleCard :pokemon="ditto"/> -->
  <Suspense>
    <CartList />
  </Suspense>

</template>
