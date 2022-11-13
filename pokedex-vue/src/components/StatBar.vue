<script setup>
  const props = defineProps({
    max: {
      type: Number,
      default: 100
    },

    value:{
      type: Number,
      required: true
    },

    label: {
      type: String,
      required: true
    }, 

  });
</script>

<template>
  <div class="statBar">
    <label :for="label"> {{ label }} : {{value}}</label>
    <progress :id="label" :max="max" :value="value"> <!--Maybe add a slot ?--> </progress>
  </div>
</template>

<style scoped>


.statBar{
  display: flex;
  flex-direction: row;
  justify-content: right;
  gap: 1rem;
}

</style>