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
    
    color: {
      type: String,
      default: '#F00'
    }

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
  flex-direction: column;
  justify-content: left;
  
}


progress {
  appearance: none;
  width: 100%; 
  height: 1.5rem; 
}

::-moz-progress-bar, ::-webkit-progress-bar {
  background-color: v-bind(color);
}

</style>