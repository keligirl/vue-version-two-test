<template>
  <div id="app">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <!-- <vuedraggable/> -->
    <!-- <upload></upload> -->
    <squared></squared>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import vuedraggable from './components/vuedraggable.vue';
import upload from './components/upload.vue';
import squared from './components/squared.vue';

export default {
  name: 'App',
  components: {
    HelloWorld,
    vuedraggable,
    upload,
    squared
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
